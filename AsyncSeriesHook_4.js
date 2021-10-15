
class AsyncParallelHook { 
  constructor (args) {
    this.tasks = []
  }

  tapPromise (name, task) {
    this.tasks.push(task)
  }

  promise (...args) {
    let [first, ...others] = this.tasks
    let ret = first(...args)
    return others.reduce((a, b) => { // redux源码
      return a.then(() => b(...args))
    }, ret)
  }
}

let hook = new AsyncParallelHook(['name'])
let total = 0
hook.tapPromise('react', function (name) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('react', name)
      resolve()
    }, 1000)
  })
})
hook.tapPromise('node', function (name) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('node', name)
      resolve()
    }, 1000)
  })
})

hook.promise('jiang').then(function () {
  console.log('end')
})