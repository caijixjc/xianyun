<template>
  <div class="detailsHotel">
    <div class="hotel">
      <!-- 酒店的信息：酒店名、地址 -->
      <el-row class="hotelHeader">
        <div class="crumbs">
          <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item :to="{ path: '/hotel' }">酒店</el-breadcrumb-item>
              <el-breadcrumb-item>{{data.name}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-row type="flex" class="hotelName" justify="flex-start">
          <h4>{{data.name}}</h4>
          <span>
            <i class="iconfont iconhuangguan"></i>
            <i class="iconfont iconhuangguan"></i>
            <i class="iconfont iconhuangguan"></i>
            <i class="iconfont iconhuangguan"></i>
            <i class="iconfont iconhuangguan"></i>
          </span>
        </el-row>
        <p>{{data.alias}}</p>
        <div class="hotelAddress">
          <i class="iconfont iconlocation"></i>
          {{data.address}}
        </div>
      </el-row>
      <!-- 酒店的图片 -->
      <el-row class="hotelPicture">
        <el-col :span="16">
          <div class="grid-content bg-purple">
            <img
              height="360"
              width="640"
              :src="`http://157.122.54.189:9093/images/hotel-pics/${indeximg}.jpeg`"
              alt="得月楼饭店"
            />
          </div>
        </el-col>
        <el-col :span="8">
          <el-row class="list-item">
            <el-col :span="12" v-for="(item, index) in data.pics" :key="index"
           >
              <a href="javascript:void(0)">
                <img
                 @click="handleIndex(index)"
                  width="160"
                  :src="`http://157.122.54.189:9093/images/hotel-pics/${index+1}.jpeg`"
                  alt="得月楼饭店"
                />
              </a>
            </el-col>
           
          </el-row>
        </el-col>
      </el-row>
      <!-- 酒店的价格 -->
        <div>
          <el-row>
          <el-col :span="8">价格来源</el-col>
          <el-col :span="8">低价房型</el-col>
          <el-col :span="8">最低价格/每晚</el-col>
          </el-row> 
          </div>   

          <div class="details_ifno">
            <el-row v-for="(item, index) in data.products" :key="index"
            class="details_price">
            <el-col :span="8">{{item.name}}
              </el-col>        

            <el-col :span="8">{{item.bestType}}</el-col>      

            <el-col :span="8"> 
              <span style="color:#f90"> ￥ {{item.price}} </span>
               起
                <i class="el-icon-arrow-right height-light" style="color:#f90"></i> 
              </el-col>            
            </el-row>  
          </div>

    </div>
  </div>
</template>

<script>
export default {

  props:[
    "data"
  ],
      
  data() {
    return {
        
        indeximg:1,

     
    };
  },

  methods: {
      handleIndex(index){
        this.indeximg=index+1
        console.log(index);
      }
  },  
};
</script>

<style scoped lang='less'>
.detailsHotel {
  .hotel {
    .hotelHeader {
      .crumbs {
        padding: 20px 0;
      }
      .hotelName {
        h4 {
          font-weight: 400;
          font-size: 24px;
        }
        span {
          display: block;
          padding-top: 10px;
          margin-left: 8px;
          .iconfont {
            color: #f90;
            font-size: 16px;
          }
        }
      }
      .hotelAddress {
      }
    }
    .hotelPicture {
      padding: 40px 0;
      .list-item {
        .el-col {
          margin-bottom: 10px;
          &:nth-child(2n){
            padding-left: 7px;
          }
        }
      }
    }
    .hotelPrice {
     margin: 40px 0;
    }
  }
  .details_ifno{
    margin-top: 20px;
    border-bottom: 1px solid #eee;
    margin-bottom: 20px;

    :hover{
         background-color: #f90;
       }
    .details_price{
      height: 40px;
       border-top: 1px solid #eee;
       line-height: 40px;
       cursor:pointer;
    }
  }
}
</style>
