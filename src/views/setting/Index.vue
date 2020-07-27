<template>
  <page-header-wrapper>
    <template v-slot:content>
      <p>筛选条件</p>
      <a-row :gutter="24" style="margin-bottom: 20px;">
        <a-col :span="8">
          <a-input type="text" placeholder="请输入搜索条件" />
        </a-col>
        <a-col :span="8">
          <a-button icon="search" type="primary">
            Search
          </a-button>
        </a-col>
      </a-row>
      <a-row>
        <a-button icon="plus" type="primary">
          新增
        </a-button>
      </a-row>
    </template>

    <div style="background: white;">
      <a-table :columns="columns" :data-source="tableData" />
    </div>
  </page-header-wrapper>
</template>

<script>
import { PageHeaderWrapper } from '@ant-design-vue/pro-layout'

export default {
  name: 'Setting',
  components: {
    PageHeaderWrapper
  },
  data () {
    return {
      tableData: [
        {
          key: '1',
          name: 'John Brown',
          age: 32,
          address: 'New York No. 1 Lake Park, New York No. 1 Lake Park',
          tags: ['nice', 'developer']
        },
        {
          key: '2',
          name: 'Jim Green',
          age: 42,
          address: 'London No. 2 Lake Park, London No. 2 Lake Park',
          tags: ['loser']
        },
        {
          key: '3',
          name: 'Joe Black',
          age: 32,
          address: 'Sidney No. 1 Lake Park, Sidney No. 1 Lake Park',
          tags: ['cool', 'teacher']
        }
      ],
      columns: [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          scopedSlots: { customRender: 'name' }
        },
        {
          title: 'Age',
          dataIndex: 'age',
          key: 'age',
          width: 80
        },
        {
          title: 'Address',
          dataIndex: 'address',
          key: 'address 1',
          ellipsis: true
        },
        {
          title: 'Long Column Long Column Long Column',
          dataIndex: 'address',
          key: 'address 2',
          ellipsis: true
        },
        {
          title: 'Long Column Long Column',
          dataIndex: 'address',
          key: 'address 3',
          ellipsis: true
        },
        {
          title: 'Long Column',
          dataIndex: 'address',
          key: 'address 4',
          ellipsis: true
        }
      ]
    }
  }
}
</script>

<style>
</style>
