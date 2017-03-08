/**
 * @namespace
 * @name lang.browser
 * @requires lib.jQuery
 * @see http://api.jquery.com/jQuery.browser/
 */
onavo.define('lang.browser', 'lib.jQuery', function(require){
    var $ = require('lib.jQuery');
    
    return $.browser;
});