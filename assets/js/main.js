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

var InputArguments = [];

var CommandArary = [
    ["help", "HelpCommand", "Lists all available commands"],
    ["echo", "EchoCommand", "Echoes a word or sentence"],
    ["clear", "ClearCommand", "Clears all the text in the terminal window"]
];

//Core functions

function Search(Query, ResultColumn) {
    return CommandArary.filter(([first]) => first === Query).map(([first, ResultColumn]) => ResultColumn);
}

function QueryEntered(event) {
    event.preventDefault();

    Query = TerminalInput.value;
    InputArguments = Query.split(' ');

    var SearchResult = Search(InputArguments[0], "second");
    var TargetFunction = "";

    TerminalLogs.innerHTML = TerminalLogs.innerHTML + "<br> <span style='color:#1cdc9a;font-weight:bold;'>user@web:~$</span> " + Query;
    TerminalInput.value = "";

    if (SearchResult.length === 0) {
        TerminalLogs.innerHTML = TerminalLogs.innerHTML + "<br> Command '" + InputArguments[0] + "' not found. Type <b>help</b> to see the list of available commands.";
    }
    else {
        TargetFunction = SearchResult.toString();
        console.log(TargetFunction)
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
    CommandArary.forEach(ListCommands);
    function ListCommands(element) {
        var FilteredText = element.toString().split(',');
        TerminalLogs.innerHTML = TerminalLogs.innerHTML + "<br>" + FilteredText[0] + "______________" + FilteredText[2]
    }
}

function EchoCommand() {
    EchoedCommand = Query.replace("echo", "");
    TerminalLogs.innerHTML = TerminalLogs.innerHTML + "<br>" + EchoedCommand;
}

function ClearCommand() {
    TerminalLogs.innerHTML = "";
}
