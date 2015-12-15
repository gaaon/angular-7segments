# angular-7segments
[![Build Status](https://travis-ci.org/Wooooo/angular-7segments.svg?branch=master)](https://travis-ci.org/Wooooo/angular-7segments)
[![Coverage Status](https://coveralls.io/repos/Wooooo/angular-7segments/badge.svg?branch=master&service=github)](https://coveralls.io/github/Wooooo/angular-7segments?branch=master)
[![Npm Version](https://img.shields.io/npm/v/angular-7segments.svg)](https://npmjs.org/wooooo/angular-7segments)
[![Npm License](https://img.shields.io/npm/l/angular-7segments.svg)](https://npmjs.org/wooooo/angular-7segments)

Angular plugin for displaying 7segments

<a name="usage"></a>
## Usage
npm
```
npm install angular-7segments
```

bower
```
bower install angular-7segments --save
```

browser
```html
<!DOCTYPE html>
<html data-ng-app="demoApp">
    <head>
        ...
    </head>
    
    <body>
        ...
        
        <script src="path/to/bower_components/angular/angular.js"></script>
        <script src="path/to/bower_components/angular-7segments/angular-7segments.js"></script>
        
        <script>
            var app = angular.module('demoApp', ['wo.7segments']);
        </script>
    </body>
</html>
```


<a name="example"></a>
## Example
Live [example](http://wooooo.github.io/angular-7segments)

### Basic
```javascript
//app.js
app.controller('basicCtrl', function($scope){
    $scope.value = '0123456789';
});
```

```html
<!--index.html-->
<div data-ng-controller="basicCtrl">
    <div seg-group data-ng-model="value"> </div> 
    <!-- [0][1][2][3][4][5][6][7][8][9] -->
</div>
```

### Dot
- Dot has some exceptions because try to reflect real seven digits.
- Basically, dot doesn't reside in one distinct digit.
    - eg) 12.34 --> [1][2.][3][4]

- However, under the below conditions, it holds one digit.
    - Dot is the first character.
        - eg) .1234 --> [.][1][2][3][4]
    
    - Dot's left character is a dot.
        - eg) 1... --> [1.][.][.]
    
    - Dot's left character is a space.
        - eg) 12 .45 --> [1][2][.][4][5]


### Supported characters
- number
- alphabet: 'SEG' ( It has a relation with module name :) )
- special character: hyphen(-), lodash(_), dot(.), space( )


### Options
```javascript
app.controller('optCtrl', function($scope){
    $scope.value = '_-SEG.0123';
    $scope.options = {
        size: 15,
        align: 'left',
        watch: true,
        
    };
```

```html
<div data-ng-controller="basicCtrl">
    <div seg-group seg-options="options" data-ng-model="value"> </div> 
    <!-- [_][-][S][E][G.][0][1][2][3][ ][ ][ ][ ][ ][ ]-->
</div>
```

### Custom style
```javascript
app.controlller('styleCtrl', function($scope){
    $scope.value = '12345678';
    $scope.digitOptions = {
        onClass: 'custom-on-class',         // class name for light-on part
        digitClass: 'custom-digit-class'    // class name for entire digit
    };
);
```

```css
.custom-on-class {
    fill: black;
}

.custom-digit-class {
    fill: #ddd;
    background-color: white;
}
```

```html
<div data-ng-controller="basicCtrl">
    <div seg-group seg-options="options" data-ng-model="value"
        seg-digit-options="digitOptions"> </div> 
    <!-- [1][2][3][4][5]6][7][8] -->
    <!-- background color is white and light-on part color is black -->
</div>
```

### Custom pattern
Allow to add custom segment pattern by inserting it into segMap
```javascript
app.controller('patternCtrl', function($scope, segment){
    var copy = angular.copy(segment.defaults.group.map);
    copy['r'] = segment.arrToSegNum([0, 0, 0, 0, 1, 0, 1]);
    copy['o'] = segment.arrToSegNum([0, 0, 1, 1, 1, 0, 1]);
    copy['b'] = segment.arrToSegNum([0, 0, 1 ,1 ,1, 1, 1]);
    
    $scope.value = 'bro';
    
    $scope.options = {
        map: copy
    }
});
```

```html
<div data-ng-controller="patternCtrl">
    <div seg-group data-ng-model="value" seg-options="options"></div>
    <!-- [r][o][b] -->
    <!-- They are not provided basically -->
</div>
```
### Custom shape
Allow to modify segment part coordinates by updating segPoints
```javascript
app.controller('shapeCtrl', function($scope, segment) {
    var copy = angular.copy(segment.defaults.digit.points);
    
    copy[1] = "38 11, 43 6, 48 11, 48 39, 43 39, 38 34";
    copy[2] = "38 46, 43 41, 48 41, 48 69, 43 74, 38 69";
    
    copy[4] = "0 41, 5 41, 10 46, 10 69, 5 74, 0 69";
    copy[5] = "0 11, 5 6, 10 11, 10 34, 5 39, 0 39";
    
    $scope.value = '0123';
    
    $scope.digitOptions = {
        points: copy
    };
});
```

```html
<div data-ng-controller="shapeCtrl">
    <div seg-group data-ng-model="value" seg-digit-options="digitOptions"></div>
    <!-- [0][1][2][3] -->
    <!-- It has right angle at middle part -->
</div>
```
<a name="license"> </a>
## LICENSE
[MIT](LICENSE)