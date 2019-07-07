<template>
    <div class="container">
        <div class="hotelInfo">
            <div v-if="data.total != 0"> 
                <el-row class="hotelInfo_item" type="flex" justify="space-between" v-for="(item,index) in data.data" :key="index">
                    <el-col :span="8" class="hotelImg">
                        <a href="javascript:;" @click="handlejumper(index)">
                            <img :src='item.photos' :alt='item.name'>
                        </a>
                    </el-col>
                    <el-col :span="10"  class="hotelDeteil">
                        <div class="hotelDeteil_name" @click="handlejumper(index)">{{item.name}}</div>
                        <div class="hotelDeteil_hoteltype">
                            <span>{{item.alias}}</span>
                            <span class="hoteltype_iconfont" v-if="item.hotellevel">
                                <i v-for="(items,indexs) in new Array(item.hotellevel.level || 0)"
                                class="iconfont iconhuangguan"
                                :key="indexs"></i>
                            </span>
                            <span>{{item.hoteltype.name}}</span>
                        </div>
                        <div class="hotelDeteil_stars">
                            <el-row type="flex" justify="space-between">
                                <el-col :span="10" class="stars_score">
                                    <el-rate
                                        v-model="item.stars"
                                        disabled
                                        show-score
                                        text-color="#ff9900"
                                        score-template="{value}">
                                    </el-rate>
                                </el-col>
                                <el-col :span="7" class="stars_commone">
                                    <span>99</span>条评论
                                </el-col>
                                <el-col :span="7" class="stars_post">
                                    <span>23</span>篇游记
                                </el-col>
                            </el-row>
                        </div>
                        <div class="hotelDeteil_address">
                            <i class="iconfont iconlocation"></i>
                            <span>位于:{{item.address}}</span>
                        </div>
                    </el-col>
                    <el-col :span="6" class="otherWeb">
                        <el-row type="flex" justify="space-between" class="subOtherWeb" v-for="(item1,index1) in item.products" :key="index1">
                            <el-col>{{item1.name}}</el-col>
                            <el-col>
                                <span>￥{{item1.price}}</span>
                                起
                                <i class="el-icon-arrow-right"></i>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
            </div>
            <div v-else class='NoHotel'>
                暂无符合条件的酒店
            </div>
        </div>

        <!-- 分页 -->
        <div class="pagination">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="page"
                :page-size="pageSize"
                layout="total, prev, pager, next, jumper"
                :total="data.total">
            </el-pagination>
        </div>
        
        </div>
    </div>
</template>

<script>
export default {
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
            page: 1,       // 当前页数
            pageSize: 10,   // 显示条数
            total: 0,
            _start: 0,
        }
    },
    props: {
        data:{
            type: Object,
            default: {}
        }
    },
    mounted(){
       setTimeout(() => {
           console.log(5555,this.data);
       }, 1000);
    },
    methods: {
        // 切换条数时触发
        handleSizeChange(value){
            this.pageSize = value;
            
        },
        // 切换页数时触发
        handleCurrentChange(value){
            this.page = value;
            // console.log(this.$route.query.city,213457);
            this.$axios({
                url:'/hotels',
                method: 'GET',
                params: {
                    _limit:10,
                    _start:this.data.nextStart,
                    city:+this.$route.query.city,
                    }
            }).then(res=>{
                this.flightsData = res.data;
                

                // 缓存总数据，值和flightsData是相等的，一旦赋值之后不得修改
                // this.cacheflightsData = {...res.data};
                this.data = {...res.data}
                // 总条数
                this.total = res.data.total;
                this.$router.push({
                    path: "/hotel",
                    query: {
                        ...this.$route.query,
                        page:this.page
                    }
                })

            })
        },
        handlejumper(index){
            console.log(index);
            this.$router.push({
                path: "/hotel/details",
                query: {
                    id: this.data.data[index].id
                }
            })
        }
    }
}
</script>

<style scoped lang="less">
.hotelInfo{
    .hotelInfo_item{
        padding: 25px 0;
        border-bottom: 1px solid #eee;
        .hotelImg{
            img{
                width: 320px; 
                height: 210px
            }
        }
        .hotelDeteil{
            .hotelDeteil_name{
                font-size: 26px;
                cursor: pointer;
            }
            .hotelDeteil_hoteltype{
                font-size: 16px;
                color: #aaa;
                .hoteltype_iconfont{
                    color: #f90;
                }
            }
            .hotelDeteil_stars{
                font-size: 16px;
                .stars_commone{
                    span{
                        color: #f90;
                        margin: 0 5px;
                    }
                }
                .stars_post{
                    span{
                        color: #f90;
                        margin: 0 5px;
                    }
                }
            }
            .hotelDeteil_address{
                font-size: 14px;
                color: #666;
                padding-top: 5px;
            }
        }
        .otherWeb{
            margin-top: 20px;
            .subOtherWeb{
                width: 100%;
                height: 48px;
                line-height: 48px;
                color: #606266;
                font-size: 14px;
                cursor: pointer;
                padding-left: 20px;
                border-bottom: 1px solid #eee;
                &:hover{
                    background: #f2f2f2;
                }
                div:nth-child(2) {
                    span{
                        color: #f90;
                        font-size: 16px;
                    }
                    
                }
            }
        }
    }
    .NoHotel{
        height: 300px;
        text-align: center;
        margin-top: 20px;
        font-size: 16px;
    }
}
.pagination{
    text-align: right;
    padding: 20px 0 40px 0;
}
</style>

