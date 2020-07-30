import antd from 'ant-design-vue/es/locale-provider/zh_CN'
import momentCN from 'moment/locale/zh-cn'

const components = {
  antLocale: antd,
  momentName: 'zh-cn',
  momentLocale: momentCN
}

const locale = {
  'message': '-',
  'menu.home': '主页',
  'menu.dashboard': '仪表盘',
  'menu.setting': '用户管理',
  'menu.permissionSetting': '权限管理',
  'menu.roleSetting': '角色管理',
  'menu.dashboard.monitor': '监控页',
  'menu.dashboard.workplace': '工作台'
}

export default {
  ...components,
  ...locale
}
