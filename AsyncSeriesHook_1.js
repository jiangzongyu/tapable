let { AsyncSeriesHook } = require('tapable')
// 异步的钩子（串行）并行 需要等待所有并发的异步事件执行后在执行回调方法
// 同时发多个请求
// 执行方法分为 tap 注册 tapAsync
class Lesson {
  constructor () {
    this.hooks = {
      arch: new AsyncSeriesHook(['name'])
    }
  }

  tap () { // 注册监听函数
    this.hooks.arch.tapAsync('node', function (name, cb) {
      setTimeout(() => {
        console.log('node', name)
        cb()
      }, 1000)
    })
    this.hooks.arch.tapAsync('react', function (data, cb) {
      setTimeout(() => {
        console.log('react', data)
        cb()
      })
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