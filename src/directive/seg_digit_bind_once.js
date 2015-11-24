function segDigitBindOnceDirective(segUtil){
    var directiveDefinitionObject = {
        strict: 'E',
        scope: {
            'segVal': '@'
        },
        templateUrl: 'digit.html'
    };
    
    return directiveDefinitionObject;
}