<template>
    
    <div class="scrollWrapper" @scroll="scroll">
        <!-- <button @click="loadMore"></button> -->
        <ul >
        <!-- v-infinite-scroll="loadMore"
        :infinite-scroll-disabled="loading"
        infinite-scroll-immediate-check="false"
        infinite-scroll-distance="10" -->
            <div :style="{height: `${itemHeight*story.length}px`, 'position': 'relative'}">
                <div :style="{'position': 'absolute', 'top': `${top}px`}">
                    <li v-for="item in showStory" :key="item.id" @click="viewDetail(item.id)">
                    <div class="msg">
                        <div class="story_title">{{item.title}}</div>
                        <div class="story_hint">{{item.hint}}</div>
                    </div>
                    <img :src="item.images[0]" alt="">
                    </li>                    
                </div>

            </div>

        </ul>         
    </div>


</template>

<script>
import axios from 'axios'
import {mixin} from '../mixin'
export default {
    name:'InfiniteScroll',
    data () {
        return {
            story:[],
            date:'',
            loading:false,
            showStory:[],
            scrollTop: 0,  //卷起的高度
            contentHeight:0,
            itemHeight: 0,
            ulHeight:0,
            startIndex:0,
            endIndex:0,
            showNum:0,
            firstFlag:true,
            top: 0, //偏移量
        }
    },
    mixins:[mixin],
    methods: {
        loadMore() {
            this.loading = true;
            // this.scroll()
            // console.log(this.itemHeight,document.querySelector('ul').scrollTop);
            //  this.$nextTick(()=>{
                this.date.setDate(this.date.getDate() - 1)
                let dateNow =  this.date.getFullYear().toString() + (this.date.getMonth()<10 ? '0' : '')+
                (this.date.getMonth()+1).toString() + (this.date.getDate()<10 ? '0' : '')+
                this.date.getDate().toString()
                // console.log(dateNow);
                axios.get('api/4/news/before/'+dateNow).then(response => {
                    let s = response.data.stories
                    this.story.push(...s)
                    if(this.firstFlag){
                        this.showStory = [...this.story]
                        this.firstFlag = false
                    }
                    // console.log(this.story);
                    this.loading = false;
                }).then(()=>{
                    this.$nextTick(function() {
                        this.itemHeight = document.querySelector('li').clientHeight
                        this.contentHeight = document.querySelector('.scrollWrapper').clientHeight
                    // console.log(this.itemHeight);
                    });
                }).catch(error => {
                    console.log(error)
                })
            },
        getShowList(){
            // console.log(this.scrollTop);
            this.showNum = Math.ceil(this.contentHeight/this.itemHeight);  //可视区域最多出现的数据条数，值是小数的话往上取整，因为极端情况是第一条和最后一条都只显示一部分
            // this.showNum = 12;
            this.startIndex = Math.floor(this.scrollTop/this.itemHeight);   //可视区域第一条数据的索引
            this.endIndex = this.startIndex + this.showNum;   //可视区域最后一条数据的后面那条数据的索引
            // console.log('startIndex',this.startIndex,this.showNum);
            this.showStory = this.story.slice(this.startIndex, this.endIndex)  //可视区域显示的数据，即最后要渲染的数据。实际的数据索引是从this.startIndex到this.endIndex-1
            const offsetY = this.scrollTop - (this.scrollTop % this.itemHeight);  //在这需要获得一个可以被itemHeight整除的数来作为item的偏移量，这样随机滑动时第一条数据都是完整显示的
            this.top = offsetY;
        },
        async scroll(){
            let dom = document.querySelector('.scrollWrapper');  //element.scrollTop方法可以获取到卷起的高度
            this.scrollTop = dom.scrollTop
            // console.log(dom.scrollHeight,dom.scrollTop,dom.clientHeight);
            if(dom.scrollHeight-dom.scrollTop-dom.clientHeight<10){
                await this.loadMore()
            }
            this.getShowList();
        },
        },

    created() {
        axios.get('api/4/news/latest').then(response => {
            this.story = response.data.stories
            this.date = new Date()
            // this.showStory = response.data.stories
            // console.log(new Date());
            // console.log(this.story);
        }).then(()=>{
            this.loadMore()
        }).catch(error => {
            console.log(error)
        })

        
        // console.log(this.story);
        // this.itemHeight = document.querySelector('li').clientHeight
        // console.log('itemHeight',this.itemHeight);

    },
    beforeDestroy() {
        // console.log('InfiniteScroll will be destroied')
    },
}
</script>
<style scoped lang="less">
button{
    width: 50px;
    height: 50px;
    position: absolute;
    left: 0px;
    top: 0px;
    z-index: 100;
}
.scrollWrapper{
    width: 100%;
    height: 100vh;
    overflow: auto;
}
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