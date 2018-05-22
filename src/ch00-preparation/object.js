/**
 * 创建对象
 */
//直接创建实例
person = new Object();
person.firstname = "Bill";
person.lastname = "Gates";
person.age = 56;
person.eyecolor = "blue";
console.log(person);

//通过字面量创建对象
person = {
    firstname: "John",
    lastname: "Doe",
    age: 50,
    eyecolor: "blue"
};
console.log(person);


/**
 * 在js中一切都是对象（这个对象可以理解为类似与`{}`的结构），一切对象都是由构造函数new出来了
 * 内置类型如下：
 * Number
 * 
 * 
 */


/**
 * 使用原型链实现面向对象
 */
//创建构造函数，就是一个普通的函数
//使用function关键字创建的是一个函数对象类型
//该函数的__proto__指向Function.prototype
function Person(firstname, lastname, age, eyecolor) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.age = age;
    this.eyecolor = eyecolor;
}
//函数对象有一个属性prototype，是一个对象
Person.prototype.description = "人类，一种哺乳动物" //这种方式就可以实现一个所有对象共享的属性（静态变量）
Person.prototype.sayHello = function () { //这种方式就可以实现一个成员函数
    console.log("Hello, My name is "+this.firstname); 
}

//默认情况下prototype有一个属性constructor函数函数自身
//prototype包含了一个__proto__（chrome中）属性 指向 Object函数的prototype
console.log(Person.prototype.constructor === Person)

var bill = new Person("Bill", "Gates", 56, "blue");
/**
 * new的执行过程创建一个this = {}
 * 1、 执行Person函数
 * 2、 在this上创建一个属性（ 在chrome中为__proto__） 指向Person.prototype
 */
var steve = new Person("Steve", "Jobs", 48, "green");
console.log(bill.__proto__ === Person.prototype);
console.log(bill.constructor === Person); 

/**
 * 访问对象的属性的执行过程：
 * 1、 查找对象的属性
 * 2、 如果找不到，递归查找原型链上的属性
 */
console.log(bill.firstname);
console.log(bill.description === steve.description);
bill.sayHello();
console.log(Person.prototype.isPrototypeOf(steve));
console.log(Person.__proto__);


//继承
function Animal(type) {
    this.type = type;
}

Animal.prototype.sayType = function () {
    console.log("I'm a "+this.type);
}

function Cat(name, color) {
    Animal.apply(this, ["cat"]);
    this.name = name
    this.color = color;
}

// Cat.prototype.__proto__ = Animal.prototype //不推荐，这并不是标准，下面是等价实现

var F = function () {};
F.prototype = Animal.prototype;
Cat.prototype = new F();
Cat.prototype.constructor = Cat;

Cat.prototype.sayName = function () {
    console.log("My name is "+this.name);
}


var c = new Cat("hua", "blank");
c.sayType();
c.sayName();

console.log("======");

for (let key in c) { //尽量不要使用for in，继承的内容也会遍历出来，使用Object.keys()
    console.log(key);
}

console.log("=======");

console.log(Object.keys(c))


/**
 * ES5
 * 对象的get set
 * 这样对属性的访问变为：
 * 先查找是否定义get、set访问器
 * 如果存在使用访问器
 * 如果不存在，直接找到对应的属性
 * 
 * 可以将一个属性理解成一对默认的getset函数，
 * 读取，调用get；写入调用set，如果有同名，自定义的优先，
 */
var p = {
    name: "chen",
    work: function () {
        console.log("wording...");
    },
    age:10, //被覆盖，无法访问
    _age: 18, //按约定使用_开头，
    get age() {
        //return this.age; //无限递归，报错
        return this._age; 
    },
    set age(val) {
        if (val < 0 || val > 100) { //如果年龄大于100就抛出错误
            throw new Error("invalid value")
        } else {
            this._age = val;
        }
    }
};
console.log(p.name);
