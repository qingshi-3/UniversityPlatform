<template>
<!--  用在很多地方的纯文字标签：如技术方向、设计领域等  -->
    <div id="tag">
        <el-col :span="20">
            <h4>{{content}}</h4>
        </el-col>
        <el-col :span="4">
            <i class="el-icon-circle-close" v-if="canDelete" @click="deleteDirection"></i>
        </el-col>
    </div>
</template>

<script>
    export default {
        name: "DirectionTag",
        props:{
            content: String,
            canDelete:{
                type:Boolean,
                default:false
            },
            directionId:{
                type:Number,
                default: 0
            }
        },
        methods:{
            deleteDirection(){
                for (let i = 0; i <this.$store.state.current_user_data.directions.length ; i++) {
                    if(this.$store.state.current_user_data.directions[i].directionId===this.directionId){
                        this.$store.state.current_user_data.directions.splice(i,1);
                    }
                }
            }
        }
    }
</script>

<style scoped>
    #tag {
        border-radius: 30px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .3);
        height: 40px;
        width: 110px;
    }
    #tag h4 {
        padding-top: 10%;
        text-align: center;
    }
    *{
        margin: 0 0 0 0;
    }
</style>