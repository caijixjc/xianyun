<template>
    <div class="container">
        <!-- 面包屑 -->
        <el-breadcrumb 
        separator-class="el-icon-arrow-right" 
        class="breadcrumb">
            <el-breadcrumb-item>酒店</el-breadcrumb-item>
            <!-- <el-breadcrumb-item>{{breadcrumb}}</el-breadcrumb-item> -->
            <el-breadcrumb-item>{{breadcrumb}}</el-breadcrumb-item>
        </el-breadcrumb>
        
        <!-- 目的地 -->
        <div class="seletInfo">
            <!-- <div class="adressCity"><el-input v-model="adressCity" placeholder="目的地"></el-input></div> -->
            <el-autocomplete
                :fetch-suggestions="adressCitySearch"
                placeholder="目的地"
                @select="handleAdressCitySelect"
                class="el-autocomplete"
                v-model='adressCity'>
            </el-autocomplete>
            <div class="time">
                <el-date-picker
                v-model="value1"
                type="daterange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                @change='handleCityData'>
                </el-date-picker>
            </div>
            <div class="personNum">
                <el-input
                    @focus="handlePersonNum"
                    readonly
                    placeholder="人数未定"
                    suffix-icon="el-icon-user"
                    v-model="input1">
                </el-input>
                <div class="personNum_item" v-if="isPersonNum">
                    <div class="subPersonNum">
                        <el-row type="flex" align="middle" class="subPersonNum_item">
                            <el-col :span="6" class="every">每间</el-col>
                            <el-col :span="9">
                                <el-select size='mini' v-model="value1" style="margin-left: 5px;" placeholder="请选择">
                                    <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-col>
                            <el-col :span="9">
                                <el-select size='mini' v-model="value2" style="margin-left: 10px;" placeholder="请选择">
                                    <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-col>
                        </el-row>
                        <el-row class="subPrimary">
                            <el-button type="primary" size="mini">确定</el-button>
                        </el-row>
                    </div>
                </div>
            </div>
            <!-- 查看价格 -->
            <el-row class="findPrice"><el-button type="primary">查看价格</el-button></el-row>
        </div>
        
        <!-- 地区 -->
        <el-row type="flex" class="hotel-option-row">
            <el-col :span="14">
                <!-- 区域 -->
                <el-row class="option-row">
                    <el-col :span="3">区域: </el-col>
                    <el-col :span="21">
                        <div ref="option_adress" style="height:40px;overflow:hidden">
                            <el-link>全部</el-link>
                            <el-link
                            v-for="(item,index) in scenic" 
                            :key="index"
                            style="padding: 0 10px;">{{item.name}}
                            </el-link>
                        </div>
                        <a class="all_43" @click="handleArrowDown">
                            <i v-if="isShow==false" class="el-icon-arrow-down" style="color:#f90"></i>
                            <i v-if="isShow==true" class="el-icon-arrow-up" style="color:#f90"></i>
                            等{{scenic.length}}个区域
                        </a>
                    </el-col>
                </el-row>
                <!-- 攻略 -->
                <el-row class="option-row">
                    <el-col :span="3">攻略:</el-col>
                    <el-col :span="21">北京，你想要的都能在这找到。博古通今，兼容并蓄，天下一城，如是帝都。景点以故宫为中心向四处辐射；地铁便宜通畅，而且覆盖绝大多数景点。由于早上有天安门升旗仪式，所以大多数人选择在天安门附近住宿。</el-col>
                </el-row>
                <!-- 均价 -->
                <el-row class="option-row">
                    <el-col :span="3"><span class="item">均价</span><span style="padding-left: 20px;">:</span></el-col>
                    <el-col :span="21">
                        <el-row style="color: #f90;">
                            <el-col :span="6">
                                <i class="iconfont iconhuangguan"></i>
                                <i class="iconfont iconhuangguan"></i>
                                <i class="iconfont iconhuangguan"></i>
                                <span class="price-budget">¥332</span>
                            </el-col>
                            <el-col :span="6">
                                <i class="iconfont iconhuangguan"></i>
                                <i class="iconfont iconhuangguan"></i>
                                <i class="iconfont iconhuangguan"></i>
                                <i class="iconfont iconhuangguan"></i>
                                <span class="price-budget">¥521</span>
                            </el-col>
                            <el-col :span="6">
                                <i class="iconfont iconhuangguan"></i>
                                <i class="iconfont iconhuangguan"></i>
                                <i class="iconfont iconhuangguan"></i>
                                <i class="iconfont iconhuangguan"></i>
                                <i class="iconfont iconhuangguan"></i>
                                <span class="price-budget">¥768</span>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
            </el-col>
            <!-- 地图 -->
            <el-col :span="10">
                <HotelMainMap />
            </el-col>
        </el-row>
    </div>
</template>

<script>
import HotelMainMap from '@/components/hotel/hotelMainMap';
import moment from "moment";

export default {
    components: {
        HotelMainMap,
    },
    data(){
        return{
            breadcrumb:'',
            // cityId: '',
            adressCity: '南京' ,
            activeIndex: '1',
            options: [],
            value1: [],
            value2: [],
            input1:'',
            input2: '',
            scenic: [],
            isShow: false,
            isPersonNum: false,
            city: '',
            enterTime: '',
            leftTime: '',
            reqData: {}
        }
    },
    mounted(){
        this.$router.push(`/hotel?city=74`);
        this.$axios({
            url: '/hotels', 
            mothed: 'GET',
        }).then(res=>{
            // console.log(res);
            const {data} = res.data;
            this.breadcrumb = data[0].breadcrumb.split('>')[0];
            this.scenic = data[0].scenic;

            this.$emit('ReqHotelData',res)
        })
    },
    methods:{
        // 区域 等43个区域
        handleArrowDown(){
            this.isShow = !this.isShow;
            if(this.isShow == false){
                this.$refs.option_adress.style.height = 40 + 'px';
                this.$refs.option_adress.style.overflow = 'hidden';
            }else{
                this.$refs.option_adress.style.height = 'auto';
            }
        },
        handlePersonNum(){
            this.isPersonNum = !this.isPersonNum;
            console.log(this.isPersonNum);
        },
        // 目标城市输入框获得焦点时触发
        // value 是选中的值，cb是回调函数，接收要展示的列表
        adressCitySearch(value, cb){
            if(!value) {
                return;
            }

            this.$axios({
                url: "/cities?name=" + value,
                method: "GET"
            }).then(res => {
                const {data} = res.data;
                const newData = data.map(v => {
                    return {
                        ...v,
                        value: v.name
                    }
                })
                this.adressCity = newData[0].value;

                // cb函数接收的参数是数组，数据里面每一项必须是对象，然后带有value的属性
                cb(newData);
            });
        },
        // 目的地
        handleAdressCitySelect(item) {
            this.city = item.id;
            this.$router.push({
                path: "/hotel",
                query: {
                    city: this.city
                }
            })
            
            this.$axios({
                url: '/hotels?city='+this.city, 
                mothed: 'GET',
                }).then(res=>{
                this.reqData = res;
                const {data} = res.data;
                if(res.data.total == 0){
                    this.breadcrumb = item.name+'酒店预订';
                    this.scenic = item.scenics
                }else{
                    this.breadcrumb = item.name+'酒店预订'
                    // this.breadcrumb = data[0].breadcrumb.split('>')[0];
                    this.scenic = data[0].scenic;
                }
                this.$emit('ReqHotelData',this.reqData)
            })

        },
        handleCityData(value){
            this.enterTime = moment(value[0]).format(`YYYY-MM-DD`);
            this.leftTime = moment(value[1]).format(`YYYY-MM-DD`);
        }

    }
}
</script>

<style scoped lang="less">
.breadcrumb{
    margin: 20px 0;
    
}
.seletInfo{
    margin-bottom: 20px;
    .adressCity{
        display: inline-block;
    }
    .time{
        display: inline-block;
        margin-left: 10px;
    }
    .personNum{
        display: inline-block;
        position: relative;
        .personNum_item{
            position: absolute;
            top: 40px;
            left: 0px;
            z-index: 1;
            background: #fff;
            .subPersonNum{
                width: 300px;
                height: 120px;
                margin-top: 10px;
                padding: 10px;
                border: 1px solid #f5f5f5;
                border-radius: 2px;
                box-shadow: 1px 2px 4px rgba(0, 0, 0, .1), 2px 1px 4px rgba(0, 0, 0, .1);

                .subPersonNum_item{
                    // display: none;
                    padding-bottom: 20px;
                    border-bottom: 1px solid #ddd;
                    .every{
                        font-size: 14px;
                        color: #666;
                    }
                    
                }
                .subPrimary{
                    margin-top: 20px;
                    text-align: right;
                }
            }
        }
    }
    .findPrice{
        display: inline-block;
        margin-left: 10px;
    }
}

.hotel-option-row{
    margin-bottom: 20px;

    .option-row{
        margin-bottom: 20px;
        color: #666;
        font-size: 14px;

        .all_43{
            text-decoration: none; 
            color: inherit;
            cursor: pointer;
        }
        .item{
            &:after{
                content: '?';
                width: 15px;
                height: 15px;
                text-align: center;
                color: #fff;
                font-size: 12px;
                background: #ddd;
                border-radius: 10px;
                position: absolute;
                left: 30px;
                top: -3px;
            }
            
        }
    }
}
</style>
