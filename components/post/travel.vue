
    <template >
  <div>
    <div>
      <el-row class="box2">
        <p
          @mouseenter="onMouseOver"
          @mouseleave="onMouseOut"
          v-for="(item,index) in children"
          :key="index"
        >
          {{item.type}}
          <i class="el-icon-arrow-right"></i>
        </p>
        <el-row class="box3" v-if="isCollapse">
          <div>
            <p>{{item}}</p>
          </div>
        </el-row>
        <h4>推荐城市</h4>
        <div class="imgs">
          <img src="@/assets/imges/pic_sea.jpeg" alt />
        </div>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: true,

      children: []
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    //移入
    onMouseOver() {
      this.isCollapse = true;
    },
    //移出
    onMouseOut() {
      this.isCollapse = false;
    }
  },
  mounted() {
    this.$axios({
      url: "/posts/cities",
      method: "get"
    }).then(res => {
      const { data } = res.data;
      console.log(data);
      this.children = data;
    });
  }
};
</script>
<style lang="less">
.box2 {
  width: 260px;
  height: 700px;
  margin-top: 10px;
  
  p {
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #ddd;
    padding: 0 20px;
    border: 1px solid #ddd;
    cursor: pointer;
    i {
      float: right;
      line-height: 40px;
    }
  }
  .box3 {
    position: absolute;
    left: 260px;
    top: 0;
  }

  .imgs>img{
    width: 260px;
  }
}

h4 {
  font-weight: 400;
  padding: 20px 0;
  border-bottom: 1px solid #ddd;
}
</style>
