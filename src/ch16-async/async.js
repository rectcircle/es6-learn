/**
 * ES2017 标准引入了 async 函数， 使得异步操作变得更加方便。
 *  async 函数是什么？ 一句话， 它就是 Generator 函数的语法糖。
 */
const fs = require('fs');

const readFile = function (fileName) {
    return new Promise(function (resolve, reject) {
        fs.readFile(fileName, function (error, data) {
            if (error) return reject(error);
            resolve(data);
        });
    });
};

const asyncReadFile = async function () {
    const f1 = await readFile('/etc/fstab');
    const f2 = await readFile('/etc/shells');
    console.log(f1.toString());
    console.log(f2.toString());
};

asyncReadFile()

/**
 * 优势：
 * （1） 内置执行器。
 * （2） 更好的语义。
 * （3） 更广的适用性。
 * 而async函数的await命令后面， 可以是 Promise 对象和原始类型的值（ 数值、 字符串和布尔值， 但这时等同于同步操作）。
 * （4） 返回值是 Promise。
 */

 /**
  * 基本用法：
  * async：表明该函数是一个异步函数，执行后返回一个Promise
  * await：表明等待后面语句执行完成，才能想继续执行
  */

  //例子
function timeout(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

async function asyncPrint(value, ms) {
    await timeout(ms);
    console.log(value);
}

asyncPrint('hello world', 1000);

/**
 * await使用
 */

async function f() {
  return await 123;
}

f().then(v => console.log(v))
// 123

/**
 * 错误处理使用：Promise的处理方式
 */

async function f() {
  throw new Error('出错了');
}

f().then(
  v => console.log(v),
  e => console.log(e)
)


async function f() {
  await Promise.reject('出错了');
  await Promise.resolve('hello world'); // 不会执行
}

f()
.then(v => console.log(v))
.catch(e => console.log(e)) // 出错了

async function f() {
  try {
    await Promise.reject('出错了');
  } catch(e) {
  }
  return await Promise.resolve('hello world');
}

f()
.then(v => console.log(v)) // hello world

async function f() {
  await Promise.reject('出错了')
    .catch(e => console.log(e));
  return await Promise.resolve('hello world');
}

f().then(v => console.log(v))
// 出错了
// hello world

/**
 * 注意点：
 * 第一点， await命令后面的Promise对象， 运行结果可能是rejected， 所以最好把await命令放在try...catch代码块中。
 * 第二点， 多个await命令后面的异步操作， 如果不存在继发关系， 最好让它们同时触发。
 * 第三点， await命令只能用在async函数之中， 如果用在普通函数， 就会报错。
 */
//同时执行
// 写法一
let [foo, bar] = await Promise.all([getFoo(), getBar()]);

// 写法二
let fooPromise = getFoo();
let barPromise = getBar();
let foo = await fooPromise;
let bar = await barPromise;


/**
 * ES2018：异步遍历器
 */
asyncIterator
  .next()
  .then(
    ({ value, done }) => {}/* ... */
  );

const asyncIterable = createAsyncIterable(['a', 'b']);
const asyncIterator = asyncIterable[Symbol.asyncIterator]();

asyncIterator
.next()
.then(iterResult1 => {
  console.log(iterResult1); // { value: 'a', done: false }
  return asyncIterator.next();
})
.then(iterResult2 => {
  console.log(iterResult2); // { value: 'b', done: false }
  return asyncIterator.next();
})
.then(iterResult3 => {
  console.log(iterResult3); // { value: undefined, done: true }
});

//for await...of
async function f() {
  for await (const x of createAsyncIterable(['a', 'b'])) {
    console.log(x);
  }
}


//异步 Generator 函数
async function* gen() {
  yield 'hello';
}
const genObj = gen();
genObj.next().then(x => console.log(x));
// { value: 'hello', done: false }

async function* gen1() {
  yield 'a';
  yield 'b';
  return 2;
}

async function* gen2() {
  // result 最终会等于 2
  const result = yield* gen1();
}
