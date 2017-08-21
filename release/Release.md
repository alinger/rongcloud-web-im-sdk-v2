### 2017-08－16（2.2.7）

    优化:
        1、protobuf、bytebuffer、long 模块合并

        2、公有云私有云版本合并

        3、初始化 SDK navi 格式格式兼容性优化, 例如: [http(s)://]nav.cn.ronghub.com[/]

        4、支持强制设置连接方式

        5、移除废弃不用的emoji素材，swfobject

    修复:

        1、模块化暴露规则
        
        2、protobuf 可以传入本地路径
        
        3、protobuf、websdk 依赖倒置
        
        4、targetId 兼容数字
        
        5、抛出接口错误信息
        
        6、window 中移除 Modules
        
    新增:
        1、自动重链机制

### 2017-01-06（2.2.5）

    增加 ：

        1、RongIMClient.initApp 方法，此方法会自动连接融云

        2、获取聊天室历史消息方法

    修复：

        1、历史消息接口 count 为 1 ，第二次获取消息缺失的问题

        2、导航信息存储方式改为覆盖不删除，2.2.4 版本是删除再写入

        3、同一用户同一个浏览器多个 Tab 页面拉取消息不缺失的问题

        4、α 和 β 等特殊字符乱码
        
        5、PullMessage 逻辑（刷新页面会重新获取最近的消息）
        
        6、jionChatRoom （同一个人第二次加入说过话的聊天室获取到的消息条数与传入 count 不符）
        
        7、isPullSendBox （心跳拉取时间是否拉取发件箱修改为 false）


### 待修复 Bug

1、第一次拉取会话列表和第二次拉取会话列表个数不一致


### 记录

中国联通

    1、修复 MessageType bug ，上线 2.2.6 文档未更新

    2、删除会话本地和服务端同时删除

领创 (1.3.1)

    1、c++ getHistoryMessages 增加 objectname、direction