function bitAndWithBitwise() {
    return function(input, pos) {
        return input & (1 << pos);
    };
}