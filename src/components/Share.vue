<template>
  <div class="shareWrapper">
      <div class="shareTitle">
          分享这篇文章
      </div>
      <div class="iconList">
          <div class="shareIco">
              <i class="iconfont icon-weixin" style="color:#78C476"></i>
              <span>微信</span>
          </div>
          <div class="shareIco">
              <i class="iconfont icon-pengyouquan" style="color:#A3CA6B"></i>
              <span>微信</span>
          </div>
          <div class="shareIco">
              <i class="iconfont icon-QQ" style="color:#479EE3 "></i>
              <span>微信</span>
          </div>
          <div class="shareIco">
              <i class="iconfont icon-QQkongjian" style="color:#E4BE58 "></i>
              <span>微信</span>
          </div>
          <div class="shareIco">
              <i class="iconfont icon-weibo" style="color:#D96661"></i>
              <span>微信</span>
          </div>
          <div class="shareIco">
              <i class="iconfont icon-zailiulanqidakai" style="color: #808080"></i>
              <span>微信</span>
          </div>
          <div class="shareIco">
              <i class="iconfont icon-fuzhilianjie" style="color:#808080 "></i>
              <span>微信</span>
          </div>
          <div class="shareIco">
              <i class="iconfont icon-gengduo" style="color: #808080"></i>
              <span>微信</span>
          </div>
      </div>
      <div class="cancle" @click="updateShare(true)">取消</div>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
export default {
    name:'share',
    methods: {
        ...mapMutations('mainOption',['updateShare']),
    },
}
</script>

<style scoped lang="less">
.shareWrapper{
    width: 100%;
    background-color: white;
    position: fixed;
    bottom: 0px;
    z-index: 100;
    font-size: 0.12rem;

    .shareTitle{
        width: 100%;
        height: 0.2rem;
        text-align: center;
        line-height: 0.5rem;
        color: #888;

    }
    .iconList{
        width: 100%;
        display: flex;
        flex-flow: row wrap;
        border-bottom: 0.02rem solid #ddd;
        padding-top: 0.3rem;
        padding-bottom: 0.3rem;
        .shareIco{
            width: 25%;
            height: 0.94rem;
            text-align: center;
            line-height: 0.94rem;
            position: relative;
            i{
            font-size: 0.5rem;
            }
            span{
                color: #888;
                font-size: 0.1rem;
                margin-top: 0.08rem;
                position: absolute;
                left: 50%;
                transform: translateX(-50%);
                bottom: -0.35rem;
            }
        }

    }
    .cancle{
        width: 100%;
        height: 0.5rem;
        font-size: 0.16rem;
        text-align: center;
        line-height: 0.5rem;
        border-top: 1px solid 808080;
        color: #888;

    }
}
</style>