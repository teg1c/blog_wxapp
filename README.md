# 我的博客 - 小程序

## 接口

- 首页接口

    请求接口[GET]
     `https://URL/api/blog/ `
    
    返回参数
    
    ```json
    {
        "msg": "success",
        "data": {
            "current_page": 1,
            "data": [
                {
                    "id": 1,
                    "title": "根据用户 id 生成一个唯一邀请码",
                    "created_at": "2019-03-07"
                },
                {
                    "id": 2,
                    "title": "bitmap 统计网站活跃度",
                    "created_at": "2019-01-27"
                }
            ],
            "first_page_url": "https://URL/api/blog?page=1",
            "from": 1,
            "next_page_url": null,
            "path": "https://URL/api/blog",
            "per_page": 50,
            "prev_page_url": null,
            "to": 17
        },
        "code": 200
    }
    
    ```
    
- 详情接口

    请求接口[GET]
     `https://URL/api/blog/detail/{id} `
    
    返回参数
    
    ```json
    {
        "msg": "success",
        "data": {
            "id": 1,
            "title": "根据用户 id 生成一个唯一邀请码",
            "content": "需求描述：根据**用户id生成与之对应的唯一**邀请码，范围为'0-9A-Z'。",
            "created_at": "2019-03-07 17:20:37",
            "updated_at": "2019-03-07 17:20:37"
        },
        "code": 200
    }
    
    ```
- 分类接口

    请求接口[GET]
     `https://URL/api/blog/cate?id={id} #如果没有id则返回所有分类`
    
    返回参数
    
    ```json
    {
        "msg": "success",
        "data": {
            "id": 1,
            "name": "php",
            "article": [
                {
                    "id": 1,
                    "title": "根据用户 id 生成一个唯一邀请码",
                    "image": "images/e2c120f50a529bab3fb1eed937636a25.png",
                    "read": 92,
                    "created_at": "2019-03-07",
                    "pivot": {
                        "article_id": 1,
                        "category_id": 1
                    }
                }
            ]
        },
        "code": 200
    }
    
    ```
 - 评论列表

     请求接口[POST]

     参数:

     - id，文章id

      `https://URL/api/blog/comments`
     
     返回参数
     
     ```json
     {
         "msg": "success",
         "data": {
             "current_page": 1,
             "data": [
                 {
                     "id": 2,
                     "content": "还可以",
                     "user_id": 7,
                     "reply_id": 0,
                     "like_count": 0,
                     "time": "2019-05-06 14:32:37",
                     "reply": [
                         {
                             "id": 3,
                             "content": "还可以吧",
                             "reply_id": 2,
                             "user_id": 5,
                             "time": "2019-05-06 14:35:29"
                         },
                         {
                             "id": 4,
                             "content": "还可以吧对不对",
                             "reply_id": 2,
                             "user_id": 6,
                             "time": "2019-05-06 14:37:49"
                         },
                         {
                             "id": 5,
                             "content": "test",
                             "reply_id": 2,
                             "user_id": 1,
                             "time": "2019-05-06 14:38:14"
                         }
                     ]
                 },
                 {
                     "id": 1,
                     "content": "asdad",
                     "user_id": 0,
                     "reply_id": 0,
                     "like_count": 0,
                     "time": "2019-05-06 14:30:02",
                     "reply": []
                 }
             ],
             "first_page_url": "https://URL/api/blog/comments?page=1",
             "from": 1,
             "next_page_url": null,
             "path": "https://URL/api/blog/comments",
             "per_page": 15,
             "prev_page_url": null,
             "to": 2
         },
         "code": 200
     }
     
     ```

- 发布评论

    请求接口[POST] 

    参数:

    - article_id，文章id

    - reply_id ，回复评论楼层id

    - content ，评论内容
    
     `https://URL/api/blog/comment_post`
    
    返回参数
    
    ```json
    {
        "msg": "success",
        "data": {
            "article_id": "1",
            "reply_id": "2",
            "content": "test",
            "user_id": 1,
            "updated_at": "2019-05-06 14:38:14",
            "created_at": "2019-05-06 14:38:14",
            "id": 5
        },
        "code": 200
    }
    
    ```
         

- 关于我接口

    请求接口[GET]
     `https://URL/api/blog/about`
    
    返回参数
    
    ```json
    {
        "msg": "success",
        "data": {
            "body": "Hello 陌生人，欢迎访问 Tegic Blog"
        },
        "code": 200
    }
    
    ```
    
## 依赖
 > [HTML、Markdown转微信小程序WXML(WeiXin Markup Language)渲染库](https://github.com/sbfkcel/towxml)
 
 ```
 git clone https://github.com/sbfkcel/towxml.git
 ```
 放入 towxml 目录