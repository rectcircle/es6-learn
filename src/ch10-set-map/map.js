/**
 * ES新增Map
 * 相比与Object（{}），结构。Map的key可以是任意类型
 */

 const m = new Map();
 const o = {
     p: 'Hello World'
 };

 m.set(o, 'content')
 m.get(o) // "content"

 m.has(o) // true
 m.delete(o) // true
 m.has(o) // false

 const map = new Map([
     ['name', '张三'],
     ['title', 'Author']
 ]);

 map.size // 2
 map.has('name') // true
 map.get('name') // "张三"
 map.has('title') // true
 map.get('title') // "Author"

 //其他类似于set


 //WeakMap类似于WeakSet
