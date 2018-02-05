<template>
   <v-touch class="photo"  @swipeleft="next" @swiperight="prev" :style="{background:bg}">
       <router-link class="link" to="/photoList/"></router-link>
       <!-- 用路由进行跳转 可避免TAP点透的情况 -->
    </v-touch>
</template>

<script>
    import VueTouch from 'vue-touch';
    import Vue from 'vue';
    Vue.use(VueTouch,{name:'v-touch'});
    export default {
        data() {
            return {
                idx: this.$route.params.idx
            }
        },
        methods:{
            next(){
                this.idx++;
                if(this.idx==this.$store.state.photoData.length){
                    this.idx=0
                }
                this.$router.push('/photoDetail/'+this.idx)
                //编辑式导航 在左右滑动时改变网址里的idx
            },
            prev(){
                this.idx--;
                if(this.idx== -1){
                    this.idx=this.$store.state.photoData.length-1
                }
                this.$router.push('/photoDetail/'+this.idx)
            },
            fn(){
                this.$router.push('/photoList');
            }
        },
        computed:{
            bg:function(){
                //return `#000 url(${this.$store.state.photoData[this.$route.params.idx].src}) no-repeat center/contain`;
                return `#000 url(${this.$store.state.photoData[this.idx].src}) no-repeat center/contain`;
            }
        },
        components:{
            VueTouch
        },
        mounted:function(){
            this.$store.commit('change',{bgColor:'rgb(63, 81, 181)',title:'Photo'});
        }
    }
</script>

<style scoped>
    .photo{
        position: absolute;
        left: 0;
        right: 0;
        top: 1rem;
        bottom:1rem;
    }
    .link{
        display: block;
        height: 100%;
    }
    
</style>