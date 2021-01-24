import Vue from 'vue'
import VueRouter from 'vue-router'


// import store from "@/store";


Vue.use(VueRouter)

//防止组件重复点击后,重复触发router.replace()和router.push()方法而导致的浏览器报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
const originalReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(location) {
    return originalReplace.call(this, location).catch(err => err);
}


const Test = () => import('@/components/Test');
const ModifyUserInformation = () => import('@/views/modify_user_information/ModifyUserInformation')
const Login = () => import('@/components/common/Login')
const err = () => import('@/components/common/404')
const Register = () => import('@/components/common/Register')

const routes = [
    {
        path: '',
        redirect: ''
    },
    {
        path: '/test',
        component: Test
    },
    {
        path: '/modify_user_information',
        component: ModifyUserInformation
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/404',
        component: err
    },
    {
        path: '/register',
        component: Register
    }
]

const router = new VueRouter({
    routes,
    mode: 'history'
})

// 导航守卫
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
// router.beforeEach((to, from, next) => {
//     let token = window.document.cookie;
//     alert('判断是否登录过' + "[" + token + "]")
//     if (token === '') {
//         alert("请登录")
//         store.state.is_login = true;
//         next();
//     } else {
//         next();
//     }
// });

export default router