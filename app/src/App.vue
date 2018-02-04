<template>
  <div id="app">
    <top></top>
    <div class="content">
      <router-view/>
    </div>
    <buttom></buttom>
  </div>
</template>

<script>
import rem from '@/assets/js/rem';
import reset from '@/assets/css/reset.css';
import top from '@/components/common/Top';
import buttom from '@/components/common/Buttom';
import store from '@/vuex/store'
export default {
  name: 'App',
  components:{
    top,
    buttom
  },
  store
}
</script>

<style>
   .content{
    margin: 1rem 0;
  }
</style>
