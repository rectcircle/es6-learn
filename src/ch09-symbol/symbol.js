/**
 * ES6新增第七种基本数据类型`Symbol`
 * 表示独一无二的值。
 */
let s = Symbol();

typeof s// "symbol"


//Symbol函数可以接受一个字符串作为参数，
//表示对 Symbol 实例的描述，主要是为了在控制台显示，或者转为字符串时，比较容易区分。
let s1 = Symbol('foo');
let s2 = Symbol('bar');

s1 // Symbol(foo)
s2 // Symbol(bar)

s1.toString() // "Symbol(foo)"
s2.toString() // "Symbol(bar)"


//每一个symbol都是独一无二的
// 没有参数的情况
let s1 = Symbol();
let s2 = Symbol();

s1 === s2 // false

// 有参数的情况
let s1 = Symbol('foo');
let s2 = Symbol('foo');

s1 === s2 // false


//Symbol 值不能与其他类型的值进行运算，会报错。
let sym = Symbol('My symbol');

// "your symbol is " + sym // TypeError: can't convert symbol to string
// `your symbol is ${sym}` // TypeError: can't convert symbol to string

//但是，Symbol 值可以显式转为字符串。
let sym = Symbol('My symbol');

String(sym) // 'Symbol(My symbol)'
sym.toString() // 'Symbol(My symbol)'

//另外，Symbol 值也可以转为布尔值，但是不能转为数值。
let sym = Symbol();
Boolean(sym) // true
!sym  // false

if (sym) {
  // ...
}

// Number(sym) // TypeError
// sym + 2 // TypeError




/**
 * Symbol作为对象的属性名
 */

let mySymbol = Symbol();

// 第一种写法
let a = {};
a[mySymbol] = 'Hello!';

// 第二种写法
let a = {
    [mySymbol]: 'Hello!'
};

// 第三种写法
let a = {};
Object.defineProperty(a, mySymbol, {
    value: 'Hello!'
});

// 以上写法都得到同样结果
a[mySymbol] // "Hello!"

//注意，Symbol 值作为对象属性名时，不能用点运算符。
const mySymbol = Symbol();
const a = {};

a.mySymbol = 'Hello!';
a[mySymbol] // undefined
a['mySymbol'] // "Hello!"


//Symbol 类型还可以用于定义一组常量， 保证这组常量的值都是不相等的。

log.levels = {
    DEBUG: Symbol('debug'),
    INFO: Symbol('info'),
    WARN: Symbol('warn')
};
log(log.levels.DEBUG, 'debug message');
log(log.levels.INFO, 'info message');


//使用Symbol作为枚举常量不错

/**
 * 属性名遍历
 * Symbol 作为属性名， 
 * 该属性不会出现在for... in 、 for...of循环中，
 * 也不会被Object.keys()、 Object.getOwnPropertyNames()、 JSON.stringify() 返回。 但是， 它也不是私有属性， 
 * 有一个Object.getOwnPropertySymbols方法， 可以获取指定对象的所有 Symbol 属性名。
 */
const obj = {};
let a = Symbol('a');
let b = Symbol('b');

obj[a] = 'Hello';
obj[b] = 'World';

const objectSymbols = Object.getOwnPropertySymbols(obj);

objectSymbols
// [Symbol(a), Symbol(b)]


let obj = {
    [Symbol('my_key')]: 1,
    enum: 2,
    nonEnum: 3
};

//获取对象的是所有键名
Reflect.ownKeys(obj)
//  ["enum", "nonEnum", Symbol(my_key)]


//由于以 Symbol 值作为名称的属性，不会被常规方法遍历得到。
//我们可以利用这个特性，为对象定义一些非私有的、但又希望只用于内部的方法。


/**
 * 重复获取同一个Symbol
 * Symbol.for()， //缓存中没有，创建一个并放入缓存，若有直接返回引用
 * Symbol.keyFor() //缓存中没有，返回undefined，若有直接返回引用
 */
let s1 = Symbol.for('foo');
let s2 = Symbol.for('foo');

s1 === s2 // true
s1 === Symbol('foo'); // false


//使用Symbol实现模块全局单例


/**
 * 内置的 Symbol 值：
 * 是对象，内部实现函数的key，可以通过内置Symbol覆写，以改变行为
 * 比如实现系统级别接口（可迭代）
 * 是自定义对象支持内置的函数或运算符
 */
//Symbol.hasInstance
class MyClass {
    [Symbol.hasInstance](foo) {
        return foo instanceof Array;
    }
}

[1, 2, 3] instanceof new MyClass() // true

//Symbol.isConcatSpreadable
let arr1 = ['c', 'd'];
['a', 'b'].concat(arr1, 'e') // ['a', 'b', 'c', 'd', 'e']
arr1[Symbol.isConcatSpreadable] // undefined

let arr2 = ['c', 'd'];
arr2[Symbol.isConcatSpreadable] = false;
['a', 'b'].concat(arr2, 'e') // ['a', 'b', ['c','d'], 'e']

//Symbol.species
class MyArray extends Array {}

const a = new MyArray(1, 2, 3);
const b = a.map(x => x);
const c = a.filter(x => x > 1);

b instanceof MyArray // true
c instanceof MyArray // true

class MyArray extends Array {
    static get[Symbol.species]() {
        return Array;
    }
    //默认如下
    //static get [Symbol.species]() {
    //return this;
    //}
}

const a = new MyArray();
const b = a.map(x => x);

b instanceof MyArray // false
b instanceof Array // true

//其他略







