<template>
   
            <div>
                <div class="container" >
                    <div class="el-row is-justify-space-between el-row--flex">
                        <div class="menus-wrapper" >
                            <div class="menus-body"  >
                                <div class="menus" @mouseleave='handlehidden'  >
                                    <div class="menu-item" v-for='(item,index) in data' 
                                    :key='index'
                                    @mouseover="handleChangeTab(index)"
                                     ><span>{{item.type}}</span></div>
                                    <div class="menus-content"  >
                                       
                                        <span  v-for='(item,index) in data' 
                                    :key='index'
                                    v-if='current==index'>
                                            <div v-for='(item,index) in item.children' 
                                    :key='index'><i>{{index+1}}</i>{{item.city}}{{item.desc}}</div>
                                        </span>
                                        
                                    </div>
                                 
                                </div>
                               
                             
                                <!---->
                            </div>
                            <div class="aside-recommend" >
                                <h4 class="aside-title" >推荐城市</h4> <a href="/post#"
                                    class="aside-recommend-item" ><img src="http://157.122.54.189:9093/images/pic_sea.jpeg"
                                        ></a>
                            </div>
                        </div>
                        <div class="post-wrapper" >
                            <div class="search-wrapper" >
                                <div class="search-bar el-row is-justify-space-between is-align-middle el-row--flex"
                                    ><input type="text" placeholder="请输入想去的地方，比如：'广州'" :value="inputval"
                                        > <i class="el-icon-search" ></i></div>
                                <div class="search-recommend" >
                                    推荐：
                                    <i @click='handleaddress(index)' v-for='(item,index) in address' :key='index'>
                                      <span>{{item}}</span>
                                      </i>
                                    
                                    </div>
                            </div>
                            <div class="post-title el-row is-justify-space-between is-align-middle el-row--flex"
                                >
                                <h4 >推荐攻略</h4> 
                                <button type="button" class="el-button el-button--primary"
                                @click="handlewrite">
                                    <!----><i class="el-icon-edit"></i><span>
                                        写游记
                                    </span></button>
                            </div>
                            <!-- 推荐攻略 -->
                            <div class="post-list" >
                                <div v-for='(item,index) in datalist' >
                                  <div @click='handlepagechange(item.id)'class="mouse">
                                    <div class='post-list-main'>
                                        <h4>{{item.title}}</h4>
                                    <p>{{item.summary}}</p>
                                    <div class='post-list-top'  >
                                          <a v-for='(item,index) in item.images'>
                                              <img :src ="`${item}`">
                                          </a>

                                    </div>
                                  </div>
                                   
                                    </div>
                                     <div class='post-list-buttom'>
                                        <span><i class="el-icon-location-outline"></i><span>{{item.city.name}}</span><i>by</i></span>
                                        <span @click='handleperson'>
                                          <img src="@/static/images/avatar.jpg">
                                          <span class="name">{{item.account.nickname}}</span>
                                        
                                        </span>
                                        <span><i class="el-icon-view"></i><span>{{item.watch}}</span></span>
                                        <span class="like">{{item.like}}赞</span>
                                        
                                    </div>
                                    
                                    
                                   

                                     
                                </div>
                            </div>
                           <div class="block">
                                <!-- <span class="demonstration">完整功能</span> -->
                                <el-pagination
                                @size-change="handleSizeChange"
                                @current-change="handleCurrentChange"
                                :current-page="pageIndex"
                                :page-sizes="[3, 5, 10, 15]"
                                :page-size="3"
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="total">
                                </el-pagination>
                            </div>
                        </div>
                    </div>
                </div>
              
            </div>
   
  
</template>

<script>
export default {
  data(){
    return{
        pageIndex: 1,
        total:0,
        pageSize:3,
        inputval:"北京",
        address:['广州','上海','北京'],
     
     data:{
         type:'',
         children:[
             
         ]
     },
     current:null,
     gonglve:[],
     datalist:[],
     
    }

    
    
  },


  mounted(){
    this.$axios({
      url:'/posts/cities',
      method:'GET',

    }).then(res=>{
      // console.log(res.data);
    //   console.log(res.data.data[0]);
     this.data =res.data.data;
     
     
     
     
      
     
    })
    
    this.$axios({

         url:'/posts',
         method:'GET',

       }).then(res=>{
         console.log(res.data.data);
         this.gonglve = res.data.data;
         this.total = res.data.data.length;
        
         this.datalist = res.data.data.slice(0,3)

       })
    
  },
  methods:{
    // 写游记
    handlewrite(){
      this.$router.push({
        path:"/post/create"
      })
    },
      handleChangeTab(index){
           this.current = index
       },
       handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
        this.pageSize = val;
        const start = (this.pageIndex - 1) * this.pageSize;
        const end = start + this.pageSize;
         console.log(start,end);
         this.datalist = this.gonglve.slice(start,end)
      },
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
        this.pageIndex = val;
        const start = (this.pageIndex - 1) * this.pageSize; 
         
         const end = start + this.pageSize;
         console.log(start,end);
         this.datalist = this.gonglve.slice(start,end)
      },
      handlehidden(){
          this.current=-1
      },
      handlepagechange(id){
        console.log(id)
          this.$router.push({
              path:'/post/detail?id='+id,
          })
      },
      handlewrite(){
        this.$router.push({
          path:'/post/create'
        })
      },
      handleaddress(index){
        this.inputval = this.address[index]
      },
      handleperson(){
        this.$router.push({
          path:'/user/personal'
        })
      }
    
  }

}
</script>

<style scoped >
.post-list-buttom .name{
  color: orange
}
.post-title h3{
  color: orange
}
.post-list .mouse{
 cursor: pointer;
 
}
.post-list-main h4{
padding-bottom: 20px;
}
.post-list-main h4:hover{
  
  color: orange;
}
.post-list-buttom{
  position: relative;
}
.post-list-buttom .like{
position: absolute;
right:0px;
font-size: 16px;
color: orange;
}
.post-list-buttom img{
      width: 16px;
    height: 16px;
    border-radius: 100px
}
.menus .menus-content span{
    font-size: 15px;
    padding-left:5px;
    
    
}
ul{
    list-style: none ;
}
.block{
    padding-top:10px;
}
 .container {
      width: 1000px;
      margin: 0 auto;
      padding: 20px 0
    }

    .menus-wrapper {
      position: relative;
      width: 260px;
      z-index: 2
    }

    .menus-wrapper .menus {
      width: 260px;
      border: 1px solid #ddd;
      border-right: none;
      border-bottom: none;
      box-shadow: 0 0 1px #f5f5f5;
      z-index: 2;
      position: relative;
    }
    .menus-wrapper .menus-content{
      width: 300px;
      /* height: 160px; */
      border-top: 1px solid #ddd;
      border-left: none;
      border-bottom: none;
      box-shadow: 0 0 1px #f5f5f5;
      z-index: 2;
      background-color: white;
      position: absolute;
      left:260px;
      top:-1px;
      display: flex;
      flex-direction: column;
      justify-content:space-around
    }
    .menus-wrapper .menus-content i{
      color: orange;
      font-size: 24px;
      font-style: italic
    }
    .post-list-top{
        display:flex;
        overflow:hidden
        /* justify-content:space-between */
    }
    .post-list-top a img{
        width: 220px;
        height: 150px;
        /* display: block; */
    }
    

    .menus-wrapper .menu-item {
      height: 40px;
      line-height: 40px;
      border-bottom: 1px solid #ddd;
      border-right: 1px solid #ddd;
      padding: 0 20px;
      font-size: 14px;
      position: relative;
      z-index: 2
    }

    .menus-wrapper .menu-item:after {
      display: block;
      content: "";
      width: 10px;
      height: 10px;
      border-right: 1px solid #999;
      border-top: 1px solid #999;
      -webkit-transform: rotate(45deg);
      transform: rotate(45deg);
      position: absolute;
      right: 20px;
      top: 15px
    }

    .menus-wrapper .menu-item.active {
      border-right-color: #fff;
      color: orange
    }

    .menus-wrapper .menu-item.active:after {
      
      border-right-color: orange;
      border-top-color: orange
    }

    .menus-wrapper .sub-menus {
      position: absolute;
      left: 260px;
      top: 0;
      width: 350px;
      height: 0px;
      padding: 10px 20px;
      box-sizing: border-box;
      background: #fff;
      border: 1px solid #ddd
    }
    .post-list-main{
        width: 100%;
        padding: 20px 0;
        border-bottom: 1px solid #eee
    }
    .post-list-main p{
        margin-bottom: 15px;
    line-height: 1.5;
    font-size: 14px;
    height: 63px;
    overflow: hidden;
    text-overflow: ellipsis;
    /* display: -webkit-box;
    -webkit-line-clamp: 3; */
    }
    .aside-recommend {
      margin-top: 20px
    }

    .aside-recommend .aside-title {
      font-weight: 400;
      padding-bottom: 10px;
      border-bottom: 1px solid #ddd;
      margin-bottom: 10px
    }

    .aside-recommend .aside-recommend-item img {
      width: 100%;
      display: block
    }

    .post-wrapper {
      width: 700px
    }

    .search-wrapper .search-bar {
      width: 100%;
      box-sizing: border-box;
      height: 40px;
      line-height: 40px;
      border: 3px solid orange
    }

    .search-wrapper .search-bar input {
      flex: 1;
      padding: 0 20px;
      line-height: 40px;
      outline: none;
      border: none;
      background: none
    }

    .search-wrapper .search-bar i {
      font-size: 24px;
      color: orange;
      font-weight: 700;
      margin-right: 10px
    }

    .search-wrapper .search-recommend {
      padding: 10px 0;
      font-size: 12px;
      color: #666
    }

    .search-wrapper .search-recommend span {
      margin-right: 5px
    }

    .search-wrapper .search-recommend span:hover {
      color: orange;
      text-decoration: underline;
      cursor: pointer
    }
</style>
