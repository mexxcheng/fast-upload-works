<template>
    <a-form-model-item :label="filed.title" :required="filed.required" :validateStatus="validateStatus"
        :help="validateMessage">
        <a-upload-dragger name="file" :multiple="true" :action="config.fileUrl" @change="handleChange">
            <p class="ant-upload-drag-icon">
                <a-icon type="inbox" />
            </p>
            <p class="ant-upload-text">
                点击或拖拽上传文件
            </p>
        </a-upload-dragger>
    </a-form-model-item>
</template>
<script>
import { mapState } from 'vuex';
export default {
    name: 'UserFormComponents_FileUpload',
    props: ['filed'],
    data() {
        return {
            validateStatus: 'success',
            validateMessage: ''
        }
    },
    computed: {
        ...mapState(['config']),
        ...mapState('collect', ['filedsData']),
    },
    methods: {
        handleChange(handleResult) {
            const { file } = handleResult;
            if (file.status === 'done' && file.response.status === true) {
                this.$store.dispatch('collect/updateFiledData', {
                    type: 'file',
                    name: this.filed.id,
                    value: {
                        url: file.response.data.urls[0],
                        name: file.name,
                        id: file.uid
                    }
                })
            } else if (file.status === 'removed') {
                this.$store.dispatch('collect/updateFiledData', {
                    name: this.filed.id,
                    value: file.uid
                })
            }
            this.validateMessage = '';
            this.validateState = 'success';
            if (this.filed.required && this.filedsData[this.filed.id].length === 0) {
                this.validateMessage = '该字段内容不能为空！';
                this.validateState = 'error';
            }
        }
    },
    mounted() {
        this.$store.dispatch('collect/updateFiledRef', {
            name: this.filed.id,
            value: this
        })
    }
}
</script>
<style lang="less" scoped>

</style>