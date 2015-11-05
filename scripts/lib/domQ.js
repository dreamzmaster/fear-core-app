/*
DomQuery Module
List of functions to read browser and dom element properties cross browser consistently
*/
define(['packages/angular.package'], function (angular) {

    'use strict';

    var domQ;

    (function() {
        domQ = function(el) {
            return new DomQuery(el);
        };

        var DomQuery = function(el) {
            this.el = el;
            return this;
        };

        DomQuery.prototype = {
            offset: function() {
                var curleft = 0,
                    curtop = 0;

                if (this.el.offsetParent) {
                    do {
                        curleft += this.el.offsetLeft;
                        curtop += this.el.offsetTop;

                        this.el = this.el.offsetParent;
                    } while (this.el);
                }

                return {left: curleft, top: curtop};
            },
            width: function () {

                if (!window.addEventListener) {
                    return 0;
                }

                var elStyle = window.getComputedStyle(this.el),
                    width = elStyle.width === 'auto' ? this.el.offsetWidth : parseFloat(elStyle.width);

                if (this.browser.ie) {
                    width += (parseFloat(elStyle.paddingRight) + parseFloat(elStyle.paddingRight));
                }

                return width;
            },
            height: function() {

                if (!window.addEventListener) {
                    return 0;
                }

                var elStyle = window.getComputedStyle(this.el),
                    height = elStyle.height === 'auto' ? this.el.offsetHeight : parseFloat(elStyle.height, 10);

                if (this.browser.ie) {
                    height += (parseFloat(elStyle.paddingTop) + parseFloat(elStyle.paddingBottom));
                }

                return height;
            }

        };

        // set browser configurations
        (function(){
            var html = angular.element(document.querySelector('html')),
                isIE = function () {
                    return ((navigator.appName == 'Microsoft Internet Explorer')
                        || ((navigator.appName == 'Netscape')
                        && (new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})").exec(navigator.userAgent) != null)));
                };
            DomQuery.prototype.browser = {
                // set browser type
                ie: isIE()
                /*
                ie6: html.hasClass('ie6'),
                ie7: html.hasClass('ie7'),
                ie8: html.hasClass('ie8'),
                ie9: html.hasClass('ie9')
                */
            };
        })();

    }());

    return domQ;
});