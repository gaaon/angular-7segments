/**
 * @ngdoc directive
 * 
 * @name wo.7segments.directive:segDigit
 * @strict 'E'
 * 
 */

function segDigitDirective(segment, segPoints){
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
            scope.points = segPoints;
            
            el.addClass('seven-seg-digit-wrapper');
            el.css('width', scope.opt.width+'px');
            el.css('height', scope.opt.height+'px');
        }
    };
    
    return directiveDefinitionObject;
}