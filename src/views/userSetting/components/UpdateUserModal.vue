<template>
  <a-modal :title="'编辑用户'" :visible="updateVisible" @cancel="handleCancel" @ok="handleOk">
    <a-form :form="form">
      <a-form-item
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        label="用户名"
      >
        <a-input
          v-decorator="[
            'username',
            { rules: [{ required: true, message: '输入用户名' }], initialValue: item.username },
          ]"
          placeholder="请输入用户名"
        />
      </a-form-item>
      <a-form-item
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        label="新的密码"
      >
        <a-input
          type="password"
          v-decorator="[
            'password',
            { rules: [{ required: true, message: '输入新的密码' }] },
          ]"
          placeholder="请输入新的密码"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
export default {
	name: 'UpdateUserModal',
	props: {
		updateVisible: {
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
			form: this.$form.createForm(this),
			formItemLayout: {
				labelCol: { span: 7 },
				wrapperCol: { span: 15 }
			}
		}
	},
	methods: {
		handleCancel () {
			this.$emit('update:updateVisible', false)
    },
    handleOk () {
      this.form.validateFields((err, values) => {
        if (!err) {
					values.id = this.item.id
          this.$store.dispatch('UpdateUser', values).then(() => {
						this.$message.info('更新用户信息成功')
						this.form.resetFields()
						this.handleCancel()
						this.$emit('updateUserList')
          })
        }
      })
    }
	}
}
</script>

<style>

</style>
