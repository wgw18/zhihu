<template>
    <div class="detailWrapper">
        <div :class="detailIs" >
            <div class="imgbox"    v-if="Bodydata.image_hue"         
            :style="{'background': 'linear-gradient(to top,'+ '#'+Bodydata.image_hue.slice(2)+' , rgba(255, 255, 255, 0) 70%), url('+Bodydata.image+')'}">
            <span>{{Bodydata.title}}</span>
            </div>
            <div >
                <div v-html="Bodydata.body"></div>
            </div>
        </div>
        <NewMenu class="new-menu"/>
    </div>
</template>

<script>
import axios from "axios"
import NewMenu from "@/components/NewMenu.vue"
import {mapState,mapMutations} from 'vuex'
export default {
    name:'newsdetail',
    data() {
        return {
            Bodydata:{}
        }
    },
    components:{NewMenu},
    created() {
        // this.id = this.$route.params.id
        this.updateId(this.id);
        axios.get('api/4/news/'+this.id).then(response => {
            // response.data.body = this.attachBodyContent(response.data.body);
            this.Bodydata = response.data
            // console.log(this.Bodydata);
            // setTimeout(()=>{
            //     this.updatelastestContent({'image':this.Bodydata.image,'title':this.Bodydata.title,'id':this.Bodydata.id})
            // },1)
        })
        .catch(error => {
            console.log(this.error)
        })
    },
    computed:{
        ...mapState('mainOption',['share','id']),
        detailIs(){
            return this.share==true?'':'detail'
        }
    },
    methods: {
        ...mapMutations('mainOption',['updateshare','updatelastestContent','updateId']),
    },
}
</script>

<style lang="less" scoped>
.detailWrapper{
    width: 3.75rem;
    overflow: hidden;

    .detail{
        width: 3.75rem;
        position: relative;
    }
    .detail::after{
    position: absolute;
    top: 0;
    content: ' ';
    width: 100%;
    height: 100%;
    background: #555;
    opacity: 0.6;
    }
    
    .imgbox{
        width: 3.75rem;
        height: 3.75rem;
        position: relative;
    }
    .imgbox span{
        position: absolute;
        bottom: 0.27rem;
        left: 0.2rem;
        color: white;
        margin-right: 0.36rem;
        font-size: 0.2rem;
        line-height: 0.25rem;
    }

    .new-menu{
        position: fixed;
        bottom: 0px;
    }  
}
/* @import url(https://news-at.zhihu.com//css//news_qa.auto.css?v=4b3e3); */
@import url(../../public/css/newsDetail.css);
</style>