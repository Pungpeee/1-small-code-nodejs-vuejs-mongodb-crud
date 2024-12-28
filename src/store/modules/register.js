export const register = {
    namespaced: true,
    state: {
        role: "",
        // username:"",
    },
    mutations:{
        setRole(state,payload){
            state.role = payload
        },
        // setUsername(state,payload){
        //     state.username = payload
        // }
    },
    actions: {
        setRole(context,payload) {
            context.commit("setRole",payload)
        }
    },
}