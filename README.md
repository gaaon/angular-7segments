# angular-7segments
Angular plugin for displaying 7segments

[![Build Status](https://travis-ci.org/Wooooo/angular-7segments.svg?branch=master)](https://travis-ci.org/Wooooo/angular-7segments)
[![Coverage Status](https://coveralls.io/repos/Wooooo/angular-7segments/badge.svg?branch=master&service=github)](https://coveralls.io/github/Wooooo/angular-7segments?branch=master)
[![Npm Version](https://img.shields.io/npm/v/angular-7segments.svg)](https://npmjs.org/wooooo/angular-7segments)
[![Npm License](https://img.shields.io/npm/l/angular-7segments.svg)](https://npmjs.org/wooooo/angular-7segments)

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


<a name="license"> </a>
## LICENSE
[MIT](LICENSE)