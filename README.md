# React重构 书架应用
> 提供个人书架，支持图书及时选择分类，；提供搜索书库，通过更改图书状态，可添加至个人书架。

## 项目特征
- 个人书架分为“已读”、“未读”、“想读”三块。每本书对应一个下拉框，选择不同的状态会将书移至对应书架，选择'none'会从展示的书架中移除该本书。
- 搜索页提供书库搜索的入口，搜索过程及时匹配，响应结果。对搜索结果中的书，若为个人书架中存在，则对应其状态。否则状态为'none'。

## 完成步骤
1. 模块划分：
    个人书架：Listbooks.js
      书列表：book.js
      搜索页：SearchBook.js
    将静态html内容对应到各组件。
2. 引入路由 react-router-dom 区分地址
3. 数据初始化，设置state，为实时render准备
4. 接受传入的参数，以此筛选数据。

## 需要注意的地方
- 了解react工作机制，主页面对数据、方法具有主导权，每次state更新都会引发重新render（实时更新）
- 记得对数据进行容错处理，同一个属性可能存在没有值，数据类型不同情况。需要作出相应的处理情况。
- 移动图书的本质是book.shelf属性的变化。数据改变后重绘即可

## 目前可改进的地方
- 搜索的处理是监听每次输入变化，然后就发起以此请求。可以添加一个 节流函数 ，避免阻塞。
- 可以加入serviceWorker 缩短资源加载事件。
