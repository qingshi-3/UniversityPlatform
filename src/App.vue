<template>
  <div id="app">
    <el-container>
      <el-header>
        <MainTabBar style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)"></MainTabBar>
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
    method:{
    },
    beforeCreate: function () {
      this.$myCookie.set('tokenId',123)
      console.log(this.$myCookie.get('tokenId'))
      this.$store.state.logined = this.$myCookie.get('tokenId')===null;
      this.$axios({
        url: "api/university",
        method: "get",
      }).then(res => {
        this.$store.state.universities = res.data.data
      }).catch(error => {
        console.log(error);
      });

      this.$axios({
        url: "api/grade",
        method: "get",
      }).then(res => {
        this.$store.state.grades = res.data.data
      }).catch(error => {
        console.log(error);
      });

      this.$axios({
        url: "api/college",
        method: "get",
      }).then(res => {
        this.$store.state.colleges = res.data.data
      }).catch(error => {
        console.log(error);
      });
    }
  }
</script>

<style>
  *{
    margin: 0;
    padding: 0;
  }
  body{
    background-color: #f6f6f6;
    width: 2020px;
  }
</style>
