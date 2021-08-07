var TerminalInput = document.getElementById("form-i");
var TerminalLogs = document.getElementById("terminal-log");
var TerminalLabel = document.getElementById("form-l");
var Query = "";
var EchoedCommand = "";
var CommandIndex = 0;
var CurrentUser = "user";
var sudo = false;

document.getElementById("form-h").addEventListener("submit", QueryEntered);

TerminalInput.addEventListener('focus', TerminalFocused);
TerminalInput.addEventListener('focusout', TerminalUnfocused);

TerminalFocused();

var CommandHistory = [];

var InputArguments = [];

var CommandArary = [
    ["help", "HelpCommand", "Lists all available commands"],
    ["echo", "EchoCommand", "Echoes a word or sentence"],
    ["clear", "ClearCommand", "Clears all the text in the terminal window"],
    ["sudo", "SudoCommand", "Run a command with admin privileges"],
    ["apt", "AptCommand", "Application package manager"],
    ["su", "SuCommand", "Switch between users"]
];

//Core functions

window.onload = (event) => {
    UpdateUser();
    UpdateHelper();
};


function Search(Array, Query, SearchColumn, ResultColumn) {
    return Array.filter(([SearchColumn]) => SearchColumn === Query).map(([SearchColumn, ResultColumn]) => ResultColumn);
}

function QueryEntered(event) {
    event.preventDefault();

    Query = TerminalInput.value;
    InputArguments = Query.split(' ');

    WriteToTerminal("<br> <span style='color:#1cdc9a;font-weight:bold;'>" + CurrentUser + "@linux:~$</span> " + Query);
    TerminalInput.value = "";

    if (InputArguments[0] == "sudo") {
        sudo = true;
        InputArguments.shift();
    }
    else {
        sudo = false;
    }

    var SearchResult = Search(CommandArary, InputArguments[0], "first", "second");
    var TargetFunction = "";

    if (SearchResult.length === 0) {
        WriteToTerminal("Command '" + InputArguments[0] + "' not found. Type <b>help</b> to see the list of available commands.");
    }
    else {
        TargetFunction = Search(CommandArary, InputArguments[0], "first", "second").toString();
        window[TargetFunction]();
    }

UpdateHelper(InputArguments[0]);
CommandHistory.push(Query);
CommandIndex = CommandHistory.length;
TerminalLogs.scrollTop = TerminalLogs.scrollHeight;

}

function TerminalFocused() {
    document.addEventListener('keydown', KeyDown);
}

function TerminalUnfocused() {
    document.removeEventListener('keydown', KeyDown);
}

function KeyDown (e) {
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
            break;
        case e.ctrlKey && 'c':
            e.preventDefault();
            TerminalInput.value = "^C";
            break;
        case e.ctrlKey && 'v':
            e.preventDefault();
            TerminalInput.value = "^V";
            break;
        case e.ctrlKey && 'l':
            e.preventDefault();
            ClearCommand();
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

function WriteToTerminal(string) {
    TerminalLogs.innerHTML = TerminalLogs.innerHTML + "<br>" + string;
}

function UpdateUser() {
    TerminalLabel.innerHTML = CurrentUser + "@linux:~S";
}

//Command Functions


function HelpCommand() {
    CommandArary.forEach(ListCommands);
    function ListCommands(element) {
        var FilteredText = element.toString().split(',');
        WriteToTerminal(FilteredText[0] + "______________" + FilteredText[2]);
    }
}

function EchoCommand() {
    InputArguments.shift();
    EchoedCommand = InputArguments.toString().replace(/[,]/g, " ");
    WriteToTerminal(EchoedCommand);
}

function ClearCommand() {
    TerminalLogs.innerHTML = "";
}

function AptCommand() {
    //This doesn't work yet. Haven't figured out a nice way to do this yet.
    //Probably need to use Nested arrays
}

function SuCommand() {
    var NewUser = InputArguments[1];
    if (NewUser === undefined) {
        WriteToTerminal("Missing Arguments <br> Enter user name");
    }
    else {
        CurrentUser = NewUser;
        UpdateUser();
        WriteToTerminal("Logged in as " + NewUser);
    }
}
