<template>
<!--  消息列表  -->
    <div>
        <el-tabs type="border-card" id="tabs" value="notice">
<!--                 v-model="noticeActive">-->
            <el-tab-pane label="动态" name="notice">
                <el-row v-for="message in messages" :key="message.messageId">
                    <MessagePreview :message="message"></MessagePreview>
                </el-row>
<!--                <el-row v-for="idea in ideas" :key="idea.id">-->
<!--                    <el-col :span="20">-->
<!--                        <Preview :itemType="ideaType" :title="idea.ideaTitle" :id="idea.ideaId" :date="idea.ideaDatetime"></Preview>-->
<!--                    </el-col>-->
<!--                    <el-col :span="4">-->
<!--                        <el-col :span="12">-->
<!--                            <el-button round class="button">-->
<!--                                编辑-->
<!--                            </el-button>-->
<!--                            &lt;!&ndash;                         @click="modifyIdea(item.id)"   &ndash;&gt;-->
<!--                        </el-col>-->
<!--                        <el-col :span="12">-->
<!--                            <el-button round class="button">-->
<!--                                删除-->
<!--                            </el-button>-->
<!--                            &lt;!&ndash;                        @click="deleteIdea(item.id)"    &ndash;&gt;-->
<!--                        </el-col>-->
<!--                    </el-col>-->
<!--                </el-row>-->
            </el-tab-pane>
            <el-tab-pane label="项目加入申请" name="projectApplication">
                <el-row v-for="application in applications" :key="application.applicationId">
                    <ApplyForProject :application="application"></ApplyForProject>
                </el-row>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import MessagePreview from "@/views/NoticeList/MessagePreview";
    import ApplyForProject from "@/views/NoticeList/ApplyForProject";
    export default {
        name: "NoticeList",
        components: {ApplyForProject, MessagePreview},
        data(){
            return {
                messages:[],
                applications:[],
                noticeActive:this.$store.state.noticeActive,
            }
        },
        created(){
            this.$axios({
                url:'/api/message/my',
                method:'get',
                params:{
                    userId:this.$store.state.current_user_data.userId
                }
            }).then(res => {
                console.log("我的所有评论"+JSON.stringify(res));
                this.messages = res.data.data;
            })

            this.$axios({
                url:'/api/application/my',
                method:'get',
                params:{
                    userId:this.$store.state.current_user_data.userId,
                    type:"join"
                }
            }).then(res => {
                console.log("加入申请"+JSON.stringify(res));
                this.applications = res.data.data;
            })

            // this.messages = [
            //     {
            //         "messageOnIdeaTitle": "失眠飞行✈️",//C创意的标题
            //         "messageFromName": "0_富贵", //A用户的姓名
            //         "messageId": 1,
            //         "messageFrom": 1, //来自A用户的消息，这是A用户的Id
            //         "messageTo": 499, //发给B用户的消息，这是B用户的Id
            //         "messageChecked": 0,//消息B用户是否已读
            //         "messageDatetime": "2021-02-01T22:10:23.000+00:00",
            //         "messageContent": "hhh",
            //         "messageOnIdea": 3 //关于C创意的消息，这是C创意的Id
            //     },{
            //         "messageOnIdeaTitle": "失眠飞行✈️",//C创意的标题
            //         "messageFromName": "0_富贵", //A用户的姓名
            //         "messageId": 2,
            //         "messageFrom": 1, //来自A用户的消息，这是A用户的Id
            //         "messageTo": 499, //发给B用户的消息，这是B用户的Id
            //         "messageChecked": 0,//消息B用户是否已读
            //         "messageDatetime": "2021-02-01T22:10:23.000+00:00",
            //         "messageContent": "hhh",
            //         "messageOnIdea": 3 //关于C创意的消息，这是C创意的Id
            //     },{
            //         "messageOnIdeaTitle": "失眠飞行✈️",//C创意的标题
            //         "messageFromName": "0_富贵", //A用户的姓名
            //         "messageId": 3,
            //         "messageFrom": 1, //来自A用户的消息，这是A用户的Id
            //         "messageTo": 499, //发给B用户的消息，这是B用户的Id
            //         "messageChecked": 0,//消息B用户是否已读
            //         "messageDatetime": "2021-02-01T22:10:23.000+00:00",
            //         "messageContent": "hhh",
            //         "messageOnIdea": 3 //关于C创意的消息，这是C创意的Id
            //     }
            // ]
        }
    }
</script>

<style scoped>
    #tabs {
        width: 1580px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.5);
        margin-left: 200px;
        padding-bottom: 20px;
    }
</style>