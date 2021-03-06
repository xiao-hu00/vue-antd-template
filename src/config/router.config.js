// eslint-disable-next-line
import { UserLayout, BasicLayout, BlankLayout } from '@/layouts'

const RouteView = {
  name: 'RouteView',
  render: (h) => h('router-view')
}

export const asyncRouterMap = [

  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: 'menu.home', permission: [ 'ADMIN' ] },
    redirect: '/dashboard',
    children: [
      // dashboard
      {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('@/views/dashboard/Workplace'),
        meta: { title: 'menu.dashboard', keepAlive: false, permission: [ 'ADMIN' ] }
      },
      {
        path: '/setting',
        name: 'Setting',
        component: () => import('@/views/userSetting/Index'),
        meta: { title: 'menu.setting', keepAlive: false, permission: [ 'ADMIN' ] }
      },
      {
        path: '/permissionSetting',
        name: 'Permission',
        component: () => import('@/views/permission/Index'),
        meta: { title: 'menu.permissionSetting', keepAlive: false, permission: [ 'ADMIN' ] }
      },
      {
        path: '/roleSetting',
        name: 'Role',
        component: () => import('@/views/role/Index'),
        meta: { title: 'menu.roleSetting', keepAlive: false, permission: [ 'ADMIN' ] }
      },

      // Exception
      {
        path: '/exception',
        name: 'exception',
        component: RouteView,
        hidden: true,
        redirect: '/exception/403',
        meta: { title: '异常页', icon: 'warning', permission: [ 'ADMIN' ] },
        children: [
          {
            path: '/exception/403',
            name: 'Exception403',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/403'),
            meta: { title: '403', permission: [ 'ADMIN' ] }
          },
          {
            path: '/exception/404',
            name: 'Exception404',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404'),
            meta: { title: '404', permission: [ 'ADMIN' ] }
          },
          {
            path: '/exception/500',
            name: 'Exception500',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/500'),
            meta: { title: '500', permission: [ 'ADMIN' ] }
          }
        ]
      }
    ]
  },
  {
    path: '*', redirect: '/404', hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
      },
      {
        path: 'recover',
        name: 'recover',
        component: undefined
      }
    ]
  },

  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  }

]
