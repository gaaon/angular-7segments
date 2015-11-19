/**
 * @ngdoc directive
 * 
 * @name wo.7segments.directive:segDigit
 * @strict 'E'
 * 
 */
 
function segDigitDirective(){ /*jshint ignore:line*/
    var directiveDefinitionObject = {
        strict: 'E',
        scope: {
            'segVal': '=',
        },
        templateUrl: 'digit.html',
        link: function(scope, el, attr) {
            
            function change(val, oldVal) {
                var pos = 1;
                val = val || 0;
                
                var xor = oldVal == void 0 ? val : (val ^ oldVal);
                
                for(var i = 0 ; i < 8 ; pos = pos << 1, i++) {
                    if( pos & xor ) {
                        scope.segClass[i] = (pos & val) ? on : off;
                    }
                }
            }
            
            var on = 'seven-seg-on', off = '';
            
            scope.segClass = [];
            
            scope.$watch('segVal', change);
            
            change(scope.segVal);
        }
    };
    
    return directiveDefinitionObject;
}