;(function (factory) {
    'use strict';

    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof exports !== 'undefined') {
        module.exports = factory(require('jquery'));
    } else {
        factory(jQuery);
    }
})

(function ($) {
    'use strict';

    class LemGmaps {

        constructor(element, options) {

            let self = this;
            
            self.settings = $.extend({
               
            }, options);

            let $element = $(element);
            
        }
    }


    $.fn.lemGmaps = function() {
        let $this = this,
            opt = arguments[0],
            args = Array.prototype.slice.call(arguments, 1),
            length = $this.length,
            i,
            ret;
        for (i = 0; i < length; i++) {
            if (typeof opt == 'object' || typeof opt == 'undefined')
                $this[i].lem_gmaps = new LemGmaps($this[i], opt);
            else
                ret = $this[i].lem_gmaps[opt].apply($this[i].lem_gmaps, args);
            if (typeof ret != 'undefined') return ret;
        }
        return $this;
    };


});