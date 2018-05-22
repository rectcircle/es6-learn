/**
 * 扩展运算符（数组展开为参数）...
 */
console.log(...[1, 2, 3])
// 1 2 3

console.log(1, ...[2, 3, 4], 5)
// 1 2 3 4 5

const arr = [
    ...(x > 0 ? ['a'] : []),
    'b',
];

[...[[]], 1]
// [1]

/**
 * 扩展运算符的用途
 */
//替代apply
function f(x, y, z) {
    // ...
}
// ES5 的写法
var args = [0, 1, 2];
f.apply(null, args);
// ES6的写法
let args = [0, 1, 2];
f(...args);


//复制数组
const a1 = [1, 2];
// 写法一
const a2 = [...a1];
// 写法二
const [...a2] = a1;


//合并数组
const more = [1,2,3];
// ES5
[1, 2].concat(more)
// ES6
const arr = [1, 2, ...more]


//与解构赋值结合，获取数组的tail
const list = [1,2,3]
// ES5
a = list[0], rest = list.slice(1)
// ES6
let [a, ...rest] = list


//字符串转字符数组，能正确识别4字节Unicode
const chs = [...'hello']

//正确获得字符串长度（包含生僻字的）
function length(str) {
    return [...str].length;
}
length("𠮷𠮷𠮷") //3
"𠮷𠮷𠮷".length //6


//... 支持所有实现Iterator接口的对象（包括Map、Set、Generator函数）

/**
 * Array.from() 将like-array转换为真正的数组
 * Array.of() 将一组值， 转换为数组。
 */
let arrayLike = {
    '0': 'a',
    '1': 'b',
    '2': 'c',
    length: 3
};

// ES5的写法
var arr1 = [].slice.call(arrayLike); // ['a', 'b', 'c']

// ES6的写法
let arr2 = Array.from(arrayLike); // ['a', 'b', 'c']

Array.of(3, 11, 8) // [3,11,8]
Array.of(3) // [3]
Array.of(3).length // 1

/**
 * 数组实例的一些列方法：
 *
 * 数组实例的 copyWithin()
 * 数组实例的 find() 和 findIndex()
 * 数组实例的 fill()
 * 数组实例的 entries()， keys() 和 values()
 * 数组实例的 includes()
 */

/**
 * 数组的空位
 */
Array(3)
0 in [undefined, undefined, undefined] // true
0 in [, , , ] // false

//ES6 则是明确将空位转为undefined。



