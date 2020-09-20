import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
const SignUp =()=>import('../views/SignUp.vue')
Vue.use(VueRouter)

const routes = [
	{
		path: '/signup/token=:id',
		name: 'SignUp',
		// component: () => import('../views/SignUp.vue'),
		meta: 'registration',
		component: SignUp
	},
	{
		path: '/settings/token=:id',
		name: 'SignUpSettings',
		meta: 'settings',
		component: SignUp
		// component: () => import('../views/SignUp.vue')
	},
	{
		path: '/successRegistration',
		name: 'successRegistration',
		meta: 'successRegistration',
		component: ()=> import('../views/successRegistration.vue')
		// component: () => import('../views/SignUp.vue')
	},
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router
