/**
 * onavojs v0.1 
 * p_jiewwang p_dainli p_miyagong
 * { JavaScript 工具库 }
 * @Organizations https://github.com/3JTeam
 * $$代表onavojs库/Object的对象
 */

var $$, $$T, $$TB;

//; 防止多个文件压缩合并的语法错误
;
//匿名的函数，为undefined是window的属性，声明为局部变量之后，在函数中如果再有变量与undefined做比较的话，程序就可以不用搜索undefined到window，可以提高程序的性能。
(function(undefined) {
	//代码开始
	var O, T, TB;

	O = function(id) {
		return "string" == typeof id ? document.getElementById(id) : id;
	};

	// 工具S
	T = {
		//jsload 
		jsload: function(name, callback) {
			var newJs = document.createElement('script');
			// ie
			newJs.onreadystatechange = function() {
					if (newJs.readyState === 'loaded' || newJs.readyState === 'complete') {
						newJs.onreadystatechange = null;
						callback && callback();
					}
				}
				// 正常
			newJs.onload = function() {
				callback && callback();
			}
			newJs.src = name;
			// document.documentElement 特指 head
			document.documentElement.firstChild.appendChild(newJs);
		},
		//jsload 
		//cssload
		cssload: function(url, callback) {
				if (!url) {
					showError('cssload=>异步加载的url地址不正确');
				}
				if (document.createStyleSheet) {
					document.createStyleSheet(url);
					callback && callback();
				} else {
					var link = document.createElement('link');
					link.rel = 'stylesheet';
					link.type = 'text/css';
					link.href = url;
					callback && callback();
					document.documentElement.firstChild.appendChild(link);

				}
			}
			//cssload
	};
	//$$TB专门用于 浏览器检测S
	TB = (function(ua) {
		var B = {
			mobile: (/iphone|nokia|sony|ericsson|mot|samsung|sgh|lg|philips|panasonic|alcatel|lenovo|cldc|midp|wap|android|iPod/i.test(ua)), //是否为移动终端
			ios: !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
			android: ua.match(/android/i) == "android", //android终端或者uc浏览器
			iPhone: ua.match(/iphone os/i) == "iphone os", //是否为iPhone或者QQHD浏览器
			iPad: ua.match(/ipad/i) == "ipad", //是否iPad
			webApp: ua.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
			chrome: /chrome/.test(ua),
			firefox: /firefox/.test(ua),
			safari: /webkit/.test(ua) && !/chrome/.test(ua),
			opera: /opera/.test(ua)
		};
		//IE11的userAgent里是没有MSIE标志，加上IE版本差别多，所以单独$$TB.IE()方法
		var IE = function() {
			var sys = {};
			var s;
			(s = ua.match(/rv:([\d.]+)\) like gecko/)) ? sys.ie = s[1]:
				(s = ua.match(/msie ([\d.]+)/)) ? sys.ie = s[1] : 0;
			var _version = parseInt(sys.ie, 10);
			if (sys.ie) {
				return {
					is: true,
					version: _version
				}
			};
			return false;
		};
		var weixin = function() {
			if (ua.match(/MicroMessenger/i) == "micromessenger") {
				return true;
			} else {
				return false;
			};
		};
		return {
			B: B,
			IE: IE,
			weixin: weixin
		}
	})(window.navigator.userAgent.toLowerCase());
	// http://blog.csdn.net/zsj523/article/details/16802131
	// 移掉ie6图像闪烁
	if (TB.IE().version == 6) {
		try {
			document.execCommand("BackgroundImageCache", false, true);
		} catch (e) {}
	};
	//浏览器检测E
	// 工具E
	//代码结束

	/*定义*/
	$$ = O;
	$$T = T;
	$$TB = TB;

})();