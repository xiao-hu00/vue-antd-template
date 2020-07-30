<template>
  <a-modal :title="'编辑角色'" :visible="updateVisible" @cancel="handleCancel" @ok="handleOk">
    <a-form :form="form">
      <a-form-item
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        label="角色名"
      >
        <a-input
          v-decorator="[
            'name',
            { rules: [{ required: true, message: '请输入角色说明' }], initialValue: item.name },
          ]"
          placeholder="输入角色说明"
        />
      </a-form-item>
      <a-form-item
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        label="Code"
      >
        <a-select
          :placeholder="'请选择'"
          v-decorator="[
            'code',
            {
              initialValue: item.code,
              rules: [{ required: true, message: '请选择 Code' }]
            }
          ]"
        >
          <a-select-option v-for="(m, index) in codeList" :key="index" :value="m">
            {{ m }}
          </a-select-option>
        </a-select>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
export default {
	name: 'UpdateModal',
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
      },
      codeList: ['UserSetting', 'PermissionSetting', 'Home']
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
          this.$store.dispatch('UpdateRole', values).then(() => {
						this.$message.info('更新成功')
						this.form.resetFields()
						this.handleCancel()
						this.$emit('updateList')
          })
        }
      })
    }
	}
}
</script>

<style>

</style>
