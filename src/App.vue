<template>
  <div id="app" @="">
    <el-container>
      <el-header>
        <MainTabBar class="mainTabBar"></MainTabBar>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  import MainTabBar from "@/components/content/MainTabBar/MainTabBar";
  export default {
    name: 'App',
    components: {
      MainTabBar
    },
    data(){
      return {
      }
    },
    created: function() {
      this.initLogin();
      this.getAllUniversity();
      this.getAllCollege();
      this.getAllGrade();
      this.getAllDirection();
      this.getAllSubject();
      this.getAllLevel();
    },
    methods:{
      initLogin() {
        /**
         * 判断cookie的tokenId是否为null
         *    null:将this.$store.state.logined修改为true,表示未登录
         *    not null: 自动发送登录请求,看是否该tokenId可以登录成功
         *       成功:将this.$store.state.logined修改为false,表示已登陆
         *       失败:将this.$store.state.logined修改为true,表示未登录
         */
        if(this.$myCookie.get('tokenId')===null){
          this.$store.state.logined = true;
        }else {
          console.log("cookie: "+this.$myCookie.get('tokenId')+" "+this.$myCookie.get('userId'))
          this.$axios({
            url: "api/login",
            method: "put",
            params: {
              phone:"default",
              password:"default",
            }
          }).then(res => {
            console.log('登陆返回消息'+JSON.stringify(res));
            if (res.data.code !== 404){
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
              })
            }else {
              this.$store.state.is_login = true;
            }
          }).catch(err =>{

            this.$store.state.is_login = true;

            //用于服务未开的测试
            // this.$store.state.is_login = false
            // this.$store.state.logined = false
            console.log(err)
          })
        }

      },
      getAllUniversity(){
        this.$axios({
          url: "api/university",
          method: "get",
        }).then(res => {
          console.log("所有大学"+JSON.stringify(res))
          this.$store.state.universities = res.data.data
        }).catch(error => {
          console.log(error);
        });
      },
      getAllCollege(){
        this.$axios({
          url: "api/college",
          method: "get",
        }).then(res => {
          console.log("所有学院"+JSON.stringify(res))
          this.$store.state.colleges = res.data.data
        }).catch(error => {
          console.log(error);
        });
      },
      getAllGrade(){
        this.$axios({
          url: "api/grade",
          method: "get",
        }).then(res => {
          console.log("所有年级"+JSON.stringify(res))
          this.$store.state.grades = res.data.data
        }).catch(error => {
          console.log(error);
        });
      },
      getAllDirection(){
        this.$axios({
          url: "api/direction",
          method: "get",
        }).then(res => {
          console.log("所有研究方向"+JSON.stringify(res))
          this.$store.state.directions = res.data.data
        }).catch(error => {
          console.log(error);
        });
      },
      getAllSubject(){
        this.$axios({
          url:'/api/subject',
          method:'get'
        }).then(res => {
          console.log("所有学科"+JSON.stringify(res))
          this.$store.state.subjects = res.data.data
        })
      },
      getAllLevel(){
        this.$axios({
          url:'/api/project/level',
          method:'get'
        }).then(res => {
          this.$store.state.levels = res.data.data
          console.log("所有等级"+JSON.stringify(res))
        })
      }
    }
  }
</script>

<style>
  button{
    cursor: pointer;
  }
  *{
    margin: 0;
    padding: 0;
  }
  body{
    background-color: #f6f6f6;
    width: 2020px;
  }
  .mainTabBar{
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  }
  textarea{
    padding:5px 5px 5px 5px;
  }
</style>
