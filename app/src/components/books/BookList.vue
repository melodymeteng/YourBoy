<template>
    <div>
        <swipe class="my-swipe">
            <swipe-item class="slide1"></swipe-item>
            <swipe-item class="slide2"></swipe-item>
            <swipe-item class="slide3"></swipe-item>
        </swipe>
    </div>
</template>

<script>
    import vueswipe from 'vue-swipe/dist/vue-swipe.css';
    import { Swipe, SwipeItem } from 'vue-swipe';
    export default {
        mounted:function(){
            this.$store.commit('change',{bgColor:'rgb(121, 85, 72)',title:'Book'})
        },
        components:{
            Swipe,
            SwipeItem
        }
    }
</script>

<style scoped>
    .my-swipe {
        height: 200px;
    }
    
    .slide1 {
        background: url('../../assets/images/1.jpg');
        
    }
    
    .slide2 {
        background: url('../../assets/images/2.jpg');
        
    }
    
    .slide3 {
        background: url('../../assets/images/3.jpg');
        
    }
</style>