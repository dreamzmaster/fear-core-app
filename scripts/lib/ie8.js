'use strict';

(function () {

    var isBrowserOldIE,
        refreshIcons,
        addLoadingClass,
        removeLoadingClass;

    /*
    Function: isBrowserOldIE
    Check if browser is less or equal to IE8

    Return: true if IE6, IE7 or IE8
    */
    isBrowserOldIE = function () {
        var browser = navigator.appName,
            version,
            pos;

        if (browser === 'Microsoft Internet Explorer') {
            // in the user-agent, get the MSIE prefix + first digit of version.
            // this is because we have many subversions for IE6, such as MSIE 6.0, MSIE 6.0b and MSIE 6.1.
            pos = navigator.appVersion.indexOf('MSIE');
            version = navigator.appVersion.substr(pos, 6);

            // check for IE6, IE7 or IE8
            if (version === 'MSIE 6' || version === 'MSIE 7' || version === 'MSIE 8') {
                return true;
            }
        }
        return false;
    };


    /*
    Function: addLoadingClass
    Add class 'loading-icons' on <html>
    */
    addLoadingClass = function (elem) {
        elem.className = elem.className += ' loading-icons';
    };


    /*
    Function: removeLoadingClass
    Remove class 'loading-icons' on <html>
    */
    removeLoadingClass = function (elem) {
        elem.className = elem.className.replace('loading-icons', '');
    };


    /*
    Function: refreshIcons
    Check if IE8 and below, if so, add and remove 'loading-icons' class
    to force redraw of icons using font icons
    */
    refreshIcons = function (delayAddCss, delayRemoveCss) {
        if (isBrowserOldIE() === true) {
            setTimeout(function(){
                var html = document.getElementsByTagName('html')[0];
                addLoadingClass(html);

                setTimeout(function(){
                    removeLoadingClass(html);
                }, delayRemoveCss);
            }, delayAddCss);
        }
    };


    // refresh icons for IE8 and below when page ready
    angular.element(document).ready(function () {
        refreshIcons(10, 100);
    });

})();
