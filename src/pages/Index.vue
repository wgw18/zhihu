<template>
  <div>
    <HeadContent class="headContent"/>
      <Carousel/>
    <InfiniteScroll/>



 </div>
</template>

<script>
import HeadContent from "@/components/HeadContent.vue"
import Carousel from "../components/Carousel.vue"
import InfiniteScroll from "@/components/InfiniteScroll.vue"

export default {
  name:'index',
  components: { HeadContent, Carousel,InfiniteScroll}
}
</script>

<style scoped lang="less">
.headContent{
  position: fixed;
  top: 0rem;
  z-index: 10;
  background-color: white;
  opacity: 0.8;
}
</style>