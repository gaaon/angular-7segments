/*global
    minErr: true
*/

/**
 * @ngdoc directive
 * 
 * @name wo.7segments.directive:segDigitGroup
 * @strict 'E'
 * 
 */

var segGroupMinErr = minErr('segGroup'); /*jshint ignore:line*/

function segDigitGroupDirective(segUtil){ /*jshint ignore:line*/
    var directiveDefinitionObject = {
        strict: 'E',
        require: '^ngModel',
        scope: {
            'segOptions': '=',
            'segArr': '=ngModel',
        },
        templateUrl: 'group.html',
        link: function(scope, el, attr) {
            function changeArr(arr, opt) {
                scope.digits = segUtil.arrToSegGroup(arr, opt.size);
                scope.emptyArr = new Array(opt.size === void 0 ? 0 : opt.size - scope.digits.length); 
            }
            
            var opt = scope.segOptions || (scope.segOptions = {});
            
            changeArr(scope.segArr, opt);
            
            scope.wrapperStyle = {
                width: (opt.width || 75)+'px',
                height: (opt.height || 150)+'px'
            };
            
            
            scope.$watch('segArr', function(arr){
                changeArr(arr, opt);
            });
            
            
            
            if( !!scope.segOptions.watch ) {
                scope.$watchCollection('segOptions', function(opt){
                    changeArr(scope.digits, opt);
                });
            }
        }
    };
    
    return directiveDefinitionObject;
}