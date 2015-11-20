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
        },
        templateUrl: 'digit.html',
        link: function(scope, el, attr, ngModelCtrl) { /*jshint ignore:line*/
            scope.segClass = [];
            
            scope.className = [];
            
            var change = segUtil.segNumToArr.bind(null, scope.segClass);
            
            scope.$watch('segVal', change);
            
            change(scope.segVal);
        }
    };
    
    return directiveDefinitionObject;
}