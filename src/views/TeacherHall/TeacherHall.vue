<template>
<!--  导师大厅  -->
    <el-main>
        <el-row>
            <el-col :span="3">
                <label>
                    <select v-model="college">
                        <option
                            v-for="item in this.$store.state.colleges"
                            :key="item.collegeId"
                            :label="item.collegeDescription"
                            :value="item.collegeId">
                        </option>
                    </select>
                </label>
            </el-col>
            <el-col :span="3">
                <label>
                    <select v-model="direction">
                        <option
                                v-for="item in this.$store.state.colleges"
                                :key="item.collegeId"
                                :label="item.collegeDescription"
                                :value="item.collegeId">
                        </option>
                    </select>
                </label>
            </el-col>
            <el-col :span="8" :offset="10">
                <button v-if="clickSearch" @click="clickSearch = false"><i class="el-icon-search"></i></button>
                <input v-else @keyup.enter="search" class="search_input" placeholder="请输入要搜索的老师名字" v-model="teacherName"/>
            </el-col>
        </el-row>
        <el-row style="padding-top: 50px">
            <el-col style="padding-top: 20px" :span="6" v-for="item in teachers" :key="item.name">
                <PersonHallPreview :teacher="item"></PersonHallPreview>
            </el-col>
        </el-row>
        <el-row>
            <el-pagination
                    style="padding-top: 30px;text-align:center"
                    background
                    layout="prev, pager, next"
                    :total="100">
            </el-pagination>
        </el-row>
    </el-main>
</template>

<script>
    const PersonHallPreview = () => import('@/components/common/PersonHallPreview')
    export default {
        name: "TeacherHall",
        components:{
            PersonHallPreview,
        },
        data() {
            return {
                college:'软件学院',
                direction:'图像处理',
                teacherName:'',
                clickSearch:true,
                teachers:[{
                    name:'辛卫',
                    avatarUrl:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3065179808,949830502&fm=11&gp=0.jpg',
                    college:'软件学院',
                    direction:['MySql','Java','图像处理']
                },{
                    name:'辛卫',
                    avatarUrl:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3065179808,949830502&fm=11&gp=0.jpg',
                    college:'软件学院',
                    direction:['MySql','Java','图像处理']
                },{
                    name:'辛卫',
                    avatarUrl:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3065179808,949830502&fm=11&gp=0.jpg',
                    college:'软件学院',
                    direction:['MySql','Java','图像处理']
                },{
                    name:'辛卫',
                    avatarUrl:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3065179808,949830502&fm=11&gp=0.jpg',
                    college:'软件学院',
                    direction:['MySql','Java','图像处理']
                },{
                    name:'辛卫',
                    avatarUrl:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3065179808,949830502&fm=11&gp=0.jpg',
                    college:'软件学院',
                    direction:['MySql','Java','图像处理']
                },{
                    name:'辛卫',
                    avatarUrl:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3065179808,949830502&fm=11&gp=0.jpg',
                    college:'软件学院',
                    direction:['MySql','Java','图像处理']
                },{
                    name:'辛卫',
                    avatarUrl:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3065179808,949830502&fm=11&gp=0.jpg',
                    college:'软件学院',
                    direction:['MySql','Java','图像处理']
                },{
                    name:'辛卫',
                    avatarUrl:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3065179808,949830502&fm=11&gp=0.jpg',
                    college:'软件学院',
                    direction:['MySql','Java','图像处理']
                },{
                    name:'辛卫',
                    avatarUrl:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3065179808,949830502&fm=11&gp=0.jpg',
                    college:'软件学院',
                    direction:['MySql','Java','图像处理']
                },{
                    name:'辛卫',
                    avatarUrl:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3065179808,949830502&fm=11&gp=0.jpg',
                    college:'软件学院',
                    direction:['MySql','Java','图像处理']
                },{
                    name:'辛卫',
                    avatarUrl:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3065179808,949830502&fm=11&gp=0.jpg',
                    college:'软件学院',
                    direction:['MySql','Java','图像处理']
                },{
                    name:'辛卫',
                    avatarUrl:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3065179808,949830502&fm=11&gp=0.jpg',
                    college:'软件学院',
                    direction:['MySql','Java','图像处理']
                }]
            }
        },
        methods :{
            search(){

                //发送搜索请求   **后端需要添加搜索接口**


                this.clickSearch = true;
            }
        }
    }
</script>

<style scoped>
    select {
        width: 80%;
        height: 70px;

        font-size: 18px;
        padding-left: 20%;

        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .6);
        border-style: none;
        border-radius: 40px;

        outline: none;
    }

    .search_input {
        width: 70%;
        height: 70px;

        font-size: 18px;
        padding-left: 5%;

        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .5);
        border-style: none;
        border-radius: 40px;

        outline: none;
    }

    button{
        width: 70%;
        height: 70px;

        font-size: 18px;
        padding-left: 5%;

        box-shadow: 5px 5px 2px rgba(0, 0, 0, .12), 100px 0 100px rgba(0, 0, 0, .04);
        border-style: none;
        border-radius: 40px;

        outline: none;
    }
</style>