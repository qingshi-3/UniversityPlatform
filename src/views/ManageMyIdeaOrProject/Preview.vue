<template>
<!--  创意或者项目的预览  -->
    <div id="box" @click="viewHomePage">
        <el-col :span="20" id="title">
            <h5 v-text="title"></h5>
        </el-col>
        <el-col :span="4" id="date">
            <p v-text="date"></p>
        </el-col>
    </div>
</template>

<script>
    export default {
        name: "Preview",
        props:{
            itemType:String,
            id:Number,
            date:String,
            title:String
        },
        methods:{
            viewHomePage(){
                alert(this.itemType)
                if (this.itemType==="idea"){
                    alert("跳转去创意主页")
                }else if (this.itemType==="project"){
                    this.$router.push({path: '/projectHomePage', query: {projectId: this.id}})
                }
            }
        }
    }
</script>

<style scoped>
    #box{
        margin-top: 20px;
        margin-left: 40px;
        border-radius: 20px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .6);
        height: 100px;
        width: 1200px;
    }

    #title{
        padding-left: 30px;
        padding-top: 40px;
    }
    #title h5{
        font-size: 20px;
    }

    #date{
        padding-top: 40px;
    }

    #date p{
        font-size: 16px;
    }
</style>