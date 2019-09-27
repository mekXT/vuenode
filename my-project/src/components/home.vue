<template>
    <div>
      <el-container>

        <el-header><xtheader></xtheader></el-header>

        <el-main>
          <el-container>

            <el-main>

              <div style="width:600px;position:relative;float: left;">
                <swiper :options="swiperOption" style="width:600px;height:300px;margin:0 auto;">
                  <swiper-slide v-for="item in lunboNews" :key="item.id">
                    <router-link :to="{name:'articleShow',params:{id:item.id}}">
                      <img :src="item.suoluetu" style="width:600px;height:300px;">
                    </router-link>
                  </swiper-slide>
                  <!--以下看需要添加-->
                </swiper>
                <div class="swiper-button-prev"></div>
                <div class="swiper-button-next"></div>
              </div>

              <div style="width:250px;float: right;">
                <div style="width:250px;height:60px;line-height: 30px;padding-top:10px;padding-bottom: 20px;">
                  最新消息
                </div>
                <ul>
                  <li style="text-align: left" v-for="item in newNews">
                        <router-link :to="{name:'articleShow',params:{id:item.id}}">
                          {{item.orderBy}}、{{item.title}}
                        </router-link>
                    <el-divider></el-divider>
                  </li>
                </ul>
              </div>
              <div class="clearfix"></div>

              <div style="margin-top: 30px;">
                <div style="font-size:20px;line-height: 30px;">
                  精选推荐
                </div>
                <ul>
                  <li class="clearfix" v-for="item in hotNews">
                    <div class="list_con" style="background-color: white">
                      <div class="title">
                        <h2 style="text-align: left">
                          <router-link :to="{name:'articleShow',params:{id:item.id}}">{{item.title}}</router-link>
                        </h2>
                      </div>
                      <div class="summary oneline" style="color:#8a8a8a;text-indent: 2em;text-align: left;padding:5px 0px">{{item.content}}</div>
                      <dl class="list_userbar">
                        <!--<dt style="float:left">
                          <a href="https://blog.csdn.net/qq_41268683" target="_blank" class="user_img">
                            <img src="https://profile.csdnimg.cn/5/D/3/1_qq_41268683" style="width:24px;height:24px;border-radius: 10px;">
                          </a>
                        </dt>
                        <dd class="name" style="float:left;line-height: 24px;padding-left: 10px;">
                          <a href="https://blog.csdn.net/qq_41268683?utm_source=feed" target="_blank">
                            qq_41268683                            </a>
                        </dd>
                        <div class="interval" style="width:1px;height:12px;margin-top:6px;border-right:solid 1px gray;float:left;padding-left:5px;margin-right: 5px;"></div>-->
                        <dd class="tag" style="float:left;line-height: 24px">
                          <router-link :to="{name:'articleShow',params:{id:item.id}}">{{item.author}}</router-link>
                        </dd>
                        <div class="interval" style="width:1px;height:12px;margin-top:6px;border-right:solid 1px gray;float:left;padding-left:5px;margin-right: 5px;"></div>
                        <dd class="time" style="float:left;line-height: 24px;color:#8a8a8a;">{{item.date}}</dd>
                        <div class="interactive floatR">
                          <!--阅读 begin-->
                          <dd class="read_num" style="float:right;line-height: 24px;padding-right: 20px;">
                              <router-link :to="{name:'articleShow',params:{id:item.id}}">
                                <span class="text">阅读数</span>
                                <span class="num">{{item.point}}</span>
                              </router-link>

                          </dd>
                          <!--阅读 end-->
                          <!--新增评论数+阅读 begin-->
                          <!--<dd class="common_num " style="float:right;line-height: 24px">
                            <a href="https://blog.csdn.net/qq_41268683/article/details/93270236#commentBox" target="_blank" data-track-click="{&quot;mod&quot;:&quot;popu_459&quot;,&quot;con&quot;:&quot;,https://blog.csdn.net/qq_41268683/article/details/93270236#commentBox,recommend,index_4&quot;}">
                              <span class="text">评论数 </span>
                              <span class="num">2</span>
                            </a>
                          </dd>-->
                          <div class="clearfix"></div>
                          <!--新增评论数+阅读 end-->
                        </div>
                      </dl>
                    </div>
                    <el-divider></el-divider>
                  </li>
                </ul>
              </div>

            </el-main>

            <!--右侧功能-->
            <el-aside style="width:380px;padding-left: 20px;padding-right:10px;border-left:dashed 1px #ccc">
              <!--日历 之后可加功能 日期链接当天发的新闻
              <el-calendar v-model="value">
              </el-calendar>
              &lt;!&ndash;一些基本信息 之后昵称跳转个人信息 浏览量动态获取 随笔数动态获取&ndash;&gt;
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
              &lt;!&ndash;随笔分类 之后动态获取列表&ndash;&gt;
              <el-container>
                <el-header style="height:20px;line-height: 20px;text-align: left;font-weight: bold">
                  随笔分类
                </el-header>
                <el-main style="padding-top:10px;">
                  <ul>
                    <li style="text-align: left;margin-top: 5px;"><a href="javascript:void(0)" style="color:#075db3">游戏</a></li>
                    <li style="text-align: left;margin-top: 5px;"><a href="javascript:void(0)" style="color:#075db3">前端</a></li>
                    <li style="text-align: left;margin-top: 5px;"><a href="javascript:void(0)" style="color:#075db3">后台</a></li>
                  </ul>
                </el-main>
              </el-container>
              &lt;!&ndash;搜索功能 之后完善&ndash;&gt;
              <el-container>
                <el-header style="height:20px;line-height: 20px;text-align: left;font-weight: bold">
                  搜索
                </el-header>
                <el-main style="padding-top:10px;">
                  <form style="text-align: left">
                    <el-input style="width:250px" placeholder="请输入搜索标题关键字" v-model="searchInput" clearable=""></el-input>
                    <el-button icon="el-icon-search" circle></el-button>
                  </form>
                </el-main>
              </el-container>-->
              <xtaside></xtaside>
            </el-aside>
          </el-container>
        </el-main>

        <el-footer style="text-align: center">
          <xtfooter></xtfooter>
        </el-footer>

      </el-container>
      <router-view></router-view>
    </div>
</template>
<script type="text/ecmascript-6">

  import 'swiper/dist/css/swiper.css'
  import {swiper,swiperSlide} from 'vue-awesome-swiper'

  export default {
    name: 'App',
    data() {
      return {
        navList:[
          {name:'/xthome',navItem:'首页'},
          {name:'/mysb',navItem:'我的随笔'},
          {name:'/grzl',navItem:'个人资料'},
        ],
        swiperOption:{
          autoplay:3000,
          speed:1000,
          observeParents:true,
          observer:true,
          prevButton:'.swiper-button-prev',
          nextButton:'.swiper-button-next',
        },
        newNews:[],
        hotNews:[],
        lunboNews:[]
      };
    },
    components:{
      swiper,
      swiperSlide,
    },
    methods:{
      //最新消息
      getNews(){
        this.$axios.post('/showQTNewNewsData').then((result)=>{
          this.newNews = result.data;
        })
      },
      //精选推荐
      getHotNews(){
        this.$axios.post('/showQTHotNewsData').then((result)=>{
          this.hotNews = result.data;
        })
      },
      //轮播数据
      getLunboNews(){
        this.$axios.post('/showLunboNewsData').then((result)=>{
          this.lunboNews = result.data;
        })
      }
    },
    mounted() {
      this.getNews();
      this.getHotNews();
      this.getLunboNews();
    }
  }
</script>

<style>

  .clearfix:after{
    content:".";
    display:block;
    clear:both;
    font-size: 0;
    height:0;
    overflow: hidden;
  }

  .clearfix{
    zoom:1;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  .navlist1{
    margin-left: 50px !important;
  }

  .el-calendar-table .el-calendar-day{
    height:auto !important;
  }
</style>
