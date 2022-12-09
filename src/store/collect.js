export default {
    namespaced: true,
    state: {
        id: '',
        filedsData: {},
        filedsRef:[],
    },
    mutations: {
        UPDATEFILEDDATA(state, data) {
            state.filedsData[data.name] = data.value;
        },
        UPDATEFILEDSDATA(state, data) {
            state.filedsData = data;
        },
        UPDATEFILEDREF(state, data) {
            state.filedsRef[data.name] = data.value;
        },
        UPDATEFILEDSREF(state, data) {
            state.filedsRef = data;
        }
    },
    actions: {
        initFiledsData(context, data) {
            const filedsData = {};
            for (const filed of data) {
                let value = '';
                if (filed.type === 'file') {
                    value = [];
                }
                filedsData[filed.id] = value;
            }
            context.commit('UPDATEFILEDSDATA', filedsData);
            context.commit('UPDATEFILEDSREF', {});
        },
        updateFiledData(context, data) {
            if (data.type === 'text') {
                context.commit('UPDATEFILEDDATA', {
                    name: data.name,
                    value: data.value
                });
            } else if (data.type === 'file') {
                const oldArr = context.state.filedsData[data.name];
                if (typeof data.value === 'object') {
                    context.commit('UPDATEFILEDDATA', {
                        name: data.name,
                        value: [...oldArr, data.value]
                    });
                } else {
                    context.commit('UPDATEFILEDDATA', {
                        name: data.name,
                        value: [...oldArr.filter(item => item.id !== data.value)]
                    });
                }
                return context.state.filedsData[data.name];
            }
        },
        updateFiledRef(context, data) {
            context.commit('UPDATEFILEDREF',{
                name:data.name,
                value:data.value
            });
        },
        initPage(context, data) {
            context.commit('UPDATEREQDONE', false);

        }
    }
};