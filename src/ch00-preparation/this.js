x = 0
function test() {
    this.x = 1;
    console.log(this.x);
}

test(); // 1
console.log(x);


var o = {};
o.x = 0;
o.m = test;
o.m(); // 1
console.log(o.x); // 1

var o = new test();
console.log(o.x); // 1

var o = {};
o.x = 0;
test.apply(o) //1
console.log(o.x); //1
