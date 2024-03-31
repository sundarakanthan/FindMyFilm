
$(document).ready(()=> {
   
    $("#searchForm").on('submit',(e)=>{
        let searchedMovie = $("#searchInput").val();
        getMovies(searchedMovie);
        e.preventDefault();
    })
   
})

function getMovies(searchedMovie){
    axios.get("https://www.omdbapi.com/?s="+searchedMovie+"&apikey=29d70674")
    .then((response)=>{
        console.log(response);
        let movies = response.data.Search;
        output = '';
        $.each(movies, (i,movie)=>{
            output += `<div class="col-md-3" >
            <div class="card bg-secondary bg-opacity-10" style="width: 18rem;">
            <img id="thumbnail" src="${movie.Poster}||/download.jpeg"} class="card-img-top" alt="No poster available">
            <div class="card-body">
              <h5 class="card-title">${movie.Title}</h5>
              <a href="#" class="btn btn-primary" onclick="selectMovie('${movie.imdbID}')">View</a>
            </div>
          </div>
          </div>`
        })
        $('.panel').html(output)

    }).catch((e)=>{
        console.log("err");
    })}
   
    function selectMovie(id){
        sessionStorage.setItem('movieId',id);
        window.location = 'moviePage.html';
        return false;

    }

    function gotoMovie(){

            let movieId = sessionStorage.getItem('movieId');

            axios.get("https://www.omdbapi.com/?i="+movieId+"&apikey=29d70674").then(
                (response)=>{
                    console.log(response);
                    let movie = response.data;
                    let output = `
                    
                    <div class="row p-4">
                        <div class = "col-md-4">
                            <img src="${movie.Poster}" class="thumbnail"><br>
                                <a href="https://www.imdb.com/title/${movieId}">
                                    <button class="btn btn-primary">IMDB</button>
                                 </a>
                        </div>

                        <div class="col-md-8">
                            <ul class="list-group">
                                <li class="list-group-item"><strong>Title: </strong>${movie.Title}</li>
                                <li class="list-group-item"><strong>Directed By: </strong>${movie.Director}</li>
                                <li class="list-group-item"><strong>Year: </strong>${movie.Year}</li>
                                <li class="list-group-item"><strong>Genre: </strong>${movie.Genre}</li>
                                <li class="list-group-item"><strong>Language: </strong>${movie.Language}</li>

                                <li class="list-group-item"><strong>Country: </strong>${movie.Country}</li>

                                <li class="list-group-item"><strong>Release On: </strong>${movie.Released}</li>

                                <li class="list-group-item"><strong>Movie/Series: </strong>${movie.Type}</li>
                                <li class="list-group-item"><strong>Runtime: </strong>${movie.Runtime}</li>
                                <li class="list-group-item"><strong>IMDB Rating: </strong>${movie.imdbRating}</li>
                                <li class="list-group-item"><strong>IMDB Votes: </strong>${movie.imdbVotes}</li>
                                
                            </ul>
                        </div>
                    </div>
                    <div class="row">
                        <h3>Plot</h3>
                        <p class="lead">${movie.Plot}</p>
                    </div>

                    `;
                    $("#movieContent").html(output)

                }
               
            )
            
        }