<template>
    <div>
        <div v-for="(item,index) in data" :key="index" class="item">
            {{item.type}}
            <SonDigui :data='item.children' v-if="item.children"></SonDigui>
        </div>
        
    </div>
</template>

<script>
export default {
    name: 'SonDigui',  //什么都可以，但是保证name是字符串
    props: ['data']
}
</script>

<style scoped lang='less'>

   .item{
        margin-left: 20px;
    }

</style>
