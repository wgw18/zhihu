<template>
        <ul
        v-infinite-scroll="loadMore"
        :infinite-scroll-disabled="loading"
        infinite-scroll-immediate-check="false"
        infinite-scroll-distance="10">
            <li v-for="item in story" :key="item.id" @click="viewDetail(item.id)">
            <div class="msg">
                <div class="story_title">{{item.title}}</div>
                <div class="story_hint">{{item.hint}}</div>
            </div>
            <img :src="item.images[0]" alt="">
            </li>
        </ul> 

</template>

<script>
import axios from 'axios'
import {mixin} from '../mixin'
export default {
    name:'InfiniteScroll',
    data () {
        return {
            story:{},
            date:'',
            loading:false
        }
    },
    mixins:[mixin],
    methods: {
        loadMore() {
            this.loading = true;
            //  this.$nextTick(()=>{
                this.date.setDate(this.date.getDate() - 1)
                let dateNow =  this.date.getFullYear().toString() + (this.date.getMonth()<10 ? '0' : '')+
                (this.date.getMonth()+1).toString() + (this.date.getDate()<10 ? '0' : '')+
                this.date.getDate().toString()
                // console.log(dateNow);
                axios.get('api/4/news/before/'+dateNow).then(response => {
                let s = response.data.stories
                this.story.push(...s)
                // console.log(s);
                this.loading = false;
                })
                .catch(error => {
                    console.log(error)
                })
                // setTimeout(()=>{
                //     console.log(111);
                //     this.loading = false;
                // },1000)
            //  })

            }
    },
    created() {
        
        axios.get('api/4/news/latest').then(response => {
            this.story = response.data.stories
            this.date = new Date()
            // console.log(new Date());
            // console.log(this.story);
        })
        .catch(error => {
            // console.log(error)
        })
        // console.log(this.story);
    },
    beforeDestroy() {
        console.log('InfiniteScroll will be destroied')
    },
}
</script>
<style scoped lang="less">

ul{
    // overflow-x: hidden;
    li{
        width: 100%;
        height: 1rem;
        font-size: 0.2rem;
        display: flex;

        .msg{

            width: 2.74rem;
            height: 1rem;
            .story_title{
                font-size: 0.16rem;
                line-height: 0.16rem;
                margin: 0.1rem;
                margin-top: 0.2rem;
            }
            .story_hint{
                margin-top: 0.2rem;
                margin-left: 0.1rem;
                font-size: 0.12rem;
                line-height: 0.12rem;
                color: rgb(96, 94, 94);
            }
        }
        img{
            width: 0.7rem;
            height: 0.7rem;
            margin:0.16rem;
        }
    }    
}


</style>