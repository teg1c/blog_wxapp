//index.js
//获取应用实例
const app = getApp()
Page({
    data: {
        info: {},
        commenthidden: true, // 默认隐藏评论
        comment_font: '查看评论',
        // commenthidden: false, // 默认隐藏评论
        article_id: 1, // 文章的ID
        content: '', // 评论内容
        authorization: false ,// 默认用户未授权授权
        userInfo: null,
        token: null,
        comment: [],
    },
    onLoad: function (options) {
        const _ts = this;
        wx.getUserInfo({
            success(res){
                _ts.setData({
                    authorization: true,
                    userInfo: res.userInfo
                }),
                _ts.getopenid(res.userInfo.avatarUrl,res.userInfo.nickName)
            },
            fail(res){
                _ts.setData({
                    authorization: false 
                })
            }
        })

        let id = options.id;

        this.setData({
            article_id: id,
        })
        wx.showLoading({
            title: '加载中',
        })
        // 请求markdown文件，并转换为内容
        wx.request({
            url: app.baseUrl + '/api/blog/detail/' + id,
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            success: (res) => {
                if (res.data.code == 400) {
                    wx.hideLoading()
                    wx.showModal({
                        title: '提示',
                        content: res.data.msg,
                        success(res) {
                            wx.redirectTo(
                                {
                                    url: '../index/index'
                                }
                            )
                        }
                    })

                    return;
                }
                wx.setNavigationBarTitle({
                    title: res.data.data.title
                })
                _ts.setData({
                    info: res.data.data
                })
                //将markdown内容转换为towxml数据
                let data = app.towxml.toJson(
                    res.data.data.content,               // `markdown`或`html`文本内容
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
            },
            error: (res) => {
                wx.redirectTo(
                    {
                        url: '../index/index'
                    }
                )
            }
        });
    },
    onShareAppMessage: function (res) {
        return {
            title: this.data.info.title,
            path: '/pages/detail/detail?id=' + this.data.info.id,
            success: function (res) {
                // 转发成功
            },
            fail: function (res) {
                // 转发失败
            }
        }
    },

    commentsRecord:function(){ //获取聊天记录
        if(this.data.token){
            let _this = this;
            wx.request({
                url: app.baseUrl + app.getcomments,
                data: {
                    id : this.data.article_id,
                },
                method: 'POST',
                header: {
                    'content-type': 'application/json', 
                    'token': this.data.token
                },
                success(res) {
                    const _data = res.data;
                    console.log('成功',res);
                    if(_data.code == 200){
                        _this.setData({
                            comment: _data.data.data
                        })
                    }
                },
                fail(res){
                    console.log('失败',res)
                }
            })
        }
        
    },

    showJudge: function(){ //显示或者隐藏评论内容
        this.setData({
            commenthidden: !this.data.commenthidden,
            comment_font: this.data.comment_font === "查看评论" ? '收起评论' : "查看评论",
        })
    },
    release: function(){ // 发布评论
        let _this = this;
        if(!this.data.content){
            wx.showToast({
                title: '评论内容不能为空',
                icon: 'none',
                image: '',
                duration: 1500,
                mask: false,
                success: (result) => {
                    
                },
                fail: () => {},
                complete: () => {}
            });
             return; 
        }

        if(!this.data.token){
            wx.showToast({
                title: '请授权后再评论',
                icon: 'none',
                image: '',
                duration: 1500,
                mask: false,
                success: (result) => {
                    _this.setData({
                        authorization: false, 
                    })
                },
                fail: () => {},
                complete: () => {}
            });
            return; 
        }
        wx.request({
            url: app.baseUrl + app.publishcomments,
            data: {
                article_id : this.data.article_id,
                reply_id: 0,
                content: this.data.content
            },
            method: 'POST',
            header: {
                'content-type': 'application/json', // 默认值
                'token': _this.data.token
            },
            success(res) {
                console.log('评价成功',res)
            },
            fail(res){
                console.log('评价失败',res)
            }
        })
    },
    trimspace: function(e){ //输入框禁止输入空格
        this.setData({
            content: e.detail.value
            // content: e.detail.value.replace(/\s+/g, '')
        })
    },
    onGetUserInfo(e) { // 获取用户信息
        if(e.detail.userInfo){
            this.setData({
                commenthidden: false,
                authorization: true,
                userInfo: e.detail.userInfo,
            }),
            this.getopenid()
        }
    },
    getopenid(avatar,name){
        let _this = this;
        wx.login({
            success(res) {
              if (res.code) {
                // 发起网络请求
                let url = app.baseUrl + app.gettoken;
                wx.request({
                  url: url,
                  method: 'POST',
                  data: {
                      code: res.code,
                      nickname: name,
                      avatar_url: avatar,
                  },
                  success(ress){
                    _this.setData({
                        token: ress.data.data.token,
                    })
                    _this.commentsRecord();
                  },
                  fail(res){
                    console.log('token 失败',ress)
                  }
                })
              } else {
                console.log('登录失败！' + res.errMsg)
              }
            }
        })
    }
      
})
