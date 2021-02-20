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
                <el-menu-item index="/classMateHomePage">
                    <h2>创意</h2>
                </el-menu-item>
            </el-col>
            <el-col :span="tabBarItemWidth">
                <el-menu-item>
                    <el-popover title="切换大学" width="200" trigger="click">
                        <h2 slot="reference">四川大学</h2>
                        <el-row>
                            <el-col :span="18">
                                <el-input placeholder="请输入学校"></el-input>
                            </el-col>
                            <el-col :span="6">
                                <el-button icon="el-icon-search" circle></el-button>
                            </el-col>
                        </el-row>
                    </el-popover>
                </el-menu-item>
            </el-col>
            <el-col :span="tabBarItemWidth">
                <el-menu-item index="4">
                    <i class="el-icon-bell" style="padding-left: 35%"></i>
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
                        <span class="el-dropdown-link"><i class="el-icon-user"></i><i class="el-icon-arrow-down el-icon--right"></i></span>
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
                tabBarItemWidth:2
            }
        },
        methods: {
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
        }
    }
</script>

<style scoped>
    *{

    }
</style>
