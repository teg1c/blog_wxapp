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