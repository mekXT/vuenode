<template>
    <div>
      <el-container>

        <el-header><xtheader></xtheader></el-header>

        <el-main>

          <div class="xxq_content">
            <div class="lb_top" style="font-size: 16px;height:40px;line-height: 40px;border-bottom: dashed 1px darkgrey">
              <!--导航-->
              <a href="xthome" style="font-size: 16px;">首页</a>  >  {{this.title}}
            </div>
            <div class="xxq_title">
              <p class="a1">{{this.title}}</p>
              <p class="a1" style="margin-top: 5px;"></p>

              <p class="a2"></p>
              <div class="xxq_shijian" style="width:fit-content;">
                <div>
                  <span>发布时间：</span>
                  <span>{{this.date}}</span>
                </div>
                <div style="margin-right: 20px;">
                  <span>作者：</span>
                  <span>{{this.author}}</span>
                </div>
                <div style="margin-right: 0px;">
                  <span>点击数：</span>
                  <span>{{this.point}}</span>
                </div>
                <div class="clear"></div>
              </div>
            </div>
            <div class="xxq_essay">
              <div style="min-height:270px;">
                {{this.content}}
              </div>

            </div>
          </div>

        </el-main>

        <el-footer style="text-align: center">
          <xtfooter></xtfooter>
        </el-footer>

      </el-container>
      <router-view></router-view>
    </div>
</template>
<script type="text/ecmascript-6">

  import store from "../store/store"

    export default {
      beforeCreate(){
        //跳转到show页面之前将id值存入store
        if(JSON.stringify(this.$route.params) != '{}')
        {
          this.$store.commit('setShowArticleId',this.$route.params.id)
        }

        //跳转到show页面之前通过之前存入的id值获取该新闻的点击数
        const params = {"id":this.$store.state.showArticleId};
        this.$axios.post("/setArticlePoint",params).then((result)=>{
          this.point = result.data;
        })

      },
        data() {
            return {
              id:"",
              title:"测试标题",
              date:"测试时间",
              author:"测试作者",
              content:"测试内容",
              point:""
            }
        },
      methods:{
        getNews(){
          var params = {"id":this.$store.state.showArticleId};
          console.log(this.$store);
        this.$axios.post("/getArticle",params).then((result)=>{
            this.title = result.data.title;
            this.date = result.data.date;
            this.author = result.data.author;
            this.content = result.data.content;
        })
        },
        saveState(){
          sessionStorage.setItem('state',JSON.stringify(this.$store.state))
        }
      },
        mounted() {
          window.addEventListener('unload',this.saveState);
          this.getNews();
        }
    }
</script>

<style scoped>

  .xxq_content{padding: 0 40px;border:  1px solid #dcdcdc;margin-top:  20px;background-color: #fff;}
  .xxq_title{margin-bottom: 20px;}
  .xxq_title .a1{display: block;margin-top: 55px;font-size: 30px;color: #00a4e3;text-align: center;}
  .xxq_title .a2{    text-align: center;
    font-size: 22px;
    color: #333;
    margin-top: 10px;}

  .xxq_shijian{padding:20px;color: #777;text-align:  center;width: 350px;margin:  0 auto;overflow:  hidden;}
  .xxq_shijian a{color: #777;}
  .xxq_shijian img{float: left;}
  .xxq_shijian div{float: left;margin-right: 20px;}
  .xxq_shijian span span:hover{cursor:pointer;color: #c00; }
  .xxq_title .fl{float: left;}
  .xxq_title .fr{float: right;}
  .xxq_title .fr .spn{margin-left: 10px;cursor: pointer;}
  .xxq_title .fr .spn:hover,.xxq_title a:hover{color:#c00;}
  .xxq_essay{font-size: 16px;color: #333;line-height: 32px;letter-spacing: 2px;}
  .xxq_essay{padding-bottom:20px;/* border-bottom: 1px solid #ddd; */min-height:  500px;}
  .xxq_prev{padding-top: 70px;padding-bottom: 20px;width: 100%; height: 70px;}
  .xxq_prev .pre{color: #333;font-size: 16px;line-height: 35px;}
  .xxq_bottom_ly{
    color: #777777;
    height: 50px;
    line-height: 50px;
    background: #f6f6f6;
    padding: 0 20px;
    margin-bottom:  20px;
    font-size: 12px;
  }
  .xxq_bottom_ly a{
    color: #777777;
  }
  .xxq_bottom_ly a:hover{
    color: #00a4e3;
  }

  .xxq_bottom_ly .fr span:hover{
    color: #00a4e3;
    cursor: pointer;
  }
  .TRS_Editor{
    min-height: 320px;

  }

</style>
