<template>
    <div>
        <div class="headerBar">
            <i class="iconfont icon-fanhui" @click="back"></i>
        </div>        
        <div class="avater">
            <img src="../assets/user.svg" alt="">
        </div>
        <div class="idname">wgw</div>
        <div class="line" ><span>我的收藏</span> <span class="right"><i class="iconfont icon-gengduo1"></i></span> </div>
        <div class="line"><span>消息中心</span> <span class="right"><i class="iconfont icon-gengduo1"></i></span> </div>
        <footer>
            <div class="function">
                <div class="icon"><i class="iconfont icon-yejianmoshi"></i></div>
                <div class="title"><span>夜间模式</span></div>
            </div>
            <div class="function">
                <div class="icon"><i class="iconfont icon-shezhi"></i></div>
                <div class="title"><span>设置</span></div>
            </div>
        </footer>

    </div>


</template>

<script>
import {mixin} from '../mixin'
export default {
    data() {
        return {
            
        }
    },
    methods: {

    },
  mixins:[mixin]

}
</script>

<style lang="less" scoped>
.headerBar{
    width: 3.76rem;
    height: 0.8rem;
    line-height: 0.8rem;
    padding-left: 0.2rem;
    padding-top: 0.1rem;
    i{
        font-size: 0.3rem;
        font-weight: 600;
        display: block;
    }
}
.avater{
    overflow: hidden;
    display: flex;
    justify-content: center;
    img{
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
    }
}
.idname{
    font-size: 0.18rem;
    font-weight: 600;
    text-align: center;
    padding-bottom: 0.3rem;
}
.collec
.myMsg{
    width: 100%;
    height: 0.8rem;
    font-size: 0.2rem;
    border-top: 1px black solid;
}

.line{
    border-top: 1px solid #ddd;
    height: 0.56rem;
    width: 3.75rem;
    font-size: 0.16rem;
    display: flex;
    align-items: center;
    padding-left: 0.16rem;
}
.line .right{
    flex: 1;
    display: flex;
    flex-direction: row-reverse;
    margin-right: 0.18rem;
}
.line .right i{
    font-size: 0.12rem;
}
footer{
    position: absolute;
    bottom: 0.52rem;
    width: 3.75rem;
    height: 0.52rem;
    display: flex;
    margin: 0 0.425rem;
}
footer .function{
    width: 1.45rem;
    height: 0.52rem;
    
    /* display: flex;
    justify-content: center; */
}
footer .function .icon{
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: 0.1rem;
   
}
footer .function .icon i{
    font-size: 0.3rem;
}
footer .function .title{
    width: 100%;
    display: flex;
    justify-content: center;
    font-size: 0.12rem;
}
</style>