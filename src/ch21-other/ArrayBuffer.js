/**
 * JS操纵二进制接口
 */
/*
数据类型：
数据类型 字节长度 含义 对应的 C 语言类型
Int8	1	8 位带符号整数	signed char
Uint8	1	8 位不带符号整数	unsigned char
Uint8C	1	8 位不带符号整数（自动过滤溢出）	unsigned char
Int16	2	16 位带符号整数	short
Uint16	2	16 位不带符号整数	unsigned short
Int32	4	32 位带符号整数	int
Uint32	4	32 位不带符号的整数	unsigned int
Float32	4	32 位浮点数	float
Float64	8	64 位浮点数	double
*/


/**
 * ArrayBuffer(n)：申请长度为n字节的内存空间
 * DataView(buf)：创建buf的视图，可以访问设置这块内存：默认按照大端序（网络字节序），存取数据第二个参数为true，设为小端序
 * [Type]Array(buf|Array)：创建一个类型为Type的数组，可以通过数组方式访问
 */

const buf = new ArrayBuffer(32); // 分配32字节长度的连续内存
const dataView = new DataView(buf); // 建立DataView，用于访问这块内存空间
dataView.setUint16(0, 0xff);
console.log(dataView.getUint8(0));
console.log(dataView.getUint16(0, true));

const int32View = new Int32Array(buf); // 建立Int32类型视图
int32View[1] = 20;
console.log(int32View[1]);

const typedArray = new Uint8Array([0, 1, 2]);
console.log(typedArray.length); // 3

typedArray[0] = 5;
console.log(typedArray);


/*
 字节序
unsigned int value = 0x12345678为例，分别看看在两种字节序下其存储情况，我们可以用unsigned char buf[4]来表示value

Big-Endian: 低地址存放高位，如下：
  高地址
  ---------------
  buf[3] (0x78) -- 低位
  buf[2] (0x56)
  buf[1] (0x34)
  buf[0] (0x12) -- 高位
  ---------------
  低地址

Little-Endian: 低地址存放低位，如下：
  高地址
  ---------------
  buf[3] (0x12) -- 高位
  buf[2] (0x34)
  buf[1] (0x56)
  buf[0] (0x78) -- 低位
  --------------
  低地址
 */

// 判断字节序
const BIG_ENDIAN = Symbol('BIG_ENDIAN');
const LITTLE_ENDIAN = Symbol('LITTLE_ENDIAN');

function getPlatformEndianness() {
  const arr32 = Uint32Array.of(0x12345678);
  const arr8 = new Uint8Array(arr32.buffer);
  switch ((arr8[0] * 0x1000000) + (arr8[1] * 0x10000) + (arr8[2] * 0x100) + (arr8[3])) {
    case 0x12345678:
      return BIG_ENDIAN;
    case 0x78563412:
      return LITTLE_ENDIAN;
    default:
      throw new Error('Unknown endianness');
  }
}
console.log(getPlatformEndianness());

/**
 * 应用：
 * 1、AJAX
 * 2、Canvas
 * 3、WebSocket
 * 4、Fetch API
 * 5、File API
 */

/**
 * ES2017：SharedArrayBuffer：用于实现多线程通信
 * 使用Atomics来进行同步
 */

