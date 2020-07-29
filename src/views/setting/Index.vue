<template>
  <page-header-wrapper>
    <template v-slot:content>
      <p>筛选条件</p>
      <a-row :gutter="24" style="margin-bottom: 20px;">
        <a-col :span="8">
          <a-input type="text" v-model="params.terms" placeholder="请输入关键字" />
        </a-col>
        <a-col :span="8">
          <a-button icon="search" type="primary" @click="searchUser()">
            搜索
          </a-button>
        </a-col>
        <a-col :span="8">
          状态：
          <a-radio-group @change="onChange" v-model="params.status" :default-value="0" button-style="solid">
            <a-radio-button :value="0">
              全部
            </a-radio-button>
            <a-radio-button :value="1">
              启用
            </a-radio-button>
            <a-radio-button :value="2">
              停用
            </a-radio-button>
          </a-radio-group>
        </a-col>
      </a-row>
      <a-row>
        <a-button icon="plus" type="primary" @click="addUser">
          新增
        </a-button>
      </a-row>
    </template>

    <div style="background: white; padding: 15px;">
      <a-table
        border
        :row-key="record => record.id"
        :load="loading"
        :columns="columns"
        :data-source="tableData"
        :pagination="pagination"
        @change="handleTableChange">
        <template slot="status" slot-scope="text">
          <span>{{ text ? '启用' : '停用' }}</span>
        </template>
        <template slot="action" slot-scope="text, record">
          <a-button @click="editItem(record)">编辑</a-button>
          <a-button style="margin-left: 15px;" @click="handleItem(record)">{{ record.status ? '停用' : '启用' }}</a-button>
          <a-button style="margin-left: 15px;" @click="deleteItem(record.id)">删除</a-button>
        </template>
      </a-table>
    </div>
    <add-user-modal :visible.sync="visible" @updateUserList="updateUserList"/>
    <update-user-modal :updateVisible.sync="updateVisible" :item="item" @updateUserList="updateUserList"/>
  </page-header-wrapper>
</template>

<script>
import { PageHeaderWrapper } from '@ant-design-vue/pro-layout'
import AddUserModal from './components/AddUserModal'
import UpdateUserModal from './components/UpdateUserModal'

export default {
  name: 'Setting',
  components: {
    PageHeaderWrapper,
    AddUserModal,
    UpdateUserModal
  },
  data () {
    return {
      visible: false,
      updateVisible: false,
      loading: false,
      item: {},
      pagination: {
        pageSize: 10,
        total: 0
      },
      startDate: null,
      endDate: null,
      id: null,
      params: {
        status: 0,
        terms: '',
        offset: 0,
        limit: 10
      },
      tableData: [],
      columns: [
        {
          title: 'Id',
          dataIndex: 'id',
          key: 'id',
          width: 80
        },
        {
          title: '用户名',
          dataIndex: 'username',
          key: 'username'
        },
        {
          title: '状态',
          dataIndex: 'status',
          key: 'status',
          scopedSlots: { customRender: 'status' }
        },
        {
          title: '创建时间',
          dataIndex: 'createdAt',
          key: 'createdAt'
        },
        {
          title: '操作',
          dataIndex: 'action',
          key: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ]
    }
  },
  created () {
    this.getUserList()
  },
  methods: {
    addUser () {
      this.visible = true
    },
    onChange () {
      this.getUserList()
    },
    handleTableChange (pagination, filters, sorter) {
      this.getUserList(pagination)
      this.pagination = pagination
    },
    updateUserList () {
      // 不换页更新
      this.getUserList(this.pagination)
    },
    editItem (item) {
      this.item = item
      this.updateVisible = true
    },
    handleItem (item) {
      console.log(item)
    },
    searchUser () {
      this.params.offset = 0
      this.params.limit = 10
      this.pagination.current = 1
      this.getUserList()
    },
    deleteItem (id) {
      this.$confirm({
        title: '删除用户',
        content: '是否要删除此用户？',
        onOk: () => {
          this.$store.dispatch('DeleteUser', { id }).then(() => {
            this.$message.info('删除用户成功')
            this.updateUserList()
          })
        }
      })
    },
    getUserList (pagination) {
      const params = { ...this.params }
      if (params.terms === '') {
        delete params.terms
      }
      if (params.status === 0) {
        delete params.status
      } else {
        params.status = params.status === 1
      }
      if (pagination) {
        params.offset = params.limit * (pagination.current - 1) || params.offset
      }
      this.loading = true
      this.$store.dispatch('SearchUser', params).then(res => {
        this.tableData = res.rows
        this.pagination.total = res.totals
      }).finally(() => {
        this.loading = false
      })
    }
  }
}
</script>

<style>
</style>
