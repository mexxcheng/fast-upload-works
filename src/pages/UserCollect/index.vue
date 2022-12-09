<template>
    <a-layout-content class="user-main" id="form-main">
        <div class="form-title">
            {{ detail.title }}
        </div>
        <div class="form-tips">
            <div class="form-tip">
                <span>收集者：</span>
                <span>{{ detail.author }}</span>
            </div>
            <div class="form-tip">
                <span>截止时间：</span>
                <span>{{ endTimestampStr }}</span>
            </div>
            <a-button key="list" type="link" @click="toList">
                查看提交名单
            </a-button>
        </div>
        <div class="form-desc">
            {{ detail.desc }}
        </div>
        <UserForm class="form-content" />
        <a-divider class="form-next-divider" />
        <div class="form-submit">
            <a-button type="primary" size="large" :style="{ width: '200px' }" @click="handleSubmit">
                提交
            </a-button>
        </div>
    </a-layout-content>
</template>
<script>
import dayjs from 'dayjs';
import { mapState } from 'vuex';
import UserForm from '@/components/UserForm';
import API_NAMES from '@/api/const';
export default {
    name: 'UserCollect',
    components: { UserForm },
    computed: {
        ...mapState(['title', 'author', 'endTimestamp', 'desc', 'formData', 'formRefs']),
        ...mapState(['id', 'detail', 'fileds']),
        ...mapState('collect', ['filedsData', 'filedsRef']),
        endTimestampStr() {
            return dayjs(this.detail.endTimestamp).format('YYYY-MM-DD MM:hh:ss');
        }
    },
    methods: {
        handleSubmit() {

            if (
                this.fileds.map(filed => {
                    let isEmpty = filed.required && this.filedsData[filed.id] == '';
                    this.filedsRef[filed.id].validateMessage = '改字段不能为空！';
                    this.filedsRef[filed.id].validateStatus = 'error';
                    return isEmpty;
                }).includes(true)

            ) {
                return this.$message.warning(
                    '必填字段不能为空！',
                    1,
                );
            }

            this.$store.dispatch('updateReqDone', false)
            this.$axios({
                method: 'POST',
                url: API_NAMES.SubmitWork,
                data: {
                    id: this.id,
                    form: this.filedsData
                }
            }).then(result => {
                if (result.status) {
                    this.$router.replace({
                        name: 'CollectResult',
                        params: {
                            id: this.id,
                            resultId: result.data.id
                        }
                    });
                } else {
                    this.$message.warning(
                        result.msg,
                        1,
                    );
                }

            }).finally(() => {
                this.$store.dispatch('updateReqDone', true);
            });
        },
        toList() {
            this.$router.push({
                name: 'SubmitList',
                params: {
                    id: this.id
                }
            });
        }
    },
    watch: {
        fileds() {
            const fileds = this.fileds;
            this.$store.dispatch('collect/initFiledsData', fileds);
        }
    },
    mounted() {
        // console.log(this.$refs);
    }
}
</script>
<style lang="less" scoped>
.user-main {
    background: #fff;
    margin: 18px auto;
    min-width: 900px;
    border-radius: 10px;
    padding: 20px;
}

@media screen and (max-device-width: 600px) {
    .user-main {
        width: 100%;
        min-width: 100%;
    }
}

.form-title {
    outline: none;
    font-size: 32px;
    font-weight: 400;
    opacity: 1;
    height: 48px;
    min-height: 48px;
    max-height: 768px;
    overflow-y: hidden;
    color: #333;
}

.form-tips {
    margin-top: 20px;
    display: flex;

    .form-tip {
        padding-left: 0.75rem;
        padding-right: 0.75rem;
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
        color: rgba(0, 0, 0, .85);
        font-size: 14px;
        cursor: text;
        display: flex;
        background-color: rgb(240, 240, 240);
        box-sizing: border-box;
        margin-right: 8px;
        border-radius: 8px;
    }
}

.form-desc {
    margin-top: 20px;
}

.form-content {
    margin-top: 20px;
}

.form-next-divider {
    margin-top: 80px;
    height: 2px;
}

.form-submit {
    width: 200px;
    margin: 20px auto 20px auto;
    text-align: center;
}
</style>