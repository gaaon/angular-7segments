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
        link: function(scope) {
            function changeArr(arr, opt) {
                try {
                    scope.digits = segUtil.arrToSegGroup(arr, opt);
                } catch(e) {
                    scope.digits = [];
                }
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
                    changeArr(scope.segArr, opt);
                });
            }
        }
    };
    
    return directiveDefinitionObject;
}