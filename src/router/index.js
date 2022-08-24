import Vue from 'vue'
import VueRouter from 'vue-router'
import Question from '../views/QuestionsController.vue'
import {getToken} from "@/helpers/helpers";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'question',
    meta: {layout: 'main', auth: true},
    component: Question
  },
  {
    path: '/message',
    name: 'message',
    meta: {layout: 'main', auth: true},
    component: () => import('../views/MessageController.vue')
  },
  {
    path: '/vacancy',
    name: 'vacancy',
    meta: {layout: 'main', auth: true},
    component: () => import('../views/VacancyController.vue')
  },
  {
    path: '/candidate',
    name: 'candidate',
    meta: {layout: 'main', auth: true},
    component: () => import('../views/CandidateController.vue')
  },
  {
    path: '/candidateType',
    name: 'candidateType',
    meta: {layout: 'main', auth: true},
    component: () => import('../views/CandidateTypeController.vue')
  },
  {
    path: '/candidateList',
    name: 'candidateList',
    meta: {layout: 'main', auth: true},
    component: () => import('../pages/CandidateList.vue')
  },
  {
    path: '/CandidateDetail/:id',
    name: 'CandidateDetail',
    meta: {layout: 'main', auth: true},
    component: () => import('../pages/CandidateDetail.vue')
  },
  {
    path: '/knowledge',
    name: 'knowledge',
    meta: {layout: 'main', auth: true},
    component: () => import('../views/KnowledgeController.vue')
  },
  {
    path: '/logs',
    name: 'logs',
    meta: {layout: 'main', auth: true},
    component: () => import('../views/LogList.vue')
  },
  {
    path: '/feedback',
    name: 'feedback',
    meta: {layout: 'main', auth: true},
    component: () => import('../views/FeedbackList.vue')
  },
  {
    path: '/login',
    name: 'login',
    meta: {layout: 'empty'},
    component: () => import('../pages/login.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const requireAuth = to.matched.some(record => record.meta.auth)
  const currentUser = getToken()

  if (requireAuth && !currentUser) {
    next('/login')
  } else {
    next()
  }
})


export default router
