<template>
    <!--  管理创意或项目  -->
    <div>
        <el-tabs type="border-card" id="tabs" v-model="active">
            <el-tab-pane label="我的创意" name="idea">
                <el-row v-for="idea in ideas" :key="idea.id">
                    <el-col :span="20">
                        <Preview :itemType="ideaType" :title="idea.ideaTitle" :id="idea.ideaId" :date="idea.ideaDatetime"></Preview>
                    </el-col>
                    <el-col :span="4">
                        <el-col :span="12">
                            <el-button round class="button" @click="editIdea(idea.ideaId)">
                                编辑
                            </el-button>
                        </el-col>
                        <el-col :span="12">
                            <el-button round class="button">
                                删除
                            </el-button>
                            <!--                        @click="deleteIdea(item.id)"    -->
                        </el-col>
                    </el-col>
                </el-row>
            </el-tab-pane>
            <el-tab-pane label="我的项目" name="project">
                <el-row v-if="isTeacher">
                    <el-button round id="ButtonCreate" @click="createProject">
                        新建项目
                    </el-button>
                </el-row>
                <el-row v-for="project in projects" :key="project.id">
                    <el-col :span="20">
                        <Preview :itemType="projectType" :title="project.projectTitle" :id="project.projectId" :date="project.projectCreatedDate"></Preview>
                    </el-col>
                    <el-col :span="4">
                        <el-col :span="12" v-if="isTeacher">
                            <el-button round class="button" @click="editProject(project.projectId)">
                                配置
                            </el-button>
                        </el-col>
                        <el-col :span="12">
                            <el-button round class="button" @click="exitProject(project.projectId)">
                                退出
                            </el-button>
                        </el-col>
                    </el-col>
                </el-row>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import Preview from "@/views/ManageMyIdeaOrProject/Preview";

    export default {
        name: "ManageMyIdeaOrProject",
        components: {Preview},
        data() {
            return {
                ideas: [],
                projects:[],
                active:this.$store.state.active,
                projectType:"project",
                ideaType:"idea",
                isTeacher:this.$store.state.current_user_data.role==="teacher",
            };
        },
        methods:{
            exitProject(projectId) {
             this.$axios({
                 url:'/api/project/exit',
                 method:'put',
                 params:{
                    userId:this.$store.state.current_user_data.userId,
                    projectId:projectId
                 }
             }).then(res=>{
                 console.log("退出项目成功"+JSON.stringify(res))
             })
            },
            editProject(projectId){
                this.$router.push({
                    path:'/editProject',
                    query:{
                        projectId:projectId
                    }
                })
            },
            editIdea(ideaId){
                this.$router.push({
                    path:'/editIdea',
                    query:{
                        ideaId:ideaId
                    }
                })
            },
            createProject(){
                this.$router.push({
                    path:'/editProject',
                    query:{
                        projectId:null,
                        teacherId:null
                    }
                })
            }
        },
        computed:{
        },
        mounted() {
            let _this = this;
            let userId = this.$store.state.current_user_data.userId
            this.$axios({
                url:'/api/idea/my',
                method:'get',
                params:{
                    userId:userId
                }
            }).then(res => {
                console.log("我的所有创意"+JSON.stringify(res));
                _this.ideas = res.data.data;
            })
            this.$axios({
                url:'/api/project/my',
                method:'get',
                params:{
                    userId:userId
                }
            }).then(res => {
                console.log("我的所有项目"+JSON.stringify(res));
                _this.projects = res.data.data;
            })
        }
    }
</script>

<style scoped>
    #tabs {
        width: 1580px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.5);
        margin-left: 200px;
    }

    button {
        width: 110px;
        height: 60px;
        margin-top: 30px;
        box-shadow: 2px 4px 12px 0 rgba(0, 0, 0, 0.2);
        border-width: 0;
        border-radius: 40px;
        background-color: white;
        outline: none;
        font-size: 20px;
    }

    #ButtonCreate {
        margin-left: 1400px;
        width: 140px;
        height: 60px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.3);
        border-radius: 30px;
        margin-top: 10px;
        margin-bottom: 20px;
    }

    .button {
        width: 120px;
        height: 60px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.3);
        border-radius: 30px;
        margin-top: 30px
    }
</style>