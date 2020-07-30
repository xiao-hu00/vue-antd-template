<template>
  <page-header-wrapper>
    <template v-slot:content>
      <p>筛选条件</p>
      <a-row :gutter="24" style="margin-bottom: 20px;">
        <a-col :span="8">
          <a-input type="text" v-model="params.terms" placeholder="请输入关键字" />
        </a-col>
        <a-col :span="8">
          <a-button icon="search" type="primary" @click="search()">
            搜索
          </a-button>
        </a-col>
      </a-row>
      <a-row>
        <a-button icon="plus" type="primary" @click="addRole()">
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
        <template slot="action" slot-scope="text, record">
          <a-button @click="editItem(record)">编辑</a-button>
          <!-- <a-button style="margin-left: 15px;" @click="handleItem(record)">{{ record.status ? '停用' : '启用' }}</a-button> -->
          <a-button style="margin-left: 15px;" @click="deleteItem(record.id)">删除</a-button>
        </template>
      </a-table>
    </div>
    <add-modal :visible.sync="visible" @updateList="updateList"/>
    <update-modal :updateVisible.sync="updateVisible" :item="item" @updateList="updateList"/>
  </page-header-wrapper>
</template>

<script>
import { PageHeaderWrapper } from '@ant-design-vue/pro-layout'
import AddModal from './components/AddModal'
import UpdateModal from './components/UpdateModal'

export default {
  name: 'Permisson',
  components: {
    PageHeaderWrapper,
    AddModal,
    UpdateModal
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
          title: '名称',
          dataIndex: 'name',
          key: 'name'
        },
        {
          title: 'CODE',
          dataIndex: 'code',
          key: 'code'
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
    this.getList()
  },
  methods: {
    addRole () {
      this.visible = true
    },
    onChange () {
      this.getList()
    },
    handleTableChange (pagination, filters, sorter) {
      this.getList(pagination)
      this.pagination = pagination
    },
    updateList () {
      // 不换页更新
      this.getList(this.pagination)
    },
    editItem (item) {
      this.item = item
      this.updateVisible = true
    },
    handleItem (item) {
      console.log(item)
    },
    search () {
      this.params.offset = 0
      this.params.limit = 10
      this.pagination.current = 1
      this.getList()
    },
    deleteItem (id) {
      this.$confirm({
        title: '删除',
        content: '是否要删除？',
        onOk: () => {
          this.$store.dispatch('DeleteRole', { id }).then(() => {
            this.$message.info('删除成功')
            this.updateList()
          })
        }
      })
    },
    getList (pagination) {
      const params = { ...this.params }
      if (params.terms === '') {
        delete params.terms
      }
      if (pagination) {
        params.offset = params.limit * (pagination.current - 1) || params.offset
      }
      this.loading = true
      this.$store.dispatch('SearchRole', params).then(res => {
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
