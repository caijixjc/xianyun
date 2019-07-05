<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
          <FlightsFilters
          :data="cacheFlightsData"
          @setDateList="setDateList"

          />
        <div></div>

        <!-- 航班头部布局 -->
        <div>
          <FightsListHead />
        </div>

        <!-- 航班信息 -->
        <div>
          <FlightsItem v-for="(item, index) in  dataList" :key="index" :data="item" />
          <el-row type="flex" justify="center" style="margin-top:10px;">
            <!-- size-change：切换条数时候触发 -->
            <!-- current-change：选择页数时候触发 -->
            <!-- current-page: 当前页数 -->
            <!-- page-size：当前条数 -->
            <!-- total：总条数 -->
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="pageIndex"
              :page-sizes="[5, 10, 15, 20]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="flightsData.total"
            ></el-pagination>
          </el-row>
        </div>
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
        <FlightsAside
        
        />
        <!-- 侧边栏组件 -->
      </div>
    </el-row>
  </section>
</template>

<script>
import moment from "moment";
import FightsListHead from "@/components/air/fightsListHead";
import FlightsItem from "@/components/air/flightsItem";
import FlightsFilters from "@/components/air/flightsFilters";
import FlightsAside from "@/components/air/flightsAside";

export default {
  data() {
    return {
      flightsData: {
        flights: [],
        info: {},
        options: {},
      }, //定义一个总数据来接收

      pageIndex: 1, //默认第一页
      pageSize: 5, //默认显示五条
      dataList: [], // 分页之后的数据列表

      cacheFlightsData:{
          flights: [],
        info: {},
        options: {}
      }
    };
  },
  methods: {

      setDateList(arr){
        console.log(arr,123333333);
        if(arr){
          //重新刷新页面显示第一页
          this.pageIndex=1;
          this.flightsData.flights = arr;
          this.flightsData.total = arr.length
        }
        const start = (this.pageIndex-1) *this.pageSize;
        const end = start + this.pageSize;
        this.dataList = this.flightsData.flights.slice(0, this.pageSize)

      },

    setdataList() {
      this.$axios({
        url: "airs",
        params: this.$route.query //获取URL的参数
      }).then(res => {
        this.flightsData = res.data;
        // this.flights = this.flightsData.flights
        this.dataList = res.data.flights.slice(0, this.pageSize);
        this.cacheFlightsData = {...res.data};  
        console.log(res.data);
        // this.setDateList()
      });
    },

    //切换条数时触发
    handleSizeChange(value) {
      this.pageSize = value;
      this.setdataList();
    },
    //选择页数时触发
    handleCurrentChange(value) {
      this.pageIndex = value;

      // 计算截图列表的数据
      //当前页数减1乘以条数
      //当前页数乘以条数
      this.dataList = this.flightsData.flights.slice(
        (this.pageIndex - 1) * this.pageSize,
        this.pageIndex * this.pageSize
      );
    }
  },
  watch: {
      $route(){
        this.setdataList();
      }
  },
  components: {
    FightsListHead,
    FlightsItem,
    FlightsFilters,
    FlightsAside
  },
  mounted() {
    this.setdataList();
  }
};
</script>

<style scoped lang="less">
.contianer {
  width: 1000px;
  margin: 20px auto;
}

.flights-content {
  width: 745px;
  font-size: 14px;
}

.aside {
  width: 240px;
}
</style>