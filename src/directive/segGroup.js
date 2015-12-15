/**
 * @ngdoc directive
 * 
 * @name wo.7segments.directive:segDigitGroup
 * @strict 'E'
 * 
 */

var segGroupMinErr = minErr('segGroup');

function segGroupDirective(segment){
    var directiveDefinitionObject = {
        strict: 'E',
        require: 'ngModel',
        scope: {
            'segOptions': '=',
            'segDigitOptions': '=',
            'segArr': '=ngModel'
        },
        templateUrl: 'group.html',
        link: function(scope, el) {
            // TODO delete segArr and use ngModelCtrl
            el.addClass('seven-seg-group');
            
            function changeArr(arr, opt) {
                try {
                    scope.digits = segment.arrToSegGroup(arr, opt);
                } catch(e) {
                    scope.digits = [];
                }
            }
            
            var opt = angular.extend({}, segment.defaults.group, scope.segDigitOptions);
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