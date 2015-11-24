/**
 * @ngdoc directive
 * 
 * @name wo.7segments.directive:segDigit
 * @strict 'E'
 * 
 */
 
function segDigitDirective(segUtil){ /*jshint ignore:line*/
    var directiveDefinitionObject = {
        strict: 'E',
        require: '^ngModel',
        scope: {
            'segVal': '=ngModel',
            'segDigitOptions': '='
        },
        templateUrl: 'digit.html',
        link: function(scope, el, attr, ngModelCtrl) { /*jshint ignore:line*/
            scope.opt = scope.segDigitOptions || (scope.segDigitOptions = {});
            
            scope.opt.onName = scope.opt.onName || 'seven-seg-on';
            scope.opt.digitName = scope.opt.digitName || 'seven-seg-digit';
        }
    };
    
    return directiveDefinitionObject;
}