const {AsyncSeriesBailHook} = require('tapable');
console.time('webpack');
console.time('react');
class Lesson {
  constructor () {
    this.hooks = {
      arch: new AsyncSeriesBailHook(['name']) 
    }
  }
  tap () {
    this.hooks.arch.tapAsync('webpack', (name, cb) => {
      setTimeout(() => {
        console.log(name+" get webpack ")
        console.timeEnd('webpack');
        cb() // 参数为空
      }, 1000)
    })
    this.hooks.arch.tapAsync('react', (name, cb) => {
      setTimeout(() => {
        console.log(name+" get react ")
        console.timeEnd('react');
        cb();
      }, 1000)
    })
  }
  start (...args) {
    this.hooks.arch.callAsync(...args, function() {
      console.log('end')
    })
  }
}

let l = new Lesson()

l.tap()
l.start('jiang')
