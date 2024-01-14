import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BatchesViewWrapper from '@/views/BatchesViewWrapper.vue'
import BatchView from '@/components/BatchView.vue'
import BatchesView from '@/views/BatchesView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView
    },
    {
      path: '/batches-view',
      name: 'BatchesViewWrapper',
      component: BatchesViewWrapper,
      children: [
        {
          path: '/batches-view/',
          name: 'BatchesView',
          component: BatchesView
        },
        {
          path: '/batch-view/:id',
          name: 'BatchView',
          component: BatchView
        }
      ]
    }

  ]
})

export default router
