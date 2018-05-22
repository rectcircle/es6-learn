/**
 * 支持函数参数默认值
 */
function log(x, y = 'World') {
    console.log(x, y);
}

log('Hello') // Hello World
log('Hello', 'China') // Hello China
log('Hello', '') // Hello

function Point(x = 0, y = 0) {
    this.x = x;
    this.y = y;
}

const p = new Point();
p // { x: 0, y: 0 }


//解构默认值和参数默认值配合使用
function foo({x, y = 5} = {}) {
  console.log(x, y);
}

foo() // undefined 5

function fetch(url, {
    body = '',
    method = 'GET',
    headers = {}
}) {
    console.log(method);
}

fetch('http://example.com', {})
// "GET"

// fetch('http://example.com')// 报错

//参数默认值的位置
// 例一
function f(x = 1, y) {
  return [x, y];
}

f() // [1, undefined]
f(2) // [2, undefined])
// f(, 1) // 报错
f(undefined, 1) // [1, 1]

// 例二
function f(x, y = 5, z) {
  return [x, y, z];
}

f() // [undefined, 5, undefined]
f(1) // [1, 5, undefined]
// f(1, ,2) // 报错
f(1, undefined, 2) // [1, 5, 2]

/**
 * 函数的 length 属性
 * 指定了默认值以后， 函数的length属性， 将返回没有指定默认值的参数个数。 也就是说， 指定了默认值后， length属性将失真。
 */
(function (a) {}).length // 1
(function (a = 5) {}).length // 0
(function (a, b, c = 5) {}).length // 2

/**
 * 函数作用域：
 * 一旦设置了参数的默认值， 函数进行声明初始化时， 参数会形成一个单独的作用域，执行let行为
 * 函数体是参数的子作用域
 */
var x = 1;

function f(x, y = x) {
    console.log(y);
}

f(2) // 2

let x = 1;

function f(y = x) {
    let x = 2;
    console.log(y);
}

f() // 1


// var x = 1;
// function foo(x = x) {
//     // ...
// }
// foo() // ReferenceError: x is not defined


var x = 1;

function foo(x, y = function () {
    x = 2;
}) {
    var x = 3;
    y();
    console.log(x);
}

foo() // 3
x // 1

/**
 * rest 参数（ 形式为...变量名）、类似于很多其他语言的可变参数
 */
function add(...values) {
    let sum = 0;

    for (var val of values) {
        sum += val;
    }

    return sum;
}

add(2, 5, 3) // 10
add(...[2,5,3])

/**
 * 函数的name属性
 */
function foo() {}
foo.name // "foo"


var f = function () {};

// ES5
f.name // ""

// ES6
f.name // "f"

(new Function).name // "anonymous"


/**
 * lambda表达式：箭头记法
 */
var f = v => v;

// 等同于
var f = function (v) {
    return v;
};

// 报错
// let getTempItem = id => {
//     id: id,
//     name: "Temp"
// };

// 不报错
let getTempItem = id => ({
    id: id,
    name: "Temp"
});


/**
 * this绑定符号`obj::func`
 * ES2017语法，暂不支持
 */

 let foo = {}
 let bar = function () {}

//  foo::bar;
//  // 等同于
//  bar.bind(foo);

//  foo::bar(...arguments);
//  // 等同于
//  bar.apply(foo, arguments);

//  const hasOwnProperty = Object.prototype.hasOwnProperty;

//  function hasOwn(obj, key) {
//      return obj::hasOwnProperty(key);
//  }

/**
 * 明确要求实现尾递归和尾调用优化
 */
function factorial(n, total = 1) {
    if (n === 1) return total;
    return factorial(n - 1, n * total);
}
factorial(5) // 120

/**
 * ES2017支持最后参数冗余的逗号
 */
function clownsEverywhere(
    param1,
    param2,
) { /* ... */ }

clownsEverywhere(
    'foo',
    'bar',
);