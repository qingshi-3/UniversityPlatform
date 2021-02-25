<template>
    <!--  导师主页  -->
    <div>
        <el-row id="introduction">
            <el-col :span="5">
                <el-image :src="teacher.portaitUrl">
                    <div slot="error" class="image-slot">
                        <i class="el-icon-picture-outline"></i>
                    </div>
                </el-image>
            </el-col>
            <el-col :span="19">
                <el-row>
                    <h4 v-text="teacher.name"></h4>
                </el-row>
                <el-row>
                    <p v-text="teacher.introduction"></p>
                </el-row>
            </el-col>
        </el-row>
        <el-row id="direction">
            <h3>研究方向</h3>
            <el-col :span="2" v-for="direction in teacher.directions" :key="direction.directionId">
                <DirectionTag :content="direction.directionDescription"></DirectionTag>
            </el-col>
        </el-row>
        <el-row id="project">
            <el-row>
                <el-col :span="2">
                    <h3>现有项目</h3>
                </el-col>
                <el-col :span="3" :push="20">
                    <el-button round @click="applyNewProject()">申请新项目</el-button>
                </el-col>
            </el-row>
            <el-row>
                <el-col v-for="project in teacher.projects" :key="project.projectId" :span="12">
                    <div id="projectPreview" @click="viewProjectHome(project.projectId)">
                        <el-row>
                            <h5 v-text="project.projectTitle"></h5>
                        </el-row>
                        <el-row>
                            <h5 v-text="project.projectLevel"></h5>
                        </el-row>
                        <el-row>
                            <p v-text="project.projectIntroduction"></p>
                        </el-row>
                    </div>
                </el-col>
            </el-row>
        </el-row>
        <el-row id="idea">
            <el-row>
                <h3>创意</h3>
            </el-row>
            <el-row>
                <el-col v-for="idea in teacher.ideas" :key="idea.ideaId" :span="12">
                    <div id="ideaPreview" @click="viewIdeaHome(idea.ideaId)">
                        <el-row>
                            <h5 v-text="idea.ideaTitle"></h5>
                        </el-row>
                        <el-row>
                            <p v-text="idea.ideaContent"></p>
                        </el-row>
                    </div>
                </el-col>
            </el-row>
        </el-row>
        <el-row id="results">
            <h3>研究成果</h3>
            <el-row>
                <p v-text="teacher.findings"></p>
            </el-row>
        </el-row>
        <el-row id="evaluation">
            <el-row>

                <el-col :span="2">
                    <h3>评价</h3>
                </el-col>
                <el-col :span="20">
                    <el-popover
                            placement="right"
                            width="400"
                            trigger="click">
                        <div id="review">
                            <el-row>
                                <textarea v-model="review.content">
                                </textarea>
                            </el-row>
                            <el-rate v-model="review.score"></el-rate>
                            <el-row>
                                <el-button round @click="reviewTeacher()">发表</el-button>
                            </el-row>
                        </div>
                        <button id="popover" slot="reference">发表评价</button>
                    </el-popover>
                </el-col>
            </el-row>
            <el-row v-for="evaluation in curEvaluation" :key="evaluation.evaluateId" style="margin-top: 40px">
                <div style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .4);
                            border-radius: 40px;
                               width: 1500px;
                               height: 80px;
                               margin-left: 100px;
                            ">
                    <el-col :span="5" style="margin-top: 25px;padding-left: 25px">
                        评分
                        <el-rate
                                v-model="evaluation.evaluateGrade"
                                disabled
                                text-color="#ff9900">
                        </el-rate>
                    </el-col>
                    <el-col :span="13" style="margin-top: 25px">
                        <h5 style="font-size: 25px" v-text="'评论:'+evaluation.evaluateDescription"></h5>
                    </el-col>
                    <el-col :span="6" style="margin-top: 25px">
                        <p v-text="'评论时间:'+evaluation.evaluateDate"></p>
                    </el-col>
                </div>
            </el-row>
            <el-row>
                <el-pagination
                        class="pager"
                        @current-change="handleCurrentChange"
                        :current-page.sync="currentPage"
                        :page-size="pageSize"
                        :total="teacher.evaluates.length">
                </el-pagination>
            </el-row>
        </el-row>
    </div>
</template>

<script>
    import DirectionTag from "@/components/common/DirectionTag";

    export default {
        name: "TeacherHomePage",
        components: {DirectionTag},
        data() {
            return {
                teacher: null,
                currentPage: 1,
                pageSize: 4,
                review: {
                    content: "",
                    score: null
                },

            }
        },
        computed: {
            curEvaluation() {
                let _this = this;
                let evaluations = _this.teacher.evaluates;
                if (_this.currentPage === _this.totalPage) {
                    evaluations = evaluations.slice((_this.currentPage-1) * _this.pageSize);
                } else {
                    evaluations = evaluations.slice((_this.currentPage - 1) * _this.pageSize, _this.currentPage * _this.pageSize);
                }
                return evaluations;
            },
            totalPage() {
                return Math.ceil(this.teacher.evaluates.length / this.pageSize);
            }
        },
        methods: {
            reviewTeacher() {
                alert(this.review.content+this.review.score);
                this.$axios({
                    url:'/api/user/evaluate',
                    method:'put',
                    params:{
                        userId:this.$store.state.current_user_data.userId,
                        teacherId:this.teacher.userId,
                        evaluateGrade:this.review.score,
                        evaluateDescription:this.review.content
                    }
                }).then(res=>{
                    console.log("评价成功"+JSON.stringify(res));
                })
            },
            handleCurrentChange(newPage) {
                this.currentPage = newPage
            },
            viewIdeaHome(ideaId) {
                this.$router.push({path: '/ideaHomePage', query: {ideaId: ideaId}})
            },
            viewProjectHome(projectId) {
                this.$router.push({path: '/projectHomePage', query: {projectId: projectId}})
            },
            applyNewProject() {
                this.$router.push({path: '/editProject', query: {teacher: this.teacher}})
            }
        },
        created() {
            let _this = this;
            this.$axios({
                url: '/api/user/home',
                method: 'get',
                params: {
                    userId: _this.$route.query.teacherId
                }
            }).then(res => {
                console.log("导师详细信息" + JSON.stringify(res))
                _this.teacher = res.data.data;
            })
        }
    }
</script>

<style scoped>
    #popover {
        margin-left: 1400px;
        width: 120px;
        height: 40px;

        background-color: white;
        font-size: 18px;

        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .4);
        border-style: none;
        border-radius: 40px;

        cursor: pointer;
        outline: none;
    }
    #review textarea{
        resize: vertical;
        outline-style: none;
        border-radius: 10px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .4);
        border-width: 0;
        font-size: 20px;
        width: 385px;
        height: 140px;
        padding-left: 5px;
        padding-top: 5px;
    }

    button {
        width: 120px;
        height: 40px;

        background-color: white;
        font-size: 18px;

        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .4);
        border-style: none;
        border-radius: 40px;

        cursor: pointer;
        outline: none;
    }

    #introduction {
        height: 300px;
        width: 84%;
        margin-left: 8%;
        border-radius: 30px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.5);
    }

    #introduction .el-image {
        margin-top: 50px;
        margin-left: 50px;
        width: 200px;
        height: 200px;
        border-radius: 100px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.4);
    }

    #introduction h4 {
        margin-top: 70px;
        font-size: 30px;
    }

    #introduction p {
        margin-top: 30px;
        font-size: 20px;
    }


    #direction {
        /*box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.5);*/
        padding-top: 40px;
        width: 84%;
        margin-left: 8%;
    }

    #direction h3 {

        padding-bottom: 20px;
    }

    #direction .el-button {
    }


    #project {
        /*box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.5);*/
        padding-top: 40px;
        width: 84%;
        margin-left: 8%;
    }

    #projectPreview {
        margin-top: 20px;
        width: 755px;
        height: 200px;
        margin-left: 20px;
        padding-left: 30px;
        border-radius: 30px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);
    }

    #projectPreview h5 {
        font-size: 30px;
    }

    #projectPreview p {
        font-size: 20px;
    }


    #idea {
        padding-top: 40px;
        /*box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.5);*/
        width: 84%;
        margin-left: 8%;
    }

    #ideaPreview {
        margin-top: 20px;
        width: 755px;
        height: 200px;
        margin-left: 20px;
        padding-left: 30px;
        border-radius: 30px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);
    }

    #ideaPreview h5 {
        font-size: 30px;
    }


    #results {
        padding-top: 40px;
        /*box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.5);*/
        width: 84%;
        margin-left: 8%;
    }

    #results p {
        font-size: 20px;
        padding-left: 30px;
    }


    #evaluation {
        padding-top: 40px;
        /*box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.5);*/
        width: 84%;
        margin-left: 8%;
    }

    .pager {

        margin-top: 50px;
        text-align: center
    }
</style>