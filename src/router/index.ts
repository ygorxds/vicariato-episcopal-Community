import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HomeView from '../views/HomeView.vue'
import UserLogin from '../views/Login.vue';
import UserDashboard from '../views/Dashboard.vue';
import UserReport from '../views/ReportView.vue';
import AddMesc from '../views/AddMesc.vue'
import ListMescs from '@/views/ListMescs.vue';
import LoginProfile from '@/views/Profile.vue';
import EditMesc from '@/views/EditMescView.vue';
import SeeMesc from '@/views/SeeMesc.vue';
import NewUser from '@/views/CreateUser.vue'
import UpdateUser from '@/views/UpdateUserView.vue'
import InstitutionManagement from '@/views/InstitutionManagementView.vue'
import CreateParish from '@/views/CreateParishView.vue'
import ListParish from '@/views/ListParishView.vue'
import CreateChapel from '@/views/CreateChapelView.vue'
import ListChapel from '@/views/ListChapelView.vue'

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
  },
  {
    path: '/list-mesc',
    name: 'ListMesc',
    component: ListMescs
  },
  {
    path: '/see-profile',
    name: 'LoginProfile',
    component: LoginProfile
  },
  {
    path: '/edit-mesc',
    name: 'EditMesc',
    component: EditMesc
  },
  {
    path: '/see-mesc',
    name: 'SeeMesc',
    component: SeeMesc
  },
  {
    path: '/new-user',
    name: 'NewUser',
    component: NewUser
  },
  {
    path: '/update-user',
    name: 'UpdateUser',
    component: UpdateUser
  },
  {
    path: '/institution-management',
    name: 'InstitutionManagement',
    component: InstitutionManagement
  },
  {
    path: '/create-parish',
    name: 'CreateParish',
    component: CreateParish
  },
  {
  path: '/list-parish',
  name: 'ListParish',
  component: ListParish
},
{
  path: '/create-chapel',
  name: 'CreateChapel',
  component: CreateChapel,
},
{
  path: '/list-chapel',
  name: 'ListChapel',
  component: ListChapel,
},


];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
