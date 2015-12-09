/**
 * @ngdoc directive
 * 
 * @name wo.7segments.directive:segDigit
 * @strict 'E'
 * 
 */

function segDigitDirective(segment){
    var directiveDefinitionObject = {
        strict: 'E',
        require: '^ngModel',
        scope: {
            'segVal': '=ngModel',
            'segDigitOptions': '='
        },
        templateUrl: 'digit.html',
        link: function(scope, el, attr, ngModelCtrl) {
            scope.opt = angular.extend({}, segment.defaults.digit, scope.segDigitOptions);
        }
    };
    
    return directiveDefinitionObject;
}