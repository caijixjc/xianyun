<template>
  <div class="container">
    <el-carousel :interval="5000" >
      <el-carousel-item 
      v-for='(item,index) in bgSwider' 
      :key='index'
      arrow="always">
      <div class="bg_swider" 
      :style="`background:url(${$axios.defaults.baseURL + item.url}) center center no-repeat;
      background-size:contain contain;`"></div>
      </el-carousel-item>
    </el-carousel>

            <!-- 搜索框 -->
      <div class="banner-content">
        <div class="search-bar">
            
            <!-- tab栏 -->
            <el-row 
            type="flex" 
            class="search-tab">
                <span 
                v-for="(item, index) in options" 
                :key="index" 
                :class="{active: index === currentOption}"
                @click="handleOption(index)">
                    <i>{{item.name}}</i>
                </span>
            </el-row>
            
            <!-- 输入框 -->
            <el-row 
            type="flex" 
            align="middle" 
            class="search-input">
                <input 
                :placeholder="options[currentOption].placeholder" 
                v-model="searchValue"
                @keyup.enter="handleSearch"/>
                <i class="el-icon-search" @click="handleSearch"></i>
            </el-row>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      bgSwider:[
        // {url: "http://157.122.54.189:9095/assets/images/th03.jfif"},
        // {url: "http://157.122.54.189:9095/assets/images/th04.jfif"}
      ],
      options: [      // 搜索框tab选项
        {
          name: "攻略", 
          placeholder: "搜索城市", 
          pageUrl: "/post?city="
        },
        {
            name: "酒店", 
            placeholder: "请输入城市搜索酒店", 
            pageUrl: "/hotel?city="},
        {
            name: "机票", 
            placeholder: "请输入出发地", 
            pageUrl: "/air"
        }
    ],
    searchValue: "",    // 搜索框的值
    currentOption: 0,   // 当前选中的选项     
    }
  },
  mounted(){
    this.$axios({
      url:'/scenics/banners',
      method:'GET'
    }).then(res=>{
      // console.log(res.data.data);
      const {data} = res.data;
      this.bgSwider = data;
    })
  },
  methods:{
    handleOption(index){
      this.currentOption = index;

      const pageTab = this.options[index]
      if(pageTab.name === '机票'){
        this.$router.push(pageTab.pageUrl)
      }
    },
    handleSearch(){
      const searchTab = this.options[this.currentOption];
      this.$router.push(searchTab.pageUrl+this.searchValue)
    }
  }
}
</script>


<style lang='less' scoped>
.container{
    min-width:1000px;
    // height:700px;
    margin:0 auto;
    position:relative;

    /deep/ .el-carousel__container{  //less和sass不支持>>>，可以使用/deep/，css可以使用>>>
        height:700px;
    }

    .bg_swider{ 
        width:100%;
        height:100%;
    }
        .banner-content{
        z-index:9;
        width:1000px;
        position:absolute;
        left:50%;
        top:45%;
        margin-left: -500px;
        border-top:1px transparent solid;

        .search-bar{
            width:552px;
            margin:0 auto;
        }

        .search-tab{
            .active{
                i{
                color:#333;
                }
                &::after{
                background: #eee;
                }
            }

            span{
                width:82px;
                height:36px;
                display:block;
                position: relative;
                margin-right:8px;
                cursor: pointer;

                i{
                position:absolute;
                z-index:2;
                display: block;
                width:100%;
                height:100%;
                line-height:30px;
                text-align:center;
                color:#fff;
                }

                &:after{
                position: absolute;
                left:0;
                top:0;
                display:block;
                content: "";
                width:100%;
                height:100%;
                border: 1px rgba(255,255,255,.2) solid;
                border-bottom: none;
                transform: scale(1.1,1.3) perspective(.7em) rotateX(2.2deg);
                transform-origin: bottom left;
                background: rgba(0,0,0,.5);
                border-radius:1px 2px 0 0;
                box-sizing:border-box;
                }
            }
        }

        .search-input{
            width:550px;
            height:46px;
            background:#fff;
            border-radius: 0 4px 4px 4px;
            border: 1px rgba(255,255,255,.2) solid;
            border-top:none;
            box-sizing: unset;

            input{
                flex:1;
                height:20px;
                padding: 13px 15px;
                outline: none;
                border:0;
                font-size:16px;
            }

            .el-icon-search{
                cursor :pointer;
                font-size:22px;
                padding:0 10px;
                font-weight:bold;
            }
        }
    }
}
</style>