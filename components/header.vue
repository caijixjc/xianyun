<template>
    <header class="header"> 
        <el-row type="flex" justify="space-between" class="main">
            <!-- logo -->
            <div class="logo">
                <nuxt-link to="/">
            <img src="http://157.122.54.189:9093/images/logo.jpg" alt="">
                </nuxt-link>
            </div>

            <!-- 导航Nav -->
             <el-row type="flex" class="navs">
                     <nuxt-link to="/">首页</nuxt-link>
                     <nuxt-link to="/post">旅游攻略</nuxt-link>
                     <nuxt-link to="/air">国内机票</nuxt-link>
                     <nuxt-link to="/hotel">酒店</nuxt-link>
             </el-row>
                <el-dropdown class="xiaoxi">
                 <nuxt-link to="javascript:;">
                     消息
                 </nuxt-link>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>个人消息</el-dropdown-item>
                    </el-dropdown-menu>

                </el-dropdown>
                    
             <!-- 登录注册 -->
                <!-- 如果用户存在则展示用户信息,用户数据来自store -->
                <el-dropdown v-if="$store.state.user.userInfo.token">
                    <el-row type="flex" align="middle" class="el-dropdown-link">
                        <nuxt-link to="javascipt:;">
                           <img :src="$axios.defaults.baseURL + $store.state.user.userInfo.user.defaultAvatar" alt=""> 
                           <span>{{$store.state.user.userInfo.user.nickname}}</span>
                           <i class="el-icon-arrow-down el-icon--right"></i>
                        </nuxt-link>
                    </el-row>
                         <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>个人中心</el-dropdown-item>
                        <el-dropdown-item >
                         <div  @click="handleLogout">退出</div>
                            </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>

                    <div v-else class="login">
                            <nuxt-link to="/user/login">登录 / 注册</nuxt-link>
                    </div>
        </el-row>


    </header>
</template>

<script>
export default {

        data() {
            return {
                
            }
        },
        methods: {
            handleLogout(){
                console.log(123);
                this.$store.commit("user/outUserInfo");
            }
        },

}
</script>

<style scoped lang="less">
    .header{
        height: 60px;
        line-height: 60px;
        box-sizing: border-box;
        border-bottom: 1px solid #666;
        .main{
            width: 1000px;
            margin: 0 auto;
            
              .logo{
                width: 156px;
                height:42px;
                margin-top:9px;
                 img{
                display: block;
                width: 100%;
                    }
             }
        .navs{
     
            margin: 0 20px;
            flex: 1;
            a{
                display: block;
                height: 60px;
                padding: 0 20px;
                box-sizing: border-box;
                &:hover{
                    border-bottom:5px #409eff solid;
                    color:#409eff;
                }
            }
            .nuxt-link-exact-active{
                // 鼠标单击事件
                background:#409eff;
                color:#fff!important;
            }
        }
        .el-dropdown-link{
            height: 60px;
            img{
                width: 40px;
                height: 40px;
                border-radius: 50%;
                vertical-align: middle;
            }
        }  
        .login{

            &:hover{
                color: red;
            }
        }
        }
        .xiaoxi{
            padding-right: 10px;
            width: 50px;

            &:hover{
                color:blue;
            }
        }
        
    }
</style>
