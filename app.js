//app.js
const Towxml = require('/towxml/main');
App({
  onLaunch: function () {
    
  },
  globalData: {
    userInfo: null
  },
  towxml: new Towxml(),
  baseUrl:'https://swoole.2num.com',
  publishcomments: '/api/blog/comment_post', //发布评论
  getcomments: '/api/blog/comments', //获取评论
  gettoken: '/api/blog/getUserInfo',
})