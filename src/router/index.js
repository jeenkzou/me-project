import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Main/main.vue';
import Login from '@/views/Login/login.vue';

Vue.use(VueRouter);

const routes = [
	{
		path: '/login',
		name: 'login',
		component: Login,
		meta:{
			title:'登录'
		}
	},
	{
		path: '/',
		component: Home,
		children:[
			{
				path:'projects',
				name:'projects',
				component: () => import( /* webpackChunkName: "home" */ '@/views/Projects/projects'),
				meta:{
					title:'项目总览'
				}
			},
			{
				path: '/about',
				name: 'about',
				// route level code-splitting
				// this generates a separate chunk (about.[hash].js) for this route
				// which is lazy-loaded when the route is visited.
				component: () => import( /* webpackChunkName: "about" */ '@/views/About.vue'),
				meta:{
					title:'详情页'
				}
			}
		]
	},
	
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router
