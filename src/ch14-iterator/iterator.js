/**
 * Iterator（ 遍历器）
 * 
 * ES6中共有四种集合类型：Array、Object、Set、Map
 * Iterator就是用于统一迭代可迭代对象的方法
 * 
 * JS中迭代器的作用
 * 一是为各种数据结构， 提供一个统一的、 简便的访问接口； 
 * 二是使得数据结构的成员能够按某种次序排列； 
 * 三是 ES6 创造了一种新的遍历命令for...of循环， Iterator 接口主要供for...of消费。
 * 四是 用于解构和扩展运算符`...`
 * 五是 由于`yield*`
 * 
 * 
 * Iterator方法：
 * next:{value, done:true|false}
 * return()，throw() （可选）
 */

 //使对象可迭代（实现Iterator 接口）：给对象添加属性[Symbol.iterator]属性，值为Iterator对象

 //例子
 const obj = {
     [Symbol.iterator]: function () {
         return {
             next: function () {
                 return {
                     value: 1,
                     done: true
                 };
             }
         };
     }
 };

 for (let value of obj){
     console.log(value);
 }

/**
 * ES6中实现Iterator接口的对象：
 * Array
Map
Set
String
TypedArray
函数的 arguments 对象
NodeList 对象
*/

//例子
let arr = ['a', 'b', 'c'];
let iter = arr[Symbol.iterator]();

iter.next() // { value: 'a', done: false }
iter.next() // { value: 'b', done: false }
iter.next() // { value: 'c', done: false }
iter.next() // { value: undefined, done: true }

/**
 * 使用迭代器遍历各种结构
 */
//实现一个Range
class RangeIterator {
  constructor(start, stop) {
    this.value = start;
    this.stop = stop;
  }

  [Symbol.iterator]() { return this; }

  next() {
    var value = this.value;
    if (value < this.stop) {
      this.value++;
      return {done: false, value: value};
    }
    return {done: true, value: undefined};
  }
}

function range(start, stop) {
  return new RangeIterator(start, stop);
}

for (var value of range(0, 3)) {
  console.log(value); // 0, 1, 2
}

//迭代链表结构
function Obj(value) {
  this.value = value;
  this.next = null;
}

Obj.prototype[Symbol.iterator] = function() {
  var iterator = { next: next };

  var current = this;

  function next() {
    if (current) {
      var value = current.value;
      current = current.next;
      return { done: false, value: value };
    } else {
      return { done: true };
    }
  }
  return iterator;
}

var one = new Obj(1);
var two = new Obj(2);
var three = new Obj(3);

one.next = two;
two.next = three;

for (var i of one){
  console.log(i); // 1, 2, 3
}

//为一个对象添加迭代器
let obj = {
  data: [ 'hello', 'world' ],
  [Symbol.iterator]() {
    const self = this;
    let index = 0;
    return {
      next() {
        if (index < self.data.length) {
          return {
            value: self.data[index++],
            done: false
          };
        } else {
          return { value: undefined, done: true };
        }
      }
    };
  }
};

/**
 * 对于类似数组的对象（存在数值键名和length属性），部署 Iterator 接口，
 * 有一个简便方法，就是Symbol.iterator方法直接引用数组的 Iterator 接口。
 */
NodeList.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];
// 或者
NodeList.prototype[Symbol.iterator] = [][Symbol.iterator];

[...document.querySelectorAll('div')] // 可以执行了

let iterable = {
    0: 'a',
    1: 'b',
    2: 'c',
    length: 3,
    [Symbol.iterator]: Array.prototype[Symbol.iterator]
};
for (let item of iterable) {
    console.log(item); // 'a', 'b', 'c'
}


/**
 * 最简单实现Iterator接口的方式， 使用 Generator
 */
let myIterable = {
  [Symbol.iterator]: function* () {
    yield 1;
    yield 2;
    yield 3;
  }
}
var arr = [...myIterable] // [1, 2, 3]

// 或者采用下面的简洁写法

let obj = {
  * [Symbol.iterator]() {
    yield 'hello';
    yield 'world';
  }
};

for (let x of obj) {
  console.log(x);
}
// "hello"
// "world"

//取出嵌套数组的值
function* iterTree(tree) {
  if (Array.isArray(tree)) {
    for(let i=0; i < tree.length; i++) {
      yield* iterTree(tree[i]);
    }
  } else {
    yield tree;
  }
}

const tree = [ 'a', ['b', 'c'], ['d', 'e'] ];

for(let x of iterTree(tree)) {
  console.log(x);
}
// a
// b
// c
// d
// e


//下面是一个稍微复杂的例子，使用yield*语句遍历完全二叉树。
// 下面是二叉树的构造函数，
// 三个参数分别是左树、当前节点和右树
function Tree(left, label, right) {
  this.left = left;
  this.label = label;
  this.right = right;
}

// 下面是中序（inorder）遍历函数。
// 由于返回的是一个遍历器，所以要用generator函数。
// 函数体内采用递归算法，所以左树和右树要用yield*遍历
function* inorder(t) {
  if (t) {
    yield* inorder(t.left);
    yield t.label;
    yield* inorder(t.right);
  }
}

// 下面生成二叉树
function make(array) {
  // 判断是否为叶节点
  if (array.length == 1) return new Tree(null, array[0], null);
  return new Tree(make(array[0]), array[1], make(array[2]));
}
let tree = make([[['a'], 'b', ['c']], 'd', [['e'], 'f', ['g']]]);

// 遍历二叉树
var result = [];
for (let node of inorder(tree)) {
  result.push(node);
}

result
// ['a', 'b', 'c', 'd', 'e', 'f', 'g']


//使用this

function* F() {
  this.a = 1;
  yield this.b = 2;
  yield this.c = 3;
}
var f = F.call(F.prototype);

f.next();  // Object {value: 2, done: false}
f.next();  // Object {value: 3, done: false}
f.next();  // Object {value: undefined, done: true}

f.a // 1
f.b // 2
f.c // 3


/**
 * Generator 与状态机
 * Generator 是实现状态机的最佳结构。比如，下面的clock函数就是一个状态机。
 */
var clock = function* () {
  while (true) {
    console.log('Tick!');
    yield;
    console.log('Tock!');
    yield;
  }
};


/**
 * 使用Generator实现异步操作的同步化表达
 */
//例子：实现异步ajax请求同步化表达
 function* main() {
     var result = yield request("http://some.url");
     var resp = JSON.parse(result);
     console.log(resp.value);
 }

 function request(url) {
     makeAjaxCall(url, function (response) {
         it.next(response);
     });
 }

 var it = main();
 it.next();

 /**
  * 控制流管理
  */

//异步串行化
 //回调地狱写法
 step1(function (value1) {
     step2(value1, function (value2) {
         step3(value2, function (value3) {
             step4(value3, function (value4) {
                 // Do something with value4
             });
         });
     });
 });

 //Promise写法
 Promise.resolve(step1)
  .then(step2)
  .then(step3)
  .then(step4)
  .then(function (value4) {
    // Do something with value4
  }, function (error) {
    // Handle any error from step1 through step4
  })
  .done();

//Generator写法
function* longRunningTask(value1) {
    try {
        var value2 = yield step1(value1);
        var value3 = yield step2(value2);
        var value4 = yield step3(value3);
        var value5 = yield step4(value4);
        // Do something with value4
    } catch (e) {
        // Handle any error from step1 through step4
    }
}

function scheduler(task) {
    var taskObj = task.next(task.value);
    // 如果Generator函数未结束，就继续调用
    if (!taskObj.done) {
        task.value = taskObj.value
        scheduler(task);
    }
}

scheduler(longRunningTask(initialValue));


//作业步骤控制

//let steps = [step1Func, step2Func, step3Func];
function* iterateSteps(steps) {
    for (var i = 0; i < steps.length; i++) {
        var step = steps[i];
        yield step();
    }
}

// let jobs = [job1, job2, job3];
function* iterateJobs(jobs) {
    for (var i = 0; i < jobs.length; i++) {
        var job = jobs[i];
        yield* iterateSteps(job.steps);
    }
}

let jobs = [job1, job2, job3];
for (var step of iterateJobs(jobs)) {
    console.log(step.id);
}


/**
 * 利用 Generator 函数， 可以在任意对象上部署 Iterator 接口。
 */
 function* iterEntries(obj) {
     let keys = Object.keys(obj);
     for (let i = 0; i < keys.length; i++) {
         let key = keys[i];
         yield [key, obj[key]];
     }
 }

 let myObj = { foo: 3, bar: 7 };

for (let [key, value] of iterEntries(myObj)) {
  console.log(key, value);
}
