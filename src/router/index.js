import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Member from '@/views/Member.vue'
import SignIn from '@/views/SignIn.vue'
import History from '@/views/History.vue'
import AllKrathong from '@/views/AllKrathong.vue'
import AllPlace from '@/views/AllPlace.vue'
import Register from '@/views/Register.vue'
import Krathong from '@/views/DetailKrathong.vue'
import TypePlace from '@/views/TypePlace.vue'
import LoyResult from '@/views/LoyResult.vue'
import Place from '@/views/Place.vue'
import HomeAdmin from '@/views/HomeAdmin.vue'
import AddKrathong from '@/views/AddEditKrathong.vue'
import AddPlace from '@/views/AddEditPlace.vue'
import EditKrathong from '@/views/AddEditKrathong.vue'
import EditPlace from '@/views/AddEditPlace.vue'
import ErrorPage from '@/views/ErrorPage.vue'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/history/:user_id',
    name: 'History',
    component: History
  },
  {
    path: '/member',
    name: 'Member',
    component: Member
  },
  {
    path: '/signIn',
    name: 'SignIn',
    component: SignIn
  },
  {
    path: '/allKrathong',
    name: 'AllKrathong',
    component: AllKrathong
  },
  {
    path: '/allPlace',
    name: 'AllPlace',
    component: AllPlace
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/krathong/:kt_id',
    name: 'Krathong',
    component: Krathong
  },
  {
    path: '/placeType',
    name: 'TypePlace',
    component: TypePlace
  },
  {
    path: '/place/:pt_id',
    name: 'Place',
    component: Place
  },
  {
    path: '/floating',
    name: 'LoyResult',
    component: LoyResult
  },
  {
    path: '/homeAdmin',
    name: 'HomeAdmin',
    component: HomeAdmin
  },
  {
    path: '/addKrathong',
    name: 'AddKrathong',
    component: AddKrathong
  },
  {
    path: '/addPlace',
    name: 'AddPlace',
    component: AddPlace
  },
  {
    path: '/editKrathong/:kt_id',
    name: 'editKrathong',
    component: EditKrathong
  },
  {
    path: '/editPlace/:p_id',
    name: 'editPlace',
    component: EditPlace
  },
   {
    path: '/:catchNotMatchPath(.*)',
    name: 'Error-page',
    component: ErrorPage
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
