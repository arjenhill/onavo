/**
 * Date Enhancement
 * @namespace
 * @name lang.date
 */
onavo.define('lang.date', function() {
    //month & week's array
    var fullMonthName = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'Aguest', 'September', 'October', 'November', 'December'],
        fullWeekName = ['Sunday', 'Monday', 'Tuesday', 'Wendesday', 'Thursday', 'Friday', 'Saturday'],
        /**
         * 添前导0
         * @inner
         */
        fillZero = function(num) {
            return num < 10 ? '0' + num : num;
        },
        /**
         * 计算时间差距，毫秒
         * @inner
         */
        timeDist = function(date1, date2) {
            date2 = date2 || new Date(date1.getFullYear(), 0, 1);
            return date1 - date2;
        },
        // 若添加更多格式，开发只需在pri中加上即可
        pri = {
            // d: 月份中的第几天，有前导零的 2位数字，01 到 31
            d: function(d) {
                return fillZero(this.j(d));
            },
            // D：星期中的第几天，文本表示，3个字母，Mon 到 Sun
            D: function(d) {
                return this.l(d).substr(0, 3);
            },
            // j:月份中的第几天，没有前导零，1 到 31
            j: function(d) {
                return d.getDate();
            },
            // l: 星期几，完整的文本格式，Sunday 到 Saturday
            l: function(d) {
                return fullWeekName[d.getDay()];
            },
            // N：ISO-8601 格式数字表示的星期中的第几天，1（表示星期一）到 7（表示星期天）
            N: function(d) {
                return this.w(d) || 7;
            },
            // w：星期中的第几天，数字表示，0（表示星期天）到 6（表示星期六）
            w: function(d) {
                return d.getDay();
            },
            // z: 一年中的第几天，0 到 366
            z: function(d) {
                return Math.floor(timeDist(d) / 86400000);
            },
            // F：月份，完整的文本格式，例如 January 或者 March，January 到 December
            F: function(d) {
                return fullMonthName[d.getMonth()];
            },
            // m：数字表示的月份，有前导零， 01 到 12
            m: function(d) {
                return fillZero(this.n(d));
            },
            // n：数字表示的月份，没有前导零，1 到 12
            n: function(d) {
                return d.getMonth() + 1;
            },
            // M：三个字母缩写表示的月份，Jan 到 Dec
            M: function(d) {
                return this.F(d).substr(0, 3);
            },
            // Y：4 位数字表示的年份
            Y: function(d) {
                return d.getFullYear();
            },
            // y：2 位数字表示的年份
            y: function(d) {
                return this.Y(d).toString().slice(-2);
            },
            // a：显示am/pm
            a: function(d) {
                return d.getHours() < 12 ? 'am' : 'pm';
            },
            // A：显示AM/PM
            A: function(d) {
                return this.a(d).toUpperCase();
            },
            // g：小时，12 小时格式，没有前导零，1 到 12
            g: function(d) {
                return d.getHours() % 12 || 12;
            },
            // G：小时，24 小时格式，没有前导零，0 到 23
            G: function(d) {
                return d.getHours();
            },
            // h：小时，12 小时格式，有前导零，01 到 12
            h: function(d) {
                return fillZero(this.g(d));
            },
            // H：小时，24 小时格式，有前导零，00 到 23
            H: function(d) {
                return fillZero(this.G(d));
            },
            // i：有前导零的分钟数，00 到 59
            i: function(d) {
                return fillZero(d.getMinutes());
            },
            // s：秒数，有前导零，00 到 59
            s: function(d) {
                return fillZero(d.getSeconds());
            }
        };

    return {
        /** @lends lang.date */

        /**
         * 格式化日期为字符串
         * @param {String} expr 表达式
         * @param {Number|Date} [date=new Date()] 日期
         * @return {String} 字符串
         * @example
         * format参数如下（来源于PHP的date函数的参数子集）：
         *	日期：
         *		d：月份中的第几天，有前导零的 2位数字，01 到 31
         *		D：星期中的第几天，文本表示，3个字母，Mon 到 Sun
         *		j：月份中的第几天，没有前导零，1 到 31
         *		l: 星期几，完整的文本格式，Sunday 到 Saturday
         *		N：ISO-8601 格式数字表示的星期中的第几天，1（表示星期一）到 7（表示星期天）
         *		w：星期中的第几天，数字表示，0（表示星期天）到 6（表示星期六）
         *		z: 一年中的第几天，0 到 366
         *	月份：
         *		F：月份，完整的文本格式，例如 January 或者 March，January 到 December
         *		m：数字表示的月份，有前导零， 01 到 12
         *		n：数字表示的月份，没有前导零，1 到 12
         *		M：三个字母缩写表示的月份，Jan 到 Dec
         *	年份：
         *		Y：4 位数字表示的年份
         *		y：2 位数字表示的年份
         *	上下午标识：
         *		a：显示am/pm
         *		A：显示AM/PM
         *	小时：
         *		g：小时，12 小时格式，没有前导零，1 到 12
         *		G：小时，24 小时格式，没有前导零，0 到 23
         *		h：小时，12 小时格式，有前导零，01 到 12
         *		H：小时，24 小时格式，有前导零，00 到 23
         *	分钟：
         *		i：有前导零的分钟数，00 到 59
         *	秒数：
         *		s：秒数，有前导零，00 到 59
         * @example
         * date.format('Y-m-d H:i:s A l'); // output:2012-04-19 15:17:56 AM Thursday
         * date.format('Y年m月d日 H:i:s A l'); // output:2012年04月19日 15:18:38 AM Thursday
         * date.format('\\Y是Y'); // output:Y是2012
         */
        format: function(expr, date) {
            expr = expr || 'Y-m-d H:i:s';

            if (arguments.length == 1) {
                date = new Date();
            } else if (!(date instanceof Date)) {
                date = new Date(parseInt(date) || 0);
            }
            return expr.replace(/\\?([a-z])/gi, function(str, $1) {
                if (pri[str]) {
                    return pri[str].call(pri, date);
                } else {
                    return $1;
                }
            });
        }
    }
});
