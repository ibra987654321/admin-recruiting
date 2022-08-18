import Vue from 'vue'
import VueRouter from 'vue-router'
import Question from '../views/QuestionsController.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'question',
    meta: {layout: 'main'},
    component: Question
  },
  {
    path: '/message',
    name: 'message',
    meta: {layout: 'main'},
    component: () => import('../views/MessageController.vue')
  },
  {
    path: '/vacancy',
    name: 'vacancy',
    meta: {layout: 'main'},
    component: () => import('../views/VacancyController.vue')
  },
  {
    path: '/candidate',
    name: 'candidate',
    meta: {layout: 'main'},
    component: () => import('../views/CandidateController.vue')
  },
  {
    path: '/candidateType',
    name: 'candidateType',
    meta: {layout: 'main'},
    component: () => import('../views/CandidateTypeController.vue')
  },
  {
    path: '/candidateList',
    name: 'candidateList',
    meta: {layout: 'main'},
    component: () => import('../pages/CandidateList.vue')
  },
  {
    path: '/CandidateDetail/:id',
    name: 'CandidateDetail',
    meta: {layout: 'main'},
    component: () => import('../pages/CandidateDetail.vue')
  },
  {
    path: '/knowledge',
    name: 'knowledge',
    meta: {layout: 'main'},
    component: () => import('../views/KnowledgeController.vue')
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

export default router
