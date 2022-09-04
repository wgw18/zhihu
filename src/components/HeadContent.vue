<template>
  <div class="headWrapper">
      <div class="dateNow">
          <div class="day">14</div>
          <div class="month">五月</div>
      </div>
      <div class="hello">
          早上好
      </div>
      <div class="user" @click="gotoUser">
          <img src="../assets/user.svg" alt="">
      </div>
  </div>
</template>

<script>
export default {
    name:'headContent',
    methods: {
        gotoUser(){
            this.$router.push({
                name:'user',
                // params:{
                //     id:xxx,
                //     title:xxx
                // }
            })
        }
    },
}
</script>

<style scoped lang="less">
.headWrapper{
    width: 100%;
    display: flex;
    font-size: 0.15rem;
    padding: 0.13rem;
    overflow-x: hidden;
    // background-color: #bfa;
    .dateNow{
        width: 0.35rem;
        height: 0.35rem;
        padding-right: 0.13rem;
        border-right: 0.01rem solid #999999;
        text-align: center;
    }
    .hello{
        width: 2.3rem;
        font-size: 0.23rem;
        line-height: 0.35rem;
        padding-left: 0.2rem;
    }
    .user{
        width: 0.35rem;
        height: 0.35rem;

    }
}

</style>