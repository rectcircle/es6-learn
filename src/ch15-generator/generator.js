//斐波那契闭包
function fib() {
    let [a, b] = [0, 1]
    return function () {
        [a, b] = [b, a + b]
        return a
    }
}
f = fib()
console.log(f(), f(), f())


/**
 * Generator 函数有多种理解角度。
 * 语法上，首先可以把它理解成，Generator 函数是一个状态机，封装了多个内部状态。
 * 
 * 实现上，ES6将迭代器的返回值设定为Iterator对象
 * 
 * 可以利用函数闭包实现如上面的fib闭包
 * 
 * 理解上可以认为：一个next调用，生成器函数执行到一个yield为止，并将其值传递出去
 * 
 */

 //例子1
 function* helloWorldGenerator() {
     console.log("helloWorldGenerator")
     let yr = yield 'hello'; //yield的返回值为next传递的参数
    console.log(yr) 
     yield 'world';
     return 'ending';
 }
 var hw = helloWorldGenerator();

console.log(hw.next()); //{ value: 'hello', done: false }
console.log(hw.next()); //{ value: 'world', done: false }
console.log(hw.next()); //{ value: 'ending', done: true }

//例子2
 function* fib() {
     let [a, b] = [0, 1]
     for (;;) {
         [a, b] = [b, a + b]
         yield a
     }
 }

 f = fib()
 console.log(f.next(), f.next(), f.next())


 function* foo(x) {
  var y = 2 * (yield (x + 1));
  var z = yield (y / 3);
  return (x + y + z);
}

var a = foo(5);
a.next() // Object{value:6, done:false}
a.next() // Object{value:NaN, done:false}
a.next() // Object{value:NaN, done:true}

var b = foo(5);
b.next() // { value:6, done:false }
b.next(12) // { value:8, done:false }
b.next(13) // { value:42, done:true }


/**
 * Generator.prototype.throw()
 * Generator 函数返回的遍历器对象， 都有一个throw方法， 可以在函数体外抛出错误， 然后在 Generator 函数体内捕获。
 * throw方法抛出的错误要被内部捕获， 前提是必须至少执行过一次next方法。
 * 因为抛出点在yield
 */

 var g = function* () {
  try {
    yield;
  } catch (e) {
    console.log('内部捕获', e);
  }
};

var i = g();
i.next();

try {
  i.throw('a');
  i.throw('b');
} catch (e) {
  console.log('外部捕获', e);
}
// 内部捕获 a
// 外部捕获 b

/**
 * Generator.prototype.return()
 * 外部提前结束生成器
 */
function* gen() {
    yield 1;
    yield 2;
    yield 3;
}

var g = gen();

g.next() // { value: 1, done: false }
g.return('foo') // { value: "foo", done: true }
g.next() // { value: undefined, done: true }

/**
 * next()、 throw ()、 return () 的共同点
 * 它们的作用都是让 Generator 函数恢复执行。并且使用不同的语句替换yield表达式。
 *  next() 是将yield表达式替换成一个值。
 * throw()是将yield表达式替换成一个throw语句。
 * return()是将yield表达式替换成一个return语句。
 */

 /**
  * yield* iterable 表达式：对iterable每个元素前加入yield
  * 返回值为 iterable的return
  */

function* foo() {
    yield 'a';
    yield 'b';
}
function* bar() {
    yield 'x';
    yield* foo();
    yield 'y';
}
// 等同于
function* bar() {
    yield 'x';
    yield 'a';
    yield 'b';
    yield 'y';
}
// 等同于
function* bar() {
    yield 'x';
    for (let v of foo()) {
        yield v;
    }
    yield 'y';
}

for (let v of bar()) {
    console.log(v);
}

function* gen() {
    yield* ["a", "b", "c"];
}

gen().next() // { value:"a", done:false }