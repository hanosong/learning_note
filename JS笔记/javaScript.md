## 数据类型

> 简单数据类型：Number, string,boolean,undefined,null
>
> 复杂数据类型 ： object, array, function

### **Number**

#### Number的表示

> NaN: 当无法计算结果时表示，not a number
> Infinity： 无限大

##### 运算时精度问题

>  浮点数相加减的精度问题？：（浮点数之间也不能判断相等）
>
>  法1.先*10放大成整数，进行运算后再除以10
>
>  法2.对浮点数指定保留多少位小数

#### 将其他类型数据转为数值型

###### 法1.parseInt(string)

###### 法2.parseFloat(string)

###### 法3.Number()

###### 法4.加减乘除：'12'-0/ +'12'

>  注意：加号写后面就成了字符串拼接了

#### null和undefined

> null: "空",是object的一种
>
> 0: 数值
>
> ' ' : 长度为0的字符串

大部分情况下均用null，判断 **函数参数是否传递** 的情况下用undefined。

## 基本包装类型

==基本包装类型：string   Number Boolean==

### 字符串：“ ”

> ‘ ’    只是一种表示方式，不属于字符串的一部分
>
> 单引号能够嵌套双引号，反之亦可。单个引号要用\转义
>
> 字符串是一个基础的数据类型，按道理来讲是没有属性的
>
> js会把基本数据类型包装为复杂数据类型，于是就有了length属性

#### 字符串的length属性

~~~js
var str = 'andy';
console.log(str.length);//对象（复杂数据类型）才有属性和方法，简单类型为什么会有length属性呢？
//基本包装类型： 就是把简单数据类型包装成了复杂数据类型

//包装过程
stp1.把简单数据类型包装成复杂数据类型
var temp = new String('andy');

stp2.把临时变量赋值给str
str = temp;

stp3.销毁这个临时变量
temp = null;
~~~

#### 字符串不可变性

字符串里面的值不可变，虽然第二次赋值的时候，输出的是第二次的值，看起来内容改变了，但其实

是地址变了，内存中新开辟了一个内存空间

> 由于字符串的不可变性，不要大量的拼接字符串（效率问题）

#### 字符串连接

> 连接字符串（ES6）,用反引号
>
>  反引号：功能扩展引号。能够将变量和表达式包装在${}中，来将其嵌入到字符串中。	

```js
 var message='hello,{属性名1},{属性名2}`;
 alert(message);
```



##### 查找字符串的位置（根据字符返回位置）

字符串的所有方法，都不会修改字符串本身，操作完成后会返回一个新字符串

> 1. str.indexOf('要查找的字符', [起始的位置])   //[ ] 内的可以省略 
>
> ```js
> var str = '改革春风吹满地，春天来了';
> console.log(str.indexOf('春'));  //2
> console.log(str.indexOf('春', 3))  //8  没找到就返回-1
> ```
>
> 1. str.lastIndexOf   从后往前找
> 2. charAt(索引) 通过索引号找到字符串的某个字符
>
> 性能好，功效和str[ 索引号 ]；一样
>
> ```js
> var str = '改革春风吹满地，春天来了';
> console.log(str.charAt(0)); // 改
> console.log(str.str[0]; // 改
> ```
>
> 4.charCodeAt(索引)
>
> 返回的是字符的ascII码

##### 查找字符串种某个字符出现的次数（面试）

> 题目：查找字符串"adfaoaodoafoafs"中所有o出现的位置以及次数
>
> 先查找第一个O出现的位置
>
> 然后只要indexOf返回的值不是-1，就继续往后查找
>
> 因为indexOf只能找到第一个，所以后面的查找要利用第二个参数，让当前索引加1，从而继续查找
>
> ```js
> var str = "adfaoaodoafoafs";
> var index = str.indexOf('o');
> var num = 0;    //为什么是0，不是1呢？
> while (index !== -1){
> console.log(index);
> index = str.indexOf('o', indexof + 1);   //当index返回-1的时候，num还会再自增一次，等于把第一次没记录的index补上了
>  num++;
> }
> console.log('o出现的次数是：' + num);
>
> ```

##### 更改字符串

###### 1.concat

> 连接字符串
>
> ```js
> var str = '中国';
> console.log(str.concat('我爱你'))；//中国我爱你
> ```

######  2.substr（begin，[length]）

> 字符串截取
>
> length可不写，默认截取到结尾
>
> ```js
> var str = '中国走向了全世界';
> //从索引值为2开始，截取4个元素
> console.log(str.substr(2,4))；
> ```

###### 3.slice（begin , end） 

> 字符串截取
>
> ```js
> var str = '中国走向了全世界';
> //从索引值为2开始，截取到索引值为4（不含）
> console.log(str.slice(2,4))； //走向
>
> //从后往前截取
> console.log(str.slice(-2,-4))；//了全
> ```

###### 4.substring(begin , end)

> 字符串截取
>
> 与slice的区别为：（begin , end）不接受负数

##### 替换字符串中的元素

###### **replace**

> 用途：过滤敏感信息

```js
var str = '中国走向了全世界';
console.log(str.replace('中国','**'));//**走向了全世界 （只会找到第一个进行替换）

//全部替换的时候要用到循环
while(str.indexOf('中国')!= -1){
    str = str.replace('中国','**'));
}

```



#### 字符串转数组

split()

> 用于把一个==字符串分割成字符串数组==。
>
> String.split() 执行的操作与 [Array.join()](https://www.w3school.com.cn/jsref/jsref_join.asp) 执行的操作是相反的
>
> ```
> stringObject.split(separator,howmany) => separator:从哪里开始分割; howmany:分割后的数组长度
> ```

```js
var str = '中国，走向了';
var arr = str.split(); //转为数组，长度为1 =>[ '中国，走向了' ]
var arr = str.split(''); //['中' , '国' , ',' , '走' ,'向', '了'];
var arr = str.split('', 2); //[ '中', '国' ]
```

```js
例题1： 将字符串转为驼峰式写法
var myStr = 'border-left-color';
//将字符串转数组 split
var myArr = myStr.split('-'); //['border','left','color']
//遍历
for (var i = 1; i < maArr.length; i++){  
    //取出字符串的第一位
    var first = myArr[i].charAt(0);
    //3.将第一位转大写
    var big = first.toUpperCase();
    
    //4.再连接上数组元素中的字符串的其他位
    myArr[i] = big + myArr[i].substr(1); //
}
console.log(myArr);
//5.数组转字符串
console.log(myArr.join(''));//BorderLeftColor

```

```js
例题2.给数字加千分位符 100,100,100 （字符串）
法1：
//接受一个数
function numFormat(){
  //1.先转字符串
  num ='' +num;
  //2.再转数组，倒序排
  var arr = num.split('').reverse();  //此时每个元素都是有引号的=>31313121
  //遍历，每三个数添加逗号
  var newArr = [];
  for(var i = 0;i<arr.length;i++){
    newArr.push(arr[i]);
    //能被三整除的前面加逗号 => 313,131,21
    if(i !=0 && i%3 ==0){
      new.push(',');
    }    
  }
  //将新数组逆序 => 12,131,313
  newArr.reverse();
  //数组转字符串并输出
  return newArr.join('');
}
//调用函数
var a = 1231313;
console.log('添加了千分位之后的数据：' + numFormat(a));
```

##### 字符串转数组总结

##### 第一种 split拆分

>  "abc".split('')
>
>  ==> ["a","b","c"]
>
>  "abc".split()
>
>  ==>  ["abc"]

##### 第二种 [...]

>  [..."abc"]
>
>  ==> ["a","b","c"]

##### 第三种Array.from

>  Array.from("abc")
>
>  ==> ["a","b","c"]

#### 转字符串

> 法1.var num= 12;var nn = num.tostring(); console.log(typeof nn)
>
> 法2  String(num);
>
> 法3.加号拼接字符串

##### 其他情况：当索引值超过字符串长度

>  输出：undefined

###布尔值

#### 短路运算

>  当有多个表达式时，左边的表达式可以确定结果，就不在往右运算了

* **&&优先级高于 ||**
* ++ -- ! 这种一元运算符优先级仅次于（）


* && 与运算 ：全true，运算结果才true

> 使用规则：如：a&&b
> 如果a为true，直接返回b； 123&&456； //456
> 如果a为false，直接返回a；  0&&456;   // 0

* || 或运算 ： 有true，则true

> 使用规则： 如：a||b
> 如果a为true，直接返回a；console.log(2 || 123 + 343 || 1);// 2
> 如果a为false，直接返回b；console.log(0 || 123 + 343 || 1);//466

* ！ 非运算  取反


#### 比较运算符

 `> ; <; >=; <= ; == ; ===`

~~~js
<!-- ==比较会自动转换数据类型 -->
false == 0; //true
false ===0; // false

<!-- NaN与所有值都不等，包括他自己-->
NaN === NaN; //false

**当需要判断NaN时，要通过isNaN()函数**
isNaN(NaN); // true

<!-- 
浮点数运算过程中会产生误差，计算机无法精确表示无限循环小数。
两浮点数相等，它们之差的绝对值小于某个阈值
-->
Math.abs(1/3-(1-2/3))<0.0000001;// true
~~~

#### 赋值运算

>  ~~~js
>  b += a;  // b = b + a
>  b -= a;  //  b = b - a
>  b *= a;  // b = b * a
>  b /= a;  // b = b / a
>  ~~~
>



#### 三元操作符(条件运算符 / 三目运算符)

一般用于替代if条件判断语句。

> ###### 条件？表达式1：表达式2
>
> 表示若条件成立（值为true），则返回表达式1，否则返回表达式2；
>
> ~~~js
> var result = num % 7 ==0 ? num + "可被整除" : "不可";
> console.log(result);
> ~~~
>

#### 转为布尔型

>  Boolean();

### 5.**数组 [ ]**  => object类型

数组是一个可以包括任意数据类型的集合（单个变量名）getElementsByTagName

集合的每一个值称为元素，元素间用 , 隔开

元素通过索引来访问

该集合第一个元素的索引值为0，arr[0]

数组的字面量是方括号 [ ] 

> arr[0]与obj[key]相同：
>
> arr：对象
>
> 数字：键（key）

#### 数组对象的创建

##### 利用数组字面量

>  var arr = [1,2,3];

##### 2.利用new Array();

 >  var arr = new Array();

 ~~~js
var arr1 = new Array(); //创建了一个空数组
var arr2 = new Array(2); //这个2表示数组长度为2，里面有2个空的数组元素
var arr3 = new Array(2,3)//等价于用字面量创建了数组[2,3],里面有2个数组元素，是2和3
 ~~~

#### 数组的初始化

>  声明数组并赋值称为数组的初始化

### 获取/查找数组中的元素

##### for循环遍历数组

   ```js
for (var i = 0; i < arr.length; i++){
	console.log(arr[i]);
}
   ```

###### 利用循环，求学生平均成绩

> 如果是prompt接收的字符串型，计算时需要将字符串转数值型数据

~~~js
求五个学生的总成绩和平均值  1,2,3,4,5
var scorArr = [1,2,3,4,5];
var sum = 0;   //初始化
var avg = 0;   //初始化
for (var i = 0; i < arr.length; i++){
sum += scorArr[i];    //总分
}
 avg = aum / scorArr.length;   //平均值
~~~

##### indexOf(数组元素)

> 用来搜索一个指定的元素位置（索引号）
>
> 只返回第一个满足条件的索引号

~~~js
var arr = [10, 20, '30', 'xyz'];
arr.indexOf(10);// 0(元素10的索引为0)
arr.indexOf(20);//1
arr.indexOf(30);//-1(未找到)
~~~

##### lastIndexOf :从后往前找 

##### 其他关于查找的

> 1.  every()   判定数组的所有元素是否满足测试条件
> 2.  find()    用于查找复合条件的第一个元素，如果找到了，返回这个元素，否则返回>undefined
> 3.  findlndex  查找复合条件的第一个元素，返回这个元素的索引，如果没找到，返回-1

### 更改数组

#### slice(begin, end)  ;截取数组中的某一段

> (类似于字符串中的substring)

```js
var arr=['a', 'b', 'c'];
arr.slice(0,2);//['a', 'b']
arr.slice(1);//['b', 'c']
```

#### concat 数组连接

~~~js
var a1 = [1,2,3];
var a2 = [4,5,6];
console.log(a1.concat(a2)); //[1,2,3,4,5,6] 

~~~

#### 向数组中添加/删除元素的方法

##### 普通方法

> * arr[ i ] = xxx;
> * arr[ arr.length ] = xxx;

##### pop(); 


> 把Array的最后一个元素删掉，一次只能删一个
>
> ~~~js
> arr.pop();//删掉数组中的最后一个元素，pop（没有参数）
> //然后输出删除的元素；
> //空数组如果继续pop会返回undefined
> ~~~
>

##### shift()

>把Array的第一个元素删掉  （同pop）

#####push();

>向Array的末尾添加元素
>
>~~~js
>var arr = ['x', 'x']
>var type = arr.push('x', 'x');// 向尾端添加字符串x、x，push完毕后，返回的结果是新数组的长度
>console.log(type); // 新数组的长度
>console.log(arr); // 打印push之后的新数组
>~~~
>

##### unshift();

> 向Array的头部添加元素
>
> ```js
> arr.unshift('A','B');//向最前端添加字符串A,B；返回的是新数组的长度
> ```

##### splice （begin，length）

> 对数组进行删除，修改，添加
>
> ~~~js
> var a1 = [1,2,3,4,5];
> 1.从索引为1开始，截取3位元素
> var arr = a4.splice(1,3); // [2,3,4]
>
> //返回值是删除元素后的新数组
> consloe.log(a4);// [1,5]
>
> 2.从索引为0开始，添加新元素
> var a2 = [1,2,3,4,5];
> var arr1 = a2.splice(1,0,'x','y');
> console.log(a2);//[1,'x','y',2,3,4,5]
> console.log(arr1);// []空
>
>
> ~~~
>

### 筛选数组以及排序

###数组筛选

> ```js
> newArr.push(arr[i]); //把符合条件arr[i]填入newArr，构成新数组 
> ```
>

#### 数组排序

##### sort排序

> 排序算法 
>
> 对于两个元素x和y
>
> 如果认为x<y，则返回-1；
>
> 如果认为x>y，则返回1；
>
> 如果认为x==y，则返回0
>
> `Array`的`sort()`方法默认把所有元素都转化为string再排序（ascii码）

##### 1) 冒泡排序

```js
sort() //对当前的Array进行排序（冒泡排序）

var arr = ['B','C','A'];
arr.sort();
arr;//['A','B','C']

遇到两位数直接用sort排序会乱
完美冒泡排序
var arr1 = [13, 4, 77, 8];
arr1.sort(function(a,b){
  return a - b;   // 升序排列； return b - a;降序
});
console.log(arr1);
```

##### 2) 自定义排序

```js
1. 按数字大小排序
//按从小到大排
var arr = [10, 20, 1, 2];
arr.sort(function (x,y){
    if(x < y){
        return -1; // 从大到小排： 1
    }
	if(x > y){
        return 1;  //从大到小排： -1
    }
	return0;
})
	console.log(arr);
```

##### reverse()  //翻转数组

~~~js
var newarr = [];
newarr.push(arr.reverse());
~~~

##### 使用for循环翻转数组

```js
 function reverse(arr){
  var newArr = [];
  for(i = arr.length - 1 ; i >= 0; i--){
    newArr[newarr.length] = arr[i]; // newarr.length本来是0，放一个元素就+1
  }
   return newArr
}
console.log(reverse([1,2,3]));  // [3,2,1]

//这样做有缺点，如果传入的不是数组，返回的会是一个空数组
//完善思路，在for循环前面加入一个检测是否为数组的模块

1.instansceof 运算符，可以用来检测是否为数组
	console.log(arr instansof Array); //true / false
2.Array.isArray(参数)

 function reverse(arr){
   if (arr instansof Array){   //if(Array.isArray(arr)){}
  var newArr = [];
  for(i = arr.length - 1 ; i >= 0; i--){
    newArr[newarr.length] = arr[i]; // newarr.length本来是0，放一个元素就+1
  }
   return newArr;
   }else{
     return '请输入一个数字格的参数[1,2,3]'
   }
}
```

##### 数组去重（面试）

> ~~~js
> 1.遍历旧数组
> 2.拿着旧数组的元素去查询新数组，如果该元素在新数组里面没有出现过，我们就添加，否则就不添加
> 3.如何知到该元素有没有重复？ 利用indexOf（数组元素）如果返回-1，就说明新数组里面没有该元素
>
> function unique(arr){
>   var newArr = [];
>   for(var i = 0; i<arr.length; i++){
>     //如果找不到
>     if(newArr.indexOf(arr[i] == -1){
>       newArr.push(arr[i]);     //把不重复的元素从屁股后面塞进去
>     })
>   }
>   return newArr;
> }
> var demo = unique(['xx']);
> console.log(demo)
>
> //删除数组中的某个元素
> arr.splice(要删的元素下标，1)
> ~~~
>

### 数组与字符串之间的转换

#### 数组转字符串

> 1.数组转字符串（有逗号分割） => 遍历 / tostring
>
> ~~~js
> 法1.
> var str = '';
> for(i = 0; i < arr.length; i++){
>  str += arr[i] + ',';     //用空字符串拼接，
>  while( i == arr.length-1 ){
>      str += arr[i];   //单独让最后一个元素不加逗号
>  }
> }
> 法2.toString
> var str = arr.toString(); //默认十进制，(16)：16进制
> ~~~
>
> 1.数组转字符串（把逗号去除） => join
>
> join(‘ ’) ==> 字符与字符之间没有逗号
>
> join()   ==> 字符与字符之间有逗号分割
>
> ~~~js
> 法1.join()  将数组作为字符串返回。
> const res = arr.join('')  //‘’表示去掉逗号，默认有逗号
> console.log(res);
> 
> 法2.str
> var str = '';
> for(i = 0; i < arr.length; i++){
>  str += arr[i]
> }   
> ~~~
>



*****

### 对象 { }      

一个具体的事物，让数据结构更清晰

对象由键-值组成的无序集合

* {} ：可选**属性列表**
* 键（key） ： 也叫属性/属性名/名字/标识符，是一个字符串
* 值（value） ：也叫方法，可以是任何值 （方法之间用逗号）
* 对象字面量： 就是{ }里面包含的表达这个具体事物（对象）的属性和方法
* 键值对 ：key:calue
* 多字词做属性名时，要加"" :`"likes birds": true`



#### 1.对象的创建

> **法1. 使用new Object（）创建对象**
>
> ~~~js
> 1. let user = new Object(); //new Object的语法  注意O大写
>
> //给对象添加属性
> 	user.uname = '张三';  //注意，每个属性和方法之间用分号结束
>     
> //给对象添加方法
>     user.sayHi = function(){
>       console.log('hi');
>     }
> ~~~
>
> **法2.使用字面量的方法**
>
> > 字面量是源代码中一个固定值的表示方法
>
> ~~~js
> 2. let user = {}; 
>
> var obj ={
>     'name' : '小哈',
>     'sex' : '男'
> }
> ~~~
>
> **法3.使用构造函数创建对象**
>
> 构造函数：对对象进行初始化（为对象成员变量赋初始值），常与new运算符一起使用
>
> ~~~js
> //构造函数  构造函数名首字母大写
> function 构造函数名(形参1，形参2..){
>     this.属性名1 = 参数1;
>     this.属性名2 = 参数2;
>     .
>     .
>     this.方法名 = function(){函数体}；
> }
> //使用构造函数生成对象
> var 变量名 = new 构造函数名(实参1,实参2,..)
> console.log(变量名)
> console.log(变量名.属性名)
> ~~~
>
> 使用构造函数创建对象的其他笔记

>  ```javascript
>  （当有很多属性和对象相同时，抽象出来，封装到函数里面，以达到一次创建多个对象的目的）
>
>  function 构造函数名(形参){	//构造函数名的首字母要大写
>    this.属性 = 值;
>    this.方法 = function(){}
>  }
>  //构造函数不需要return 就可以返回结果
>  var xxx = new 构造函数名(实参);  //调用函数返回的是一个对象object
>
>  new关键字的作用（面试题）
>  	//new在执行种会做这四件事
>  	//1、在内存中创建一个空对象
>  	//2、让this指向这个新对象
>  	//3、执行构造函数里面的代码，给这个新对象添加属性和方法
>  	//4、返回这个新对象（刚创建出来的对象）（所以构造函数不需要return）
>
>
>
>  //构造函数类似于java里面的类（class），抽象了对象的公共部分
>
>
>  判断一个属性是否存在
>  	'name' in 小明; //ture 表明name属性存在，但他也可能是小明继承得到的
>
>
>
>  ```
>

#### 2.使用对象的属性

~~~js
获取一个对象的属性，
法1. consloe.log(person.name) ; //（对象变量.属性名） 
法2. consloe.log(person['name'])  //对象名['属性名']
法3. obj.sayHi();    //调用对象的方法（对象里面的匿名函数）  对象名.方法名（）

删除一个对象的属性
法1：delete xiaoming.age
法2：delete xiaoming['age'] 

~~~

#### 3.遍历对象

~~~js
遍历对象 for...in语句
for (变量 in 对象){}

如： for (var k in obj){
  console.log(k);// k是变量，*命名类似于i一样*，输出得到的是属性名
  console.log(obj[k]);//  obj[k]得到的是属性
}
//一般用k 或者key
~~~



*  访问不存在的属性：返回undefined

> * 变量：单独声明赋值，单独存在
> * 属性：对象里面的变量称为属性，不需要声明，用来描述该对象的特征



*****



### 内置对象

对象分类： 自定义对象；内置对象，浏览器对象

自定义对象；内置对象：属于ECMAScript

浏览器对象：JS独有

#### 1.Math

```javascript
math数学对象，不是一个构造函数，不需要new来调用，直接使用里面的属性和方法即可
console.log(Math.max(1, 99, 2)); // 99
//如果有一个不是数字，则返回NaN；没有参数，则返回-Infinity


//封装一个数学对象，里面有PI和最大值，最小值
var myMath = {
  PI: 3.1415926,
  max: function(){
  	var max = arguments[0];
  for(var i = 1; i < arguments.length; i++) {
  if (argument[i] > max){
  max = argument[i];
}
}
	return max;
},
	min: function() {
  var min = argument[0];
      for(var i = 1; i < arguments.length; i++ ){
        if(argument[i] < min){
          min = argument[i];
        }
      }
      return min;
}
}
console.log(myMath.pI);
console.log(maMath.max(1, 5, 9));

//使用node查看js代码运行状态
//直接建一个后缀名为.js的文件，
//ctrl+shift+p 打开vscode命令栏 relode重启vscode
//在终端里面输入 node+v查看node的版本，node+文件路径（输入一些可用tab补全）
//运行程序，在需要调试的代码块里面输入cosole.log(需要查看的变量)
```



常用math属性

>  ```javascript
>  //1.绝对值方法
>  console.log(Math.abs(-1));// 1
>  console.log(Math.abs(1.9));//1.9
>  console.log(Math.abs('-1')); // -1 隐式转换 字符转为数字型
>  console.log(Math.abs('pink'));// NaN
>
>  //三个取值方法
>  console.log(Math.floor(1.9)); //1  向下取整
>  console.log(Math.ceil(1.1));//2  向上取整
>  console.log(Math.round(1.5)); //  2 四舍五入
>  console.log(Math.round(-1.5));// -1 
>
>  //求最值
>  console.log(Math.max(-1.5,4,3))
>  console.log(Math.min(-1.5,4,3))
>
>  //给浮点数保留两位小数
>  var money = 1000.23424;
>  console.log(money.toFixed(2))；//结果为字符串
>  console.log(+money.toFixed(2))//转为数值型数据
>  console.log(Math.round(money * 100)/100); //用四舍五入的方法保留两位小数
>
>  //随机数方法 random()
>  返回一个随机的小数，[0,1),这个方法里面不跟参数
>  console.log(Math.random());//[0,1)
>  console.log(Math.round(Math.random()*10); //(0,10]
>                              
>  //封装一个随机数
>  //1.我们想要得到两个数之间，且包括该两个数之间的整数
>  法1： function getRandom(min, max){
>        return Math.floor(Math.random() * (max - min + 1))+min;
>          }
>
>  法2： function getRandom(min, max){
>        return Math.round(Math.random() * (max - min ))+min;
>          }
>        console.log(getRandom(1, 10));
>
>  //2.随机点名
>      var arr = ['张三', '李四', '赵武' ,'王柳'];
>  	 console.log(arr[getRandom(0, 4)]); //4 可以改成arr.length-1
>
>
>  ```

```js
例题：从1-10之间的整数里猜一个数字

function getRandom(min, max){
  return Math.floor(Math.random()*(max - min + 1)) + min;
}
var random = getRandom(1,10);
while(true){                                           //也可以用for
  var num = prompt('请猜一个1-10之间的整数')；
  if(num > random){
    alert('你猜的数字太大了')；
  }
  else if (num < random){
    alert('你猜的数字太小了')；
  }
  else {
    alert ('你猜对了')；
    break;   //退出循环
  }
}
```



#### 2.Date

date对象用来表示日  期和时间

date是一个构造函数，必须使用new来调用创建日期对象

> 1.获取系统当前时间，并创建时间日期对象
>
> ~~~js
> 1. 用来表示日期和时间
> //获取系统当前的时间，没有参数
> var now = new Date();
> cosole.log(now); // Wed Jun 24 2015 19:49:22 GMT+0800 (CST)
>
> //日期格式化  创建日期时间对象
>
> var now = new Date();
> consloe.log(now.getDate()); //创建日期时间对象
> 获取年份
> now.getFullYear(); // 2015, 年份
>
> 获取月
> now.getMonth(); // 5, 月份，注意月份范围是0~11，5表示六月
> consloe.log(now.getMonth() + 1);
>
> 获取日
> now.getDate(); // 24, 表示24号
>
>
> 获取星期
> now.getDay(); // 3, 表示星期三  周一返回1，周日返回的是0
>
> 获取时分秒
> now.getHours(); // 19, 24小时制
> now.getMinutes(); // 49, 分钟
> now.getSeconds(); // 22, 秒
> now.getMilliseconds(); // 875, 毫秒数
>
> 获取时间戳
> now.getTime(); // 1435146562875, 以number形式表示的时间戳
>
> ~~~
>
> 创建时间日期对象（自定义）
>
> ~~~js
> //2. 自定义日期和时间的Date对象
> 参数常用写法： 数字型 2019, 10, 01  或者是字符串型 '2019-10-1 8:8:8'
> 法1: var date1 = new Date(2019, 10, 1);
> console.log(date1);  //返回的是11月 而不是10月(1月是0月)
> 法2： var date2 = new Date('2019-10-1 8:8:8');
> 法3： var date2 = new Date('2019/10/1 8:8:8');
> console.log(date2);  //返回正常
> //js的date对象月份值从0开始，0=1月
>
> ~~~

>  创建时间日期对象（当前时间）

> ```js
> 例1）输出2022年3月1日 星期二
> 	var year = date.getFullYear();
> 	var moonth = date.getMoonth() + 1;
> 	var dates = date.getDate();
> 	var arr = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
> //星期日是星期0
> 	var day = get.Day();// 星期是数字，将数字转换成索引，用数组做
> 	console.log('今天是：' + year + '年' + month + '月' + dates +'日 ' + arr[day]); //记得在日后面加个空格
>
> 例2） 要求封装一个函数返回当前的时分秒 格式： 06：06：06
> function getTimer (){
>   var time = new Date();  //引用时间参数
>   var h = time.getHours();
>   h = h < 10 ? '0'+h : h;  //补零
>   var m = time.getMinutes();
>   m = m < 10 ? '0'+m : m;
>   var s = time.getSeconds();
>   s = s < 10 ? '0' + s : s;
>   return h+ ':' + m + ':' + 's';
> }
> console.log(getTimer());
>
> ```

> 获取时间戳（用来做倒计时，工程常用）
>
> ~~~js
> //获得Date总的毫秒数（时间戳）
> 法1.通过valueOf ()  getTime()
> 	var date = new Date();
> 	console.log(date.valueOf());
> 	console.log(date.getTime());
> 法2.简单写法（工程常用）
> 	var date1 = +new Date();  //+new Date（）就是返回总的毫秒数
> 	console.log(date1);
> 法3.H5新增
> 	var now = new Date();
> 	console.log(Date.now());
>
> ~~~
>
> 

##### 倒计时案例（重点案例）

用用时间戳来做

> 毫秒转换为天、时、分、秒
>
> ```js
> function countDown(time){   //time：结束时间
> //获得当前时间的总毫秒数
> var nowTime = +new Date();  
> //获得用户输入时的总毫秒数（结束时间）
> var inputTime = +new Date(time);
> //获得距离活动开始剩余的时间 （1秒=1000毫秒）
> var times = (inputTime - nowTime) /1000；
> consloe.log('剩余的秒数：' + times);
> //把得到的剩余时间转换为时分秒 
> var d = Math.floor(times/60/60/24); 
> //补0
> d = d <10 ? '0' + d : d;
>     
> var h =  Math.floor(times/60/60%24);
> h = h < 10? '0' + h : h;
>     
> var m =  Math.floor(times/60%60);
> m = m < 10? '0' + m : m;
>     
> s =  Math.floor(times%60);
> s = s <10 ? '0' + s : s;
>     
> return d +'天' + h + ':' + m + ':' + s '
> }
>
> //调用倒计时，参数（是倒计时结束的时间）
> console.log(countDown('2022-3-2 18:00:00'));  //输入时间按时间标准写法写
>
> var date = new Date();
> console.log(date);
>
> //计算输入日期是当年的第几天
> function getDay(mydate){
>   //如果要将传入的字符串转成数组
>   var arr = maydate.split('-');
>   //开年第零天
>   var d1 = new Date(arr[0],0,0).getTime();
>   var d2 = new Date(arr[0],arr[1]-1,arr[2]).getTime();
>   //输入的年月日和当年的0月0日的差值的时间戳，转成天数
>   var d = Math.floor((d2-d1)/(1000*60*60*24));
> }
> ```
>

#### 3.arguments

关键字：arguments（内置对象）

当**不确定参数的数量**时，可以利用arguments，不用对函数定义任何参数，就可以拿到所有参数值

>  类数组, 不具备数组的各个内置函数，但是有数组的长度和索引值

特点：只在函数内部起作用，且永远指向当前函数的调用者**传入的所有参数**。 类似于`Array`

>  ```js
>  function foo(x){
>   console.log('x=' + x); //函数定义的参数只有一个x， 所以只能传一个10进来
>
>   for(var i= 0; i< arguments.length; i++){
>       consloe.log('arg'+ i '=' arguments[i];//由于arguments关键字的原因，把三个参数都传进来了 依此输出：arg 0 = 10  arg 1 = 20  arg 2 = 30
>   }
>  }
>
>  * 
>
>  ```

作用：

>  ```js
>  1.用于判断传入参数的个数
>  //假如要接收2-3个参数，其中b时可选参数，当只传2个参数时，b默认为null  (只要a，c参数)
>  // foo([ a , b], c)
>
>  	function foo(a, b, c) {
>        if(arguments === 2) {
>            c=b; //b为可选参数的情况
>            b=null;
>        }
>    }
>
>  ```
>
>  可选参数：令未被赋值的参数具有一个默认值

#### rest参数

arguments参数每次都要相互交换，使用rest参数可以将多余的参数以`数组`形式交给变量`rest`

```js
function foo (a, b, ...rest){
console.log('a='+a);
console.log('b='+b);
console.log(rest);
}
foo(1, 2, 3, 4, 5);  // a=1 b=2 Array[3, 4, 5]
```

rest参数只能写在最后面，前面用`...`标识

如果没有多余参数，会接收一个空数组

****

### 执行结构 · 条件判断

#### 1.分支结构

```js
<!--判断条件较少-->
	if(条件为真){...} else{...}
//else可省略判断条件{...}, =》else；但最好不要省略


<!--多重条件判断-->
    if(){...} else{//这里的{}可以省略     
     if(){...} else(){...} }
        //else if（）{；} 可以多次使用，当条件区间很多时
        //最后一个条件时else{；}
 
    判断为false：null、undefined、0、NaN、''
         true：其余

             
<!--switch条件判断 只能判断固定的条件，不能判断区间条件-->

 switch (表达式/判断条件){
     case value1（条件判断结果）: 表达式等于value1时要执行的代码;
     break;
	 case value2: 表达式等于value2时要执行的代码;
     break;
     case value3: 表达式等于value3时要执行的代码;
     break;
     ...
     default:表达式不等于value里的任何一个值的时候要执行的代码；
 }
        //如果value是number型，用prompt拿数据时要注意把string转为number; 如果value是字符串型，例如：case "苹果";
        //隐式转换switch(+表达式)
   
```



> if else if 和 switch语句的区别
>
> 1. switch..case语句通常处理比较确定值的情况
> 2. 当分支较少时，if..else语句的执行效率比switch语句高
> 3. 当分支较多时，switch语句的执行效率较高，而且结构更清晰

****

### 执行结构 ·循环

##### for循环

>  ```js
>  //法1  for循环。
>  //   初始条件、结束条件、 递增条件  =》 来循环执行语句块
>  for (begin; condition; step){
>   //...循环体...
>  }
>
>  ** condition: i<3  //在每次循环迭代之前检查，如果为false，停止循环。
>
>  ** “内联”变量声明： “计数”变量i是在循环中声明的（这种变量只在循环中可见）
>
>  ```

##### 双重for循环

> 循环嵌套：一个循环语句里面再嵌套一个循环语句
>
> ~~~js
> for (外循环的初始； 外循环的条件； 外循环的操作表达式){
> for(内循环的初始；内循环的条件；内循环的操作表达式){
> 		//执行代码
> }
> }
> 引用：打印9x9乘法表
> //外层循环代表行
> //手动换行
> 循环外声明var str = ""; 每行结束后：str += '\n';
> //内层循环代表每行有多少个
> ~~~
>
> 
>
> 

 ##### while循环

> ~~~js
> //法2   while循环
> //当只需要一个判断条件时
> while (condition){
> //循环体
> }
>
> //do....while循环
> //不是每次循环开始时判断条件，而是在每次循环完成的时候判断条件（与while的区别）
> do {
> //首先执行循环体，再检查条件
> }while(condition);
>
> ~~~
>
> ~~~js
> 例：用while写1-100的和
> var sum = 0;
> var i = 1;   //声明要在外面，循环开始条件
> while (i <= 100){    //进入循环的条件
> sum += i;
> i++			  //最后一句：递增条件（操作表达式）
> }
>
> 例：用do .. while写1-100的和
> var sum = 0;
> var i = 1;
> do {
>  sum += i;
> 	i++;		
> }while (i <=100)   // 进入循环的条件
>  console.log(sum)
> ~~~
>
> 

* 为什么使用while循环？

  忽略了条件的for循环容易让人看不清循环的逻辑

  ```js
  begin/condition/step 
  每个都可以省略
  ```

* do...while至少执行一次，更倾向于用while(...) {...}

##### 跳出循环

>  ```js
>  法1：条件为假时，循环终止
>
>  法2：使用break强制退出
>  //用户输入空行或取消输入，break指令会被激活，立刻终止循环
>
>  法3：continue,停止本次循环，启动新一轮循环
>  //输出奇数
>  for (let i = 0; i < 10; i++){
>  if(i%2 == 0)continue;
>  alert(i);//输出1 3 5 7 9
>  }
>
>  法4： break<labelName>语句跳出循环至标签处
>
>  outer: for (let i = 0; i < 3; i++) {
>  for (let j = 0; j < 3; j++) {
>    let input = prompt(`Value at coords (${i},${j})`, '');
>    // 如果是空字符串或被取消，则中断并跳出这两个循环。
>    if (!input) break outer; // (*)
>    // 用得到的值做些事……
>  }
>  }
>  alert('Done!');//break outer 向上寻找名为 outer 的标签并跳出当前循环。
>  ```
>
>  



* continue/break 不能与三元运算符`?`一起使用

```js
(i > 5) ? alert(i) : continue; //contiue不允许在这个位置
```



#### 循环中的断点调试

>  调试到出错的代码显示错误
>
>  ~~~js
>  1.在sources里找到需要调试的文件
>  2.在程序的某一行设置断点，程序会自动执行断点所在的作用域
>  3.刷新页面
>  4.在watch中输入想要监视变量的名字，用来监视变量的值的变化
>  5.点击“跳过下一函数调用” 
>  6.让程序单步执行，观察watch中变量的值的变化
>  ~~~
>
>  



****

### 变量  属性 方法 的区别

*  相同点和不同点
  1. 变量和属性都是用来储存数据的
  2. 变量  单独声明并赋值，使用的时候直接写变量名  单独存在
  3. 属性  在对象里面的不需要声明  使用的时候必须是对象.属性
*  函数和方法
  1. 函数和方法都是用来实现某种功能，做某件事的
  2. 函数是单独声明  并且调用时是 函数名（）
  3. 方法 是在对象里面的，调用的时候是  对象.方法()


****



## 函数

### 什么是函数

函数具有强大的抽象能力

> 抽象： 将低级复杂运算通过简单的符号表示，可以不关心底层的具体计算过程，在更高的层次上思考问题
>
> 什么是表达式？： 由数字，运算符，变量组成的式子，结果会返回给开发者，称为返回值

#### 1.函数定义和调用

定义方式

```js
//函数定义
<!--function:关键字 
    name: 函数名
    （） ： 括号内的是参数列表，用逗号分割
    {} ：括号内的代码，成为函数体   -->
        
function name(parameters, delimited, by, comma){
    /*code*/
}
**函数属于变量，所以也可以用创建变量的方式创建函数（匿名函数）

//匿名函数
 var 变量名 = function() {};


```

#### 函数调用

> 1.name(); //通过名称调用
>
> 2.函数体外面直接加括号（）

~~~js

//IIFE (Immediately Invoked Function Expression)立即调用函数，在函数定义的地方就直接执行了


特殊情况：
1. 当传入参数比定义的少时 //返回NaN
2.检查传入的变量x是否为number
	if (typeof x !=='number'){
        throw 'Not a number';
    }
//函数的形参也可以看作局部变量 
~~~

> 3.在函数里面调用函数

~~~js
function getAvg (){
	//在函数里面调用了另一个函数
	return getSum() / scoreArr.length; 
}
console.log(getAvg());
~~~



#### retrun

> 哪里调用函数，最终的返回值就会覆盖调用的函数

~~~js
//声明函数
function 函数名(){
	...
    //可以直接 return 一个表达式，不需要变量；在外面console.log(函数名())；
	return 需要返回的值（变量）
}
//调用函数
//也可以直接console.log(函数名(实参))

var ss = 函数名(实参); 
console.log(ss);//如果没有return，输出的是undefined
~~~

> return 返回值一般写在函数的最后一句
>
> 可以将结果返回到调用函数的那个位置
>
> 一般需要一个变量接收这个返回值，再打印这个变量
>
> 一个函数最多只能有一个返回值，可以没有

return的作用

>  执行到return：函数执行完毕，并将结果返回
>
>  没有return： 函数执行完毕后返回结果undefined



****



## 变量

#### 变量 （使用let、var声明定义 ）

>  变量仅仅是用来保存值的占位符     变量名=》 标识符
>
>  目的：在内存中申请一段内存空间

* 变量命名：

  <1> 必须包含字母，数字，符号`$`和`_`

  <2>首字符必须非数字

* 声明一个常数 ：const

变量类型

>局部变量： 只在{}内可见   
>
>```js
>function showMessage(){
>let message = "hello, 我是局部变量"
>alert(message);
>}
>
>showMessage();// hello, 我是局部变量
>alert( message ); 错误，变量为函数的局部变量
>
>```
>
>
>
>js函数在查找变量时先从自身函数开始，从内向外查找
>
>如果内部函数定义了与外部函数重名的变量，则内部函数变量将屏蔽外部函数变量

#### 常量（const）

ES6之前：使用全部大写的变量来表示这是一个常量

```js
var PI = 3.14；
```

ES6：使用关键字`const`来定义常量，const也具有块级作用域

#### var、function变量提升

变量会自动提升，但是赋值不会

```js
function foo(){
    var x ='hello' + y ;
    console.log(x);
    y= 'word'; //y中的赋值不会提升
}
foo() // hello undefined

//如何解决这一问题？
//在函数内部定义变量的时候，遵守首先声明所有变量原则
//可以先用一个var 将所有的变量都申明
```



## 作用域

#### 全局作用域

不在任何函数内定义的变量就具有全局作用域。顶层函数的定义也被视为一个全局变量，并绑定到`window`对象

js内部默认的全局对象`window`

全局作用域的变量实际上就是被绑定到`window`的一个属性：// 例如 `window.全局变量名`

如果没有在当前函数作用域中找到，继续向上一直到全局作用域也没有找到，则会报`ReferenceError`错误。

> 如果是普通变量：not defined
>
> 如果是匿名函数： type error： not a function



#### 局部作用域

当使用var 时，在for、if等语句块中无法定义局部作用域

```js
//函数作用域
function sayHi() {
  if (true) {
    var phrase = "Hello";
  }

  alert(phrase); // 有var，能正常工作,即使在局部作用域外面
}

sayHi();
alert(phrase); // ReferenceError: phrase is not defined
```

~~~js
//当函数作用域里面有全局变量的时候
var num = 10;
fun ();
function fun(){
	console.log(num); //10；如果num=20在console前面，那就输出20
	//全局变量都在全局作用域里，输出的时候按顺序
	num = 20;
}
console.log(num); // 20
~~~

> 同一个作用域比顺序
>
> 不同作用域按最近的

ES6使用`let`代替`var`，可以声明一个块级作用域的变量

### 变量作用域与解构赋值

#### 变量作用域

1.  var申明的变量的作用域

   *  当变量在函数体内部声明

     1. 该变量作用域为整个函数体，在函数体外不可被引用
     2. 当不同函数声明了同一个变量，同名变量相互独立
     3. 内u函数可以访问外部函数定义的变量，反之不行

     >  ```js
     >  function foo(){
     >  var x=1;
     >  function bar(){
     >   var y = x +1;// bar可以访问foo的变量x
     >  }
     >  var z = y+1;// ReferenceError! foo不可以访问bar里的变量y
     >  }
     >  ```
     >

```js
//如果变量在函数体内申明，则该变量作用域为整个函数体
//该变量在函数体外不可被引用
```

**函数调用后的读取方式：从本级开始，往上级读取。不能往下读取**

#### 解构

> ES6中允许从数组或对象中提取值，按照对应位置，对变量赋值，这被称为解构（Destructuring）。

~~~js
 //1.数组解构
        let arr = [1, 2, 3];
        let [a, b, c] = arr;//17行的这一句相当于 18-20的这三句
        // let a = arr[0];
        // let b = arr[1];
        // let c = arr[2];
        console.log(a, b, c);

        let [n1, n2] = [1, 2, 3, 4];
        console.log(n1, n2);//1,2

        let [p1, p2, p3, p4] = [1, 2];
        console.log(p1, p2, p3, p4);//1 2 undefined undefined

        //2.对象的解构
        let obj = { name: "lili", age: 18 };
        let { name, age } = obj;//31行相当于下面的两句话
        // let name = obj.name;
        // let age = obj.age;
        console.log(name, age);
        // let { myname, myage } = obj;
        // console.log(myname, myage);//undefined,undefined 解构的变量名和 对象的key的值必须相同，否则解构不出来
        //可以给 对象解构的变量起别名
        let { name: myname, age: myage } = obj;
        console.log(myname, myage);

~~~

- 解构赋值就是把数据结构分解，然后给变量进行赋值
- 如果结构不成功，变量跟数值个数不匹配的时候，变量的值为undefined
- 数组解构用中括号包裹，多个变量用逗号隔开，对象解构用花括号包裹，多个变量用逗号隔开
- **利用解构赋值能够让我们方便的去取对象中的属性跟方法**

****

### 方法

在一个对象中绑定函数，称为这个对象的方法。

与普通函数的区别在于它在内部使用了一个`this`关键字

```js
var xiaoming = {
    name: 'xiaoming',
    brith: 1998,
    age： function(){
	var y = new Date().getFullYear();
        return y - this.birth;
    }
};
console.log(xiaoming.age);//输出结果是ƒ () {
                var y = new Date().getFullYear();
                return y - this.birth;
            } 
console.log(xiaoming.age())// 输出结果是 24
```

****



## 获取/判断数据类型

> 1.typeof 不能区分数组和对象
>
> ~~~js
> var arr = [1,2,3,];
> console.log(typeof arr); //obj Array是数组对象
> ~~~

> 2.判断是数组还是对象

> ~~~js
> var arr = [1,2,3,];
> var obj = {'id':1, 'name':'xiaohua'};
> ~~~
>
> 法1. instanceof
>
> ~~~js
> console.log(arr instansof Arr); //true
> console.log(obj instansof Object); //true
> ~~~
>
> 法2. isArray
>
> ~~~js
> console.log(Array.isArray(arr)); //true
> console.log(Array.isArray(obj)); //false
> ~~~
>
> 法3. constructor 构造函数
>
> ~~~js
> console.log(arr.constructor == Array); //true
> console.log(obj.constructor == Array); //false
> ~~~
>
> 法4. toString
>
> ~~~js
> console.log(Object.prototype.toString.call(arr)); // [Object Array]
> console.log(Object.prototype.toString.call(obj)); // [Object Object]
> //数组是一种特殊对象，Array 是继承与 Object
> ~~~



****

# JS高级

### 面对过程与面对对象

|      | 面向过程                                     | 面向对象                                     |
| ---- | ---------------------------------------- | ---------------------------------------- |
| 优点   | 性能比面向对象高，适合跟硬件联系很紧密的东西，例如单片机就采用的面向过程编程。  | 易维护、易复用、易扩展，由于面向对象有封装、继承、多态性的特性，可以设计出低耦合的系统，使系统 更加灵活、更加易于维护 |
| 缺点   | 不易维护、不易复用、不易扩展                           | 性能比面向过程低                                 |
| 总结   | 面向过程就是分析出解决问题所需要的步骤，然后用函数把这些步骤一步一步实现，使用的时候再一个一个的依次调用就可以了 | 面向对象是把事务分解成为一个个对象，然后由对象之间分工与合作。          |

## 2.对象与类

#### 2.1 对象

对象是由属性和方法组成的：是一个无序键值对的集合,指的是一个具体的事物

- 属性：事物的特征，在对象中用属性来表示（常用名词）
- 方法：事物的行为，在对象中用方法来表示（常用动词）

#### 创建对象的方法

~~~js
//以下代码是对对象的复习
//字面量创建对象
var smy = {
    name: 'smy',
    age: 3
}
console.log(smy);

//构造函数创建对象
  function Animal(name, age) {
    this.name = name;
    this.age = age;
 }
var smy = new Animal('smy', 3)//实例化对象
console.log(smy);
//new关键字
var obj = new Object();
~~~

### 成员

#### 实例成员

> 定义：构造函数内部通过this添加的成员。 `this.name = name;`
>
> 特点：实例成员只能通过实例化的对象来访问 (var 变量名 = new 构造函数名 （name的值）

#### 静态成员

> 定义：在构造函数本身上添加的成员    `构造函数名.成员名 = ‘值’`
>
> 特点：静态成员只能通过构造函数来访问   （静态成是放在构造函数里面的成员，要访问直接点出来就行了 `构造函数名.成员名`）

### 2.2 类

使用 class 关键字声明一个类，之后以这个类来实例化对象。

> 类抽象了对象的公共部分，它泛指某一大类（class）对象特指某一个，通过类实例化一个具体的对象
>
> 类名首字母大写
>
> constructor接受传递过来的参数,同时返回实例对象
>
> constructor 函数 只要 new 生成实例时,就会自动调用这个函数, 如果我们不写这个函数,类也会自动生成这个函数

#### 2.2.1 创建类，并添加属性和方法

~~~js
 // 1. 创建类 class  创建一个类；类名后面不要加小括号
class Animal {
    // 类的共有属性放到 constructor 里面 constructor是 构造器或者构造函数
    constructor(uname, age) {
      this.uname = uname;
      this.age = age;
    }//------------------------------------------->注意,方法与方法之间不需要添加逗号
  //构造函数不需要加function  
  eating(food) { 
      console.log(this.uname + '吃'+food);
    }
}
// 2. 利用类创建对象 new (生成实例 new 不能省略)
var smy = new Animal('萨摩耶', 18);
console.log(smy); // Animal {uname: "萨摩耶", age:3}
smy.eating('肉骨头');  //萨摩耶吃肉骨头
~~~

#### 2.2.2 类的继承

当子类继承（extends）了父类之后，就可以使用 父类里面的方法和属性

~~~js
// 父类
class Father{   
} 

// 子类继承父类
class  Son  extends Father {  
}       
~~~

子类使用super关键字访问父类的方法

> 如果子类想要继承父类的方法,同时在自己内部扩展自己的方法,利用super 调用父类的构造函数,super 必须在子类this之前调用

~~~js
//定义了父类
class Father {
    //初始化工作  ，在 实例化这个类的时候自动调用
   constructor(x, y) {
   this.x = x;
   this.y = y;
   }
   sum() {
   console.log(this.x + this.y);
	}
 }
//子元素继承父类
    class Son extends Father {
   		 constructor(x, y) {
    		super(x, y); //使用super调用了父类中的构造函数
             console.log(this);
    	}
    }
    var son = new Son(1, 2);
  son.sum(); //结果为3
~~~

### 注意点

1. constructor中的this指向的是new出来的实例对象 
2. 自定义的方法,一般也指向的new出来的实例对象
3. 绑定事件之后this指向的就是触发事件的事件源
4. 时刻注意this的指向问题,类里面的共有的属性和方法一定要加this使用.
5. 在 ES6 中类没有变量提升，所以必须先定义类，才能通过类实例化对象



## 构造函数和原型

### 构造函数

> 特点：存在内存浪费的问题

##### 构造函数、实例成员与实例化、静态成员举例：

~~~~JS
 //构造函数
        function Animal(name, age) {
          //构造函数 里面使用this进行赋值的变量称为 实例成员
            this.name = name;
            this.age = age;
          //在构造函数上定义的方法，下面实例化时会在内存中生成不同的地址
          //一段函数就是一段内存，swimming指向一段新的内存空间
            this.swimming = function () {
                console.log(this.name + "在游泳");
            }
        }
        //实例成员，必须是实例化之后才能够访问
         console.log(name); //没有输出
         console.log(this);  //window
         console.log(this.name); //没有输出
         console.log(Animal.name); //Animal
               
        // 实例化
        var smy = new Animal('萨摩耶', 10);
        console.log(smy.name);  //萨摩耶
        smy.swimming();         //萨摩耶在游泳
  
        //静态成员 ,只能使用 构造函数来访问
        var smy = new Animal('萨摩耶', 10);
        Animal.color = "白色";
        console.log(Animal.color); // 白色

		//undefined;静态成员不可以使用实例化对象来访问  
        console.log(smy.color);		 
~~~~

### 构造函数的原型 prototype

> 原理：构造函数通过原型分配的函数，是所有对象所共享的
>
> 定义：每一个构造函数都有一个prototype属性，这个属性指向生成这个构造函数的==对象（原型对象，简称原型）==。prototype就是一个对象，这个对象的所有属性和方法，都会被构造函数所拥有
>
> 特点：把方法直接定义在prototype对象上，这样所有对象的实例就都可以共享这些方法 
>
> prototype 原型的作用：可以对构造函数进行扩展方法和属性

#####  如何使用prototype属性

![原型1](img/原型1.png)

~~~js
 function Animal(name, age) {
            this.name = name;
            this.age = age;
   			//在构造函数上定义的方法，实例化时会在内存生成不同的地址
            this.swimming = function () {
            }
        }
//将公共的方法定义在构造函数原型上，不管生成了多少个实例化对象，方法在内存中只占有一块空间 => 进行了性能优化
//扩展方法
Animal.prototype.eat = function(){
  console.log(this.name + "在吃骨头")；
}
//扩展属性
Animal.prototype.height = '60cm'
//实例化
var smy = new Animal('萨摩耶', 10);
console.log(smy); //Animal {name:'萨摩耶', age:10, swimming:f}
smy.eating();  // 萨摩耶在吃骨头
console.log(smy.height);  //60cm
~~~

===> 此次可有原理图==



##### 对Array 进行扩展，实现排序功能

~~~js
var arr = [1, 67, 90, 34, 67, 23, 10, 23];
//在prototype里面定义方法mysort
Array.prototype.mysort = function(){
  //先将this保存函数内的局部变量里
  var _this = this;
  for(var i = 0; i <_this.length; i++){
    for(var j = 0; j< _this.length-1; j++){
      //_this[j] < _this[j+1]=> 原本是升序排列，要改成降序
      if(_this[j] < _this[j+1]){
        var temp = _this[j+1];
        _this[j+1] = _this[j];
        _this[j] = temp;
      }
    }
  }
  return _this;
}
//调用
console.log(arr.mysort())
~~~



### 对象原型`__proto__`

> 每一个对象都有`__proto__` 属性， 但只有构造函数有[[prototype]]属性
>
> 任何一个对象（如：smy）都有`__proto__`属性，`__proto__`属性指向生成这个对象的构造函数（Animal）的原型对象（prototype）

~~~js
function Animal(name, age) {
            this.name = name;
            this.age = age;
            this.swimming = function () {
            }
        }
var smy = new Animal('萨摩耶', 10);
// => smy.__proto__ == Animal.prototype
~~~

![原型2](img/原型2.png)

#### 原型链

> 通过`__proto__`属性访问对象的上一级的方法和属性，这种操作，形成了一种链式结构

![原型3](img/原型3.png)

![原型4](img/原型4.png)

#### construct构造函数

> 定义：对象原型（`__proto__`）和构造函数（prototype）原型对象，里面都有一个construct属性，该属性指回构造函数本身，所以叫构造函数。
>
> construct的用途：1.用于记录该对象引用于哪个构造函数 2.construct属性让原型对象重新指回原来的构造函数
>
> 为什么要用construct：有多个对象的方法，为了省事

~~~js
function Animal(name, age) {
            this.name = name;
            this.age = age;           
        }
//对构造函数扩展方法（在构造函数的原型对象中设置），construct存在，指向Animal函数
Animal.prototype.swimming = function(){
  console.log(this,name+'在游泳'；)
}
Animal.prototype.eating = function(){
  console.log(this,name+'在吃骨头'；)
}
//有多个对象方法，给原型对象采用对象形式赋值，将prototype重写（会覆盖构造函数原型对象原来的内容），constructor丢失
Animal.prototype = {
  	//必须手动将constructor指向Animal
  	constructor：Animal，
	swimming : fnctiong(){
  console.log(this,name+'在游泳'；)
}
	eating : fnctiong(){
  console.log(this,name+'在吃骨头'；)
}
}
var smy = new Animal('萨摩耶', 10);
~~~

### this指向问题

#### 原型对象中的this指向

> 构造函数中的this 和原型对象（`Animal.protorype.eating`）的函数中的this，指向的都是实例化对象 

~~~js
this这个 keyword非常的困惑,但是其实有一个好方法可以理解.

1. 检查 ' . ' 左边是谁invoke 这个函数. 例如 xiaoming.age();  age函数里面有this, 然后 '. ' 旁边是xiaoming , 那么this就是指向xiaoming了.这种叫做 Implicit Binding.

2. 如果点旁边没有,那就检查有没有用到 bind, apply, call 这三种, 有的话就是调用此方法的对象. 这种叫做 explicit binding.

3. 如果上面两个都没有就检查代码里面有没有用到new 这个keyword, 有的话那就是指向new旁边的函数对象. 这种叫做new binding

4. 上面三个都没有, 检查是不是有arrow function, 有arrow function的话就是, 那么指向是arrow function的lexical binding 的对象. 就是她的parent. 这种叫做 lexical binding

5. 全部都没有如果不是strict mode那就是window对象了.. strict就是 error (undefined).
~~~

![this问题](img/this问题.png)

### 继承

#### call

> call() 可以调用函数
>
> call()作用：修改this的指向
>
> 使用call()的时候，参数1：是修改后的this指向；参数2，参数3...使用逗号隔开链接（后面的参数，就是把call方法点出来的函数的参数）

#### apply

> apply()可以调用函数
>
> 参数有两个，参数1：修改后的this指向；参数2：原函数的参数==数组==
>
> 应用：常常与数组有关

##### 例1

~~~js
        function fn(x, y) {
            console.log("函数运行了");
            console.log(this);//obj 、 aa
            console.log(x + y);
        }

        var obj = { name: 'lili' };
        var aa = {};
        //call 可以调用函数
        //call 第一个参数 将函数的this指向改变到的对象名，后面的所有参数，就是之前函数的参数
        fn.call(obj, 5, 3); //obj>name: "lili",8
        fn.call(aa, 5, 4); //obj , 9

        //apply  可以调用函数并改变指针指向  ,apply 只有两个参数，第一个参数是指针指向，第二个参数是一个数组，数组里面是是原来的函数的所有参数值
        fn.apply(obj, [5, 4]); //obj>name: "lili",8
~~~

##### 例2: 求数组的最值

~~~js
//当输入的是数值型的数据
console.log(Math.max(1, 2, 6, 34, 7, 45, 2));//45
        //求数组的最大值
        var arr = [1, 2, 6, 34, 7, 45, 2];
        //法1:使用 apply
        var max = Math.max.apply(Math, arr);
        var min = Math.min.apply(Math, arr);
        console.log(max, min);
				//法2:使用扩展运算符,将数组序列化
				==> Math.max(...arr)

//用户输入三个数，返回三个数中的最大值
var newnum = [];
        for (var i = 0; i < 3; i++) {
            newnum.push(prompt(`请输入第${i + 1}个数字`))
        }
        var max = Math.max.apply(Math, newnum);
        alert(`最大的数是${max}`);
~~~

#### bind

> 可以改变指针的指向，不会调用函数
>
> 用于定时器中

##### 需求：点击按钮，任强按钮的背景1秒后变红

~~~~~js
//法1.使用 bind解决问题
         document.querySelector('button').onclick = function () {
             console.log(this);//btn
             setTimeout(function () {
                 //this 指向button
                 this.style.background = "red";
             }.bind(this), 1000)
         }

//法2.将绑定事件的this指向储存在一个变量中
        document.querySelector('button').onclick = function () {
            console.log(this);//btn
            var _this = this;
            setTimeout(function () {
                //this 指向button
                _this.style.background = "red";
            }, 1000)
        }
//法3. 使用箭头函数保留箭头的指向 => 箭头函数会保留父级函数的this指向;父级是事件函数,指向触发事件
 				document.querySelector('button').onclick = function () {
             console.log(this);//btn
             setTimeout(()=> {
                 //this 指向button
                 this.style.background = "red";
             }, 1000)
         }

~~~~~



#### 继承：子构造函数继承父构造函数中的属性

> 1.先定义一个父构造函数
>
> 2.再定义一个子构造函数
>
> 3.子构造函数使用call / apply 方法继承父构造函数的属性

~~~js
        //创建父
        function Parent(name, age) {
            this.name = name;
            this.age = age;
            this.money = function (num) {
                console.log(this.name + num + "元资产");
            }
        }

        //创建子
        function Son(name, age, score) {
            this.score = score;
            this.name = name;
            this.age = age;
            //继承
            Parent.call(this, name, age);  //call
            // Parent.apply(this, [name, age]);  //apply
            this.scoreFun = function () {
                console.log(this.name + "成绩是：" + score);
            }
        }

        var tianya = new Parent('天涯', 30);
        var xiaoming = new Son('小明', 16, 90);
        xiaoming.money(200); //小明200元资产
        console.log(xiaoming.name); //小明
        xiaoming.scoreFun();   //小明成绩是90
~~~

#### 继承：借用原型对象继承方法

> 1.先定义一个父构造函数
>
> 2.再定义一个子构造函数
>
> 3.子构造函数继承父构造函数的属性

~~~js
        //创建父 构造函数
        function Parent(name, age) {
            this.name = name;
            this.age = age;
            this.money = function (num) {
                console.log(this.name + num + "元资产");
            }
        }

        //创建子  构造函数
        function Son(name, age, score) {
            this.score = score;
            this.name = name;
            this.age = age;
        }
        //使用 prototype 原型 来实现了继承
        Son.prototype = new Parent('大华', 32);
        //constructor 需要手动的重新赋值
        Son.prototype.constructor = Son;
        //实例化
        //var parent = new Parent();

        var son = new Son('小花', 16, 100);
        son.money(1000);  // 小花1000元资产
        console.log(son); //Son
~~~



## ES5新增方法

### 数组方法

#### forEach遍历数组

> 特点：没有返回值

~~~js
 arr.forEach(function(value, index, array) {
       //参数一是:数组元素
       //参数二是:数组元素的索引
       //参数三是:当前的数组
 })
  //相当于数组遍历的 for循环 没有返回值
~~~

##### 例：求数组的和

~~~js
var arr = [1, 2, 3, 4, 5, 6, 6, 7, 7, 8, 8];
var sum2 = 0;
        arr.forEach(function (value) {
            sum2 += value;
        })
        console.log(sum2);// 57
//forEach没有返回值，是undefinde
var sum2 = 0;
    var resulet = arr.forEach(function (value) {
            sum2 += value;
      		return sum2;
        })
     console.log(sum2);//undefinde
~~~



#### map遍历数组

> 特点：可以有返回值

~~~~js
 arr.forEach(function(value, index, array) {
       //参数一是:数组元素
       //参数二是:数组元素的索引
       //参数三是:当前的数组
 })
  //相当于数组遍历的 for循环 有返回值
~~~~

~~~js
var arr = [1, 2, 3, 4, 5, 6, 6, 7, 7, 8, 8];
var sum3 = 0;
        var result = arr.map(function (value) {
            // console.log(this);//window
            sum3 += value;
            value += 2;
            return value;
        })
        //map有return 返回值，可以更改原数组
        console.log(sum3);    //57
        console.log(result); //(11) [3, 4, 5, 6, 7, 8, 8, 9, 9, 10, 10]
~~~

#### filter过滤数组

> 用于把`Array`的某些元素过滤掉，然后返回剩下的元素（筛选）
>
> `filter()`把传入的函数依次作用于每个元素，然后根据返回值是true/false决定保留/丢弃该元素

~~~js
  var arr = [12, 66, 4, 88, 3, 7];
  var newArr = arr.filter(function(value, index,array) {
  	 //参数一是:数组元素
     //参数二是:数组元素的索引
     //参数三是:当前的数组
     return value >= 20;
  });
//循环的中间不会停止的
  console.log(newArr);//[66,88] //返回值是一个新数组
~~~

#### some

> 查找数组中是否有满足条件的元素

~~~js
//需求：找到大于60 的成绩，并输出
        var score = [45, 9, 78, 67, 35, 12, 56, 98, 87, 76];
        //some 查找 数组中 是否存在该条记录，存在返回 true,立即停止循环,不存在返回false
        var result = score.some(function (value) {
            console.log(value); //45,9,78;找到了一个复合>=60的，就立刻停止
            return value >= 60;
        })
        console.log(result); //true

        //some  如果没有return ,会全部循环完，返回一个false
        // var result = score.some(function (value) {
        //     console.log(value); //当成num型依次输出score的元素
        //     // return value >= 60;
        // })

        //console.log(result); //false
~~~

##### 实例：商品筛选框

![查询商品实例](img/查询商品实例.png)

#### trim去除空格

> 用于去除字符串前后的空格

~~~js
var str = '   hello   '
console.log(str.trim()）  //hello 去除两端空格
~~~

#### 获取对象的属性名

> Object.keys(对象) 获取到当前对象中的属性名 ，返回值是一个数组

~~~js
var obj = {
     id: 1,
     pname: '小米',
     price: 1999,
     num: 2000
};
var result = Object.keys(obj)
console.log(result)//[id，pname,price,num]
~~~

#### 获取对象的属性值

> Object.values(对象) 

~~~
var result = Object.values(obj)
console.log(result)//[1，'小米',1999,2000]
~~~

#### Object.defineProperty

> 设置或修改对象中的属性,vue2双向绑定原理的核心

~~~js
 var obj = {
            id: 1,
            name: "lili",
            age: 18,
            sex: "女"
        }
        //普通方法添加属性
        obj.score = 80;//新增
        obj.age = 19;//修改
        console.log(obj);

        //可以使用 Object.defineProperty()
        //新增属性
        Object.defineProperty(obj, 'tel', {
            value: "13412341234",
            writable: true,//   writable 的值为true ,可以修改属性；false (默认值) 不可以修改该属性
            configurable: true, //  true 表示允许删除，false(默认值 ) 不允许删除
            enumerable: true  // false 表示不能被遍历
        })
        console.log(obj);
        //修改
        Object.defineProperty(obj, 'tel', {
            value: "13099998888"
        })
        console.log(obj);
        //删除属性
        // delete obj.tel;
        // console.log(obj);
        //遍历
        for (var i in obj) {
            console.log(i);
        } //id , name , age , sex
~~~



### 高阶函数 Higher-order function

>  变量可以指向函数
>
>  函数的参数能够接收变量
>
>  故，一个函数可以接收另一个函数作为参数（高阶函数）

#### 函数的定义方式

> 函数的常用定义方式由三种

~~~js
 		//1.1 命名函数
        function fn() {

        }
        //1.2 匿名函数
        var test = function () {

        }

        //1.3 使用new创建的函数  很少使用 (参数1，参数2，函数表达式)
        var aa = new Function('a', 'b', 'console.log(a+b)');
        aa(3, 4); // 7
~~~



#### 函数的调用方式

> 七种

~~~js
        //2.1 普通的函数调用
        function fn1() {
            console.log("函数fn1");
        }
        fn1();
        //2.2 对象的方法调用
        var o = {
            myfn: function () {
                console.log("对象中的方法");
            }
        }
        o.myfn();

        //2.3 构造函数
        function Parent(name) {
            this.name = name;
        }
        //实例化
        var pp = new Parent('大山');
        console.log(pp.name);

        //2.4 绑定事件  满足触发条件自动调用
        document.querySelector('button').onclick = function () {
            console.log('事件绑定的函数调用了');
        }

        //2.5 定时器的函数调用
        var num = 1;
        var timer = setInterval(function () {
            console.log(num);
            num++;
        }, 1000);

        //2.6 立即执行函数  用于插件的封装
        //将插件的变量放在一个局部作用域里，避免全局污染
        ; (function () {
            console.log("我是一个立即执行函数哦");
        })();
~~~



#### map/reduce

*  map

>  `map()`方法创建一个新数组，其结果是该数组中的每个元素调用一次提供的函数后的返回值
>
>  [MDN中关于map的用法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
>
>  ```js
>  const array1 = [1, 4, 9, 16];
>
>  // 创建一个函数map1，用于计算arry1*2的结果
>  const map1 = array1.map(x => x * 2);
>
>  console.log(map1);
>  // expected output: Array [2, 8, 18, 32]
>  ```
>
>  

*  reduce

Array的`reduce()`把一个函数作用在这个Array的[x1, x2, x3, ...]上

这个函数必须接收两个参数

`reduce()`把结果继续和序列的下一个元素做累积计算

>  ```js
>  //用于求和
>  var arr = [1,3,5];
>  arr.reduce(function (x, y){
>     return x+y; // 求积则为 return  arr.reduce((x, y)=>(x*y));
>  }); // 9
>
>  //用于求积
>
>
>  ```



#### filter

用于把`Array`的某些元素过滤掉，然后返回剩下的元素（筛选）

`filter()`把传入的函数依次作用于每个元素，然后根据返回值是true/false决定保留/丢弃该元素

>  ```js
>  1.删除偶数，只要奇数
>  	var arr=[1, 2, 3, 4, 5, 6, 7];
>  	var r = arr.filter(function (x){
>         return x % 2 !==00;
>         
>     })
>     r; //[1,3,5,7]
>
>  2.删除数组中的空字符串
>
>  	var arr = ['a','', 'b', null, undefined, 'c'];
>  	var r = arr.filter(function(x){
>         return s && s. trim();//trim() 方法会从一个字符串的两端删除空白字符。在这个上下文中的空白字符是所有的空白字符 (space, tab, no-break space 等) 以及所有行终止符字符（如 LF，CR等）。
>     })
>     r;// ['a', 'b','c']
>  ```
>



*  回调函数

```js
var arr=['a', 'b', 'c'];
var r = arr.filter(function (element, index, self){
    console.log(element);//依次打印'a' 'b' 'c'
    console.log(index);  //依次打印 0,1,2（元素的位置）
    console.log(self); //self就是arr（数组本身）
})
```





对于数组，除了`map()`、`reduce`、`filter()`、`sort()`这些方法可以传入一个函数外，`Array`对象还提供了很多非常实用的高阶函数。



#### 闭包  closure

>  内部函数可以引用外部函数的参数和局部变量，当外部函数返回内部函数时，相关参数和变量都保存在返回的函数中

##### 获取li的下标

~~~html
<ul>
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
    </ul>
~~~

~~~js
 var aLi = document.querySelectorAll('li');
        //给li绑定点击事件，获取 li的下标
        // for (var i = 0; i < aLi.length; i++) {
        //     aLi[i].onclick = function () {
        //         console.log("下标：" + i);//无论点哪个li，输出都是5=>如何解决？
        //     }
        // }

        //法1.使用 属性的方式解决问题
        // for (var i = 0; i < aLi.length; i++) {
        //     aLi[i].index = i;//把i赋值给了li的属性
        //     aLi[i].onclick = function () {
        //         console.log("下标：" + this.index);//
        //     }
        // }

        //法2.使用 闭包来解决问题
        for (var i = 0; i < aLi.length; i++) {
            (function () {
                var index = i;
                aLi[i].onclick = function () {
                    console.log("下标：" + index);//
                }
            })()
        }
~~~

##### 出租车计费建模

> 起步价 10元 (2公里)，每多一公里增加 5元，
>
> 输入公里数，算出打车的价格，
>
> 如果有堵车的情况，总价格 就增加10元
>
> 可以使用  闭包也可以不用

~~~js
var car = (function () {
            var start = 10;//打车的起步价
            var total = 0;//打车的总价格
            return {
                price: function (num) {
                    //console.log(num);
                    if (num < 3) {
                        total = start;
                    } else {
                        total = start + (num - 2) * 5;
                    }
                    return total;//返回打车的总价格
                },
                yongdu: function (flag) {
                    return flag ? total + 10 : total;
                }
            }
        })()

        //调用 打车的函数
        console.log("打车：", car.price(3)); //三公里
        console.log(car.yongdu(true));  //三公里拥堵
        console.log("打车：", car.price(10));
        console.log("是否拥堵：", car.yongdu(false));
~~~



### 防抖

> 防抖(debounce)：触发高频事件后 n 秒内函数只会执行一次，如果 n 秒内高频事件再次被触发，则重新计算时间
>
> 举例：就好像在百度搜索时，每次输入之后都有联想词弹出，这个控制联想词的方法就不可能是输入框内容一改变就触发的，他一定是当你结束输入一段时间之后才会触发。

####  封装防抖函数

~~~js
//滚动条事件 会持续触发，需要使用 防抖来优化性能
        //封装防抖函数
        //参数1：回调函数  ；参数2 ：延时时间 是毫秒数 ，
        function debounce(fn, delay) {
            var timer = null;//设置了定时器的初始值
            return function () {//使用了闭包
                if (timer) {//判定定时器是否存在，如果存在将原来的定时器清除，生成新的定时器
                    clearTimeout(timer);
                    timer = setTimeout(fn, delay);
                } else {
                    timer = setTimeout(fn, delay);
                }
            }
        }

~~~

##### 例：监听滚动条，一键返回顶部

~~~js
var oUp = document.querySelector('.up');
        //给滚动事件绑定 函数,使用了防抖 ,会减少执行很多次的 scroll
        window.onscroll = debounce(goup, 200);
        // window.onscroll = goup;

        function goup() {
            var top = document.documentElement.scrollTop;
            console.log(top);
            //4.当滚动距离超过200px的时候，显示 小按钮
            if (top >= 200) {
                oUp.style.display = "block";
            } else {
                oUp.style.display = "none";
            }
        }
        oUp.onclick = function () {
            document.documentElement.scrollTop = 0;
            //想要返回顶部或者可以写成
            // scrollTo(0, 0);
        }
~~~







### 节流

> 节流(thorttle)：高频事件触发，但在 n 秒内只会执行一次，所以节流会稀释函数的执行频率
>
> 举例：预定一个函数只有在大于等于执行周期时才执行，周期内调用不执行。就好像你在淘宝抢购某一件限量热卖商品时，你不断点刷新点购买，可是总有一段时间你点上是没有效果，这里就用到了节流，就是怕点的太快导致系统出现bug。
>
> 区别：**防抖动是将多次执行变为最后一次执行，节流是将多次执行变成每隔一段时间执行。

#### 封装节流函数

~~~js
//参数1：回调函数  参数2：延时时间
        function throttle(fn, delay) {
            var valid = true;//记录是否激活的状态 true  激活  false 休息
            return function () {
                if (!valid) {//休息
                    return false;
                }
                valid = false;//设置的下一次的状态值
                setTimeout(function () {
                    fn();//调用函数
                    valid = true;//激活状态
                }, delay);
            }
        }
~~~

##### 监听键盘按下的按键，并输出调用后台接口

~~~js
 var oInput = document.querySelector('input');
        //给input 绑定鼠标抬起时间
        //onkeyup存在性能问题 ,需要使用 节流来优化
        // oInput.onkeyup = function (ev) {
        //     console.log(ev.target.value);
        //     console.log("调用后台接口");
        // }
        oInput.onkeyup = throttle(getdata, 500);
        // oInput.onkeyup = getdata;
        function getdata() {
            console.log("调用后台接口" + oInput.value);
        }
~~~

### 递归

> 如果一个函数在内部可以调用其本身，那么这个函数就是递归函数。简单理解:函数内部自己调用自己, 这个函数就是递归函数

~~~js
    //需求：循环10次  打印 我来了
        for (var i = 0; i < 10; i++) {
            console.log("我来了");
        }
        //改写为递归
        var num = 0;
        function fn() {
            num++;
            console.log("我来了" + num);
            //递归调用 必须加结束条件，f否则就会变为死循环
            if (num == 10) {
                return;
            }
            fn();
        }
        fn();
        
      //阶乘  1*2*3*4*5*..... 120
        //循环
        // var jiecheng = 1;//阶乘的结果
        // var n = prompt("输入求多少的阶乘？");
        // for (var i = 1; i <= n; i++) {
        //     jiecheng *= i;
        // }
        // console.log(jiecheng);

        //用递归来实现
        function fn(n) {
            if (n == 1) {
                return 1;
            }
            return n * fn(n - 1);
        }

        console.log(fn(4));
~~~

#### 递归遍历数组

~~~js
var data = [
            {
                id: 1,
                name: '家电',
                goods: [{
                    id: 11,
                    gname: '冰箱',
                    goods: [{
                        id: 111,
                        gname: '海尔'
                    }, {
                        id: 112,
                        gname: '美的'
                    },]
                }, {
                    id: 12,
                    gname: '洗衣机'
                }]
            },
            {
                id: 2,
                name: '服饰'
            }];
        //数据是一种 多层级的倒数结构，想要遍历数据，考虑使用递归
        function getId(json, id) {
            var o = {};//查找的结果
            json.forEach(function (item) {
                // console.log(40, item);
                if (item.id == id) {
                    //console.log(item);//找到了这个数据并打印
                    o = item;
                } else if (item.goods && item.goods.length > 0) {
                    //递归查找 下一级的数据
                    o = getId(item.goods, id);//
                }
            })
            return o;
        }

        // console.log(getId(data, 2)); //第一级数据
        //console.log(getId(data, 11)); //第二级数据
        console.log(getId(data, 112)); //第二级数据
~~~

##### 例题:求1-100的和

~~~js
function fn(n) {
            if (n == 1) {
                return 1;
            }
            return n + fn(n - 1);
        }
        console.log(fn(100));
~~~



### 拷贝

#### 简单数组的深拷贝

~~~js
      //1.浅拷贝 只拷贝了指针，只是多了一个指针指向 堆里面的数据，
         var arr = ["one", "two", "three"];
         var arr1 = arr;//
         arr1[1] = 123;
         console.log(arr);//["one" 123 "three"]
         console.log(arr1);//["one" 123 "three"]

        //1. 深拷贝 数组中的元素被复制了一份， 在内存申请了一块内存区域,arr 在修改的时候不会影响到 arr1
         var arr = ["one", "two", "three"];
         var arr1 = [];
         for (var i = 0; i < arr.length; i++) {
             arr1[i] = arr[i];
         }
         arr[1] = 456;//深拷贝
         console.log(arr);//["one" 456 "three"]
         console.log(arr1);//["one" "two" "three"]

        //2.slice 对数组进行截取  也可以完成深拷贝  
         var arr = ["one", "two", "three"];
         var arr2 = arr.slice(0);
         arr[1] = 123;
         console.log(arr);
         console.log(arr2);
        //3.concat 数组连接  也可以完成深拷贝
         var arr = ["one", "two", "three"];
         var arr3 = arr.concat();
         arr[1] = 123;
         console.log(arr);
         console.log(arr3);
        //4.重点： 序列化和反序列化 可以完成深拷贝
        var arr = ["one", "two", "three"];
        // JSON.stringify 将数组转json字符串
        var arrstr = JSON.stringify(arr);
        console.log(arrstr);
        console.log(typeof arrstr);
        // JSON.parse 将json字符串转json对象
        var arr5 = JSON.parse(arrstr);
        console.log(arr5);
        arr5[1] = 123;
        console.log(arr);
        console.log(arr5);
~~~

#### 简单对象的深拷贝

~~~js
var obj = {
            id: 1,
            name: "lili"
        }
        //浅拷贝
        // var obj1 = obj;
        // obj1.id = 2;
        // console.log(obj);
        // console.log(obj1);

        //1.使用 循环完成 对象的 深拷贝
        // var obj2 = {};
        // for (var i in obj) {
        //     obj2[i] = obj[i];
        // }
        // obj2.id = 3;
        // console.log(obj);
        // console.log(obj2);

        //2.assign  对像合并,可以完成深拷贝，但是需要合并一个空对象
        // var obj3 = Object.assign({}, obj);
        // // console.log(obj3);
        // obj3.id = 5;
        // console.log(obj);
        // console.log(obj3);

        //3.序列化和反序列化来完成深拷贝
        var objstr = JSON.stringify(obj);//将json对象转字符串
        var obj5 = JSON.parse(objstr);//将字符串转json对象
        obj5.id = 6;
        console.log(obj);
        console.log(obj5);
~~~



#### 复杂数据的深拷贝

~~~
// var obj = {
        //     name: "lili",
        //     age: 18,
        //     msg: {
        //         sex: "女"
        //     },
        //     color: ['red', 'green', 'yellow']
        // }
        //一层的深拷贝，解决不了复杂数据的深拷贝问题
        // var obj2 = {};
        // for (var i in obj) {
        //     obj2[i] = obj[i];
        // }
        // obj2.msg.sex = "男";
        // console.log(obj);
        // console.log(obj2);

        //3.序列化和反序列化来完成深拷贝 ，不支持 对象中存在方法
        // var objstr = JSON.stringify(obj);//将json对象转字符串
        // var obj5 = JSON.parse(objstr);//将字符串转json对象
        // obj5.msg.sex = "男";
        // console.log(obj);
        // console.log(obj5);

~~~

##### 封装一个递归的深拷贝函数

~~~js
var obj = {
            name: "lili",
            age: 18,
            msg: {
                sex: "女"
            },
            color: ['red', 'green', 'yellow']
        }
        var newObj = {};
        function deepCopy(newObj, oldObj) {
            for (var k in oldObj) {
                var item = oldObj[k];
                //判断 item 是数组还是对象
                if (item instanceof Array) {//是不是数组
                    newObj[k] = [];
                    deepCopy(newObj[k], item);
                } else if (item instanceof Object) {//是不是对象
                    newObj[k] = {};
                    deepCopy(newObj[k], item);
                } else {
                    newObj[k] = item;
                }
            }
        }
        deepCopy(newObj, obj);
        newObj.msg.sex = "男";
        newObj.color[0] = "pink";
        console.log(obj);
        console.log(newObj);
~~~





### 箭头函数 Arrow Function

> 箭头函数 () => {} 
>
> ()：代表是函数； =>：必须要的符号，指向哪一个代码块；{}：函数体 

特点：

*  没有this
*  没有arguments
*  不能使用new进行调用
*  没有super

* 只有一个变量的时候可以省略小括号;只有一条函数表达式的时候可以省略{}和return

####  箭头函数会保留父级的this指向

> 要注意父级this的指向
>
> 在node里面,父级的var不是全局变量,会输出undefined

~~~js
 var cat = {
            lives: 9,
            jump: function () {
                this.lives--;
            }
        }
        cat.jump();
        cat.jump();
        console.log(cat.lives);//7  

        var cat = {
            lives: 9,
            jump: () => {
                console.log(this);//window
                this.lives--;
            }
        }
        cat.jump();
        cat.jump();
        console.log(cat.lives);//9  
        //箭头函数  保留了  windowd的this指向 ,  this.lives-- 根本不是 cat.lives

        var age = 100;
        var obj = {
            age: 20,
            say: () => {
                console.log(this.age);//100
            }
        }
        obj.say();
~~~





### 扩展运算符

> 扩展运算符可以将数组或者对象转为用逗号分隔的参数序列
>
> ... 叫做扩展运算符

~~~js
 <ul>
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
        <li>6</li>
    </ul>
    <script>
        //扩展运算符  ...  可以将 数组 拆分成 以逗号分割的参数序列
        //1. 可以将数组序列化
        // let arr = [1, 2, 3, 4];
        // console.log(arr);
        // console.log(...arr);

        //2.可以和 Math.max 配对使用
        //求数组的最大值
        var arr = [1, 2, 6, 34, 7, 45, 2];
        //使用 apply
        var max = Math.max.apply(Math, arr);
        var min = Math.min.apply(Math, arr);

        console.log(Math.max(...arr));

        //3.可以用于合并数组
        let arr1 = [1, 2, 3];
        let arr2 = [4, 5, 6];
        console.log([...arr1, ...arr2]);

        //4.可以对 一层 数组深拷贝
        let arr3 = [10, 20, 30];
        let arr4 = [...arr3];
        arr4[1] = 'test';
        console.log(arr3);
        console.log(arr4);


        //5.使用  push  进行的数组合并
        let arr5 = [1, 2, 3];
        let arr6 = [4, 5, 6];
        arr5.push(...arr6);
        console.log(arr5);

        //6.可以将维数组转为真数组
        var aLi = document.querySelectorAll('li');
        console.log(aLi);
        var arr = [...aLi];
        console.log(arr);
        //7.扩展运算符和解构一起使用
        //注意： ...扩展运算符只能放在 解构的最后面
        let arr7 = ['red', 'yellow', 'green'];

        // let [color, ...colors] = arr7;
        // console.log(color, colors);

        //let [...color, colors] = arr7;//Rest element must be last element
        console.log(color, colors);

        //8. 剩余参数
 				//first 会接收第一个参数  ...last 会接收剩余的参数
        //... 叫做扩展运算符
        function arg(first, ...last) {
            console.log(first);
            console.log(last);
        }
        arg(1, 2, 3, 4, 5, 6);
        //

~~~



generator







#### RegExp

正则表达：用一种描述性语言来给字符串定义一个规则，凡是复合规则的字符串，我们就认为它匹配了（用来匹配字符串）

获取正则对象

```js
1. var  patt=new RegExp(pattern,modifiers);
2. var patt=/pattern/modifiers;

//
pattern: 正则表达式的文本
modifiers： 匹配的模式
	i: 忽略大小写
    g：全局匹配，找到所有的匹配
    m：多行匹配
    
3.正则的行首与行尾
var patt/^匹配规则$/
    
//只要有符合该规则的字符就能通过验证。而/^匹配规则$/则需要字符串中所有字符都必须符合该规则

```



正则对象中的方法：

*  test()  检索给定字符的值是否和正则表达式匹配，返回布尔值
*  exec()  检索字符串中指定的值。返回找到的值，并确定其位置。



string字符串中正则表达式的方法

*  search()   字符搜索
*  split()      分割字符串操作
*  replace()    替换匹配到的字符串
*  match()    匹配一个或者多个规则

正则表达式的规则

>  
>
>  - 元字符：具有特殊含义的字符。大部分元字符前使用转义字符\。
>
>  |  表达式   |              描述               |
>  | :----: | :---------------------------: |
>  |   .    |       查找单个字符，除了换行和行结束符。       |
>  |   \w   |            查找单词字符。            |
>  |   \W   |           查找非单词字符。            |
>  |   \d   |             查找数字。             |
>  |   \D   |           查找非数字字符。            |
>  |   \s   |            查找空白字符。            |
>  |   \S   |           查找非空白字符。            |
>  |   \b   |            匹配单词边界。            |
>  |   \B   |           匹配非单词边界。            |
>  |   \0   |          查找 NULL 字符。          |
>  |   \n   |            查找换行符。             |
>  |   \f   |            查找换页符。             |
>  |   \r   |            查找回车符。             |
>  |   \t   |            查找制表符。             |
>  |   \v   |           查找垂直制表符。            |
>  |  \xxx  |      查找以八进制数 xxx 规定的字符。       |
>  |  \xdd  |      查找以十六进制数 dd 规定的字符。       |
>  | \uxxxx | 查找以十六进制数 xxxx 规定的 Unicode 字符。 |
>
>  *　量词：用来描述匹配字符的数量。
>
>  |  表达式   |                    描述                    |
>  | :----: | :--------------------------------------: |
>  |   n+   |            匹配任何包含至少一个 n 的字符串。            |
>  |   n*   |           匹配任何包含零个或多个 n 的字符串。            |
>  |   n?   |           匹配任何包含零个或一个 n 的字符串。            |
>  |  n{X}  |           匹配包含 X 个 n 的序列的字符串。            |
>  | n{X,}  |     X 是一个正整数。前面的模式 n 连续出现至少 X 次时匹配。      |
>  | n{X,Y} | X 和 Y 为正整数。前面的模式 n 连续出现至少 X 次，至多 Y 次时匹配。 |
>  |   n$   |             匹配任何结尾为 n 的字符串。              |
>  |   ^n   |             匹配任何开头为 n 的字符串。              |
>  |  ?=n   |          匹配任何其后紧接指定字符串 n 的字符串。           |
>  |  ?!n   |         匹配任何其后没有紧接指定字符串 n 的字符串。          |
>
>  - 范围：描述匹配范围内字符。
>
>  |        表达式         |          描述          |
>  | :----------------: | :------------------: |
>  |       [abc]        |    查找方括号之间的任何字符。     |
>  |       [^abc]       |   查找任何不在方括号之间的字符。    |
>  |       [0-9]        |   查找任何从 0 至 9 的数字。   |
>  |       [a-z]        | 查找任何从小写 a 到小写 z 的字符。 |
>  |       [A-Z]        | 查找任何从大写 A 到大写 Z 的字符。 |
>  |       [A-z]        | 查找任何从大写 A 到小写 z 的字符。 |
>  | (red\|blue\|green) |      查找任何指定的选项。      |



#### JSON

JavaAcript Object Notation   是一种数据交换格式





