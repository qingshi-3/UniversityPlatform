<template>
<!--  创意大厅  -->
    <el-main>
        <el-row id="header">
            <el-col :span="3">
                <label>
                    <select v-model="collegeId" @change="collegeChange" >
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
                    <select v-model="subjectId" @change="subjectChange">
                        <option value="学科" disabled >学科</option>
                        <option value="">重置</option>
                        <option
                                v-for="item in this.$store.state.subjects"
                                :key="item.subjectId"
                                :label="item.subjectDescription"
                                :value="item.subjectId">
                        </option>
                    </select>
                </label>
            </el-col>

            <el-col :span="3">
                <label>
                    <select v-model="sortText" @change="sortChange">
                        <option value="按时间排序" disabled>按时间排序</option>
                        <option value="">重置</option>
                        <option
                                v-for="item in sort"
                                :key="item"
                                :label="item"
                                :value="item">
                        </option>
                    </select>
                </label>
            </el-col>

            <el-col :span="8" :offset="3">
                <button v-if="clickSearch" @click="clickSearch = false" style="background-color: white"><i class="el-icon-search"></i></button>
                <input v-else @keyup.enter="search" @change="watchSearchContent()" class="search_input"
                       placeholder="请输入要搜索的创意关键字"
                       v-model="ideaTitle"/>
            </el-col>
            <el-col :span="4">
                <button @click="createIdea">添加创意</button>
            </el-col>
        </el-row>
        <el-row id="box">
            <el-row v-for="idea in ideas" :key="idea.ideaId">
                <IdeaPreview :idea="idea"></IdeaPreview>
            </el-row>
        </el-row>
    </el-main>
</template>

<script>
    import IdeaPreview from "@/views/IdeaHall/IdeaPreview";
    export default {
        name: "IdeaHall",
        components: {IdeaPreview},
        data() {
            return {
                collegeId: "学院",
                subjectId: "学科",
                clickSearch: true,
                ideaTitle:null,
                universityId:this.$store.state.current_university.id,
                ideas:[],
                sortText:"按时间排序",
                sort:["是","否"]
            }
        },
        methods: {
            createIdea(){
                this.$router.push({
                    path:'/editIdea',
                    query:{
                        ideaId:null
                    }
                })
            },
            watchSearchContent() {
                if (this.ideaName === "") {
                    this.ideaName = null;
                }
            },
            search() {
                if (this.ideaName === null)
                    this.clickSearch = true;
                this.getIdeas();
            },
            subjectChange(){
                if (this.subjectId==="")
                    this.subjectId = "学科";
                this.getIdeas();
            },
            collegeChange(){
                if (this.collegeId==="")
                    this.collegeId = "学院";
                this.getIdeas();
            },
            sortChange() {
                if (this.sortText==="")
                    this.sortText = "按时间排序";
                this.getIdeas();
            },
            getIdeas() {
                let _this = this;
                this.$axios({
                    url: 'api/idea',
                    method: "get",
                    params: {
                        ideaTitle:_this.ideaTitle,
                        subjectId:_this.subjectId==="学科"?null:_this.subjectId,
                        sort:_this.isSort,
                        universityId: this.$store.state.current_university.id,
                        collegeId: this.collegeId==="学院"?null:this.collegeId
                    }
                }).then(res => {
                    _this.ideas = res.data.data;
                    console.log("所有创意"+JSON.stringify(res));
                }).catch(err => {
                    console.log(err)
                })
            }
        },
        computed: {
            isSort(){
                if (this.sortText==="是"){
                    return true;
                }if (this.sortText==="按时间排序"){
                    return null;
                } else {
                    return false;
                }
            }
        },
        mounted() {
            let _this = this;
            this.$axios({
                url: 'api/idea',
                method: "get",
                params: {
                    ideaTitle:null,
                    subjectId:null,
                    sort:true,
                    universityId: null,
                    collegeId: null
                }
            }).then(res => {
                _this.ideas = res.data.data;
                console.log("初始化所有创意"+JSON.stringify(res));
            }).catch(err => {
                console.log(err)
            })
        }
    }
</script>

<style scoped>

    #header{
        margin-bottom: 40px;
    }

    #box{
        margin-left: 120px;
    }

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

        background-color: white;
        outline: none;
    }
</style>