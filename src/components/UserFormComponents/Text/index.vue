<template>
    <a-form-model-item :label="filed.title"
    :required="filed.required"
    :validateStatus="validateStatus"
    :help="validateMessage"
    >
        <a-input :placeholder="filed.tip" size="large" v-model="value" />
    </a-form-model-item>
</template>
<script>
export default {
    name: 'UserFormComponents_Text',
    data: () => ({
        value: '',
        validateStatus:'success',
        validateMessage:''
    }),
    computed: {
    },
    watch: {
        value(newValue) {
            this.$store.dispatch('collect/updateFiledData', {
                type:'text',
                name: this.filed.id,
                value: newValue
            });
            this.validateMessage = '';
            this.validateStatus = 'success';
            if (this.filed.required && newValue.trim() === '') {
                this.validateMessage = '该字段内容不能为空！';
                this.validateStatus = 'error';
            }
        }
    },
    props: ['filed'],
    mounted(){
        this.$store.dispatch('collect/updateFiledRef',{
            name:this.filed.id,
            value:this
        })
    }
}
</script>
<style lang="less" scoped>

</style>