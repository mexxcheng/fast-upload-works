<template>
    <div class="error-tip">
        <a-empty :description="errorDesc" />
    </div>
</template>
<script>
import { mapState } from 'vuex';
export default {
    name: 'UserError',
    data() {
        return {
            errorDesc: '数据不存在'
        }
    },
    mounted() {
        this.errorDesc = this.$route.query.msg ?? this.errorDesc;
    }
}
</script>
<style lang="less">
.error-tip {
    margin-top: 100px;
}
</style>