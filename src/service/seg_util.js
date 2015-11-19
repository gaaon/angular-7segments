/* globals
    angular: true,
    minErr: true
*/
var segUtilMinErr = minErr('segutil');

function segUtil(segMap) { /*jshint ignore:line*/
    this.convertArrToSeg = function(arr, length) {
        if( !angular.isArray(arr) && !angular.isString(arr) ) {
            throw new segUtilMinErr('badarrtype', 'The type is not supported.');
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
                throw new segUtilMinErr('baditemtype', 'The type is not supported.');
            }
            
            if( arr[i+1] === '.' || arr[i+1] == segMap['.']) {
                newArr[cnt] += segMap['.'];
                i++;
            }
        }
        
        newArr.splice(cnt);
        
        return (new Array(length-cnt)).concat(newArr);
    };
}