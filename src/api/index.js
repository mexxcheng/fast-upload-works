import Vue from 'vue'
import axios from 'axios';

const instance=axios.create({
    baseURL:'/api'
});

instance.interceptors.response.use(function (response){
    return response.data;
});




Vue.prototype.$axios = instance;

export default instance;