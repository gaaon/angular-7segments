/**
 * @ngdoc directive
 * 
 * @name wo.7segments.directive:segDigitGroup
 * @strict 'E'
 * 
 */

var segGroupMinErr = minErr('segGroup');

function segDigitGroupDirective(segment){
    var directiveDefinitionObject = {
        strict: 'E',
        require: '^ngModel',
        scope: {
            'segOptions': '=',
            'segDigitOptions': '=',
            'segArr': '=ngModel'
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
            
            scope.$watch('segArr', function(arr){
                changeArr(arr, opt);
            });
            
            
            var optionWatchOff = scope.$watchCollection('segOptions', function(newOpt){
                angular.extend(opt, newOpt);
                changeArr(scope.segArr, opt);
                
                
                if(!opt.watch) optionWatchOff();
            });
        }
    };
    
    return directiveDefinitionObject;
}