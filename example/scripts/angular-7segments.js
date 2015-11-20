/**
 * @name angular-7segments
 * @version v0.0.1
 * @author  
 * @license MIT
 */
(function(window, angular){

/* global
  angular,
  document
*/

/**
 * Checks if `obj` is a scope object.
 *
 * @private
 * @param {*} obj Object to check
 * @returns {boolean} True if `obj` is a scope obj.
 * 
 * @from angular source code
 */
function isScope(obj) {
  return obj && obj.$evalAsync && obj.$watch;
}

/**
 * Checks if `obj` is a window object.
 *
 * @private
 * @param {*} obj Object to check
 * @returns {boolean} True if `obj` is a window obj.
 * 
 * @from angular source code
 */
function isWindow(obj) {
  return obj && obj.window === obj;
}

/**
 * @private
 * @description
 * Replace 'key' and 'value' to json string
 * 
 * 
 * @param {*} key the key of object to replace
 * @param {*} value the value of object to replace
 * @returns {string} The result to replace
 * 
 * @from angular source code
 */
function toJsonReplacer(key, value) {
  var val = value;

  if (typeof key === 'string' && key.charAt(0) === '$' && key.charAt(1) === '$') {
    val = undefined;
  } else if (isWindow(value)) {
    val = '$WINDOW';
  } else if (value &&  document === value) {
    val = '$DOCUMENT';
  } else if (isScope(value)) {
    val = '$SCOPE';
  }

  return val;
}

/**
 * @private
 * @description
 * Serialize 'obj' into string
 * 
 * @param {*} obj Object to serialzize
 * @returns {string} Serialized result
 */
function serializeObject(obj) {
  var seen = [];

  return JSON.stringify(obj, function(key, val) {
    val = toJsonReplacer(key, val);
    if (angular.isObject(val)) {

      if (seen.indexOf(val) >= 0) return '...';

      seen.push(val);
    }
    return val;
  });
}

/**
 * @private
 * @description
 * Convert 'obj' into string
 * 
 * @param {*} obj Object to convert
 * @returns {string} Converted result
 */
function toDebugString(obj) {
  if (typeof obj === 'function') {
    return obj.toString().replace(/ \{[\s\S]*$/, '');
  } else if (angular.isUndefined(obj)) {
    return 'undefined';
  } else if (typeof obj !== 'string') {
    return serializeObject(obj);
  }
  return obj;
}


/***
 * @private
 * @from angularjs source code for error handler
 **/
function minErr(module, ErrorConstructor) { /*jshint ignore:line */
  ErrorConstructor = ErrorConstructor || Error;
  return function() {
    var SKIP_INDEXES = 2;

    var templateArgs = arguments,
      code = templateArgs[0],
      message = '[' + (module ? module + ':' : '') + code + '] ',
      template = templateArgs[1];
      //paramPrefix, i
    
    message += template.replace(/\{\d+\}/g, function(match) {
      var index = +match.slice(1, -1),
        shiftedIndex = index + SKIP_INDEXES;

      if (shiftedIndex < templateArgs.length) {
        return toDebugString(templateArgs[shiftedIndex]);
      }

      return match;
    });
    
    // don't need not yet, but may need someday..
    
    // message += '\nhttp://errors.angularjs.org/1.4.7/' +
    //   (module ? module + '/' : '') + code;

    // for (i = SKIP_INDEXES, paramPrefix = '?'; i < templateArgs.length; i++, paramPrefix = '&') {
    //   message += paramPrefix + 'p' + (i - SKIP_INDEXES) + '=' +
    //     encodeURIComponent(toDebugString(templateArgs[i]));
    // }

    return new ErrorConstructor(message);
  };
}

var segErr = minErr('$segment');


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
                val = val || 0;
                
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
segDigitGroupDirective.$inject = ["segUtil"];


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
    '.': 128,
    ' ': 0
}; 


/* globals
    angular: true,
    minErr: true
*/
var segUtilMinErr = minErr('segutil');

function segUtil(segMap) { /*jshint ignore:line*/

    this.arrToSegGroup = function(arr, length) {
        if( !angular.isArray(arr) && !angular.isString(arr) ) {
            throw new segUtilMinErr('badarrtype', 'The type \'{0}\' is not supported.', (typeof arr));
        }
        var newArr = new Array(length);
        var cnt = 0;
        
        for(var i = 0, len = arr.length ; i < len && cnt < length ; cnt++, i++) {
            var item = arr[i];
            
            if( item === '.' || item === segMap['.'] ) {
                newArr[cnt] = segMap['.'];
                continue;
            }
            
            if( angular.isString(item) ) { // have to convert
                newArr[cnt] = segMap[item] || 0;
            }
            
            else if( angular.isNumber(item) ) {
                newArr[cnt] = item;
            }
            
            else {
                throw new segUtilMinErr('baditemtype', 'The type \'{0}\' is not supported.', (typeof item));
            }
            
            if( arr[i+1] === '.' || arr[i+1] == segMap['.']) {
                newArr[cnt] += segMap['.'];
                i++;
            }
        }
        
        newArr.splice(cnt);
        
        return (new Array(length-cnt)).concat(newArr);
    };
    
    this.arrToSegNum = function(arr) {
        if( !angular.isArray(arr) && !angular.isString(arr) ) {
            throw new segUtilMinErr('badarrtype', 'The type \'{0}\' is not supported.', (typeof arr));
        }
        
        var pos = 1, ret = 0;
        
        for(var i = 0, len = 8 ; i < len ; pos<<=1, i++) {
            if( !!arr[i] && arr[i] != '0') ret += pos;
        }
        
        return ret;
    }
}
segUtil.$inject = ["segMap"];


/* global
    angular: true,
    segDigitDirective: true,
    segDigitGroupDirective: true,
    segMap: true,
    segUtil: true
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
.value('segMap', segMap)
.service('segUtil', segUtil);


/*global angular*/
angular.module("wo.7segments").run(["$templateCache", function($templateCache) {$templateCache.put("digit.html","<style>.seven-seg-digit{\n        fill: #320000; \n        overflow: hidden; \n        stroke-width: 0; \n        height: 100%; \n        width: 100%; \n        background-color: Black;\n    }\n    \n    .seven-seg-on{\n        fill: red;\n    }</style> <svg class=\"seven-seg-digit\" viewBox=\"0 0 57 80\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" focusable=\"false\"> <defs> <polyline id=\"h-part\" points=\"11 0, 37 0, 42 5, 37 10, 11 10, 6 5\"></polyline> <polyline id=\"v-part\" points=\"0 11, 5 6, 10 11, 10 34, 5 39, 0 34\"></polyline> </defs> <g class=\"seven-seg-group\"> <use xlink:href=\"#h-part\" x=\"0\" y=\"0\" data-ng-class=\"segClass[0]\"></use> <use xlink:href=\"#v-part\" x=\"-48\" y=\"0\" transform=\"scale(-1,1)\" data-ng-class=\"segClass[1]\"></use> <use xlink:href=\"#v-part\" x=\"-48\" y=\"-80\" transform=\"scale(-1,-1)\" data-ng-class=\"segClass[2]\"></use> <use xlink:href=\"#h-part\" x=\"0\" y=\"70\" data-ng-class=\"segClass[3]\"></use> <use xlink:href=\"#v-part\" x=\"0\" y=\"-80\" transform=\"scale(1,-1)\" data-ng-class=\"segClass[4]\"></use> <use xlink:href=\"#v-part\" x=\"0\" y=\"0\" data-ng-class=\"segClass[5]\"></use> <use xlink:href=\"#h-part\" x=\"0\" y=\"35\" data-ng-class=\"segClass[6]\"></use> </g> <circle cx=\"52\" cy=\"75\" r=\"5\" data-ng-class=\"segClass[7]\"></circle> </svg>");
$templateCache.put("group.html","<div style=\"display:inline-block; width:100px; height:200px\" data-ng-repeat=\"dig in digits track by $index\" seg-digit seg-val=\"dig\"> </div>");}]);

})(window, window.angular);