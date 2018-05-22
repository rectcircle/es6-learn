/**
 *
 * var 只有函数作用域和全局作用域， 并进行变量作用域提升（在使用之前可以读到undefined值）
 * let 创建一个块作用域，特别注意的是：
 * 在块作用域中没有声明之前也不能使用这个符号（暂时性死区）
 * 不允许重复声明
 * 
 * let的本质是创建了块级作用域（和{}配合使用）
 */

 console.log(b);

{
    let a = 10;
    var b = 1;
}

//a // ReferenceError: a is not defined.
b // 1


/**
 * let特别适合循环计数
 */
for (let i = 0; i < 10; i++) {
    // ...
}
//  console.log(i); //undefined error

/**
 * var的坑：循环不会创建for循环内闭包，而是全局闭包
 */
var a = [];
for (var i = 0; i < 10; i++) {
    a[i] = function () {
        console.log(i);
    };
}
a[6](); // 10

/**
 * 使用let将会创建块级局部闭包（for内为调用某函数）
 */

var a = [];
for (let i = 0; i < 10; i++) {
    a[i] = function () {
        console.log(i);
    };
}
a[6](); // 6

/**
 * for循环还有一个特别之处， 就是设置循环变量的那部分是一个父作用域， 
 * 而循环体内部是一个单独的子作用域。
 */
for (let i = 0; i < 3; i++) {
    let i = 'abc';
    console.log(i);
}

/**
 * 暂时性死区TDZ
 */
var tmp = 123;

{
    // TDZ开始
    // tmp = 'abc'; // ReferenceError
    // console.log(tmp); // ReferenceError

    let tmp; // TDZ结束
    console.log(tmp); // undefined

    tmp = 123;
    console.log(tmp); // 123
}

// 不报错
var x = x;

// 报错
// let x = x;
// ReferenceError: x is not defined

/**
 * 函数参数具有let特性（同样存在TDZ）
 */
// function bar(x = y, y = 2) {
//     return [x, y];
// }

// bar(); // 报错

function bar(x = 2, y = x) {
    return [x, y];
}
bar(); // [2, 2]


/**
 * let在同一个作用域内不允许重复声明
 */
// 报错
// function func() {
//     let a = 10;
//     var a = 1;
// }

// 报错
// function func() {
//     let a = 10;
//     let a = 1;
// }

// function func(arg) {
//     let arg; // 报错
// }

function func(arg) {
    {
        let arg; // 不报错
    }
}
func()



/**
 * 块级作用域与函数声明：
 * ES5 规定， 函数只能在顶层作用域和函数作用域之中声明， 不能在块级作用域声明
 * ES6 引入了块级作用域， 明确允许在块级作用域之中声明函数。行为类似let
 *
 * 但在浏览器环境为了兼容： 块级作用域函数声明行为类似var
 * 
 * 尽量使用函数变量代替函数声明，在块作用域内声明函数
 * 
 */
function f() {
    console.log('I am outside!');
}

(function () {
    if (false) {
        // 重复声明一次函数f
        function f() {
            console.log('I am inside!');
        }
    }

    f(); //报错f不是函数
}());
