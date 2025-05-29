/*-----
FileName: jQuery.js
Date: 05/05/2025
Author: Sarah Holt 
-----*/
$(function () {
    $("#todo, #done").sortable({
        connectWith: "ul",
        placeholder: "ui-state-highlight"
    }).disableSelection();
});