<template>
  <mt-swipe class="newsList" :auto="4000">
    <mt-swipe-item class="new"
    v-for="ts in stories" :key="ts.id"
      @click.native="viewDetail(ts.id)"
    >
      <img alt="" 
      :style="{'background': 'linear-gradient(to top,'+ '#'+ts.image_hue.slice(2)+' , rgba(255, 255, 255, 0) 70%), url('+ts.image+')'}"
      >
      <div class="new_title">
        <div class="story_title">{{ts.title}}</div>
        <div class="story_author">{{ts.hint}}</div>
      </div>
    </mt-swipe-item>
  </mt-swipe>
</template>

<script>
import {mixin} from '../mixin'
import axios from 'axios'
import {Swipe, SwipeItem} from 'mint-ui'
// import 'mint-ui/lib/style.css'
axios.defaults.withCredentials = true

export default {
  name:'carousel',
    components: {
    'mt-swipe': Swipe,
    'mt-swipe-item': SwipeItem
  },
  data() {
    return {
      stories:{},

    }
  },
  methods: {
    setTimer(){

    }
  },
  created() {
    axios.get('api/4/news/latest').then(reslove=>{
      this.stories = reslove.data.top_stories;
    })
  },
  mounted() {
    
  },
  beforeDestroy() {
    console.log('Carousel will be destroied')
  },
  mixins:[mixin]
}
</script>

<style scoped lang="less">
.newsList{
  width: 3.76rem;
  height: 3.76rem;
  overflow-x: hidden; 
  position: relative;
    img{
      width:100%;
      height: 100%;
      object-fit: fill;
    }
    .new_title{
      width: 3rem;
      height: 1rem;
      color: white;
      // border: black solid 1px;
      position: absolute;
      left: 0.3rem;
      bottom: 0.1em;

      .story_title{
        font-size: 0.2rem;
        line-height: 0.25rem;
      }
      .story_author{
        font-size: 0.12rem;
        line-height: 0.12rem;
        margin-top: 0.14rem;
      }
    }
}
</style>