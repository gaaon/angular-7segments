<a name="0.2.0"></a>
# 0.2.0 (2015-12-15)

## Features
- **segmentProvider:** Contain segMap and shapes of each segment part as a default config
- **angular:** Support angular version 1.5.0-rc.0

## Breaking Changes
- **segGroup:**
    - Move properties 'height', 'width' from 'segOptions' attr to 'segDigitOptions' attr
    - Modify a mechanism to match a pattern
    - Therefore, be able to set custom segment patterns

- **segDigit:** 
    - Delete \<defs> and \<use> tags in the digit template. Replace them with ng-repeat of \<polyline>
    - Modify a mechanism to render a digit
    - Therefore, be able to set custom segment shape

- **segMap:** Depressed

<a name="0.1.0"></a>
# 0.1.0 (2015-12-09)

## Breaking changes
- **segUtil:** Depressed
- **segmentProvider:** 
    - Contain methods of segUtil
    - Hold default configs for segment-group and segment-digit
    - Modify default configs wherever you want

- **segGroup:**
    - Accept attribute 'seg-digit-options' to be passed segDigit

- **segDigit:**
    - Allow to set 'digit-class' and 'on-class' by inserting 'seg-digit-options' at segGroup directive
    - Set background-color, light-off part color with 'digit-class'
    - Set light-on part color with 'on-class'