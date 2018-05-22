/**
 * 由于generator内部的yield提供了暂停的机制，
 * 而在外部可以使用.next/return/throw恢复执行
 * 这就提供了异步执行的函数相互通信的手段
 * 
 * 这样可以通过generator实现协程
 * 
 * 所以使用generator可以实现异步函数（带有回调函数的函数），顺序执行
 * 
 */
function* gen(x) {
    var y = yield x + 2;
    return y;
}

var g = gen(1);
g.next() // { value: 3, done: false }
g.next(2) // { value: 2, done: true }

/**
 * Thunk函数：用于实现惰性求值（参数按名求值）
 * 在JS中Thunk表达式，将多参函数转换为只包含回调函数的函数
 */
// ES6版本
const Thunk = function (fn) {
    return function (...args) {
        return function (callback) {
            return fn.call(this, ...args, callback);
        }
    };
};

function f(a, cb) {
  cb(a);
}
const ft = Thunk(f);

ft(1)(console.log) // 1


//Thunk+Generator自动流程管理
function run(fn) {
  var gen = fn();

  function next(data) {
    var result = gen.next(data);
    if (result.done) return;
    result.value(next);
  }

  next();
}

var g = function* (){
  var f1 = yield ft('fileA'); //这种写法比Promise更加清晰
  console.log(f1);
  var f2 = yield ft('fileB');
  console.log(f2);
  // ...
  var fn = yield ft('fileN');
  console.log(fn);
};

run(g); //这样就可以顺序执行


//Promise+Generator自动流程管理
function g(a, cb) { //测试用的异步函数
    cb(a+1);
}

var gp = function (a) { //将异步函数封装成Promise
    return new Promise(function (resolve, reject) {
        g(a, function (b) {
            resolve(b)
        })
    });
};

function run(gen) {
    var g = gen();

    function next(data) {
        var result = g.next(data);
        if (result.done) return result.value;
        result.value.then(function (data) {
            next(data);
        });
    }
    next();
}

var gen = function* () {
    var f1 = yield gp('/etc/fstab');
    var f2 = yield gp('/etc/shells');
    console.log(f1.toString());
    console.log(f2.toString());
};

run(gen);

/**
 * co模块类似这样的实现
 */