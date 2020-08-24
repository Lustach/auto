import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
const SignUp =()=>import('../views/SignUp.vue')
Vue.use(VueRouter)

const routes = [
	{
		path: '/:id',
		name: 'SignUp',
		// component: () => import('../views/SignUp.vue'),
		meta: 'registration',
		component: SignUp
	},
	{
		path: '/settings/:id',
		name: 'SignUpSettings',
    meta: 'settings',
		component: SignUp
		// component: () => import('../views/SignUp.vue')
	}
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router
