document.getElementById("form-h").addEventListener("submit", QueryEntered);

var TerminalInput = document.getElementById("form-i");
var TerminalLogs = document.getElementById("terminal-log");
var Query = "";
var EchoedCommand = "";

var CommandArary = [
    ["help", "HelpCommand"],
    ["echo", "EchoCommand"],
    ["clear", "ClearCommand"]
];

function QueryEntered(event) {
    event.preventDefault();

    var Searchresult = [];
    var TargetFunction = "";

    Query = TerminalInput.value;

    var Command = Query.replace(/ .*/,'');

    TerminalLogs.innerHTML = TerminalLogs.innerHTML + "<br> <b>user@web:~$</b> " + Query;
    TerminalInput.value = "";
    CommandArary.forEach(e => {
        if (e[0] == Command) {
            Searchresult.push(e.slice(1));
            TargetFunction = Searchresult.toString();
            window[TargetFunction]();
        }
    });
}

//Command Functions

function HelpCommand() {
    TerminalLogs.innerHTML = TerminalLogs.innerHTML + "<br> TODO: Write commands here";
}

function EchoCommand() {
    EchoedCommand = Query.replace("echo", "");
    TerminalLogs.innerHTML = TerminalLogs.innerHTML + "<br>" + EchoedCommand;
}

function ClearCommand() {
    TerminalLogs.innerHTML = "";
}
