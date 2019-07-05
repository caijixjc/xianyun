<template>
    <div class="container">
        <el-row type="flex" justify="space-between">
            <!-- 订单表单 -->
            <OrderForm :data="infoData" @setAllPrice="setAllPrice"/>

            <!-- 侧边栏 -->
            <div class="aside">
                  <OrderAside :data="infoData" :allPrice="allPrice"/>        
            </div>
        </el-row>
    </div>
</template>

<script>
import OrderForm from "@/components/air/orderForm.vue";
import OrderAside from "@/components/air/OrderAside.vue";

export default {
    components: {
        OrderForm,
        OrderAside
    },
    data(){
        return{
            // 机票信息
            infoData: {
                insurances: [] ,// 初始化保险数据
                seat_infos: {}
            },
            // 总价格
            allPrice: 0
        }
    },
    mounted(){
        const {query} = this.$route;

        this.$axios({
            url: `airs/${query.id}`,
            params: {
                seat_xid: query.seat_xid
            }
        }).then(res => {
            // console.log(res.data);
            this.infoData = res.data;
        })
    },
    methods: {
        // 给表单组件设置机票信息
        // setInfoData(data){
        //     this.infoData = data;
        // },
         setAllPrice(price){
            this.allPrice = price;
        }
    }
}
</script>

<style lang="less" scoped>
    .container{
        width:1000px;
        margin:20px auto;
    }
    
    /*aside*/
    .aside{
        width: 350px;
        height: fit-content;
        border:1px #ddd solid;
    }
</style>