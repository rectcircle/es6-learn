/**
 * 使用传统方式：构造函数生成类
 */
function Point(x, y) {
    this.x = x;
    this.y = y;
}

Point.prototype.toString = function () {
    return '(' + this.x + ', ' + this.y + ')';
};

var p = new Point(1, 2);

/**
 * ES6的写法，完全是上面写法的语法糖
 * 与传统写法的不同：
 *  类的内部所有定义的方法， 都是不可枚举的
 *  只能通过new使用，不可当做函数使用
 *  不存在变量提升
 *  不支持私有方法属性
 * 
 */
class Point {
    //构造函数
    constructor(x, y) { //不写会默认提供一个空构造函数
        this.x = x;
        this.y = y;
        //默认返回this，尽量不要就修改
        //return Object.create(null); //直接返回new 出来的是{}??
    }
    //实例方法
    toString() {
        return '(' + this.x + ', ' + this.y + ')';
    }
    //设取值器
    get prop() {
        return 'getter';
    }
    set prop(value) {
        console.log('setter: ' + value);
    }

    //迭代器接口实现
    *[Symbol.iterator]() {
        yield this.x;
        yield this.y;
    }

    //静态方法
    //只能通过`类名.静态方法名`调用
    //可以被继承，可以使用supper
    static classMethod(){ 
        //this指向这个实例
        return 'hello';
    }
}

//静态属性只能写在类外：
Point.staticField = 1;
// 以下两种写法都无效
// class Foo {
//   // 写法一
//   prop: 2

//   // 写法二
//   static prop: 2
// }

typeof Point
Point.prototype.constructor === Point
Object.keys(Point.prototype) 


/**
 * Class表达式
 */
const MyClass = class Me {
    getClassName() {
        return Me.name;
    }
};

let person = new class {
  constructor(name) {
    this.name = name;
  }

  sayName() {
    console.log(this.name);
  }
}('张三');


//不存在变量提升
new Foo(); // ReferenceError
class Foo {}


/**
 * 为了实现构造函数只能使用new调用，添加了new.target属性，指向new后面的对象
 */
function Person(name) {
    if (new.target !== undefined) { //只能使用new调用
        this.name = name;
    } else {
        throw new Error('必须使用 new 命令生成实例');
    }
}

function Person(name) {
  if (new.target === Person) { //不允许被继承
    this.name = name;
  } else {
    throw new Error('必须使用 new 命令生成实例');
  }
}

//类似抽象类
class Shape {
  constructor() {
    if (new.target === Shape) { //必须被继承使用
      throw new Error('本类不能实例化');
    }
  }
}

class Rectangle extends Shape {
  constructor(length, width) {
    super();
    // ...
  }
}


/**
 * 
 * ES6继承
 *  支持单继承
 *  与手写继承区别
 *  先构造父类实例， 然后再用子类的构造函数修饰this， 使得父类的所有行为都可以继承。
 *  因此可以继承js内部原生构造函数的继承
 */

class A {
    constructor(){
        this.s = 1;
        this.a = 1;
    }
    mothed(){
        console.log("from A");
    }
}


//extends等价于设置B.prototype.__proto__ = A.prototype
class B extends A { 
    constructor() {
        super(); //必须写，否则无法实例化
        // super()等价于调用 this.__proto__.__proto__.constructor()
        this.s = 2; //子类覆盖A的
        this.b = 2;
    }
    mothed() {
        super.mothed();
        // super.mothed()等价于调用 this.__proto__.__proto__.method()
        console.log("from B");
    }
}

var b = new B()
b.mothed()

//原生构造函数的继承
//继承Array
class MyArray extends Array {
    constructor(...args) {
        super(...args);
    }
}

var arr = new MyArray();
arr[0] = 12;
arr.length // 1

arr.length = 0;
arr[0] // undefined


//Mixin 模式的实现
//Mixin 指的是多个对象合成一个新的对象，新对象具有各个组成成员的接口。它的最简单实现如下。

const a = {
  a: 'a'
};
const b = {
  b: 'b'
};
const c = {...a, ...b}; // {a: 'a', b: 'b'}

function mix(...mixins) {
  class Mix {}

  for (let mixin of mixins) {
    copyProperties(Mix, mixin); // 拷贝实例属性
    copyProperties(Mix.prototype, mixin.prototype); // 拷贝原型属性
  }

  return Mix;
}

function copyProperties(target, source) {
  for (let key of Reflect.ownKeys(source)) {
    if ( key !== "constructor"
      && key !== "prototype"
      && key !== "name"
    ) {
      let desc = Object.getOwnPropertyDescriptor(source, key);
      Object.defineProperty(target, key, desc);
    }
  }
}


class DistributedEdit extends mix(Loggable, Serializable) {
    // ...
}