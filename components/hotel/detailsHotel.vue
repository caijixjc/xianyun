<template>
  <div class="detailsHotel">
    <div class="hotel">
      <!-- 酒店的信息：酒店名、地址 -->
      <el-row class="hotelHeader">
        <div class="crumbs">
          <span>酒店</span> >
          <span>南京酒店</span> >
          <span>得月楼饭店</span>
        </div>
        <el-row type="flex" class="hotelName" justify="flex-start">
          <h4>得月楼饭店</h4>
          <span>
            <i class="iconfont iconhuangguan"></i>
            <i class="iconfont iconhuangguan"></i>
            <i class="iconfont iconhuangguan"></i>
            <i class="iconfont iconhuangguan"></i>
            <i class="iconfont iconhuangguan"></i>
          </span>
        </el-row>
        <p>de yue lou hotel</p>
        <div class="hotelAddress">
          <i class="iconfont iconlocation"></i>
          柘宁东路9号
        </div>
      </el-row>
      <!-- 酒店的图片 -->
      <el-row class="hotelPicture">
        <el-col :span="16">
          <div class="grid-content bg-purple">
            <img
              height="360"
              width="640"
              src="http://157.122.54.189:9093/images/hotel-pics/1.jpeg"
              alt="得月楼饭店"
            />
          </div>
        </el-col>
        <el-col :span="8">
          <el-row class="list-item">
            <el-col :span="12">
              <a href="javascript:void(0)">
                <img
                  width="160"
                  src="http://157.122.54.189:9093/images/hotel-pics/1.jpeg"
                  alt="得月楼饭店"
                />
              </a>
            </el-col>
            <el-col :span="12">
              <a href="javascript:void(0)">
                <img
                  width="160"
                  src="http://157.122.54.189:9093/images/hotel-pics/2.jpeg"
                  alt="得月楼饭店"
                />
              </a>
            </el-col>
            <el-col :span="12">
              <a href="javascript:void(0)">
                <img
                  width="160"
                  src="http://157.122.54.189:9093/images/hotel-pics/3.jpeg"
                  alt="得月楼饭店"
                />
              </a>
            </el-col>
            <el-col :span="12">
              <a href="javascript:void(0)">
                <img
                  width="160"
                  src="http://157.122.54.189:9093/images/hotel-pics/4.jpeg"
                  alt="得月楼饭店"
                />
              </a>
            </el-col>
            <el-col :span="12">
              <a href="javascript:void(0)">
                <img
                  width="160"
                  src="http://157.122.54.189:9093/images/hotel-pics/5.jpeg"
                  alt="得月楼饭店"
                />
              </a>
            </el-col>
            <el-col :span="12">
              <a href="javascript:void(0)">
                <img
                  width="160"
                  src="http://157.122.54.189:9093/images/hotel-pics/6.jpeg"
                  alt="得月楼饭店"
                />
              </a>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <!-- 酒店的价格 -->
      <el-table :data="tableData" style="width: 100%" class="hotelPrice">
        <el-table-column prop="date" label="价格来源" width="420" style="color:orange"></el-table-column>
        <el-table-column prop="name" label="低价房型" width="420"></el-table-column>
        <el-table-column prop="address" label="最低价格/每晚"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: "携程",
          name: "高级大床房A",
          address: "99"
        },
        {
          date: "艺龙",
          name: "高级大床房A",
          address: "71"
        },
        {
          date: "Hotels",
          name: "高级大床房A",
          address: "141"
        }
      ]
    };
  },

  // mounted(){
  //   this.axios({

  //   })
  // }
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
}
</style>
