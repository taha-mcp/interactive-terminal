document.getElementById("form-h").addEventListener("submit", QueryEntered);

var TerminalInput = document.getElementById("form-i");
var TerminalLogs = document.getElementById("terminal-log");
var Query = "";
var EchoedCommand = "";
var CommandIndex = 0;

TerminalInput.addEventListener('focus', TerminalFocused);
TerminalInput.addEventListener('focusout', TerminalUnfocused);

TerminalFocused();

var CommandHistory = [];

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

CommandHistory.push(Query);
CommandIndex = CommandHistory.length;
TerminalLogs.scrollTop = TerminalLogs.scrollHeight;

}

function TerminalFocused() {
    document.addEventListener('keydown', KeeDown);
}

function TerminalUnfocused() {
    document.removeEventListener('keydown', KeeDown);
}

function KeeDown (e) {
    switch (e.key) {
        case 'ArrowUp':
            //Up Arrow
            e.preventDefault();
            if (CommandIndex > 0) {
                CommandIndex = --CommandIndex;
            }
            RecallHistory();
            break;
        case 'ArrowDown':
            //Down Arrow
            e.preventDefault();
            if (CommandIndex < CommandHistory.length) {
                CommandIndex = ++CommandIndex;
            }
            RecallHistory();
    }
};

function RecallHistory() {
    if (CommandIndex == CommandHistory.length) {
        TerminalInput.value = "";
    }
    else {
        TerminalInput.value = CommandHistory[CommandIndex];
    }
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
