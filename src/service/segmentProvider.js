var segMinErr = minErr('segment');

function segmentProvider(){
    var $provider = this;
    
    this.defaults = {
        digit: {
            width: 75,
            height: 150,
            onClass: 'seven-seg-on',
            digitClass: 'seven-seg-digit'
        },
        
        group: {
            align: undefined,   // align right
            watch: undefined
        }
    };
    
    this.$get = function(segMap){
        
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
                        throw new segMinErr('baditemtype', 'The type \'{0}\' is not supported.', (typeof item));
                    }
                }
                if( that.isDot(arr[i]) ) newArr[cnt-1] |= segMap['.'];
                
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