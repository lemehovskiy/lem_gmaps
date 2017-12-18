/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LemGmaps = function () {
    function LemGmaps(element, options) {
        _classCallCheck(this, LemGmaps);

        var self = this;

        self.$element = $(element);

        //extend by function call
        self.settings = $.extend(true, {
            // lat_shift: 0,
            map_options: {
                center: { lat: 42.877742, lng: -97.380979 },
                zoom: 1,
                scrollwheel: false,
                maxZoom: 15,
                styles: []
            },
            marker_icon: {
                path: 'M10.9,0C4.9,0,0,4.9,0,10.9c0,7,9.8,24.7,10.9,24.7c1.2,0,10.9-17.5,10.9-24.7C21.8,4.9,16.9,0,10.9,0z M10.9,15.5c-2.5,0-4.6-2-4.6-4.6s2-4.6,4.6-4.6c2.5,0,4.6,2,4.6,4.6S13.4,15.5,10.9,15.5z',
                fillColor: '#882929',
                fillOpacity: 1,
                scale: 1.1,
                strokeWeight: 0,
                anchor: new google.maps.Point(20, 20)
            },
            markers: []
        }, options);

        //extend by data options
        self.data_options = self.$element.data('lem-gmap');
        self.settings = $.extend(true, self.settings, self.data_options);

        self.map;
        self.bounds;
        self.google_map_markers = [];

        self.init();
    }

    _createClass(LemGmaps, [{
        key: 'init',
        value: function init() {

            var self = this;

            self.map = new google.maps.Map(self.$element[0], self.settings.map_options);

            self.add_markers(self.settings.markers);
            self.marker_bounds(self.google_map_markers);
        }
    }, {
        key: 'marker_bounds',
        value: function marker_bounds(markers) {

            var self = this;

            var bounds = new google.maps.LatLngBounds();

            markers.forEach(function (markerObj) {
                bounds.extend(markerObj.marker.position);
            });

            // if (self.settings.lat_shift) {
            //     if (bounds.getNorthEast().equals(bounds.getSouthWest())) {
            //         var extendPoint = new google.maps.LatLng(bounds.getNorthEast().lat() + self.settings.lat_shift, bounds.getNorthEast().lng());
            //         bounds.extend(extendPoint);
            //     }
            // }

            self.map.fitBounds(bounds);
        }
    }, {
        key: 'add_markers',
        value: function add_markers(markers) {

            var self = this;

            markers.forEach(function (marker, i) {

                var marker_icon = self.settings.marker_icon;

                //extend individual marker options
                $.extend(true, marker_icon, marker.icon);

                var google_map_marker = new google.maps.Marker({
                    position: new google.maps.LatLng(marker.lat, marker.lng),
                    icon: marker_icon,
                    map: self.map
                });

                // save all markers in array
                self.google_map_markers.push({
                    marker: google_map_marker,
                    lat: marker.lat,
                    lng: marker.lng
                });
            });
        }
    }]);

    return LemGmaps;
}();

$.fn.lemGmaps = function () {
    var $this = this,
        opt = arguments[0],
        args = Array.prototype.slice.call(arguments, 1),
        length = $this.length,
        i = void 0,
        ret = void 0;
    for (i = 0; i < length; i++) {
        if ((typeof opt === 'undefined' ? 'undefined' : _typeof(opt)) == 'object' || typeof opt == 'undefined') $this[i].lem_gmaps = new LemGmaps($this[i], opt);else ret = $this[i].lem_gmaps[opt].apply($this[i].lem_gmaps, args);
        if (typeof ret != 'undefined') return ret;
    }
    return $this;
};

/***/ })
/******/ ]);