import Vue from 'vue'
const API_NAMES={
    'GetMetaInfo':'getMetaInfo.do',
    'SubmitWork':'submitWork.do',
    'GetSubmitResult':'getSubmitResult.do',
    'getSubmitList':'getSubmitList.do',
};

Vue.prototype.$API_NAMES = API_NAMES;
export default API_NAMES;
