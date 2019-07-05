<template>
    <div class="container">
        <el-row
        type="flex"
        justify="center"
        align="middle"
        class="main"
        >
        
        <div class="form-wrapper">
            <el-row type="flex" justify="center" class="tabs">
                <span 
                 v-for="(item, index) in  [`登录`,`注册`]"
                  :key="index"
                  :class="{active:currentTab===index}"
                  @click="handleChangeTab(index)"
                >
                        {{item}} 
                </span>
            </el-row>
             <LoginForm v-if="currentTab===0"></LoginForm>
             <RegisterForm v-if="currentTab===1"></RegisterForm>
        </div>
        </el-row>
       

    </div>
</template>

<script>
import LoginForm from "@/components/user/loginForm.vue";
import RegisterForm from "@/components/user/RegisterForm.vue";
export default {
    data() {
        return {
            // 初始值
            currentTab: 0,
        }
    },
    methods: {
        handleChangeTab(index){
            this.currentTab=index;
        }
    },
    components:{
        LoginForm,
        RegisterForm
    }
}
</script>

<style scoped lang="less">
.container{
      background:url(http://157.122.54.189:9095/assets/images/th03.jfif) center 0;
    height: 700px;
    min-width:1000px;
    .main{
        width: 1000px;
        height: 100%;
        margin: 0 auto;
        
        .form-wrapper{
                width: 400px;
                background-color: #fff;
                 box-shadow: 2px 2px 0 rgba(0,0,0,0.1);
            
            .tabs{
                span{
                    width: 50%;
                    height: 50px;
                    display: block;
                    box-sizing: border-box;
                    border-top: 2px solid #eee;
                    line-height: 48px;
                    text-align: center;
                     cursor: pointer;
                     background-color: #eee;
                     color:#666;

                     &.active{
                         color:orange;
                         border-top-color: orange;
                         background-color: #fff;
                         font-weight: bold;
                     }
                }
            }
        }
        

    }
}
</style>
