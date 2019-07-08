<template>
<div class="contoain">
  <div class="box">
    <el-breadcrumb separator="/" class="bread">
      <el-breadcrumb-item :to="{ path: '/post/index' }">旅游攻略</el-breadcrumb-item>
      <el-breadcrumb-item>
        <a href="/post/particulars">攻略详细</a>
      </el-breadcrumb-item>
    </el-breadcrumb>
    <el-row class="title">
      <h1 v-for="(item,index) in contents" :key="index">{{item.title}}</h1>
      <hr />
    </el-row>
    <el-row class="post-info">
      <span v-for="(item,index) in contents" :key="index">{{item.city.created_at}}</span>
      <span>阅读：596</span>
    </el-row>
    <div class="box1" v-for="(item,index) in contents" :key="index" v-html="item.content"></div>
    <el-row type="flex" class="tubiao el-row is-justify-center el-row--flex">
      <div class="ctrl-item">
        <i class="iconfont iconpinglun"></i>
        <p>评论({{length}})</p>
      </div>
      <div class="ctrl-item">
        <i class="iconfont iconstar1"></i>
        <p>收藏</p>
      </div>
      <div class="ctrl-item">
        <i class="iconfont iconfenxiang"></i>
        <p>分享</p>
      </div>
      <div class="ctrl-item" @click="handleLike(like)">
        <i class="iconfont iconding"></i>
        <p >点赞({{ like }})</p>
      </div>
    </el-row>
    <el-row class="comment">
      <h4>评论</h4>
      <div class="cmt-input">
        <el-input type="textarea" placeholder="评评理呗！" v-model="comment.content" :rows="2" />
      </div>

      <el-row class="button" type="flex">
        <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card"
          accept="image/*"
          :limit="imgLimit"
          :file-list="productImgs"
          :multiple="isMultiple"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-change="onUploadChange"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :on-exceed="handleExceed"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt />
        </el-dialog>
        <el-button type="primary" @click="handleCommit">提交</el-button>
      </el-row>

      
      <div class="cmt-list" >
        

        <div class="cmt-item"  v-for="(item,index) in dataList" :key="index">
          <div class="cmt-info">
            <img
              :src="`${`http://157.122.54.189:9095`}${item.account.defaultAvatar}`"
              alt
              style="width: 16px; width: 16px; border-radius: 50%;"
            />
            {{item.account.nickname}}
            <i>2019-07-06 11:35</i>
            <span style="text-align: right;">{{item.id}}</span>
          </div>
          <div class="cmt-content" >
            <div class="cmt-new">
              <p>{{item.content}}</p>
            </div>
            <div>
              <img
                :src="`${item.pics}`"
                alt
              />
            </div>
          </div>
        </div>
      </div>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageIndex"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="length"
      ></el-pagination>
    </el-row>
  </div>

  <div class="right">
      <a href="/post/detail?id=269"></a>
  </div>
  </div>
</template>


<script>
export default {
 
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      productImgs: [],
      isMultiple: true,
      imgLimit: 6,

      like:1,  //当前点赞书
      pageIndex: 1, // 当前页数
      pageSize: 5,  // 显示条数
      length:0,  //总条数
      dataList:[],  //截取后的条数

      contents: [],

      comment: [
        {
          content: "",
          pics: "",
          post: "",
          follow: ""
        }
      ],

      account: []
    };
  },

  methods: {

  
handleLike(){
  this.id = this.$route.query.id;
this.$axios({
  url:"/posts/like?id="+this.id,
  method:"GET",
headers:{
        Authorization: `Bearer ${this.$store.state.user.userInfo.token}`
  },
}).then(res=>{
if(status==0){
  this.like+=1
}else{
  this.like=this.like
}
})


},


onUploadChange(){},

    handleRemove(file, fileList) {//移除图片
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {//预览图片时调用
        console.log(file);
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
 
      beforeAvatarUpload(file) {//文件上传之前调用做一些拦截限制
        console.log(file);
        const isJPG = true;
        // const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;
 
        // if (!isJPG) {
        //   this.$message.error('上传头像图片只能是 JPG 格式!');
        // }
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      handleAvatarSuccess(res, file) {//图片上传成功
        console.log(res);
        console.log(file);
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      handleExceed(files, fileList) {//图片上传超过数量限制
        this.$message.error('上传图片不能超过6张!');
        console.log(file, fileList);
      },
      imgUploadError(err, file, fileList){//图片上传失败调用
        console.log(err)
        this.$message.error('上传图片失败!');
      },

    //提交数据
    handleCommit() {
      this.comment;
    },
     setDataList(){
            const start = (this.pageIndex - 1) * this.pageSize; 
            const end = start + this.pageSize; 
            this.dataList = this.account.slice(start, end);
        },
      handleSizeChange(value){
        // console.log(value)
            this.pageSize = value;
            this.pageIndex = 1;
            this.setDataList();
        },   
        handleCurrentChange(value){
            this.pageIndex = value;
            this.setDataList();
        },
  },
  mounted() {
    this.id = this.$route.query.id;
    this.$axios({
      url: "/posts?id=" + this.id,
      method: "get"
    }).then(res => {
      const { data } = res.data;
      this.contents = data;
    });

    this.$axios({
      url: "/posts/comments",
      method: "get"
    }).then(res => {
      const { data } = res.data;
      this.account=data
      this.length =this.account.length
      console.log(this.account)
      this.setDataList()
    })
    

    
  }
};
</script>

<style scoped lang="less">
.contoain{
  width: 1000px;
  margin:  0 auto;
  position: relative;
  .right{
    width:250px ;
    border: 1px solid #999;
    position: absolute;
    top: 0;
    right: 0;
  }
}

.box {
  width: 700px;
  // margin: 0 auto;
  margin-top: 20px;
}
.box1 /deep/ span img {
  width: 100%;
  
}
.box1 /deep/ a img {
  width: 100%;
}
.title > h1 {
  padding: 20px 0;
}
.post-info {
  padding: 20px;
  text-align: right;
  color: #999;
}
.tubiao {
  padding: 50px 0 20px;
  width: 700px;

  .ctrl-item {
    text-align: center;
    margin: 0 20px;
    color: orange;
    cursor: pointer;
    font-size: 20px;
    i {
      font-size: 28px;
    }
    p {
      font-size: 14px;
      margin-top: 5px;
      color: #666;
    }
  }
}

.comment {
  width: 700px;

  .cmt-info {
    font-size: 14px;
    margin-bottom: 10px;
    color: #666;
    span {
      float: right;
    }
  }
  .cmt-input {
    margin-bottom: 10px;

    width: 100%;
    display: block;
  }
  .button {
    justify-content: space-between;
    margin-bottom: 30px;

    button {
      font-size: 12px;
      height: 40px;
    }
  }
  .cmt-item {
    border: 1px solid #ddd;
    ul {
      padding: 20px 20px 5px;
      border: 1px solid #ddd;
      li {
        margin-bottom: 10px;
        font-size: 12px;
        color: #666;
      }
    }
  }
}
.cmt-list {
  border: 1px solid #ddd;
  .cmt-item {
    border: 1px dashed #ddd;
    padding: 20px 20px 5px;
  }
  .cmt-content {
    margin: 0 0 0 30px;
  }
}
</style>
