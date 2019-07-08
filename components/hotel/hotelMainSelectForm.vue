<template>
    <div class="container">
        <div class="list-filter">
            <el-row type="flex" justify="space-between" class="select_item">
                <el-col :span="8" class="select_price">
                    <el-row>
                        <el-col :span="12">价格</el-col>
                        <el-col :span="12">0-{{sliderValue*400}}</el-col>
                    </el-row>
                    <el-slider v-model="sliderValue"></el-slider>
                </el-col>
                <el-col :span="6" class="select_level">
                    <div>住宿等级</div>
                    <el-cascader
                    class="select_cascader"
                    :options="select_level"
                    @change='handleSelectLevel'
                    placeholder='不限'
                    :props="{ multiple: true, checkStrictly: true }"
                    clearable>
                    </el-cascader>
                </el-col>
                <el-col :span="6" class="select_homeType">
                    <div>住宿类型</div>
                    <el-cascader
                    class="select_cascader"
                    :options="select_homeType"
                    placeholder='不限'
                    :props="{ multiple: true, checkStrictly: true }"
                    clearable>
                    </el-cascader>
                </el-col>
                <el-col :span="6" class="select_home">
                    <div>酒店设施</div>
                    <el-cascader
                    class="select_cascader"
                    :options="select_home"
                    placeholder='不限'
                    :props="{ multiple: true, checkStrictly: true }"
                    clearable>
                    </el-cascader>
                </el-col>
                <el-col :span="6" class="select_name">
                    <div>酒店品牌</div>
                    <el-cascader
                    class="select_cascader"
                    :options="select_name"
                    placeholder='不限'
                    :props="{ multiple: true, checkStrictly: true }"
                    clearable>
                    </el-cascader>
                </el-col>
            </el-row>
        </div>
    </div>  
</template>

<script>
export default {
    data(){
        return {
            sliderValue: 100,

            select_level: [       //住宿等级
                {value: '', label: ''}
                // {value: 'one', label: '1星'},
                // {value: 'two', label: '2星'},
                // {value: 'three', label: '3星'},
                // {value: 'fore', label: '4星'},
                // {value: 'five', label: '5星'},
            ],
            select_homeType: [    //住宿类型
                {value: '', label: ''}
                // {value: 'one', label: '经济型'},
                // {value: 'one', label: '舒适型'},
                // {value: 'one', label: '高档型'},
                // {value: 'one', label: '豪华型'},
                // {value: 'one', label: '度假村'},
                // {value: 'one', label: '公寓式酒店'},
            ],
            select_home: [],        //酒店设施
            select_name: [],        //酒店品牌

            select_level_length: '',
        }
    },
    props: {
        data:{
            type: Object,
            default: {}
        }
    },
    mounted(){
        setTimeout(()=>{
            
        },1000)
    },
    methods: {
        handleSelectLevel(value){
            console.log(value);
            this.select_level_length = '已选'+ value.length + '项';
            // console.log(333,this.select_level_length);
        }
    }
}
</script>

<style scoped lang="less">
.list-filter{
    border: 1px solid #ccc;
    padding: 5px 20px;
    .select_item{
        font-size: 14px;
        color: #666;
        .select_price{
            padding: 5px 20px 5px 0px;
            border-right: 1px solid #ddd;
        }
        .select_level{
            padding: 5px 20px;
            border-right: 1px solid #ddd;

            /deep/.select_cascader{
                input{
                    border: none;
                }
            }
        }
        .select_homeType{
            padding: 5px 20px;
            border-right: 1px solid #ddd;

            /deep/.select_cascader{
                input{
                    border: none;
                }
            }
        }
        .select_home{
            padding: 5px 20px;
            border-right: 1px solid #ddd;

            /deep/.select_cascader{
                input{
                    border: none;
                }
            }
        }
        .select_name{
            padding: 5px 0px 5px 20px;

            /deep/.select_cascader{
                input{
                    border: none;
                }
            }
        }
    }
}

</style>
