/**
 * @name angular-7segments
 * @version v0.0.1
 * @author Taewoo Kim xodn4195@gmail.com
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
/*istanbul ignore next*/
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
/*istanbul ignore next*/
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
/*istanbul ignore next*/
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
/*istanbul ignore next*/
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
/*istanbul ignore next*/
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
/*istanbul ignore next*/
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


/**
 * @ngdoc directive
 * 
 * @name wo.7segments.directive:segDigit
 * @strict 'E'
 * 
 */
 
function segDigitDirective(segUtil){ /*jshint ignore:line*/
    var directiveDefinitionObject = {
        strict: 'E',
        require: '^ngModel',
        scope: {
            'segVal': '=ngModel',
            'onNames': '='
        },
        templateUrl: 'digit.html',
        link: function(scope, el, attr, ngModelCtrl) { /*jshint ignore:line*/
            scope.defaultOnName = scope.defaultOnName || 'seven-seg-on';
        }
    };
    
    return directiveDefinitionObject;
}
segDigitDirective.$inject = ["segUtil"];


function segDigitBindOnceDirective(segUtil){
    var directiveDefinitionObject = {
        strict: 'E',
        scope: {
            'segVal': '@'
        },
        templateUrl: 'digit.html'
    };
    
    return directiveDefinitionObject;
}
segDigitBindOnceDirective.$inject = ["segUtil"];


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
segDigitGroupDirective.$inject = ["segUtil"];


function bitAnd(){ /*jshint ignore:line*/
    return function(input, other){
        return input & other;
    };
}


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
    '_': 8,
    '.': 128,
    ' ': 0,
    'S': 109,
    'E': 121,
    'G': 61
}; 


/* globals
    angular: true,
    minErr: true
*/
var segUtilMinErr = minErr('segutil');

function segUtil(segMap) { /*jshint ignore:line*/
    var that = this;
    
    this.isDot = function(item) {
        return item === '.' || item === segMap['.'];
    };
    
    
    this.arrToSegGroup = function(arr, size) {
        if( !angular.isArray(arr) && !angular.isString(arr) ) {
            throw new segUtilMinErr('badarrtype', 'The type \'{0}\' is not supported.', (typeof arr));
        }
        var newArr = [], cnt = 0;
        size || (size = arr.length);
        
        
        for(var i = 0, len = arr.length ; i < len && cnt < size; cnt++, i++) {
            var item = arr[i] || 0;
            
            if( that.isDot(item) ){ // when item is dot
                var prev = arr[i-1];
                
                if( prev === void 0 || that.isDot(prev) ) newArr[cnt] = segMap['.'];
                else newArr[--cnt] |= segMap['.'];
            }
            
            else if( angular.isString(item) ) {
                newArr[cnt] = segMap[item];
            }
            
            else if( angular.isNumber(item) ) {
                newArr[cnt] = item;
            }
            
            else {
                throw new segUtilMinErr('baditemtype', 'The type \'{0}\' is not supported.', (typeof item));
            }
        }
        
        return newArr;
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
    };
    
    this.segNumToArr = function(val, oldVal) {
        var pos = 1;
        val = val || 0;
        
        var xor = oldVal == void 0 ? val : (val ^ oldVal);
        
        var array = [];
        for(var i = 0 ; i < 8 ; pos <<= 1, i++) {
            if( pos & xor ) {
                array[i] = !!(pos & val);
            }
        }
        
        return array;
    };
}
segUtil.$inject = ["segMap"];


/* global
    angular: true,
    segDigitDirective: true,
    segDigitBindOnceDirective: true,
    segDigitGroupDirective: true,
    segMap: true,
    segUtil: true,
    bitAnd: true
*/

/**
 * @ngdoc overview
 * @name wo.7segments
 * @description
 * Angular module providing simple seven segements
 */
var app = angular.module('wo.7segments', []) /*jshint ignore:line*/
.directive('segDigit', segDigitDirective)
.directive('segDigitOnce', segDigitBindOnceDirective)
.directive('segGroup', segDigitGroupDirective)
.value('segMap', segMap)
.service('segUtil', segUtil)
.filter('bitAnd', bitAnd)
.run(["$document", function($document) {
    var head = $document[0].querySelector('head');
    var style = $document[0].createElement('style');
    
    style.innerHTML = '.seven-seg-digit{ fill: #320000; overflow: hidden;'+ 
        'stroke-width: 0; height: 100%; width: 100%; background-color: Black;}'+
        '.seven-seg-on{fill:red;}'+
        '.seven-seg-digit-wrapper{display:inline-block;}';
    head.appendChild(style);
}]);


/*global angular*/
angular.module("wo.7segments").run(["$templateCache", function($templateCache) {$templateCache.put("digit.html","<svg class=\"seven-seg-digit\" viewBox=\"0 0 57 80\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" focusable=\"false\"> <defs> <polyline id=\"h-part\" points=\"11 0, 37 0, 42 5, 37 10, 11 10, 6 5\"></polyline> <polyline id=\"v-part\" points=\"0 11, 5 6, 10 11, 10 34, 5 39, 0 34\"></polyline> </defs> <g class=\"seven-seg-group\"> <use xlink:href=\"#h-part\" x=\"0\" y=\"0\" data-ng-class=\"(segVal | bitAnd : 1) && (onNames[0] || defaultOnName)\"></use> <use xlink:href=\"#v-part\" x=\"-48\" y=\"0\" transform=\"scale(-1,1)\" data-ng-class=\"(segVal | bitAnd : 2)  && (onNames[1] || defaultOnName)\"></use> <use xlink:href=\"#v-part\" x=\"-48\" y=\"-80\" transform=\"scale(-1,-1)\" data-ng-class=\"(segVal | bitAnd : 4) && (onNames[2] || defaultOnName)\"></use> <use xlink:href=\"#h-part\" x=\"0\" y=\"70\" data-ng-class=\"(segVal | bitAnd : 8) && (onNames[3] || defaultOnName)\"></use> <use xlink:href=\"#v-part\" x=\"0\" y=\"-80\" transform=\"scale(1,-1)\" data-ng-class=\"(segVal | bitAnd : 16) && (onNames[4] || defaultOnName)\"></use> <use xlink:href=\"#v-part\" x=\"0\" y=\"0\" data-ng-class=\"(segVal | bitAnd : 32) && (onNames[5] || defaultOnName)\"></use> <use xlink:href=\"#h-part\" x=\"0\" y=\"35\" data-ng-class=\"(segVal | bitAnd : 64) && (onNames[6] || defaultOnName)\"></use> <circle cx=\"52\" cy=\"75\" r=\"5\" data-ng-class=\"(segVal | bitAnd : 128) && (onNames[7] || defaultOnName)\"></circle> </g> </svg>");
$templateCache.put("group.html","<div data-ng-if=\"!segOptions.align\" class=\"seven-seg-digit-wrapper\" data-ng-style=\"wrapperStyle\" data-ng-repeat=\"i in emptyArr track by $index\" seg-digit-once seg-val=\"0\"></div><div class=\"seven-seg-digit-wrapper\" data-ng-style=\"wrapperStyle\" data-ng-repeat=\"dig in digits track by $index\" seg-digit data-ng-model=\"dig\"></div><div data-ng-if=\"segOptions.align\" class=\"seven-seg-digit-wrapper\" data-ng-style=\"wrapperStyle\" data-ng-repeat=\"i in emptyArr track by $index\" seg-digit-once seg-val=\"0\"></div>");}]);

})(window, window.angular);