const {AsyncParallelBailHook} = require('tapable');
class Lesson {
  constructor () {
    this.hooks = {
      arch: new AsyncParallelBailHook(['name']) 
    }
  }
  tap () {
    this.hooks.arch.tapAsync('webpack', (name, cb) => {
      setTimeout(() => {
        console.log(name+" get webpack ")
        cb('听说：jiang学崩了!')
      }, 1000)
    })
    this.hooks.arch.tapAsync('react', (name, cb) => {
      setTimeout(() => {
        console.log(name+" get react ")
        cb()
      }, 2000)
    })
  }
  start (...args) {
    this.hooks.arch.callAsync(...args, function (data) {
      console.log(data)
    })
  }
}

let l = new Lesson()

l.tap()
l.start('jiang')



// const {AsyncParallelBailHook} = require('tapable');
// class Lesson {
//   constructor () {
//     this.hooks = {
//       arch: new AsyncParallelBailHook(['name']) 
//     }
//   }
//   tap () {
//     this.hooks.arch.tapPromise('webpack', (name) => {
//       return new Promise((resolve, reject) => {
//         setTimeout(() => {
//           console.log(name+" get webpack ")
//           reject('jiang学崩了!')
//         }, 1000)
//       })
//     })
//     this.hooks.arch.tapPromise('react', (name) => {
//       return new Promise((resolve, reject) => {
//         setTimeout(() => {
//           console.log(name+" get react ")
//           resolve()
//         }, 2000)
//       })
//     })
//   }
//   start (...args) {
//     this.hooks.arch.promise(...args).then(() => {
//       console.log('end')
//     },(err)=>{
//       console.log("听说：",err)
//     })
//   }
// }

// let l = new Lesson()

// l.tap()
// l.start('jiang')
