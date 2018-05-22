/**
 * ES5之前： 顶层对象的属性与全局变量是等价的。
 */
global.a = 1;
console.log(a); // 1

a = 2;
console.log(global.a) // 2

/**
 * ES6 ：
 * var命令和function命令声明的全局变量， 依旧是顶层对象的属性
 * let命令、 const命令、 class命令声明的全局变量， 不属于顶层对象的属性
 */
var a = 1;
// 如果在 Node 的 REPL 环境，可以写成 global.a
// 或者采用通用方法，写成 this.a
console.log(global.a) // 1 在Node非REPL环境由于模块化问题，不会提升到全局对象属性中

let b = 1;
console.log(global.b) // undefined