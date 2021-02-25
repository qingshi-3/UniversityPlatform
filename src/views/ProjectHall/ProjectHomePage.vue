<template>
    <!--  项目主页  申请加入功能未编写 -->
    <div>
        <el-row id="title">
            <el-col :span="4" :push="2"><h3 v-text="project.projectTitle"></h3></el-col>
            <el-col :span="2">
                <DirectionTag :content="project.projectLevel"></DirectionTag>
            </el-col>
            <!--            <el-col :span="2"><DirectionTag :content="project.projectLevel"></DirectionTag></el-col>-->
            <el-col :span="2">
                <DirectionTag :content="project.projectStatus"></DirectionTag>
            </el-col>
        </el-row>
        <el-row id="content" style="margin-top: 30px">
            <el-row id="introduction">
                <h3>项目简介</h3>
                <p v-text="project.projectIntroduction"></p>
            </el-row>
            <el-row id="subject">
                <h3>项目涉及学科</h3>
                <el-row>
                    <el-col v-for="subject in subjects" :key="subject.subjectId" :span="2">
                        <button class="tag"><i class="el-icon-reading"></i>{{subject.subjectDescription}}</button>
                    </el-col>
                </el-row>
            </el-row>
            <el-row id="member">
                <h3>项目人员</h3>
                <el-row>
                    <el-col v-for="person in members" :key="person.userId" :span="2">
                        <button class="tag"><i class="el-icon-user-solid"></i>{{person.name}}</button>
                    </el-col>
                    <el-col v-if="(project.teamIds.length<project.personnelLimit)&&(project.projectStatus==='可加入')">
                        <!--                        <button class="tag" @click="applyJoinProject()">申请加入</button>-->
                        <el-popover
                                placement="right"
                                width="400"
                                trigger="click">
                            <div>
                                <el-input v-model="applicationDescription" type="textarea"
                                          :autosize="{ minRows: 2}" placeholder="请输入申请描述"></el-input>
                                <el-button @click="applyJoinProject()" round
                                           style="width:100px;height:40px;box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);border-radius: 30px;margin-top: 10px">
                                    确认
                                </el-button>
                            </div>
                            <el-button v-if="isStudent" slot="reference">申请加入</el-button>
                        </el-popover>
                    </el-col>
                </el-row>
            </el-row>
        </el-row>
    </div>
</template>

<script>
    import DirectionTag from "@/components/common/DirectionTag";

    export default {
        name: "ProjectHomePage",
        components: {DirectionTag},
        data() {
            return {
                project: null,
                members: [],
                applicationDescription: "",
                isStudent: this.$store.state.current_user_data.role==="student",
            }
        },
        methods: {
            applyJoinProject() {
                let _this = this;
                if (this.project.teamIds.indexOf(this.$store.state.current_user_data.userId) !== -1) {
                    alert("你已经在这个项目中");
                } else {
                    this.$axios({
                        url: '/api/project/join',
                        method: 'put',
                        params: {
                            userId: _this.$store.state.current_user_data.userId,
                            projectId: _this.project.projectId,
                            applicationDescription: _this.applicationDescription,
                        }
                    }).then(res => {
                        console.log("发送项目加入申请成功" + JSON.stringify(res))
                    }).catch(err=>{
                        console.log("申请加入项目-服务端错误"+err)
                    })
                }
            }
        },
        created() {
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
        },
        computed: {
            subjects() {
                let subjects = [];
                let ids = [];
                ids = this.project.subjectIds;
                let num = ids.length;
                let s = this.$store.state.subjects;
                for (let i = 0; i < s.length; i++) {
                    if (num === 0) {
                        break;
                    }
                    if (ids.indexOf(s[i].subjectId) !== -1) {
                        subjects.push(s[i]);
                        num--;
                    }
                }
                return subjects;
            }
        }
    }
</script>

<style scoped>
    #content {
        width: 84%;
        margin-left: 8%;
        border-radius: 10px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.5);
    }

    #introduction {
        margin-left: 100px;
        margin-top: 30px;
    }

    #subject {
        margin-left: 100px;
        margin-top: 30px;
    }

    #member {
        margin-left: 100px;
        margin-top: 30px;
        margin-bottom: 30px;
    }

    .tag {
        border-radius: 30px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .3);
        height: 40px;
        width: 110px;

        outline: none;

        background-color: white;
    }
</style>