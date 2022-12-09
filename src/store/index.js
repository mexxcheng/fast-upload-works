import Vue from 'vue'
import Vuex from 'vuex'
import qs from 'qs';
import $axios from '@/api';
import API_NAMES from '@/api/const';

import submitResult from '@/store/result';
import collect from '@/store/collect';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    config: {
      fileUrl: 'https://cdn-static.xxcheng.cn/uploads.do?type=wlgc-collection',
      fileUrl: 'https://home.xxcheng.cn:39003/uploads.do?type=wlgc-collection',
    },

    id: '',
    detail: {
      title: '',
      author: '',
      desc: '',
      endTimestamp: 4102415999000
    },
    fileds: [],


    reqDone: true,
    errorDesc: '数据为空',
    formList: [],
    formData: {},
    formRules: {},
    formRefs: {}
  },
  getters: {

  },
  mutations: {
    INITMAINPAGE(state, data) {
      state.id = data.id;
      state.detail = data.detail;
      state.fileds = data.fileds;
    },

    UPDATEFORMDATA(state, data) {
      state.formData[data['name']] = data.value;
    },
    INITPAGE(state, data) {
      Object.keys(data).forEach(name => state[name] = data[name]);
    },
    ADDFORMREF(state, data) {
      state.formRefs[data.name] = data.value;
    },
    UPDATEREQDONE(state, data) {
      state.reqDone = data;
    }
  },
  actions: {
    initMainPage(context, data) {
      context.commit('UPDATEREQDONE', false);
      return $axios(API_NAMES.GetMetaInfo + '?' + qs.stringify({
        id: data.id
      })).then(result => {
        if (result.status) {
          const fileds = result.data.fileds;
          const id = result.data.id;
          const detail = result.data.detail;
          context.commit('INITMAINPAGE', { fileds, id, detail });
        }
        context.commit('UPDATEREQDONE', true);
        return result;
      });
    },

    updateFormDataText(context, data) {
      context.commit('UPDATEFORMDATA', {
        name: data.name,
        value: data.value
      });
    },
    updateFormDataPush(context, data) {
      context.commit('UPDATEFORMDATA', {
        name: data.name,
        value: [...context.state.formData[data.name], data.value]
      });
    },
    updateFormDataFilter(context, data) {
      const oldArr = context.state.formData[data.name];
      context.commit('UPDATEFORMDATA', {
        name: data.name,
        value: [...oldArr.filter(item => item.id !== data.value)]
      });
    },
    addFormRef(context, data) {
      context.commit('ADDFORMREF', {
        name: data.name,
        value: data.value
      });
    },
    updateReqDone(context, data) {
      context.commit('UPDATEREQDONE', data);
    }
  },
  modules: {
    submitResult,
    collect
  }
});

