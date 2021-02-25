<template>
<!--  动态预览  -->
    <div id="box">
        <el-row>
            <el-col :span="3" style="font-size: 400%;margin-top: 10px;margin-left: 20px;">
                <i class="el-icon-chat-dot-square"></i>
            </el-col>
            <el-col :span="16" style="margin-top: 35px;font-size: 20px">
                <el-col :span="2">
                    <p style="color: dodgerblue;cursor: pointer" @click="viewUser" v-text="message.messageFromName"></p>
                </el-col>
                <el-col :span="1">
                    在
                </el-col>
                <el-col :span="4">
                    <p style="color: dodgerblue;cursor: pointer" @click="viewIdea" v-text="message.messageOnIdeaTitle"></p>
                </el-col>
                <el-col :span="2">
                    评论到:
                </el-col>
                <el-col :span="14">
                    <p v-text="message.messageContent"></p>
                </el-col>
            </el-col>
            <el-col :span="4" style="margin-top: 35px;font-size: 15px">
                <p v-text="message.messageDatetime"></p>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "MessagePreview",
        props:{
            message:Object,
        },
        methods:{
            viewIdea(){
                this.$router.push({
                    path:'/ideaHomePage',
                    query:{
                        ideaId:this.message.messageOnIdea
                    }
                })
            },
            viewUser(){
                this.$router.push({
                    path:'/classMateHomePage',
                    studentId:this.message.messageFrom
                })
            }
        }
    }
</script>

<style scoped>
    #box{
        margin-top: 20px;
        margin-left: 80px;
        border-radius: 20px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .6);
        height: 100px;
        width: 1400px;
    }
</style>