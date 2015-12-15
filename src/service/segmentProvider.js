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
                
                opt.map || (opt.map = segMap);
                
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