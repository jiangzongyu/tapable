const {AsyncParallelBailHook} = require('tapable');
const FrontEnd = new AsyncParallelBailHook(['name']);
FrontEnd.tapPromise('webpack',(name)=>{
  return new Promise((resolve,reject)=>{
    setTimeout(() => {
      console.log(name+" get webpack ")
      reject('jiang学崩了!');
    }, 1000);
  })
});
FrontEnd.tapPromise('react',(name,cb)=>{
  return new Promise((resolve)=>{
    setTimeout(() => {
      console.log(name+" get react ")
      resolve();
    }, 2000);
  })
});
FrontEnd.start=(...args)=>{
  FrontEnd.promise(...args).then(()=>{
    console.log("end");
  },(err)=>{
    console.log("听说：",err)
  })
};
FrontEnd.start('jiang');