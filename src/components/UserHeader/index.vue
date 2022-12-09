<template>
    <a-layout-header class="user-header">
        <span class="user-title">📋文件收集箱</span>
    </a-layout-header>
</template>
<script>
export default {
    name:'UserHeader'
}
</script>
<style lang="less" scoped>
.user-header{
    background: #fff;
    .user-title{
        font-size: 28px;
        letter-spacing : 3px;
    }
}
</style>