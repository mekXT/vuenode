<template>
    <div>
      <el-container>
        <el-header class="wraper-header"><xtheader></xtheader></el-header>
        <el-container style="margin-top: 10px;margin-bottom: 10px;">
          <el-aside>
            <el-row class="tac">
              <el-col :span="24">
                <el-menu
                  default-active="1"
                  class="el-menu-vertical-demo"
                  background-color="#545c64"
                  text-color="#fff"
                  active-text-color="#ffd04b"
                  ref="navUL">
                  <!--<el-submenu index="1">
                    <template slot="title">
                      <i class="el-icon-location"></i>
                      <span>轮播数据</span>
                    </template>
                    <el-menu-item-group>
                      <template slot="title">分组一</template>
                      <el-menu-item index="1-1">选项1</el-menu-item>
                      <el-menu-item index="1-2">选项2</el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item-group title="分组2">
                      <el-menu-item index="1-3">选项3</el-menu-item>
                    </el-menu-item-group>
                    <el-submenu index="1-4">
                      <template slot="title">选项4</template>
                      <el-menu-item index="1-4-1">选项1</el-menu-item>
                    </el-submenu>
                  </el-submenu>-->
                  <el-menu-item index="1" @click="tabControl(1)">
                    <i class="el-icon-location"></i>
                    <span slot="title">轮播数据</span>
                  </el-menu-item>
<!--                  <el-menu-item index="2" @click="tabControl(2)">
                    <i class="el-icon-menu"></i>
                    <span slot="title">最新消息</span>
                  </el-menu-item>
                  <el-menu-item index="3" @click="tabControl(3)">
                    <i class="el-icon-document"></i>
                    <span slot="title">精选推荐</span>
                  </el-menu-item>-->
                </el-menu>
              </el-col>
            </el-row>
          </el-aside>
          <el-main class="wraper-main" ref="main">
            <div v-if="lbsj">
              <el-table
                :data="tableData1"
                max-height="600"
                border
                style="width: 100%">
                <el-table-column
                  prop="id"
                  label="id"
                  width="80">
                </el-table-column>
                <el-table-column
                  prop="title"
                  label="标题"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="content"
                  label="内容"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="date"
                  label="时间"
                  width="200">
                </el-table-column>
                <el-table-column
                  prop="type"
                  label="类型"
                  width="0">
                </el-table-column>
                <el-table-column
                  prop="author"
                  label="作者"
                  width="0">
                </el-table-column>
                <el-table-column
                  label="操作">
                  <template slot-scope="scope">
                    <!--<el-button @click="searchTab" type="text" size="small">查询</el-button>
                    <div v-show="isShow" style="display:inline-block">
                      <el-input
                      placeholder="请输入需要查询的数据的id值"
                      v-model="form2.id"
                      clearable
                      size="mini"
                      style="width:150px;">
                      </el-input>
                      <el-button type="primary" @click="findHTData" icon="el-icon-search" size="small" style="padding:7px"></el-button>
                    </div>-->
                    <el-button @click="updateData(scope.row)" type="text" size="small">编辑</el-button>
                    <el-button @click="delData(scope.row)" type="text" size="small">删除</el-button>
                    <!--<el-button type="text" size="small" @click="dialogFormVisible = true">添加</el-button>-->

                    <!--添加数据的弹窗表单-->
                    <el-dialog title="添加数据" :visible.sync="dialogFormVisible">
                      <el-form :model="form">
                        <el-form-item label="title" :label-width="formLabelWidth">
                          <el-input v-model="form.title" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="content" :label-width="formLabelWidth">
                          <el-input v-model="form.content" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="author" :label-width="formLabelWidth">
                          <el-input v-model="form.author" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="date" :label-width="formLabelWidth">
                          <el-date-picker
                            v-model="form.date"
                            type="datetime"
                            placeholder="选择日期">
                          </el-date-picker>
                        </el-form-item>
                        <el-form-item label="type" :label-width="formLabelWidth">
                          <el-select v-model="form.type" placeholder="请选择文章类型">
                            <el-option label="game" value="game"></el-option>
                            <el-option label="houtai" value="houtai"></el-option>
                            <el-option label="qiantai" value="qiantai"></el-option>
                            <el-option label="other" value="other"></el-option>
                          </el-select>
                        </el-form-item>
                        <el-form-item>
                          <el-upload
                            class="avatar-uploader"
                            action="/api/upload"
                            enctype=‘multipart/form-data’
                            :show-file-list="false"
                            :on-change="onUploadChange"
                            :on-success="afterUpload">
                            <img v-if="form.imagesSrc" :src="form.imagesSrc" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                          </el-upload>
                        </el-form-item>
                      </el-form>
                      <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogFormVisible = false">取 消</el-button>
                        <el-button type="primary" @click="addData()">确 定</el-button>
                      </div>
                    </el-dialog>

                    <!--修改数据的弹窗表单-->
                    <el-dialog title="修改数据" :visible.sync="dialogFormVisible1">
                      <el-form :model="form1">
                        <el-form-item label="id" :label-width="formLabelWidth">
                          <el-input v-model="form1.id" autocomplete="off" disabled></el-input>
                        </el-form-item>
                        <el-form-item label="title" :label-width="formLabelWidth">
                          <el-input v-model="form1.title" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="content" :label-width="formLabelWidth">
                          <el-input v-model="form1.content" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="author" :label-width="formLabelWidth">
                          <el-input v-model="form1.author" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="date" :label-width="formLabelWidth">
                          <el-date-picker
                            v-model="form1.date"
                            type="datetime"
                            placeholder="选择日期">
                          </el-date-picker>
                        </el-form-item>
                        <el-form-item label="type" :label-width="formLabelWidth">
                          <el-select v-model="form1.type" placeholder="请选择文章类型">
                            <el-option label="game" value="game"></el-option>
                            <el-option label="houtai" value="houtai"></el-option>
                            <el-option label="qiantai" value="qiantai"></el-option>
                            <el-option label="other" value="other"></el-option>
                          </el-select>
                        </el-form-item>
                      </el-form>
                      <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogFormVisible1 = false">取 消</el-button>
                        <el-button type="primary" @click="updateHTData()">确 定</el-button>
                      </div>
                    </el-dialog>

                    <!--查询数据的弹窗表单-->
                    <el-dialog title="查询数据" :visible.sync="dialogFormVisible2">
                      <el-form :model="form2">
                        <el-form-item label="id" :label-width="formLabelWidth">
                          <el-input v-model="form2.id" autocomplete="off" disabled></el-input>
                        </el-form-item>
                        <el-form-item label="title" :label-width="formLabelWidth">
                          <el-input v-model="form2.title" autocomplete="off" disabled></el-input>
                        </el-form-item>
                        <el-form-item label="content" :label-width="formLabelWidth">
                          <el-input v-model="form2.content" autocomplete="off" disabled></el-input>
                        </el-form-item>
                        <el-form-item label="author" :label-width="formLabelWidth">
                          <el-input v-model="form2.author" autocomplete="off" disabled></el-input>
                        </el-form-item>
                        <el-form-item label="date" :label-width="formLabelWidth">
                          <el-input v-model="form2.date" autocomplete="off" disabled></el-input>
                        </el-form-item>
                        <el-form-item label="type" :label-width="formLabelWidth">
                          <el-input v-model="form2.type" autocomplete="off" disabled></el-input>
                        </el-form-item>
                      </el-form>
                      <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
                        <el-button type="primary" @click="dialogFormVisible2 = false">确 定</el-button>
                      </div>
                    </el-dialog>

                  </template>
                </el-table-column>
              </el-table>
              <div class="page">

                <div style="float:left;padding-left: 20px;">
                  <el-button @click="searchTab" type="text" size="middle">查询</el-button>
                  <div v-show="isShow" style="display:inline-block">
                    <el-input
                      placeholder="请输入需要查询的数据的id值"
                      v-model="form2.id"
                      clearable
                      size="mini"
                      style="width:150px;">
                    </el-input>
                    <el-button type="primary" @click="findHTData" icon="el-icon-search" size="small" style="padding:7px"></el-button>
                  </div>

                  <el-button type="text" size="middle" @click="dialogFormVisible = true">添加</el-button>
                </div>


                <el-button class="el-button--primary" size="small" @click="loadData('doIndex')">首页</el-button>
                <el-button class="el-button--primary" size="small" @click="loadData('doPrev')">上一页</el-button>
                <el-button class="el-button--primary" size="small" @click="loadData('doNext')">下一页</el-button>
                <el-button class="el-button--primary" size="small" @click="loadData('doLast')">尾页</el-button>
                <span>当前页 ： {{curPage}}</span>
                <span>总页数 ： {{totalPage}}</span>
              </div>
            </div>
          </el-main>
        </el-container>
        <el-footer class="wraper-footer" style="background-color:#545c64"><xtfooter></xtfooter></el-footer>
      </el-container>
    </div>
</template>
<script type="text/ecmascript-6">
  import xtheader from '@/components/xtheader'
  import xtfooter from '@/components/xtfooter'
    export default {
        data() {
            return {
              //左侧导航
              lbsj : true,
/*              zxxx : false,
              jxtj : false,*/
              //表格数据
              tableData1 : [],
              //自适应窗口高度
              winHeight1:window.innerHeight,
              curPage : 1,
              totalPage: 0,
              dialogFormVisible: false,
              dialogFormVisible1:false,
              dialogFormVisible2:false,
              formLabelWidth:'80px',
              //添加的表单
              form:{
                id:"",
                title:"",
                content:"",
                date:"",
                type:"",
                author:"",
                imagesSrc:""
              },
              //修改的表单
              form1:{
                id:"",
                title:"",
                content:"",
                date:"",
                type:"",
                author:""
              },
              //查询的表单
              form2:{
                id:"",
                title:"",
                content:"",
                date:"",
                type:"",
                author:"",
              },
              value1: '',
              inputSearchTitle:"",
              isShow:false,
            }
        },
      components:{
          "xtheader":xtheader,
          "xtfooter":xtfooter
      },
      methods:{
          //侧边栏控制
        tabControl(i){
            if(i == 1)
            {
              this.lbsj = true;
              this.zxxx = false;
              this.jxtj = false;
            }
            else if(i == 2){
              this.lbsj = false;
              this.zxxx = true;
              this.jxtj = false;
            }
            else if(i == 3){
              this.lbsj = false;
              this.zxxx = false;
              this.jxtj = true;
            }
          },
        //表格数据操作
        handleClick(row){
            console.log(row);
        },
        //删除所选行的数据
        delData(row){
          const params = {"id":row.id};
          this.$axios.post('/delHTData',params).then((result)=>{
            if(result.data.status == 1)
            {
              console.log("该行数据删除成功");
              this.loadData("doIndex");
            }
          })
        },
        //添加数据
        addData(){
          //dialogFormVisible = false
          if(this.form.title == "" || this.form.date == "" || this.form.type == "")
          {
            console.log("请确保必须的字段都已输入")
          }
          else {
            const params2 = {
              "title":this.form.title,
              "content":this.form.content,
              "date":this.form.date,
              "type":this.form.type,
              "author":this.form.author,
              "imagesSrc":this.form.imagesSrc
            };
            console.log(params2);
            this.$axios.post("/addHTData",params2).then((result2)=>{
              console.log(result2.data);
              alert(result2.data);
              this.loadData("doIndex");
              this.dialogFormVisible = false;
            })
          }
        },
        //加载数据表格
        loadData(doPage){

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

          if(dopage != -1)
          {
            this.curPage = dopage;
            let params = {
              curPage : this.curPage,
            }
            console.log(params);
            this.$axios.post('/getHTData',params).then((result)=>{
              this.tableData1 = result.data.data;
              console.log(this.tableData1);
              this.totalPage = result.data.maxPage;
            })
          }
        },
        //编辑按钮
        updateData(row){
          this.form1.id = row.id;
          this.form1.title = row.title;
          this.form1.content = row.content;
          this.form1.date = row.date;
          this.form1.type = row.type;
          this.form1.author = row.author;
          //打开弹窗
          this.dialogFormVisible1 = true;
        },
        //修改表格数据
        updateHTData(){
          var id = this.form1.id;
          var title = this.form1.title;
          var content =  this.form1.content;
          var date = this.form1.date;
          var type = this.form1.type;
          var author = this.form1.author;

          var params = {"id":id,"title":title,"content":content,"date":date,"type":type,"author":author};

          this.$axios.post('/updateHTData',params).then((result)=>{
              if(result.data == "更新成功")
              {
                this.dialogFormVisible1 = false;
                this.loadData("doIndex");
              }
              else if(result.data == "更新失败"){
                console.log(result.data);
              }
          })

        },
        //搜索输入框的显示隐藏
        searchTab(){
            this.isShow = !this.isShow;
        },
        //查询数据
        findHTData(){
            var params = {"id":this.form2.id};
            this.$axios.post('/findSearchData',params).then((result)=>{
              if(result.data.isGet)
              {
                this.form2.id=result.data.id;
                this.form2.title = result.data.title;
                this.form2.content = result.data.content;
                this.form2.date = result.data.date;
                this.form2.type = result.data.type;
                this.form2.author = result.data.author;
                this.dialogFormVisible2 = true;
                this.loadData("doIndex");
              }
              else {
                console.log("没有搜索到指定id的数据");
              }
            })
        },
        //图片上传成功执行的方法
        afterUpload(res){
          var newSrc = "http://120.27.2.193" + res.url;
          console.log(newSrc)
          this.$set(this.form,'imagesSrc',newSrc);
        },
        //限制上传图片的格式大小
        onUploadChange(file) {
          //有时候取不到类型可以试着打印file 可以看出问题
          const isJPG = file.raw.type === 'image/jpeg';
          const isPNG = file.raw.type === 'image/png';
          const isLt2M = file.size / 1024 / 1024 < 2;

          if (!isJPG && !isPNG) {
            this.$message.error('上传图片只能是 JPG 或者 PNG 格式!');
          }
          if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
          }
          return isJPG && isPNG && isLt2M;
        }
      },
      mounted() {
          const that = this;
          window.onresize = () =>{
            return (()=>{
              that.winHeight1 = window.innerHeight;
            })()
          }
          /*console.log(this.$refs.navUL.$el.firstElementChild.parentElement.style.height);*/
        //this.$refs.navUL获取ref=navUL的element组件 .#el获取element的dom元素 然后console.log打印想要的dom元素
        this.$refs.navUL.$el.firstElementChild.parentElement.style.height = (this.winHeight1-140) + "px";
        this.$refs.main.$el.firstElementChild.parentElement.style.height = (this.winHeight1-140) + "px";
        this.loadData("doIndex");
      },
      watch:{
          winHeight1(val){
            this.winHeight1 = val;
            this.$refs.main.$el.firstElementChild.parentElement.style.height = (this.winHeight1-140) + "px";
            this.$refs.main.$el.firstElementChild.parentElement.style.height = (this.winHeight1-140) + "px";
          }
      }
    }
</script>
<style scoped>
  .wraper-header{
    padding:0;
  }
  .wraper-footer{
    padding:0;
    text-align: center;
  }
  .wraper-main{
    padding:0;
    background-color: white;
    margin-left: 10px;
  }
  .page{
    text-align: center;
    padding-top:15px;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
