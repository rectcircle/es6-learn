//http://es6.ruanyifeng.com

/**
 * 行为类似与var，但是只读的，必须初始化，这方面的行为类似与java final
 * const修饰一个对象，对象的内容可变
 */

 const PI = 3.1415;
 PI // 3.1415

//  PI = 3; //TypeError: Assignment to constant variable.

// const foo; // SyntaxError: Missing initializer in const declaration

const foo = {};

// 为 foo 添加一个属性，可以成功
foo.prop = 123;
foo.prop // 123

// 将 foo 指向另一个对象，就会报错
// foo = {}; // TypeError: "foo" is read-only