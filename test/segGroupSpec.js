describe('segGroup', function(){
    var $rootScope, $compile;
    
    beforeEach(function(){
        module('wo.7segments');
        
        inject(function(_$rootScope_, _$compile_){
            $rootScope = _$rootScope_;
            $compile = _$compile_;
        });
    });
    
    
    
    it('should throw an error if ngModel is not provided.', function() {
        var $scope = $rootScope.$new();
        
        var elStr = '<div seg-group></div>';
        
        var linkFn = $compile(elStr);
        $rootScope.$apply();
        
        expect(linkFn.bind(null, $scope)).to.throw(Error);
    });
    
    
    
    it('should have children with number of "segOptions.size" attribute.', function(){
        var $scope = $rootScope.$new();
        var size = 6;
        
        $scope.options = {size: size};
        $scope.value = '';
        
        var elStr = '<div seg-group seg-options="options" data-ng-model="value"> </div>';
        
        var el = $compile(elStr)($scope);
        $rootScope.$apply();
        
        expect(el.children().length).to.be.equal(size);
        
    });
    
    
    it('should have childen with number of "segArr" attribute\'s length if segOptions.size is not given.', function(){
        var $scope = $rootScope.$new();
        
        $scope.value = '123456';
        
        var elStr = '<div seg-group seg-options="options" data-ng-model="value"> </div>';
        
        var el = $compile(elStr)($scope);
        $rootScope.$apply();
        
        expect(el.children().length).to.be.equal($scope.value.length);
    })
});