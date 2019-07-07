<template>
    <section class="contianer">
        <el-row type="flex" justify="space-between" >
             <!-- 顶部过滤列表 -->
             <div class="flights-content">
                 <!-- 过滤条件 -->
                 <div>
                    <FlightsFilters :data="cacheflightsData" @setDataList='setDataList'/>
                 </div>
                 <!-- 航班头部过滤 -->
                 <div>
                     <FlightsListHead/>
                 </div>
                 <!-- 航班信息 -->
                 <div>
                     <FlightsItem 
                     v-for="(item, index) in dataList" 
                     :key='index'
                     :data='item'/>
                 </div>

                 <!-- 分页 -->
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
                    :total="total"
                    >
                    </el-pagination>
                </el-row>
             </div>
             <!-- 侧边栏 -->
             <div class="aside">
                <!-- 侧边栏组件 -->
                <FlightsAside/>
            </div>
        </el-row>
    </section>
</template>

<script>
import FlightsListHead from "@/components/air/flightsListHead";
import FlightsFilters from "@/components/air/flightsFilters.vue"
import FlightsItem from "@/components/air/flightsItem";
import FlightsAside from "@/components/air/flightsAside.vue"


export default {
    components:{
        FlightsListHead,
        FlightsItem,
        FlightsFilters,
        FlightsAside
    },
    data(){
        return{
            flightsData:{
                flights: [],
                info: {},
                options: {}
            },
            cacheflightsData: { // 缓存一份数据，只会修改一次
                flights: [],     
                info: {},
                options: {}
            }, 
            pageIndex: 1, // 当前页数
            pageSize: 5,  // 显示条数
            total: 0,
            dataList: []    // 分页之后的数据列表
        }
    },
    watch: {
        $route(){
             this.getData();
        }
    },
    mounted(){
        // 请求机票列表的数据
        this.getData()
    },
    methods: {
        // 封装请求数据
        getData(){
            this.$axios({
                url:'/airs',
                method: 'GET',
                params: this.$route.query
            }).then(res=>{
                this.flightsData = res.data;

                // 缓存总数据，值和flightsData是相等的，一旦赋值之后不得修改
                this.cacheflightsData = {...res.data};
                // 总条数
                this.total = res.data.total;
                // 初始化数据
                this.pageIndex = 1;
                
                // 获取第一到第5条
                this.dataList = res.data.flights.slice(0, pagesize);
            })
        },
        // 设置dataList数据
        setDataList(arr){
            if(arr){    
                this.flightsData.flights = arr;
                this.pageIndex = 1;
                this.total = arr.length;
            }

            const start = (this.pageIndex - 1) * this.pageSize; 
            const end = start + this.pageSize; 
            this.dataList = this.flightsData.flights.slice(start, end);
        },

        // 切换条数时触发
        handleSizeChange(value){
            this.pageSize = value;
            
            this.setDataList();
        },
        // 切换页数时触发
        handleCurrentChange(value){
            this.pageIndex = value;
            
            this.setDataList();
        }
    }
}
</script>

<style scoped lang='less'>
    .contianer{
        width: 1000px;
        margin: 0 auto;
    }
    .flights-content{
        width:745px;
        font-size:14px;
    }
    .aside{
        width:240px;
    }
</style>
