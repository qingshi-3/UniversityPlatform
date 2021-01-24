<template>
    <div id="user_information">
        <h2>个人资料</h2>
        <div id="information_content">
            <el-row>
                <el-col :span="24">
                    <div id="user_img">
                        <img :src="user_information.data.portrait_url"
                             alt="">
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <div id="base_information">
                        <el-row :span="24">
                            <h3>基本信息</h3>
                        </el-row>
                        <el-row :span="24">
                            <el-col :span="2">昵称:</el-col>
                            <el-col :span="16">
                                <el-input type="text" id="nickname" v-model="user_information.data.nickname"/>
                            </el-col>
                        </el-row>
                        <el-row :span="24">
                            <el-col :span="2">邮箱:</el-col>
                            <el-col :span="16">
                                <el-input type="text" id="email" v-model="user_information.data.email"/>
                            </el-col>
                        </el-row>
                        <el-row :span="24">
                            <el-col :span="2">电话:</el-col>
                            <el-col :span="16">
                                <el-input type="text" id="phone" v-model="user_information.data.phone"/>
                            </el-col>
                        </el-row>
                        <el-row :span="24">
                            <el-col :span="2">电话公开:</el-col>
                            <el-col :span="16">
                                <el-checkbox id="is_public_phone" border v-model="user_information.data.is_public_phone">公开</el-checkbox>
                            </el-col>
                        </el-row>
                        <el-row :span="24">
                            <el-col :span="2">职称:</el-col>
                            <el-col :span="16">
                                <el-input type="text" id="title" v-model="user_information.data.title"/>
                            </el-col>
                        </el-row>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div id="education_information">
                        <el-row :span="24">
                            <h3>教育信息</h3>
                        </el-row>
                        <el-row :span="24">
                            <el-col :span="2">姓名:</el-col>
                            <el-col :span="16">
                                <el-input type="text" id="name" v-model="user_information.data.name"/>
                            </el-col>
                        </el-row>
                        <el-row :span="24">
                            <el-col :span="2">大学:</el-col>
                            <el-col :span="16">
                                <el-select id="university" v-model="user_information.data.university">
                                    <el-option v-for="(university,index) in this.$store.state.universities" :key="index" :value="university.university_description"></el-option>
                                </el-select>
                            </el-col>
                        </el-row>
                        <el-row :span="24">
                            <el-col :span="2">学院:</el-col>
                            <el-col :span="16">
                                <el-select id="college" v-model="user_information.data.college">
                                    <el-option v-for="(college,index) in this.$store.state.colleges" :key="index" :value="college.college_description"></el-option>
                                </el-select>
                            </el-col>
                        </el-row>
                        <el-row :span="24">
                            <el-col :span="2">学号:</el-col>
                            <el-col :span="16">
                                <el-input type="text" id="no"/>
                            </el-col>
                        </el-row>
                        <el-row :span="24">
                            <el-col :span="2">年级:</el-col>
                            <el-col :span="16">
                                <el-select id="grade" v-model="user_information.data.grade">
                                    <el-option v-for="(grade,index) in this.$store.state.grades" :key="index" :value="grade.grade_description"></el-option>
                                </el-select>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-button round v-on:click="confirm" style="box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);border-radius: 30px;">验证</el-button>
                        </el-row>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <div id="brief_introduction">
                        <h3>简介</h3>
                        <el-input type="textarea"  :autosize="{ minRows: 2, maxRows: 4}" v-model="user_information.data.introduction"></el-input>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <div id="research_findings">
                        <h3>成果</h3>
                        <el-input type="textarea"  :autosize="{ minRows: 2, maxRows: 4}" v-model="user_information.data.findings"></el-input>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <div id="direction">
                        <h3>研究方向</h3>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div id="submit_button" style="padding-left: 90%">
            <el-button v-on:click="save_modify" round style="width:200px;height:60px;box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);border-radius: 30px;">保存</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "modify_user_information",
        data: function () {
            return {
                user_information: {
                    "status": "success",
                    "code": 103,
                    "data":
                        {
                            "portrait_url": "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3065179808,949830502&fm=11&gp=0.jpg",
                            "nickname": "northernb",
                            "email": "email@xx.com",
                            "phone": "122314131",
                            "is_public_phone": true,
                            "title": "教授",
                            "role": "教师",
                            "name": "张吕涛",
                            "university": "四川大学",
                            "college": "软件学院",
                            "no": "2018141463132",
                            "grade": "2018",
                            "introduction": "这是一段简介这是一段简介这是一段简介这是一段简介这是一段简介这是一段简介这是一段简介这是一段简" +
                                "这是一段简介这是一段简介这是一段简介这是一段简介这是一段简介这是一段简介这是一段简介这是一段简介这是一段简介这是一段简介" +
                                "这是一段简介这是一段简介这是一段简介这是一段简介这是一段简介这是一段简介这是一段简介这是一段简介这是一段简介这是一段简介这是一段简介" +
                                "这是一段简介这是一段简介这是一段简介这是一段简介这是一段简介这是一段简介这是一段简介这是一段简介这是一段简介这是一段简介",
                            "findings": "这是一些成果",
                            "direction":
                                [
                                    {
                                        "direction_id": 1234563,
                                        "direction_description": "Java"
                                    },
                                    {
                                        "direction_id": 1234563,
                                        "direction_description": "Mysql"
                                    },
                                    {
                                        "direction_id": 1234563,
                                        "direction_description": "Koltin"
                                    }
                                ]
                        }
                },
                all_university: {
                    "status": "success",
                    "code": 103,
                    "data":
                        [
                            {
                                "university_id": 1234564234,
                                "university_description": "四川大学"
                            },
                            {
                                "university_id": 1234564234,
                                "university_description": "清华大学"
                            },
                            {
                                "university_id": 1234564234,
                                "university_description": "北京大学"
                            }
                        ]
                },
                all_college:{
                    "status": "success",
                    "code": 103,
                    "data":
                        [
                            {
                                "college_id": 1234564234,
                                "college_description": "软件学院"
                            },
                            {
                                "college_id": 1234564234,
                                "college_description": "计算机学院"
                            },
                            {
                                "college_id": 1234564234,
                                "college_description": "数学学院"
                            }
                        ]
                },
                all_grade:{
                    "status": "success",
                    "code": 103,
                    "data":
                        [
                            {
                                "grade_id": 1234564234,
                                "grade_description": "2018"
                            },
                            {
                                "grade_id": 1234564234,
                                "grade_description": "2019"
                            },
                            {
                                "grade_id": 1234564234,
                                "grade_description": "2020"
                            }
                        ]
                }
            }
        },
        created: function () {
            console.log("创建成功，请求user_information")
            let name = "tokenId"
            console.log(this.$myCookie.get(name));
            // console.log(this.$cookies.get('tokenId'));



            // this.axios({
            //     url: 'https://域名/user',
            //     data: {}
            // }).then(data=>{
            //     this.user_information = data;
            //
            // })
        },
        methods:{
            confirm: function () {
                console.log("验证教育信息");
            },
            save_modify: function () {
                console.log("保存修改");
            }
        }
    }
</script>

<style>
    #user_information{
        padding-left: 2%;
        padding-right: 2%;
    }
    #information_content {
        background-color: white;
        padding: 2% 2% 5% 5%;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        border-radius: 30px;
    }

    #user_img img {
        border-radius: 50%;
        width: 200px;
        height: 200px;
        box-shadow: rgba(170, 170, 170, 0.48) 0px 0px 6px 0px;
        /*display: block; box-shadow: rgba(170, 170, 170, 0.48) 0px 0px 6px 0px; border-radius: 50%; width: 200px !important; height: 200px !important; visibility: visible !important;*/
    }

    #base_information {

    }

    #education_information {

    }

</style>