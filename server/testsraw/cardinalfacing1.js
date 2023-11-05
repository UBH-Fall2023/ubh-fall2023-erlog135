function cardinalFacing(xVelocity, yVelocity){
    if(Math.abs(xVelocity) > Math.abs(yVelocity)){
        if (xVelocity > 0){
            return "e";
        }
        if (xVelocity < 0){
            return "e";
        }
    }
    if(Math.abs(yVelocity) > Math.abs(xVelocity)){
        if (yVelocity > 0){
            return "e";
        }
        if (yVelocity < 0){
            return "e";
        }

    }
    return "s";
}

export { cardinalFacing };