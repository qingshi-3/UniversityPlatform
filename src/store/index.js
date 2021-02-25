import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const store = new Vuex.Store({

    state: {
        //true是未登录
        logined:true,
        is_login:false,
        is_register:false,
        current_university:{
            id:null,
            description:null
        },
        current_user_data:null,
        directions:[],
        colleges:[],
        grades: [],
        subjects:[],
        universities:[],
        active:"idea",
        noticeActive:"notice",
        projectStatus:["可加入","不可加入"],
        levels:[],
    },
    getters:{
        logined: state => {
            return state.logined
        }
    },
    mutations: {
        changeUniversity(state,university){
            state.universities = university;
        }
    },
    actions:{
        changeUniversity(ctx,university){
            ctx.commit("changeUniversity",university)
        }
    }
});

export default store;