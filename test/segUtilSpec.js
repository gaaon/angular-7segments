describe('segUtil', function(){
    var segUtil;
    
    beforeEach(function(){
        module('wo.7segments');
        
        inject(function(_segUtil_){
            segUtil = _segUtil_;
        });
    });
    
    context('#convertArrToSeg',function(){
        it('should throw an error when the first argument is not an array or string.', function(){
            var arrList = [{/*object*/}, function(){}, Error];
            
            for(var i = 0 ; i < arrList.length ; i++) {
                var item = arrList[i];
                
                expect(segUtil.convertArrToSeg.bind(null, item, 5)).to.throw(Error, 
                    '[segutil:badarrtype] The type is not supported.');
            }
            
        });
        
        
        it('should throw an error when the item of array is not an number or string.', function(){
            var arrList = [ [{/*object*/}], [function(){}], [Error] ];
        
            for(var i = 0 ; i < arrList.length ; i++) {
                var item = arrList[i];
                expect(segUtil.convertArrToSeg.bind(null, item, 5)).to.throw(Error,
                    '[segutil:baditemtype] The type is not supported.');
            }
        });
        
        
        it('should return correct results.', function() {
            var expected = ['1234567890-. ', [6, 91, 79, 102, 109, 125, 39, 127, 111, 63, 64, 128, 0]];
            
            var actual = [undefined, undefined, undefined, 6, 91, 79, 102, 109, 125, 39, 127, 111, 63, 192, 0];
            
            for(var i = 0 ; i < expected.length ; i++) {
                var item = expected[i];
                
                var result = segUtil.convertArrToSeg(item, 15);
                
                for(var j = 0 ; j < result.length ; j++) {
                    expect(result[j]).to.equal(actual[j]);
                }
            }
            
        });
        
        
        it('should return correct results when consecutive points are given.', function(){
            var str = '..........'; // ten points
            
            var actual = []; for(var i = 0 ; i < 10 ; i++) actual.push(128);
            
            expect(segUtil.convertArrToSeg(str, 10)).to.deep.equal(actual);
        });
    })
})