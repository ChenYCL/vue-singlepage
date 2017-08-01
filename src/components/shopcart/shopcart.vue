<template>
  <div class="shopcart">
    <!--底部的区块-->
    <div class="content">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo" :class="{'highlight':totalCount>0}">
            <i class="icon-shopping_cart" :class="{'highlight':totalCount>0}"></i>
          </div>
          <div class="num" v-show="totalCount>0">{{totalCount}}</div>
        </div>
        <div class="price" :class="{'highlight':totalPrice>0}">￥{{totalPrice}}</div>
        <div class="desc">另需配送￥{{deliveryPrice}}元</div>
      </div>
      <div class="content-right">
        <div class="pay" :class="payClass">
          {{payDesc}}
        </div>
      </div>
    </div>
    <div class="ball-container">
      <!--小球的容器-->
      <div transition="drop" class="ball" v-for="ball in balls" v-show="ball.show"></div>
      <div class="inner"></div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
//      由goods组件告诉我们 选择了那种商品
      selectFoods: {
        type: Array,
        default() {
          return [
            {
              price: 10,
              count: 2
            }
          ];
        }
      },
      deliveryPrice: {
        type: Number,
        default: 0
      },
      minPrice: {
        type: Number,
        default: 0
      }
    },
    data() {
      // 小球路径
      return {
        balls: [
          {
            show: false,
          },
          {
            show: false,
          },
          {
            show: false,
          },
          {
            show: false,
          },
          {
            show: false,
          }
        ]
      }
    },
//    计算选择商品的总价
    computed: {
//      计算总价的方法
      totalPrice() {
        let total = 0;
        this.selectFoods.forEach((food) => {
          total += food.price * food.count;
        });
        return total;
      },
//      计算所有商品的总和
      totalCount() {
        let count = 0;
        this.selectFoods.forEach((food) => {
          count += food.count;
        });
        return count;
      },
      payDesc() {
        if (this.totalPrice === 0) {
          return `差${this.minPrice}元起送`;
        } else if (this.totalPrice < this.minPrice) {
          let diff = this.minPrice - this.totalPrice;
          return `还差￥${diff}元起送`;
        } else {
          return '去结算';
        }
      },
      payClass() {
        if (this.totalPrice === 0) {
          return 'not-enough';
        } else if (this.totalPrice < this.minPrice) {
          let diff = this.minPrice - this.totalPrice;
          return 'not-enough';
        } else {
          return 'enough';
        }
      }
    }
  };
</script>
<style lang='stylus' rel='stylesheet/stylus' type="text/stylus">
  .shopcart
    position: fixed
    left: 0
    bottom: 0
    z-index: 50
    width: 100%
    height: 48px
    .content
      display flex
      background-color #161C29
      font-size 0
      .content-left
        flex: 1
        /*购物车logo的容器*/
        .logo-wrapper
          display: inline-block
          position: relative
          top: -10px
          margin: 0 12px
          padding 6px
          width: 56px
          height: 56px
          box-sizing border-box
          /*顶部对齐*/
          vertical-align top
          border-radius: 50%
          background-color #141d27
          .logo
            width: 100%
            height 100%
            border-radius 50%
            background-color: #2B343C
            /*给里面的字体图标 居中效果*/
            text-align center
            &.highlight
              background-color rgb(0, 160, 220)
            .icon-shopping_cart
              font-size 24px
              line-height 44px
              color: #80858A
              &.highlight
                color: #fff
          .num
            position absolute
            top 0
            right 0
            width 24px
            height 16px
            line-height 16px
            text-align center
            border-radius 16px
            font-size 9px
            font-weight 700
            color: rgb(255, 255, 255)
            background-color rgb(240, 20, 20)
            box-shadow 0px 4px 8px 0px rgba(0, 0, 0, 0.4)
        /*价格*/
        .price
          display: inline-block
          vettical-align: top
          margin-top: 12px
          padding-right 12px
          box-sizing border-box
          border-right 1px solid rgba(255, 255, 255, 0.1)
          font-size 16px
          font-weight 700
          line-height 24px
          color: rgba(255, 255, 255, 0.4)
          &.highlight
            color: #fff
        .desc
          display: inline-block
          vettical-align: top
          margin-top: 12px
          margin-right 12px
          line-height 24px
          font-size 16px
          font-weight 100
          color: rgba(255, 255, 255, 0.4)
      .content-right
        flex 0 0 105px
        width 105px
        background: #2B333B
        .pay
          font-size 13px
          font-weight 700
          text-align center
          height 48px
          line-height 48px
          color: rgba(255, 255, 255, 0.4)
          &.not-enough
            background-color #2B333B
          &.enough
            background-color #00b43c
            color: #fff
    .ball-container
      .ball
        position: fixed
        left 32px
        bottom: 22px
        z-index 200
        &.drop-tansition
          transition: all 0.5s
          .inner
            width 16px
            height 16px
            border-radius 50%
            color:  rgb(0,160,220)
            transition: all 0.5s


</style>
