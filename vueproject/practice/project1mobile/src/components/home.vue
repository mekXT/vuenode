<template>
    <div>
      <router-view></router-view>

      <van-row>
        <van-col span="12"><van-icon name="location" style="color:#6e6ee8"></van-icon><span style="position:relative;top:-2px">当前地址</span></van-col>
        <van-col span="4" offset="4"><van-icon name="scan"></van-icon><span style="position:relative;top:-2px">扫码</span></van-col>
        <van-col span="4"><van-icon name="umbrella-circle" /><span style="position:relative;top:-2px">天气</span></van-col>
      </van-row>

      <van-row style="margin-top: 15px;">
        <van-col span="24">
          <van-search
            v-model="keyword"
            placeholder="请输入搜索关键词"
            show-action
            shape="round"
            @search="onSearch"
          >
            <div slot="action" @click="onSearch">搜索</div>
          </van-search>
        </van-col>
      </van-row>

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
            return {
              keyword:""
            }
        },
      methods:{
        onSearch(){
          console.log("111");
        }
      }
    }
</script>

<style>
  .van-col{
    text-align: left;
  }
</style>
