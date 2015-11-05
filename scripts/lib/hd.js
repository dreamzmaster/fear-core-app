/*
_HD Module
Common Utility to create raw HTML string

Example: 
_HD('td').append('data').wrap('tr').wrap('table').html(); 
*/
define(['packages/angular.package'], function (angular) {

    'use strict';

    var _HD;

    (function () {
        
        _HD = function (tag, content) {
            return new HtmlDecorator(tag, content);
        }
        
        
        function HtmlDecorator (tag, content, selfClosing) {
            var cssList = [], 
                attrList = [];
            
        
            
            
            this.html = function () {
                var html = '';
                
                if (!tag) {
                    return html;
                }
                
                html += '<' + tag;
                html += cssList.length ? ' class="' + cssList.join(' ') + '"' : '';
                html += attrList.length ? ' ' + attrList.join(' ') : '';
                html += '>';
                html += content || '';
                html += selfClosing ? '' : '</' + tag + '>';
                
                return  html;  
            }

            this.wrap = function (tag) {
                return new HtmlDecorator(tag, this.html());
            }
                
            this.css = function (value) {
                var type = typeof value;
                
                if (type === 'string') {
                    cssList.push(value);
                } else if (type === 'object' && Array.prototype.constructor === value.constructor) {
                    cssList = cssList.concat(value);
                } else if (type === 'object') {
                    for (var key in value) {
                        if (value.hasOwnProperty(key) && value[key] === true) {
                            cssList.push(key); 
                        }
                    }
                } 
                
                return this;
            }
            
            
            this.attr = function (attr, value, condition) {

                if (arguments.length === 3) {
                    if (arguments[2] === true) {
                        attrList.push(attr + '="' + value + '"');   
                    }
                } else {
                    attrList.push(attr + '="' + value + '"'); 
                }
                
                return this;
            }
            

            this.prepend = function (html) {
                var type = typeof html;
                
                html = type === 'string' ? html : html.html();
                content = html + content;
                
                return this;
            }
            
            
            this.append = function (html    ) {
                var type = typeof html;
                
                html = type === 'string' ? html : html.html();
                content = content + html;
                
                return this;
            }
        }

    })();


    return _HD;
});