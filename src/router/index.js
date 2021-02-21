import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from "@/components/Dashboard";
import NewEmployee from "@/components/NewEmployee";
import ViewEmployee from "@/components/ViewEmployee";
import Employee from "@/components/Employee";
import Login from '@/components/Login'
import Register from "@/components/Register";
import firebase from "firebase";


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: Dashboard,
    meta: {
      requiresAuth: true
    }
  },

  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      requiresGuest: true
    }
  },

  {
    path: '/register',
    name: 'register',
    component: Register,
    meta: {
      requiresGuest: true
    }
  },

  {
    path: '/new',
    name: 'new-employee',
    component: NewEmployee,
    meta: {
      requiresAuth: true
    }
  },

  {
    path: '/edit/:employee_id',
    name: 'employee',
    component: Employee,
    meta: {
      requiresAuth: true
    }
  },

  {
    path: '/:employee_id',
    name: 'view-employee',
    component: ViewEmployee,
    meta: {
      requiresAuth: true
    }
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  // Vérifier les exigencesAuth Guard
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // verifier si il y a un utilisateur non connecté
    if (!firebase.auth().currentUser) {
      // aller sur le login
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      // preoceder à l'itinéraire
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    // verifier si il y a un utilisateur non connecté
    if (firebase.auth().currentUser) {
      // aller sur le login
      next({
        path: '/',
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      // preceder à l'itinéraire
      next();
    }
  } else {
    // preceder à l'itinéraire
    next();
  }
});

export default router
