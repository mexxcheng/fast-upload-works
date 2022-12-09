export default {
    namespaced: true,
    state: {
        id: '',

    },
    mutations: {
        INITPAGE(state, data) {
            Object.keys(data).forEach(name => state[name] = data[name]);
        }
    },
    actions: {
        initPage(context, data) {
            context.commit('UPDATEREQDONE', false);
            
        }
    }
};