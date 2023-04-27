const APILINK = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=908d3d121803fb026aaa9f0bd02e1d2b&page=1";
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?api_key=908d3d121803fb026aaa9f0bd02e1d2b&query=";

const main = document.getElementById("movies-section");
const form = document.getElementById("form");
const search = document.getElementById("query");
const movies_grid = document.getElementById("movies-grid");

returnMovies(APILINK);

function returnMovies(url) {
    fetch(url).then(res => res.json()).then(function (data) {
        data.results.forEach(element => {
            //create Elements with class and/or id
            const div_card = document.createElement("div");
            div_card.setAttribute("class", "card");

            const div_movie = document.createElement("a");
            div_card.setAttribute("class", "movie");

            const image = document.createElement("img");
            image.setAttribute("class", "thumbnail");
            image.setAttribute("id", "image");

            const title = document.createElement("h3");
            title.setAttribute("id", "title");
            title.setAttribute("class", "movie-title");

            const reviews = document.createElement("a");
            reviews.setAttribute("class", "reviews")
            
            //append Child
            div_card.appendChild(div_movie);
            div_card.appendChild(reviews)
            div_movie.appendChild(image);
            div_movie.appendChild(title);
            movies_grid.appendChild(div_card);

            //add title, image of the movies and review page
            title.innerHTML = `${element.title}`;
            reviews.innerHTML = "Reviews";
            reviews.href = `movie.html?${element.id}&title=${element.title}`;
            image.src = IMG_PATH + element.poster_path;
        })
    }) 
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    movies_grid.innerHTML = "";

    const searchItem = search.value;

    if (searchItem) {
        returnMovies(SEARCHAPI + searchItem);
        search.value = "";
    }
});
