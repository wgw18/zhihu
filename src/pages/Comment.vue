<template>
  <div class="commmentWrapper">
    <header>
        <i class="iconfont icon-fanhui" @click="back"></i>
        <span>{{TotalComment}} 条评论</span>
    </header>
    <div class="blank"></div>
    <div class="long">
        <div class="longNumber" v-if="longCommentN*1.0>0">
            {{longCommentN}} 条长评
        </div>
        <div v-for="(longCommentItem,index) in longComment" :key="index" class="item">
            <div class="headPhoto">
                <img :src="longCommentItem.avatar" alt="">
            </div>
            <div class="content">
                <div class="top">
                    <span>{{longCommentItem.author}}</span>
                    <i class="iconfont icon-gengduo"></i>
                </div>
                <div class="text">
                    {{longCommentItem.content}}
                </div>
                <div class="bottom">
                    <span>{{new Date(parseInt(longCommentItem.time) * 1000).toLocaleString().replace(/:\d{1,2}$/,'').replace(/^\d{1,4}\//,'').replace(/\//,'-')}}</span>
                    <div class="zanping">
                        <span>
                            {{longCommentItem.likes*1.0}}
                        </span>
                        <i class="iconfont" 
                        :class="longCommentItem.isLike"
                        @click="likeIt(index,'l')"></i>
                        <i class="iconfont icon-pinglun"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="short">
        <div class="longNumber">
            {{shortCommentN}} 条短评
        </div>

        <div v-for="(shortCommentItem,index) in shortComment" :key="index" class="item">
            <div class="headPhoto">
                <img :src="shortCommentItem.avatar" alt="">
            </div>
            <div class="content">
                <div class="top">
                    <span>{{shortCommentItem.author}}</span>
                    <i class="iconfont icon-gengduo"></i>
                </div>
                <div class="text">
                    {{shortCommentItem.content}}
                </div>
                <div class="bottom">
                    <!-- {{date('H:i:s',longCommentItem.time)}} -->
                    <span>{{new Date(parseInt(shortCommentItem.time) * 1000).toLocaleString().replace(/:\d{1,2}$/,'').replace(/^\d{1,4}\//,'').replace(/\//,'-')}}</span>
                    <div class="zanping">
                        <span>
                            {{shortCommentItem.likes*1.0}}
                        </span>
                        <i class="iconfont" 
                        :class="shortCommentItem.isLike"
                        @click="likeIt(index,'s')"></i>
                        <i class="iconfont icon-pinglun"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="writeComment" @click="writeComment">
        <img src="../assets/user.svg" alt="">
        <span>说说你的看法...</span>
    </div>
    <div class="blank2"></div>
  </div>
</template>

<script>
import { mixin } from '@/mixin'
import router from '../router'
import {mapGetters,mapState,mapMutations} from 'vuex'
import axios from 'axios'
export default {
    name:'comment',
    mixins:[mixin],
    data() {
        return {
            shortComment:[],
            longComment:[],
            dianzan:'icon-dianzan'
        }
    },
    methods: {
        ...mapMutations('collectOption',['commentsAppend']),
        likeIt(indexItem,ls){
            if(ls=='l'){
                if(this.longComment[indexItem].isLike == 'icon-dianzan'){
                    this.longComment[indexItem].likes += 1
                    this.longComment[indexItem].isLike = 'icon-dianzan_kuai'
                }
                else{
                    this.longComment[indexItem].likes -= 1
                    this.longComment[indexItem].isLike = 'icon-dianzan'
                }
            }
            if(ls=='s'){
                if(this.shortComment[indexItem].isLike == 'icon-dianzan'){
                    this.shortComment[indexItem].likes += 1
                    this.shortComment[indexItem].isLike = 'icon-dianzan_kuai'
                }
                else{
                    this.shortComment[indexItem].likes -= 1
                    this.shortComment[indexItem].isLike = 'icon-dianzan'
                }
            }
            this.commentsAppend({'id':this.id,'longComment':this.longComment,'shortComment':this.shortComment})
        },
        writeComment(){
            router.push({name:'writeComment'})
        }
    },
    computed:{
        ...mapGetters('mainOption',['TotalComment']),
        ...mapState('mainOption',['id','longCommentN','shortCommentN'])
    },
    created() {
        let commentsHistoryThis = null
        if(sessionStorage.getItem('comments')!=null){
            var commentsHistory = JSON.parse(sessionStorage.getItem('comments'))
            commentsHistory.forEach((item)=>{
                if(item.id == this.id){
                    commentsHistoryThis = item
                }
            })
        }
        if(commentsHistoryThis==null){
            axios.get('api/4/story/'+this.id+'/long-comments').then(response =>{
            this.longComment = response.data.comments
            this.longComment.forEach((longCommentItem,index)=>{
                this.longComment[index].isLike = 'icon-dianzan'
                })
            })
        axios.get('api/4/story/'+this.id+'/short-comments').then(response =>{
            this.shortComment = response.data.comments
            this.shortComment.forEach((shortCommentItem,index)=>{
                this.shortComment[index].isLike = 'icon-dianzan'
                })            
            })
        }
        else{
            this.longComment = commentsHistoryThis.longComment
            this.shortComment = commentsHistoryThis.shortComment
        }
        setTimeout(()=>{
            this.commentsAppend({'id':this.id,'longComment':this.longComment,'shortComment':this.shortComment})
        },1000)
    },
}
</script>

<style scoped lang="less">
.commmentWrapper{
  width: 100%;
  header{
    height: 0.49rem;
    font-size: 0.16rem;
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 0.27rem 0 0;
    border-bottom: 1px #ddd solid;
    background: white;
    position: fixed;
    top: 0px;
    font-weight: 600;
    line-height: 100%;

    i{
      position: absolute;
      left: 5%;
       font-size: 0.2rem;
    }
  }
  
.blank{
    width: 100%;
    height: 0.7rem;
}
.blank2{
    width: 100%;
    height: 0.82rem;
}
.longNumber{
    margin-top: 0.13rem;
    font-size: 0.12rem;
    font-weight: 550;
    margin-bottom: 0.15rem;
    margin-left: 0.15rem;
}
.item{
    padding:  0.15rem 0.15rem 0.2rem 0.15rem;
    width: 100%;
    display: flex;
    font-size: 0.14rem;
    border-bottom: 1px #ddd solid;

    .headPhoto{


      img{
        width: 0.3rem;
        height: 0.3rem;
        border-radius: 50%;
        margin-right: 0.10rem;
        font-size: 0.14rem;
      }
      .content{
        font-size: 0.14rem;
        width: 100%;
        margin: 0;

        .top{
          font-size: 0.14rem;
          line-height: 0.14rem;
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.1rem;

          span{
            font-weight: 600;
          }
          i{
              /* flex: 1; */
              margin-right: 0;
          }

        }

        .bottom{
            margin-top: 0.2rem;
            color: #888;
            display: flex;
            justify-content: space-between;
        }
        .zanping {
            font-size: 0.16rem;
            .icon-pinglun{
              margin-left: 0.35rem; 
            }
        }
      }
    }
  }
.writeComment{
    width: 100%;
    height: 0.52rem;
    background: #eee;
    position: fixed;
    bottom: 0;
    padding-top: 0.12rem;
    padding-left: 0.15rem;
    font-size: 0.12rem;
    color: #AEAEAE;
}
.writeComment img{
    margin-right: 0.06rem;
    width: 0.3rem;
    height: 0.3rem;
    border-radius: 50%;
}


}

</style>