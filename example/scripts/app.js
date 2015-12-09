var app = angular.module('segment', ['wo.7segments', 'hljs'])
.directive('card', function(){
    var directiveDefinitionObject = {
        restrict: 'A',
        templateUrl: 'partials/card.html',
        scope: {
            cardTitle: '@',
            cardName: '@'
        },
        name: 'cardCtrl',
        controller: '@',
        transclude: true,
        link:function(scope, el, attr){
            scope.cardBlock = 'partials/'+scope.cardName+'Eg.html';
            scope.cardFooter = 'partials/'+scope.cardName+'EgDes.html';
        }
    }
    
    return directiveDefinitionObject;
})
.controller('firstEgCtrl', function($scope){
    $scope.value ='7SEG-1.23';
})
.controller('secondEgCtrl', function($scope){
    $scope.options = {size: 8};
    $scope.value = '.1..1 ..';
})
.controller('thirdEgCtrl', function($scope){
    $scope.value = '-_.123SEG';
    $scope.options = {size: 12, watch:true, align: 'right'};
})
.controller('fourthEgCtrl', function($scope){
    $scope.value = '12345678';
    $scope.options = {
        size: 10, 
        watch:true, 
        align: 'right'
    };
    
    $scope.digitOptions = {
        onClass: 'custom-segment-on',
        digitClass: 'custom-segment-digit segment-digit-common'
    };
});