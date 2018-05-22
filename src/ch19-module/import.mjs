/**
 * ES6 模块与 CommonJS 模块的差异
 * CommonJS 模块输出的是一个值的拷贝， ES6 模块输出的是值的引用。
 * CommonJS 模块是运行时加载， ES6 模块是编译时输出接口。
 * 
 * Node 如果想使用的话需要达到一下条件
 *  - Node v8.5.0 以上
 *  - node --experimental-modules my-app.mjs
 */

//导入
import {firstName, lastName, year} from './export';

function sayName() {
    console.log(firstName + ' ' + lastName);
}

sayName()

//导入并重命名
import { lastName as surname } from './export';

console.log(surname);

//执行但是不导入
import './export';

//导入全部
import * as m from "./export"; //包含default
console.log(m) 

//default 和其他
import d1, {year as year1} from './export';
console.log(d1)
console.log(year1)

console.log(m.multiply(2,3))

//导入export default的内容
import defaultfunc from "./export"


/**
 * 导入并导出
 */
export { foo, bar } from './export';

// 可以简单理解为
// import { foo, bar } from 'my_module';
// export { foo, bar };

// 接口改名
export { foo as myFoo } from './export';

// 整体输出
export * from './export';

//默认接口的写法如下。
export { default } from './export';

// export { es6 as default } from 'export';



/** 
 * 跨模块常量
 */

// constants.js 模块
export const A = 1;
export const B = 3;
export const C = 4;

// test1.js 模块
// import * as constants from './constants';
// console.log(constants.A); // 1
// console.log(constants.B); // 3

// test2.js 模块
// import {A, B} from './constants';
// console.log(A); // 1
// console.log(B); // 3


/**
 * 提案：动态及其在import()
 */
// import ('export')


/**
 * 模块加载 CommonJS 模块
 */
import obj from './commonjs';

// 写法二
// import {default as baz} from './a';

// 写法三
// import * as baz from './a';
// baz = {
//   get default() {return module.exports;},
//   get foo() {return this.default.foo}.bind(baz),
//   get bar() {return this.default.bar}.bind(baz)
// }

console.log(obj.foo + " " + obj.bar);
