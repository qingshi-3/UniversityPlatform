<template>
<!--  用在很多地方的纯文字标签：如技术方向、设计领域等  -->
    <div id="tag">
        <h4>{{content}}</h4>
    </div>
</template>

<script>
    export default {
        name: "DirectionTag",
        props:{
            content: String
        }
    }
</script>

<style scoped>
    #tag {
        border-radius: 30px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .3);
        height: 40px;
        width: 120px;
    }
    #tag h4 {
        padding-top: 10%;
        text-align: center;
    }
    *{
        margin: 0 0 0 0;
    }
</style>