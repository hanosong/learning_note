### 如何写一个简易的 vue(数据响应式更新)

1. 数组的元素不会有响应式
2. 由于不知道用户会声明几个对象,所以需要用递归的思想

```js
    //Vue的构造函数
    //传入一个对象,所以形参就一个
function Vue(config){
    //对config.data做一个映射 => but why?
    this.$data = config.data;

    observe(this.$data);
}


//observe 函数
function observe(data){
    //拿到data里面每一层的key全部都拿到
    const params = Object.keys(data);

    params.forEach(key =>{
        //拿到data的value
        let val = data[key];
        //给所有数据添加劫持
        Object.defineProperty(data,key,{
            get(){
                return val;
            },
            set(newval){
                val = newval;
            }
        });

        //如果对象里面的是引用类型--对象,那么就要递归
        if (Object.prototype.toString.call(data[key] === '[object Object]')){
            //递归调用自己
            observe(data[key]);
        }
    })
}

const vm = new Vue({
    el:'#app';
    data:{
        name: 'mimi',
        arr: [111],
        age: 213,
        person: {
          name: '超越',
          a: {
            b: {
              c: {
                name: 'uuuuu'
              }
            }
          }
        }
    }
})
```
