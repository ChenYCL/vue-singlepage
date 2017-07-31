<template>
  <div class="shopcart">
    <!--底部的区块-->
    <div class="content">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo">
            <i class="icon-shopping_cart"></i>
          </div>
        </div>
        <div class="price">￥0</div>
        <div class="desc">另需配送￥{{deliveryPrice}}元</div>
      </div>
      <div class="content-right">
        <div class="pay">
          ￥{{minPrice}}元起送费
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      /*由goods组件告诉我们 选择了那种商品*/
      selectFoods: {
        type: Array,
        default() {
          return [];
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
//    计算选择商品的总价
    computed: {
//      计算总价的方法
      totalPrice() {
        let total = 0;
        this.selectFoods.forEach((food) => {
            total+=food.price*food.count;
        });
        return total;
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
            .icon-shopping_cart
              font-size 24px
              line-height 44px
              color: #80858A
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
</style>
