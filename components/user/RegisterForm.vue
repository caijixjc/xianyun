<template>
    <el-form 
        :model="form" 
        ref="form" 
        :rules="rules" 
        class="form">
            <el-form-item class="form-item" prop="username">
                <el-input 
                placeholder="用户名手机"
                v-model="form.username">
                </el-input>
            </el-form-item>

            <el-form-item class="form-item" prop="captcha">
                <el-input 
                placeholder="验证码"
                v-model="form.captcha">
                    <!-- 自定义模板 -->
                    <template slot="append">
                        <el-button @click="handleSendCaptcha">
                            发送验证码
                        </el-button>
                    </template>
                </el-input>
            </el-form-item>

            <el-form-item class="form-item" prop="nickname">
                <el-input 
                placeholder="你的名字"
                v-model="form.nickname">
                </el-input>
            </el-form-item>

            <el-form-item class="form-item" prop="password">
                <el-input 
                placeholder="密码" 
                v-model="form.password"
                type="password"
                ></el-input>
            </el-form-item>

            <el-form-item class="form-item" prop="checkPassword">
                <el-input 
                placeholder="确认密码"
                v-model="form.checkPassword"
                type="password">
                </el-input>
            </el-form-item>

            <el-button 
            class="submit"
            type="primary" 
            @click="handleRegSubmit">
                注册
            </el-button>
        </el-form>
</template>

<script>
export default {
    data(){
        // rule  当前的规则对象  
        // value  当前调用规则的字段值  确认密码的值
        // callback  回调函数 必须调用
        var validatePass = (rule, value, callback) => {
            // console.log(rule,value);
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.form.checkPassword) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return {
            // 表单数据
            form: {
                username: "15827152077",       // 登录用户名/手机
                password: "w123" ,      // 登录密码
                checkPassword: "w123",  // 确认密码
                nickname: "wang",	    // 昵称
                captcha: ""		    // 手机验证码
            },
            // 表单规则
            rules: {
                username:[
                    {required: true, message: '请输入用户名', trigger: 'blur'},
                ],
                password:[
                    {required: true, message: '请输入密码', trigger: 'blur'}
                ],
                checkPassword:[
                    // 自定义验证规则 validator是自定义验证的一个函数
                    {validator: validatePass, trigger: 'blur'}
                ],
                nickname:[
                    {required: true, message: '请输入昵称', trigger: 'blur'}
                ],
                captcha:[
                    {required: true, message: '请输入手机验证码', trigger: 'blur'}
                ],
            },
        }
    },
    methods: {
        // 发送验证码
        handleSendCaptcha(){

            if(this.form.username===''){
                this.$confirm('手机号码不能为空', '提示', {
                    confirmButtonText: '确定',
                    type: 'warning'
                });
                return;
            }

            this.$axios({
                url: '/captchas',
                method: 'POST',
                data: {
                    tel: this.form.username,
                }
            }).then(res=>{
                // console.log(sres.data);
                const {code} = res.data;
                alert('验证码是：'+ code)
                this.form.captcha = code;
            })
        },


        // 注册
        handleRegSubmit(){
            // console.log(this.form)
            this.$refs.form.validate((valid)=>{
                    // 为true表示没有错误
                if(valid){
                    const {checkPassword, ...props} = this.form;
                    this.$axios({
                        url: '/accounts/register',
                        method: 'POST',
                        data: props
                    }).then(res =>{
                        console.log(123);
                        // 把用户的数据设置给store
                        this.$store.commit("user/setUserInfo", res.data);

                        this.$message.success("注册成功，正在登录...");
                        setTimeout(() => {
                            this.$router.push("/");
                        }, 1000);
                    })
                }
            })
        }
    }
}
</script>

<style scoped lang="less">
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