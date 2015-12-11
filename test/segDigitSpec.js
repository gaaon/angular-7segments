/* global
    inject: true,
    expect: true,
    angular: true
*/

describe('segDigit directive', function(){
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
    
    it('should throw an error if there is no ngModel attribute.', function(){
        var $scope = $rootScope.$new();
        
        var elStr = '<div seg-digit> </div>';
        var linkFn = $compile(elStr);
        
        $rootScope.$apply();
        
        expect(linkFn.bind(undefined, $scope)).to.throw(Error);
        
    });
    
    it('should have children in element if there is a ngModel attribute', function(){
        for(var val = 0 ; val < 256 ; val++) {
        
            var $scope = $rootScope.$new();
            
            $scope.value = i;
            
            var elStr = '<div seg-digit data-ng-model="value"> </div>';
            var el = $compile(elStr)($scope);
            $rootScope.$apply();
            
            
            var g = el.children().children().eq(1);
            expect(g.children().length).to.equal(8);
            
            var arr = segment.segNumToArr($scope.value);
            for(var i = 0, len = g.children().length ; i < len ; i++) {
                var elem = angular.element(g.children()[i]);
                
                expect(elem.hasClass('seven-seg-on')).to.equal(arr[i] ? true : false);
            }
            
            //for performance
            $scope.$destroy();
            el.remove();
        }
    });
    
    
    it('should detect change of ngModel.', function(){
        var $scope = $rootScope.$new();
        
        $scope.value = 0;
        
        var elStr = '<div seg-digit data-ng-model="value"> </div>';
        var el = $compile(elStr)($scope);
        $rootScope.$apply();
        
        var g = el.children().children().eq(1);
        
        for(var j = 1 ; j < 256 ; j++) {
            
            $scope.value = j;
            $rootScope.$apply();
            
            var arr = segment.segNumToArr($scope.value);
            for(var i = 0, len = g.children().length ; i < len ; i++) {
                var elem = angular.element(g.children()[i]);
                
                expect(elem.hasClass('seven-seg-on')).to.equal(arr[i] ? true : false);
            }
        }
        
    });
});