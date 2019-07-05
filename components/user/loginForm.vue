<template>
  <el-form class="form" :model="form" ref="form" :rules="rules">
    <el-form-item class="form-item" prop="username">
      <el-input placeholder="手机/用户名" v-model="form.username" ></el-input>
    </el-form-item>

    <el-form-item class="form-text" prop="password">
      <el-input placeholder="密码" type="password" v-model="form.password" ></el-input>
    </el-form-item>
    <el-button type="primary" class="submit" @click="handleSubmit">登录</el-button>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入手机号码", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    handleSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          // this.$axios({
          //   url: "/accounts/login",
          //   method: "POST",
          //   data: this.form
          // }).then(res => {
          //     const {data} = res.data;
          //     commit("userInfo",data)
          //     return data

          // });
          //1把当前所需要提交的数据发送到仓库去让仓库去提交 "/user/login"代表着store下的user文件里的actions里面的login函数,this.form是需要提交的数据.
          this.$store.dispatch("user/logo",this.form).then(v =>{
              this.$message.success("登录成功,正在跳转....")
              setTimeout(()=>{
                this.$router.push("/")
              },3000)
          })
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
.form {
  padding: 25px;
}

.form-item {
  margin-bottom: 20px;
}

.form-text {
  font-size: 12px;
  color: #409eff;
  text-align: right;
  line-height: 1;
}

.submit {
  width: 100%;
  margin-top: 10px;
}
</style>
