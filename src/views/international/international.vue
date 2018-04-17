<style lang="less">
    @import './international.less';
</style>

<template>
    <!--<Row>-->
    <!--&lt;!&ndash;<Col span="24" type="flex" justify="start">&ndash;&gt;-->
    <!--&lt;!&ndash;<Input v-model="value4" icon="ios-clock-outline" placeholder="Enter something..." style="width: 200px"></Input>&ndash;&gt;-->
    <!--&lt;!&ndash;</Col>&ndash;&gt;-->
    <!--<Col span="24" type="flex" justify="end">-->
    <!--<Button type="primary">新增</Button>-->
    <!--</Col>-->
    <!--</Row>-->
    <Table border :columns="columns7" :data="data6"></Table>
</template>
<!--id/name/link h5/submit认证方式/create_time/edit-->
<script>
    export default {
        data() {
            return {
                // value4: '输入查询内容',
                columns7: [
                    {
                        title: 'ID',
                        key: 'id'
                    },
                    {
                        title: 'Name',
                        key: 'name',
                        render: (h, params) => {
                            return h('div', [
                                h('Icon', {
                                    props: {
                                        type: 'person'
                                    }
                                }),
                                h('strong', params.row.name)
                            ]);
                        }
                    },
                    {
                        title: 'Link h5',
                        key: 'link_h5'
                    },
                    {
                        title: 'Submit',
                        key: 'submit'
                    },
                    {
                        title: 'Create_time',
                        key: 'create_time'
                    },
                    {
                        title: 'Action',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.show(params.index)
                                        }
                                    }
                                }, 'View'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.index)
                                        }
                                    }
                                }, 'Delete')
                            ]);
                        }
                    }
                ],
                data6: [
                    {
                        id: '1',
                        name: '百度推广',
                        link_h5: 'http://baidu.com',
                        submit: '人行征信',
                        create_time:'2017 年12月9日',
                    },
                    {
                        id: '1',
                        name: '今日头条',
                        link_h5: 'http://baidu.com',
                        submit: '人行征信',
                        create_time:'2017 年12月9日',
                    },
                    {
                        id: '1',
                        name: '360推广',
                        link_h5: 'http://baidu.com',
                        submit: '人行征信',
                        create_time:'2017 年12月9日',
                    },
                    {
                        id: '1',
                        name: '搜狐',
                        link_h5: 'http://baidu.com',
                        submit: '人行征信',
                        create_time:'2017 年12月9日',
                    }
                ]
            }
        },
        methods: {
            show(index) {
                this.$Modal.info({
                    title: 'User Info',
                    content: `Name：${this.data6[index].name}<br>Age：${this.data6[index].age}<br>Address：${this.data6[index].address}`
                })
            },
            remove(index) {
                this.data6.splice(index, 1);
            }
        }
    }
</script>
