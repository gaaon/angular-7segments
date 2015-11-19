/*global
    angular: true,
    minErr: true
*/

/**
 * @ngdoc directive
 * 
 * @name wo.7segments.directive:segDigitGroup
 * @strict 'E'
 * 
 */

var segGroupMinErr = minErr('segGroup');

function segDigitGroupDirective(segUtil){ /*jshint ignore:line*/
    var directiveDefinitionObject = {
        strict: 'E',
        require: '^ngModel',
        scope: {
            'segLength': '=',
            'segArr': '=ngModel'
        },
        templateUrl: 'group.html',
        link: function(scope, el, attr) {
            var length = scope.segLength || scope.segArr.length;
            
            scope.digits = segUtil.convertArrToSeg(scope.segArr, length);
            
            scope.$watchCollection('segArr', function(arr){
                scope.digits = segUtil.convertArrToSeg(arr, length);
            });
        }
    };
    
    return directiveDefinitionObject;
}