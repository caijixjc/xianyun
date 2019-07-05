<template>
    
    <div>
        <Digui
        :data="list"
        />
    </div>
</template>

<script>
import Digui from '@/components/post/digui.vue' 

export default {

    data() {
        return {
            list:[
                {type:"男装",
                children:[
                    {type:"上衣",
                    type:"裤衩"}
                ]},
                {type:"女装大佬",
                children:[
                    {type:"上衣",
                    type:"下库"}
                ]}
            ]
        }
    },
}
</script>

<style>

</style>
