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

let originalPuzzleText = "";
let currentPuzzle = {};

let description = document.getElementById("description");
let nicknameInput = document.getElementById("nicknameInput");
let resetButton = document.getElementById("resetButton");
let submitButton = document.getElementById("submitButton");
let editorElement = document.getElementById("editor");
let winnerBanner = document.getElementById("winnerBanner");
let winnerText = document.getElementById("winnerText");

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
    resetButton.disabled = true;
    resetButton.hidden = true;
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
    

    nicknameInput.hidden = true;
    editorElement.hidden = false;

    for(const player of playersToAdd){
        editor.moveCursorTo(Math.round(Math.random()*10),Math.round(Math.random()*50));
        editor.insert(player);
    }
    
}

async function onGameStart(){
    if(game_state == IN_LOBBY){

        game_state == IN_COUNTDOWN;
        submitButton.innerText = "Submit";
        submitButton.disabled = true;

        editorElement.classList.replace("bg-glow-ambient","bg-glow-focus");
        editor.session.setValue("Ready...");
        await wait(1000);
        editor.session.setValue("Get set...");
        await wait(1000);
        editor.session.setValue("GO!");
        await wait(1000);
        editor.session.setValue("");


        submitButton.disabled = false;
        resetButton.disabled = false;
        resetButton.hidden = false;

        game_state = IN_GAME;
        displayPuzzle();
        editorElement.classList.replace("bg-glow-focus","bg-glow-ambient");
    }
}

async function onGameEnd(winnerName){
    game_state = GAME_END;
    winnerBanner.style.display = "block";
    winnerText.innerText = winnerName + " wins!!!"
    await wait(4000);
    winnerBanner.style.display = "none";
    onLobbyJoined();
}

function displayPuzzle(){
    if(game_state === IN_GAME){
        console.log(currentPuzzle);
        description.innerText = currentPuzzle["description"];
        editor.session.setValue(originalPuzzleText);
        editor.setReadOnly(false);
    }
}


function onResetButtonClicked(){
    if(game_state === IN_GAME){
        editor.session.setValue(originalPuzzleText);
    }
}

function onSubmitButtonClicked(){
    console.log("submit clicked");
    if (game_state === BEFORE_LOBBY && nicknameInput.value.length >= 1 && nicknameInput.value.length <= 16) {
        nickname = nicknameInput.value;
        socket.emit("nick-name",nickname);
        onLobbyJoined();
    }else if(game_state === IN_LOBBY && chosenOne){
        onGameStart();
        socket.emit("start-game");
    }else if(game_state === IN_GAME){
        let userSolution = editor.session.getValue()+currentPuzzle["footer"];
        console.log(userSolution);
        socket.emit("submit", userSolution);
    }
}


socket.on("new-puzzle", (puzzle)=>{
    console.log(puzzle);
    let lines = puzzle["code"].split("\n");

    puzzle["footer"] = lines.pop();
    while(puzzle["footer"] === ""){
        puzzle["footer"] = lines.pop();
    }

    let code = "";

    for (const line in lines) {
        lines[line] = lines[line]+"\n";
        code += lines[line];
    }
    puzzle["code"] = code;
    currentPuzzle = puzzle;
    originalPuzzleText = puzzle["code"];
    if(game_state === IN_GAME){
        displayPuzzle();
    }
});

socket.on("game-start", (args)=>{
    onGameStart();
});

socket.on("failed-puzzle", async (args)=>{
    editorElement.classList.replace("bg-glow-ambient","bg-glow-error");
    submitButton.disabled = true;
    submitButton.innerText = "Failed!";
    await wait(1000);
    editorElement.classList.replace("bg-glow-error","bg-glow-ambient");
    submitButton.disabled = false;
    submitButton.innerText = "Submit";
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

socket.on("game-end", (player)=>{
    //player 's name won!
    onGameEnd(players[player]);
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
