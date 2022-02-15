const assert = require('assert')
const plugin = require('./index')

const testCases = [
  ['/eng.html', '/eng.html'],
  ['/你今日饮咗未.html', '/ni-jin-ri-yin-zuo-wei.html'],
  ['/multi/path.html', '/multi/path.html'],
  ['/你今日/饮咗未.html', '/ni-jin-ri/yin-zuo-wei.html'],
  ['/hello/你好.html', '/hello/ni-hao.html'],
  ['/有  空        格.html', '/you-kong-ge.html'],
  ['/有%20空%20格.html', '/you-kong-ge.html']
]

for (let i = 0; i < testCases.length; i++) {
  const [ origin, excepted ] = testCases[i]
  const $page = { path: origin }
  plugin().extendPageData($page)
  assert.strictEqual($page.path, excepted)
}

console.info(`Test complete! Everything ok!`)
