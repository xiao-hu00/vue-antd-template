<template>
  <a-modal :title="'新增用户'" :visible="visible" @cancel="handleCancel" @ok="handleOk">
    <a-form :form="form">
      <a-form-item
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        label="用户名"
      >
        <a-input
          v-decorator="[
            'username',
            { rules: [{ required: true, message: '输入用户名' }] },
          ]"
          placeholder="请输入用户名"
        />
      </a-form-item>
      <a-form-item
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        label="密码"
      >
        <a-input
          type="password"
          v-decorator="[
            'password',
            { rules: [{ required: true, message: '输入密码' }] },
          ]"
          placeholder="请输入密码"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
export default {
	name: 'AddUserModal',
	props: {
		visible: {
			type: Boolean,
			default: false
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
			this.$emit('update:visible', false)
    },
    handleOk () {
      this.form.validateFields((err, values) => {
        if (!err) {
          this.$store.dispatch('AddUser', values).then(() => {
            this.$message.info('新增用户成功')
            this.handleCancel()
            this.form.resetFields()
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
