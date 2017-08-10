import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';// 引入vue-resource
import App from './App';
// goods组件
import Goods from './components/goods/goods';
import Seller from './components/seller/seller';
import Ratings from './components/ratings/ratings';
// 全局引用样式
import './common/stylus/index.styl';
/**
 * 入口js  上方引入的是父组件和一个依赖组件
 */
/* eslint-disable no-new */

Vue.use(VueRouter);  // 使用路由插件
Vue.use(VueResource); // 使用vue-resource插件

/* eslint-disable no-unused-vars */
// 需要一个根组件
let app = Vue.extend(App);
// 实例一个路由,可以拉入自己的配置项
let router = new VueRouter({
  linkActiveClass: 'active'
});

// 配置路由
router.map({
  '/goods': {
    component: Goods
  },
  '/seller': {
    component: Seller
  },
  '/ratings': {
    component: Ratings
  }
});
// 启动路由，配置一个挂载点
router.start(app, '#app');

// 进入页面默认载入板块
router.go('/goods');

var app = {
// Application Constructor
initialize: function() {
this.bindEvents();
},
// Bind Event Listeners
//
// Bind any events that are required on startup. Common events are:
// 'load', 'deviceready', 'offline', and 'online'.
bindEvents: function(){
document.addEventListener('deviceready', this.onDeviceReady, false);
},
// deviceready Event Handler
//
// The scope of 'this' is the event. In order to call the 'receivedEvent'
// function, we must explicitly call 'app.receivedEvent(...);'
onDeviceReady: function() {
app.receivedEvent('deviceready');
},
// Update DOM on a Received Event
receivedEvent: function(id) {
var parentElement = document.getElementById(id);
var listeningElement = parentElement.querySelector('.listening');
var receivedElement = parentElement.querySelector('.received');
listeningElement.setAttribute('style', 'display:none;');
receivedElement.setAttribute('style', 'display:block;');
console.log('Received Event: ' + id);
}
};
app.initialize();
/* eslint-disable  */
onDeviceReady: function () {
appRouter.start(App, 'app')
window.navigator.splashscreen.hide()
};