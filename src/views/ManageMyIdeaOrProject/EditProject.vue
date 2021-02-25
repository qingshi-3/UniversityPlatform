<template>
    <!--  编辑项目  -->
    <div id="body">
        <el-row id="header">
            <h2>项目配置</h2>
        </el-row>

        <el-row id="box">
            <el-form ref="form" :model="project" label-width="80px">
                <el-row id="data">
                    <el-col id="base" :span="12">
                        <h4>基础信息</h4>
                        <el-form-item label="项目标题">
                            <el-input style="width: 230px;" v-model="project.projectTitle"></el-input>
                        </el-form-item>
                        <el-form-item label="项目等级">
                            <el-select v-model="project.projectLevel" placeholder="请选择项目等级">
                                <el-option v-for="level in this.$store.state.levels"
                                           :key="level"
                                           :label="level"
                                           :value="level">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="项目状态">
                            <el-select v-model="project.projectStatus" placeholder="请选择项目状态">
                                <el-option v-for="status in curStatus"
                                           :key="status"
                                           :label="status"
                                           :value="status">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col id="member" :span="12">
                        <h4>人员信息</h4>
                        <el-form-item label="导师">
                            <div id="teacherTag">
                                <i class="el-icon-user-solid"></i>{{this.$store.state.current_user_data.name}}
                            </div>
                        </el-form-item>

                        <el-form-item label="成员">
                            <el-col :span="8" v-for="member in curMember" :key="member.userId">
                                <div id="memberTag">
                                    <i class="el-icon-user-solid"></i>
                                    {{member.name}}
                                    <i class="el-icon-error" @click="deleteMember(member)"></i>
                                </div>
                            </el-col>
                            <el-popover
                                    v-if="project.teamIds.length<project.personnelLimit"
                                    placement="right"
                                    width="400"
                                    trigger="click">
                                <div>
                                    <el-input v-model="userName" placeholder="请输入学生名字关键字"></el-input>
                                    <el-table
                                            :data="curUserList"
                                            height="400"
                                            border
                                            style="width: 400px">
                                        <el-table-column
                                                prop="userId"
                                                label="学生id"
                                                width="110">
                                        </el-table-column>
                                        <el-table-column
                                                prop="name"
                                                label="姓名"
                                                width="140">
                                        </el-table-column>
                                        <el-table-column
                                                fixed="right"
                                                label="操作"
                                                width="150">
                                            <template slot-scope="scope">
                                                <el-button @click="addMember(curUserList[scope.$index])" type="text"
                                                           size="small">
                                                    添加
                                                </el-button>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                </div>
                                <el-button slot="reference" class="button-new-tag" size=""><i
                                        class="el-icon-circle-plus"></i>添加新成员
                                </el-button>
                            </el-popover>
                        </el-form-item>

                        <el-form-item label="人员上限">
                            <el-select v-model="project.personnelLimit" placeholder="请选择人员上限">
                                <el-option v-for="num in curNum"
                                           :key="num"
                                           :label="num"
                                           :value="num">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>

                </el-row>
                <el-row id="subject">
                    <h4>涉及学科</h4>
                    <el-row>
                        <el-col :span="4" v-for="subject in curSubjects" :key="subject.subjectId">
                            <div id="subjectTag">
                                <i class="el-icon-reading"></i>
                                {{subject.subjectDescription}}
                                <i class="el-icon-error" @click="deleteSubject(subject.subjectId)"></i>
                            </div>
                        </el-col>
                        <el-popover
                                placement="right"
                                width="400"
                                trigger="click">
                            <div>
                                <el-input v-model="subjectName" placeholder="请输入学科关键字"></el-input>
                                <el-table
                                        :data="subjectList"
                                        height="400"
                                        border
                                        style="width: 400px">
                                    <el-table-column
                                            prop="subjectId"
                                            label="学科id"
                                            width="110">
                                    </el-table-column>
                                    <el-table-column
                                            prop="subjectDescription"
                                            label="学科描述"
                                            width="140">
                                    </el-table-column>
                                    <el-table-column
                                            fixed="right"
                                            label="操作"
                                            width="150">
                                        <template slot-scope="scope">
                                            <el-button @click="addSubject(subjectList[scope.$index])" type="text"
                                                       size="small">
                                                添加
                                            </el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
                            <el-button slot="reference" class="button-new-tag" size=""><i
                                    class="el-icon-circle-plus"></i>添加新学科
                            </el-button>
                        </el-popover>
                    </el-row>
                </el-row>
                <el-row id="introduction">
                    <h4>项目简介</h4>
                    <label>
                        <textarea placeholder="项目介绍" v-model="project.projectIntroduction"></textarea>
                    </label>
                </el-row>
                <!--                <el-row id="Questionnaire"></el-row>-->
            </el-form>
        </el-row>
        <el-row id="operation">
            <el-col :span="3" :push="5">
                <el-button round class="button" :disabled="this.$route.query.projectId===null" @click="deleteProject">
                    删除项目
                </el-button>
            </el-col>
            <el-col :push="12" :span="3">
                <el-button round class="button" @click="saveProject">
                    发布项目
                </el-button>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import qs from 'qs';
    export default {
        name: "EditProject",
        components: {},
        data() {
            return {
                project: {
                    userId:this.$store.state.current_user_data.userId,
                    subjectIds: [],
                    teamIds: [],
                    projectId: null,
                    projectTitle: null,
                    projectStatus: "不可加入",
                    projectLevel: null,
                    projectIntroduction: null,
                    projectCreatedDate: null,
                    haveQuestionnaire: false,
                    personnelLimit: 1,
                    projectDeleted: false,
                    projectTeacher: this.$store.state.current_user_data.userId,
                    projectLeader: null,
                    projectCategoryId: 0,
                    projectQuestionId: null,
                    teacherId:this.$store.state.current_user_data.userId
                },
                members: [],
                userName: "",
                userList: [],
                subjectName: "",
            }
        },
        methods: {
            saveProject() {
        if (this.project.projectId===null){
            this.$axios({
                url: '/api/project/new',
                method: 'post',
                data:qs.stringify(this.project),
            }).then(res =>{
                if (res.data.code!==404){
                    console.log("创建成功");
                }
            })
        }else {
            this.$axios({
                url: '/api/project/config',
                method: 'put',
                data:qs.stringify(this.project),
            }).then(res =>{
                if (res.data.code!==404){
                    console.log("更新成功");
                }
            })
        }

            },
            deleteProject() {
                this.$axios({
                    url:'/api/project/exit',
                    method:'put',
                    params:{
                        userId:this.$store.state.current_user_data.userId,
                        projectId:this.project.projectId
                    }
                })
                this.$store.state.active = "project";
                this.$router.push({path: '/manageMyIdeaOrProject'});
            },
            addSubject(subject) {
                this.project.subjectIds.push(subject.subjectId);
            },
            deleteSubject(subjectId) {
                for (let i = 0; i < this.project.subjectIds.length; i++) {
                    if (this.project.subjectIds[i] === subjectId) {
                        this.project.subjectIds.splice(i, 1);
                        break;
                    }
                }
            },
            addMember(user) {
                this.project.teamIds.push(user.userId);
            },
            deleteMember(member) {
                for (let i = 0; i < this.project.teamIds.length; i++) {
                    if (this.project.teamIds[i] === member.userId) {
                        this.project.teamIds.splice(i, 1);
                        break;
                    }
                }
            }
        },
        created() {
            this.$axios({
                url: 'api/user',
                method: "get",
                params: {
                    universityId: null,
                    role: "student",
                    name: null,
                    directionId: null,
                    collegeId: null
                }
            }).then(res => {
                console.log("所有学生" + JSON.stringify(res))
                this.userList = res.data.data;
            })
            //新项目
            if (this.$route.query.projectId === null) {
                    this.project.teamIds.push(this.$store.state.current_user_data.userId);

            }
            //配置已有项目
            else {
                let _this = this;
                this.$axios({
                    url: '/api/project/home',
                    method: 'get',
                    params: {
                        projectId: _this.$route.query.projectId
                    }
                }).then(res => {
                    console.log("项目详细信息" + JSON.stringify(res));
                    this.project = res.data.data;

                    let memberId = [];
                    memberId = this.project.teamIds;
                    let _this = this;
                    memberId.forEach(value => {
                        _this.$axios({
                            url: '/api/user/my',
                            method: 'get',
                            params: {
                                userId: value
                            }
                        }).then(res => {
                            _this.members.push(res.data.data)
                        })
                    })
                })
            }
        },
        computed: {
            subjectList() {
                let arr = this.$store.state.subjects;
                let res = [];
                for (let i = 0; i < arr.length; i++) {
                    if (arr[i].subjectDescription.indexOf(this.subjectName) !== -1) {
                        let flag = true;
                        for (let j = 0; j < this.project.subjectIds.length; j++) {
                            if (this.project.subjectIds[j] === arr[i].subjectId) {
                                flag = false;
                                break;
                            }
                        }
                        if (flag) {
                            res.push(arr[i]);
                        }
                    }
                }
                return res;
            },
            curSubjects() {
                let res = [];
                let arr = this.$store.state.subjects;
                for (let i = 0; i < arr.length; i++) {
                    for (let j = 0; j < this.project.subjectIds.length; j++) {
                        if (this.project.subjectIds[j] === arr[i].subjectId) {
                            res.push(arr[i]);
                        }
                    }
                    if (res.length === this.project.subjectIds.length) {
                        break;
                    }
                }
                return res;
            },
            curNum() {
                let nums = [];
                let min = this.project.teamIds.length;
                min = min < 1 ? 1 : min;
                let max = 6;
                for (let i = min; i <= max; i++) {
                    nums.push(i);
                }
                return nums;
            },
            curUserList() {
                let res = [];
                for (let i = 0; i < this.userList.length; i++) {
                    if (this.userList[i].name.indexOf(this.userName) !== -1) {
                        let flag = true;
                        for (let j = 0; j < this.project.teamIds.length; j++) {
                            if (this.project.teamIds[j] === this.userList[i].userId) {
                                flag = false;
                                break;
                            }
                        }
                        if (flag) {
                            res.push(this.userList[i]);
                        }
                    }
                }
                return res;
            },
            curMember() {
                let members = [];
                for (let i = 0; i < this.userList.length; i++) {
                    for (let j = 0; j < this.project.teamIds.length; j++) {
                        if (this.userList[i].userId === this.project.teamIds[j] && this.userList[i].userId !== this.project.projectTeacher) {
                            members.push(this.userList[i]);
                        }
                    }
                    if (members.length === this.project.teamIds.length - 1) {
                        break;
                    }
                }
                return members
            },
            curStatus() {
                let res = [];
                res.push("不可加入");
                if (this.project.teamIds.length < this.project.personnelLimit) {
                    res.push("可加入");
                }
                return res;
            }
        }
    }
</script>

<style scoped>
    h4 {
        font-size: 20px;
        margin-bottom: 20px;
    }

    #body {

    }

    #header {
        margin-top: 30px;
        margin-left: 500px;
        margin-bottom: 30px;
    }

    #box {
        width: 1000px;
        border-radius: 20px;
        margin-left: 500px;
        box-shadow: 2px 4px 12px 0 rgba(0, 0, 0, 0.2);
        padding-bottom: 20px;
    }

    #data {

    }

    #base {
        padding-top: 50px;
        padding-left: 50px;
    }

    #member {
        padding-top: 50px;
        padding-left: 50px;
    }

    #teacherTag {
        padding-left: 20px;
        width: 80px;
        height: 40px;
        border-radius: 25px;
        box-shadow: 2px 4px 12px 0 rgba(0, 0, 0, 0.2);
    }

    #memberTag {
        padding-left: 20px;
        width: 80px;
        height: 40px;
        border-radius: 25px;
        box-shadow: 2px 4px 12px 0 rgba(0, 0, 0, 0.2);
        margin-bottom: 10px;
    }

    #subject {
        padding-top: 30px;
        padding-left: 50px;
    }

    #subjectTag {
        padding-left: 20px;
        padding-top: 10px;
        width: 100px;
        height: 35px;
        border-radius: 25px;
        box-shadow: 2px 4px 12px 0 rgba(0, 0, 0, 0.2);
        margin-bottom: 10px;
    }

    #introduction {
        padding-top: 30px;
        padding-left: 50px;
    }

    #introduction textarea {
        resize: vertical;
        margin-top: 30px;
        outline-style: none;
        border-radius: 10px;
        box-shadow: 2px 4px 12px 0 rgba(0, 0, 0, 0.2);
        border-width: 0;
        font-size: 20px;
        width: 900px;
        height: 200px;
    }

    #Questionnaire {

    }

    #operation {

    }

    .button {
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.3);
        border-radius: 30px;
        margin-top: 20px;
        margin-left: 95px;
        width: 170px;
        height: 60px;
        font-size: 20px;

    }
</style>