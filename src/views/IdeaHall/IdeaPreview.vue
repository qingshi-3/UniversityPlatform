<template>
<!--  创意大厅的创意预览  -->
    <div id="box" @click="viewIdeaHomePage">
        <el-row style="margin-left: 40px;padding-top: 30px">
            <h3 style="font-size: 30px" v-text="idea.ideaTitle"></h3>
        </el-row>
        <el-row>
            <textarea disabled v-text="idea.ideaContent"></textarea>
        </el-row>
        <el-row style="margin-top: 20px;margin-left: 40px">
            <el-col :span="3" v-for="subject in curSubjects" :key="subject.subjectId">
                <DirectionTag :content="subject.subjectDescription"></DirectionTag>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import DirectionTag from "@/components/common/DirectionTag";
    export default {
        name: "IdeaPreview",
        components: {DirectionTag},
        data(){
            return{
            }
        },
        props:{
            idea: {
                type:Object,
                default:() => {
                    return {
                        subjects: [
                            1
                        ],
                        replies: null,
                        name: "0_富贵",
                        nickname: "刘青山",
                        gradeId: 2018,
                        collegeId: 0,
                        collegeDescription: null,
                        ideaId: 1,
                        userId: 1,
                        ideaContent: "离开后的时间里你是否还失眠,从不熬夜的我也明显黑了眼圈,你送的玩偶依然陪在身边记忆逐渐浮现从开始到终点 又重演我想和你 一起闯进森林潜入海底我想和你 一起看日出到日落天气我想和你穿过格林威治和时间飞行",
                        ideaDatetime: "2021-02-08T21:46:50.000+00:00",
                        ideaTitle: "失眠飞行✈️",
                        ideaDeleted: false
                    }
                }
            },
            canJump:{
                type:Boolean,
                default:true
            }
        },
        methods:{
            viewIdeaHomePage(){
                if (this.canJump){
                    this.$router.push({
                        path:'/ideaHomePage',
                        query:{
                            ideaId:this.idea.ideaId
                        }
                    })
                }
            }
        },
        computed:{
            curSubjects(){
                let res = [];
                this.$store.state.subjects.forEach(value => {
                    let len = this.idea.subjects.length;
                    for (let i = 0; i <len ; i++) {
                        if (this.idea.subjects[i]===value.subjectId){
                            res.push(value);
                        }
                    }
                    if (res.length===len){
                        return res;
                    }
                })
                return res;
            }
        }
    }
</script>

<style scoped>
    #box{
        border-radius: 10px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .6);
        height: 300px;
        width: 1500px;
        padding-bottom: 20px;
    }
    textarea{
        resize: none;
        margin-top: 20px;
        margin-left: 40px;
        outline-style: none;
        border-radius: 10px;
        box-shadow: 2px 4px 12px 0 rgba(0, 0, 0, 0.4);
        border-width: 0;
        font-size: 20px;
        width: 1300px;
        height: 140px;
    }
</style>