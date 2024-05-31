import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HomeView from '../views/HomeView.vue'
import UserLogin from '../views/Login.vue';
import UserDashboard from '../views/Dashboard.vue';
import UserReport from '../views/ReportView.vue';
import AddMesc from '../views/AddMesc.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'HomeView',
    component: HomeView
  },
  {
    path: '/login',
    name: 'UserLogin',
    component: UserLogin
  },
  {
    path: '/dashboard',
    name: 'UserDashboard',
    component: UserDashboard
  },
  {
    path: '/report',
    name: 'UserReport',
    component: UserReport
  },
  {
    path: '/add-mesc',
    name: 'AddMesc',
    component: AddMesc
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
