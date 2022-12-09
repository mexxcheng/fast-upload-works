<template>
    <a-layout-content class="user-main user-success">
        <a-result class="result-success" status="success" :title="title">
            <template #extra>
                <a-button key="list" type="primary" @click="toList">
                    查看名单
                </a-button>
                <a-button key="form" @click="toForm">
                    再交一份
                </a-button>
            </template>
            <div class="desc">
                <p style="font-size: 16px;">
                    <strong>《{{ taskTitle }}》&nbsp;提交详情：</strong>
                </p>
                <p v-for="filed of mergeFileds">
                    <a-icon :style="{ color: 'green' }" type="check" />
                    <strong>
                        {{ filed.name }}:
                    </strong>
                    <span>
                        {{ filed.value }}
                    </span>
                </p>
            </div>
        </a-result>
    </a-layout-content>
</template>
<script>
import qs from 'qs';
import dayjs from 'dayjs';
export default {
    name: 'UserSuccess',
    data() {
        return {
            resultId: '',
            title: '加载中...',
            fileds: [],
            taskTitle: '',
            submitTime: 4102415999000,
        }
    },
    computed: {
        submitTimeStr() {
            return dayjs(this.submitTime).format('YYYY-MM-DD HH:mm:ss');
        },
        mergeFileds() {
            return [
                ...this.fileds,
                {
                    name: '提交时间',
                    value: this.submitTimeStr
                }
            ]
        }
    },
    methods: {
        toForm() {
            // console.log('toForm');
            this.$router.push({
                name: 'InboxCollect',
                params: {
                    id: this.taskId
                }
            })
        },
        toList() {
            this.$router.push({
                name: 'SubmitList',
                params: {
                    id: this.taskId
                }
            });
        }
    },
    mounted() {
        let { id: taskId, resultId } = this.$route.params;
        this.taskId = taskId;
        this.resultId = resultId;
        this.$store.dispatch('updateReqDone', false);
        this.$axios(this.$API_NAMES.GetSubmitResult + '?' + qs.stringify({
            id: taskId,
            resultId
        })).then(result => {
            if (result.status) {
                this.title = result.data.title;
                this.submitTime = result.data.submitTime;
                this.fileds = result.data.fileds;
                this.taskTitle = result.data.detail.title;
            }
            // console.log(result);
        }).finally(e => {
            this.$store.dispatch('updateReqDone', true);
        });
    }

}
</script>
<style lang="less">
.user-main {

    margin: 18px auto;
    // min-width: 900px;
    min-width: 600px;

    // padding: 20px 64px;
}

.result-success {
    box-shadow: rgb(0 0 0 / 16%) 0px 6px 16px;
    background: #fff;
    border-radius: 10px;

    margin: 0 20px;
}

@media screen and (max-device-width: 600px) {
    .user-main {
        min-width: 100%;
    }
}

.success-row {
    height: 100%;
}

.success-cover {
    background: rgb(247, 249, 251);
    height: 100%;
}
</style>