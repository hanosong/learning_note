export function sum(num1:number, num2:number){
    return num1 + num2
}

// 注意：监听的是ts文件里面的类型，在js文件中导入这里面的函数，不会做校验

export function formatePrice(priceString: string) {
    if(priceString.includes('$')){ // includes 高级语法，需要用polyfill进行处理，但是此时用的是ts-loader（里面没有包含polyfill的东西）=> 解决：用babel-loader + ts预设处理
        return 'xxx'
    }else {
        return 'yyy'
    }
}