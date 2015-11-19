/* global
    angular: true,
    segDigitDirective: true,
    segDigitGroupDirective: true,
    segMap: true,
    segUtil: true
*/

/**
 * @ngdoc overview
 * @name wo.7segments
 * @description
 * Angular module providing simple seven segements
 */
var app = angular.module('wo.7segments', []) /*jshint ignore:line*/
.directive('segDigit', segDigitDirective)
.directive('segDigitGroup', segDigitGroupDirective)
.constant('segMap', segMap)
.service('segUtil', segUtil);