let { AsyncParallelHook } = require('tapable')
// 异步的钩子（串行）并行 需要等待所有并发的异步事件执行后在执行回调方法
// 同时发多个请求
// 执行方法分为 tap 注册 tapAsync
// tapable 库中有三种注册方法 tap 同步注册 tapAsync(cb) tapPromise(注册是promise)
// 调用 call callAsync promise 
class Lesson {
  constructor () {
    this.hooks = {
      arch: new AsyncParallelHook(['name'])
    }
  }

  tap () { // 注册监听函数
    this.hooks.arch.tapPromise('node', name => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log('node', name)
          resolve()
        }, 1000)
      })
    })
    this.hooks.arch.tapPromise('react', name => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log('react', name)
          resolve()
        }, 1000)
      })
    })
  }

  start () {
    this.hooks.arch.promise('jiang').then(function() {
      console.log('end')
    })
  }
}
let l = new Lesson()
l.tap() // 注册这两个事件
l.start() // 启动钩子