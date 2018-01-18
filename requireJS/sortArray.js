/**
 * Created by 腾 on 2017/12/10.
 */
/*
define(function () {
    function sortArray(arr) {
        return arr.sort(function (a,b) {
            return a-b;
        });
    }
    return sortArray ;
    });*/
define(['isArray'],function (isArray) {
    function sortArray(arr) {
        if(isArray(arr)){
            return arr.sort(function (a,b) {
                return a-b;
            });
        }else {
            return '请输入数组。';
        }
    }
    return sortArray;
});
