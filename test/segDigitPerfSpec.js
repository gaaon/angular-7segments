describe.skip('segDigitPerf', function(){
    var $compile, $rootScope, segment, tempEl;
    
    beforeEach(function() { 
        module('wo.7segments');
    
        inject(function(_$compile_, _$rootScope_, _segment_){
            $compile = _$compile_;
            $rootScope = _$rootScope_;
            segment = _segment_;
        });
        
        tempEl = document.createElement('div');
        
        document.querySelector('body').appendChild(tempEl);
    });
    
    afterEach(function(){
        $rootScope.$apply();
    
        document.querySelector('body').removeChild(tempEl);
    });
    
    it('should detect the change.', function(){
        var $scope = $rootScope.$new();
        
        $scope.value = 0;
        
        var elStr = '<div seg-digit data-ng-model="value"> </div>';
        
        var el = $compile(elStr)($scope);
        $rootScope.$apply();
        
        tempEl.appendChild(el[0]);
        
        for(var i = 1 ; i < 19 ; i++) {
            $scope.value = i;
            $rootScope.$apply();
        }
    });
});