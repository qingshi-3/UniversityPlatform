<template>
    <el-dialog class="dialog" :show-close="false" :close-on-click-modal="false" :close-on-press-escape="false" title="login" :visible.sync="this.$store.state.is_login" width="25%" :center="true">
        <!--                    <el-button style="margin-left: 40%;box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)" round>login</el-button>-->
        <el-form :rules="rules" :model="login_form"  ref="login_form">
            <el-form-item prop="phone" :label-width="formLabelWidth">
                <el-row>
                    <el-col :pull="6" :span="2" style="text-align: center;">
                        <label>手机</label>
                    </el-col>
                    <el-col :span="22" :pull="4">
                        <el-input v-model="login_form.phone" placeholder="请输入手机" autocomplete="off" maxlength="11" minlength="11" show-word-limit></el-input>
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item prop="password" :label-width="formLabelWidth">
                <el-row>
                    <el-col :pull="6" :span="2" style="text-align: center;">
                        <label>密码</label>
                    </el-col>
                    <el-col :span="22" :pull="4">
                        <el-input v-model="login_form.password" placeholder="请输入密码" autocomplete="off" show-password></el-input>
                    </el-col>
                </el-row>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button style="box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);width: 40%" @click="login('login_form')" round>登录</el-button>
            <el-button style="box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);width: 40%" @click="to_register" round>注册</el-button>
        </div>
    </el-dialog>
</template>

<script>
    export default {
        name: "Login",
        data() {
            let isPhone = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('号码不能为空'));
                }
                setTimeout(() => {
                    let myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
                    if (!myreg.test(value)) {
                        callback(new Error('请输入正确的手机号'));
                    } else {
                        callback();
                    }
                }, 1000);
            };
            return {
                login_form: {
                    phone: '',
                    password: ''
                },
                formLabelWidth: '120px',
                rules: {
                    phone: [
                        { required: true, message: '请输入电话号码', trigger: 'blur' },
                        { min: 11, max: 11, message: '长度在为 11 个数字', trigger: 'blur' },
                        {validator: isPhone,trigger: 'blur'}
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { min: 8, max: 12, message: '长度在 8 - 12 位的字符串', trigger: 'blur' },
                    ]
                }
            }
        },
        methods: {
            //登录
            login(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid){
                        this.$store.state.is_login=false;
                        //提交表单
                        this.$axios({
                            url: "api/login",
                            method: "put",
                            params: {
                                phone:"132081910",//this.login_form.phone,
                                password:"123456780", //this.login_form.password
                            }
                        }).then(res => {
                            console.log("手动登录"+res)
                            this.$store.state.logined = false;
                            this.$axios({
                                url:'/api/user/my',
                                method:'get',
                                params:{
                                    userId:this.$myCookie.get("userId")
                                }
                            }).then(res=> {
                                console.log("当前用户信息"+JSON.stringify(res))
                                this.$store.state.current_user_data = res.data.data
                                this.$store.state.current_university.id=this.$store.state.current_user_data.universityId;
                                this.$store.state.current_university.description=this.$store.state.current_user_data.universityDescription;
                            }).catch(err=>{
                                console.log(err)
                            })
                        }).catch(error => {
                            alert('账号或密码错误');
                            this.$store.state.is_login=true;
                            console.log(error);
                        });
                    }else {
                        alert('有数据未填写正确');
                        return false;
                    }
                })
            },
            to_register() {
                this.$store.state.is_login=false;
                this.$store.state.is_register=true;
            }
        },
    }
</script>

<style scoped>
    .dialog{
        width: 2000px;
    }
</style>
