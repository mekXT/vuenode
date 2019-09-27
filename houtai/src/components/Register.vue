<template>
    <div class="center-in-center">
      <el-form class="demo-ruleForm">
        <el-form-item>
          <el-input class="xt-el-input" type="text" v-model="username" placeholder="username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input class="xt-el-input" type="password" v-model="password1" placeholder="password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input class="xt-el-input" type="password" v-model="password2" placeholder="password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item class="buttonWraper">
          <el-checkbox class="checked" v-model="checked">I Agree</el-checkbox>
          <router-link class="toLogin" to="/Login">Login</router-link>
        </el-form-item>
        <el-form-item class="buttonWraper">
          <el-button type="primary" size="small" @click="register">注册</el-button>
          <el-button type="primary" size="small" @click="resetForm">重置</el-button>
        </el-form-item>
          <el-form-item>
          <div class="newsShow">{{msg}}</div>
        </el-form-item>
      </el-form>
    </div>
</template>
<script type="text/ecmascript-6">
    export default {
        data() {
            return {
              username:"",
              password1:"",
              password2:"",
              msg:"",
              checked:true
            }
        },
      methods:{
          register(){
            let password1 = this.password1;
            let password2 = this.password2;
            let username = this.username;
            if(username == "" || password1 == "" || password2 == "")
            {
              this.msg = "请输入账号和密码"
            }
            else
            {
              if(password1 === password2)
              {
                let params = {
                  username : this.username,
                  password : this.password1
                }
                this.$axios.post('/register',params)
                  .then((result)=>{
                    console.log(result.data);
                    this.msg = result.data;
                  })
                  .catch((err)=>{
                    console.log(err);
                  })
              }
              else
              {
                this.msg = "请保证两次密码输入相同"
              }
            }
          },
          resetForm(){
            this.username = "";
            this.password1 = "";
            this.password2 = "";
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
