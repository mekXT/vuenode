<template>
    <div style="padding-bottom: 50px;">
      <router-view></router-view>
      <div class="amap-wrapper">
        <el-amap class="amap-box" :events="events" :zoom="17" :center="center" :amap-manager="amapManager" :vid="'amap-vue'"></el-amap>
      </div>

      <div>{{cesData}}</div>

      <!--地址等信息-->
      <van-row>
        <van-col span="12"><van-icon name="location" style="color:#6e6ee8"></van-icon><span style="position:relative;top:-2px">{{currentCity}}</span></van-col>
        <van-col span="4" offset="4"><van-icon name="scan"></van-icon><button @click="cesButton()" style="position:relative;border:none;top:-2px">扫码</button></van-col>
        <van-col span="4"><van-icon name="umbrella-circle" /><span style="position:relative;top:-2px"> {{weather}}</span></van-col>
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
        <van-row>
          <swiper ref="mySwiper" :options="swiperOption" style="width:120px;">
            <swiper-slide>
                <van-grid :column-num="1" :border="false" style="width:90%;margin:0 auto;border:1px solid #f6f6f6">
                  <van-grid-item>
                    <img src="/static/images/wxjFood1.jpg" style="width:60%;">
                    <div style="font-size: 14px;">飞香烤鸭(火...</div>
                    <div style="font-size: 12px;color:#858585;line-height: 12px;"><img src="/static/images/dizhi2.png" style="width:12px;height:12px;">&nbsp;468m</div>
                    <div style="font-size: 12px">省配送费</div>
                  </van-grid-item>
                </van-grid>
            </swiper-slide>
            <swiper-slide>
              <van-grid :column-num="1" :border="false" style="width:90%;margin:0 auto;border:1px solid #f6f6f6">
                <van-grid-item>
                  <img src="/static/images/wxjFood1.jpg" style="width:60%;">
                  <div style="font-size: 14px;">飞香烤鸭(火...</div>
                  <div style="font-size: 12px;color:#858585;line-height: 12px;"><img src="/static/images/dizhi2.png" style="width:12px;height:12px;">&nbsp;468m</div>
                  <div style="font-size: 12px">省配送费</div>
                </van-grid-item>
              </van-grid>
            </swiper-slide>
            <swiper-slide>
              <van-grid :column-num="1" :border="false" style="width:90%;margin:0 auto;border:1px solid #f6f6f6">
                <van-grid-item>
                  <img src="/static/images/wxjFood1.jpg" style="width:60%;">
                  <div style="font-size: 14px;">飞香烤鸭(火...</div>
                  <div style="font-size: 12px;color:#858585;line-height: 12px;"><img src="/static/images/dizhi2.png" style="width:12px;height:12px;">&nbsp;468m</div>
                  <div style="font-size: 12px">省配送费</div>
                </van-grid-item>
              </van-grid>
            </swiper-slide>
            <swiper-slide>
              <van-grid :column-num="1" :border="false" style="width:90%;margin:0 auto;border:1px solid #f6f6f6">
                <van-grid-item>
                  <img src="/static/images/wxjFood1.jpg" style="width:60%;">
                  <div style="font-size: 14px;">飞香烤鸭(火...</div>
                  <div style="font-size: 12px;color:#858585;line-height: 12px;"><img src="/static/images/dizhi2.png" style="width:12px;height:12px;">&nbsp;468m</div>
                  <div style="font-size: 12px">省配送费</div>
                </van-grid-item>
              </van-grid>
            </swiper-slide>
            <swiper-slide>
              <van-grid :column-num="1" :border="false" style="width:90%;margin:0 auto;border:1px solid #f6f6f6">
                <van-grid-item>
                  <img src="/static/images/wxjFood1.jpg" style="width:60%;">
                  <div style="font-size: 14px;">飞香烤鸭(火...</div>
                  <div style="font-size: 12px;color:#858585;line-height: 12px;"><img src="/static/images/dizhi2.png" style="width:12px;height:12px;">&nbsp;468m</div>
                  <div style="font-size: 12px">省配送费</div>
                </van-grid-item>
              </van-grid>
            </swiper-slide>
            <swiper-slide>
              <van-grid :column-num="1" :border="false" style="width:90%;margin:0 auto;border:1px solid #f6f6f6">
                <van-grid-item>
                  <img src="/static/images/wxjFood1.jpg" style="width:60%;">
                  <div style="font-size: 14px;">飞香烤鸭(火...</div>
                  <div style="font-size: 12px;color:#858585;line-height: 12px;"><img src="/static/images/dizhi2.png" style="width:12px;height:12px;">&nbsp;468m</div>
                  <div style="font-size: 12px">省配送费</div>
                </van-grid-item>
              </van-grid>
            </swiper-slide>
          </swiper>

        </van-row>
      </van-row>

      <!--一个banner图链接-->
      <van-row style="margin-top: 15px;">
        <van-col span="24">
          <img src="/static/images/banner2.png" style="width:100%;height:auto;">
        </van-col>
      </van-row>

      <!--推荐商家列表-->
      <van-row style="margin-top: 15px;">
        <van-col span="24">
          <div style="width:100%;height:50px;line-height: 50px;font-size: 16px;font-weight:bold">推荐商家</div>
          <van-col span="24">
            <van-col>
              <van-dropdown-menu class="newDropDownList">
                <van-dropdown-item v-model="listValue" :options="listOption" ref="orderbyDropmenu" :change="changeOrderby()"></van-dropdown-item>
              </van-dropdown-menu>
            </van-col>
            <van-col offset="1" span="4" style="text-align: center">
              距离
            </van-col>
            <van-col span="4" style="text-align: center">
              销量
            </van-col>
          </van-col>

          <van-col span="24" style="margin-top: 10px;">
            <div class="tcenter tjGrid">津贴联盟</div>
            <div class="tcenter tjGrid" style="margin-left: 2%">会员领红包</div>
            <div class="tcenter tjGrid" style="margin-left: 2%">满减优惠</div>
            <div class="tcenter tjGrid" style="margin-left: 2%">配送费优惠</div>
          </van-col>

          <van-list
          v-model="loading"
          :finished="finished"
          finished-text="我也是有底线的哦"
          @load="onLoad">

            <!--<van-cell
              v-for="item in list"
              :key="item"
              :title="item"/>-->

            <van-cell class="listCell" v-for="item in list" :key="item.shopid">
              <img src="/static/images/wxjFood1.jpg" style="position:absolute;width:80px;height:auto">
              <div class="cellDesc">
                <div style="font-size: 18px;font-weight: bold">{{item.shopname}}</div>
                <div style="color:#ff6300;">
                  <van-icon name="star" color="#ff6300" style="position:relative;top:1px;"/>{{item.shoppingjia}}
                  <span style="color:#858484;padding-left: 5px;">月售{{item.shopsellnum}}</span>
                </div>
                <div>
                  <div style="float:left;color:#858484;">
                    起送¥{{item.shopminsellprice}} 配送¥{{item.shopcursellprice}} <span style="text-decoration:line-through;color:#b7b7b7">¥{{item.shopoldsellprice}}</span>
                  </div>
                  <div style="float:right;color:#858484;">
                    {{disTime(disJuli(currentLocation,item.position))}}分钟 {{disJuli(currentLocation,item.position)}}km
                  </div>
                  <div class="clearfix"></div>
                </div>
                <div class="desc_pingjia">“{{item.shopliuyan}}”</div>
                <div class="clearfix"></div>
                <div style="margin-top: 5px;">
                  <div class="desc_tag_manjian">23减9</div>
                  <div class="desc_tag_manjian">68减15</div>
                  <div class="desc_tag_hyhb">7.5元会员红包</div>
                  <div class="desc_tag_zczq">支持自取</div>
                </div>
              </div>
            </van-cell>

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

  import 'swiper/dist/css/swiper.css'
  import {swiper,swiperSlide} from 'vue-awesome-swiper'

  //导入两个地图有关组件 一个地图管理 一个手动加载地图 都是vuemap的 el-amap的
  import {AMapManager, lazyAMapApiLoaderInstance} from 'vue-amap'

  //引入高德地图jsapi
  import remoteLoad from '../assets/js/remoteload'

  //实例化这个管理工具
  let amapManager = new AMapManager();

    export default {
        data() {
          let self = this;
            return {
              //当前地址的adcode
              adCode:"",
              //测试的字段 只为在移动端可以看到调试结果
              cesData:"",
              //地图默认加载中心 该项目不显示地图 不重要
              center:[121.329402, 31.228667],
              //存放当前位置的名称
              currentCity:"",
              //存放当前位置的location
              currentLocation:[],
              //存放目标位置的location
              targetLocation:[],
              lng:0,
              lat:0,
              location:"",
              amapManager,

              events:{

                init(){

                  //这个高德jsapi默认加载到高德全局地图上 即window.AMap
                  remoteLoad('https://webapi.amap.com/maps?v=1.4.15&key=cb4466022305005c468140f150f4fe4b'),
                  remoteLoad('https://webapi.amap.com/ui/1.0/main.js')

                  console.log("开始实例化vueamap... ...")
                  //开始实例化地图
                  lazyAMapApiLoaderInstance.load().then(()=>{
                    //实例化加载地图定位工具
                    var geolocation = new AMap.Geolocation({
                      enableHighAccuracy: true, //是否使用高精度定位，默认:true
                      timeout: 10000, //超过10秒后停止定位，默认：无穷大
                      buttonOffset: new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
                      zoomToAccuracy: true, //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
                      buttonPosition: 'RB'
                    });

                    //获取这个amap
                    var thisMap = self.amapManager.getMap();

                    //给这个自定义的amap添加该定位工具
                    thisMap.addControl(geolocation);

                    //执行该定位工具的获取当前位置的方法 返回一个状态complete 一个定位结果 将执行结果根据状态执行不同方法
                    geolocation.getCurrentPosition(function(status,result){
                      if(status=='complete'){
                        self.onComplete(result)
                      }else{
                        self.onError(result)
                      }
                    });

                    self.AMap = window.AMap;

                    /*console.log(window.AMap)
                    console.log(window.AMap.GeometryUtil)
                    var p1 = [116.434027, 39.941037];
                    var p2 = [116.461665, 39.941564];
                    // 返回 p1 到 p2 间的地面距离，单位：米
                    var dis =window.AMap.GeometryUtil.distance(p1, p2);
                    console.log(dis);*/
                    //self.cesButton();

                  })
                }
              },
              weather:"",

              listValue:0,
              listOption:[
                {text:"默认排序",value:0},
                {text:"好评排序",value:1},
                {text:"销量排序",value:2}
              ],
              orderby:"",

              keyword:"",   //搜索的关键字
              //轮播图的4张图片
              images:[{url:"/static/images/banner.png",text:"1"},{url:"/static/images/banner.png",text:"2"},{url:"/static/images/banner.png",text:"3"},{url:"/static/images/banner.png",text:"4"}],
              //10个logo快速导航链接
              imagesLogo:[{url:"/static/images/meishi.png",text:"美食"},{url:"/static/images/maichang.png",text:"卖场便利"},{url:"/static/images/shuiguo.png",text:"水果"},{url:"/static/images/paotui.png",text:"跑腿代购"},{url:"/static/images/tianpin.png",text:"甜品"},{url:"/static/images/yaopin.png",text:"送药上门"},{url:"/static/images/jitui.png",text:"大牌惠吃"},{url:"/static/images/hanbao.png",text:"汉堡披萨"},{url:"/static/images/baozi.png",text:"包子粥店"},{url:"/static/images/shaokao.png",text:"烧烤海鲜"}],
              list: [],         //长列表的数据
              loading: false,   //滚动到底部更改loading状态为true 异步加载数据
              finished: false,   //没有数据了更改finished状态为true
              datalength:0,     //每次刷新长列表获取的条数
              maxDataLength:0,  //长列表最大的条数

              //swiper轮播的option
              swiperOption: {
                loop: false,
                slidesPerview:'auto',     //一屏根据slider的宽度显示多个slider
                freeMode : true,          //free模式 不贴合 一次不止一格
                freeModeMomentum : false, //关闭动量 释放立即停止 无惯性
              }
            }
        },
      created() {

      },
      components:{
          swiper,
        swiperSlide
      },
      methods:{
          //改变orderby排序字段
        changeOrderby(){
          console.log(this.$refs.orderbyDropmenu);
        },
        //测试button
        cesButton(){

        },
        //获取当前定位功能
        getCurPosition(curLocation){
          //向node后台提交http请求高德地图api 为了安全性
          var params = {
            opt:curLocation
          }
          this.$axios.post("/getCurPosition",params).then((result)=>{
            //console.log(result.data);
            //获取当前位置名称
            this.currentCity = result.data.regeocode.formatted_address;
            //获取当前位置location
            this.currentLocation = result.data.regeocode.addressComponent.streetNumber.location;
            /*start将当前位置location转为坐标*/
            var locationArray = [];
            locationArray.push(this.currentLocation.split(",")[0]);
            locationArray.push(this.currentLocation.split(",")[1]);
            this.currentLocation = locationArray;
            /*end将当前位置location转为坐标*/
            this.adCode = result.data.regeocode.addressComponent.adcode;

            this.getCurWeather(this.adCode)

          })
        },

        //获取天气功能
        getCurWeather(curAdCode){
          var params = {
            opt:curAdCode
          }
          this.$axios.post("/getCurWeather",params).then((result)=>{
            this.weather = result.data.lives[0].weather;
          })
        },

        //根据引入的高德js计算两点之间的实际距离
        disJuli(p1,p2){
          /*start将当前位置location转为坐标*/
          var locationArray = [];
          locationArray.push(p2.split(",")[0]);
          locationArray.push(p2.split(",")[1]);
          /*end将当前位置location转为坐标*/
          console.log(self.AMap)

          var dis =self.AMap.GeometryUtil.distance(p1,locationArray);
          return (dis/1000).toFixed(1);   //toFixed方法 四舍五入取x位小数
        },

        //计算两点之间的时间 默认每小时20km
        disTime(dis){
          return (dis/20*60).toFixed(1)   //toFixed方法 四舍五入取x位小数
        },

        //定位成功的方法 data里面有部分需要的数据 可以打印出来酌情使用
        onComplete(data){

          this.getCurPosition(data.position);

        },

        //定位失败执行的方法
        onError(data){
          console.log("失败："+data)
        },

        //搜索功能
        onSearch(){
          console.log("111");
        },
        //长列表数据加载
        onLoad() {
          // 异步更新数据
          this.datalength = this.datalength + 10;
          const params = {
            orderby:"",
            dataLength:this.datalength
          };
          //请求首页商家列表数据
          this.$axios.post("/getIndexListData",params).then((result)=>{
            console.log(result.data);
            this.list = result.data;
            // 加载状态结束
            this.loading = false;

            // 数据全部加载完成
            if (this.list.length >= this.maxDataLength) {
              this.finished = true;
            }

          })

        }
      },
      mounted() {
        this.$axios.post('/getTotalShop').then((result)=>{
          this.maxDataLength = result.data.resData;
        })
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

  .swiper-slide{
    width:120px !important;
    width:auto;
  }

  .swiper-container{
    width:100% !important;
  }

  .newDropDownList{
    height:24px;
  }

  [class*=van-hairline]::after{
    position:relative;
    left:0;
  }

  .van-ellipsis{
    font-size: 16px;
    color:#1989fa;
  }

  .tcenter{
    text-align: center;
  }

  .tjGrid{
    width:23%;
    float:left;
    font-size: 14px;
    height: 40px;
    line-height: 40px;
    background-color:#f3f3f3;
    border-radius: 5px;
  }

  .listCell{
    width: 100%;
    height:auto;
    padding:10px 0;
  }

  .cellDesc{
    box-sizing: border-box;
    width:100%;
    padding-left: 90px;
    float:right;
    font-size: 12px;
  }

  .clearfix {
    zoom: 1;
  }

  .clearfix:after {
    content: ".";
    width: 0;
    height: 0;
    visibility: hidden;
    display: block;
    clear: both;
    overflow:hidden;
  }

  .desc_pingjia{
    width:auto;
    float:left;
    background-color: #fff4eb;
    padding:2px 10px;
    border-radius: 5px;
    color:#FF6300
  }

  .desc_tag_manjian{
    border:solid 1px #f2826a;
    float:left;
    padding:0px 5px;
    border-radius: 5px;
    color:#ff644f;
    font-size: 12px;
    line-height: 18px;
    transform: scale(0.9);
    transform-origin:top center
  }

  .ml5{
    margin-left: 5px;
  }

  .desc_tag_hyhb{
    border:solid 1px #eee2d4;
    font-size: 12px;
    color:#c39260;
    float:left;
    padding:0px 5px;
    border-radius: 5px;
    line-height: 18px;
    transform: scale(0.9);
    transform-origin:top center
  }

  .desc_tag_zczq{
    border:solid 1px #eaeaea;
    font-size: 12px;
    color:#8d8d8d;
    float:left;
    padding:0px 5px;
    border-radius: 5px;
    line-height: 18px;
    transform: scale(0.9);
    transform-origin:top center
  }

  .amap-wrapper{
    width:0px;
    height:0px;
  }

  .cesbutton{
    border:none;
  }
</style>

<style scoped>
  .cesbutton{
    border:none;
  }
</style>
