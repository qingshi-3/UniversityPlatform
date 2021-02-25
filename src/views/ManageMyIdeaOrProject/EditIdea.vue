<template>
    <!--  编辑创意  -->
    <div>
        <el-row id="box">
            <el-row id="title">
                <input style="font-size: 40px;margin-top: 20px;width: 100%;height: 100px;border: none;outline: none"
                       v-model="idea.ideaTitle"/>
            </el-row>
            <el-divider></el-divider>
            <el-row id="subject">
                <el-col :span="3" v-for="subject in curSubjects" :key="subject.subjectId">
                    <div id="subjectTag">
                        <i class="el-icon-reading"></i>
                        {{subject.subjectDescription}}
                        <i class="el-icon-error" @click="deleteSubject(subject.subjectId)"></i>
                    </div>
                </el-col>
                <el-popover
                        placement="right"
                        width="400"
                        trigger="click">

                    <el-button style="padding: 0 0 0 0" slot="reference" class="button-new-tag" size=""><i
                            class="el-icon-circle-plus"></i>添加新学科
                    </el-button>
                    <div>
                        <el-input v-model="subjectName" placeholder="请输入学科关键字"></el-input>
                        <el-table
                                :data="subjectList"
                                height="600"
                                border
                                style="width: 400px">
                            <el-table-column
                                    prop="subjectId"
                                    label="学科id"
                                    width="110">
                            </el-table-column>
                            <el-table-column
                                    prop="subjectDescription"
                                    label="学科描述"
                                    width="140">
                            </el-table-column>
                            <el-table-column
                                    fixed="right"
                                    label="操作"
                                    width="150">
                                <template slot-scope="scope">
                                    <el-button @click="addSubject(subjectList[scope.$index])" type="text"
                                               size="small">
                                        添加
                                    </el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </el-popover>
            </el-row>
            <el-divider></el-divider>
            <el-row id="content">
                <textarea v-model="idea.ideaContent"></textarea>
            </el-row>
        </el-row>
        <el-row id="operation">
            <el-col :span="4">
                <button :disabled="this.$route.query.ideaId===null">删除</button>
            </el-col>
            <el-col :span="4" :push="11">
                <button>保存并发布</button>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "EditIdea",
        data() {
            return {
                idea: {
                    "subjects": [],
                    "replies": [],
                    "name": "",
                    "nickname": "",
                    "gradeId": this.$store.state.current_user_data.gradeId,
                    "collegeId": this.$store.state.current_user_data.collegeId,
                    "collegeDescription": this.$store.state.current_user_data.collegeDescription,
                    "ideaId": null,
                    "userId": this.$store.state.current_user_data.userId,
                    "ideaContent": "",
                    "ideaDatetime": null,
                    "ideaTitle": "",
                    "ideaDeleted": false
                },
                userList: [],
                subjectName: "",
            }
        },
        created() {
            if (this.$route.query.ideaId===null) {
                console.log("新创意")
            } else {
                this.$axios({
                    url: '/api/idea/home',
                    method: 'get',
                    params: {
                        ideaId: this.$route.query.ideaId
                    }
                }).then(res => {
                    console.log("当前创意" + JSON.stringify(res));
                    this.idea = res.data.data;
                })
            }
        },
        methods: {
            addSubject(subject) {
                this.idea.subjects.push(subject.subjectId);
            },
            deleteSubject(subjectId) {
                for (let i = 0; i < this.idea.subjects.length; i++) {
                    if (this.idea.subjects[i] === subjectId) {
                        this.idea.subjects.splice(i, 1);
                        break;
                    }
                }
            },
        },
        computed: {
            subjectList() {
                let arr = this.$store.state.subjects;
                let res = [];
                for (let i = 0; i < arr.length; i++) {
                    if (arr[i].subjectDescription.indexOf(this.subjectName) !== -1) {
                        let flag = true;
                        for (let j = 0; j < this.idea.subjects.length; j++) {
                            if (this.idea.subjects[j] === arr[i].subjectId) {
                                flag = false;
                                break;
                            }
                        }
                        if (flag) {
                            res.push(arr[i]);
                        }
                    }
                }
                return res;
            },
            curSubjects() {
                let res = [];
                let arr = this.$store.state.subjects;
                for (let i = 0; i < arr.length; i++) {
                    for (let j = 0; j < this.idea.subjects.length; j++) {
                        if (this.idea.subjects[j] === arr[i].subjectId) {
                            res.push(arr[i]);
                        }
                    }
                    if (res.length === this.idea.subjects.length) {
                        break;
                    }
                }
                return res;
            },
        }
    }
</script>

<style scoped>
    #box {
        margin-left: 300px;
        width: 1400px;
        padding: 30px 30px 30px 30px;
        border-radius: 25px;
        box-shadow: 2px 4px 12px 0 rgba(0, 0, 0, 0.2);
    }

    button {
        width: 120px;
        height: 60px;

        background-color: white;
        font-size: 18px;

        margin-left: 322px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .4);
        border-style: none;
        border-radius: 40px;

        outline: none;
    }

    textarea {
        resize: vertical;
        margin-top: 20px;
        outline-style: none;
        border: none;
        font-size: 20px;
        width: 100%;
        min-height: 100px;
    }

    #operation {
        margin-top: 30px;
    }

    #subject {
    }

    .el-button{
        margin-left: 0;
    }

    #subjectTag {
        padding-left: 20px;
        padding-top: 10px;
        width: 100px;
        height: 35px;
        border-radius: 25px;
        box-shadow: 2px 4px 12px 0 rgba(0, 0, 0, 0.2);
        margin-bottom: 10px;
    }
</style>