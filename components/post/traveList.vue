<template>
    <div class="textBox">
        <div class="Input">
            <input type="text" placeholder="请输入你想去的地方，比如""广州"/>
            <i class="el-icon-search"></i>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="less">
.textBox{
    width: 700px;
    margin: 10px 30px;
    .Input{
        width: 100%;
        height: 40px;
        border: 3px solid orange;
        position: relative;
        input{
            width: 660px;
            height: 40px;
            line-height: 40px;
            border: none;
            flex: 1;
            padding: 0 20px;
            outline: none;
        }
        i{
            font-size: 28px;
            font-weight: 700;
            color: orange;
            position: absolute;
            right: 10px;
            top: 6px;

        }
    }
}
</style>
