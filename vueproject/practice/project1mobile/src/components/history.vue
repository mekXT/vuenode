<template>
    <div>

      <!--<iframe src="http://music.163.com/outchain/player?type=0&amp;id=124568687&amp;auto=1&amp;height=430" width="100%" height="450" frameborder="no" marginwidth="0" marginheight="0"></iframe>-->

      <div class="amap-wrapper">
        <el-amap class="amap-box" :events="events" :zoom="17" :center="center" :amap-manager="amapManager" :vid="'amap-vue'"></el-amap>
      </div>

      <iframe src="http://music.163.com/outchain/player?type=0&amp;id=124568687&amp;auto=0&amp;height=430" width="100%" height="450" frameborder="no" marginwidth="0" marginheight="0"></iframe>

      <div>
          {{msg}}
      </div>


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

  //import VueAMap from 'vue-amap'
  import {AMapManager, lazyAMapApiLoaderInstance} from 'vue-amap'

  let amapManager = new AMapManager();

    export default {
        data() {
            let self = this;
            return {
              center:[121.329402, 31.228667],
              msg:"",
              lng:0,
              lat:0,
              location:"",
              amapManager,
              events:{
                init(){
                  lazyAMapApiLoaderInstance.load().then(()=>{
                    var geolocation = new AMap.Geolocation({
                      enableHighAccuracy: true, //是否使用高精度定位，默认:true
                      timeout: 10000, //超过10秒后停止定位，默认：无穷大
                      buttonOffset: new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
                      zoomToAccuracy: true, //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
                      buttonPosition: 'RB'
                    });
                    var thisMap = self.amapManager.getMap();
                    thisMap.addControl(geolocation);
                    geolocation.getCurrentPosition(function(status,result){
                      if(status=='complete'){
                        self.onComplete(result)
                      }else{
                        self.onError(result)
                      }
                    });

                  })
                }
              },
            }
        },
      methods:{
        onComplete(data){
          var str = [];
          str.push('定位结果：' + data.position);
          str.push('定位类别：' + data.location_type);
          if(data.accuracy){
            str.push('精度：' + data.accuracy + ' 米');
          }//如为IP精确定位结果则没有精度信息
          str.push('是否经过偏移：' + (data.isConverted ? '是' : '否'));

          this.$axios.get("http://restapi.amap.com/v3/geocode/regeo?key=e118d72bfc138d171e18bed2ab3e7478&location="+data.position+"&poitype=&radius=100&extensions=base&batch=false&roadlevel=0").then((result)=>{
            console.log(result.data);
            this.msg = result.data.regeocode.formatted_address;
              //console.log(result.data.regeocode.formatted_address);

          })

        },
        onError(data){
          console.log(data)
        },
      },
      mounted() {

      }
    }
</script>

<style scoped>
  .amap-wrapper{
    width:300px;
    height:300px;
  }
</style>
