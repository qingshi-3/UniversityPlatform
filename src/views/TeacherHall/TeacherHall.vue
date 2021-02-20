<template>
    <!--  导师大厅  -->
    <el-main>
        <el-row>
            <el-col :span="3">
                <label>
                    <select v-model="collegeId" @change="collegeChange">
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
                        <option
                                v-for="item in this.$store.state.directions"
                                :key="item.directionId"
                                :label="item.directionDescription"
                                :value="item.directionId">
                        </option>
                    </select>
                </label>
            </el-col>
            <el-col :span="8" :offset="10">
                <button v-if="clickSearch" @click="clickSearch = false"><i class="el-icon-search"></i></button>
                <input v-else @keyup.enter="search" @change="watchSearchContent()" class="search_input"
                       placeholder="请输入要搜索的老师名字"
                       v-model="teacherName"/>
            </el-col>
        </el-row>
        <el-row style="padding-top: 50px">
            <el-col style="padding-top: 20px" :span="6" v-for="item in curTeachers" :key="item.userId">
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
                    :total="this.teachers.length">
            </el-pagination>
        </el-row>
    </el-main>
</template>

<script>
    const PersonHallPreview = () => import('@/components/common/PersonHallPreview')
    export default {
        name: "TeacherHall",
        components: {
            PersonHallPreview,
        },
        data() {
            return {
                role:"teacher",
                page: {
                    currentPage: 1,
                    pageSize: 12
                },
                collegeId: null,
                directionId: null,
                teacherName: null,
                clickSearch: true,
                teachers: []
            }
        },
        methods: {
            watchSearchContent() {
                if (this.teacherName === "") {
                    this.teacherName = null;
                }
            },
            search() {
                if (this.teacherName === null)
                    this.clickSearch = true;
                this.handleCurrentChange(1);
                this.getTeachers();
            },
            handleCurrentChange(newPage) {
                this.page.currentPage = newPage;
            },
            collegeChange() {
                this.handleCurrentChange(1);
                this.getTeachers();
            },
            directionChange() {
                this.handleCurrentChange(1);
                this.getTeachers();
            },
            universityChange() {
                this.handleCurrentChange(1);
                this.getTeachers()
            },
            getTeachers() {
                let _this = this;
                alert("学院id" + this.collegeId + " 方向id" + this.directionId);
                this.$axios({
                    url: 'api/user',
                    method: "get",
                    params: {
                        universityId: this.$store.state.current_university.id,
                        role: "teacher",
                        name: this.teacherName,
                        directionId: this.directionId,
                        collegeId: this.collegeId
                    }
                }).then(res => {
                    _this.teachers = res.data.data;
                    console.log(res)
                }).catch(err => {
                    console.log(err)
                })
            }
        },
        computed: {
            curTeachers: function () {
                let _this = this;
                let teachers = _this.teachers;
                if (_this.page.currentPage===_this.totalPage){
                    teachers = teachers.slice((_this.page.currentPage-1)*_this.page.pageSize);
                }else {
                    teachers = teachers.slice((_this.page.currentPage-1)*_this.page.pageSize,_this.page.currentPage*_this.page.pageSize);
                }
                return teachers;
            },
        },
        mounted: function () {
            let _this = this;
            this.$axios({
                url: 'api/user',
                method: "get",
                params: {
                    universityId: null,//this.$store.state.current_university.id,
                    role: "teacher",
                    name: null,
                    directionId: null,
                    collegeId: null
                }
            }).then(res => {
                console.log("初始化导师数据" + JSON.stringify(res))
                _this.teachers = res.data.data;
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