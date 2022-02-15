const spawn = require('cross-spawn').sync

// ensure git support
const child = spawn('git')
const error = child.stderr.toString().trim()
if (error) throw new Error(error)

const SEPARATOR = '@@__GIT_LOG_SEP__@@'

function defaultFormatter (timestamp, lang) {
  return new Date(timestamp * 1000).toLocaleString(lang)
}

module.exports = (options = {}, context) => {
  const {
    extendGitLog,
    additionalProps = {},
    onlyFirstAndLastCommit,
    formatTime = defaultFormatter,
  } = options

  let { additionalArgs = [] } = options
  if (typeof additionalArgs === 'string') {
    additionalArgs = additionalArgs.split(/ +/g)
  }

  const propList = Object.entries({
    fullHash: '%H',
    authorTime: '%at',
    commitTime: '%ct',
    authorName: '%an',
    ...additionalProps,
  })

  const template = propList.map(([_, abbr]) => abbr).join(SEPARATOR)

  function getProps (info) {
    const result = {}
    info.split(SEPARATOR).forEach((value, index) => {
      result[propList[index][0]] = value
    })
    return result
  }

  return {
    extendPageData ($page) {
      if (!$page._filePath) return
      try {
        const { $lang } = $page._computed
        let commits

        if (onlyFirstAndLastCommit) {
          const firstCommit = spawn('git', [
            'log',
            '-1',
            `--format=${template}`,
            ...additionalArgs,
            $page._filePath,
          ])
          const lastCommit = spawn('git', [
            'log',
            '-1',
            '--reverse',
            `--format=${template}`,
            ...additionalArgs,
            $page._filePath,
          ])
          if ((firstCommit.stderr.toString() + lastCommit.stderr.toString()).trim()) return
          commits = [
            firstCommit.stdout.toString().trim(),
            lastCommit.stdout.toString().trim(),
          ].map(getProps)
        } else {
          const child = spawn('git', [
            'log',
            `--format=${template}`,
            ...additionalArgs,
            $page._filePath,
          ])
          if (child.stderr.toString().trim()) return
          commits = child.stdout.toString().trim().split(/\r?\n/g).map(getProps)
        }

        if (!commits.length) return

        $page.git = {
          created: formatTime(Number(commits[0].authorTime), $lang),
          updated: formatTime(Number(commits[commits.length - 1].commitTime), $lang),
          author: commits[0].authorName,
        }

        if (!onlyFirstAndLastCommit) {
          $page.git.commits = commits
          $page.git.contributors = Array.from(new Set(commits.map(c => c.authorName)))
        }

        if (typeof extendGitLog === 'function') extendGitLog($page.git)
      } catch (e) {}
    },
  }
}
