function zeroPad(number, length){
    let numstr = number.toString();
    while(numstr.length < length){
        numstr = numstr + "0";
    }
    return numstr;
}

export { zeroPad };