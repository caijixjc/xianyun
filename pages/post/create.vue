<template>
    <el-row class="contain" type="flex">
        <el-row class="main">
           
            <div class="title">
                <h2>发表新攻略</h2>
                <div>分享你的个人游记，让更多人看到哦！</div>
            </div>
            <div class="allInput">
                <div class="form">
            <!-- <el-row>
                <input type="text" placeholder="请输入标题">
            </el-row> -->
                    <el-input class="input" placeholder="请输入标题" v-model="message.title"></el-input>
                    <div id="app">
                        <VueEditor :config="config" ref="vueEditor" class="RichTextBox"/>
                    </div>
                    
                    <div>选择城市 <el-input placeholder="请选择城市" class="city" v-model="message.city"></el-input></div>
                
                </div>
                <div class="button">
                    <span><el-button type="primary" class="issue" @click="handleGet"  >发布</el-button></span>
                    <span>或者</span>
                    <span> <a href="#" class="draft" @click='handleDraft'>保存到草稿</a></span>
                </div>
            </div>
        </el-row>
        <div class="DraftBox">
            <div class="draft_title">草稿箱 ( {{length}} )</div>
            <!-- <div v-for="(item1,index1) in draftBox" :key='index1' @click="handleYulan(index1)"></div> -->
            <div class="draft-list" v-for='(item,index) in draftBox' :key='index' @click="handleYulan(index)">
                <div><span class="iconfont el-icon-edit">{{item.title}}</span>
                <p>{{item.time}}</p>
                </div>
            </div>
        </div>
        
    </el-row>
</template>

<script>
import moment from "moment"
import "quill/dist/quill.snow.css"
let VueEditor;

if (process.browser) {  
    VueEditor = require('vue-word-editor').default
}

// import VueEditor from "vue-word-editor";

// 需要单独引入样式
// import "quill/dist/quill.snow.css"



export default {
name: 'app',
data(){
  return {
    config: {
      modules: { 
        // 工具栏
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
          ['blockquote', 'code-block'],
          ['image', 'video'],

          [{ 'header': 1 }, { 'header': 2 }],               // custom button values
          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
          [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
          [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
          [{ 'direction': 'rtl' }],                         // text direction
        ]
      },
      // 主题
      theme: 'snow',
      uploadImage: {
        url: "http://localhost:1337/upload",
        name: "files",
        uploadBefore(file){
          return true
        },
        uploadProgress(res){

        },
        uploadSuccess(res, insert){
          insert("http://localhost:1337" + res.data[0].url)
        },
        uploadError(){},
        showProgress: false
      },

      uploadVideo: {
        //url: "http://157.122.54.189:9095/upload",
        url: "http://localhost:1337/upload",
        name: "files",
        uploadBefore(file){
          return true
        },
        uploadProgress(res){

        },
        uploadSuccess(res, insert){
          insert("http://localhost:1337" + res.data[0].url)
        },
        uploadError(){},
      }
    },
    message:{
        content:'', //文章内容
        title:'', //文章标题
        city:''  //城市id | 城市名称
    },
    draftBox:[],
    time:'',
    length:''
  }
},

components: {
  VueEditor
},
mounted() {
    this.draftBox = JSON.parse(localStorage.getItem('draft')||'[]')
    this.length = this.draftBox.length


},
methods: {
    handleGet(){
        
       
    //    console.log(this.message);
       if(this.message.title==''){
           this.$message.error('请输入标题');
           return;
       }
       if(this.message.city==''){

           this.$message.error('请选择城市');
           return;
       }
       this.message.content=this.$refs.vueEditor.editor.root.innerHTML
       this.$axios({
           url:'/posts',
           method:'POST',
           data:this.message,
           headers:{
                Authorization: `Bearer ${this.$store.state.user.userInfo.token}`
                        },
            
       }).then(res=>{
           console.log(res.data);
           if(res.data.status==0){
            //    this.$router.push('/post/create')
                this.message = ''
                this.$refs.vueEditor.editor.root.innerHTML=''
                this.$message({
                    message: '发布成功',
                    type: 'success'
                });
           }
       })
        
    },
    handleDraft(){
        
        this.message.content=this.$refs.vueEditor.editor.root.innerHTML
        // this.$store.commit('user/setDraft',this.message);
        // this.$message.success('添加成功')
        // console.log(this.$store.state.user.draft);
        
        // console.log(this.draftBox);
        
        this.draftBox = JSON.parse(localStorage.getItem('draft')||'[]')  //从数据库拿数据

        this.time = new Date()
        // console.log(this.time);
        this.time= moment(this.time).format("YYYY-MM-DD");

        this.message.time=this.time
        this.draftBox.push(this.message)
        localStorage.setItem('draft',JSON.stringify(this.draftBox))  //将this.draftBox存入数据库里
        //获取草稿箱长度 渲染条数
        this.length = this.draftBox.length


        
        
    },
    handleYulan(index){
        // console.log(index);
        this.message.title = this.draftBox[index].title
        this.$refs.vueEditor.editor.root.innerHTML = this.draftBox[index].content
        this.message.city = this.draftBox[index].city
    }
    
},
}
</script>

<style scoped lang="less">
    .contain{
        padding-top: 20px;
        width: 1000px;
        
        margin: 0 auto;
        .main{
            width: 750px;
        }
        .DraftBox{
            width: 200px;
            height: 280px;
            margin-left: 30px;
            border: 1px solid #666;
            // border-radius: 5px 5px 5px 5px;
            border:1px solid rgba(200, 200, 200, 0.5);
            overflow: hidden;
            
        }
        
        .title{
            h2{
                font-weight: 400;
            }
            div{
                font-size: 12px;
                color: #999;
                padding-top: 10px;
            }
        }
        .allInput{
            padding-top: 15px;
            .input{
                padding-bottom: 10px;
                width: 100%;
            }
            .form{
                #app{
                    .RichTextBox{
                        height: 400px;
                    }
                }
                padding: 5px;
                
                .city{
                    width: 200px;
                    padding-top: 70px;
                }
                
                
            }
            .button{
                margin-bottom: 10px;
                    .draft{
                        color:seagreen
                    }
                }
        }
        .draft_title{
            padding: 5px;
            color: #666;
        }
        .draft-list{
            padding: 5px;
            div{
                span{
                    cursor: pointer;
                    &:hover{
                        color: salmon;
                    }
                }
                p{
                    font-size: 13px;
                }
            }
        }
    }
</style>
