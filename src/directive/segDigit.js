/**
 * @ngdoc directive
 * 
 * @name wo.7segments.directive:segDigit
 * @strict 'E'
 * 
 */
 
/* global
    angular: true
*/
function segDigitDirective(segment){ /*jshint ignore:line*/
    var directiveDefinitionObject = {
        strict: 'E',
        require: '^ngModel',
        scope: {
            'segVal': '=ngModel',
            'segDigitOptions': '='
        },
        templateUrl: 'digit.html',
        link: function(scope, el, attr, ngModelCtrl) { /*jshint ignore:line*/
            scope.opt = angular.extend({}, segment.defaults.digit, scope.segDigitOptions);
        }
    };
    
    return directiveDefinitionObject;
}