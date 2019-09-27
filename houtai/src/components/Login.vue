<template>
    <div class="center-in-center">
      <el-form class="demo-ruleForm">
        <el-form-item>
          <el-input class="xt-el-input" type="text" v-model="username" placeholder="username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input class="xt-el-input" type="password" v-model="pwd" placeholder="password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item class="buttonWraper">
          <el-checkbox class="checked" v-model="checked">Remmber Me</el-checkbox>
          <router-link class="toLogin" to="/Register">Register</router-link>
        </el-form-item>
        <el-form-item class="buttonWraper">
          <el-button type="primary" size="small" @click="login">登录</el-button>
          <el-button type="primary" size="small">重置</el-button>
        </el-form-item>
        <el-form-item>
          <div class="newsShow">{{msg}}</div>
        </el-form-item>
      </el-form>
    </div>
</template>
<script type="text/ecmascript-6">
  import qs from 'qs'
    export default {
        data() {
            return {
              username:'',
              pwd:'',
              msg:'',
              checked:true
            }
        },
      methods:{
          login(){
            let params = {
              username :this.username,
              password : this.pwd,
            }
            this.$axios.post('/login',params)
              .then(result=>{
                console.log(result.data);
                if(result.data == "登录成功")
                {
                  this.$router.replace('/xthome')
                }
                else {
                  this.msg = result.data;
                }
              })
              .catch(err=>{
                console.log(err)
              })
          },
          resetForm(){
            this.username = "";
            this.pwd = "";
            this.msg = "";
          }
      }
    }
</script>
<style>
  .xt-el-input input{
    background:none;
    -webkit-text-fill-color: white;
  }
</style>
<style scoped>
  .demo-ruleForm{
    width:100%;
    margin:0 auto;
    padding:20px 20px;
  }

  .checked{
    float:left;
    margin:0;
    line-height: 20px;
  }

  .toLogin{
    float:right;
    margin:0;
    line-height: 20px;
    color:white;
    text-decoration: underline;
  }

  .newsShow{
    text-align: center;
    color:white;
  }

  .buttonWraper{
    text-align: center;
  }

  .center-in-center{
    width:20%;
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }
</style>
