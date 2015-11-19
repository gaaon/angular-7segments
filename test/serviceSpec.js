describe('Seg module', function(){
    beforeEach(module('wo.7segments'));
    
    it('should have segMap.', inject(function(segMap){
        expect(segMap).not.to.be.undefined;
    }));
})