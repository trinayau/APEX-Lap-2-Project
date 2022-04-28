//show new games toggle
const newGameButton = document.getElementById("addNewGame");
const gameDiv = document.getElementById("gameDiv")

function toggleGameDiv() {
    
    if (gameDiv.style.display === "none"){
        gameDiv.style.display="block";
    }  else {
        gameDiv.style.display = "none";
    }
}

//Fetch games for user
const token = document.cookie;
//decode jwt token in local storage
function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};
const decodedId = parseJwt(token).id;

//find games from user
async function showGames(decodedId) {
    try {const getGames = await fetch(`http://localhost:3000/users/${decodedId}`);
    const response = await getGames.json()
    getGames.forEach(game => {
        
    })
} catch(err) {
    console.log(err)
}
}

/* <div class="habits content">
            <h2>Habits</h2>
            <% if (user.username.habits.length > 0) { %> 
                <% habits.forEach(habit => { %>
                <h3 class="habit-title"><%= habit.habitName %></h3>
                <p class="snippet"><%= habit.habitReps %>/<%=habit.habitMaxReps%> Complete: <%= habit.habitComplete %> Streak: <%=habit.habitStreak %></p>
                <% }) %>
             <% } else { %>
                <p>There are no habits to display</p>
                <% } %>
        </div> */

//get(user), if(user.games), show games, else: display No games, please select a game above!

{/* 
  */}
