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
	//浏览器检测S
	TB = (function(ua) {
		var b = {
			msie: /msie/.test(ua) && !/opera/.test(ua),
			opera: /opera/.test(ua),
			safari: /webkit/.test(ua) && !/chrome/.test(ua),
			firefox: /firefox/.test(ua),
			chrome: /chrome/.test(ua)
		};
		var vMark = "";
		for (var i in b) {
			if (b[i]) {
				vMark = "safari" == i ? "version" : i;
				break;
			}
		}
		b.version = vMark && RegExp("(?:" + vMark + ")[\\/: ]([\\d.]+)").test(ua) ? RegExp.$1 : "0";

		b.ie = b.msie;
		b.ie6 = b.msie && parseInt(b.version, 10) == 6;
		b.ie7 = b.msie && parseInt(b.version, 10) == 7;
		b.ie8 = b.msie && parseInt(b.version, 10) == 8;
		b.ie9 = b.msie && parseInt(b.version, 10) == 9;
		b.ie10 = b.msie && parseInt(b.version, 10) == 10;
		return b;
		//IE11修改了 User-agent 字符串 使用时以> ie10 为准 
	})(window.navigator.userAgent.toLowerCase());
	// http://blog.csdn.net/zsj523/article/details/16802131
	// 移掉ie6图像闪烁
	if (TB.ie6) {
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