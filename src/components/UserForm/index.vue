<template>
    <a-form-model layout="horizontal"
    >
        <UserFormComponents class="form-item"
        v-for="filed of fileds"
        :key="filed.id"
        :filed="filed"
        ref="ufcs"
        />
    </a-form-model>
</template>
<script>
import { mapState } from 'vuex';
import UserFormComponents from '@/components/UserFormComponents';
export default {
    name: 'UserForm',
    components:{UserFormComponents},
    computed: {
        ...mapState(['fileds']),
    }
}
</script>
<style lang="less" scoped>
</style>