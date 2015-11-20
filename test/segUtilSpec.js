describe('segUtil', function(){
    var segUtil;
    
    beforeEach(function(){
        module('wo.7segments');
        
        inject(function(_segUtil_){
            segUtil = _segUtil_;
        });
    });
    
    
    
    context('#arrToSegGroup',function(){
        it('should throw an error when the first argument is not an array or string.', function(){
            var expected = [0, 1, false, {/*object*/}, function(){}, Error];
            
            for(var i = 0 ; i < expected.length ; i++) {
                var item = expected[i];
                
                expect(segUtil.arrToSegGroup.bind(null, item, 5)).to.throw(Error, 
                    '[segutil:badarrtype] The type \''+(typeof item)+'\' is not supported.');
            }
            
        });
        
        
        
        it('should throw an error when the item of array is not an number or string.', function(){
            var expected = [ [{/*object*/}], [function(){}], [Error] ];
        
            for(var i = 0 ; i < expected.length ; i++) {
                var item = expected[i];
                expect(segUtil.arrToSegGroup.bind(null, item, 5)).to.throw(Error,
                    '[segutil:baditemtype] The type \''+(typeof item[0])+'\' is not supported.');
            }
        });
        
        
        
        it('should return correct results.', function() {
            var expected = ['1234567890-. ', [6, 91, 79, 102, 109, 125, 39, 127, 111, 63, 64, 128, 0]];
            
            var actual = [undefined, undefined, undefined, 6, 91, 79, 102, 109, 125, 39, 127, 111, 63, 192, 0];
            
            for(var i = 0 ; i < expected.length ; i++) {
                var item = expected[i];
                
                var result = segUtil.arrToSegGroup(item, 15);
                
                for(var j = 0 ; j < result.length ; j++) {
                    expect(result[j]).to.equal(actual[j]);
                }
            }
            
        });
        
        
        
        it('should return correct results when consecutive points are given.', function(){
            var str = '..........'; // ten points
            
            var actual = []; for(var i = 0 ; i < 10 ; i++) actual.push(128);
            
            expect(segUtil.arrToSegGroup(str, 10)).to.deep.equal(actual);
        });
    });
    
    
    
    context('#arrToSegNum', function(){
        it('should throw an error when first argument is not an array.', function(){
            var expected = [0, function(){}, new Object(), Error];
            
            for(var i = 0, len = expected.length ; i < len ; i++) {
                var item = expected[i];
                
                expect(segUtil.arrToSegNum.bind(undefined, item)).to.throw(Error, 
                    '[segutil:badarrtype] The type \''+(typeof item)+'\' is not supported.')
            }
        });
        
        it('should return appropriate segNumber if argument is right.', function(){
            var expected = [[0,0,0,0,0,0,0,0], '00000000', [1,0,1,0,1,0,1,0], '10101010', [1,1,1,0,0,1,0,0], [1,1,1,1,1,1,1,1]];
            var actual = [0, 0, 85, 85, 39, 255];
            
            for(var i = 0, len = expected.length ; i < len ; i++) {
                var item = expected[i];
                
                expect(segUtil.arrToSegNum(item)).to.equal(actual[i]);
            }
        });
    });
    
    
    context('segNumToArr', function() {
        it('should return correct results according to arguments.', function() {
            for(var i = 0 ; i < 256 ; i++) {
                
                var expected = [], actual = [];
                segUtil.segNumToArr(expected, i);
                
                var copy = i;
                for(var j = 0 ; copy ; copy = (copy/2) | 0, j++ ) {
                    if( copy%2 ) actual[j] = true;
                }
                
                expect(expected).to.deep.equal(actual);
            }
        });
    });
});