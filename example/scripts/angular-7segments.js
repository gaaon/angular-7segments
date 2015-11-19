/**
 * @name angular-7segments
 * @version v0.0.1
 * @author  
 * @license MIT
 */
(function(window, angular){

var segMap = { /*jshint ignore:line*/
    '1': 6,
    '2': 91,
    '3': 79,
    '4': 102,
    '5': 109,
    '6': 125,
    '7': 39,
    '8': 127,
    '9': 111,
    '0': 63,
    '-': 64,
    '.': 128
}; 


/**
 * @ngdoc directive
 * 
 * @name wo.7segments.directive:segDigit
 * @strict 'E'
 * 
 */
 
function segDigitDirective(){ /*jshint ignore:line*/
    var directiveDefinitionObject = {
        strict: 'E',
        scope: {
            'segVal': '=',
        },
        templateUrl: 'digit.html',
        link: function(scope, el, attr) {
            
            function change(val, oldVal) {
                var pos = 1;
                var xor = oldVal == void 0 ? val : (val ^ oldVal);
                
                for(var i = 0 ; i < 8 ; pos = pos << 1, i++) {
                    if( pos & xor ) {
                        scope.segClass[i] = (pos & val) ? on : off;
                    }
                }
            }
            
            var on = 'seven-seg-on', off = '';
            
            scope.segClass = [];
            
            scope.$watch('segVal', change);
            
            change(scope.segVal);
        }
    };
    
    return directiveDefinitionObject;
}


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
segDigitGroupDirective.$inject = ["segMap", "$interval"];


/* global
    angular: true,
    segDigitDirective: true,
    segDigitGroupDirective: true,
    segMap: true
*/

/**
 * @ngdoc overview
 * @name wo.7segments
 * @description
 * Angular module providing simple seven segements
 */
var app = angular.module('wo.7segments', []) /*jshint ignore:line*/
.directive('segDigit', segDigitDirective)
.directive('segDigitGroup', segDigitGroupDirective)
.constant('segMap', segMap);


/*global angular*/
angular.module("wo.7segments").run(["$templateCache", function($templateCache) {$templateCache.put("digit.html","<style>.seven-seg-digit{\n        fill: #320000; \n        overflow: hidden; \n        stroke-width: 0; \n        height: 100%; \n        width: 100%; \n        background-color: Black;\n    }\n    \n    .seven-seg-on{\n        fill: red;\n    }</style> <svg class=\"seven-seg-digit\" viewBox=\"0 0 57 80\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" focusable=\"false\"> <defs> <polyline id=\"h-part\" points=\"11 0, 37 0, 42 5, 37 10, 11 10, 6 5\"></polyline> <polyline id=\"v-part\" points=\"0 11, 5 6, 10 11, 10 34, 5 39, 0 34\"></polyline> </defs> <g class=\"seven-seg-group\"> <use xlink:href=\"#h-part\" x=\"0\" y=\"0\" data-ng-class=\"segClass[0]\"></use> <use xlink:href=\"#v-part\" x=\"-48\" y=\"0\" transform=\"scale(-1,1)\" data-ng-class=\"segClass[1]\"></use> <use xlink:href=\"#v-part\" x=\"-48\" y=\"-80\" transform=\"scale(-1,-1)\" data-ng-class=\"segClass[2]\"></use> <use xlink:href=\"#h-part\" x=\"0\" y=\"70\" data-ng-class=\"segClass[3]\"></use> <use xlink:href=\"#v-part\" x=\"0\" y=\"-80\" transform=\"scale(1,-1)\" data-ng-class=\"segClass[4]\"></use> <use xlink:href=\"#v-part\" x=\"0\" y=\"0\" data-ng-class=\"segClass[5]\"></use> <use xlink:href=\"#h-part\" x=\"0\" y=\"35\" data-ng-class=\"segClass[6]\"></use> </g> <circle cx=\"52\" cy=\"75\" r=\"5\" data-ng-class=\"segClass[7]\"></circle> </svg>");
$templateCache.put("group.html","<div> <div style=\"display:inline-block; width:100px; height:200px\" data-ng-repeat=\"dig in digits track by $index\" seg-digit seg-val=\"dig\"> </div> </div>");}]);

})(window, window.angular);