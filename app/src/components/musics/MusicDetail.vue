<template>
    <div>
        <aplayer autoplay :music="musicData" v-if="isShow"></aplayer>
    </div>
</template>

<script>
    import axios from 'axios';
    import Aplayer from 'vue-aplayer'
    export default {
        data() {
            return {
                musicData: [],
                isShow:false
            }
        },
        mounted:function(){
            this.$store.commit('change',{bgColor:'rgb(0, 150, 136)',title:'Music'});
            axios.get('/static/data/musicdata.json').then((res)=>{
                var arr =res.data.musicData
                for(var i=0;i<arr.length;i++){
                    //解构 将对象里的src musicImgSrc换成url pic
                    var {title,author,src:url,musicImgSrc:pic,lrc}=arr[i];
                    //对象属性的简写
                    var obj={title,author,url,pic,lrc};
                    this.musicData.push(obj);
                }
                this.isShow=true;
                //v-if isShow初始为false 在axios异步加载完变为true 在将内容显示在页面
            })
        },
        components:{
            Aplayer
        }
    }
</script>

<style scoped>

</style>