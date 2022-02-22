const path = require('path')
const spawn = require('cross-spawn')

module.exports = (options = {}, context) => ({
  extendPageData ($page) {
    const authors = getGitAuthors($page._filePath)
    $page.authors = authors
  }
})


function getGitAuthors (filePath) {
  let authors
  try {
    authors = spawn.sync(
      'git',
      ['log', '--format=%aN--%aE', path.basename(filePath)],
      { cwd: path.dirname(filePath) }
    ).stdout.toString('utf-8')
    authors = authors.split('\n')
    authors = [... new Set(authors)]
    authors = authors
      .filter(author => !!author)
      .map(author => {
        return { username: author.split('--')[0], email: author.split('--')[1] }
      })
  } catch (e) { /* do not handle for now */ }
  return authors
}
