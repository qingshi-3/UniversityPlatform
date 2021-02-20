<template>
    <!--  修改个人信息  -->
    <div id="user_information">
        <h2>个人资料</h2>
        <div id="information_content">
            <el-row>
                <el-col :span="24">
                    <!--                    <div id="user_img">-->
                    <!--                        <el-image :src="userInformation.portraitUrl"-->
                    <!--                                  alt="现在网速太慢了"></el-image>-->
                    <!--                     </div>-->
                    <div id="user_img">
                        <input :src="userInformation.portraitUrl" type="image" alt/>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-row>
                            <el-row :span="24" style="padding-top: 30px">
                                <h3>基本信息</h3>
                            </el-row>
                            <el-row :span="24" style="padding-top: 30px">
                                <el-col :span="2" >昵称:</el-col>
                                <el-col :span="16">
                                    <el-input type="text" id="nickname"
                                              v-model="userInformation.nickname"/>
                                </el-col>
                            </el-row>
                            <el-row :span="24" style="padding-top: 15px">
                                <el-col :span="2">邮箱:</el-col>
                                <el-col :span="16">
                                    <el-input type="text" id="email" v-model="userInformation.email"/>
                                </el-col>
                            </el-row>
                            <el-row :span="24" style="padding-top: 15px">
                                <el-col :span="2">电话:</el-col>
                                <el-col :span="16">
                                    <el-input type="text" id="phone" v-model="userInformation.phone"/>
                                </el-col>
                            </el-row>
                            <el-row :span="24" style="padding-top: 15px">
                                <el-col :span="2">电话公开:</el-col>
                                <el-col :span="16">
                                    <el-checkbox id="is_public_phone" border
                                                 v-model="userInformation.isPublicPhone">公开
                                    </el-checkbox>
                                </el-col>
                            </el-row>
                            <el-row :span="24" style="padding-top: 15px">
                                <el-col :span="2">职称:</el-col>
                                <el-col :span="16">
                                    <el-input type="text" id="title" placeholder="(teacher/student)" v-model="userInformation.teachTitle"/>
                                </el-col>
                            </el-row>
                    </el-row>
                    <el-row style="padding-top: 30px">
                        <h3>社交网络</h3>
                        <el-row :span="24" style="padding-top: 15px">
                            <el-col :span="2">QQ:</el-col>
                            <el-col :span="16">
                                <el-input type="text" v-model="userInformation.qq"/>
                            </el-col>
                        </el-row>
                        <el-row :span="24" style="padding-top: 15px">
                            <el-col :span="2">微信:</el-col>
                            <el-col :span="16">
                                <el-input type="text" v-model="userInformation.wechat"/>
                            </el-col>
                        </el-row>
                    </el-row>
                </el-col>
                <el-col :span="12">
                        <el-row :span="24" style="padding-top: 30px">
                            <h3>教育信息</h3>
                        </el-row>
                        <el-row :span="24" style="padding-top: 15px">
                            <el-col :span="2">姓名:</el-col>
                            <el-col :span="16">
                                <el-input type="text" id="name" v-model="userInformation.name"/>
                            </el-col>
                        </el-row>
                        <el-row :span="24" style="padding-top: 15px">
                            <el-col :span="2">大学:</el-col>
                            <el-col :span="16">
                                <el-select id="university"
                                           v-model="userInformation.universityDescription">
                                    <el-option v-for="(university,index) in this.$store.state.universities" :key="index"
                                               :value="university.universityDescription"></el-option>
                                </el-select>
                            </el-col>
                        </el-row>
                        <el-row :span="24" style="padding-top: 15px">
                            <el-col :span="2">学院:</el-col>
                            <el-col :span="16">
                                <el-select id="college"
                                           v-model="userInformation.collegeDescription">
                                    <el-option v-for="(college,index) in this.$store.state.colleges" :key="index"
                                               :value="college.collegeDescription"></el-option>
                                </el-select>
                            </el-col>
                        </el-row>
                        <el-row :span="24" style="padding-top: 15px">
                            <el-col :span="2">学号:</el-col>
                            <el-col :span="16">
                                <el-input type="text" id="no" v-model="userInformation.schoolNo"/>
                            </el-col>
                        </el-row>
                        <el-row :span="24" style="padding-top: 15px">
                            <el-col :span="2">年级:</el-col>
                            <el-col :span="16">
                                <el-select id="grade" v-model="userInformation.gradeId">
                                    <el-option v-for="(grade,index) in this.$store.state.grades" :key="index"
                                               :value="grade.gradeId"></el-option>
                                </el-select>
                            </el-col>
                        </el-row>
                        <el-row style="padding-top: 15px">
                            <el-button round v-on:click="confirm"
                                       style="box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);border-radius: 30px;">验证
                            </el-button>
                        </el-row>
                </el-col>
            </el-row>
            <el-row style="padding-top: 30px">
                <el-col :span="24">
                    <div id="brief_introduction">
                        <h3>简介</h3>
                        <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}"
                                  v-model="userInformation.introduction"></el-input>
                    </div>
                </el-col>
            </el-row>
            <el-row style="padding-top: 30px">
                <el-col :span="24">
                    <div id="research_findings">
                        <h3>成果</h3>
                        <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}"
                                  v-model="userInformation.findings"></el-input>
                    </div>
                </el-col>
            </el-row>
            <el-row style="padding-top: 30px">
                <el-col :span="24">
                    <div id="direction">
                        <h3>研究方向</h3>
                    </div>
                    <el-row :gutter="1" style="padding-top: 15px">
                        <el-col :span="2" v-for="item in userInformation.directions" :key="item.directionId">
                            <DirectionTag :content="item.directionDescription" :canDelete="true" :directionId="item.directionId"></DirectionTag>
                        </el-col>
                        <el-col :span="4">
                            <el-input
                                    class="input-new-tag"
                                    v-if="inputVisible"
                                    v-model="inputValue"
                                    ref="saveTagInput"
                                    size="small"
                                    @keyup.enter.native="handleInputConfirm"
                                    @blur="handleInputConfirm"
                            >
                            </el-input>
                            <el-button v-else class="button-new-tag" size="" @click="showInput">+ New Tag</el-button>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
        </div>
        <div id="submit_button" style="margin-right: 0;">
            <el-button v-on:click="saveModify" round
                       style="width:200px;height:60px;box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);border-radius: 30px;">
                保存
            </el-button>
        </div>
    </div>
</template>

<script>
    import DirectionTag from "@/components/common/DirectionTag";

    export default {
        name: "ModifyUserInformation",
        components: {DirectionTag},
        data: function () {
            return {
                inputVisible: false,
                inputValue: '',
                // {
                //     "data": {
                //         "data": {
                //             "universityDescription": "Uni_0大学",
                //             "collegeDescription": "College_0学院",
                //             "directionId": 1,
                //             "directions": [{"directionId": 1, "directionDescription": "方向1"}, {
                //                 "directionId": 2,
                //                 "directionDescription": "方向2"
                //             }, {"directionId": 3, "directionDescription": "方向3"}],
                //             "projects": null,
                //             "ideas": null,
                //             "evaluates": null,
                //             "tokenId": null,
                //             "userId": 1,
                //             "role": "student",
                //             "nickname": "小猪猪0",
                //             "isPublicPhone": false,
                //             "portraitUrl": "https://images.pexels.com/photos/6331187/pexels-photo-6331187.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
                //             "introduction": "这个人很懒什么都没写",
                //             "email": "0@foxmail.com",
                //             "tel": "00101_0",
                //             "wechat": "wechat_0",
                //             "qq": "qq_0",
                //             "findings": "findings_0",
                //             "userDeleted": false,
                //             "password": "123456780",
                //             "phone": "132081910",
                //             "universityId": 0,
                //             "collegeId": 0,
                //             "gradeId": 2018,
                //             "schoolNo": "20181414660",
                //             "teachTitle": null,
                //             "name": "0_富贵"
                //         }, "message": "成功", "code": 200
                //     },
                //     "status": 200,
                //     "statusText": "OK",
                //     "headers": {
                //         "connection": "close",
                //         "content-type": "application/json;charset=UTF-8",
                //         "date": "Tue, 09 Feb 2021 13:00:53 GMT",
                //         "transfer-encoding": "chunked",
                //         "x-powered-by": "Express"
                //     },
                //     "config": {
                //         "url": "/api/user/my",
                //         "method": "get",
                //         "headers": {"Accept": "application/json, text/plain, */*"},
                //         "params": {"userId": "1"},
                //         "transformRequest": [null],
                //         "transformResponse": [null],
                //         "timeout": 0,
                //         "xsrfCookieName": "XSRF-TOKEN",
                //         "xsrfHeaderName": "X-XSRF-TOKEN",
                //         "maxContentLength": -1,
                //         "maxBodyLength": -1,
                //         "withCredentials": true
                //     },
                //     "request": {}
                // }
            }
        },
        computed: {
            userInformation: function () {
                return this.$store.state.current_user_data;
            }
        },
        created: function () {
            console.log("创建成功，请求user_information")
            // console.log(this.$cookies.get('tokenId'));

            // this.axios({
            //     url: 'https://域名/user',
            //     data: {}
            // }).then(data=>{
            //     this.user_information = data;
            //
            // })
        },
        methods: {
            showInput() {
                this.inputVisible = true;
                this.$nextTick(_ => {
                    alert(_)
                    this.$refs.saveTagInput.$refs.input.focus();
                });
            },

            handleInputConfirm() {
                let inputValue = this.inputValue;
                if (inputValue) {
                    let obj;
                    this.$store.state.directions.forEach(value => {
                        if (value.directionDescription===inputValue){
                            obj = value;
                            this.$store.state.current_user_data.directions.forEach(value1 => {
                                if (value1.directionId===obj.directionId){
                                    obj = null
                                }
                            })
                        }
                    })
                    if (obj){
                        this.$store.state.current_user_data.directions.push(obj);
                    }
                }
                this.inputVisible = false;
                this.inputValue = '';
            },
            confirm: function () {
                console.log("验证教育信息");
                if (this.userInformation.teachTitle === "student") {
                    this.$axios({
                        url: '/api/user/edu',
                        method: 'post',
                        params: {
                            userId: this.userInformation.userId,
                            name: this.userInformation.name,
                            universityId: this.userInformation.universityId,
                            collegeId: this.userInformation.collegeId,
                            no: this.userInformation.schoolNo,
                            grade: this.userInformation.gradeId,
                            role: this.userInformation.role
                        }
                    }).then(res => {
                        console.log(JSON.subarray(res))
                    })
                } else if (this.userInformation.teachTitle === "teacher") {
                    this.$axios({
                        url: '/api/user/edu',
                        method: 'post',
                        params: {
                            userId: this.userInformation.userId,
                            name: this.userInformation.name,
                            universityId: this.userInformation.universityId,
                            collegeId: this.userInformation.collegeId,
                            no: this.userInformation.schoolNo,
                            title: this.userInformation.teachTitle,
                            role: this.userInformation.role
                        }
                    }).then(res => {
                        console.log(JSON.stringify(res))
                    })
                } else {
                    alert("职务填写错误")
                }
            },
            saveModify: function () {
                console.log("保存修改");
                let data = this.$store.state.current_user_data;
                // let _this = this;
                this.$axios({
                    url:'/api/user/save',
                    method:'put',
                    params:{
                        userId:data.userId,
                        nickname:data.nickname,
                        email:data.email,
                        tel:data.tel,
                        phone:data.phone,
                        isPublicPhone:data.isPublicPhone,
                        password:data.password,
                        wechat:data.wechat,
                        qq:data.qq,
                        introduction:data.introduction,
                        findings:data.findings,
                        directions:data.directions
                    }
                }).then(res => {
                    console.log("修改成功返回信息"+JSON.stringify(res));
                    if (res.data.code === 102){
                        alert("修改成功")
                    }else {
                        alert("修改失败")
                    }
                })
            }
        }
    }
</script>

<style>
    #user_information {
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

    #user_img input {
        border-radius: 50%;
        width: 200px;
        height: 200px;
        box-shadow: rgba(170, 170, 170, 0.48) 0px 0px 6px 0px;
        outline: none;
    }

</style>

