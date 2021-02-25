<template>
<!--  项目加入申请和项目创建申请  -->
    <div id="box">
        <el-row>
            <el-col :span="3" style="font-size: 400%;margin-top: 10px;margin-left: 20px;">
                <i class="el-icon-chat-dot-square"></i>
            </el-col>
            <el-col :span="6" style="margin-top: 35px;font-size: 20px">
                <el-col :span="8">
                    <p style="color: dodgerblue;cursor: pointer" @click="viewUser" v-text="application.studentName"></p>
                </el-col>
                <el-col :span="8">
                    申请加入
                </el-col>
                <el-col :span="8">
                    <p style="color: dodgerblue;cursor: pointer" @click="viewProject" v-text="projectTitle"></p>
                </el-col>
            </el-col>
            <el-col style="" :span="14">
                <el-col :span="8">
                    <button :disabled="application.applicationState!=='待处理'" @click="refuse()">
                        拒绝
                    </button>
                </el-col>
                <el-col :span="8">
                    <el-popover
                            placement="right"
                            width="400"
                            trigger="click">
                        <div>
                            <textarea disabled v-model="application.applicationDescription">
                            </textarea>
                        </div>
                        <button slot="reference">留言
                        </button>
                    </el-popover>
                </el-col>
                <el-col :span="8">
                    <button v-if="application.applicationState==='已同意'">
                        已同意
                    </button>
                    <button v-else-if="application.applicationState==='已拒绝'">
                        已拒绝
                    </button>
                    <button v-else @click="accept()">
                        同意
                    </button>
                </el-col>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "ApplyForProject",
        data(){
            return {
                projectTitle:"",
            }
        },
        props:{
            application: {
                type:Object,
                default:() => {
                    return {
                        "applicationId":null,
                        "studentId":null,
                        "studentName":"",
                        "projectId":null,
                        // "projectTitle":"",
                        "applicationDescription": "",
                        "applicationState": "已同意",//（已同意，已拒绝，待处理）
                        "applicationType":"加入"//(加入，创建)
                    }
                }
            }
        },
        methods:{
            accept(){
                this.$axios({
                    url:'/api/application/accept',
                    method:'put',
                    params:{
                        userId:this.$store.state.current_user_data.userId,
                        applicationId:this.application.applicationId
                    }
                }).then(res => {
                    if (res.data.data.code!==404){
                        console.log("同意成功")
                    }
                })
            },
            refuse(){
              this.$axios({
                  url:'/api/application/reject',
                  method:'put',
                  params:{
                      userId:this.$store.state.current_user_data.userId,
                      applicationId:this.application.applicationId
                  }
              }).then(res => {
                  if (res.data.data.code!==404){
                      console.log("拒绝成功")
                  }
              })
            },
            viewUser(){
                this.$router.push({
                    path:'/classMateHomePage',
                    query:{
                        studentId:this.application.studentId
                    }
                })
            },
            viewProject(){
                this.$router.push({
                    path:'/projectHomePage',
                    query:{
                        projectId:this.application.projectId
                    }
                })
            }
        },
        created(){
            this.$axios({
                url:'/api/project/home',
                method:'get',
                params:{
                    projectId:this.application.projectId
                }
            }).then(res => {
                console.log("目标项目"+JSON.stringify(res));
                this.projectTitle = res.data.data.projectTitle
            })
        }
    }
</script>

<style scoped>
    #box {
        margin-top: 20px;
        margin-left: 80px;
        border-radius: 20px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .6);
        height: 100px;
        width: 1400px;
    }
    button {
        width: 110px;
        height: 60px;
        margin-left: 120px;
        margin-top: 20px;
        box-shadow: 2px 4px 12px 0 rgba(0, 0, 0, 0.2);
        border-width: 0;
        border-radius: 40px;
        background-color: white;
        outline: none;
        font-size: 20px;
    }

    textarea{
        resize: none;
        outline-style: none;
        border-radius: 10px;
        box-shadow: 2px 4px 12px 0 rgba(0, 0, 0, 0.4);
        border-width: 0;
        font-size: 20px;
        width: 300px;
        height: 140px;
    }

</style>