class AsyncSeriesWaterfallHook { 
  constructor (args) {
    this.tasks = []
  }

  tapAsync (name, task) {
    this.tasks.push(task)
  }

  callAsync (...args) {
    let finalCallback = args.pop()
    let index = 0
    let next = (err, data) => {
      let task = this.tasks[index]
      // console.log(err)
      if (!task || typeof(err) === 'string') return finalCallback()
      if (index === 0) { // 执行第一个函数
        task(...args, next)
      } else {
        task(data, next)
      }
      index++
    }
    next()
  }
}

let hook = new AsyncSeriesWaterfallHook(['name'])
let total = 0
hook.tapAsync('react', function (name, cb) {
  setTimeout(() => {
    console.log('react', name)
    cb(null, 'result')
  }, 1000)
})
hook.tapAsync('node', function (name, cb) {
  setTimeout(() => {
    console.log('node', name)
    cb()
  }, 1000)
})

hook.callAsync('jiang', function () {
  console.log('end')
})