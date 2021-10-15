// 返回非undefined将停止执行
class SyncWaterFallHook { 
  constructor (args) {
    this.tasks = []
  }

  tap (name, task) {
    this.tasks.push(task)
  }

  call (...args) {
    let [first, ...others] = this.tasks
    let ret = first(...args)
    others.reduce((a, b) => {
      return b(a)
    }, ret)
  }
}

let hook = new SyncWaterFallHook(['name'])
hook.tap('react', function (name) {
  console.log('react', name)
  return 'react ok'
})
hook.tap('node', function (name) {
  console.log('node', name)
  return 'node ok'
})
hook.tap('webpack', function (name) {
  console.log('webpack', name)
})

hook.call('jiang')