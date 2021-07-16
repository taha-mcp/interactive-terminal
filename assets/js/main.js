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

//Core functions

function Search(term) {
    return CommandArary.filter(([first]) => first === term).map(([first, ...rest]) => rest);
}

function QueryEntered(event) {
    event.preventDefault();

    Query = TerminalInput.value;

    var Command = Query.replace(/ .*/,'');

    var SearchResult = Search(Command);
    var TargetFunction = "";

    TerminalLogs.innerHTML = TerminalLogs.innerHTML + "<br> <span style='color:#1cdc9a;font-weight:bold;'>user@web:~$</span> " + Query;
    TerminalInput.value = "";

    if (SearchResult.length === 0) {
        TerminalLogs.innerHTML = TerminalLogs.innerHTML + "<br> Command '" + Command + "' not found. Type <b>help</b> to see the list of available commands.";
    }
    else {
        TargetFunction = SearchResult.toString();
        window[TargetFunction]();
    }

TerminalLogs.scrollTop = TerminalLogs.scrollHeight;
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
