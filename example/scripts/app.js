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
})
.controller('fifthEgCtrl', function($scope, segment){
    var copy = angular.copy(segment.defaults.group.map);
    copy['r'] = segment.arrToSegNum([0, 0, 0, 0, 1, 0, 1]);
    copy['o'] = segment.arrToSegNum([0, 0, 1, 1, 1, 0, 1]);
    copy['b'] = segment.arrToSegNum([0, 0, 1 ,1 ,1, 1, 1]);
    
    $scope.value = 'bro';
    
    $scope.options = {
        map: copy
    }
})
.controller('sixthEgCtrl', function($scope, segment) {
    var copy = angular.copy(segment.defaults.digit.points);
    
    copy[1] = "38 11, 43 6, 48 11, 48 39, 43 39, 38 34";
    copy[2] = "38 46, 43 41, 48 41, 48 69, 43 74, 38 69";
    
    copy[4] = "0 41, 5 41, 10 46, 10 69, 5 74, 0 69";
    copy[5] = "0 11, 5 6, 10 11, 10 34, 5 39, 0 39";
    
    $scope.value = '0123';
    
    $scope.digitOptions = {
        points: copy,
        height: 300,
        width: 150
    };
})
.controller('timeEgCtrl', function($scope, $interval){
    function hhmmss(date) {
        var hh = date.getHours().toString();
        var mm = (date.getMinutes()+1).toString(); // getMonth() is zero-based
        var ss  = date.getSeconds().toString();
        return (hh[1]?hh:"0"+hh[0]) + '-'+ (mm[1]?mm:"0"+mm[0]) + '-' 
            +(ss[1]?ss:"0"+ss[0]); // padding
    }
    
    $interval(function(){
        $scope.value = hhmmss(new Date());
    }, 500);
});