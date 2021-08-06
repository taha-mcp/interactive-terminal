var HelperLogs = document.getElementById("help-log");

document.getElementById("help-next").addEventListener("click", NextHelp);
document.getElementById("help-back").addEventListener("click", LastHelp);

var HelpIndex = 0;

var HelpMessageArray = [
    ["-", "Hello! This is the helper window. In this window you will see contextual, helpful messages when you enter specific commands. </br> You can also use the Back and Next buttons to go throughout all the available short help messages."],
    ["-", "At the moment, there are no actual help commands implemented. For help visit the <a href='https://taha-mcp.github.io/terminal-wiki/'>Wiki</a>"],
    ["-", "You can contribute to this project and add short and helpful commands to this helper window. For more information, visit the <a href='https://taha-mcp.github.io/terminal-wiki/Contribution%20Guide'>contribution guide</a>."]
];

function NextHelp() {
    if (HelpIndex < HelpMessageArray.length) {
        HelpIndex = ++HelpIndex;
    }
    UpdateHelper();
}
function LastHelp() {
    if (HelpIndex > 0) {
        HelpIndex = --HelpIndex;
    }
    UpdateHelper();
}

function UpdateHelper() {
    HelperLogs.innerHTML = HelpMessageArray[HelpIndex][1];
}
