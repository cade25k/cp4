import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Doctor from '../views/doctor.vue'
import Create from '../views/create.vue'
import Complete from '../views/complete.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/doctor',
    name: 'Doctors',
    component: Doctor
  },
  {
    path: '/create',
    name: 'Create',
    component: Create
  },
  {
    path: '/complete',
    name: 'Complete',
    component: Complete
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
