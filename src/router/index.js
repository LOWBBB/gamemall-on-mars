import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [{
  path: '/login',
  component: () => import('@/views/login/index'),
  hidden: true
},

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: {
        title: '游戏销售系统',
        icon: 'dashboard'
      }
    }]
  },

  {
    path: '/editgame',
    component: Layout,
    hidden: true,
    children: [{
      path: 'index/:gid',
      name: 'editgame',
      component: () => import('@/views/editgame/index'),
      meta: {
        title: '编辑游戏',
        icon: 'form'
      }
    }]
  },
  {
    path: '/addgame',
    component: Layout,
    hidden: true,
    children: [{
      path: 'index',
      name: 'addgame',
      component: () => import('@/views/addgame/index'),
      meta: {
        title: '添加游戏',
        icon: 'form'
      }
    }]
  },
  {
    path: '/buygame',
    component: Layout,
    hidden: true,
    children: [{
      path: 'index/:gid',
      name: 'buygame',
      component: () => import('@/views/buygame/index'),
      meta: {
        title: '购买游戏',
        icon: 'form'
      }
    }]
  },

  {
    path: '/edituser',
    component: Layout,
    hidden: true,
    children: [{
      path: 'index/:uid',
      name: 'edituser',
      component: () => import('@/views/edituser/index'),
      meta: {
        title: '编辑玩家',
        icon: 'form'
      }
    }]
  },
  {
    path: '/adduser',
    component: Layout,
    hidden: true,
    children: [{
      path: 'index',
      name: 'adduser',
      component: () => import('@/views/adduser/index'),
      meta: {
        title: '添加玩家',
        icon: 'form'
      }
    }]
  },
  {
    path: '/editmerchant',
    component: Layout,
    hidden: true,
    children: [{
      path: 'index/:mcid',
      name: 'editmerchant',
      component: () => import('@/views/editmerchant/index'),
      meta: {
        title: '编辑商家',
        icon: 'form'
      }
    }]
  },
  {
    path: '/addmerchant',
    component: Layout,
    hidden: true,
    children: [{
      path: 'index',
      name: 'addmerchant',
      component: () => import('@/views/addmerchant/index'),
      meta: {
        title: '添加商家',
        icon: 'form'
      }
    }]
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
// 404 page must be placed at the end !!!
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]
/**
 * 动态路由
 */
export const asyncRoutes = [
  // 游客注册
  {
    path: '/example',
    component: Layout,
    children: [{
      path: 'userRegister',
      name: 'userRegister',
      component: () => import('@/views/userRegister/index'),
      meta: {
        title: '游客注册',
        icon: 'form',
        roles: ['user']
      }
    }]
  },
  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: {
      title: '游戏管理',
      icon: 'el-icon-s-help',
      roles: ['admin']
    },
    children: [{
      path: 'games',
      name: 'Games',
      component: () => import('@/views/games/index'),
      meta: {
        title: '游戏列表',
        icon: 'game'
      }
    },
      // {
      //   path: 'tree',
      //   name: 'Tree',
      //   component: () => import('@/views/tree/index'),
      //   meta: {
      //     title: 'Tree',
      //     icon: 'tree'
      //   }
      // }
    ]
  },
  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: {
      title: '玩家管理',
      icon: 'el-icon-s-help',
      roles: ['admin']
    },
    children: [{
      path: 'users',
      name: 'Uames',
      component: () => import('@/views/users/index'),
      meta: {
        title: '玩家列表',
        icon: 'user'
      }
    }
    ]
  },
  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: {
      title: '玩家管理',
      icon: 'el-icon-s-help',
      roles: ['admin']
    },
    children: [{
      path: 'merchants',
      name: 'Merchants',
      component: () => import('@/views/merchants'),
      meta: {
        title: '商家列表',
        icon: 'merchant'
      }
    }
    ]
  },
  // 此处功能没写好 暂时注释
  {
    path: '/chargemoney',
    component: Layout,
    redirect: 'noRedirect',
    name: 'ChargeMoney',
    meta: {
      title: '玩家充值',
      icon: 'el-icon-s-help',
      roles: ['user']
    },

    children: [
      {
        path: 'chargemoney',
        name: 'Chargemoney',
        component: () => import('@/views/chargemoney/index'),
        meta: {
          title: '玩家充值'
        }
      }
    ]
  },
  {
    path: '/mall',
    component: Layout,
    redirect: 'noRedirect',
    name: 'Mall',
    meta: {
      title: '商城',
      icon: 'goods',
      permissions: ['admin'],
      roles: ['user', 'merchant']
    },

    children: [
      {
        path: 'goodsList',
        name: 'GoodsList',
        component: () => import('@/views/mall/goodsList/index'),
        meta: {
          title: '游戏大厅'
        }
      }
    ]
  },
  // 商家游戏管理
  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: {
      title: '游戏管理',
      icon: 'el-icon-s-help',
      roles: ['merchant']
    },
    children: [{
      path: 'merchantgame',
      name: 'Merchantgame',
      component: () => import('@/views/merchantgame/index'),
      meta: {
        title: '我的游戏列表',
        icon: 'game'
      }
    },
      // {
      //   path: 'tree',
      //   name: 'Tree',
      //   component: () => import('@/views/tree/index'),
      //   meta: {
      //     title: 'Tree',
      //     icon: 'tree'
      //   }
      // }
    ]
  },]
const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
