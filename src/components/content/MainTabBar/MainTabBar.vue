<template>
    <el-menu :router="true" class="el-menu-demo" mode="vertical">
        <el-row :gutter="50" style="width: 100%">
            <el-col :span="tabBarItemWidth" :offset="10" >
                <el-menu-item index="/modify/user/information">
                    <h2>项目</h2>
                </el-menu-item>
            </el-col>
            <el-col :span="tabBarItemWidth">
                <el-menu-item index="/teacher/hall">
                    <h2>导师</h2>
                </el-menu-item>
            </el-col>
            <el-col :span="tabBarItemWidth">
                <el-menu-item index="/login" >
                    <h2>同学</h2>
                </el-menu-item>
            </el-col>
            <el-col :span="tabBarItemWidth">
                <el-menu-item index="2">
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
                    <el-col :span="12">
                        <el-button type="text" @click="to_login">登录</el-button>
                        <login></login>
                    </el-col>
                    <el-col :span="4">
                        /
                    </el-col>
                    <el-col :span="8">
                        <el-button type="text" @click="to_register">注册</el-button>
                        <register></register>
                    </el-col>
                </el-menu-item>
                <el-menu-item v-else >
                    <el-dropdown trigger="click">
                        <span class="el-dropdown-link"><i class="el-icon-user"></i><i class="el-icon-arrow-down el-icon--right"></i></span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item @click="modifyInformation">个人主页</el-dropdown-item>
                            <el-dropdown-item @click="modifyInformation">管理项目</el-dropdown-item>
                            <el-dropdown-item @click="modifyInformation">管理创意</el-dropdown-item>
                            <el-dropdown-item @click="modifyInformation">编辑资料</el-dropdown-item>
                            <el-dropdown-item @click="modifyInformation">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </el-menu-item>
            </el-col>
        </el-row>
    </el-menu>


<!--    <el-menu :router="true" class="el-menu-demo" mode="horizontal">-->
<!--        <el-menu-item index="/modify/user/information" style="left: 50%">-->
<!--            <h2>项目</h2>-->
<!--        </el-menu-item>-->
<!--        <el-menu-item index="/test" style="left: 52%">-->
<!--            <h2>导师</h2>-->
<!--        </el-menu-item>-->
<!--        <el-menu-item index="/login" style="left: 54%">-->
<!--            <h2>同学</h2>-->
<!--        </el-menu-item>-->
<!--        <el-menu-item index="2" style="left: 56%">-->
<!--            <h2>创意</h2>-->
<!--        </el-menu-item>-->
<!--        <el-menu-item style="left: 60%">-->
<!--            <el-popover title="切换大学" width="200" trigger="click">-->
<!--                <h2 slot="reference">四川大学</h2>-->
<!--                <el-row>-->
<!--                    <el-col :span="18">-->
<!--                        <el-input placeholder="请输入学校"></el-input>-->
<!--                    </el-col>-->
<!--                    <el-col :span="6">-->
<!--                        <el-button icon="el-icon-search" circle></el-button>-->
<!--                    </el-col>-->
<!--                </el-row>-->
<!--            </el-popover>-->
<!--        </el-menu-item>-->
<!--        <el-menu-item index="4" style="left: 64%">-->
<!--            <i class="el-icon-bell"></i>-->
<!--        </el-menu-item>-->

<!--        <el-menu-item v-if="this.$store.getters.logined" style="left: 68%">-->
<!--            <el-col :span="12">-->
<!--                <el-button type="text" @click="to_login">登录</el-button>-->
<!--                <login></login>-->
<!--            </el-col>-->
<!--            <el-col :span="4">-->
<!--                /-->
<!--            </el-col>-->
<!--            <el-col :span="8">-->
<!--                <el-button type="text" @click="to_register">注册</el-button>-->
<!--                <register></register>-->
<!--            </el-col>-->
<!--        </el-menu-item>-->
<!--        <el-menu-item v-else  style="left: 68%">-->
<!--            <el-dropdown trigger="click">-->
<!--                <span class="el-dropdown-link"><i class="el-icon-user"></i><i class="el-icon-arrow-down el-icon&#45;&#45;right"></i></span>-->
<!--                <el-dropdown-menu slot="dropdown">-->
<!--                    <el-dropdown-item @click="modifyInformation">个人主页</el-dropdown-item>-->
<!--                    <el-dropdown-item @click="modifyInformation">管理项目</el-dropdown-item>-->
<!--                    <el-dropdown-item @click="modifyInformation">管理创意</el-dropdown-item>-->
<!--                    <el-dropdown-item @click="modifyInformation">编辑资料</el-dropdown-item>-->
<!--                    <el-dropdown-item @click="modifyInformation">退出登录</el-dropdown-item>-->
<!--                </el-dropdown-menu>-->
<!--            </el-dropdown>-->
<!--        </el-menu-item>-->
<!--    </el-menu>-->
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
            //跳转到修改个人信息页面
            modifyInformation() {
                console.log("123");
                this.$router.push('/modify_user_information');
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
