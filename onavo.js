/**
 * onavojs v0.1 
 * p_jiewwang p_dainli p_miyagong
 * { JavaScript 工具库 }
 * @Organizations https://github.com/3JTeam
 * $$代表onavojs库/Object的对象
 */

var $$;

//; 防止多个文件压缩合并的语法错误
;
//匿名的函数，为undefined是window的属性，声明为局部变量之后，在函数中如果再有变量与undefined做比较的话，程序就可以不用搜索undefined到window，可以提高程序的性能。
(function(undefined) {
	//代码开始
	var O;

	O = function(id) {
		return "string" == typeof id ? document.getElementById(id) : id;
	};

	//代码结束
	/*定义*/
	$$ = O;
})();