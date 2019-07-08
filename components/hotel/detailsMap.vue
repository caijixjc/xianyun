<template>
  <div class="bigContainer">
    <el-row type="flex" class="map" justify="space-between">
      <!-- 2、页面显示地图，需要配置和创建id为container的div -->
      <div id="container"></div>
      <!-- 6、路线规划 -->
      <div id="panel">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="风景" name="first">
            <ul>
              <li class="poi-list-item">
                <span class="name">夫子庙</span>
                <span class="distance">32.11公里</span>
              </li>
              <li class="poi-list-item">
                <span class="name">总统府</span>
                <span class="distance">34.23公里</span>
              </li>
              <li class="poi-list-item">
                <span class="name">杨柳村明清古建筑群</span>
                <span class="distance">11.44公里</span>
              </li>
              <li class="poi-list-item">
                <span class="name">方山风景区</span>
                <span class="distance">16.20公里</span>
              </li>
              <li class="poi-list-item">
                <span class="name">中华门</span>
                <span class="distance">31.57公里</span>
              </li>
              <li class="poi-list-item">
                <span class="name">老门东</span>
                <span class="distance">31.23公里</span>
              </li>
              <li class="poi-list-item">
                <span class="name">秦淮河</span>
                <span class="distance">32.01公里</span>
              </li>
              <li class="poi-list-item">
                <span class="name">石塘竹海景区</span>
                <span class="distance">19.83公里</span>
              </li>
              <li class="poi-list-item">
                <span class="name">钟山风景区梅花山</span>
                <span class="distance">33.81公里</span>
              </li>
              <li class="poi-list-item">
                <span class="name">中山陵</span>
                <span class="distance">33.88公里</span>
              </li>
            </ul>
          </el-tab-pane>
          <el-tab-pane label="交通" name="second">交通</el-tab-pane>
        </el-tabs>
      </div>
    </el-row>
    <div class="mapMessage">
      <el-row class="messageItem">
        <el-col :span="4" class="messageLeft">
          <span>基本信息</span>
        </el-col>
        <el-col :span="20" class="messageRight basicInformation">
          <el-col :span="6">
            <span>入住时间：14:00之后</span>
          </el-col>
          <el-col :span="6">
            <span>离店时间：12:00之前</span>
          </el-col>
          <el-col :span="6">
            <span>null/null</span>
          </el-col>
          <el-col :span="6">
            <span>酒店规模69间客房</span>
          </el-col>
        </el-col>
      </el-row>
      <el-row class="messageItem">
        <el-col :span="4" class="messageLeft">
          <span>主要设施</span>
        </el-col>
        <el-col :span="20" class="messageRight service">
          <span>外币兑换服务</span>
          <span>洗衣服务</span>
          <span>吹风机</span>
          <span>电梯</span>
        </el-col>
      </el-row>
      <el-row class="messageItem">
        <el-col :span="4" class="messageLeft">
          <span>停车服务</span>
        </el-col>
        <el-col :span="20" class="messageRight"><span>-</span></el-col>
      </el-row>
      <el-row class="messageItem">
        <el-col :span="4" class="messageLeft">
          <span>品牌信息</span>
        </el-col>
        <el-col :span="20" class="messageRight"><span>-</span></el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      map: "",
      activeName: "second"
    };
  },

  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  },

  //1、异步加载 JS API(引入高德地图的js文件)
  mounted() {
    //1.1 页面全部加载完毕之后执行
    window.onLoad = function() {
      // 1.3 创建地图的同时可以给地图设置中心点、级别、显示模式、自定义样式等的属性
      var map = new AMap.Map("container", {
        zoom: 11, //级别
        center: [116.397428, 39.90923], //中心点坐标
        viewMode: "3D" //使用3D视图
      });
      //4.1 调用插件的方法
      // 4.1.2 工具条，控制地图的缩放、平移等
      var toolbar = new AMap.ToolBar();
      map.addControl(toolbar);

      // 5、点标记
      //5.1 创建一个 Marker 实例：
      var marker = new AMap.Marker({
        position: new AMap.LngLat(116.39, 39.9), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
        title: "北京"
      });
      var marker2 = new AMap.Marker({
        position: new AMap.LngLat(117.50, 39.50), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
        title: "北京"
      });

      //5.2 将创建的点标记添加到已有的地图实例：
      map.add(marker,marker2);
    };

    //1.2 引入高德地图的js文件
    // 4、调用插件，需要加载特定的插件，可以在url后面添加上需要的插件，比如添加toolBar
    var url = `https://webapi.amap.com/maps?v=1.4.15&key=${"763aebf096e7824f4d4e14237beddac0"}&callback=onLoad&plugin=AMap.ToolBar,AMap.Driving`;

    var jsapi = document.createElement("script");
    jsapi.charset = "utf-8";
    jsapi.src = url;
    document.head.appendChild(jsapi);
  }
  //1、异步加载 JS API(引入高德地图的js文件)
};
</script>

<style scoped lang='less'>
.bigContainer {
  .map {
    height: 360px;
    margin-bottom: 40px;
    /* 3、为地图容器指点宽高*/
    #container {
      width: 650px;
      height: 360px;
    }
    #panel {
      padding-left: 20px;
      width: 360px;
      height: 100%;
      ul {
        height: 300px;
        overflow: auto;
        .poi-list-item {
          display: flex;
          color: #666;
          justify-content: space-between;
          margin: 0 20px 20px 10px;
        }
      }
    }
  }
  .mapMessage {
    margin-bottom: 40px;
    .messageItem{
      padding: 20px 10px;
      .messageLeft{

    }
    .messageRight{
      span{
        color: #666;
      }
    }
    .service{
      span{
        color: #666;
        border: 1px solid #eee;
        border-radius: 4px;
        padding: 4px 10px;
        background-color: #eee;
        margin-right: 10px;
      }
    }
    }
    
  }
}
</style>
