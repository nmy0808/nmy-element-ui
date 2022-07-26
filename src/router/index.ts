import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'
import Icon from '@/views/icon/index.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Layout,
    redirect: 'icon',
    children: [
      {
        path: 'icon',
        component: Icon,
        meta: {
          title: '图标',
          icon: 'Files'
        }
      },
      {
        path: 'nDraggable',
        component: () => import('@/views/draggable/index.vue'),
        meta: {
          title: 'draggable',
          icon: 'Files'
        }
      },
      {
        path: 'form',
        component: () => import('@/views/form/index.vue'),
        meta: {
          title: 'form',
          icon: 'Files'
        }
      },
      {
        path: 'modelForm',
        component: () => import('@/views/modelForm/index.vue'),
        meta: {
          title: 'modelForm',
          icon: 'Files'
        }
      },
      {
        path: 'table',
        component: () => import('@/views/table/index.vue'),
        meta: {
          title: 'table',
          icon: 'Files'
        }
      },
      {
        path: 'upload',
        component: () => import('@/views/upload/index.vue'),
        meta: {
          title: 'upload',
          icon: 'Files'
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
