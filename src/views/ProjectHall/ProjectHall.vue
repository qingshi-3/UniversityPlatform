<template>
    <!--  项目大厅  -->
    <el-main>
        <el-row>
            <el-col :span="3">
                <label>
                    <select v-model="collegeId" @change="collegeChange()">
                        <option value="学院" disabled>学院</option>
                        <option value="">重置</option>
                        <option
                                v-for="item in this.$store.state.colleges"
                                :key="item.collegeId"
                                :label="item.collegeDescription"
                                :value="item.collegeId">
                        </option>
                    </select>
                </label>
            </el-col>

            <el-col :span="3">
                <label>
                    <select v-model="subject" @change="subjectChange()">
                        <option value="学科" disabled>学科</option>
                        <option value="">重置</option>
                        <option
                                v-for="item in this.$store.state.subjects"
                                :key="item.subjectId"
                                :label="item.subjectDescription"
                                :value="item.subjectId">
                        </option>
                    </select>
                </label>
            </el-col>

            <el-col :span="3">
                <label>
                    <select v-model="level" @change="levelChange()">
                        <option value="等级" disabled>等级</option>
                        <option value="">重置</option>
                        <option
                                v-for="item in this.$store.state.levels"
                                :key="item"
                                :label="item"
                                :value="item">
                        </option>
                    </select>
                </label>
            </el-col>

            <el-col :span="3">
                <label>
                    <select v-model="projectStatus" @change="projectStatusChange()">
                        <option value="是否可加入" disabled>是否可加入</option>
                        <option value="">重置</option>
                        <option
                                v-for="item in this.$store.state.projectStatus"
                                :key="item"
                                :label="item"
                                :value="item">
                        </option>
                    </select>
                </label>
            </el-col>

            <el-col :span="8" :offset="4">
                <button v-if="clickSearch" @click="clickSearch = false" style="background-color: white"><i class="el-icon-search"></i></button>
                <input v-else @keyup.enter="search" @change="watchSearchContent()" class="search_input"
                       placeholder="请输入要搜索的项目名字"
                       v-model="projectName"/>
            </el-col>
        </el-row>

        <el-row style="padding-top: 50px">
            <el-col style="padding-top: 20px" :span="8" v-for="item in curProjects" :key="item.projectId">
                <div class="project" @click="toProjectHomePage(item.projectId)">
                    <el-row id="title">
                        <h3 v-text="item.projectTitle"></h3>
                    </el-row>
                    <el-row id="introduction">
                        <p v-text="item.projectIntroduction"></p>
                    </el-row>
                    <el-row id="third">
                        <el-col :span="18" id="subject">
                            <el-col v-for="subject in curSubjects(item.subjectIds).data" :key="subject.subjectId"
                                    :span="7">
                                <DirectionTag :content="subject.subjectDescription"></DirectionTag>
                            </el-col>
                            <el-col v-if="curSubjects(item.subjectIds).num>3" :span="1">
                                ...
                            </el-col>
                        </el-col>
                        <el-col :span="4" id="member">
                            <i class="el-icon-user-solid">{{item.teamIds.length}}/{{item.personnelLimit}}</i>
                        </el-col>
                    </el-row>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-pagination
                    class="pager"
                    @current-change="handleCurrentChange"
                    :current-page.sync="page.currentPage"
                    :pager-count="15"
                    :page-size="page.pageSize"
                    :total="this.projects.length">
            </el-pagination>
        </el-row>
    </el-main>
</template>

<script>
    import DirectionTag from "@/components/common/DirectionTag";

    export default {
        name: "ProjectHall",
        components: {DirectionTag},
        data() {
            return {
                page: {
                    currentPage: 1,
                    pageSize: 12
                },
                collegeId: "学院",
                subject: "学科",
                level: "等级",
                projectStatus: "是否可加入",
                projectName: null,
                clickSearch: true,
                projects: [],
            }
        },
        watch:{

        },
        methods: {
            toProjectHomePage(projectId) {
                this.$router.push({path: '/projectHomePage', query: {projectId: projectId}})
            },
            watchSearchContent() {
                if (this.projectName === "") {
                    this.projectName = null;
                }
            },
            search() {
                if (this.projectName === null)
                    this.clickSearch = true;
                this.handleCurrentChange(1);
                this.getStudents();
            },
            handleCurrentChange(newPage) {
                this.page.currentPage = newPage;
            },
            collegeChange() {
                if (this.collegeId===""){
                    this.collegeId = "学院"
                }
                this.handleCurrentChange(1);
                this.getProjects()
            },
            projectStatusChange() {
                if (this.projectStatus===""){
                    this.projectStatus = "是否可加入"
                }
                this.handleCurrentChange(1);
                this.getProjects()
            },
            levelChange() {
                if (this.level===""){
                    this.level = "等级"
                }
                this.handleCurrentChange(1);
                this.getProjects()
            },
            subjectChange() {
                if (this.subject===""){
                    this.subject = "学科"
                }
                this.handleCurrentChange(1);
                this.getProjects()
            },
            getProjects() {

                let _this = this;
                this.$axios({
                    url: 'api/project',
                    method: "get",
                    params: {
                        // universityId: _this.$store.state.current_university.id,
                        projectTitle: _this.projectName,
                        subject: _this.subject==="学科"?null:_this.subject,
                        level: _this.level==="等级"?null:_this.level,
                        status: _this.projectStatus==="是否可加入"?null:_this.projectStatus,
                        collegeId: _this.collegeId==="学院"?null:_this.collegeId
                    }
                }).then(res => {
                    _this.projects = res.data.data;
                    console.log(JSON.stringify(res));
                }).catch(err => {
                    console.log("服务端错误"+JSON.stringify(err));
                })
            },
            curSubjects(subjectIds) {
                let subjects = this.$store.state.subjects;
                let ids = [];
                ids = subjectIds;
                let num = 0;
                let res = [];
                subjects.forEach(value => {
                    if (ids.indexOf(value.subjectId) !== -1) {
                        res.push(value);
                        num++;
                    }
                })
                if (num > 3) {
                    res = res.slice(0, 3);
                }
                return {data: res, num: num};
            }
        },
        computed: {
            curProjects() {
                let _this = this;
                let projects = _this.projects;
                if (_this.page.currentPage === _this.totalPage) {
                    projects = projects.slice((_this.page.currentPage - 1) * _this.page.pageSize);
                } else {
                    projects = projects.slice((_this.page.currentPage - 1) * _this.page.pageSize, _this.page.currentPage * _this.page.pageSize);
                }
                return projects;
            },
            totalPage() {
                return Math.ceil(this.projects.length / this.page.pageSize);
            }
        },
        mounted() {
            let _this = this;
            this.$axios({
                url: 'api/project',
                method: "get",
                params: {
                    // universityId: _this.$store.state.current_university.id,
                    projectTitle: null,
                    collegeId: null,
                    level: null,
                    status: null,
                    subject: null
                }
            }).then(res => {
                console.log("初始化项目数据" + JSON.stringify(res))
                _this.projects = res.data.data;
            }).catch(err => {
                console.log(err)
            })
        }
    }
</script>

<style scoped>
    select {
        width: 80%;
        height: 70px;

        font-size: 18px;
        padding-left: 20%;

        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .6);
        border-style: none;
        border-radius: 40px;

        outline: none;
    }

    .search_input {
        width: 70%;
        height: 70px;

        font-size: 18px;
        padding-left: 5%;

        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .5);
        border-style: none;
        border-radius: 40px;

        outline: none;
    }

    button {
        width: 70%;
        height: 70px;

        font-size: 18px;
        padding-left: 5%;

        box-shadow: 5px 5px 2px rgba(0, 0, 0, .12), 100px 0 100px rgba(0, 0, 0, .04);
        border-style: none;
        border-radius: 40px;

        outline: none;
    }

    .pager {
        padding-top: 30px;
        text-align: center
    }

    .project {
        border-radius: 10px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .6);
        height: 200px;
        width: 600px;

        padding-bottom: 0;
    }

    #title {
        padding: 20px 20px 20px 30px;
    }

    #introduction {
        padding: 20px 20px 20px 30px;
    }

    #third {
        padding-left: 20px;
        margin-top: 20px;
    }

    #subject {

    }

    #member {
        padding-left: 20px;
        padding-top: 8px;
    }
</style>