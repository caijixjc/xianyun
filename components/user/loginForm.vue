<template>
    <el-form
    :model="form"
    ref="form"
    :rules="rules"
    class="form">
        <el-form-item class="form_item" prop="username">
            <el-input 
            placeholder="用户名/手机"
            v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item class="form_item" prop="password">
            <el-input 
            type="password" 
            placeholder="密码"
            v-model="form.password"></el-input>
        </el-form-item>
        <!-- <p class="form_text">
            <nuxt-link to="#">忘记密码</nuxt-link>
        </p> -->
        <el-button
        class="submit"
        type="primary"
        @click="handleSubmit">登录</el-button>
    </el-form>
</template>

<script>
export default {
    data(){
        return{
            // 表单数据
            form: {
                username: '13800138000',
                password: '123456'
            },
            // 表单规则
            rules: {
                username: [{required: true, message: '请输入用户名', trigger: 'blur' }],
                password: [{required: true, message: '请输入密码', trigger: 'blur' }]
            }
        }
    },
    methods: {
        handleSubmit(){
            // 验证表单
            this.$refs.form.validate((valid)=>{
                // 为true表示没有错误
                if(valid){
                    // this.$axios({
                    //     url: '/accounts/login',
                    //     method: 'POST',
                    //     data: this.form
                    // }).then(res=>{
                    //     // console.log(res.data);
                    //     // 调用store下的mutations的方法
                    //     this.$store.commit('user/setUserInfo',res.data)
                    //     this.$message.success("登录成功，正在跳转..."   );

                    //     setTimeout(()=>{
                    //         this.$router.push('/')
                    //     },1000)
                    // })


                    // 调用actions
                    this.$store.dispatch("user/login", this.form).then(v => {
                        this.$message.success("登录成功，正在跳转...");

                        setTimeout(() => {
                            this.$router.push("/");
                        }, 1000);
                    });
                }
            })
        }
    }
}
</script>

<style scoped lang='less'>
    .form{
        padding:25px;
    }

    .form-item{
        margin-bottom:20px;
    }

    .form-text{
        font-size:12px;
        color:#409EFF;
        text-align: right;
        line-height: 1;
    }

    .submit{
        width:100%;
        margin-top:10px;
    }
</style>
