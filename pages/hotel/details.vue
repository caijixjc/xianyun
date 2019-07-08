<template>
  <div class="cantainter">
    <div class="main">
      <!-- 酒店详情页里的detailsHotel组件 -->
      
      <div>
        <DetailsHotel 
        :data="dataList" />
      </div>
      <!-- 酒店详情页里的detailsMap组件 -->
      <div>
        <DetailsMap
        :data="dataList" 
        />
      </div>
      <!-- 酒店详情页里的detailsComment组件 -->
      <div>
        <DetailsComment 
        :data="dataList"
        />
      </div>
    </div>
  </div>
</template>

<script>
//引入组件
import DetailsHotel from "@/components/hotel/detailsHotel.vue";
import DetailsMap from "@/components/hotel/detailsMap.vue";
import DetailsComment from "@/components/hotel/detailsComment.vue";

export default {
  // 注册组件
  components: {
    DetailsHotel,
    DetailsMap,
    DetailsComment
  },
  data() {
    return {
      dataList:[],//总数据
      hotelassets:[],//酒店服务
    }
  },

  mounted() {
    const { id } = this.$route.query;
    this.$axios({
      url: "/hotels",
      method: "GET",
      params:{
          id
      }
    }).then(res => {
      this.dataList = res.data.data[0]
      console.log(this.dataList);
    
    });
  }
};
</script>

<style scoped lang='less'>
.cantainter {
  width: 100%;
  .main {
    width: 1000px;
    margin: 0 auto;
  }
}
</style>
