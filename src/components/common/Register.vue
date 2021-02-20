<template>
    <el-dialog class="dialog" :show-close="false" :close-on-click-modal="false" :close-on-press-escape="false" title="register" :visible.sync="this.$store.state.is_register" width="25%" :center="true">
        <el-form :rules="rules" :model="register_form" ref="register_form">
            <el-form-item prop="phone" :label-width="formLabelWidth">
                <el-row>
                    <el-col :pull="7" :span="2" style="text-align: center;">
                        <label>手机</label>
                    </el-col>
                    <el-col :span="22" :pull="4">
                        <el-input v-model="register_form.phone" placeholder="请输入手机" autocomplete="off" maxlength="11" minlength="11" show-word-limit></el-input>
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item prop="password" :label-width="formLabelWidth">
                <el-row>
                    <el-col :pull="7" :span="2" style="text-align: center;">
                        <label>密码</label>
                    </el-col>
                    <el-col :span="22" :pull="4">
                        <el-input v-model="register_form.password" placeholder="请输入密码" autocomplete="off" show-password></el-input>
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item prop="confirmPassword" :label-width="formLabelWidth">
                <el-row>
                    <el-col :pull="7" :span="2" style="text-align: center;">
                        <label>确认密码</label>
                    </el-col>
                    <el-col :span="22" :pull="4">
                        <el-input v-model="register_form.confirmPassword" placeholder="再次输入密码" autocomplete="off" show-password></el-input>
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item prop="university" :label-width="formLabelWidth">
                <el-row>
                    <el-col :pull="7" :span="2" style="text-align: center;">
                        <label>高校</label>
                    </el-col>
                    <el-col :span="22" :pull="4">
                        <el-select style="width: 100%" v-model="register_form.university" placeholder="请选择">
                            <el-option
                                    v-for="item in this.$store.state.universities"
                                    :key="item.universityId"
                                    :label="item.universityDescription"
                                    :value="item.universityDescription">
                            </el-option>
                        </el-select>
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item prop="college" :label-width="formLabelWidth">
                <el-row>
                    <el-col :pull="7" :span="2" style="text-align: center;">
                        <label>学院</label>
                    </el-col>
                    <el-col :span="22" :pull="4">
                        <el-select style="width: 100%" v-model="register_form.college" placeholder="请选择">
                            <el-option
                                    v-for="item in this.$store.state.colleges"
                                    :key="item.collegeId"
                                    :label="item.collegeDescription"
                                    :value="item.collegeDescription">
                            </el-option>
                        </el-select>
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item prop="gradeId" :label-width="formLabelWidth" >
                <el-row>
                    <el-col :pull="7" :span="2" style="text-align: center;">
                        <label>年级</label>
                    </el-col>
                    <el-col :span="22" :pull="4">
                        <el-select style="width: 100%" v-model="register_form.gradeId" placeholder="请选择">
                            <el-option
                                    v-for="item in this.$store.state.grades"
                                    :key="item.gradeId"
                                    :label="item.gradeId"
                                    :value="item.gradeId">
                            </el-option>
                        </el-select>
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item prop="school_no" :label-width="formLabelWidth" >
                <el-row>
                    <el-col :pull="7" :span="2" style="text-align: center;">
                        <label>学/工号</label>
                    </el-col>
                    <el-col :span="22" :pull="4">
                        <el-input v-model="register_form.school_no" placeholder="请输入学/工号" autocomplete="off"></el-input>
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item prop="name" :label-width="formLabelWidth">
                <el-row>
                    <el-col :pull="7" :span="2" style="text-align: center;">
                        <label>姓名</label>
                    </el-col>
                    <el-col :span="22" :pull="4">
                        <el-input v-model="register_form.name" placeholder="请输入姓名" autocomplete="off"></el-input>
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item prop="role" :label-width="formLabelWidth">
                <el-row>
                    <el-col :pull="7" :span="4"><el-radio v-model="register_form.role" label="1">教师</el-radio></el-col>
                    <el-col :pull="4" :span="4"><el-radio v-model="register_form.role" label="2">学生</el-radio></el-col>
                </el-row>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button style="box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);width: 80%" @click="register('register_form')" round>注册 并 登录</el-button>
        </div>
    </el-dialog>
</template>

<script>
    import getIdByDescription from "@/methods/getIdByDescription";

    export default {
        name: "Register",
        data: function () {
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
            let passIsEquals = (rule, value, callback) => {
                if (this.register_form.password!==this.register_form.confirmPassword) {
                    callback(new Error('两次输入的密码不一样'));
                } else {
                    callback();
                }
            };
            return {
                register_form: {
                    phone: '',
                    password: '',
                    university: '',
                    school_no: '',
                    role: '',
                    name: '',
                    college: '',
                    gradeId:'',
                    confirmPassword:''
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
                    ],
                    university: [
                        { required: true, message: '请选择学校', trigger: 'blur' },
                    ],
                    school_no: [
                        { required: true, message: '请输入学/工号', trigger: 'blur' },
                    ],
                    role: [
                        { required: true, message: '请选择身份', trigger: 'blur' },
                    ],
                    name: [
                        { required: true, message: '请输入名称', trigger: 'blur' },
                    ],
                    college: [
                        { required: true, message: '请选择学院', trigger: 'blur' },
                    ],
                    gradeId:[
                        { required: true, message: '请选择年级', trigger: 'blur' },
                    ],
                    confirmPassword:[
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { min: 8, max: 12, message: '长度在 8 - 12 位的字符串', trigger: 'blur' },
                        {validator: passIsEquals,trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            register(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let universityId = getIdByDescription("university",this.register_form.university);
                        let collegeId = getIdByDescription("college",this.register_form.college)
                        alert(universityId + " " + collegeId)
                        this.$axios({
                            url: "api/register",
                            method: "post",
                            params: {
                                phone:this.register_form.phone,
                                password:this.register_form.password,
                                universityId: universityId,
                                schoolNo:this.register_form.school_no,
                                role:this.register_form.role,
                                name:this.register_form.name,
                                collegeId:collegeId,
                                gradeId:this.register_form.gradeId
                            }
                        }).then(res => {
                            console.log("手动注册"+res)
                            this.$store.state.logined = false;
                            alert('注册成功');
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
                            alert('注册失败');
                            this.$store.state.is_register=true;
                            console.log(error);
                        });
                    } else {
                        alert('有数据未填写正确');
                        return false;
                    }
                });
            }
        },
        computed: {
            // cur_colleges: function () {
            //     let university = this.register_form.university;
            //
            // }
        }
    }
</script>

<style scoped>
    .dialog{
        width: 2000px;
    }
</style>