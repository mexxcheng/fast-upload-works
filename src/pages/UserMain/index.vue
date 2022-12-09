<template>
    <router-view></router-view>
</template>
<script>
export default {
    name: 'UserMain',
    mounted() {
        let { id } = this.$route.params;
        this.$store.dispatch('initMainPage', { id });
    }
}
</script>
<style lang="less" scoped>

</style>