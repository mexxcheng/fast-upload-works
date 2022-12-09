<template>
    <a-layout-content class="user-list">
        <a-page-header :title="showTitle" :sub-title="endTimeShow" class="user-header" @back="backPage" />
        <a-table :columns="columns" size="small" :data-source="handledData" class="user-table" :pagination="false">
            <template slot="title">
                <a-checkbox v-model:value="showAll">
                    显示完整数据
                </a-checkbox>
            </template>
            <a-tag color="pink" slot="latest" slot-scope="latest" :color="latest ? '#108ee9' : '#f50'">
                {{ latest ? '最新' : '替换' }}
            </a-tag>
            <a-popover placement="bottom" slot="file" slot-scope="list">
                <template slot="content">
                    <p v-for="(file, index) of list" :key="index" :style="{ marginBottom: '5px' }">{{ file.name }}</p>
                </template>
                <template slot="title">
                    <span>文件目录</span>
                </template>
                <span :style="{ cursor: 'pointer' }">{{ list.length }}件</span>
            </a-popover>
        </a-table>
    </a-layout-content>

</template>
<script>
import qs from 'qs';
import dayjs from 'dayjs';

export default {
    name: 'UserSubmitList',
    data() {
        return {
            title: false,
            endTime: 4102415999000,
            taskId: '',
            showAll: true,
            data: [],
            columns: [],
            columnsTempalte: [
                {
                    align: 'center',
                    dataIndex: 'timestamp',
                    title: '提交时间',
                    key: 'timestamp',
                    customRender: text => dayjs(text).format('YYYY-MM-DD HH:mm:ss')
                },
                {
                    align: 'center',
                    dataIndex: 'latest',
                    title: '状态',
                    key: 'latest',
                    scopedSlots: { customRender: 'latest' },
                }
            ]
        }
    },
    computed: {
        showTitle() {
            return this.title === false ?
                '加载中...' :
                this.title + ' 提交情况'
        },
        endTimeShow() {
            return '截止时间:' + dayjs(this.endTime).format('YYYY-MM-DD HH:mm:ss');
        },
        handledData() {
            return this.data.filter(item => this.showAll || item.latest);
        }
    },
    methods: {
        backPage() {
            this.$router.back();
        }
    },
    mounted() {
        let { id: taskId } = this.$route.params;
        this.taskId = taskId;
        this.columns = [...this.columnsTempalte];
        this.$store.dispatch('updateReqDone', false);
        this.$axios(this.$API_NAMES.getSubmitList + '?' + qs.stringify({
            id: taskId,
        })).then(result => {
            console.log(result);
            if (result.status) {


                const detail = result.data.detail;
                const fileds = result.data.fileds;
                const list = result.data.list;

                const columns = [...this.columnsTempalte];
                fileds.reverse().forEach(filed => {
                    columns.unshift({
                        align: 'center',
                        dataIndex: 'form.' + filed.id,
                        title: filed.title,
                        key: filed.title,
                        scopedSlots: filed.type === 'file' ? { customRender: 'file' } : undefined,
                    });
                });
                columns.unshift({
                    align: 'center',
                    dataIndex: 'resultId',
                    title: '序号',
                    key: 'resultId',
                    customRender: (a, b, c) => c + 1
                });
                this.title = detail.title;
                this.columns = columns;
                this.data = list.map(item => Object.assign({}, item, { key: item.resultId }));
            }
        }).finally(e => {
            this.$store.dispatch('updateReqDone', true);
        });
    }
}
</script>
<style lang="less">
.user-list {
    background: #fff;
    margin: 18px auto;
    border-radius: 10px;

    .user-header {
        padding: 10px;
    }

    .user-table {

        padding: 0 20px;
        margin-bottom: 40px;
    }
}

@media screen and (max-device-width: 600px) {
    .user-list {
        width: 100%;
        min-width: 100%;
    }

}
</style>