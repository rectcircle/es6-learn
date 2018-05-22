/**
 * Reflect对象与Proxy对象一样， 也是 ES6 为了操作对象而提供的新 API。
 * Reflect对象的设计目的有这样几个。
 * 将Object对象的一些明显属于语言内部的方法， 放到Reflect对象上。
 * 修改某些Object方法的返回结果， 让其变得更合理。
 * 让Object操作都变成函数行为
 * Reflect对象的方法与Proxy对象的方法一一对应， 只要是Proxy对象的方法， 就能在Reflect对象上找到对应的方法。
 */


 /*
Reflect对象一共有 13 个静态方法。

Reflect.apply(target, thisArg, args)
Reflect.construct(target, args)
Reflect.get(target, name, receiver)
Reflect.set(target, name, value, receiver)
Reflect.defineProperty(target, name, desc)
Reflect.deleteProperty(target, name)
Reflect.has(target, name)
Reflect.ownKeys(target)
Reflect.isExtensible(target)
Reflect.preventExtensions(target)
Reflect.getOwnPropertyDescriptor(target, name)
Reflect.getPrototypeOf(target)
Reflect.setPrototypeOf(target, prototype)

 */



 //例子：使用 Proxy 实现观察者模式
const queuedObservers = new Set();

const observe = fn => queuedObservers.add(fn);

function set(target, key, value, receiver) {
    const result = Reflect.set(target, key, value, receiver);
    queuedObservers.forEach(observer => observer());
    return result;
}
const observable = obj => new Proxy(obj, {set});

const person = observable({
    name: '张三',
    age: 20
});
observe(() => {
    console.log(`${person.name}, ${person.age}`)
});
person.name = '李四';

