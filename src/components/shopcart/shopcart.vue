<template>
  <div class="shopcart">
    <!--底部的区块-->
    <div class="content" @click="toggleList">
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
      <div class="content-right" >
        <div class="pay" :class="payClass" @click.stop.prevent="pay">
          {{payDesc}}
        </div>
      </div>
    </div>
    <div class="ball-container">
      <!--小球的容器-->
      <div transition="drop" class="ball" v-for="ball in balls" v-show="ball.show">
        <div class="inner inner-hook"></div>
      </div>
    </div>
    <div class="shopcart-list" v-show="listShow" transition="fold">
      <div class="list-header">
        <h1 class="title">购物车</h1>
        <span class="empty" @click="empty">清空</span>
      </div>
      <div class="list-content list-content-hook" v-el:list-content>
        <ul>
          <li class="food" v-for="food in selectFoods">
            <div class="name">{{food.name}}</div>
            <div class="cartcontrol-wrapper">
              <cartcontrol :food="food"></cartcontrol>
            </div>
            <div class="price">
                <span>
                  ￥{{food.price * food.count}}
                </span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <div class="list-mask" @click="hideList" v-show="listShow" transition="fade"></div>
</template>
<script type="text/ecmascript-6">
  import cartcontrol from '../cartcontrol/cartcontrol';
  import BScorll from 'better-scroll';
  export default {
    components: {
      cartcontrol
    },
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
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          }
        ],
        // 已经下落的小球
        dropBalls: [],
//        判断购物篮是否展开
        fold: true
      };
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
      },
      listShow() {
        console.log(1);
//        等于0时候
        if (!this.totalCount) {
          this.fold = true;
          return false;
        }
        let show = !this.fold;
        if (show) {
          this.$nextTick(() => {
            if (!this.scroll) {
              this.scroll = new BScorll(this.$els.listContent, {
                click: true
              });
            } else {
              this.scroll.refresh();
            }
          });
        }
        return show;
      }
    },
    methods: {
      drop(el) {
        for (let i = 0; i < this.balls.length; i++) {
          let ball = this.balls[i];
          if (!ball.show) {
            ball.show = true;
            ball.el = el;
            this.dropBalls.push(ball);
            return;
          }
        }
      },
      pay() {
        if (this.totalPrice < this.minPrice) {
           return;
        } else {
          window.alert(`支付${this.totalPrice}`);
        }
      },
      hideList() {
        this.fold = true;
      },
      empty() {
        this.selectFoods.forEach((food) => {
          food.count = 0;
        });
      },
      toggleList() {
//        当购物车数量为0时  世界什么都没发生
        if (!this.totalCount) {
          return;
        }
        this.fold = !this.fold;
      }
    },
//    对drop动画进行设置
    transitions: {
      drop: {
        beforeEnter(el) {
          let count = this.balls.length;
          while (count--) {
            let ball = this.balls[count];
            if (ball.show) {
//              获取元素相对于视口的位置
              // recat包含 left,top
              let rect = ball.el.getBoundingClientRect();
              let x = rect.left - 32;
              let y = -(window.innerHeight - rect.top - 22);
              console.log(x, y);
              console.log(el);
              el.style.display = '';
//              设置3d
              el.style.webkitTransform = `translate3d(0,${y}px,0)`;
              el.style.transform = `translate3d(0,${y}px,0)`;
              let inner = el.getElementsByClassName('inner-hook')[0];
//             内层设置横向的位移
              inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
              inner.style.transform = `translate3d(${x}px,0,0)`;
            }
          }
        },
        enter(el) {
          /* eslint-disabled no-unused-vars */
//          触发重绘
          let rf = el.offsetHeight;
          this.$nextTick(() => {
            el.style.webkitTransform = 'translate3d(0,0,0)';
            el.style.transform = 'translate3d(0,0,0)';
            let inner = el.getElementsByClassName('inner-hook')[0];
//              内层设置横向的位移
            inner.style.webkitTransform = 'translate3d(0,0,0)';
            inner.style.transform = 'translate3d(0,0,0)';
          });
        },
        afterEnter(el) {
          let ball = this.dropBalls.shift();
          if (ball) {
            ball.show = false;
            el.style.display = 'none';
          }
        }
      }
    }
  };
</script>
<style lang='stylus' rel='stylesheet/stylus' type="text/stylus">
  @import "../../common/stylus/mxin.styl";
  .shopcart
    position: fixed
    left: 0
    bottom: 0
    z-index: 200
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
      // 相对于视口 动画固定，用fixed固定布局
        position: fixed
        left 32px
        bottom: 22px
        z-index 40
        &.drop-transition
          transition: all 0.5s cubic-bezier(.5, -0.29, .75, .41)
          .inner
            width 16px
            height 16px
            border-radius 50%
            background-color rgb(0, 160, 220)
            transition: all 0.5s
    .shopcart-list
      position: absolute
      top: 0
      z-index -1
      width 100%
      &.fold-transition
        transition: all .5s
        // 不定高，让自身内容撑开
        transform translate3d(0,-100%,0)
      &.fold-enter,&.fold-leave
        transform translate3d(0,0,0)
      .list-header
        height: 40px
        line-height 40px
        padding:0 18px
        background: #f3f5f7
        border-bottom:1px solid rgba(7,17,27,0.1)
        .title
          float:left
          font-size 14px
          color: rgb(7,17,27)
        .empty
          float:right
          font-size 12px
          color: rgb(0,160,220)
          // 内容区域，超过这个高度隐藏超出部分内容
      .list-content
        padding:0 18px
        max-height: 217px
        overflow hidden
        background: #fff
        .food
          position: relative
          padding 12px 0px
          box-sizing border-box
          border-1px(rgba( 7,17,27,0.1))
          .name
            line-height 24px
            font-size 14px
            color: rgb(7,17,27)
          .price
            position absolute
            right: 90px
            bottom: 12px
            line-height 24px
            font-size 14px
            font-weight 700
            color: rgb(240,20,20)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 6px
  .list-mask
    position absolute
    left: 0
    top: 0
    height: 100%
    width 100%
    z-index 5
    backdrop-filter: blur(10px)
    &.fade-transition
      opacity:1
      background rgba(7,17,27,0.6)
    &.fade-enter,&.fade-leave
      opactiy:0
      background: rgba(7,17,27,0)
</style>
