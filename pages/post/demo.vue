<template>
    <div class="container">
        <h2>测试组件的递归</h2>
        <Digui :data='list'/>
    </div>
</template>

<script>
import Digui from '@/components/post/digui'

export default {
    components: {
        Digui
    },
    data(){
        return {
            list: [
                {
                    type: "衣服",
                    children: [
                        { 
                            type: "男装",
                            children: [
                                { type: "上衣"},
                                { type: "裤衩" },
                            ]
                        },
                        {
                            type: "女装",
                            children: [
                                { type: "比基尼", }
                            ]
                        }
                    ]
                },
                {
                    type: "电器",
                    children: [
                        { type: "电脑"},
                        { type: "冰箱" },
                        { type: "洗衣机" }
                    ]
                }
            ]
        }
    }
}
</script>

<style scoped lang='less'>
.container{
    width: 1000px;
    margin: 0 auto;
}
</style>
