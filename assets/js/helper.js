var HelperLogs = document.getElementById("help-log");
var HelperWindow = document.getElementById("help-window");

document.getElementById("help-next").addEventListener("click", NextHelp);
document.getElementById("help-back").addEventListener("click", LastHelp);

var HelpIndex = 0;

var HelpMessageArray = [
    ["-", "Hello! This is the helper window. In this window you will see contextual, helpful messages when you enter specific commands. </br> You can also use the Back and Next buttons to go throughout all the available short help messages."],
    ["-", "At the moment, there are no actual help commands implemented. For help visit the <a href='https://taha-mcp.github.io/terminal-wiki/'>Wiki</a>"],
    ["-", "You can contribute to this project and add short and helpful commands to this helper window. For more information, visit the <a href='https://taha-mcp.github.io/terminal-wiki/Contribution%20Guide'>contribution guide</a>."],
    ["su", "Here, you are able to use the su command freely. But on a real machine, you most likely need to enter the target user’s password before you are able to log in as them."]
];

function NextHelp() {
    if (HelpIndex < HelpMessageArray.length) {
        HelpIndex = ++HelpIndex;
        UpdateHelper();
    }
}
function LastHelp() {
    if (HelpIndex > 0) {
        HelpIndex = --HelpIndex;
        UpdateHelper();
    }
}

function SetHelperColor(color, width) {
	HelperWindow.style.borderColor = color;
	HelperWindow.style.borderWidth = width;
}

function UpdateHelper(Command) {
    var SearchResult = Search(HelpMessageArray, Command, "first", "second");

    if (SearchResult.length === 0 || Command == "-") {
        HelperLogs.innerHTML = HelpMessageArray[HelpIndex][1];
        SetHelperColor("transparent", "0px");
    }
    else {
        var HelpText = Search(HelpMessageArray, Command, "first", "second").toString();
        HelperLogs.innerHTML = HelpText.replace(Command, "<span style='color:#FF0000; font-weight:bold;'>" + Command + "</span>");
        HelpIndex = HelpMessageArray.findIndex(([keyword, HelpMessage]) => keyword === Command && HelpMessage === HelpText);
        SetHelperColor("red", "2px");
    }
}
