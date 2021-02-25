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
const ModifyUserInformation = () => import('@/views/ModifyUserInformation/ModifyUserInformation')
const Login = () => import('@/components/common/Login')
const err = () => import('@/components/common/404')
const Register = () => import('@/components/common/Register')
const TeacherHall = () => import('@/views/TeacherHall/TeacherHall')
const TeacherHomePage = () => import('@/views/TeacherHall/TeacherHomePage')
const ClassMateHall = () => import('@/views/ClassMateHall/ClassMateHall')
const ClassMateHomePage = () => import('@/views/ClassMateHall/ClassMateHomePage')
const ProjectHomePage = () => import('@/views/ProjectHall/ProjectHomePage')
const ProjectHall = () => import('@/views/ProjectHall/ProjectHall')
const ManageMyIdeaOrProject = () => import('@/views/ManageMyIdeaOrProject/ManageMyIdeaOrProject')
const EditProject = () => import('@/views/ManageMyIdeaOrProject/EditProject')
const NoticeList = () => import('@/views/NoticeList/NoticeList')
const IdeaHall = () => import('@/views/IdeaHall/IdeaHall')
const IdeaHomePage = () => import('@/views/IdeaHall/IdeaHomePage')
const EditIdea = () => import('@/views/ManageMyIdeaOrProject/EditIdea')

const routes = [
    {
        path: '',
        redirect: ''
    },
    {
        path: '/editIdea',
        component: EditIdea
    },
    {
        path: '/ideaHomePage',
        component: IdeaHomePage
    },
    {
        path: '/ideaHall',
        component: IdeaHall
    },
    {
        path: '/noticeList',
        component: NoticeList
    },
    {
        path: '/editProject',
        component: EditProject
    },
    {
        path: '/manageMyIdeaOrProject',
        component: ManageMyIdeaOrProject
    },
    {
        path: '/classMateHomePage',
        component: ClassMateHomePage
    },
    {
        path: '/projectHall',
        component: ProjectHall
    },
    {
        path: '/projectHomePage',
        component: ProjectHomePage
    },
    {
        path: '/teacherHomePage',
        component: TeacherHomePage
    },
    {
        path: '/classMateHall',
        component: ClassMateHall
    },
    {
        path: '/test',
        component: Test
    },
    {
        path: '/modifyUserInformation',
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
    },
    {
        path: '/teacherHall',
        component: TeacherHall
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