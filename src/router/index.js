import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from "@/components/Dashboard";
import NewEmployee from "@/components/NewEmployee";
import ViewEmployee from "@/components/ViewEmployee";
import Employee from "@/components/Employee";


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: Dashboard
  },
  {
    path: '/new',
    name: 'new-employee',
    component: NewEmployee
  },
  {
    path: '/edit/:employee_id',
    name: 'employee',
    component: Employee
  },
  {
    path: '/:employee_id',
    name: 'view-employee',
    component: ViewEmployee
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
