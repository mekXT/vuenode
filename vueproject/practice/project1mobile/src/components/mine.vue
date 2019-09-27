<template>
    <div>
      <router-view></router-view>

      <van-tabbar route>
        <van-tabbar-item
          replace
          to="/"
          icon="home-o"
        >
          首页
        </van-tabbar-item>
        <van-tabbar-item
          replace
          to="/history"
          icon="home-o"
        >
          历史
        </van-tabbar-item>
        <van-tabbar-item
          replace
          to="/mine"
          icon="search"
        >
          我的
        </van-tabbar-item>
      </van-tabbar>
    </div>
</template>
<script type="text/ecmascript-6">
    export default {
        data() {
            return {}
        }
    }
</script>
