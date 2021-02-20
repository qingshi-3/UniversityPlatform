<template>
    <!--  导师大厅、同学大厅的预览  -->
    <div id="box" @click="viewPersonHomePage()">
        <el-row>
            <el-col :span="10">
                <el-row style="padding:20px 20px 20px 20px;">
                    <h1 v-text="person.name"></h1>
                </el-row>
                <el-row style="padding:20px 20px 20px 20px;">
                    <span v-text="person.collegeDescription"></span>
                </el-row>
            </el-col>
            <el-col :span="6" :offset="4">
                <el-avatar :size="140" :src="person.avatarUrl"></el-avatar>
            </el-col>
        </el-row>
        <el-row id="directions">
            <el-col :span="7" v-for="item in directions" :key="item.directionId">
                <DirectionTag  :content="item.directionDescription"></DirectionTag>
            </el-col>
            <el-col :span="3" v-if="moreThanThree">
                ...
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
                moreThanThree:false
            }
        },
        props:{
            person:Object,
            role:String
        },
        methods:{
            viewPersonHomePage(){
                if (this.role==="teacher")
                    this.$router.push({ path: '/teacherHomePage', query: { teacherId: this.person.userId } })
                else
                    this.$router.push({ path: '/classMateHomePage', query: { studentId: this.person.userId } })
            }
        },
        computed:{
            directions() {
                let _this = this;
                let directions = _this.person.directions;
                if (directions.length>2){
                    _this.moreThanThree = true;
                    directions = directions.slice(0,3);
                }
                return directions;
            }
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