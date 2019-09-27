<template>
  <div>
    <!--日历 之后可加功能 日期链接当天发的新闻-->
    <el-calendar v-model="value">
    </el-calendar>
    <!--一些基本信息 之后昵称跳转个人信息 浏览量动态获取 随笔数动态获取-->
    <el-container>
      <el-header style="height:20px;line-height: 20px;text-align: left;font-weight: bold">
        公告
      </el-header>
      <el-main style="padding-top:10px;">
        <div style="text-align: left;padding-left: 40px;">昵称：{{nickname}}</div>
        <div style="text-align: left;padding-left: 40px;margin-top: 10px">浏览量：{{viewCount}}</div>
        <div style="text-align: left;padding-left: 40px;margin-top: 10px">随笔数：{{articleCount}}</div>
      </el-main>
    </el-container>
    <!--随笔分类 之后动态获取列表-->
    <el-container>
      <el-header style="height:20px;line-height: 20px;text-align: left;font-weight: bold">
        随笔分类
      </el-header>
      <el-main style="padding-top:10px;">
        <ul>
          <li style="text-align: left;margin-top: 5px;">
            <router-link :to="{name:'articleList',params:{type:'game'}}">游戏</router-link>
          </li>
          <li style="text-align: left;margin-top: 5px;">
            <router-link :to="{name:'articleList',params:{type:'qianduan'}}">前端</router-link>
          </li>
          <li style="text-align: left;margin-top: 5px;">
            <router-link :to="{name:'articleList',params:{type:'houtai'}}">后台</router-link>
          </li>
          <li style="text-align: left;margin-top: 5px;">
            <router-link :to="{name:'articleList',params:{type:'other'}}">其他</router-link>
          </li>
        </ul>
      </el-main>
    </el-container>
    <!--搜索功能 之后完善-->
    <el-container>
      <el-header style="height:20px;line-height: 20px;text-align: left;font-weight: bold">
        搜索
      </el-header>
      <el-main style="padding-top:10px;">
        <form style="text-align: left">
          <el-input style="width:250px" placeholder="请输入搜索标题关键字" v-model="searchInput" clearable=""></el-input>
          <el-button icon="el-icon-search" circle @click="searchArticle"></el-button>
        </form>
      </el-main>
    </el-container>
  </div>
</template>
<script>


  export default {
    name: 'App',
    data() {
      return{
        //昵称
        nickname:"",
        //浏览量
        viewCount:"",
        //随笔数
        articleCount:"",
        value: new Date(),
        searchInput:'',
      }
    },
    beforeCreate() {
      this.$axios.post('/getPersonData').then((result)=>{
        this.nickname = result.data.nickname;
        this.viewCount = result.data.pageviews;
        this.articleCount = result.data.articleCount;
      })
    },
    methods:{
      searchArticle(){
        if(this.searchInput != "")
        {

          const params ={
            keyword:this.searchInput
          }

          this.$router.push({name:"searchList",params:params})

          /*this.$axios.post('/getSearchArticle',params).then((result)=>{
            console.log(result);
          })*/
        }
      }
    },
    watch:{
      '$route':function(to,from){
        alert(to);
        alert(from);
      }
    }
  }

</script>
