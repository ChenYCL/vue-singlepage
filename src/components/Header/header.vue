<template>
  <div class="header">
    <!--上方-->
    <div class="content-wrapper">
      <!--左边图标区域-->
      <div class="avatar">
        <img width="64" height="64" :src="seller.avatar">
      </div>
      <!--右边文字内容区域-->
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <!--判断优惠券有没有-->
        <div v-if="seller.supports" class="support">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div v-if='seller.supports' class="support-count" @click="showDetail">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <!--下方-->
    <div class="bulletin-wrapper" @click="showDetail">
      <span class="bulletin-title"></span>
      <span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <!--背景-->
    <div class="background">
      <img :src="seller.avatar" alt="">
    </div>
    <!--灰色遮掩层-->
    <div v-show="detailShow" class="detail" transition="fade">
      <div class="detail-wrapper clearfix">
        <!--遮掩层实际内容层-->
        <div class="detail-main">
          <!--商家标题部分-->
          <div class="name">{{seller.name}}</div>
          <!--评分星星部分-->
          <div class="star-wrapper">
            <star :size="48" :score="seller.score"></star>
          </div>
          <!--下方文字-->
          <div class="title">
            <div class="line"></div>
            <div class="text">优惠信息</div>
            <div class="line"></div>
          </div>
          <ul v-if="seller.supports" class="supports">
            <li class="support-item" v-for="item in seller.supports">
              <span class="icon" :class="classMap[seller.supports[$index].type]"></span>
              <span class="text">{{seller.supports[$index].description}}</span>
            </li>
          </ul>
          <div class="title">
            <div class="line"></div>
            <div class="text">商家公告</div>
            <div class="line"></div>
          </div>
          <div v-if="seller.supports" class="title">
            <div class='text-bulletin'>{{seller.bulletin}}</div>
          </div>
        </div>
      </div>
      <div class="detail-close" @click="hideDetail">
        <i class="icon-close"></i>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import star from 'components/star/star';

  export default {
    // 父组件App入口模板中拿到了相关的数据 ,定义props可以接收从外部传过来的属性,传过来之后 就类似实例中的data中定义了seller变量
    props: {
      // 在取到属性的时候要定义类型
      seller: {
        type: Object
      }
    },
    data() {
      return {
        detailShow: false
      };
    },
    // 创建完毕
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    },
    components: {
      star
    },
    methods: {
      showDetail() {
        this.detailShow = true;
      },
      hideDetail() {
        this.detailShow = false;
      }
//      showDetail: function () {
//        this.detailShow = true;
//      }
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mxin.styl';
  .header
    position: relative
    color: #fff
    background-color rgba(7, 17, 27, 0.5)
    overflow hidden
    .content-wrapper
      position: relative
      padding: 24px 12px 18px 24px
      .avatar
        display: inline-block
        vertical-align: top
        border-radius: 1px
        img
          border-radius: 2px
      .content
        display: inline-block
        margin-left: 16px
        font-size: 14px
        .title
          margin: 2px 0 8px 0
          .brand
            display: inline-block
            vertical-align: top
            width: 30px
            height: 18px
            bg-image('brand')
            background-size: 30px 18px
            background-repeat: no-repeat
          .name
            margin-left: 6px
            font-size: 16px
            line-height: 18px
            font-weight: bold
        .description
          margin-bottom: 10px
          font-size: 12px
          color: rgb(255, 255, 255)
          line-height: 12px
        .support
          margin-bottom: 2px
          .icon
            display: inline-block
            vertical-align: top
            width: 12px
            height: 12px
            background-size: 12px 12px
            background-repeat: no-repeat
            &.decrease
              bg-image('decrease_1')
            &.discount
              bg-image('discount_1')
            &.guarantee
              bg-image('guarantee_1')
            &.invoice
              bg-image('invoice_1')
            &.special
              bg-image('special_1')
          .text
            vertical-align: middle
            margin-left: 4px
            font-size: 10px
            color: rgb(255, 255, 255)
            line-height: 12px
      .support-count
        position: absolute
        right: 12px
        bottom: 14px
        padding: 0 8px
        height 24px
        line-height: 24px
        background-color rgba(0, 0, 0, 0.2)
        border-radius: 14px
        text-align: center
        .count
          vertical-align: top
          font-size 10px
        .icon-keyboard_arrow_right
          margin-left: 2px
          line-height: 24px
          font-size 10px
    .bulletin-wrapper
      position relative
      height: 28px
      line-height 28px
      background-color rgba(7, 17, 27, 0.2)
      padding: 0px 22px 0px 12px
      white-space nowrap
      overflow hidden
      text-overflow ellipsis
      .bulletin-title
        bg-image('bulletin')
        display: inline-block
        vertical-align middle
        width: 22px
        height: 12px
        background-size 22px 12px
      .bulletin-text
        margin: 0px 4px
        font-size 10px
        color: rgb(255, 255, 255)
        font-weight 200
        line-height 28px
      .icon-keyboard_arrow_right
        position: absolute
        display inline-block
        font-size 10px
        top: 8px
        right: 12px
    .background
      img
        position absolute
        z-index -1
        top: 0px
        left 0px
        height 100%
        width 100%
        filter blur(10px)
    .detail
      position fixed
      z-index 100
      top: 0
      left 0
      width: 100%
      height: 100%
      overflow auto
      transition all 1s
      /*ios下背景模糊效果*/
      backdrop-filter: blur(10px)
      /*过渡的实现 最终的状态，xx-enter,xx-leave进入和离开时的效果*/
      &.fade-transition
        opacity 1
        background-color rgba(7, 17, 27, 0.8)
      &.fade-enter, &.fade-leave
        opacity: 0
        background-color rgba(7, 17, 27, 0)
  .detail-wrapper
    min-height: 100%
    width: 100%
    .detail-main
      margin-top 64px
      padding-bottom: 64px
      .name
        font-size 16px
        text-align center
        font-weight 700
        color: rgb(255, 255, 255)
        line-height 16px
      .star-wrapper
        margin-top 18px
        padding 2px 0px
        text-align center
      .title
        position relative
        display: flex
        width 80%
        margin: 30px auto 24px auto
        .line
          flex: 1
          position: relative
          top: -6px
          border-bottom 1px solid rgba(255, 255, 255, 0.2)
        .text
          padding: 0px 12px
          font-size: 14px
          font-weight 700
          color: rgb(255, 255, 255)
        .text-bulletin
          font-size 12px
          font-weight 200
          color rgb(255, 255, 255)
          line-height 24px
          text-align: justify
      .supports
        width: 80%
        margin: 0 auto
        .support-item
          padding 0 12px
          margin-bottom 12px
          font-size 0px
          &:last-child
            margin-bottom 0px
          .icon
            display inline-block
            width: 16px
            height: 16px
            vertical-align: top
            margin-right: 6px
            background-size: 16px 16px
            background-repeat: no-repeat
            &.decrease
              bg-image('decrease_2')
            &.discount
              bg-image('discount_2')
            &.guarantee
              bg-image('guarantee_2')
            &.invoice
              bg-image('invoice_2')
            &.special
              bg-image('special_2')
          .text
            display inline-block
            vertical-align top
            margin-top 2px
            font-size 12px
            font-weight 200
            line-height: 12px
            color: rgb(255, 255, 255)
  .detail-close
    /*position relative*/
    width: 32px
    height: 32px
    margin: -64px auto 0 auto
    clear both
    font-size 34px
</style>
