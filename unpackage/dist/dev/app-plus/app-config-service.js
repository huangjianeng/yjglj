
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/home/index","pages/event/details","pages/event/publishUrgent","pages/event/publishNormal","pages/event/myPublish","pages/my/message","pages/login/index","pages/index/index"],"window":{"navigationBarTextStyle":"black","navigationBarTitleText":"uni-app","navigationBarBackgroundColor":"#F8F8F8","backgroundColor":"#F8F8F8"},"nvueCompiler":"uni-app","nvueStyleCompiler":"uni-app","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"雨洪应急","compilerVersion":"3.4.15","entryPagePath":"pages/home/index","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/home/index","meta":{"isQuit":true},"window":{"navigationBarTitleText":"开福区雨洪监测预警指挥决策系统","enablePullDownRefresh":true}},{"path":"/pages/event/details","meta":{},"window":{"navigationBarTitleText":"事件详情"}},{"path":"/pages/event/publishUrgent","meta":{},"window":{"navigationBarTitleText":"事件发布"}},{"path":"/pages/event/publishNormal","meta":{},"window":{"navigationBarTitleText":"事件发布"}},{"path":"/pages/event/myPublish","meta":{},"window":{"navigationBarTitleText":"我发布的事件","enablePullDownRefresh":true}},{"path":"/pages/my/message","meta":{},"window":{"navigationBarTitleText":"消息中心","enablePullDownRefresh":true}},{"path":"/pages/login/index","meta":{},"window":{"navigationBarTitleText":"登录"}},{"path":"/pages/index/index","meta":{},"window":{"navigationBarTitleText":"uni-app"}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
