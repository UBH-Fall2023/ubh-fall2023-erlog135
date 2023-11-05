let editor = ace.edit("editor", {
    mode: "ace/mode/javascript",
    theme: "ace/theme/cobalt",
    showGutter: false,
    fontSize: 24,
});

const BEFORE_LOBBY = 0;
const IN_LOBBY = 1;
const IN_COUNTDOWN = 2;
const IN_GAME = 3;
const GAME_END = 4;

let game_state = BEFORE_LOBBY;
let chosenOne = true;

let puzzle = 0;

let description = document.getElementById("description");
let nicknameInput = document.getElementById("nicknameInput");
let resetButton = document.getElementById("resetButton");
let submitButton = document.getElementById("submitButton");

let nickname = "";

const socket = io(window.location.host,{
    extraHeaders:{
        room:window.location.href.substring(window.location.href.length-4,window.location.href.length)
    }
});

let players = {};

let playersToAdd = [];

//console.log(socket);

function onRoomJoined(){
    description.innerText = "Enter your nickname and press Join."
    resetButton.ariaDisabled = true;
    resetButton.style.display = "none";
    submitButton.innerText = "Join";
}

onRoomJoined();

async function onLobbyJoined(){
    game_state = IN_LOBBY;

    const response = await fetch('/blank.txt');
    const text = await response.text();

    editor.session.setValue(text);
    editor.setReadOnly(true);
   
    description.innerText = "Welcome, "+nickname+"!"

    if(chosenOne){
        submitButton.innerText = "Start";
        submitButton.disabled = false;
    }else{
        submitButton.innerText = "Waiting...";
        submitButton.disabled = true;
    }
    

    nicknameInput.style.display = "none";
    document.getElementById("editor").style.display = "block";

    for(const player of playersToAdd){
        editor.moveCursorTo(Math.round(Math.random()*10),Math.round(Math.random()*50));
        editor.insert(player);
    }
    
}

async function onGameStart(){
    game_state == IN_COUNTDOWN;
    submitButton.innerText = "Submit";
    submitButton.disabled = true;
    editor.session.setValue("Ready...");
    await wait(1000);
    editor.session.setValue("Get set...");
    await wait(1000);
    editor.session.setValue("GO!");
    await wait(1000);
    editor.session.setValue("");
    submitButton.disabled = false;
    game_state = IN_GAME;

}



function onResetButtonClicked(){
    console.log("reset clicked");
}

function onSubmitButtonClicked(){
    console.log("submit clicked");
    if (game_state === BEFORE_LOBBY && nicknameInput.value.length >= 1 && nicknameInput.value.length <= 16) {
        nickname = nicknameInput.value;
        socket.emit("nick-name",nickname);
        onLobbyJoined();
    }else if(game_state === IN_LOBBY && chosenOne){
        onGameStart();
        socket.emit("game-start");
    }else if(game_state === IN_GAME){
        socket.emit("submit", userSolution);
    }
}


socket.on("new-puzzle", (args)=>{

});

socket.on("game-start", (args)=>{

});

socket.on("players", (newPlayers)=>{

    for(const id in newPlayers){
        if(!players.hasOwnProperty(id)){
            playersToAdd.push(newPlayers[id]);
        }
    }
    if(game_state === IN_LOBBY){
        for (const name of playersToAdd) {
            editor.moveCursorTo(Math.round(Math.random()*10),Math.round(Math.random()*50));
            editor.insert(name);
        }
    }
    players = newPlayers;
    console.log(newPlayers);
});

socket.on("player-leave", (args)=>{

});

socket.on("game-end", (args)=>{

});

socket.on("chosen-one", (args)=>{
    chosenOne = true;
    if(game_state === IN_LOBBY){
        submitButton.innerText = "Start";
        submitButton.disabled = false;
    }
});

socket.on("failed-connect", (args)=>{
    window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
});

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
