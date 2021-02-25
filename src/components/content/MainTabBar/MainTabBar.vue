<template>
    <el-menu :router="true" class="el-menu-demo" mode="vertical">
        <el-row :gutter="50" style="width: 100%">
            <el-col :span="tabBarItemWidth" :offset="10" >
                <el-menu-item index="/projectHall">
                    <h2>项目</h2>
                </el-menu-item>
            </el-col>
            <el-col :span="tabBarItemWidth">
                <el-menu-item index="/teacherHall">
                    <h2>导师</h2>
                </el-menu-item>
            </el-col>
            <el-col :span="tabBarItemWidth">
                <el-menu-item index="/classMateHall" >
                    <h2>同学</h2>
                </el-menu-item>
            </el-col>
            <el-col :span="tabBarItemWidth">
                <el-menu-item index="/ideaHall">
                    <h2>创意</h2>
                </el-menu-item>
            </el-col>
            <el-col :span="tabBarItemWidth">
                <el-menu-item>

                    <el-popover
                            title="切换大学"
                            placement="right"
                            width="400"
                            trigger="click">
                        <h2 slot="reference" v-text="this.$store.state.current_university.description"></h2>
                        <div>
                            <el-input v-model="university" placeholder="请输入方向关键字"></el-input>
                            <el-button round @click="clearUniversity">清空学校</el-button>
                            <el-table
                                    :data="curUniversity"
                                    height="400"
                                    border
                                    style="width: 400px">
                                <el-table-column
                                        prop="universityId"
                                        label="学校id"
                                        width="110">
                                </el-table-column>
                                <el-table-column
                                        prop="universityDescription"
                                        label="学校名称"
                                        width="140">
                                </el-table-column>
                                <el-table-column
                                        fixed="right"
                                        label="操作"
                                        width="150">
                                    <template slot-scope="scope">
                                        <el-button @click="changeUniversity(curUniversity[scope.$index])" type="text"
                                                   size="small">
                                            切换
                                        </el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </el-popover>
<!--                    <el-popover title="切换大学" width="200" trigger="click">-->
<!--                        <h2 slot="reference" v-text="this.$store.state.current_university.description"></h2>-->
<!--                        <el-row>-->
<!--                            <el-col :span="18">-->
<!--                                <el-input v-model="university" placeholder="请输入学校"></el-input>-->
<!--                            </el-col>-->
<!--                        </el-row>-->
<!--                        <el-row>-->
<!--                            <el-row v-for="university in curUniversity" :key="university.universityId">-->
<!--                                <el-button @click="changeUniversity(university)" plain>{{university.universityDescription}}</el-button>-->
<!--                            </el-row>-->
<!--                        </el-row>-->
<!--                    </el-popover>-->
                </el-menu-item>
            </el-col>
            <el-col :span="tabBarItemWidth">
                <el-menu-item index="/noticeList">
                    <i class="el-icon-bell" style="padding-left: 35%;font-size: 200%"></i>
                </el-menu-item>
            </el-col>
            <el-col :span="tabBarItemWidth">
                <el-menu-item v-if="this.$store.getters.logined">
                    <el-row>
                        <el-col :span="8">
                            <el-button type="text" @click="to_login">登录</el-button>
                            <login></login>
                        </el-col>
                        <el-col :span="4" :push="2">
                            /
                        </el-col>
                        <el-col :span="8">
                            <el-button type="text" @click="to_register">注册</el-button>
                            <register></register>
                        </el-col>
                    </el-row>
                </el-menu-item>
                <el-menu-item v-else >
                    <el-dropdown @command="handleCommand" trigger="click">
                        <span class="el-dropdown-link"><i class="el-icon-user" style="font-size: 200%"></i><i class="el-icon-arrow-down el-icon--right"></i></span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="/classMateHomePage">个人主页</el-dropdown-item>
                            <el-dropdown-item command="/modifyUserInformation">编辑资料</el-dropdown-item>
                            <el-dropdown-item command="manageMyProject">管理项目</el-dropdown-item>
                            <el-dropdown-item command="manageMyIdea">管理创意</el-dropdown-item>
                            <el-dropdown-item command="exit">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </el-menu-item>
            </el-col>
        </el-row>
    </el-menu>

</template>

<script>
    import Login from "@/components/common/Login";
    import Register from "@/components/common/Register";
    export default {
        name: "MainTabBar",
        components: {Register, Login},
        data: function () {
            return {
                tabBarItemWidth:2,
                university:"",
            }
        },
        methods: {
            clearUniversity(){
                this.$store.state.current_university.id=null;
                this.$store.state.current_university.description="未选择学校";
            },
            changeUniversity(university){
                this.$store.state.current_university.id = university.universityId;
                this.$store.state.current_university.description = university.universityDescription;
            },
            to_login(){
                this.$store.state.is_login = true
            },
            to_register() {
                this.$store.state.is_register = true
            },
            handleCommand(command) {
                if (command==="exit"){
                    this.$store.state.current_user_data = null;
                    this.$store.state.logined = true;
                    this.$store.state.is_login = true;
                    this.$myCookie.remove("userId");
                    this.$myCookie.remove("tokenId");
                }else if (command==="manageMyProject"){
                    this.$store.state.active = "project";
                    this.$router.push({
                        path:"/manageMyIdeaOrProject",
                    });
                }else if(command==="manageMyIdea"){
                    this.$store.state.active = "idea";
                    this.$router.push({
                        path:"/manageMyIdeaOrProject"
                    });
                }else {
                    this.$router.push(command);
                }
            }
        },
        computed: {
            curUniversity(){
                if (this.university===""){
                    return this.$store.state.universities;
                }else {
                    let universitys = [];
                    this.$store.state.universities.forEach(value => {
                        if (value.universityDescription.indexOf(this.university)!==-1){
                            universitys.push(value);
                        }
                    })
                    return universitys;
                }
            }
        }
    }
</script>

<style scoped>
    *{

    }
</style>
