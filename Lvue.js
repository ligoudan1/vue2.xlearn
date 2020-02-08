// new Lvue({
//     data:{
//         msg:"xxx"
//     }
// })


// 新建一个class类
class Lvue {
    constructor(options) {
        this.$options = options;
        this.$data = options.data;
        // 响应化
        this.observe(this.$data); // 使用observe函数做递归遍历
    }
    // 递归遍历函数,使传递进来的对象响应化
    observe(data) {

        if(!data || toString.call(data) !="[object Object]") {
            return; // 如果传进来的值没有或者不为对象,则直接return;
        }

        // 开始遍历
        // 拿出所有的key进行循环遍历
        Object.keys(data).forEach(key =>{
            this.defineReactive(data,key,data[key]);
            this.proxyData(key)
        })
    }

    proxyData(key) {
        Object.defineProperty(this,key,{
            get() {
                return this.$data[key];
            },
            set(newval) {
                this.$data[key]=newval;
            }
        })
    }

    defineReactive(obj,key,value) {

        // 递归,如果data里面是多层嵌套的关系
        this.observe(value);


        Object.defineProperty(obj,key,{
            get(){
                return value;
            },
            set(newval) {
                // 如果有变化
                if (newval !== value) {
                    value = newval;
                    console.log(`${key}的值发生了改变`);
                }
            }
        })
    }
}