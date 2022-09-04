<template>
    <div class="menuWrapper">
        <div class="back"><i class="iconfont icon-fanhui" @click="back"></i></div>
        <div class="otherIco" @click="gotoComment">
            <i class="iconfont icon-pinglun1" ></i>
            <span>{{commentsNum}}</span>
        </div>
        <div class="otherIco">
            <i class="iconfont" :class="dianzan" @click="dianzanToggle"></i>
            <span>{{thumbs}}</span>
        </div>
        <div class="otherIco">
            <i class="iconfont" :class="shoucang" @click="shoucangToggle"></i>
        </div>
        <div class="otherIco"><i class="iconfont icon-fenxiang" @click="shareIt"></i></div>

        <share v-if="!share"/>
    </div>
</template>

<script>
import axios from 'axios'
import Share from './Share.vue'
import {mixin} from '../mixin'
import {mapState,mapMutations} from 'vuex'
export default {
    name:'newmenu',
    data() {
        return {
            dianzan:'icon-dianzan',
            shoucang:'icon-shoucang',
            commentsNum:0,
            thumbs:0,
        }
    },
    components:{
        Share
    },
    methods: {
        ...mapMutations('mainOption',['updateLongComment','updateShortComment','updateShare']),
        ...mapMutations('collectOption',['collectItemAppend','collectItemRemove','dianzanItemAppend','dianzanItemRemove']),
        gotoComment(){
            this.$router.push({ name: 'comment' });
        },
        dianzanToggle(){
            this.dianzan = this.dianzan==='icon-dianzan'?'icon-dianzan redIcon':'icon-dianzan';
            this.thumbs += this.dianzan==='icon-dianzan'? -1:1;
            if(this.dianzan=='icon-dianzan redIcon'){
                this.dianzanItemAppend(this.id)
            }
            if(this.dianzan=='icon-dianzan'){
                this.dianzanItemRemove(this.id)
            }
        },
        shoucangToggle(){
            this.shoucang = this.shoucang==='icon-shoucang'?'icon-shoucang redIcon':'icon-shoucang';
            if(this.shoucang=='icon-shoucang redIcon'){
                this.collectItemAppend(this.id)
            }
            if(this.shoucang=='icon-shoucang'){
                this.collectItemRemove(this.id)
            }
        },
        shareIt(){
            this.updateShare(false);
        }
    },
    mixins:[mixin],
    computed:{
        ...mapState('mainOption',['id','share']),
        ...mapState('collectOption',['collectItem','dianzanItem'])
        
    },
    mounted() {
        this.collectItem.forEach((item)=>{
            if(item==this.id){
                this.shoucangToggle()
            }
        })

        this.dianzanItem.forEach((item)=>{
            if(item==this.id){
                this.dianzanToggle()
            }
        })
        axios.get('api/4/story-extra/'+this.id).then(
            response => {
                this.commentsNum = response.data.comments
                this.thumbs = response.data.popularity
                this.updateLongComment(response.data.long_comments)
                this.updateShortComment(response.data.short_comments)
            }
        )
    },
}
</script>

<style scoped lang="less">
.menuWrapper{
    width: 3.76rem;
    height: 0.5rem;
    border: black 1px solid;
    background-color: white;
    display: flex;
    justify-content: space-between;
    .back{
        width: 0.55rem;
        height: 0.26rem;
        font-size: 0.2rem;
        border-right: 0.01rem #888888 solid;
        margin: 0.12rem 0;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .otherIco{
        width: 0.55rem;
        height: 0.26rem;
        font-size: 0.2rem;
        margin: 0.12rem 0;
        display: flex;
        align-items: baseline;
        position: relative;        

        i{
            font-size: 0.25rem;
            line-height: 0.25rem;
        }
        .redIcon{
            color: red;
        }
    }
    .otherIco span{
        font-size: 0.1rem;
        position: absolute;
        right: 0.1rem;
        top:0rem
    }

}
</style>