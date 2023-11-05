function difficulty(currentScore){
    return Math.min(Math.min(currentScore,0),1000);
}

export { difficulty };