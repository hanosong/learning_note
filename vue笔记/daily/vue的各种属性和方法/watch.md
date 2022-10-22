### 1.什么是 watch

用途: 监听某个数据,当数据变化时,实现一些指定的逻辑

与 computed 的区别
=> watch 可以有异步,computed 不能

```html
<div id="app">
  <input type="text" placeholder="单价" v-model="price" />
  <input type="text" placeholder="数量" v-model="count" />
  <hr />
  总价: {{total}}
</div>
```

```js
//count, price, total都已经在data里面声明并赋值了 => 也可以用created函数赋初始值
methods:{
    fn(){
        //定时显示
        setTimeout(() => {
            this.total = this.count * this.price;
        },1000)
    }
},
//写法1
watch:{
    //监听count , 当count数据发生变化的时候,调用fn => 重新计算total的值
    count(){
        this.fn();
    },
    //监听price , 当count数据发生变化的时候,调用fn => 重新计算total的值
    price(){
        this.fn();
    }
}

```

### 2.watch 的写法

```js
//写法2: 可以写成字符串的形式
    watch:{
        count: 'fn',
        price: 'fn'
    }

//写法3: 当一个变量有多个函数时,可以把多个函数写成数组
    watch:{
        //当count变化时,让它执行fn方法和show方法.
            count: ['fn','show'],
            price: 'fn'
        }

//写法4: 写成对象的形式 => 对象里面会有immediate和handler
    watch:{
        count:{
            //让handler默认执行一次(不管数据是否有变化)
            immediate: true,
            //count发生变化的时候,默认触发函数handler
            handler(){
                this.total = this.price* this.count;
            }
        },
         price: {
          // 让handler默认执行一次
          immediate: true,
          // count变化时,默认触发的函数.handler
          handler: 'fn'
        },
    }
```
