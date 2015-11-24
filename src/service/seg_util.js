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