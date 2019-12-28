const arr = [
    ["Toy Story 4", "Green Book", "The Farewell", "Thor: Ragnarok"],
    ["The Shawshank Redemption", "The Dark Knight", "Super 30", "The Lion King"],
    ["Avengers: Endgame", "Avengers: Infinity War", "Spider-Man: Into the Spider-Verse", "Spider-Man: Far from Home"],
    ["A Star Is Born", "Aladdin", "Five Feet Apart", "Long Shot"],
    ["The Dark Knight", "Avengers: Endgame", "Avengers: Infinity War", "Spider-Man: Into the Spider-Verse"],
    ["Green Book", "Bohemian Rhapsody", "Rocketman", "Skin"],
    ["Midsommar", "It", "Hereditary", "Us"],
    ["Midsommar", "Hereditary", "Us", "Annabelle Comes Home"]
];
//Objeto película
let dataMoodie = {};
//Array de películas según mood selecionado del usuario
let moodSelected = [];
//Obteniendo todos los botones
const selection = document.getElementsByClassName("mood");
//Recorriendo botones para obtener el valor del seleccionado por el usuario
//para indicar que genero de película
for (let i = 0; i < selection.length; i++) {
    selection[i].addEventListener("click", () => {
        document.getElementById("container2").style.display="none";
        document.getElementById("container").style.display="block";
        let selected = selection[i].value;
        let arrSelected = arr[selected];
        moodSelected = [];
        movies(arrSelected);
    })
}
//Recorrer titulos de películas para darlos como parametro en la función callData
const movies = (arrSelected) => {
    for (let i = 0; i < arrSelected.length; i++) {
        callData(arrSelected[i]);
        }
    }
//Obtener info de la data
const callData = (title) => {
    fetch("http://www.omdbapi.com/?t=" + title + "&apikey=e4c05895")
    .then(res => res.json())
    .then(data => {
        dataMoodie = {
            poster: data.Poster,
            title: data.Title,
            year: data.Year,
            country: data.Country,
            plot: data.Plot,
            released: data.Released,
            director: data.Director,
            actors: data.Actors,
            awards: data.Awards,
            genre: data.Genre,
            runTime: data.Runtime
        };
        moodSelected.push(dataMoodie);
        show(moodSelected);
    })
}
//Crear contenedor y contenido para cada peliculaa través de HTML dinamico
const moodieCard = (movie) => {
    let card = document.createElement("div");
    card.className = "moodieCard";
    let allInfo = document.createElement("div");
    allInfo.className = "allInfo";
    let titleCard = document.createElement("h2");
    titleCard.textContent = `${movie.title} (${movie.year})`;
    let onlyImg = document.createElement("div");
    onlyImg.className = "onlyImg";
    let imgCard = document.createElement("img");
    imgCard.src = movie.poster;
    let runTime = document.createElement("h4");
    runTime.textContent = `Its run-time is: ${movie.runTime}`;
    let actors = document.createElement("h4");
    actors.textContent = `Actors:  ${movie.actors}`;
    let director = document.createElement("h4");
    director.textContent = `Director:  ${movie.director}`;
    let genre = document.createElement("h4")
    genre.textContent = `Genre:  ${movie.genre}`;
    let plot = document.createElement("p");
    plot.textContent = movie.plot;
    onlyImg.appendChild(imgCard);
    allInfo.appendChild(titleCard);
    allInfo.appendChild(director);
    allInfo.appendChild(actors);
    allInfo.appendChild(genre);
    allInfo.appendChild(runTime);
    allInfo.appendChild(plot);
    card.appendChild(onlyImg);
    card.appendChild(allInfo);
    document.getElementById("container").appendChild(card).innerHTML;
}
//Mostrar peliculas una a una
const show = (moodies) => {
    document.getElementById("container").innerHTML = "";
    moodies.forEach(element => {
        return moodieCard(element);
    });
}
//Buscador
const search = document.getElementById("search");
search.addEventListener("keyup", () => {
    //Valor del string ingresado por el usuario
    let enterSearch = search.value;
    //Dar el valor ingresado a la URL para encontrar coincidencias
    fetch(`http://www.omdbapi.com/?apikey=e4c05895&s=${enterSearch}`)
    .then(res => res.json())
    .then(data => {
        if (data.Response !== "False") {
            document.getElementById("container2").style.display="none";
            document.getElementById("container").style.display="block";
            document.getElementById("container").innerHTML = "";
          for (let i = 0; i < data.Search.length; i++) {
              fetch("http://www.omdbapi.com/?apikey=e4c05895&i="+encodeURI(data.Search[i].imdbID))
              .then(secondRes => secondRes.json())
              .then(secondData => {
                  if (secondData.Type === "movie") {
                      let card = document.createElement("div");
                      card.className = "moodieCard";
                      let allInfo = document.createElement("div");
                      allInfo.className = "allInfo";
                      let titleCard = document.createElement("h2");
                      titleCard.textContent = `${secondData.Title} (${secondData.Year})`;
                      let onlyImg = document.createElement("div");
                      onlyImg.className = "onlyImg";
                      let imgCard = document.createElement("img");
                      imgCard.src = secondData.Poster;
                      let runTime = document.createElement("h4");
                      runTime.textContent = `Its run-time is: ${secondData.Runtime}`;
                      let actors = document.createElement("h4");
                      actors.textContent = `Actors:  ${secondData.Actors}`;
                      let type = document.createElement("h4");
                      type.textContent = `Type:  ${secondData.Type}`;
                      let genre = document.createElement("h4");
                      genre.textContent = `Genre:  ${secondData.Genre}`;
                      let plot = document.createElement("p");
                      plot.textContent = secondData.Plot;
                      onlyImg.appendChild(imgCard);
                      allInfo.appendChild(titleCard);
                      allInfo.appendChild(type);
                      allInfo.appendChild(actors);
                      allInfo.appendChild(genre);
                      allInfo.appendChild(runTime);
                      allInfo.appendChild(plot);
                      card.appendChild(onlyImg);
                      card.appendChild(allInfo);
                      document.getElementById("container").appendChild(card).innerHTML;
                    } else if (enterSearch == "") {
                        document.getElementById("container2").style.display= "block";
                    }
                })
            }
        }}).catch(error => console.error(error))
})
document.getElementById("login").addEventListener("click", ()=>{
    document.getElementById("container").style.display = "none";
    document.getElementById("container2").style.display = "none";
    document.getElementById("login-container").style.display = "block";


});
