<template>
  <div class="goods">
    <div class="menu-wrapper" v-el:menu-wrapper>
      <ul>
        <li v-for="item in goods" class="menu-item">
          <span class="text" border-1px>
            <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>
            <span>{{item.name}}</span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" v-el:foods-wrapper>
      <ul>
        <li class="food-list" v-for="item in goods">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-for="food in item.foods" class="food-item border-1px">
              <div class="icon">
                <img width="57" height="57" :src="food.icon" alt="">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span>
                  <span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span>
                  <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';

  const ERR_OK = 0;
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        goods: []
      };
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
      this.$http.get('/api/goods').then((res) => {
        res = res.body;
        if (res.errno === ERR_OK) {
          this.goods = res.data;
//          当数据已经加载完成是无法计算高度的，只有到同步执行的方法 nextTick同步执行才行
          this.$nextTick(() => {
            this._initScroll();
          });
        }
      });
    },
    methods: {
      _initScroll() {
        // 实例化better-scroll插件，传入要滚动的dom对象
        this.meunScroll = new BScroll(this.$els.menuWrapper, {});
        this.foodsScroll = new BScroll(this.$els.foodsWrapper, {});
//        2.0版本，下述方法不生效
//        this.meunScroll = new BScroll(this.$refs.menuWrapper, {});
//        this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {});
      }
    }
  };
</script>
<style lang='stylus' rel='stylesheet/stylus' type="text/stylus">
  @import "../../common/stylus/mxin.styl"
  .goods
    display: flex
    position: absolute
    top: 176px
    bottom: 46px
    width: 100%
    overflow hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background-color #f3f5f7
      .menu-item
        /*display为table的可以保证垂直居中的效果*/
        display: table
        height: 54px
        width: 56px
        line-height 14px
        padding: 0px 12px
        .icon
          display inline-block
          width: 12px
          height: 12px
          vertical-align: top
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
          &.decrease
            bg-image('decrease_3')
          &.discount
            bg-image('discount_3')
          &.guarantee
            bg-image('guarantee_3')
          &.invoice
            bg-image('invoice_3')
          &.special
            bg-image('special_3')
        .text
          display: table-cell
          width: 56px
          vertical-align middle
          border-1px(rgba(7, 17, 27, .1))
          font-size 12px
    .foods-wrapper
      flex: 1
      .title
        padding-left 14px
        height: 26px
        line-height 26px
        border-left: 2px solid #d9dde1
        font-size 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom 18px
        border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom 0px
        .icon
          flex: 0 0 57px
          margin-right 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height 14px
            font-size 14px
            color: rbg(7, 17, 27)
          .desc
            font-size 10px
            line-height 10px
            color: rgb(147, 153, 159)
            margin: 2px 0px 8px 0px
          .extra
            margin: 2px 0px 8px 0px
            font-size 10px
            line-height: 10px
            color: rgb(147, 153, 159)
            .count
              margin-right 12px
          .price
            font-weight 700
            line-height 24px
            .now
              margin-right 8px
              font-size 14px
              color: red
            .old
              font-size 10px
              color: rgb(147, 153, 159)
</style>

