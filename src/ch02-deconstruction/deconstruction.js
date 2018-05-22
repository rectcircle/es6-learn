/**
 * 解构赋值，类似于scala的unapply，就是一种模式匹配
 */

let [a, b, c] = [1, 2, 3]

let [foo, [[bar], baz]] = [1, [[2], 3]];
foo // 1
bar // 2
baz // 3

let [ , , third] = ["foo", "bar", "baz"];
third // "baz"

let [x, , y] = [1, 2, 3];
x // 1
y // 3

let [head, ...tail] = [1, 2, 3, 4];
head // 1
tail // [2, 3, 4]

let [x, y, ...z] = ['a'];
x // "a"
y // undefined
z // []

//如果解构不成功， 变量的值就等于undefined。
let [foo] = [];
let [bar, foo] = [1];
//以上两种情况都属于解构不成功，foo的值都会等于undefined。

let [x, y] = [1, 2, 3];
x // 1
y // 2

let [a, [b], d] = [1, [2, 3], 4];
a // 1
b // 2
d // 4

// 报错
// let [foo] = 1;
// let [foo] = false;
// let [foo] = NaN;
// let [foo] = undefined;
// let [foo] = null;
// let [foo] = {};
// 上面的语句都会报错，
// 因为等号右边的值，
// 要么转为对象以后不具备 Iterator 接口（前五个表达式），
// 要么本身就不具备 Iterator 接口（最后一个表达式）。

//事实上， 只要某种数据结构具有 Iterator 接口， 都可以采用数组形式的解构赋值。
function* fibs() {
    let a = 0;
    let b = 1;
    while (true) {
        yield a;
        [a, b] = [b, a + b];
    }
}

let [first, second, third, fourth, fifth, sixth] = fibs();
sixth // 5
//上面代码中，fibs是一个 Generator 函数， 类似于Python特性

/**
 * 默认值
 */
let [foo = true] = [];
foo // true

let [x, y = 'b'] = ['a']; // x='a', y='b'
let [x, y = 'b'] = ['a', undefined]; // x='a', y='b'

//ES6 内部使用严格相等运算符（ === ），判断一个位置是否有值
let [x = 1] = [undefined];
x // 1

let [x = 1] = [null];
x // null

function f() {
    console.log('aaa');
}

let [x = f()] = [1];

let [x = 1, y = x] = []; // x=1; y=1
let [x = 1, y = x] = [2]; // x=2; y=2
let [x = 1, y = x] = [1, 2]; // x=1; y=2
// let [x = y, y = 1] = []; // ReferenceError: y is not defined


/**
 * 对象的解构赋值
 */
let { foo, bar } = { foo: "aaa", bar: "bbb" };
foo // "aaa"
bar // "bbb"

let { foo: baz } = { foo: 'aaa', bar: 'bbb' };
baz // "aaa"

let obj = { first: 'hello', last: 'world' };
let { first: f, last: l } = obj;
f // 'hello'
l // 'world'

//嵌套匹配
let obj = {
  p: [
    'Hello',
    { y: 'World' }
  ]
};

let { p: [x, { y }] } = obj;

let obj = {
  p: [
    'Hello',
    { y: 'World' }
  ]
};

let { p, p: [x, { y }] } = obj;
x // "Hello"
y // "World"
p // ["Hello", {y: "World"}]

let obj = {};
let arr = [];

({ foo: obj.prop, bar: arr[0] } = { foo: 123, bar: true });

obj // {prop:123}
arr // [true]

//对象的解构也可以指定默认值。
var {x = 3} = {};
x // 3

var {x, y = 5} = {x: 1};
x // 1
y // 5

var {x: y = 3} = {};
y // 3

var {x: y = 3} = {x: 5};
y // 5

var { message: msg = 'Something went wrong' } = {};
msg // "Something went wrong"

// 报错
let {foo: {bar}} = {baz: 'baz'}; 
//等价于
let _tmp = {baz: 'baz'};
_tmp.foo.bar // 报错

// 错误的写法
let x;
// {x} = {x: 1};
// SyntaxError: syntax error
// 因为 JavaScript 引擎会将{x}理解成一个代码块
// 正确的写法
let x;
({x} = {x: 1});

/**
 * 圆括号与解构赋值的关系
 */
({} = [true, false]);
({} = 'abc');
({} = []);

//对象的解构赋值，可以很方便地将现有对象的方法，赋值到某个变量。
let { log, sin, cos } = Math;


/**
 * 字符串解构赋值
 */
const [a, b, c, d, e] = 'hello';
a // "h"
b // "e"
c // "l"
d // "l"
e // "o"

let {length : len} = 'hello';
len // 5

// let { prop: x } = undefined; // TypeError
// let { prop: y } = null; // TypeError



/**
 * 函数参数解构赋值
 */
function add([x, y]) {
    return x + y;
}

add([1, 2]); // 3

[[1, 2], [3, 4]].map(([a, b]) => a + b);

// 函数参数解构也可以使用默认值
function move({x = 0, y = 0} = {}) {
  return [x, y];
}

move({x: 3, y: 8}); // [3, 8]
move({x: 3}); // [3, 0]
move({}); // [0, 0]
move(); // [0, 0]

//函数参数默认值
function move({x, y} = { x: 0, y: 0 }) {
  return [x, y];
}

move({x: 3, y: 8}); // [3, 8]
move({x: 3}); // [3, undefined]
move({}); // [undefined, undefined]
move(); // [0, 0]


//圆括号问题

/**
 * 常见用途
 */

// （1）交换变量的值
let x = 1;
let y = 2;

[x, y] = [y, x];

// （2）从函数返回多个值
// 返回一个数组

function example() {
  return [1, 2, 3];
}
let [a, b, c] = example();

// 返回一个对象

function example() {
  return {
    foo: 1,
    bar: 2
  };
}
let { foo, bar } = example();


// （3）函数参数的定义
// 参数是一组有次序的值
function f([x, y, z]) { /*...*/ }
f([1, 2, 3]);

// 参数是一组无次序的值
function f({x, y, z}) { /*...*/ }
f({z: 3, y: 2, x: 1});


// （4）提取 JSON 数据
let jsonData = {
  id: 42,
  status: "OK",
  data: [867, 5309]
};

let { id, status, data: number } = jsonData;

console.log(id, status, number);
// 42, "OK", [867, 5309]

// （5）函数参数的默认值
jQuery.ajax = function (url, {
    async = true,
    beforeSend = function () {},
    cache = true,
    complete = function () {},
    crossDomain = false,
    global = true,
    // ... more config
} = {}) {
    // ... do stuff
};

// （6）遍历 Map 结构
const map = new Map();
map.set('first', 'hello');
map.set('second', 'world');

for (let [key, value] of map) {
    console.log(key + " is " + value);
}
// first is hello
// second is world

// 获取键名
for (let [key] of map) {
    // ...
}

// 获取键值
for (let [, value] of map) {
    // ...
}

// （7）输入模块的指定方法
const { SourceMapConsumer, SourceNode } = require("source-map");