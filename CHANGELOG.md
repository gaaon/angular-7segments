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