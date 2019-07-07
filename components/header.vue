<template>
    <div class="header">
        
        <!-- 中间的内容 -->
        <el-row type="flex" justify="space-between" class="main">

            <!-- logo -->
            <div class="logo">
                <nuxt-link to="/">
                    <img src="/images/logo.jpg" alt="">
                </nuxt-link>
            </div>

            <!-- 菜单 -->
            <div class="navs">
                <nuxt-link to="/">首页</nuxt-link>
                <nuxt-link to="/post">旅游攻略</nuxt-link>
                <nuxt-link to="/hotel">酒店</nuxt-link>
                <nuxt-link to="/air">国内机票</nuxt-link>
            </div>

            <!-- 登录状态 -->
            <el-row>
                <!-- 下拉菜单 -->
                <el-dropdown v-if="$store.state.user.userInfo.token">
                    <span class="el-dropdown-link">
                        <img :src="$axios.defaults.baseURL + $store.state.user.userInfo.user.defaultAvatar" alt="">

                        <span>{{$store.state.user.userInfo.user.nickname}}</span>
                        
                        <i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>个人中心</el-dropdown-item>
                        <el-dropdown-item>
                            <div @click="handleLogout">退出</div>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>

                <div v-else>
                    <nuxt-link to="/user/login">登录 / 注册</nuxt-link>
                </div>
            </el-row>
            

        </el-row>

    </div>
</template>

<script>
export default {
    methods: {
        handleLogout(){
             this.$store.commit("user/clearUserInfo")
        }
    }
}
</script>

<style lang='less' scoped>
.header{
    margin: 0 auto;
    width: 1000px;
    height: 60px;
    line-height: 60px;
}
.logo img{
    height: 60px;
}
.navs{
    font-size: 16px;
    flex: 4;
    padding-left: 20px
}
.navs a{
    padding: 0 20px;
    color: #000;
    text-decoration: none;
}
.el-dropdown-link{
    width: 40px;
    height: 40px;
    margin-top: 10px;

    img{
        width:36px;
        height:36px;
        border-radius: 50%;
        vertical-align: middle;
    }
}
</style>
