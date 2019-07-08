<template>
    <div>
        <div id="container"></div>
    </div>
</template>

<script>
export default {
    mounted(){
        window.onLoad  = function(){
            var map = new AMap.Map('container', {
                zoom:11,//级别
                center: [116.397428, 39.90923],//中心点坐标
                viewMode:'3D'//使用3D视图
            });
        }
        var url = 'https://webapi.amap.com/maps?v=1.4.15&key=d080282b68744a4a092ec7017d36e75e&callback=onLoad';
        var jsapi = document.createElement('script');
        jsapi.charset = 'utf-8';
        jsapi.src = url;
        document.head.appendChild(jsapi);
    }
}

</script>

<style>
#container{
    width: 100%;
    height: 260px;
}
</style>
