<template>
  <a-modal :title="'新增角色'" :visible="visible" @cancel="handleCancel" @ok="handleOk">
    <a-form :form="form">
      <a-form-item
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        label="角色名"
      >
        <a-input
          v-decorator="[
            'name',
            { rules: [{ required: true, message: '请输入角色说明' }] },
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
              initialValue: 'UserSetting',
              rules: [{ required: true, message: '请选择 Code' }]
            }
          ]"
        >
          <a-select-option v-for="(item, index) in codeList" :key="index" :value="item">
            {{ item }}
          </a-select-option>
        </a-select>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
export default {
  name: 'AddModal',
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
			},
			codeList: ['UserSetting', 'PermissionSetting', 'Home']
    }
  },
  methods: {
    handleCancel () {
      this.$emit('update:visible', false)
      this.form.resetFields()
    },
    handleOk () {
      this.form.validateFields((err, values) => {
        if (!err) {
          this.$store.dispatch('AddRole', values).then(() => {
            this.$message.info('新增成功')
            this.handleCancel()
            this.form.resetFields()
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
