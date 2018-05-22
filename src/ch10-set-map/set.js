/**
 * ES6新增Set数据结构：集、元素不可重复
 */
const s = new Set();

[2, 3, 5, 4, 5, 2, 2].forEach(x => s.add(x));

for (let i of s) {
    console.log(i);
}
// 2 3 5 4

// 例一
const set = new Set([1, 2, 3, 4, 4]);
[...set]
// [1, 2, 3, 4]

// 例二
const items = new Set([1, 2, 3, 4, 5, 5, 5, 5]);
items.size // 5

/*
Set 实例的属性和方法
Set 结构的实例有以下属性。

Set.prototype.constructor： 构造函数， 默认就是Set函数。
Set.prototype.size： 返回Set实例的成员总数。
Set 实例的方法分为两大类： 操作方法（ 用于操作数据） 和遍历方法（ 用于遍历成员）。 下面先介绍四个操作方法。

add(value)： 添加某个值， 返回 Set 结构本身。
delete(value)： 删除某个值， 返回一个布尔值， 表示删除是否成功。
has(value)： 返回一个布尔值， 表示该值是否为Set的成员。
clear()： 清除所有成员， 没有返回值。
*/

s.add(1).add(2).add(2);
// 注意2被加入了两次

s.size // 2

s.has(1) // true
s.has(2) // true
s.has(3) // false

s.delete(2);
s.has(2) // false


/*
遍历操作
keys()： 返回键名的遍历器
values()： 返回键值的遍历器
entries()： 返回键值对的遍历器
forEach()： 使用回调函数遍历每个成员

*/

let set = new Set(['red', 'green', 'blue']);

for (let item of set.keys()) {
    console.log(item);
}
// red
// green
// blue

for (let item of set.values()) {
    console.log(item);
}
// red
// green
// blue

for (let item of set.entries()) {
    console.log(item);
}
// ["red", "red"]
// ["green", "green"]
// ["blue", "blue"]

Set.prototype[Symbol.iterator] === Set.prototype.values
// true

for (let x of set) {
    console.log(x);
}
// red
// green
// blue


/*
 WeakSet:
 WeakSet 结构与 Set 类似， 也是不重复的值的集合。 但是， 它与 Set 有两个区别。
 首先， WeakSet 的成员只能是对象， 而不能是其他类型的值。
 WeakSet 中的对象都是弱引用
 
 适合做缓存
 WeakSet 不可遍历。没有size
 */
const ws = new WeakSet();
const obj = {};
const foo = {};

ws.add(window);
ws.add(obj);

ws.has(window); // true
ws.has(foo); // false

ws.delete(window);
ws.has(window); // false

ws.size // undefined
ws.forEach // undefined

ws.forEach(function (item) {
    console.log('WeakSet has ' + item)
})
// TypeError: undefined is not a function