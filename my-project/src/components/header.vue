<template>


        <!--导航-->
        <el-menu
          :default-active="$route.path"
          class="el-menu-demo"
          mode="horizontal"
          router
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-menu-item v-for="(item,i) in navList" :class="i == 0 ? 'navlist1' : ''" :key="i" :index="item.name">
            {{item.navItem}}
          </el-menu-item>
        </el-menu>


</template>
<script>

  export default {
    name: 'App',
    data() {
      return{
        navList:[
          {name:'/xthome',navItem:'首页'},
          {name:'/mysb',navItem:'我的随笔'},
          {name:'/grzl',navItem:'个人资料'},
        ],
      }
    }
  }

</script>

