function zeroPad(number, length){
    let numstr = number.toString();
    while(numstr.length < length){
        number = "0" + numstr;
    }
    return numstr;
}

export { zeroPad }