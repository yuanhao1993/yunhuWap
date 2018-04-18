<style lang="less">
    @import '../../styles/common.less';
    @import './access.less';
    @import '../../styles/table.less';
</style>

<template>
    <div>
        <Row type="flex" justify="start">
            <Col span="6" class="margin-top-20">
            <Input v-model="searchConName1" icon="search" @on-change="handleSearch1" placeholder="请输入姓名搜索..."
                   style="width: 200px"/>
            </Col>
        </Row>
        <Row type="flex" justify="end">
            <Col span="3" class="margin-bottom-10">
            <!--<router-link to="/index_new">-->
            <!--<i-button @click="newUser">新增</i-button>-->
            <!--</router-link>-->
            <i-button @click="newUser">新增</i-button>
            </Col>
        </Row>
        <Table border :columns="columns1" :data="data1"></Table>
        <Page :total="count" :current="1" @on-change="changePage"></Page>
        <Modal
                v-model="newUserFlag"
                title="客户基本信息"
                @on-ok="confirmUser"
                @on-cancel="cancelUser">
            <div>
                <i-form :model="newform" :rules="ruleValidate" :label-width="80">
                    <Form-item label="渠道名称" prop="name">
                        <i-input v-model="newform.name" placeholder="请输入渠道名称"></i-input>
                    </Form-item>
                    <Form-item label="认证方式">
                        <i-select v-model="newform.check_ways" multiple placeholder="请选择(支持多选)">
                            <i-option v-for="item in checkways" :value="item.id">{{ item.name}}</i-option>
                        </i-select>
                    </Form-item>
                </i-form>
            </div>
        </Modal>
        <Modal
                v-model="editUserFlag"
                title="修改客户基本信息"
                @on-ok="confirmEdit"
                @on-cancel="cancelEdit">
            <div>
                <i-form :model="editform" :rules="ruleValidate" :label-width="80">
                    <Form-item label="渠道名称" prop="name">
                        <i-input v-model="editform.name" placeholder="请输入渠道名称"></i-input>
                    </Form-item>
                    <Form-item label="认证方式">
                        <i-select v-model="editform.check_ways" multiple placeholder="请选择(支持多选)">
                            <i-option v-for="item in checkways" :value="item.id">{{ item.name}}</i-option>
                        </i-select>
                    </Form-item>
                </i-form>
            </div>
        </Modal>
    </div>
</template>

<script>
  import { fetchList, checkWays, newChannel, editChannel } from '@/api/channel'

  export default {
    data () {
      return {
        searchConName1: '',
        newUserFlag: false,
        editUserFlag: false,
        columns1: [
          {
            title: 'ID',
            key: 'id'
          },
          {
            title: '渠道名称',
            key: 'name',
            render: (h, params) => {
              return h('div', [
                h('strong', params.row.name)
              ])
            }
          },
          {
            title: 'Link h5',
            key: 'link_h5'
          },
          {
            title: '认证方式',
            width: 150,
            key: 'check_ways_get',
            render: (h, params) => {
              return h('div', [
                h('Tag', {
                  props: [11, 22, 33],
                  style: {
                    marginRight: '2px'
                  },
                }, params.row.name),
                h('Tag', params.row.name)
              ])
            }
          },
          {
            title: '创建时间',
            key: 'create_time'
          },
          {
            title: '操作',
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
                      this.show(params.row.id)
                      console.log('this.操作', params)
                    }
                  }
                }, '编辑'),
//                                h('Button', {
//                                    props: {
//                                        type: 'error',
//                                        size: 'small',
//                                    },
//                                    on: {
//                                        click: () => {
//                                            this.remove(params.index)
//                                        }
//                                    }
//                                }, 'Delete')
              ])
            }
          }
        ],
        data1: [],
        count: null,
        checkways: [],
        //modal-new
        newform: {
          name: '',
          check_ways: []
        },
        editform: {
          name: '',
          check_ways: []
        },
        ruleValidate: {
          name: [
            {required: false, message: '姓名不能为空', trigger: 'blur'}
          ],
          submit: [
            {required: false, type: 'array', min: 1, message: '至少选择一种认证方式', trigger: 'change'},
            {type: 'array', max: 2, message: '最多选择两种认证方式', trigger: 'change'}
          ],
        }
      }
    },
    created () {
      this.getChannelmodel()
      this.getChannelSubmit()
    },
    methods: {
      getChannelSubmit () {
        checkWays().then(response => {
          this.checkways = response.data.results
          console.log('认证方式', response.data.results)
        })
      },
      getChannelmodel () {
        fetchList().then(response => {
          this.data1 = response.data.results
          this.count = response.data.count
          console.log('this.data1', this.data1)
          console.log('this.count', this.count)
        })
      },
      newUser () {
        this.newUserFlag = true
      },
      search (data, argumentObj) {
        // console.log("00", data, argumentObj)
        let res = data
        let dataClone = data
        for (let argu in argumentObj) {
          console.log('argu', argu)
          if (argumentObj[argu].length > 0) {
            res = dataClone.filter(d => {
              return d[argu].indexOf(argumentObj[argu]) > -1
            })
            dataClone = res
          }
        }
        return res
      },
      handleSearch1 () {
        this.data1 = this.search(this.data1, {name: this.searchConName1})
      },
      show (id) {
        this.editUserFlag = true
        console.log('修改的当前客户的ID', id)
      },
      remove (index) {
        // this.data6.splice(index, 1);
      },
      //模态框
      confirmUser () {
        this.newUserFlag = false
        newChannel(this.newform).then(response => {
          console.log('新增的', response)
          this.getChannelmodel()
        })
      },
      cancelUser () {
        this.newUserFlag = false
      },
      //modal -edit
      confirmEdit () {
        this.editUserFlag = false
        newChannel(this.editform).then(response => {
          console.log('修改的', response)
        })
      },
      cancelEdit () {
        this.editUserFlag = false
      },
      changePage : function (page) {
        console.log('当前显示', page)
//        {'limit': 10, 'offset': '10'}
        fetchList().then(function (res) {
          console.log(this);
          this.data1 = res.data.results
          console.log('change', this.data1)
        })
      }
    }
  }
</script>


<style>
    .ivu-modal {
        top: 30%;
    }
</style>
