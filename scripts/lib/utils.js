/*
 Utils Module
 Utility methods lib file
 */
define(function () {

    'use strict';

    var utils = {

        serializeData : function (data, serialiseArrays) {
            var params = [];

            for (var i in data) {

                if (data.hasOwnProperty(i)) {

                    if (serialiseArrays && isArray(data[i])) {

                        pushFormEncodedArray(params, i, data[i]);

                    } else {

                        params.push(i + '=' + encodeURIComponent(data[i]));
                    }
                }
            }

            return params.join('&');
        },

        constructUrl : function (action, params) {
            return '/' + action + '?' + utils.serializeData(params)
        },

        /*
        Function: trim
        Trim leading and trailing spaces of a string

        Return: String
        */
        trim: function (value) {
            return String.prototype.trim ? value.trim() : value.replace(/^\s+|\s+$/gm, '')
        }
    };

    function pushFormEncodedArray(params, propertyName, array) {

        for (var j = 0; j < array.length; j++) {
            params.push(propertyName + '[]' + '=' + encodeURIComponent(array[j]));
        }
    }

    function isArray(array) {
        return Object.prototype.toString.call(array) === '[object Array]';
    }

    return utils;
});