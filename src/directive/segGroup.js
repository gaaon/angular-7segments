/*global
    minErr: true,
    angular: true
*/

/**
 * @ngdoc directive
 * 
 * @name wo.7segments.directive:segDigitGroup
 * @strict 'E'
 * 
 */

var segGroupMinErr = minErr('segGroup'); /*jshint ignore:line*/

function segDigitGroupDirective(segment){ /*jshint ignore:line*/
    var directiveDefinitionObject = {
        strict: 'E',
        require: '^ngModel',
        scope: {
            'segOptions': '=',
            'segDigitOptions': '=',
            'segArr': '=ngModel',
        },
        templateUrl: 'group.html',
        link: function(scope) {
            function changeArr(arr, opt) {
                try {
                    scope.digits = segment.arrToSegGroup(arr, opt);
                } catch(e) {
                    scope.digits = [];
                }
            }
            
            var opt = angular.copy(segment.defaults.group);
            //changeArr(scope.segArr, opt);
            
            scope.$watch('segArr', function(arr){
                changeArr(arr, opt);
            });
            
            
            var optionWatchOff = scope.$watchCollection('segOptions', function(newOpt){
                angular.extend(opt, newOpt);
                changeArr(scope.segArr, opt);
                
                scope.wrapperStyle = {
                    width: opt.width+'px',
                    height: opt.height+'px'
                };
                
                if(!opt.watch) optionWatchOff();
            });
        }
    };
    
    return directiveDefinitionObject;
}