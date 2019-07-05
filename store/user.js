

export const state =()=>{
    return{
        userInfo :{
            token:'',
            user:{}
        }
    }
}
export const mutations = {
    // 3.把请求回来的数据赋值给state下的userInfo
        setUserInfo(state,data){
            state.userInfo=data
        },

        outUserInfo(state){
        state.userInfo = {
            token: "",
            user: {}
        }
    }

};

export const actions = {

    // 2.接收传递过来的数据并发起请求把请求回来的数据发送给mutations下的setUserInfo
    logo({commit},data){
        return this.$axios({
            url:"/accounts/login",
            method:"POST",
            data
        }).then(res => {
            // console.log(res);
            commit("setUserInfo",res.data);
                console.log(res.data);
            Promise.resolve();
        })
    }


};