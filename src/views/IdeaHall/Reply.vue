<template>
<!--  创意主页的评论  -->
    <div id="box">
        <el-col :span="4">
            <el-image style="width: 170px;height: 170px;border-radius: 100px;margin-top: 20px;margin-left: 20px" :src="reply.replyPortraitUrl"></el-image>
        </el-col>
        <el-col :span="16" :push="1">
            <el-row>
                <h4 style="font-size: 30px;margin-top: 20px" v-text="reply.replyName+':'"></h4>
            </el-row>
            <el-row>
                <p style="margin-top: 20px;font-size: 20px" v-text="reply.replyContent"></p>
            </el-row>
        </el-col>
        <el-col :span="4">
            <el-row>
                <p v-text="'发表日期:'+reply.replyDatetime" style="margin-top: 80px"></p>
            </el-row>
        </el-col>
    </div>
</template>

<script>
    export default {
        name: "Reply",
        props:{
            reply:Object,
        }
    }
</script>

<style scoped>
    #box{
        border-radius: 10px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .6);
        height: 200px;
        width: 1200px;
        padding-bottom: 20px;
    }
</style>