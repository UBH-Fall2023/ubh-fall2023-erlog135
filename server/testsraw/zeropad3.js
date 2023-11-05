function zeroPad(number, length){
    let numstr = number.toString();
    while(number < length){
        numstr = "0" + numstr;
    }
    return numstr;
}

export { zeroPad }