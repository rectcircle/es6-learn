/**
 * import 会做静态分析，而不是动态加载
 */

//导入
import {firstName, lastName, year} from './export.js';

function sayName() {
    console.log(firstName + ' ' + lastName);
}

sayName()

//导入并重命名
import { lastName as surname } from './export.js';

console.log(surname);

//执行但是不导入
import './export.js';

//导入全部
import * as m from "./export.js";

console.log(m.multiply(2,3))

//导入export default的内容
import defaultfunc from "./export.js"


/**
 * 导入并导出
 */
export { foo, bar } from './export.js';

// 可以简单理解为
// import { foo, bar } from 'my_module';
// export { foo, bar };

// 接口改名
export { foo as myFoo } from './export.js';

// 整体输出
export * from './export.js';

//默认接口的写法如下。
export { default } from './export.js';

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