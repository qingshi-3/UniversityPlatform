<template>
<!--  同学主页  -->
    <div>
        <el-row id="introduction">
            <el-col :span="5">
                <el-image :src="student.portaitUrl">
                    <div slot="error" class="image-slot">
                        <i class="el-icon-picture-outline"></i>
                    </div>
                </el-image>
            </el-col>
            <el-col :span="19">
                <el-row>
                    <h4 v-text="student.name"></h4>
                </el-row>
                <el-row>
                    <p v-text="student.introduction"></p>
                </el-row>
            </el-col>
        </el-row>
        <el-row id="direction">
            <h3>擅长</h3>
            <el-col :span="2" v-for="direction in student.directions" :key="direction.directionId">
                <DirectionTag :content="direction.directionDescription"></DirectionTag>
            </el-col>
        </el-row>
        <el-row id="project">
            <el-row>
                <el-col :span="2">
                    <h3>项目</h3>
                </el-col>
            </el-row>
            <el-row>
                <el-col v-for="project in student.projects" :key="project.projectId" :span="12">
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
                <el-col v-for="idea in student.ideas" :key="idea.ideaId" :span="12">
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
            <h3>成果</h3>
            <el-row>
                <p v-text="student.findings"></p>
            </el-row>
        </el-row>
    </div>
</template>

<script>
    import DirectionTag from "@/components/common/DirectionTag";
    export default {
        name: "ClassMateHomePage",
        components: {DirectionTag},
        data(){
            return {
                student: null,
            }
        },
        computed:{

        },
        methods:{
            viewIdeaHome(ideaId){
                this.$router.push({ path: '/ideaHomePage', query: { ideaId: ideaId } })
            },
            viewProjectHome(projectId){
                this.$router.push({ path: '/projectHomePage', query: { projectId: projectId } })
            }
        },
        created() {
            let _this = this;
            let studentId;
            if (_this.$route.query.studentId){
                studentId = _this.$route.query.studentId;
                this.$axios({
                    url:'/api/user/home',
                    method:'get',
                    params:{
                        userId:studentId
                    }
                }).then(res => {
                    console.log("同学详细信息"+JSON.stringify(res))
                    _this.student = res.data.data;
                })
            }else{
                _this.student = _this.$store.state.current_user_data;
            }
        }
    }
</script>

<style scoped>
    #introduction{
        height: 300px;
        width: 84%;
        margin-left: 8%;
        border-radius: 30px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.5);
    }
    #introduction .el-image{
        margin-top: 50px;
        margin-left: 50px;
        width: 200px;
        height: 200px;
        border-radius: 100px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.4);
    }
    #introduction h4{
        margin-top: 70px;
        font-size: 30px;
    }
    #introduction p{
        margin-top: 30px;
        font-size: 20px;
    }


    #direction{
        /*box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.5);*/
        padding-top: 40px;
        width: 84%;
        margin-left: 8%;
    }
    #direction h3{

        padding-bottom: 20px;
    }
    #direction .el-button{
    }


    #project{
        /*box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.5);*/
        padding-top: 40px;
        width: 84%;
        margin-left: 8%;
    }
    #projectPreview{
        margin-top: 20px;
        width: 755px;
        height: 200px;
        margin-left: 20px;
        padding-left: 30px;
        border-radius: 30px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);
    }
    #projectPreview h5{
        font-size: 30px;
    }
    #projectPreview p{
        font-size: 20px;
    }



    #idea{
        padding-top: 40px;
        /*box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.5);*/
        width: 84%;
        margin-left: 8%;
    }
    #ideaPreview{
        margin-top: 20px;
        width: 755px;
        height: 200px;
        margin-left: 20px;
        padding-left: 30px;
        border-radius: 30px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);
    }
    #ideaPreview h5{
        font-size: 30px;
    }


    #results{
        padding-top: 40px;
        /*box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.5);*/
        width: 84%;
        margin-left: 8%;
    }
    #results p{
        font-size: 20px;
        padding-left: 30px;
        margin-top: 20px;
    }


</style>