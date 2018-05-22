/**
 * 简介属性表示法
 */
const foo = 'bar';
const baz = {foo};
baz // {foo: "bar"}

// 等同于
const baz = {foo: foo};


function f(x, y) {
  return {x, y};
}

// 等同于

function f(x, y) {
  return {x: x, y: y};
}

f(1, 2) // Object {x: 1, y: 2}


//方法简写
const o = {
    method() {
        return "Hello!";
    }
};

// 等同于

const o = {
    method: function () {
        return "Hello!";
    }
};

//属性的赋值器（ setter） 和取值器（ getter）， 事实上也是采用这种写法。
const cart = {
    _wheels: 4,

    get wheels() {
        return this._wheels;
    },

    set wheels(value) {
        if (value < this._wheels) {
            throw new Error('数值太小了！');
        }
        this._wheels = value;
    }
}

/**
 * 属性名表达式
 */
// 方法一
obj.foo = true;

// 方法二
obj['a' + 'bc'] = 123;

//ES5
var obj = {
    foo: true,
    abc: 123
};

//ES6
let propKey = 'foo';

let obj = {
    [propKey]: true,
    ['a' + 'bc']: 123
};

let obj = {
    ['h' + 'ello']() {
        return 'hi';
    }
};

obj.hello() // hi


/**
 * 方法的name属性
 */
const person = {
    sayName() {
        console.log('hello!');
    },
};

person.sayName.name // "sayName"


const obj = {
    get foo() {},
    set foo(x) {}
};

// obj.foo.name // TypeError: Cannot read property 'name' of undefined

const descriptor = Object.getOwnPropertyDescriptor(obj, 'foo');

descriptor.get.name // "get foo"
descriptor.set.name // "set foo"


/**
 * Object 相关内容
 */

//Object.is()，与===行为一致
Object.is('foo', 'foo')// true
Object.is({}, {})// false
//区别在于
+ 0 === -0 //true
NaN === NaN // false
Object.is(+0, -0) // false
Object.is(NaN, NaN) // true

//Object.assign() 对象合并（后面覆盖前面）（浅拷贝）
const target = { a: 1 };
const source1 = { b: 2 };
const source2 = { c: 3 };
Object.assign(target, source1, source2);
target // {a:1, b:2, c:3}
//作用：
//为对象添加属性和方法
//克隆对象(不能拷贝继承链)
function clone(origin) {
    return Object.assign({}, origin);
}
//带继承链的拷贝
function clone(origin) {
    let originProto = Object.getPrototypeOf(origin); //获取__proto__
    //Object.create(__proto__)，以__proto__为原型，创建对象
    return Object.assign(Object.create(originProto), origin); 
}
//合并多个参数
//为选项指定默认值


/**
 * 对象属性可枚举性和遍历
 */
let obj = {
    foo: 123
};
Object.getOwnPropertyDescriptor(obj, 'foo')
//  {
//    value: 123,
//    writable: true,
//    enumerable: true,
//    configurable: true
//  }
//描述对象的enumerable属性， 称为” 可枚举性“， 如果该属性为false， 就表示某些操作会忽略当前属性。
/*
 目前， 有四个操作会忽略enumerable为false的属性。
 for...in循环： 只遍历对象自身的和继承的可枚举的属性。
 Object.keys()： 返回对象自身的所有可枚举的属性的键名。
 JSON.stringify()： 只串行化对象自身的可枚举的属性。
 Object.assign()： 忽略enumerable为false的属性， 只拷贝对象自身的可枚举的属性。
*/

//另外， ES6 规定， 所有 Class 的原型的方法都是不可枚举的。
//总的来说，操作中引入继承的属性会让问题复杂化，大多数时候，我们只关心对象自身的属性。所以，尽量不要用for...in循环，而用Object.keys()代替。


/**
 * 属性的遍历
（1）for...in
for...in循环遍历对象自身的和继承的可枚举属性（不含 Symbol 属性）。
（2）Object.keys(obj)
Object.keys返回一个数组，包括对象自身的（不含继承的）所有可枚举属性（不含 Symbol 属性）的键名。
（3）Object.getOwnPropertyNames(obj)
Object.getOwnPropertyNames返回一个数组，包含对象自身的所有属性（不含 Symbol 属性，但是包括不可枚举属性）的键名。
（4）Object.getOwnPropertySymbols(obj)
Object.getOwnPropertySymbols返回一个数组，包含对象自身的所有 Symbol 属性的键名。
（5）Reflect.ownKeys(obj)
Reflect.ownKeys返回一个数组，包含对象自身的所有键名，不管键名是 Symbol 或字符串，也不管是否可枚举。
以上的 5 种方法遍历对象的键名，都遵守同样的属性遍历的次序规则。

首先遍历所有数值键，按照数值升序排列。
其次遍历所有字符串键，按照加入时间升序排列。
最后遍历所有 Symbol 键，按照加入时间升序排列。
 */




/**
 * 获取__proto__属性， Object.setPrototypeOf()， Object.getPrototypeOf()
 * 在ES6中， __proto__只有浏览器必须部署这个属性， 其他运行环境不一定需要部署
 */



 /**
  * ES6新增
  * super 关键字
  * super === this.__proto__
  */
// function testSuper() {
//     console.log(super.__proto__ === this.__proto__.__proto__);
// }
// testSuper()

/**
 * 获取对象属性（不包含原型链中的内容）Object.keys()， Object.values()， Object.entries()
 */

 let obj = { a: 1, b: 2, c: 3 };

for (let key of Object.keys(obj)) {
  console.log(key); // 'a', 'b', 'c'
}


//ES2018 针对对象引入了扩展运算符...

//解构赋值
let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
x // 1
y // 2
z // { a: 3, b: 4 }

//不会拷贝原型链内容，浅拷贝
let o1 = { a: 1 };
let o2 = { b: 2 };
o2.__proto__ = o1;
let { ...o3 } = o2;
o3 // { b: 2 }
o3.a // undefined

// let { x, ...{ y, z } } = o; //SyntaxError

//扩展某个函数的参数，引入其他操作
function baseFunction({ a, b }) {
  // ...
}
function wrapperFunction({ x, y, ...restConfig }) {
  // 使用 x 和 y 参数进行操作
  // 其余参数传给原始函数
  return baseFunction(restConfig);
}

// 扩展运算符
let z = { a: 3, b: 4 };
let n = { ...z };
n // { a: 3, b: 4 }

let aClone = { ...a };
// 等同于
let aClone = Object.assign({}, a);


//原型拷贝
// 写法一
const clone1 = {
  __proto__: Object.getPrototypeOf(obj),
  ...obj
};

// 写法二
const clone2 = Object.assign(
  Object.create(Object.getPrototypeOf(obj)),
  obj
);

// 写法三
const clone3 = Object.create(
  Object.getPrototypeOf(obj),
  Object.getOwnPropertyDescriptors(obj)
)

//同样会发生覆盖等情况
let ab = { ...a, ...b };
// 等同于
let ab = Object.assign({}, a, b);