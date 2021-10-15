const {AsyncSeriesBailHook} = require('tapable');
const FrontEnd = new AsyncSeriesBailHook(['name']);
console.time('webpack');
console.time('react');
FrontEnd.tapPromise('webpack',(name,cb)=>{
  return new Promise((resolve,reject)=>{
    setTimeout(() => {
      console.log(name+" get webpack ")
      console.timeEnd('webpack');
      // resolve();
      reject('放弃了')
    }, 1000);
  })
});
FrontEnd.tapPromise('react',(name,cb)=>{
  return new Promise((resolve)=>{
    setTimeout(() => {
      console.log(name+" get react ")
      console.timeEnd('react');
      resolve();
    }, 1000);
  })
});
FrontEnd.start=(...args)=>{
  FrontEnd.promise(...args).then(()=>{
    console.log("end");
  }).catch((err)=>{
    console.log("err",err)
  })
};
FrontEnd.start('jiang');