function difficulty(currentScore){
    return Math.max(Math.min(currentScore,0),1000);
}

export { difficulty };