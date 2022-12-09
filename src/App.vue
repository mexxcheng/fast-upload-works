<template>
  <a-layout id="app">
    <UserHeader />
    <router-view></router-view>
    <a-spin id="spin" size="large" tip="Loading..." :spinning="!reqDone" :style="{display:reqDone?'none':'flex'}"/>
  </a-layout>
</template>

<script>
import { mapState } from 'vuex';
import UserHeader from '@/components/UserHeader';

export default {
  name: 'App',
  components: {
    UserHeader,
  },
  computed: {
    ...mapState(['reqDone']),
  },
  mounted(){
    console.log(this.$route);
    console.log(this.$store);
  }
}
</script>

<style lang="less">
#spin {
  position: absolute;
  left: 50%;
  top: 50%;
  bottom: 0;
  right: 0;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #fff;
  opacity: .5;
  width: 100%;
  height: 100%;
  cursor: pointer;
}
</style>
