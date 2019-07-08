<template>
  <div class="detailsComment">
    <div>
      <el-row type="flex" justify="center" class="commentIcon">
        <div class="ctrl-item">
          <i class="iconfont iconpinglun"></i>
          <p>
            评论(
            <span>100</span>)
          </p>
        </div>
        <div class="ctrl-item">
          <i class="iconfont iconstar1"></i>
          <p>收藏</p>
        </div>
        <div class="ctrl-item">
          <i class="iconfont iconfenxiang"></i>
          <p>分享</p>
        </div>
        <div class="ctrl-item">
          <i class="iconfont iconding"></i>
          <p>
            点赞(
            <span>8</span>)
          </p>
        </div>
      </el-row>
      <div class="cot_wrapper">
        <h4>评论</h4>
        <textarea
          autocomplete="off"
          placeholder="说点什么吧..."
          class="el-textarea__inner"
          style="resize: none; min-height: 33px;"
        ></textarea>
        <!-- 上传图片 -->
        <el-row class="uploadPictures" type="flex" justify="space-between">
          <div>
            <el-upload
              action="https://jsonplaceholder.typicode.com/posts/"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt />
            </el-dialog>
          </div>
          <div>
            <el-button type="primary">提交</el-button>
          </div>
        </el-row>
        <!-- 回复评论 -->
        <div class="cmt-list">
          <div class="cmt-item">
            <div class="cmt-info">
              <img src="http://157.122.54.189:9095/assets/images/avatar.jpg" />
              地球发动机
              <i>2019-07-05 5:24</i>
              <span>1</span>
            </div>
            <div class="cmt-content">
              <div class="cmt-new">
                <p class="cmt-message">评论怎么写</p>
                <div class="cmt-ctrl">
                  <a href="javascript:;">回复</a>
                </div>
              </div>
            </div>
          </div>
          <div class="cmt-item">
            <div class="cmt-info">
              <img src="http://157.122.54.189:9095/assets/images/avatar.jpg" />
              地球发动机
              <i>2019-07-05 5:24</i>
              <span>1</span>
            </div>
            <div class="cmt-content">
              <div class="cmt-new">
                <p class="cmt-message">评论怎么写</p>
                <div class="cmt-ctrl">
                  <a href="javascript:;">回复</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 分页 -->
        <div class="paging">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage4"
            :page-sizes="[100, 200, 300, 400]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="400"
          ></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4
    };
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
};
</script>

<style scoped lang='less'>
.detailsComment {
  margin-bottom: 20px;
  .commentIcon {
    .ctrl-item {
      margin: 0 20px;
      cursor: pointer;
      i {
        color: orange;
        display: block;
        font-size: 28px;
        text-align: center;
      }
      p {
        color: #999;
        font-size: 14px;
        margin-top: 5px;
      }
    }
  }
  .cot_wrapper {
    h4 {
      margin-bottom: 20px;
      font-weight: 400;
      font-size: 18px;
    }
    .uploadPictures {
      margin-top: 10px;
    }
    .cmt-list {
      border: 1px solid #ddd;
      margin-top: 40px;
      .cmt-item {
        padding: 20px 20px 5px 20px;
        &:first-child{
          border-bottom: 1px dashed #ddd;
        }
        .cmt-info {
          color: #666;
          vertical-align: top;
          font-size: 12px;
          img {
            // display: block;
            width: 16px;
            height: 16px;
          }
          i {
            font-style: normal;
            margin-left: 5px;
          }
          span {
            display: block;
            float: right;
          }
        }
        .cmt-content {
          padding-left: 30px;
          .cmt-new {
            .cmt-message {
              margin-top: 10px;
            }
            .cmt-ctrl {
              color: #1e50a2;
              height: 20px;
              line-height: 20px;
              font-size: 12px;
              text-align: right;  
              &:hover a{
                  display: block;
                }
              a {
                display: none;
                text-decoration: underline;
              }
            }
          }
        }
      }
    }
  }
  .paging{
    margin-top: 10px;
  }
}
</style>
