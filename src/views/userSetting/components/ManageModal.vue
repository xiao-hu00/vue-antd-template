<template>
  <a-modal :title="'角色管理'" :visible="manageVisible" @cancel="handleCancel" :footer="null">
    <p>用户名：{{ item.username }}</p>
    <p v-if="roleList.length === 0">暂无角色数据</p>
    <a-checkbox-group v-else style="width: 100%">
      <p>角色列表</p>
      <a-row :gutter="24" style="margin-bottom: 40px;">
        <a-col v-for="(m, index) in roleList" :key="index" :span="12" align="center">
          <a-checkbox @change="onChange" :value="m.code" :checked="m.selected">
            {{ m.name }}
          </a-checkbox>
        </a-col>
      </a-row>
    </a-checkbox-group>
  </a-modal>
</template>

<script>
export default {
	name: 'ManageModal',
	props: {
		manageVisible: {
			type: Boolean,
			default: false
    },
    item: {
      type: Object,
      default: () => {}
    }
	},
	data () {
		return {
			roleList: []
		}
	},
	watch: {
		manageVisible: {
			handler () {
				if (this.manageVisible) {
					this.getList()
				}
			}
		}
	},
	created () {
		this.getList()
	},
	methods: {
		handleCancel () {
			this.$emit('update:manageVisible', false)
		},
		onChange (e) {
      console.log('value = ', e.target.value)
			console.log('checked = ', e.target.checked)
			if (e.target.checked) {
				this.$store.dispatch('UserAddRole', { id: this.item.id, code: [e.target.value] }).then(() => {
					this.$message.info('新增用户角色成功')
				})
			} else {
				this.$store.dispatch('UserDeleteRole', { id: this.item.id, code: [e.target.value] }).then(() => {
					this.$message.info('删除用户角色成功')
				})
			}
    },
		getList () {
			this.$store.dispatch('GetRoleList', { id: this.item.id }).then((res) => {
				console.log('res', res)
				this.roleList = res
			})
		}
	}
}
</script>

<style>

</style>
