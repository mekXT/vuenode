<template>
    <div style="padding-bottom: 50px;">
      <router-view></router-view>

      <!--地址等信息-->
      <van-row>
        <van-col span="12"><van-icon name="location" style="color:#6e6ee8"></van-icon><span style="position:relative;top:-2px">当前地址</span></van-col>
        <van-col span="4" offset="4"><van-icon name="scan"></van-icon><span style="position:relative;top:-2px">扫码</span></van-col>
        <van-col span="4"><van-icon name="umbrella-circle" /><span style="position:relative;top:-2px">天气</span></van-col>
      </van-row>

      <!--搜索框-->
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

      <!--轮播图-->
      <van-row style="margin-top:15px;">
        <van-col span="24">

          <van-swipe :autoplay="3000">
            <van-swipe-item v-for="(image, index) in images" :key="index">
              <img :src="image.url" style="width:100%;height:80px;"/>
            </van-swipe-item>
          </van-swipe>

        </van-col>
      </van-row>

      <!--小图标导航-->
      <van-row style="margin-top: 15px;">
        <van-col span="24">
          <van-grid :gutter="10" :column-num="5" :border="false">
            <van-grid-item v-for="(image, index) in imagesLogo" :key="index">
              <van-image :src="image.url" style="width:36px;height:auto"></van-image>
              <span style="font-size: 12px;">{{image.text}}</span>
            </van-grid-item>
          </van-grid>
        </van-col>
      </van-row>

      <!--两个快捷导航-->
      <van-row style="margin-top: 15px;">
        <van-col style="background-color: #fbeed2;height:50px;position:relative;width:49%;float:left">
          <div style="color:#823b0f;font-weight: bold;padding-top: 5px;padding-left: 10px;">超级会员</div>
          <div style="color:#ac6756;font-size: 12px;float:left;padding-left: 10px;"><span style="color:red">4</span>个奖励金可用</div>
          <img src="/static/images/huangguan.png" style="width:24px;height:auto;position:absolute;right:5px;bottom:5px">
        </van-col>
        <van-col style="background-color: #ffe7e7;height:50px;position:relative;width:49%;float:right">
          <div style="color:#823b0f;font-weight: bold;padding-top: 5px;padding-left: 10px;">津贴联盟</div>
          <div style="color:#ac6756;font-size: 12px;float:left;padding-left: 10px;"><span style="color:red">20元</span>专属补贴</div>
          <img src="/static/images/jintie.png" style="width:24px;height:auto;position:absolute;right:5px;bottom:5px">
        </van-col>
      </van-row>

      <!--优惠专区-->
      <van-row style="margin-top: 15px;">
        <div>
          <div style="float:left;font-size: 16px;line-height: 22px;font-weight: bold">优惠专区</div>
          <div style="float:right;font-size: 12px;line-height: 22px;color:#858585">更多好店 ></div>
          <div class="van-clearfix"></div>
        </div>
        <van-col style="width:49%;float:left;margin-top: 10px;position:relative">
          <img src="/static/images/rourou.jpg" style="width:100%;height:auto">
          <img src="/static/images/xsms.png" style="width:100px;height:auto;position:absolute;top:0;left:50%;margin-left: -50px;">
          <div style="width:160px;height:40px;position:absolute;left:50%;margin-left:-80px;bottom:15px;background-color: white;opacity: 0.9;border-radius: 5px;">
            <div style="font-weight: bold;font-size: 14px;text-align: center;margin-top: 1px;">下午餐9.9起</div>
            <div style="font-size: 12px;color:red;text-align: center">14点场</div>
          </div>
        </van-col>
        <van-col style="width:49%;float:right;margin-top: 10px;position:relative">
          <img src="/static/images/longxia.jpg" style="width:100%;height:auto">
          <img src="/static/images/gqfj.png" style="width:100px;height:auto;position:absolute;top:0;left:50%;margin-left:-50px;">
          <div style="width:160px;height:40px;position:absolute;left:50%;margin-left:-80px;bottom:15px;background-color: white;opacity: 0.9;border-radius: 5px;">
            <div style="font-weight: bold;font-size: 14px;text-align: center;margin-top: 1px;">3重优惠宠你</div>
            <div style="font-size: 12px;color:#6e6e6e;text-align: center">尽享一城一味</div>
          </div>
        </van-col>

        <div class="van-clearfix"></div>

        <van-col style="width:49%;float:left;margin-top: 10px;position:relative">
          <van-col style="width:49%;float:left;position:relative">
            <img src="/static/images/zyth.png" style="width:100%;height:auto;">
            <div style="width:100%;position:absolute;top:10px">
              <div style="font-size:16px;font-weight: bold;text-align: center">低至5元</div>
              <div style="font-size: 12px;color:#979a95;margin-top: 5px;text-align: center">周一特惠日</div>
            </div>
          </van-col>
          <van-col style="width:49%;float:right;position:relative">
            <img src="/static/images/dptp.png" style="width:100%;height:auto;">
            <div style="width:100%;position:absolute;top:10px">
              <div style="font-size:16px;font-weight: bold;text-align: center">大牌甜品</div>
              <div style="font-size: 12px;color:#979a95;margin-top: 5px;text-align: center">配送0元起</div>
            </div>
          </van-col>
          <div class="van-clearfix"></div>
        </van-col>
        <van-col style="width:49%;float:right;margin-top: 10px;position:relative">
          <van-col style="width:49%;float:left;position:relative">
            <img src="/static/images/zhy.png" style="width:100%;height:auto;">
            <div style="width:100%;position:absolute;top:10px">
              <div style="font-size:16px;font-weight: bold;text-align: center">周黑鸭</div>
              <div style="font-size: 12px;color:#979a95;margin-top: 5px;text-align: center">满69立减30</div>
            </div>
          </van-col>
          <van-col style="width:49%;float:right;position:relative">
            <img src="/static/images/djsg.png" style="width:100%;height:auto;">
            <div style="width:100%;position:absolute;top:10px">
              <div style="font-size:16px;font-weight: bold;text-align: center">当季水果</div>
              <div style="font-size: 12px;color:#979a95;margin-top: 5px;text-align: center">低至9.9</div>
            </div>
          </van-col>
          <div class="van-clearfix"></div>
        </van-col>
        <div class="van-clearfix"></div>

      </van-row>

      <!--专属·午后时光-->
      <van-row style="margin-top: 15px;">
        <van-row>
          <div style="font-weight: bold;float:left;font-size: 16px;line-height: 22px;">专属·午后时光</div>
          <div style="float:right;font-size: 12px;line-height: 22px;color:#858585">更多好店 ></div>
          <div class="van-clearfix"></div>
        </van-row>
        <div style="width:49%;float:left;position:relative;margin-top: 5px;">
          <img src="/static/images/wxjFood1.jpg" style="width:100%;height:auto;border-radius: 6px;">
          <div style="width:100%;height:60px;position:absolute;border-radius: 6px;left:0;bottom:0;background-color:white;opacity: 0.8">
            <img src="/static/images/wxjLogo.jpg" style="width:40px;height:40px;position:absolute;border-radius: 6px;left:5%;top:-30px;">
            <div style="width:90%;margin:0 auto;font-size: 14px;font-weight: bold;text-align: left;margin-top: 10px;">王小姐的茶(新城吾悦店)</div>
            <div style="width:90%;margin:0 auto;color:#fe7100;font-size: 12px;text-align: left;margin-top: 2px;">根据你下单过的店推荐</div>
          </div>
        </div>
        <div style="width:49%;float:right;position:relative;margin-top: 5px;">
          <img src="/static/images/wxjFood1.jpg" style="width:100%;height:auto;border-radius: 6px;">
          <div style="width:100%;height:60px;position:absolute;border-radius: 6px;left:0;bottom:0;background-color:white;opacity: 0.8">
            <img src="/static/images/wxjLogo.jpg" style="width:40px;height:40px;position:absolute;border-radius: 6px;left:5%;top:-30px;">
            <div style="width:90%;margin:0 auto;font-size: 14px;font-weight: bold;text-align: left;margin-top: 10px;">王小姐的茶(新城吾悦店)</div>
            <div style="width:90%;margin:0 auto;color:#fe7100;font-size: 12px;text-align: left;margin-top: 2px;">根据你下单过的店推荐</div>
          </div>
        </div>
        <div class="van-clearfix"></div>
        <div style="width:49%;float:left;position:relative;margin-top: 5px;">
          <img src="/static/images/krFood.jpg" style="width:100%;height:auto;border-radius: 6px;">
          <div style="width:90%;height:60px;position:absolute;left:5%;bottom:10px;background-color:white;opacity: 0.9;padding:5px 0">
            <img src="/static/images/top20.png" style="width:60px;height:auto;position:absolute;left:10px;top:-10px;">
            <div style="text-align: left;font-weight: bold;margin-left: 10px;margin-top: 10px;">重口味</div>
            <div style="text-align: left;font-size: 12px;color:#858585;margin-left: 10px;">3.0万人购买</div>
            <img src="/static/images/krFood.jpg" style="width:60px;height:60px;border-radius: 5px;position:absolute;right:5px;top:5px;">
          </div>
        </div>
        <div style="width:49%;float:right;position:relative;margin-top: 5px;">
          <img src="/static/images/krFood.jpg" style="width:100%;height:auto;border-radius: 6px;">
          <div style="width:90%;height:60px;position:absolute;left:5%;bottom:10px;background-color:white;opacity: 0.9;padding:5px 0">
            <img src="/static/images/top20.png" style="width:60px;height:auto;position:absolute;left:10px;top:-10px;">
            <div style="text-align: left;font-weight: bold;margin-left: 10px;margin-top: 10px;">最火爆</div>
            <div style="text-align: left;font-size: 12px;color:#858585;margin-left: 10px;">10.9万人购买</div>
            <img src="/static/images/krFood.jpg" style="width:60px;height:60px;border-radius: 5px;position:absolute;right:5px;top:5px;">
          </div>
        </div>
        <div class="van-clearfix"></div>
      </van-row>

      <!--到店自取-->
      <van-row style="margin-top: 15px;">
        <van-row>
          <div style="font-weight: bold;float:left;font-size: 16px;line-height: 22px;">到店自取</div>
          <div style="float:right;font-size: 12px;color:#858585;line-height: 22px;">共55家 ></div>
        </van-row>
      </van-row>

      <!--一个banner图链接-->
      <van-row style="margin-top: 15px;">
        <van-col span="24">
          <img src="/static/images/banner2.png" style="width:100%;height:auto;">
        </van-col>
      </van-row>

      <!--精选商家列表-->
      <van-row style="margin-top: 15px;">
        <van-col span="24">
          <div style="width:100%;height:50px;line-height: 50px;font-size: 14px">精选商家</div>
          <van-list
          v-model="loading"
          :finished="finished"
          finished-text="我也是有底线的哦"
          @load="onLoad">
            <van-cell
            v-for="item in list"
            :key="item"
            :title="item"/>
          </van-list>
        </van-col>
      </van-row>

      <!--底部导航-->
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
        icon="orders-o"
      >
        历史
      </van-tabbar-item>
      <van-tabbar-item
        replace
        to="/mine"
        icon="contact"
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
              keyword:"",   //搜索的关键字
              //轮播图的4张图片
              images:[{url:"/static/images/banner.png",text:"1"},{url:"/static/images/banner.png",text:"2"},{url:"/static/images/banner.png",text:"3"},{url:"/static/images/banner.png",text:"4"}],
              //10个logo快速导航链接
              imagesLogo:[{url:"/static/images/meishi.png",text:"美食"},{url:"/static/images/maichang.png",text:"卖场便利"},{url:"/static/images/shuiguo.png",text:"水果"},{url:"/static/images/paotui.png",text:"跑腿代购"},{url:"/static/images/tianpin.png",text:"甜品"},{url:"/static/images/yaopin.png",text:"送药上门"},{url:"/static/images/jitui.png",text:"大牌惠吃"},{url:"/static/images/hanbao.png",text:"汉堡披萨"},{url:"/static/images/baozi.png",text:"包子粥店"},{url:"/static/images/shaokao.png",text:"烧烤海鲜"}],
              list: [],         //长列表的数据
              loading: false,   //滚动到底部更改loading状态为true 异步加载数据
              finished: false   //没有数据了更改finished状态为true
            }
        },
      methods:{
          //搜索功能
        onSearch(){
          console.log("111");
        },
        //长列表数据加载
        onLoad() {
          // 异步更新数据
          setTimeout(() => {
            for (let i = 0; i < 10; i++) {
              this.list.push(this.list.length + 1);
            }
            // 加载状态结束
            this.loading = false;

            // 数据全部加载完成
            if (this.list.length >= 40) {
              this.finished = true;
            }
          }, 500);
        }
      }
    }
</script>

<style>
  .van-col{
    text-align: left;
  }

  .van-grid-item__content{
    width:fit-content;
    height:fit-content;
    padding: 4px 4px;
    margin:0 auto;
  }
</style>
