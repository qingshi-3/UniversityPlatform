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
            "collegeId" : 123454,
            "collegeDescription" : "xxx"
        },
            {
                "collegeId" : 123454,
                "collegeDescription" : "xxx"
            },
            {
                "collegeId" : 123454,
                "collegeDescription" : "xxx"
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