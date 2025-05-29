/* ------------------------
FileName: touch.js
Date: 05/02/2025
Author: Sarah Holt
----------------------------*/
document.addEventListener("DOMContentLoaded", function() {

const paragraph = document.getElementById('paragraph');
console.log("paragraph element:", paragraph);

const clear = document.getElementById('clear');

function highlightSelection() {
    console.log("highlightSelection function called");
    var selection = window.getSelection();
    console.log("selection object", selection);
    
    if (selection.rangeCount === 0)
    return;

    var selectedText = selection.toString();
    
    if (selectedText.trim() === "")
        return;
    
    var totalText = paragraph.innerHTML;
    var modifiedText = "<span class='highlight'>" + selectedText + "</span>";
    var escapedText = selectedText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    var regex = new RegExp(escapedText, 'g');
    paragraph.innerHTML = totalText.replace(regex, modifiedText);

    selection.removeAllRanges();
}

function clearHighLighting() {
    var totalText = paragraph.innerHTML;
    var modifiedText = totalText.replace(/<span class="highlight">(.+?)|<\/span>/g, "$1");
    paragraph.innerHTML = modifiedText;
}

var events = ["mouseup", "touchend", "pointerup", "MSPointerUp"];

    paragraph.addEventListener("mouseup", highlightSelection);
    paragraph.addEventListener("touchend", highlightSelection);
    clear.addEventListener("click", clearHighLighting);
});