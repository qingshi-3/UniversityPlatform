<template>
    <!--  导师大厅、同学大厅的预览  -->
    <div id="box">
        <el-row>
            <el-col :span="10">
                <el-row style="padding:20px 20px 20px 20px;">
                    <h1 v-text="teacher.name"></h1>
                </el-row>
                <el-row style="padding:20px 20px 20px 20px;">
                    <span v-text="teacher.college"></span>
                </el-row>
            </el-col>
            <el-col :span="6" :offset="4">
                <el-avatar :size="140" :src="teacher.avatarUrl"></el-avatar>
            </el-col>
        </el-row>
        <el-row id="directions">
            <el-col :span="8" v-for="item in teacher.direction" :key="item">
                <DirectionTag  :content="item"></DirectionTag>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import DirectionTag from "@/components/common/DirectionTag";
    export default {
        name: "PersonHallPreview",
        components: {DirectionTag},
        data(){
            return {

            }
        },
        props:{
            teacher:Object
        }
    }
</script>

<style scoped>
    #box{
        border-radius: 10px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .6);
        height: 200px;
        width: 400px;

        padding-bottom: 0;
    }
    #directions{
    }
</style>