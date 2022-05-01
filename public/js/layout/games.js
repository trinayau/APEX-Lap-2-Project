//show new games toggle
const newGameButton = document.getElementById("addNewGame");
const gameDiv = document.getElementById("gameDiv");

function toggleGameDiv() {
  if (gameDiv.style.display === "none") {
    gameDiv.style.display = "block";
  } else {
    gameDiv.style.display = "none";
  }
}

//Fetch games for user
const token = document.cookie;
//decode jwt token in local storage
function parseJwt(token) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}
const decodedId = parseJwt(token).id;

//find games from user
async function showGames(decodedId) {
  try {
    const getGames = await fetch(`http://localhost:3000/users/${decodedId}`);
    const response = await getGames.json();
    getGames.forEach((game) => {});
  } catch (err) {
    console.log(err);
  }
}

//make post request to searchroutes, /search/ to fetch games, then add element 'add game button'

//submit game
document.querySelector("form").addEventListener('submit', async(e) => {
    e.preventDefault();
    const selectedGame = document.querySelector('button[class="selected"] img');
    console.log(selectedGame.getAttribute('data-gamename'));

  let game = "";
  let gameName ="";
  if (selectedGame) {
    game = selectedGame.getAttribute("id");
    gameName = selectedGame.getAttribute('data-gamename')
    gameName.toUpperCase();
  } else {
    var p = document.createElement("p");
    const searchDiv = document.getElementById("searchDiv")
    p.appendChild(document.createTextNode("Please select a game!"));
    searchDiv.append(p);
  }
  const newGame = {
    gameId: game,
    gameName: gameName
}
try {
  const options = {
      method: 'POST',
      header: { "Content-Type": "application/json" },
      body: JSON.stringify(newGame)
  }
  const r = await fetch(`${window.location.origin}/games`, options)
  window.location.reload()
    } catch (err) {
  console.log(err)
    }
})  


//search for games
document.getElementById("searchBtn").addEventListener("click", searchGame)
function searchGame(e) {
  e.preventDefault();
  let query = document.getElementById("gameInput").value.trim();
  let sectionToAppend = document.getElementById("resultDiv");
  sectionToAppend.innerHTML="";

  try {
    const options = {
      method: "POST",
      header: { "Content-Type": "application/json" },
      body: JSON.stringify(query),
    };
    fetch(`${window.location.origin}/search`, options)
      .then(function (response) {
        if (!response.ok) {
          throw new Error("HTTP error, status = " + response.status);
        }
        return response.json();
      })
      .then(function (json) {
        sectionToAppend.style.display = "flex";

        for (var i = 0; i < json.length; i++) {
          let imgPath = json[i].cover.url;
          imgPath = imgPath.replace("thumb", "logo_med");
          imgPath = "https:" + imgPath;
          let img = document.createElement("img");
          img.id = json[i].id;
          let imgButton = document.createElement("button");
          imgButton.id = `imgBtn${json[i].id}`;
          let id = imgButton.id;
          imgButton.classList.add("removeBorder");
          imgButton.addEventListener("click", (e) => {
            e.preventDefault();
            changeBorder(id, json);
          });
          img.setAttribute("src", imgPath);
          img.setAttribute("data-gamename", json[i].name)
          imgButton.append(img);
          sectionToAppend.append(imgButton);
          let submitButton = document.createElement("button")
          submitButton.id = 'submitBtn'
          submitButton.value = 'Add Game'
          sectionToAppend.append(submitButton);
          // console.log(imgPath);
        }
      })
      .catch(function (error) {
        var p = document.createElement("p");
        const searchDiv = document.getElementById("searchDiv")
        p.appendChild(document.createTextNode("Error: " + error.message));
        searchDiv.append(p);
      });
    // window.location.reload()
  } catch (err) {
    console.log(err);
  }
};

function changeBorder(id, json) {
    for (let i = 0; i < json.length; i++) {
      let resetButton = document.getElementById(`imgBtn${json[i].id}`);
      console.log(resetButton)
      resetButton.classList.remove("selected");
      resetButton.classList.add("removeBorder");
    }
    let selected = document.getElementById(id);
    selected.classList.remove("removeBorder");
    selected.classList.add("selected");
  }

