import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue'
import SavedChecklist from '../views/SavedChecklist.vue'
import SavedDetail from '../views/SavedDetail.vue'
import SavedSubmission from '../views/SavedSubmission.vue'
import Report from '../views/Report.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/report',
    name: 'Report',
    component: Report
  },
  {
    path: '/saved',
    name: 'SavedChecklist',
    component: SavedChecklist
  },
  {
    path: '/submissions',
    name: 'SavedSubmission',
    component: SavedSubmission
  },
  {
    path: '/savedDetail/:id',
    name: 'SavedDetail',
    component:  SavedDetail
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
