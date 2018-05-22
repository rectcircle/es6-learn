/**
 * 最新提案动态： https: //github.com/tc39
 */

// do表达式：类似scala写法作用域块的最后一个语句的值为这个块的返回值，更加函数式
// let x = do {
//     let t = f();
//     t * t + 1;
// };

// 函数的部分执行：类似于scala的偏函数
// const add = (x, y) => x + y;
// const addOne = add(1, ? );
// const maxGreaterThanZero = Math.max(0, ...);

// 管道运算符：x |> f 等价于 f(x)
// 传统的写法
// exclaim(capitalize(doubleSay('hello')))
// // "Hello, hello!"
// // 管道的写法
// 'hello'
//   |> doubleSay
//   |> capitalize
//   |> exclaim
// // "Hello, hello!"

// BigInt：类似于Java大整数

