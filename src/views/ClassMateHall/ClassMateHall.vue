<template>
<!--  同学大厅  -->
    <el-main>
        <el-row>
            <el-col :span="3">
                <label>
                    <select v-model="collegeId" @change="collegeChange">
                        <option value="学院" disabled>学院</option>
                        <option value="">重置</option>
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
                    <select v-model="directionId" @change="directionChange">
                        <option value="方向" disabled >方向</option>
                        <option value="">重置</option>
                        <option
                                v-for="item in this.$store.state.directions"
                                :key="item.directionId"
                                :label="item.directionDescription"
                                :value="item.directionId">
                        </option>
                    </select>
                </label>
            </el-col>

            <el-col :span="3">
                <label>
                    <select v-model="grade" @change="gradeChange">
                        <option value="年级" disabled >年级</option>
                        <option value="">重置</option>
                        <option
                                v-for="item in this.$store.state.grades"
                                :key="item.gradeId"
                                :label="item.gradeId"
                                :value="item.gradeId">
                        </option>
                    </select>
                </label>
            </el-col>

            <el-col :span="8" :offset="7">
                <button v-if="clickSearch" @click="clickSearch = false" style="background-color: white"><i class="el-icon-search"></i></button>
                <input v-else @keyup.enter="search" @change="watchSearchContent()" class="search_input"
                       placeholder="请输入要搜索的同学名字"
                       v-model="studentName"/>
            </el-col>
        </el-row>
        <el-row style="padding-top: 50px">
            <el-col style="padding-top: 20px" :span="6" v-for="item in curStudents" :key="item.userId">
                <PersonHallPreview :person="item" :role="role"></PersonHallPreview>
            </el-col>
        </el-row>
        <el-row>
            <el-pagination
                    class="pager"
                    @current-change="handleCurrentChange"
                    :current-page.sync="page.currentPage"
                    :pager-count="15"
                    :page-size="page.pageSize"
                    :total="this.students.length">
            </el-pagination>
        </el-row>
    </el-main>
</template>

<script>
    const PersonHallPreview = () => import('@/components/common/PersonHallPreview')
    export default {
        name: "ClassMateHall",
        components: {
            PersonHallPreview,
        },
        data() {
            return {
                role:"student",
                page: {
                    currentPage: 1,
                    pageSize: 12
                },
                collegeId: "学院",
                directionId: "方向",
                studentName: null,
                clickSearch: true,
                grade:"年级",
                students: [],
                universityId:this.$store.state.current_university.id,

            }
        },
        methods: {
            watchSearchContent() {
                if (this.studentName === "") {
                    this.studentName = null;
                }
            },
            search() {
                if (this.studentName === null)
                    this.clickSearch = true;
                this.handleCurrentChange(1);
                this.getStudents();
            },
            handleCurrentChange(newPage) {
                this.page.currentPage = newPage;
            },
            gradeChange(){
                if (this.grade==="")
                    this.grade = "年级";
                this.handleCurrentChange(1);
                this.getStudents();
            },
            collegeChange(){
                if (this.collegeId==="")
                    this.collegeId = "学院";
                this.handleCurrentChange(1);
                this.getStudents();
            },
            directionChange() {
                if (this.directionId==="")
                    this.directionId = "方向";
                this.handleCurrentChange(1);
                this.getStudents();
            },
            getStudents() {
                let _this = this;
                alert("学院id" + this.collegeId + " 方向id" + this.directionId + "年级id" + this.grade);
                this.$axios({
                    url: 'api/user',
                    method: "get",
                    params: {
                        universityId: this.$store.state.current_university.id,
                        role: "student",
                        gradeId: this.grade==="年级"?null:this.grade,
                        name: this.studentName,
                        directionId: this.directionId==="方向"?null:this.directionId,
                        collegeId: this.collegeId==="学院"?null:this.collegeId
                    }
                }).then(res => {
                    _this.students = res.data.data;
                    console.log(res)
                }).catch(err => {
                    console.log(err)
                })
            }
        },
        computed: {
            curStudents: function () {
                let _this = this;
                let students = _this.students;
                if (_this.page.currentPage===_this.totalPage){
                    students = students.slice((_this.page.currentPage-1)*_this.page.pageSize);
                }else {
                    students = students.slice((_this.page.currentPage-1)*_this.page.pageSize,_this.page.currentPage*_this.page.pageSize);
                }
                return students;
            },
            totalPage(){
                return Math.ceil(this.students.length/this.page.pageSize);
            }
        },
        mounted() {
            let _this = this;
            this.$axios({
                url: 'api/user',
                method: "get",
                params: {
                    universityId: this.$store.state.current_university.id,
                    role: "student",
                    name: null,
                    gradeId:null,
                    directionId: null,
                    collegeId: null
                }
            }).then(res => {
                console.log("初始化学生数据" + JSON.stringify(res))
                _this.students = res.data.data;
            }).catch(err => {
                console.log(err)
            })
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

    button {
        width: 70%;
        height: 70px;

        font-size: 18px;
        padding-left: 5%;

        box-shadow: 5px 5px 2px rgba(0, 0, 0, .12), 100px 0 100px rgba(0, 0, 0, .04);
        border-style: none;
        border-radius: 40px;

        outline: none;
    }

    .pager {
        padding-top: 30px;
        text-align: center
    }
</style>