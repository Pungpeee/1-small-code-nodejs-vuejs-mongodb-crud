export const member = {
    namespaced : true,
    state: {
        count: 0,
    },
    mutations: {
        increment(state, payload) {
            state.count += payload
        },
        decrement(state, payload) {
            state.count -= payload
        }
    },
    actions: {
        incrementby5(context) {
            context.commit("increment", 5)
        },
        decrementby5(context) {
            context.commit("decrement", 5)
        }
    },
}