/**
 * ES6 将其纳入规范，类似于Java的Future
 */

 /*
 Promise的特点：
 （1）对象的状态不受外界影响。
 Promise对象代表一个异步操作，
 有三种状态：pending（进行中）、fulfilled（已成功）和rejected（已失败）。
 只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。
 这也是Promise这个名字的由来，它的英语意思就是“承诺”，表示其他手段无法改变。

 （2）一旦状态改变，就不会再变，任何时候都可以得到这个结果。
 Promise对象的状态改变，只有两种可能：
    从pending变为fulfilled和
    从pending变为rejected。
 只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果，这时就称为 resolved（已定型）。
 如果改变已经发生了，你再对Promise对象添加回调函数，也会立即得到这个结果。
 这与事件（Event）完全不同，事件的特点是，如果你错过了它，再去监听，是得不到结果的。



 Promise也有一些缺点。
 首先，无法取消Promise，一旦新建它就会立即执行，无法中途取消。
 其次，如果不设置回调函数，Promise内部抛出的错误，不会反应到外部。
 第三，当处于pending状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。
 */


//  基本用法
const promise = new Promise(function (resolve, reject) {
    // ... some code

    if ( /* 异步操作成功 */ true) {
        resolve(value);
    } else {
        reject(error);
    }
});

//例子
let promise = new Promise(function (resolve, reject) {
    console.log('Promise');
    resolve(); //不会终结函数执行
    console.log('after resolve'); 
});

promise.then(function () {
    console.log('resolved.');
});

console.log('Hi!');



/**
 * then、catch、finally方法
 */
Promise.resolve(1)
    .then(i => {
        console.log(i);
        return i+1;
    })
    .then(i => { //返回值可以是正常值，也可以是一个Promise
        console.log(i);
        return i + 1;
    })
    .then(()=>Promise.reject(new Error("test")))
    .then(i => { //不执行
        console.log(i);
        return i + 1;
    })
    .catch(e=>console.log(e)) //输出错误
    // .finally(()=>{  //ES2018
    //     console.log("finally");
    // })


/**
 * Promise.all()
 * 返回一个Promise，异步执行参数中的所有Promise， 所有状态都完成（fulfilled）
 * 该Promise才fulfilled
 */


 /**
  * Promise.race()
  * 只要有一个完成， 则该Promise状态变为fulfilled
  */

/**
 * Promise.resolve()
 * 将现有对象转换为Promise
 * 
 * Promise.resolve方法的参数分成四种情况。
 * （1） 参数是一个 Promise 实例： 将不做任何修改、 原封不动地返回这个实例。
 * （2） 参数是一个thenable对象
 * 
 */
let thenable = {
  then: function(resolve, reject) {
    resolve(42);
  }
};

let p1 = Promise.resolve(thenable);
p1.then(function(value) {
  console.log(value);  // 42
});

//（3）参数不是具有then方法的对象，或根本就不是对象
//如果参数是一个原始值， 或者是一个不具有then方法的对象， 
//则Promise.resolve方法返回一个新的 Promise 对象， 状态为resolved。
const p = Promise.resolve('Hello');

p.then(function (s) {
    console.log(s)
});
// Hello


//（4）不带有任何参数


/**
 * Promise.reject()
 * 略
 */

 /**
  * 提案：Promise.try
  * 
  */
 //实际开发中，经常遇到一种情况：不知道或者不想区分，函数f是同步函数还是异步操作，但是想用 Promise 来处理它。
 //因为这样就可以不管f是否包含异步操作，都用then方法指定下一步流程，
 //用catch方法处理f抛出的错误。一般就会采用下面的写法。

 //写法1
 Promise.resolve().then(f)

 //写法2
 const f = () => console.log('now'); 
 (async () => f())(); //创建一个异步函数
 console.log('next');

 (async () => f())()
 .then(/**/)

//  const f = () => console.log('now');
//  Promise.try(f);
//  console.log('next');