1. 获取URL参数

~~~
const getQueryParams = URL =>
  JSON.parse('{"' + decodeURL(URL.split('?')[1]).replace(/&/g, '","'). replace(/=/g, '":"') + '"}')
  
getQueryParams('https://guitars.com?type=acoustic&brand=martin')

=> {type: 'acoustic',  brand: 'martin'}
~~~



2. 将单词首字母改成大写

~~~
const cap =(str) => str.charAt(0).toUppercase() + str.slice(1)

//charAt返回字符	
~~~



3. 求平均值

~~~
const getAverage = (...nums) => nums.reduce( (a,b) => a + b) /num.length

getAverage(1.2.3)
~~~



4. 颠倒字符串

~~~
const reverseString = (str) => str.split('').reverse().join('')
~~~



5. 检查空的数组

~~~
// 是数组吗？ 长度大于0吗
const arrayIsNotEmpty = arr => Array.isArray(arr) && arr.length > 0
~~~



6. 随机排序数组

~~~
onst shuffleArray = arr => arr.sort(() => 0.5 - Math.random())
//0.5 - Math.random() 有可能大于零也有可能小于0
~~~



7. 计算间隔的天数

~~~
const dayDiff = (date1, date2) => Math.ceil(Math.abs( date1 - date2 ) / 86400000)
//向上取整数计算Math.ceil
dayDiff(new Date('2022-08-19'), new Date('2022--09-18')) // 30
~~~



 8.合并数组

~~~
// 1.直接合并
const mergeArry = (a,b) => a.concat(b)
const mergeArry = (a,b) => [...a,...b]

//2.合并并且剔除重复项 
//先合并，再set，再用展开运算符放到一个新数组中
const removeDuplications = (a,b) => [... new Set(mergeArray(a,b))]
~~~

