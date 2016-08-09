## onavo.js
###JavaScript 工具库
支持IE6以上，Firefox 3.5.3，Chrome 3.0，Safari 4.0.3，Opera 10.10以上的浏览器

##change.log
- --2016年8月9日
-- 新增**DOM**的7个方法
```
$$D.getScrollTop(node) {DOM} 视窗滚动的scrollTop
$$D.getScrollLeft(node) {DOM} 视窗滚动的scrollLeft
$$D.compareDocument(a, b){DOM, DOM} 节点包含：b节点包含a
$$D.getRect(node) {DOM} 获取元素的窗口坐标
$$D.getClientRect(node) {DOM} 获取当前元素相对浏览器窗口坐标
$$D.curStyle(elem, name) {DOM, String} 获取元素样式对象 （CSSStyleDeclaration）
$$D.setStyle(elems, style, value) {DOM, String, String}设置对象元素样式
```
-- 新增**字符串**处理 $$S 15个常用方法
```
$$S.byteLen(str, charset) {String, String} 获得字符串字节长度,参数2 utf-8/utf8/utf-16/utf16
$$S.camelize(target) {String} 驼峰转化 如margin-top转化为marginTop
$$S.capitalize(target) {String} 首字母大写 
$$S.contains(target, item) {String, String} 一个字符串是否包含另一个字符串
$$S.containsClass(target, item, separator)  {String, String, String}// 类名中，参数1 是否包含参数2，类名中的分隔符
$$S.dasherize(target) {String} 把字符串中的_转成-
$$S.endsWith(target, item, ignorecase) {String, String, Boolean}参2是以参1的结尾么,参数3忽略大小写
$$S.startsWith(arget, item, ignorecase) {String, String, Boolean} 参2是以参1的开始么
$$S.fillZero(target, n) {String, Number} 向前补0
$$S.print(str, object) {String, Object}模仿C语言print方法
$$S.repeat(item, times) {String, Number} 字符串重复
$$S.stripTags(target) {String} 去掉字符串内的THML标签
$$S.trim(str) {String} 去掉空格
$$S.truncate(target, len, truncation) {String, Number, String}字符串截断,默认length30，截断后符号默认'...'
$$S.underscored(target) {String} 把驼峰转换成_
```


- --2016年8月8日
-- 新增**工具**浏览器检 $$TB.B , $$TB.IE()全版本测方法
```
$$TB.B,
$$TB.IE(),
$$TB.weixin()
```
--新增**数组**除了es5 forEach, map, filter, every, some, indexOf, lastIndexOf外的14个常用数组方法
``` 
$$A
$$A.unique() ,
$$A.random() ,
$$A.shuffle(),
$$A.contains() ,
$$A.removeAt(), 
$$A.remove() ,
$$A.compact() ,
$$A.pluck() ,
$$A.union(), 
$$A.intersect() ,
$$A.diff(),
$$A.max() ,
$$A.min()
```

- --2016年8月7日
-- 初始项目
-- 新增$$T.jsload，$$T.cssload方法
```
$$T,
$$T.jsload,
$$T.cssload
```

##demo

- 传送：[链接](http://115.29.139.162:10086/onavo/index.html)
- README：[readme](http://115.29.139.162:10086/onavo/README.html)