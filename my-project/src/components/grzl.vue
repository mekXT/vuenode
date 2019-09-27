<template>
    <div>
      <el-container>

        <el-header><xtheader></xtheader></el-header>

        <el-main>
          <el-container>
            <el-main>
              <!--所有分类随笔的分类统计-->
              <div id="echartContainer1" style="width:45%;height:400px;float:left"></div>
              <!--所有分类随笔的分类统计饼图-->
              <div id="echartContainer2" style="width:45%;height:400px;float:right"></div>
              <!--所有分类随笔的分类统计雷达图-->
              <div id="echartContainer3" style="width:45%;height:400px;float:left;margin-top: 25px;"></div>
              <!--分时刻的访问量动态统计更新-->
              <div id="echartContainer4" style="width:45%;height:400px;float:right;margin-top: 25px;"></div>
            </el-main>
          </el-container>
        </el-main>

        <el-footer style="text-align: center"><xtfooter></xtfooter></el-footer>

      </el-container>
      <router-view></router-view>
    </div>
</template>
<script type="text/ecmascript-6">

    export default {
        created(){

/*          var mychart4 = this.$echarts.init(document.getElementById("echartContainer4"));

          this.echart4 = mychart4;*/

          setInterval(()=>{
            this.getVisitCount();
          },1800000)
        },
        data() {
            return {
              echartData1:[], //柱图、折线图数据
              echartData2:[], //饼图数据
              echartData3:[], //雷达图数据
              xAxisData:[],
              echartData4Date:[],//动态更新的横轴时间
              echartData4Data:[],//动态更新的数据
            }
        },
      methods:{
          getEchartData(){
            var params = {params:["game","houtai","other","qiantai"]};
            this.xAxisData = params.params;
            //请求数据
            this.$axios.post('/getEchartData',params).then((result)=>{
              var newEchartData1 = [];
              for(var i=0;i<result.data.length;i++){
                newEchartData1.push(result.data[i][0].count);
              }
              //绑定echart1数据
              this.echartData1 = newEchartData1;
              //实例化这个echart1
              var mychart1 = this.$echarts.init(document.getElementById("echartContainer1"));
              mychart1.setOption({
                title:{text:"随笔数统计"},
                tooltip:{},
                xAxis:{
                  data:this.xAxisData
                },
                yAxis:{

                },
                series:[{
                  name:'条数',
                  type:'line',
                  data:this.echartData1
                }],
                toolbox:{
                  show:true,
                  feature: {
                    dataZoom: {
                      yAxisIndex: 'none'
                    },
                    dataView: {readOnly: false},
                    magicType: {type: ['line', 'bar','stack', 'tiled']},
                    restore: {},
                    saveAsImage: {}
                  }
                }
              })

              //绑定echart2数据
              var newEchartData2 = [];
              for(var i=0;i<newEchartData1.length;i++)
              {
                newEchartData2.push({value:newEchartData1[i],name:params.params[i]})
              }
              this.echartData2 = newEchartData2;
              //实例化这个echart2
              var mychart2 = this.$echarts.init(document.getElementById("echartContainer2"));
              mychart2.setOption({
                //设置图标的背景色
                backgroundColor:"#2c343c",
                //标题设置
                title:{
                  text:"随笔文章数分类统计饼图",
                  //left横向位置
                  left:"center",
                  //top纵向位置
                  top:20,
                  //标题样式
                  textStyle:{
                    color:'#ccc'
                  }
                },
                //提示框
                tooltip:{
                  //饼图的触发方式
                  trigger:'item',
                  //提示框里面的格式化数据方式
                  //饼图、仪表盘、漏斗图: {a}（系列名称），{b}（数据项名称），{c}（数值）, {d}（百分比）
                  formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                //视觉映射组件 该例子个人理解为从0-600的数据的显示颜色渐变
                visualMap: {
                  show: true,  //显示该visualMap组件 如果为false不显示组件 但是功能渐变还在
                  min: 0,       //必须指定
                  max: 500,   //必须指定
                  inRange: {
                    color:['#ff95b3','#45ff39'],

                  }
                },
                //数据系列
                series:[
                  {
                    name:'随笔分类',
                    type:'pie',
                    radius:'55%',
                    center:['50%','50%'],
                    //绑定数据并且给数据从小到大排序
                    data:this.echartData2.sort(function(a,b){
                      return a.value - b.value;
                    }),
                    roseType:'radius',
                    //饼图上的文本标签
                    label:{
                      normal:{
                        textStyle:{
                          color: 'rgba(255, 255, 255, 0.3)'
                        }
                      }
                    },
                    //视觉引导线
                    labelLine: {
                      normal: {
                        lineStyle: {
                          color: 'rgba(255, 255, 255, 0.3)'
                        },
                        smooth: 0.2,
                        length: 10,
                        length2: 20
                      }
                    },
                    //图形样式
                    itemStyle: {
                      normal: {
                        color: '#c23531',
                        //两个shadow设置图形阴影效果
                        shadowBlur: 200,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                      }
                    },
                    //生成饼图时候的动画效果
                    animationType: 'scale',
                    animationEasing: 'elasticOut',
                    animationDelay: function (idx) {
                      return Math.random() * 200;
                    }
                  }
                ]
              })

              //绑定echart3数据
              var newEchartData3 = [];
              newEchartData3.push({value:[]});
              for(var i=0;i<newEchartData1.length;i++){
                newEchartData3[0].value.push(newEchartData1[i])
              }
              this.echartData3 = newEchartData3;
              //实例化这个echart3
              var mychart3 = this.$echarts.init(document.getElementById("echartContainer3"));
              mychart3.setOption({
                backgroundColor: '#161627',
                title: {
                  text: '随笔文章数分类统计雷达图',
                  left: 'center',
                  textStyle: {
                    color: '#eee'
                  }
                },
                //图例
                legend:{
                  //图例位置 距离底部的位置
                  bottom:5,
                  data:['随笔分类'],
                  //图例之间的间隔距离
                  itemGap:20,
                  textStyle:{
                    color: '#fff',
                    fontSize: 14
                  },
                  selectedMode: 'single'
                },
                //雷达图坐标系组件 使用雷达图的话这个必须配置
                radar: {
                  indicator: [
                    //每个方向的title以及最大值
                    {name: params.params[0], max: 20},
                    {name: params.params[1], max: 20},
                    {name: params.params[2], max: 20},
                    {name: params.params[3], max: 20},
                  ],
                  shape: 'circle',
                  //指示器的分割段数
                  splitNumber: 5,
                  //每个指示器的样式
                  name: {
                    textStyle: {
                      color: 'rgb(238, 197, 102)'
                    }
                  },
                  //坐标轴在grid中的分隔线
                  splitLine: {
                    lineStyle: {
                      color: [
                        'rgba(238, 197, 102, 0.1)', 'rgba(238, 197, 102, 0.2)',
                        'rgba(238, 197, 102, 0.4)', 'rgba(238, 197, 102, 0.6)',
                        'rgba(238, 197, 102, 0.8)', 'rgba(238, 197, 102, 1)'
                      ].reverse()
                    }
                  },
                  //坐标轴在 grid 区域中的分隔区域，默认不显示。
                  splitArea: {
                    show: false
                  },
                  //坐标轴轴线相关设置
                  axisLine: {
                    lineStyle: {
                      color: 'rgba(238, 197, 102, 0.5)'
                    }
                  },

                },
                series:[
                  {
                    name:'随笔分类',
                    type:'radar',
                    //线条样式
                    lineStyle:'lineStyle',
                    data : this.echartData3,
                    //data:this.echartData3,
                    //标记的图形。
                    symbol:'none',
                    //折线拐点标志的样式
                    itemStyle: {
                      normal: {
                        color: '#F9713C'
                      }
                    },
                    //区域填充样式
                    areaStyle: {
                      normal: {
                        opacity: 0.1
                      }
                    }
                  }
                ]
              })


            })
          },
          getVisitCount(){
            this.$axios.post('/getTimePoint').then((result)=>{
              var newDate = [];
              var newData = [];
              for(var i=0;i<result.data.length;i++){
                newDate.push(result.data[i].ntime);
                newData.push(result.data[i].npoint);
              }
              this.echartData4Date = newDate;
              this.echartData4Data = newData;

              var mychart4 = this.$echarts.init(document.getElementById("echartContainer4"));
              var option = {
                xAxis:{
                  type:'category',
                  boundaryGap:false,
                  data:this.echartData4Date
                },
                yAxis:{
                  boundaryGap:[0,"50%"],
                  type:'value'
                },
                series:[
                  {
                    name:'访问量',
                    type:'line',
                    smooth:true,
                    symbol:'none',
                    stack:'a',
                    areaStyle:{
                      normal:{}
                    },
                    data:this.echartData4Data
                  }
                ]
              }
              mychart4.setOption(option);
            })


          }
      },
      mounted(){
          this.getEchartData();
          this.getVisitCount();
      },
      beforeDestroy () {
        clearInterval();
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
