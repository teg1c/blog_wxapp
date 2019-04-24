//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    blogData: {},
    dataSuccess: false,
    loading: true,
    requestUrl: null
  },
  onLoad: function () {
    wx.setNavigationBarTitle({
      title: '关于我'
    })
    this.about()
  },
  // 下拉刷新
  onPullDownRefresh: function () {
    // 显示顶部刷新图标
    wx.showNavigationBarLoading();
    this.about();
  },
  about:function(){
    const _ts = this;
    //请求markdown文件，并转换为内容
    wx.request({
      url: app.baseUrl + '/api/blog/about',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: (res) => {
        console.log(res.data)
        wx.stopPullDownRefresh();
        wx.hideNavigationBarLoading();
        //将markdown内容转换为towxml数据
        let data = app.towxml.toJson(
          res.data.data.body,               // `markdown`或`html`文本内容
          'markdown'              // `markdown`或`html`
        );

        //前台初始化小程序数据（2.1.2新增，如果小程序中无相对资源需要添加`base`根地址，也无`audio`内容可无需初始化）
        data = app.towxml.initData(data, {
          base: '',    // 需要解析的内容中相对路径的资源`base`地址
          app: _ts                     // 传入小程序页面的`this`对象，以用于音频播放器初始化
        });

        //设置文档显示主题，默认'light'
        data.theme = 'light';

        //设置数据
        _ts.setData({
          article: data
        });
        wx.hideLoading()
      }
    });
  }
})
