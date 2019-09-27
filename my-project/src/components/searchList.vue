<template>
  <div>
    <el-container>

      <el-header>
        <xtheader></xtheader>
      </el-header>

      <el-main>
        <el-container>
          <el-main>
            <div class="lb_fr">
              <div class="lb_ul">
                <div class="lb_top">
                  <a href="\">
                    <img src="../assets/images/xq_map.png" alt="">
                    <span class="sp1">首页</span>
                  </a>
                  <span class="sp2">&gt;</span>
                  <a href="#2">
                    <span>搜索结果</span>
                  </a>
                </div>

                <ul v-show="this.ulShow > 0">
                  <li v-for="(item,index) in listData" v-if="index < 5" :key="item.id">
                    <router-link :to="{name:'articleShow',params:{id:item.id}}">
                      <img src="../assets/images/lb_yuan.png" alt="">
                      <span>【{{item.type}}】{{item.title}}</span>
                    </router-link>
                    <span class="sp2">{{item.date}}</span>
                    <div class="clear"></div>
                  </li>
                </ul>
                <ul v-show="this.ulShow > 1">
                  <li v-for="(item,index) in listData" v-if="index > 4 && index < 10" :key="item.id">
                    <router-link :to="{name:'articleShow',params:{id:item.id}}">
                      <img src="../assets/images/lb_yuan.png" alt="">
                      <span>【{{item.type}}】{{item.title}}</span>
                    </router-link>
                    <span class="sp2">{{item.date}}</span>
                    <div class="clear"></div>
                  </li>
                </ul>
                <ul v-show="this.ulShow > 2">
                  <li v-for="(item,index) in listData" v-if="index > 9 && index < 15" :key="item.id">
                    <router-link :to="{name:'articleShow',params:{id:item.id}}">
                      <img src="../assets/images/lb_yuan.png" alt="">
                      <span>【{{item.type}}】{{item.title}}</span>
                    </router-link>
                    <span class="sp2">{{item.date}}</span>
                    <div class="clear"></div>
                  </li>
                </ul>
                <ul v-show="this.ulShow > 3">
                  <li v-for="(item,index) in listData" v-if="index > 14 && index < 20" :key="item.id">
                    <router-link :to="{name:'articleShow',params:{id:item.id}}">
                      <img src="../assets/images/lb_yuan.png" alt="">
                      <span>【{{item.type}}】{{item.title}}</span>
                    </router-link>
                    <span class="sp2">{{item.date}}</span>
                    <div class="clear"></div>
                  </li>
                </ul>

                <div class="lb_page">
                  <div class="page_left">共 <span>{{this.totalPage}}</span> 页  当前第 <span>{{this.curPage}}</span> 页，每页显示 <span>20</span> 条</div>

                  <div class="page_r">
                    <el-button class="el-button--primary" size="small" @click="getListData('doIndex')">首页</el-button>
                    <el-button class="el-button--primary" size="small" @click="getListData('doPrev')">上一页</el-button>
                    <el-button class="el-button--primary" size="small" @click="getListData('doNext')">下一页</el-button>
                    <el-button class="el-button--primary" size="small" @click="getListData('doLast')">尾页</el-button>
                  </div>

                  <!--                    <div class="page_right"> 跳转到 <select class="page_zdy"><option id="p_1" value="http://xxgk.jxyf.gov.cn/news-list-zhengcejiedu-1.html" selected="selected">1</option><option id="p_2" value="http://xxgk.jxyf.gov.cn/news-list-zhengcejiedu-2.html">2</option></select> 页 </div>-->

                  <div class="clear"></div>
                </div>

              </div>

            </div>
          </el-main>
          <el-aside style="width:380px;padding-left: 20px;padding-right:10px;border-left:dashed 1px #ccc">
            <xtaside></xtaside>
          </el-aside>
        </el-container>
      </el-main>

      <el-footer style="text-align: center">
        <xtfooter></xtfooter>
      </el-footer>

    </el-container>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    beforeCreate(){
      //跳转到搜索页面之前将搜索的关键字存入store
      if(JSON.stringify(this.$route.params) != '{}')
      {
        this.$store.commit('setSearchKeyword',this.$route.params.keyword);
      }

      //跳转到搜索页面之前通过之前存入的keyword值获取搜索的新闻
      const params = {"keyword":this.$store.state.searchKeyword,"curPage":1};
      this.$axios.post("/getSearchArticle",params).then((result)=>{

        console.log(result)

        this.curPage = 1;
        this.totalPage = result.data.maxPage;

        this.listData = result.data.data;

        if(this.curPage < this.totalPage)
        {
          this.ulShow = 4;
        }
        else
        {
          this.ulShow = Math.ceil(result.data.data.length / 5);
        }

      })

    },
    data() {
      return {
        keyword:"",
        listData:[],
        ulShow:"",
        curPage:1,
        totalPage:1,
      }
    },
    methods:{
      saveState(){
        sessionStorage.setItem('state',JSON.stringify(this.$store.state))
      },
      getListData(doPage){
        var dopage = '';
        if(doPage == "doIndex")
        {
          dopage = 1;
        }
        else if(doPage == "doPrev")
        {
          if(this.curPage == 1)
          {
            dopage = -1;
          }
          else {
            dopage = this.curPage - 1;
          }
        }
        else if(doPage == "doNext")
        {
          if(this.curPage == this.totalPage)
          {
            dopage = -1;
          }
          else {
            dopage = this.curPage + 1;
          }
        }
        else if(doPage == "doLast")
        {
          dopage = this.totalPage
        }

        if(dopage != -1){
          this.curPage =dopage;
        }

        const params = {"keyword":this.$store.state.searchKeyword,"curPage":this.curPage};

        this.$axios.post("/getSearchArticle",params).then((result)=>{
          this.listData = result.data.data;

          if(this.curPage < this.totalPage)
          {
            this.ulShow = 4;
          }
          else
          {
            console.log(result.data.data.length);
            this.ulShow = Math.ceil(result.data.data.length / 5);
          }

        })

      }
    },
    mounted() {
      window.addEventListener('unload',this.saveState);
      this.keyword = this.$store.state.searchKeyword;
    }
  }
</script>

<style scoped>
  .lb_main{width: 1120px;height: auto;margin:auto;background-color: #fff;}
  .lb_top{font-size: 16px;width: 100%;height: 56px;line-height: 56px;color: #777;}
  .lb_top a{float: left;color: #777;font-size: 16px;}
  .lb_top a:hover{color: #00a4e3;}
  .lb_top .sp2{float: left;margin:0 9px;}
  .lb_top .sp1{float: left;margin-left: 10px;}
  .lb_top .sp3{color: #00a4e3;}
  .lb_top img{float: left;margin-top: 21px;}
  .lb_content{width: 100%;/* border:1px solid #dcdcdc; */margin:auto;padding-top: 20px;height: 100%;overflow: hidden;background: #fff;}
  .lb_fl{width: 300px;/* padding: 0 0px 0 20px; */float: left;border: 1px solid #dcdcdc;/* height: 854px; min-height:  854px;*/}
  .lb_fr{width: 889px;float: right;font-size: 16px;height: auto;/* position: absolute; */}
  .a_title{color: #fff;font-size: 18px;display: block;border-bottom: 1px solid #ddd;width: 300px;height: 57px;font-weight: bold;text-align: center;line-height: 57px;background: #00a4e3;/* border-bottom: 3px solid #dcdcdc; */margin-bottom: 4px;text-align: left;text-indent: 30px;}
  .a_title2{
    background: #fff;
    border-bottom: none;
    color:  #00a4e3;
    text-align: left;
    width:  100%;
    text-indent:  20px;
  }
  .lb_fl .zhinan{
    display: block;
    width: 296px;
    height: 50px;
    border-radius: 3px;
    background-color: #eee;
    line-height: 50px;
    font-size:18px;
    text-align: left;
    margin-bottom: 2px;
    border-left: 3px solid #eee;
    /* margin-left: 4px; */
    /* padding-left: 30px; */
    text-indent: 30px;
    /*background: #efefef url(../images/list_jt.png) 260px center no-repeat;*/
    overflow:hidden;
  }
  .lb_fl .zhinan:hover{background-color: #e5f6fc;color: #00a4e3;border-left: 3px solid #efefef ;border-radius: 0;}
  .lb_fr ul{border-bottom: 1px solid #eeeeee;padding-bottom: 10px;  }
  .lb_fr ul li{line-height: 35px;}
  .lb_fr ul li:hover a,.lb_fr ul li:hover span{color: #c00;}
  .lb_fr ul a,.lb_fr ul a span{float:left;color: #333;}
  .lb_fr ul img{float: left;margin-top:15px;margin-right: 10px;}
  .lb_fr ul .sp2{float:right;color: #999;}
  .lb_page{margin-top: 13px;height: 37px;line-height: 37px;font-size: 14px;}
  .lb_page .page_left{float: left;}
  .lb_page .page_right{float: right;}
  .lb_page .page_r{float: left;margin-left: 66px;}
  .lb_page .page_r a{display: block;float: left;font-size: 14px;color: #333;height: 35px;padding: 0 10px;line-height: 35px;border:1px solid #eee;border-right: none;}
  .lb_page .page_r a:hover{color: #fff;background: #00a4e3}
  .lb_page .page_r .wei{border-right:1px solid #eee;}
  .lb_page .page_left span{color: #e3393a;}
  .lb_page .page_right a{color: #333;}
  .lb_page .page_right input{width: 29px;height: 19px;border: 1px solid #eee;text-align: center;margin: 0 10px 0 9px;}
  .lb_page .page_right i{display: inline-block;width: 31px;height: 21px;background-color: #00a4e3;text-align: center;color: #fff;font-style:normal;line-height: 21px;cursor: pointer;}
  .lb_ul{/* border-left: 1px solid #dcdcdc; */padding-left: 13px;margin-bottom: 30px;padding-right: 20px;}
  .clear { clear:both;height:0;overflow:hidden;clear:both!important;}
  .clear.both {height:10px;}
</style>

<style>
  .el-calendar-table .el-calendar-day{
    height:auto !important;
  }
</style>
