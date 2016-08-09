/**
 * onavojs v0.14 
 * @ 开发 p_jiewwang p_dainli p_miyagong
 * { JavaScript 工具库 }
 * github@ https://github.com/jiayi2/onavo
 * email:email@ahthw.com
 * @Organizations https://github.com/3JTeam
 * $$代表onavojs库/Object的对象
 */

var $$, $$T, $$TB, $$A, $$S;

//; 防止多个文件压缩合并的语法错误
;
//匿名的函数，为undefined是window的属性，声明为局部变量之后，在函数中如果再有变量与undefined做比较的话，程序就可以不用搜索undefined到window，可以提高程序的性能。
(function(undefined) {
	//代码开始
	var O, T, TB, A, S;

	O = function(id) {
		return "string" == typeof id ? document.getElementById(id) : id;
	};

	/* tools s */
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
	if (TB.IE().version == 6) {
		try {
			document.execCommand("BackgroundImageCache", false, true);
		} catch (e) {}
	};
	// 移掉ie6图像闪烁
	//浏览器检测E
	/* tools e */
	/*数组方法 s */
	//除了es5 forEach, map, filter, every, some, indexOf, lastIndexOf 新增的方法外
	//isArray unique random 都是自己实现的
	A = function() {
		var ret = {
			isArray: function(obj) {
				return Object.prototype.toString.call(obj) === "[object Array]";
			},
			//数组去重
			unique: function(target) {
				var temp = [];
				_that: for (var i = 0, len = target.length; i < len; i++) {
					for (var j = i + 1; j < len; j++) {
						if (target[i] === target[j]) {
							continue _that;
						}
					}
					temp.push(target[i])
				}
				return temp;
			},
			//在数组中随机取一个
			random: function(target) {
				return target[Math.floor(Math.random() * target.length)];
			},
			//打乱数组返回新数组
			shuffle: function(target) {
				var temp = target,
					j,
					x,
					i = target.length;
				for (; i > 0; j = parseInt(Math.random() * i), x = target[--i], target[i] = target[j], target[j] = x) {

				}
				return temp;
				//target.sort(function(){return 0.5 - Math.random()});
			},
			//是否包含指定元素
			contains: function(target, item) {
				return target.indexOf(item) > -1;
			},
			//在参数1中删除参数2指定位的元素返回布尔
			removeAt: function(target, index) {
				return !!target.splice(index, 1).length;
			},
			//在参数1中删除参数2返回布尔
			remove: function(target, item) {
				var index = target.indexOf(item);
				return index > -1 ? this.removeAt(target, index) : false;
			},
			//去除数组中的undefined和Null
			compact: function(target) {
				if (!type.isArray(target)) {
					throw new Error('target error type');
				}
				return target.filter(function(item) {
					return item != undefined;
				})
			},
			//获取数组对象中的属性值，组合成新数组
			pluck: function(target, name) {
				var result = [],
					temp;
				target.forEach(function(item) {
					temp = item[name];
					if (temp != null) {
						result.push(temp);
					}
				});
				return result;
			},
			//2个数组的并集
			union: function(t1, t2) {
				return this.unique(t1.concat(t2));
			},
			// 取2个数组的交集
			intersect: function(t1, t2) {
				return t1.filter(function(item) {
					return ~t2.indexOf(item);
				});
			},
			//取差集
			diff: function(t1, t2) {
				var r = t1;
				for (var i = 0; i < t1.length; i++) {
					for (var j = 0; j < t2.length; j++) {
						if (r[i] === t2[j]) {
							r.splice(i, 1);
							i--;
							break;
						}
					}
				}
				return r;
			},
			// 
			max: function(target) {
				return Array.max.apply(0, target);
			},
			//min
			min: function(target) {
				return Array.min.apply(0, target);
			},
			//以下es5新增
			indexOf: function(array, elt, from) {
				if (array.indexOf) {
					return isNaN(from) ? array.indexOf(elt) : array.indexOf(elt, from);
				} else {
					var len = array.length;
					from = isNaN(from) ? 0 : from < 0 ? Math.ceil(from) + len : Math.floor(from);

					for (; from < len; from++) {
						if (array[from] === elt) return from;
					}
					return -1;
				}
			},
			lastIndexOf: function(array, elt, from) {
				if (array.lastIndexOf) {
					return isNaN(from) ? array.lastIndexOf(elt) : array.lastIndexOf(elt, from);
				} else {
					var len = array.length;
					from = isNaN(from) || from >= len - 1 ? len - 1 : from < 0 ? Math.ceil(from) + len : Math.floor(from);

					for (; from > -1; from--) {
						if (array[from] === elt) return from;
					}
					return -1;
				}
			}
		};

		function each(object, callback) {
			if (undefined === object.length) {
				for (var name in object) {
					if (false === callback(object[name], name, object)) break;
				}
			} else {
				for (var i = 0, len = object.length; i < len; i++) {
					if (i in object) {
						if (false === callback(object[i], i, object)) break;
					}
				}
			}
		};

		each({
			forEach: function(object, callback, thisp) {
				each(object, function() {
					callback.apply(thisp, arguments);
				});
			},
			map: function(object, callback, thisp) {
				var ret = [];
				each(object, function() {
					ret.push(callback.apply(thisp, arguments));
				});
				return ret;
			},
			filter: function(object, callback, thisp) {
				var ret = [];
				each(object, function(item) {
					callback.apply(thisp, arguments) && ret.push(item);
				});
				return ret;
			},
			every: function(object, callback, thisp) {
				var ret = true;
				each(object, function() {
					if (!callback.apply(thisp, arguments)) {
						ret = false;
						return false;
					};
				});
				return ret;
			},
			some: function(object, callback, thisp) {
				var ret = false;
				each(object, function() {
					if (callback.apply(thisp, arguments)) {
						ret = true;
						return false;
					};
				});
				return ret;
			}
		}, function(method, name) {
			ret[name] = function(object, callback, thisp) {
				if (object[name]) {
					return object[name](callback, thisp);
				} else {
					return method(object, callback, thisp);
				}
			}
		});

		return ret;

	}();
	/* 数组方法 e */
	/* 字符串s */
	S = {
		// 去空格
		trim: function(str) {
			str = str.replace(/^\s+/, '');
			for (var i = str.length - 1; i >= 0; i--) {
				if (/\S/.test(str.charAt(i))) {
					str = str.slice(0, i + 1);
					break;
				}
			}
			return str;
		},
		// 模仿C语言print方法
		print: function(str, object) {
			var arr = [].slice.call(arguments, 1),
				index;
			return str.replace(/#{([^{}]+)}/gm, function(match, name) {
				index = Number(name);
				if (index >= 0) {
					return arr[index];
				}
				if (object && object[name] !== '') {
					return object[name];
				}
				return '';
			})
		},
		//补零
		fillZero: function(target, n) {
			var z = new Array(n).join('0'),
				str = z + target,
				result = str.slice(-n);
			return result;
			//return (Math.pow(10,n) + '' + target).slice(-n);
		},
		// 去掉script内部的html标签
		stripTags: function(target) {
			if (type.getType(target) === 'String') {
				return target.replace(/<script[^>]*>(\S\s*?)<\/script>/img, '').replace(/<[^>]+>/g, '');
			}
		},
		//首字母大写
		capitalize: function(target) {
			return target.charAt(0).toUpperCase() + target.slice(1).toLowerCase();
		},
		//驼峰转化（备用） 如margin-top转化为marginTop
		// camelize: function(s) {
		// 	return s.replace(/-([a-z])/ig, function(all, letter) {
		// 		return letter.toUpperCase();
		// 	});
		// },
		//_ - 转驼峰命名
		camelize: function(target) {
			if (target.indexOf('-') < 0 && target.indexOf('_') < 0) {
				return target;
			}
			return target.replace(/[-_][^-_]/g, function(match) {
				//console.log(match) 匹配测试
				return match.charAt(1).toUpperCase();
			})
		},
		// 把驼峰转换成_
		underscored: function(target) {
			return target.replace(/([a-z0-9])([A-Z])/g, '$1_$2').toLowerCase();
		},
		//把字符串中的_转成-
		dasherize: function(target) {
			return this.underscored(target).replace(/_/g, '-');
		},
		//字符串截断方法 目标 长度默认30，截断后符号默认...
		truncate: function(target, len, truncation) {
			len = len || 30;
			truncation = truncation ? truncation : '...';
			return (target.length > len) ? target.slice(0, (len - truncation.length)) + truncation : target.toString();
		},
		//获得字符串字节长度 参数2 utf-8 utf8 utf-16 utf16
		byteLen: function(str, charset) {
			var target = 0,
				charCode,
				i,
				len;
			charset = charset ? charset.toLowerCase() : '';
			if (charset === 'utf-16' || charset === 'utf16') {
				for (i = 0, len = str.length; i < len; i++) {
					charCode = str.charCodeAt(i);
					if (charCode <= 0xffff) {
						target += 2;
					} else {
						target += 4;
					}
				}
			} else {
				for (i = 0, len = str.length; i < len; i++) {
					charCode = str.charCodeAt(i);
					if (charCode <= 0x007f) {
						target += 1;
					} else if (charCode <= 0x07ff) {
						target += 2;
					} else if (charCode <= 0xffff) {
						target += 3;
					} else {
						target += 4;
					}
				}
			}
			return target;
		},
		//重复item,times次
		repeat: function(item, times) {
			var s = item,
				target = '';
			while (times > 0) {
				if (times % 2 == 1) {
					target += s;
				}
				if (times == 1) {
					break;
				}
				s += s;
				times = times >> 1;
			}
			return target;
			//retrun new Array(times).join(item)
		},
		//参2是参1的结尾么？参数3忽略大小写
		endsWith: function(target, item, ignorecase) {
			var str = target.slice(-(item.length));
			return ignorecase ? str.toLowerCase() === item.toLowerCase() : str === item;
		},
		//参数2是参数1的开头么？参数3忽略大小写
		startsWith: function(target, item, ignorecase) {
			var str = target.slice(0, item.length);
			return ignorecase ? str.toLowerCase() === item.toLowerCase() : str === item;
		},
		// 类名中，参数1 是否包含参数2，类名中的分隔符
		containsClass: function(target, item, separator) {
			return separator ? (separator + target + separator).indexOf(separator + item + separator) > -1 : this.contains(target, item);
		},
		//判定一个字符串是否包含另一个字符串
		contains: function(target, item) {
			return target.indexOf(item) != -1;
			//return target.indexOf(item) > -1;
		}
	};
	/* 字符串e */
	//代码结束

	/*定义*/
	$$ = O;
	$$T = T;
	$$TB = TB;
	$$A = A;
	$$S = S;

})();