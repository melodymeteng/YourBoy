/**
 * Created by 腾 on 2017/12/10.
 */
/*require(['add'],function (add1) {
    console.log(add1(3,4));
});*/


require(['sortArray'],function (sortArray) {
   var arr=[1,8,6,9,50];
   var object={
       name:'zhangsan',
       age:20
   };
   console.log(sortArray(arr));
   console.log(sortArray(object));
});
define(function (require) {
    var arr=[1,8,6,9,50];
    var object={
        name:'zhangsan',
        age:20
    };
    console.log(sortArray(arr));
    console.log(sortArray(object));
});