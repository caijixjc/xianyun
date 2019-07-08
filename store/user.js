// 用户管理


// 在nuxt中不要创建store的实例，每个js模块nuxt会自动创建实例，
// 只需要关注state，mutations，actions

// export在nuxt中是固定写法
// state不能修改的，类似于vue组件中的data,用于声明仓库数据
// 调用一个第三方的库调用localstorage，会自动判断是浏览器还是服务器

export const state = ()=>{
    return{
        userInfo: process.browser? JSON.parse(localStorage.getItem('userInfo')) || {token:'',user:{}}: {error:"localstorge无法使用"},
        
        // userInfo : {
        //     token:'',
        //     user: {}
        // }
    }
}

export const mutations = {
    // 设置用户的数据
    setUserInfo(state,data){

        if(process.browser){
            localStorage.setItem('userInfo',JSON.stringify(data))
        }
        state.userInfo = data;
    },

    clearUserInfo(state){
        localStorage.removeItem('userInfo')
        state.userInfo = {
            token:'',
            user: {}
        }
    },
    //设置草稿箱
    // setDraft(state,data){
    //     state.draft = data;
    //     // state.draft.push(data)
    //     if(process.browser){
    //         localStorage.setItem('draft',JSON.parse(JSON.stringify(data)))
    //     }
    // }
}

export const actions = {
    login({commit},data){       
        return this.$axios({
            url: "/accounts/login",
            method: "POST",
            data
        }).then(res => {
            // 调用store下的mutations的方法
            commit("setUserInfo", res.data);

            // 调用login方法传入的成功的回调函数
            Promise.resolve();
        });
    },
    
    draft({commit},data){
        return this.$axios({
            url:'/post/create',
            method:'POST',
            data
        }).then(res=>{
            commit("setDraft",res.data);
            Promise.resolve();
        })
    }
}