function difficulty(currentScore){
    return Math.max(Math.max(currentScore,0),1000);
}

export { difficulty };