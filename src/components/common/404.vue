<template>
    <div>
        <p>网页找不到</p>
        <el-button @click="to_login" round>登录</el-button>
    </div>
</template>

<script>
    export default {
        name: "err",
        created: function () {
            // this.$myCookie.set('tokenId','asd')
        },
        methods:{
            to_login:function () {
                // this.$emit('login_fail')
                this.$store.state.is_login=true;
            }
        }
    }
</script>

<style scoped>

</style>