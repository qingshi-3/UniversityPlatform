<template>
<!--  创意主页  -->
    <div id="box">
        <el-row style="margin-left:100px">
            <el-col :span="18">
                <IdeaPreview :canJump="false" :idea="idea"></IdeaPreview>
            </el-col>
            <el-col :span="6">
                <div id="userData">
                    <el-row>
                        <el-col :span="10">
                            <el-image style="width: 140px;height: 140px;border-radius: 100px;margin-top: 20px;margin-left: 20px" :src="idea.portraitUrl"></el-image>
<!--                            <i class="el-icon-user-solid" style="font-size: 700%;margin-left: 10px"></i>-->
                        </el-col>
                        <el-col :span="12" :push="3" style="margin-top: 60px;">
                            <h5 v-text="idea.name" style="font-size: 30px"></h5>
                        </el-col>
                    </el-row>
                    <el-row style="margin-top: 30px">
                        <el-col :span="6" :push="2">
                            <p v-text="idea.gradeId"></p>
                        </el-col>
                        <el-col :push="4" :span="10">
                            <p v-text="idea.collegeDescription"></p>
                        </el-col>
                    </el-row>
                </div>
            </el-col>
        </el-row>
        <el-row id="reply">
            <el-row style="margin-bottom: 10px">
                <el-col :span="2">
                    <h3 style="font-size: 40px;margin-bottom: 10px">评论:</h3>
                </el-col>
                <el-col :span="4" :push="13">
                    <el-popover
                            placement="right"
                            width="400"
                            trigger="click">
                        <div id="review">
                            <el-row>
                                <textarea v-model="review">
                                </textarea>
                            </el-row>
                            <el-row>
                                <button id="submit" @click="submitReview">发布</button>
                            </el-row>
                        </div>
                        <button id="popover" slot="reference">留言</button>
                    </el-popover>
                </el-col>
            </el-row>
            <el-row v-for="reply in idea.replies" :key="reply.replyId">
                <Reply :reply="reply"></Reply>
            </el-row>
        </el-row>
    </div>
</template>

<script>
    import IdeaPreview from "@/views/IdeaHall/IdeaPreview";
    import Reply from "@/views/IdeaHall/Reply";
    export default {
        name: "IdeaHomePage",
        components: {Reply, IdeaPreview},
        data(){
          return {
              idea:null,
              preIdea:null,
              review:null,
          }
        },
        created(){
            this.$axios({
                url:'/api/idea/home',
                method:'get',
                params:{
                    ideaId:this.$route.query.ideaId
                }
            }).then(res => {
                console.log("当前创意"+JSON.stringify(res));
                this.idea = res.data.data;
            })
        },
        methods:{
            submitReview(){
                let _this = this;
                this.$axios({
                    url:'/api/reply',
                    method:'post',
                    params:{
                        userId:this.$store.state.current_user_data.userId,
                        ideaId:_this.idea.ideaId,
                        responseId:null,
                        replyContent:_this.review
                    }
                }).then(res => {
                    alert("评论成功"+JSON.stringify(res))
                })
            }
        }
    }
</script>

<style scoped>
    #review{

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
    p{
        margin-top: 50px;
        margin-left: 20px;
        font-size: 15px;
    }
    #userData{

        margin-left: 100px;

        width: 300px;
        height: 320px;

        border-radius: 10px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .6);
    }

    #reply{
        margin-top: 20px;
        margin-left: 300px;
    }
    #popover {
        width: 120px;
        height: 60px;

        background-color: white;
        font-size: 18px;
        padding-left: 5%;

        margin-left: 35px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .4);
        border-style: none;
        border-radius: 40px;

        outline: none;
    }

    #submit{
        width: 120px;
        height: 60px;

        background-color: white;
        font-size: 18px;

        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .4);
        border-style: none;
        border-radius: 40px;

        outline: none;
    }
</style>