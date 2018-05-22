/**
 * 声明使用优先级：
 * const > let > var
 */
// 尽量使用const
const a = 1;
// 变量使用let
const b = 2;
// 不要使用var


/**
 * 字符串字面量优先级:
 * '' > `` > ""
 */
// 尽量使用''
const str = 'foo';
// 动态字符串使用``
const s2 = `${str} bar`;
// 不要使用""

/**
 * 从数组/对象初始化变量：
 * 尽量使用解构赋值
 */
// 数组解构赋值
const arr = [1, 2, 3, 4, 5];
const [first, secend] = arr;
// 对象解构赋值
const obj = { firstName: 'f', lastName: 'l' };
const { firstName, secendName } = obj;

/**
 * 函数参数为对象时,尽量使用解构赋值
 */
function getFullName({ firstName, lastName }) {
}

/**
 * 返回多个值尽量使用，尽量使用对象，而非数组
 */
function processInput(input) {
  const [left, right, top, bottom] = [1, 2, 3, 4];
  return { left, right, top, bottom };
}


/**
 * 字面量对象：最后一个属性：单行不加逗号，多行添加逗号
 */
const o1 = { k1: 1, k2: 2 };
const o2 = {
  k1: 3,
  k2: 4,
};

/**
 * 动态给对象添加属性：预定义或者assign方式
 */
// bad
const a1 = {};
a1.x = 3;

// if reshape unavoidable
const a2 = {};
Object.assign(a2, { x: 3 });

// good
const a3 = { x: null };
a3.x = 3;


/**
 * 动态属性名：在对象内使用[]
 */
const getKey = key => key;
const obj1 = {
  id: 5,
  name: 'San Francisco',
  [getKey('enabled')]: true,
};

/**
 * 定义对象字面量使用简洁记法
 */
let ref = 'some value';

const atom = {
  ref,
  value: 1,
  addValue(value) {
    return atom.value + value;
  },
};

/**
 * 使用扩展运算符...拷贝数组
 */
// good
const items = [1, 2, 3, 4];
const itemsCopy = [...items];


/**
 * 立即执行函数使用 箭头记法
 */
(() => {
  console.log('Welcome to the Internet.');
})();

/**
 * 传递callback时尽量使用 箭头记法
 */
[1, 2, 3].map(x => x * x);

/**
 * 所有配置项都应该集中在一个对象， 放在最后一个参数， 布尔值不可以直接作为参数。
 */
// bad
function divide(a, b, option = false) {
}

// good
function divide(a, b, { option = false } = {}) {
}

/**
 * 不用使用arguments参数，使用可变参数...
 */
// good
function concatenateAll(...args) {
  return args.join('');
}

/**
 * 使用函数参数默认值设置默认值
 */
// good
function handleThings(opts = {}) {
  // ...
}

/**
 * 纯粹键值对结构使用Map
 */

const map = new Map([[1, 2], [3, 4]]);

/**
 * 实现类和继承使用class关键字
 */
// good
class Queue {
  constructor(contents = []) {
    this._queue = [...contents];
  }
  pop() {
    const value = this._queue[0];
    this._queue.splice(0, 1);
    return value;
  }
}

// good
class PeekableQueue extends Queue {
  peek() {
    return this._queue[0];
  }
}

/**
 * 如果模块只有一个输出值，就使用export default
 * 尽量使用ES6模块写法（视情况而定）：
 * 如果模块有多个输出值，就不使用export default，
 * export default与普通的export不要同时使用。
 */
