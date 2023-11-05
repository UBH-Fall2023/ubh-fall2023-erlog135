function cardinalFacing(xVelocity, yVelocity){
    if(Math.abs(xVelocity > yVelocity)){
        if (xVelocity > 0){
            return "e";
        }
        if (xVelocity < 0){
            return "w";
        }
    }
    if(Math.abs(yVelocity > xVelocity)){
        if (yVelocity > 0){
            return "s";
        }
        if (yVelocity < 0){
            return "n";
        }

    }
    return "s";
}

export { cardinalFacing };