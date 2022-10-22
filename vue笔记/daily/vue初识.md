## 什么是 Vue

#### 1. 软件设计模式:

    1). MVC模式
        M => 数据层 电视节目
            const str = '中央五套';
        V => 视图层 电视机 : 用来呈现网页内容
            const oDiv = document.querySelector('div');
        C => 控制层 遥控器 : DOM操作
            oDiv.innerText = str;
    缺点:
        C太臃肿, 功能太多, 作用太大
    2). MVVM模式
        VM=> 数据视图层 小爱

#### Vue 程序中的模式分析

    //视图层
    <div id="app"> {{msg}} </div>

    //Vue实例 (小爱)
    new Vue({
        el:"#app",
        //数据层
        data:{
            msg: '中央五套'
        }
    })

##### el 的作用:

    1. 确定视图
    2. 如果选择器选中多个标签, 则第一个标签会变成视图
    3. body和html不能作为视图 => Do not mount Vue to <html> or <body> - mount to normal elements instead.
    4. Vue的数据和方法,只能放在Vue的视图内(#app内部)

_/
//------------------------------------------------------------
/_

## Vue 是如何实现数据绑定视图,来代替 DOM 操作的?

    1: 使用插值表达式
        语法: {{任意表达式}} => 可以书写任意的JS表达式
        网页呈现效果:
          任意表达式的返回值;
          如果是undefined和null,则不会显示在网页上
        作用: 给标签插入内容 => 绑定数据到内容
    2: 使用指令

#### 什么样的数据,才可以放入插值表达式中?

    1. Vue实例的数据, 可以放入插值表达式
        data:{
            msg: '111'
        }
    2. Vue实例的方法, 才可以放到插值表达式中
        methods: {
            fn(){
                return '222'
            }
        }
    3. 插值表达式中可以放随机函数
        {{Math.random()}}
    4. 全局变量无法放到插值表达式内
        在script标签里面const一个变量str = '333'
        {{str}} => 还是会显示str

_/
//----------------------------------------------------
/_

## Vue 的方法

        1. v-on => @
        click事件; change事件
        语法: <button @click = 'fn'></button>
        指令值:只能写一个函数或者一个函数调用,不能写其他表达式

        表达式如何传参? => 直接在调用的小括号内传参即可
        this指向哪里? => 永远指向当前Vue实例
        事件对象怎么用?
            1) 不传参 => 直接通过句柄形参获取 (methods里面的函数声明里的形参有e的话,也能把e打印出来)
            2) 传参了 => 必须手动传入e  (@click="fn(e)")

    复习一下事件是如何传参的?
    obtn.onclick = function(){ show(实参) };
    obtn.onclick = show(实参). => 必报,show的返回值是一个函数
    oBtn.onclick = show.bind(?, 实参)

        ^^const vm = new Vue({})
        methods:{
            fn(){
                //不需要dom操作, 只关心要把数据改成什么
                vm.msg = '222';

                //Vue里面的this,永远指向当前的实例
                this.msg = '222';

                //如果有回调函数(回调函数内的this默认指向window),怎么办?
                //=> 写成箭头函数
                seeTimeout( () => {
                    this.msg = '222'
                },1000)
            }
        }

### v-on 指令的修饰符

        .stop => 住址冒泡
        .prevent => 住址默认事件的修饰符
        例子:
        <button @click.stop.prevent='fn'></button>

//-------------------------------------

        2. v-bind => :
        作用: 绑定数据到属性
        值(指令值) : 可以是任意表达式
        语法: 可以绑定数组,也可以绑定对象 => 方便操作多个类

        总结:
        在标签里面, 类(:class)或者style属性(:style)
        用变量去把类里面的属性的属性值用一个变量代替
        变量在data里面赋值,在methods里面被操作

    //例1: 给类添加多个属性
        //多个类可以直接放到一个数组,或者对象内都可以
    <div :class='cns'></div>

    data:{
        //放在数组里
        // cn: ['box','active','nav']
        //放在对象里
        cn: {
            box: true,
            active: true,
            nav: true
        }
    }


    //例2:点击按钮,删除div的一个属性
        //多个类也可以直接放在在一个对象内,然后把这个对象赋值给class
    <div id="app">
        <button @click='fn'></button>
        //对于要操作的属性,可以给一个变量flag
        <div :class="{box: true; active: flag; nav: true}"></div>
    </div>

    data:{
        //默认是有该属性的
        flag: true,
    }
    methods:{
        fn(){
            this.flag = ! this.flag
        }
    }
    // 还有一种思路,可以通过找到属性名为active的元素的下标,
    // 然后把它从数组中剔除掉
    const i = this.cn.indexOf('active');
    this.cn.splice(i, 1);

//------------------------------------------

    3. v-if
    作用: 条件渲染 => 根据不同的条件渲染不同的标签(显示隐藏)
    如何实现: 通过虚拟节点是否渲染来实现
    指令值: 可以写任意表达式

    v-if是Vue框架里唯一的一个组合指令:
    v-if v-else v-else-if => 在多个标签中,条件判断其中一个显示

//-------------------------------------------- 4. v-show
作用: 条件渲染
与 v-if 的区别: 是通过 display 来实现的

//--------------------------------------------

    5. v-for
    作用: 列表渲染(类似于forEach)

    一般把要渲染成列表的数据放在data里面
    如果是一个数组
    =><li v-for="(item,i) in arr">{{item}}</li>

    v-for =' 元素 in 数组名'
    v-for = '(元素, i) in 数组名'
    注意:item只能在绑定了v-for的标签的内容里面才能用(类比作用域)

    如果是多维数组,则一层一层的取(一般与v-for结合)

    //arr有三个元素,渲染3个ul
    <ul v-for="subArr in arr">
        //arr里面的每一个元素都是一个数组,数组中又有3个元素
        //一个ul里面有三个li
        <li v-for="item in arr">{{item}}</li>
    </ul>

    data:{
        arr: [
            [1,2,3],
            [4,5,6],
            [7,8,9]
        ],
    }

    如果是对象
    name: 'mimi'
    v-for = "属性值 in 对象名"
    v-for = "(属性值, 属性名) in 对象名"
    v-for = "(属性值, 属性名, 下标) in 对象" => "(item, key, i)"

    如果是数组套对象
    arr : [{name:mimi,age:15}]
    //可以使用解构
    => v-for="{name,age} in arr"

//------------------------------------------------------------------- 6. v-model
作用: 实现双向绑定

    什么是双向绑定?
    A向: 数据变化 => 视图变化   :value="msg"
    B向: 视图变化 => 数据变化   @input="fn"

    例(原理):
    //输入框事件 oninput=> 修改value的值
    <input type="text" @input="fn" :value="msg"/>

    data:{
        //响应式=> 数据改变视图
        msg:null
    },
    methods:{
        fn(e){
            //在输入框修改msg的值
            this.msg = e.target.value;
        }
    }
    => 如果使用v-model
    //不用绑定函数,直接绑定msg就可以了
    <input type="text" v-model="msg" />
    data:{
        msg:null,
    }

复选框的 model

\*/
//-
