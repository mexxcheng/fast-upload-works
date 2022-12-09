<template>
    <div>
        <FormText v-if="filed.type === 'text'" :filed="filed"/>
        <FormFileUpload v-if="filed.type === 'file'" :filed="filed" />
    </div>
</template>
<script>
import FormText from '@/components/UserFormComponents/Text';
import FormFileUpload from '@/components/UserFormComponents/FileUpload';
export default {
    name: 'UserFormComponents',
    components: {
        FormText,
        FormFileUpload
    },
    props: ['filed']
}
</script>
<style lang="less" scoped>

</style>