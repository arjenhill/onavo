## onavo.js
###JavaScript 工具库
支持IE6以上，Firefox 3.5.3，Chrome 3.0，Safari 4.0.3，Opera 10.10以上的浏览器  
git>>: [链接](https://github.com/jiayi2/onavo)  
单元测试 jasmine>>: [链接](https://github.com/3JTeam/onavojs/tree/test)   

##change.log
- --2016年8月21日  
-- 新增**模块化**(_onavo.js)方法，可以require和import使用了。  
注意，例如[demo](http://115.29.139.162:10086/onavo/index2.html)  

```
$$.T.cssload('http://mat1.gtimg.com/www/base/base.css', function() {
       console.log('base.css ok')
    });
```
- --2016年8月10日  
-- 新增**工具**浏览器 $$TB.cookie  
```
$$TB.cookie.set(name, value, expires) {String,String,Number}
$$TB.cookie.read(name) {String}
$$TB.cookie.del(name) {String}
```
-- 新增DOM**CustomEvent**用户自定义 $$CE方法  
```
$$CE.addEvent(object, type, handler)
$$CE.removeEvent(object, type, handler)
$$CE.clearEvent(object)
$$CE.fireEvent(object, type)
```

-- 修复es5 Arrary.indexOf()应用错误（polyfill）[ie检测兼容]  
-- 进入单元工具测试（jasmine），修复$$A.shuffle(arr)，形参为空的错误。  
-- **修改**$$D.compareDocument() 为 $$D.contains() [ie检测兼容]  
-- **修改**$$.extends命名为$$.warpp [ie检测兼容]  
-- 新增**Event** $$E方法  
```
$$E.addEvent(element, type, handler)
$$E.removeEvent(element, type, handler)
$$E.fixEvent(event)
```
-- 新增**Function** $$F方法
```
$$F.bind(fun, thisp)
$$F.bindAsEventListener(fun, thisp)
```


- --2016年8月9日  
-- 新增**Ajax**扩展:$$jx[链接](http://115.29.139.162:10086/ceshi/jx/index.html)，支持json，xml，txt等get,post.[链接](http://115.29.139.162:10086/onavo/index.html)xhr请求。
--jx 可扩展 xml2array.js[链接](http://115.29.139.162:10086/ceshi/xmlArray/html.html)
```
$$jx.load('file',function(res){},'filetype','type');
//example:
$$jx.load('json.json', function(data) {
    console.log(data)
}, 'json', 'get');
```
-- 新增**原型方法**
```
$$.extend(destination, source, override) 扩展对象方法，这个用的很多
$$.deepextend(destination, source)  参考jQuery的extend
$$.warpp(me, parent) 参考的$extends，（跟prototype的Class.create也类似）
```
-- 新增**对象检测** 8个方法
```
$$.type
$$.type.getType(ele) {Object}
$$.type.isArray(ele) {Object}
$$.type.isBoolen(ele) {Object}
$$.type.isFunction(ele) {Object}
$$.type.isNull(ele) {Object}
$$.type.isObject(ele) {Object}
$$.type.isString(ele) {Object}
$$.type.isUndefined(ele) {Object}
```
-- 移除**DOM**$$D.getType()方法，新增至$$.type.getTyp()  
-- 新增**DOM**的12个方法  
```
$$D.getScrollTop(node) {DOM} 视窗滚动的scrollTop
$$D.getScrollLeft(node) {DOM} 视窗滚动的scrollLeft
$$D.contains(a, b){DOM, DOM} 节点包含：b节点包含a
$$D.getRect(node) {DOM} 获取元素的窗口坐标
$$D.getClientRect(node) {DOM} 获取当前元素相对浏览器窗口坐标
$$D.curStyle(elem, name) {DOM, String} 获取元素样式对象 （CSSStyleDeclaration）
$$D.setStyle(elems, style, value) {DOM, String, String}设置对象元素样式
$$D.getSize(elems) {DOM} 获得DOM对象的盒模型BOX宽高 
$$D.nextB(el) {DOM} 下一个兄弟元素
$$D.nextB(el) {DOM} 上一个兄弟元素
$$D.nextBs(el) {DOM} 本身后面的所有兄弟元素,不包括本身
$$D.prevBs(el) {DOM} 本身前面的所有兄弟元素,不包括本身
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
$$T.jsload(),
$$T.cssload()
```

##demo
- 传送：[链接](http://115.29.139.162:10086/onavo/index.html)
- README：[readme](http://115.29.139.162:10086/onavo/README.html)