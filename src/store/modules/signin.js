export const signin = {
    namespaced: true,
    state: {
        user_id:0,
        role: "",
        isSignIn: false,
        
    },
    mutations: {
        setRole(state, payload) {
            state.role = payload
        },
        setUserId(state, payload){
            state.user_id = payload
        }
        // signInStatus(state) {
        //     if (state.role !== "" || state.role !== null || state.role !== undefined) {
        //         state.isSignIn = true;
        //     }else{
        //         state.isSignIn = false;
        //     }
        // }
    },
    actions: {
        setRole(context, payload) {
            context.commit("setRole", payload)
        },
        setUserId(context, payload){
            context.commit("setUserId",payload)
        }
        // signInStatus(context, payload){
        //     context.commit("signInStatus",payload)
        // }
        
    },
}