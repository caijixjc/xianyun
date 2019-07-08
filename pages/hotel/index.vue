<template>
    <div class="container">
        <!-- 头部查看价格 -->
        <HotelMainHeader @ReqHotelData='ReqHotelData'/>

        <!-- 筛选组件 -->
        <HotelMainSelectForm :data='ReqHotelDatas'/>
        
        <!-- 酒店列表详情 -->
        <HotelMainList :data='ReqHotelDatas'/>

    </div>
</template>

<script>
import HotelMainHeader from '@/components/hotel/hotelMainHeader'
import HotelMainList from '@/components/hotel/hotelMainList'
import HotelMainSelectForm from '@/components/hotel/hotelMainSelectForm'

export default {
    data(){
        return{
            ReqHotelDatas:{}
        }
    },
    components: {
        HotelMainHeader,
        HotelMainList,
        HotelMainSelectForm
    },
    methods: {
        ReqHotelData(res){
            console.log(123,res.data);
            this.ReqHotelDatas = res.data;
        }
    }
}
</script>

<style scoped lang="less">
.container{
  width:1000px;
  margin:0 auto;

}
</style>
