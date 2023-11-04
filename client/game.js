let editor = ace.edit("editor", {
    mode: "ace/mode/javascript",
    theme: "ace/theme/cobalt",
    showGutter: false,
    fontSize: 24,
});

console.log(editor);

function onResetButtonClicked(){
    console.log("reset clicked");
}

function onSubmitButtonClicked(){
    console.log("submit clicked");
}