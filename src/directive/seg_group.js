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
            'segLength': '=',
            'segArr': '=ngModel'
        },
        templateUrl: 'group.html',
        link: function(scope) {
            var length = scope.segLength || scope.segArr.length;
            
            scope.digits = segUtil.arrToSegGroup(scope.segArr, length);
            
            scope.$watchCollection('segArr', function(arr){
                scope.digits = segUtil.arrToSegGroup(arr, length);
            });
        }
    };
    
    return directiveDefinitionObject;
}