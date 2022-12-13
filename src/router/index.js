import Vue from 'vue'
import VueRouter from 'vue-router'
import Question from '../views/QuestionsController.vue'
import {getToken} from "@/helpers/helpers";
import decodeJWT from "@/helpers/parserJWT";
import store from "@/store";

Vue.use(VueRouter)

const routes = [
  {
    path: '/question',
    name: 'question',
    meta: {layout: 'main', auth: true, role: ['ROLE_APP_Recruiting_Admin','ROLE_APP_Recruiting_Obuchenie']},
    component: Question
  },
  {
    path: '/message',
    name: 'message',
    meta: {layout: 'main', auth: true, role: ['ROLE_APP_Recruiting_Admin']},
    component: () => import('../views/MessageController.vue')
  },
  {
    path: '/vacancy',
    name: 'vacancy',
    meta: {layout: 'main', auth: true, role: ['ROLE_APP_Recruiting_Admin']},
    component: () => import('../views/VacancyController.vue')
  },
  {
    path: '/candidate',
    name: 'candidate',
    meta: {layout: 'main', auth: true, role: ['ROLE_APP_Recruiting_Admin']},
    component: () => import('../views/CandidateController.vue')
  },
  {
    path: '/candidateType',
    name: 'candidateType',
    meta: {layout: 'main', auth: true, role: ['ROLE_APP_Recruiting_Admin']},
    component: () => import('../views/CandidateTypeController.vue')
  },
  {
    path: '/',
    name: 'candidateList',
    meta: {layout: 'main', auth: true},
    component: () => import('../pages/CandidateList.vue')
  },
  {
    path: '/CandidateDetail/:id',
    name: 'CandidateDetail',
    meta: {layout: 'main', auth: true, role: ['ROLE_APP_Recruiting_Admin','ROLE_APP_Recruiting_Obuchenie', 'ROLE_APP_Recruiting_Expert', 'ROLE_APP_Recruiting_it_audit']},
    component: () => import('../pages/CandidateDetail.vue')
  },
  {
    path: '/knowledge',
    name: 'knowledge',
    meta: {layout: 'main', auth: true, role: ['ROLE_APP_Recruiting_Admin']},
    component: () => import('../views/KnowledgeController.vue')
  },
  {
    path: '/logs',
    name: 'logs',
    meta: {layout: 'main', auth: true, role: ['ROLE_APP_Recruiting_Admin', 'ROLE_APP_Recruiting_it_audit']},
    component: () => import('../views/LogList.vue')
  },
  {
    path: '/feedback',
    name: 'feedback',
    meta: {layout: 'main', auth: true, role: ['ROLE_APP_Recruiting_Admin']},
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

function intersection(first, second) {
  let s = new Set(second)
  return first.filter(item => s.has(item))
}

router.beforeEach((to, from, next) => {
  const requireAuth = to.matched.some(record => record.meta.auth)
  const currentUser = getToken()
  if (requireAuth && !currentUser) {
    next('/login')
  } else {
    to.matched.some(r => {
      if (r.meta.role) {
        const text = decodeJWT(currentUser).roles.replace(/[\s.,%]/g, ' ')
        const role = intersection(r.meta.role, text.split(' '))
        if (role[0]) {
          next()
        } else {
          store.commit('setSnackbars', 'У вас нет доступа')
        }
      } else {
        next()
      }
    })
  }
})


export default router
