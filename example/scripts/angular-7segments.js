/**
 * @name angular-7segments
 * @version v0.2.0
 * @author Taewoo Kim xodn4195@gmail.com
 * @license MIT
 */
(function(window, angular){

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
function minErr(module, ErrorConstructor) {
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
 * https://github.com/tadeuszwojcik/angular-once
 * Modify some codes
 */

function once() {
    return function (scope, element, attrs) {
        console.log(attrs);
        angular.forEach(attrs, function (attr, attrName) {
            
            if (!/^onceAttr[A-Z]/.test(attrName)) return;
            
            var dashedName = attrName.replace(/[A-Z]/g, function (match) { return '-' + match.toLowerCase(); });
            
            var name = dashedName.substr(10);
            
            element.attr(name, attr);
            
        });
    };
}


/**
 * @ngdoc directive
 * 
 * @name wo.7segments.directive:segDigit
 * @strict 'E'
 * 
 */

function segDigitDirective(segment){
    var directiveDefinitionObject = {
        strict: 'E',
        require: '^ngModel',
        scope: {
            'segVal': '=ngModel',
            'segDigitOptions': '='
        },
        templateUrl: 'digit.html',
        link: function(scope, el, attr, ngModelCtrl) {
            
            scope.opt = angular.extend({}, segment.defaults.digit, scope.segDigitOptions);
            scope.points = scope.opt.points;
            
            el.addClass('seven-seg-digit-wrapper');
            el.css('width', scope.opt.width+'px');
            el.css('height', scope.opt.height+'px');
        }
    };
    
    return directiveDefinitionObject;
}
segDigitDirective.$inject = ["segment"];


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
segGroupDirective.$inject = ["segment"];


function bitAnd(){
    return function(input, other){
        return input & other;
    };
}


function bitAndWithBitwise() {
    return function(input, pos) {
        return input & (1 << pos);
    };
}


var segMinErr = minErr('segment');

function segmentProvider(){
    var $provider = this;
    
    var segMap = {
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
    
    var segPoints = [
        "11 0, 37 0, 42 5, 37 10, 11 10, 6 5",      //1
        "38 11, 43 6, 48 11, 48 34, 43 39, 38 34",  //2
        "38 46, 43 41, 48 46, 48 69, 43 74, 38 69", //4
        "11 70, 37 70, 42 75, 37 80, 11 80, 6 75",  //8
        "0 46, 5 41, 10 46, 10 69, 5 74, 0 69",     //16
        "0 11, 5 6, 10 11, 10 34, 5 39, 0 34",      //32
        "11 35, 37 35, 42 40, 37 45, 11 45, 6 40"   //64
    ];
    
    this.defaults = {
        digit: {
            width: 75,
            height: 150,
            onClass: 'seven-seg-on',
            digitClass: 'seven-seg-digit',
            points: segPoints
        },
        
        group: {
            align: undefined,   // align right
            watch: undefined,
            map: segMap
        }
    };
    
    this.$get = function(){
        
        function segmentService() {
            var that = this;
            
            
            this.isDot = function(item) {
                return item === '.' || item === segMap['.'];
            };
            
            
            this.arrToSegGroup = function(arr, opt) {
                if( !angular.isArray(arr) && !angular.isString(arr) ) {
                    throw new segMinErr('badarrtype', 'The type \'{0}\' is not supported.', (typeof arr));
                }
                
                if( opt.size < 0 ) {
                    throw new segMinErr('badsize', 'The size \'{0}\' cannot be negative.', opt.size);
                }
                
                var newArr = [], cnt = 0;
                var size = opt.size === void 0 ? arr.length : opt.size, i = 0;
                
                for(var len = arr.length ; i < len && cnt < size; cnt++, i++) {
                    var item = arr[i] || 0;
                    
                    if( that.isDot(item) ){ // when item is dot
                        var prev = arr[i-1];
                        
                        if( prev === void 0 || that.isDot(prev) ) newArr[cnt] = opt.map['.'];
                        else newArr[--cnt] |= opt.map['.'];
                    }
                    
                    else if( angular.isString(item) ) {
                        newArr[cnt] = opt.map[item];
                    }
                    
                    else if( angular.isNumber(item) ) {
                        newArr[cnt] = item;
                    }
                    
                    else {
                        throw new segMinErr('baditemtype', 'The type \'{0}\' is not supported.', (typeof item));
                    }
                }
                if( that.isDot(arr[i]) ) newArr[cnt-1] |= opt.map['.'];
                
                size = opt.size === void 0 ? cnt : opt.size;
                
                if(opt.align === void 0 || opt.align === 'right') return (new Array(size-cnt)).concat(newArr);
                else return newArr.concat(new Array(size-cnt));
            };
            
            
            
            this.arrToSegNum = function(arr) {
                if( !angular.isArray(arr) && !angular.isString(arr) ) {
                    throw new segMinErr('badarrtype', 'The type \'{0}\' is not supported.', (typeof arr));
                }
                
                var pos = 1, ret = 0;
                
                for(var i = 0, len = 8 ; i < len ; pos<<=1, i++) {
                    if( !!arr[i] && arr[i] != '0') ret |= pos;
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
            
            
            
            this.defaults = $provider.defaults;
        }

        return new segmentService();
    };
}


/**
 * @ngdoc overview
 * @name wo.7segments
 * @description
 * Angular module providing simple seven segements
 */
var app = angular.module('wo.7segments', []) /*jshint ignore:line*/
.directive('segDigit', segDigitDirective)
.directive('segGroup', segGroupDirective)
.directive('once', once)
.filter('bitAnd', bitAnd)
.filter('bitAndWithBitwise', bitAndWithBitwise)
.provider('segment', segmentProvider)
.run(["$document", function($document) {
    // this will replace after gulp-angular-css-loader is completed
    var head = $document[0].querySelector('head');
    var style = $document[0].createElement('style');
    
    style.innerHTML = '.seven-seg-digit{ fill: #320000; overflow: hidden;'+ 
        'stroke-width: 0; height: 100%; width: 100%; background-color: Black;}'+
        '.seven-seg-on{fill:red;}'+
        '.seven-seg-digit-wrapper{display:inline-block;}';
    head.appendChild(style);
}]);


/*global angular*/
angular.module("wo.7segments").run(["$templateCache", function($templateCache) {$templateCache.put("digit.html","<svg data-ng-class=\"opt.digitClass\" viewBox=\"0 0 57 80\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" focusable=\"false\"> <g> <polyline data-ng-repeat=\"point in ::points\" ng-attr-points=\"{{point}}\" data-ng-class=\"(segVal | bitAndWithBitwise : $index) && opt.onClass\"></polyline> <circle cx=\"52\" cy=\"75\" r=\"5\" data-ng-class=\"(segVal | bitAnd : 128) && opt.onClass\"></circle> </g> </svg>");
$templateCache.put("group.html","<div data-ng-repeat=\"dig in digits track by $index\" seg-digit data-ng-model=\"dig\" seg-digit-options=\"segDigitOptions\"> </div>");}]);

})(window, window.angular);