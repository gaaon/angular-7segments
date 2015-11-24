/* global
    angular: true,
    segDigitDirective: true,
    segDigitGroupDirective: true,
    segMap: true,
    segUtil: true,
    bitAnd: true
*/

/**
 * @ngdoc overview
 * @name wo.7segments
 * @description
 * Angular module providing simple seven segements
 */
var app = angular.module('wo.7segments', []) /*jshint ignore:line*/
.directive('segDigit', segDigitDirective)
.directive('segGroup', segDigitGroupDirective)
.value('segMap', segMap)
.service('segUtil', segUtil)
.filter('bitAnd', bitAnd)
.run(function($document) {
    var head = $document[0].querySelector('head');
    var style = $document[0].createElement('style');
    
    style.innerHTML = '.seven-seg-digit{ fill: #320000; overflow: hidden;'+ 
        'stroke-width: 0; height: 100%; width: 100%; background-color: Black;}'+
        '.seven-seg-on{fill:red;}'+
        '.seven-seg-digit-wrapper{display:inline-block;}';
    head.appendChild(style);
});