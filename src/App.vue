<!--模板-->
<template>
  <div>
    <v-header :seller="seller"></v-header>
    <div class="tab">
      <div class="tab-item">
        <!--vue1.0路由引用-->
        <a v-link="{path:'/goods'}">商品</a>
      </div>
      <div class="tab-item">
        <a v-link="{path:'/ratings'}">评论</a>
      </div>
      <div class="tab-item">
        <a v-link="{path:'/seller'}">商家</a>
      </div>
    </div>
    <!--路由的外链 点击了路由触发，页面变化的内容部分-->
    <router-view :seller="seller"></router-view>
  </div>
</template>
<!--js脚本-->
<script type="text/ecmascript-6">
  import header from './components/Header/header';
  const ERR_OK = 0; // 有语义的建议定义常量，之后可以统一进行修改
  export default{
    data () {
      return {
        seller: {}
      };
    },
    created() {
      this.$http.get('/api/seller').then((response) => {
//          判断类型，强制转换为对象形式赋值给变量
        if ('Content-Type' in response.headers && response.headers['Content-Type'] === 'application/json') {
          if (typeof response.body !== 'object') {
            response.body = JSON.parse(response.body);
          }
        }
        if ('content-type' in response.headers && response.headers['content-type'] === 'application/json') {
          if (typeof response.body !== 'object') {
            response.body = JSON.parse(response.body);
          }
        }
//          将数据内容体拿到，传入响应变量 response
        response = response.body;
        if (response.errno === ERR_OK) {
          this.seller = response.data;
          console.log(typeof this.seller);
        }
      });
    },
    components: {
      // 注册header
      'v-header': header
    }
  };
</script>
<!--样式-->
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
  // 混合宏样式引入
  @import "./common/stylus/mxin.styl"
  .header
    overflow hidden
  .tab
    display: flex
    width: 100%
    height: 40px
    line-height: 40px
    border-1px(rgba(7, 17, 27, 0.1))
    .tab-item
      flex: 1
      text-align: center
      & > a
        display: block
        text-decoration: none
        font-size: 14px
        color: rgb(77, 85, 95)
        &.active
          color: rgb(240, 20, 20)
</style>
