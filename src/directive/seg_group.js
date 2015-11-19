/*global
    angular: true
*/

/**
 * @ngdoc directive
 * 
 * @name wo.7segments.directive:segDigitGroup
 * @strict 'E'
 * 
 */
 
function segDigitGroupDirective(segMap, $interval){ /*jshint ignore:line*/
    var directiveDefinitionObject = {
        strict: 'E',
        scope: {
            'segLength': '=',
            'segValue': '='
        },
        templateUrl: 'group.html',
        link: function(scope, el, attr) {
            var length = scope.segLength || scope.segValue.length;
            
            function change(str) {
                
                str = str+'';
                for(var i = 0 ; i < length ; i++) {
                    scope.digits[i] = segMap[str[i]];
                }
            }
            
            
            $interval(function(){
                var a = new Date();
                
                var hour = a.getHours();
                var min = a.getMinutes();
                var sec = a.getSeconds();
                
                
                scope.segValue = hour + '-' + (min<10?'0':'') + min + '-'+(sec<10?'0':'')+sec;
                console.log(scope.segValue);
            }, 1000);
            
            scope.digits = new Array(length);
            
            scope.$watch('segValue', function(val) {
                change(val);
            });
        }
    };
    
    return directiveDefinitionObject;
}