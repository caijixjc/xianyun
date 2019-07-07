<template>
<<<<<<< HEAD
  <div class="level-bread">
   <el-breadcrumb separator="/">
    <el-breadcrumb-item v-for="item in realList" :to="item.path" :key="item">{{item.name}}</el-breadcrumb-item>
   </el-breadcrumb>
  </div>
=======
    <div>
        <div v-for="(item,index) in data" :key="index" class="item">
            {{item.type}}
            <SonDigui :data='item.children' v-if="item.children"></SonDigui>
        </div>
        
    </div>
>>>>>>> d2a8baea703c80bb32fe5cbe4093c5b82409b80c
</template>
<script>
<<<<<<< HEAD
  export default {
   name: "lelve-bread",
   created(){
    this.getRoutePath();
   },
   data() {
    return {
     realList: []
    }
   },
   methods:{
    getRoutePath() {
     this.realList = this.$route.meta.routeList;
    }
   },
   beforeRouteEnter(to,from, next) {
    next((vm) => {
     vm.realList = to.meta.routeList;
    });
   },
   // watch:{
   //  $route:function(newV,oldV) {
   //   this.realList =newV.meta.routeList;
   //  }
   // }
  }
=======
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
>>>>>>> d2a8baea703c80bb32fe5cbe4093c5b82409b80c
