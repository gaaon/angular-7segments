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
            'onNames': '='
        },
        templateUrl: 'digit.html',
        link: function(scope, el, attr, ngModelCtrl) { /*jshint ignore:line*/
            scope.defaultOnName = scope.defaultOnName || 'seven-seg-on';
        }
    };
    
    return directiveDefinitionObject;
}