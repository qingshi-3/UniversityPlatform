import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const store = new Vuex.Store({

    state: {
        //true是未登录
        logined:true,
        is_login:false,
        is_register:false,
        colleges:[{
            "collegeId" : 1,
            "collegeDescription" : "软件学院"
        },
            {
                "collegeId" : 2,
                "collegeDescription" : "计算机学院"
            },
            {
                "collegeId" : 3,
                "collegeDescription" : "阿松大"
            }],
        grades: [{
            "gradeId": 2018,
        },
            {
                "gradeId": 2019,
            },
            {
                "gradeId": 2020,
            }],
        universities:[{
            "universityId" : 1234564234,
            "universityDescription" : "北京大学"
        },
            {
                "universityId" : 1234564234,
                "universityDescription" : "四川大学"
            },
            {
                "universityId" : 1234564234,
                "universityDescription" : "四川大学"
            }]
    },
    getters:{
        logined: state => {
            return state.logined
        }
    },
    mutations: {
    }
});

export default store;