/* ------------------------
FileName: state.js
Date: 04/24/2025
Author: Sarah Holt
----------------------------*/
// Settings when the page loads
window.onload = function() {
    cookieSettings();
     document.getElementById("smallBtn").addEventListener("click", function() {
         settings("80%", "black", "grey", "black");
     });
     document.getElementById("mediumBtn").addEventListener("click", function() {
         settings("100%", "black", "grey", "black");
     });
     document.getElementById("largeBtn").addEventListener("click", function() {
         settings("125%", "black", "grey", "black");
     });
 }
function cookieValue(searchName) {
    var cookieName;
    var eachCookie;

    if(document.cookie) {
        var storedCookie = decodeURIComponent(document.cookie);
        var storedCookieArray = storedCookie.split("; ");

        for (var count = 0; count < storedCookieArray.length; ++count) {
            eachCookie = storedCookieArray[count];

            cookieName = eachCookie.substring(0, eachCookie.indexOf("="))
            if (cookieName === searchName) {
                cookieValue = eachCookie.substring(eachCookie.indexOf("=") + 1)
                return cookieValue;
            }
        }
    } else {
        //alert("There are no cookies");
    }
}

// Function to write the cookie value
function createCookie(size, small, medium, large) {
    var expiration = new Date();
    expiration.setTime(expiration.getTime() + (30 * 24 * 60 * 60 * 1000));

    var cookieData = `${size},${small},${medium},${large}`;
    document.cookie = `userSettings=${encodeURIComponent(cookieData)}; expires=${expiration.toUTCString()}; path=/`;
}

// Cookie settings to the page
function cookieSettings() {
    const settings = cookieValue("userSettings");

    if (settings) {
        const [size, smallColor, mediumColor, largeColor] = settings.split(",");
        document.querySelector("main").style.fontSize = size;
        document.getElementById("smallBtn").style.color = smallColor;
        document.getElementById("mediumBtn").style.color = mediumColor;
        document.getElementById("largeBtn").style.color = largeColor;
    } else {
        document.querySelector("main").style.fontSize = "100%";
        document.getElementById("smallBtn").style.color = "black";
        document.getElementById("mediumBtn").style.color = "black";
        document.getElementById("largeBtn").style.color = "black";
    }
}

function settings(size, small, medium, large) {
    document.querySelector("main").style.fontSize = size;
    document.getElementById("smallBtn").style.color = small;
    document.getElementById("mediumBtn").style.color = medium;
    document.getElementById("largeBtn").style.color = large;

    createCookie(size, small, medium, large);
}
