//模板字符串：大段字符串相当于scala的 """  """
//同样可以通过${}  内部可以书写任意表达式。同样会报错
const tmp = 
`
  There are <b>3</b> items
   in your basket, <em>1</em>
  are on sale!
`

let x = 1;
let y = 2;

`${x} + ${y} = ${x + y}`
// "1 + 2 = 3"

`${x} + ${y * 2} = ${x + y * 2}`
// "1 + 4 = 5"

let obj = {
    x: 1,
    y: 2
};
`${obj.x + obj.y}`
// "3"


const template = inputs => 
`    inputs.a = ${inputs.a}
    inputs.b = ${inputs.b}
`
console.log(template({a:1, b:2}));

// // 变量place没有声明
// let msg = `Hello, ${place}`;
// // 报错

/**
 * 标签模板
 */
// tag `Hello ${ a + b } world ${ a * b }`;
// // 等同于
// tag(['Hello ', ' world ', ''], 15, 50);


/**
 * String.raw
 * 返回一个斜杠都被转义（ 即斜杠前面再加一个斜杠） 的字符串
 */

 