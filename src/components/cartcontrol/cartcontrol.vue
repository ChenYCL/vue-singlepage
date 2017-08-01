<template>
  <div class="cartcontrol">
    <div class="cart-decrease icon-remove_circle_outline" v-show="food.count>0" @click="decreseCount($event)" transition="move">
      <!--内层滚动-->
      <span class="inner icon-remove_circle_outline"></span>
    </div>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click="addCart($event)"></div>
  </div>
</template>
<script type="text/ecmascript-6">
  // 观察全局变量的变化，需要引入Vue插件 ，调用接口
  import Vue from 'vue';

  export default {
//    接收一个商品
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      addCart(event) {
        if (!event._constructed) {
          return;
        }
        ;
        if (!this.food.count) {
          // set方法 类似java中 setter 和getter 用静态的方法取修改里面的数值  Vue.set(object, key, value)： 使用Vue.set全局观测到
          Vue.set(this.food, 'count', 1);
        } else {
          this.food.count++;
        }
        // 向上派发事件
        this.$dispatch('cart.add',event.target);
      },
      decreseCount(event) {
        if (!event._constructed) {
          return;
        }
        ;
        if (this.food.count > 0) {
          this.food.count--;
        }
      }
    }
  };
</script>
<style lang='stylus' rel='stylesheet/stylus' type="text/stylus">
  .cartcontrol
    font-size 0
    .cart-decrease
      display: inline-block
      padding: 6px
      // 设置动画
      transition: all 0.4s linear
      &.move-transition
        opacity: 1
        transform: translate3D(0,0,0)
        .inner
          display: inline-block
          font-size 24px
          color rgb(0, 160, 220)
          font-weight: 700
          line-height 24px
          transition: all 0.4s linear
          // 滚动触发设置
          transform: rotate(0)
      &.move-enter,&.move-leave
        opacity 0
        // 3d 设置坐标  x,y,z
        transform: translate3D(24px,0,0)
        .inner
          transform:rotate(180deg)
    .cart-count
      display: inline-block
      vertical-align top
      padding-top 6px
      line-height 24px
      text-align center
      font-size 10px
      color rgb(0, 160, 220)
    .cart-add
      display: inline-block
      padding: 6px
      font-size 24px
      color rgb(0, 160, 220)
      font-weight: 700
      line-height 24px
</style>
<!--这里定义的购物添加组件在 商品父组件中引入使用-->
