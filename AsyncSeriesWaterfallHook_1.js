let { AsyncSeriesWaterfallHook } = require('tapable')
class Lesson {
  constructor () {
    this.hooks = {
      arch: new AsyncSeriesWaterfallHook(['name'])
    }
  }

  tap () { // 注册监听函数
    this.hooks.arch.tapAsync('node', function (name, cb) {
      setTimeout(() => {
        console.log('node', name)
        // 第一个参数为 undefined/null 时，继续执行
        cb(null, 'result')
        // cb('error', 'result')
      }, 1000)
    })
    this.hooks.arch.tapAsync('react', function (data, cb) {
      setTimeout(() => {
        console.log('react', data)
        cb()
      }, 1000)
    })
  }

  start () {
    this.hooks.arch.callAsync('jiang', function() {
      console.log('end')
    })
  }
}
let l = new Lesson()
l.tap() // 注册这两个事件
l.start() // 启动钩子