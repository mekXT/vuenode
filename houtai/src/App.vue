<template>
  <div id="app" ref="nav">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      winHeight: window.innerHeight
    }
  },
  mounted() {
    //挂载浏览器高度获取方法 
    const that =this 
    window.onresize = () => {
      return (() => {
        that.winHeight = window.innerHeight   
      })()
    }
    this.$refs.nav.style.height=this.winHeight+'px'
  },
  watch:{
    //监控浏览器高度变化
    winHeight(val){
      this.winHeight=val
      this.$refs.nav.style.height = this.winHeight + 'px'
    }
  }
}
</script>

<style scoped>
#app {
  background: url("./assets/images/loginBG.jpg") no-repeat;
  background-size: 100% 100%;
  height: 100%;
  width:100%;
}
</style>
