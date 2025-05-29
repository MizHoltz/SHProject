/*-----
FileName: AJAX.js
Date: 05/09/2025
Author: Sarah Holt 
-----*/
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("searchBtn").addEventListener("click", function() {


    const title = document.getElementById("gameInput").value.trim();
    if (title === "") 
        return;

    const url = `https://api.rawg.io/api/games?search=${encodeURIComponent(title)}&key=cc8a144ca8ad439a8e6e587e8ecaa0f1`;

    fetch(url)
    .then(response => response.json())
    .then(data => {
        const game = data.results[0];
        const result = document.getElementById("result");

        if (game) {
            result.innerHTML = `
            <h4>${game.name}</h4>
            <p><strong>Release:</strong> ${game.released}</p>
            <p><strong>Rating:</strong> ${game.rating}</p>
            <p><strong>Platforms:</strong> ${game.platforms.map(p => p.platform.name).join(", ")}</p>`;
        } else {
            result.textContent = "No game found";
        }
    })
    .catch(error => {
        console.error("Error fetching game data:", error);
    });
    });

});