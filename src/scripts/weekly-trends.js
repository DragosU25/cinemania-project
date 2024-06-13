import { getGenres, getWeekTrendingMovies } from '../scripts/movie-api';

const displayWeekMovieInfo = async () => {
  try {
    // Fetch genres and week trending movies
    const genres = await getGenres();
    const movies = await getWeekTrendingMovies();

    // Select container elements
    const weekTrendingMoviesContainer = document.querySelector(
      '.week-trending-container'
    );
    const seeAllBtn = document.getElementById('see-all-btn');
    const movieDetailsContainer = document.querySelector('.movie-card');

    // Determine if mobile viewport
    const isMobile = window.innerWidth <= 768;

    // Function to create HTML for movie card
    const createMovieCard = movie => {
      const posterPath = movie.poster_path
        ? movie.poster_path
        : 'default-poster.jpg';
      const genreNames = movie.genre_ids
        .map(id => genres[id] || 'Unknown')
        .join(', ');
      const releaseDate = movie.release_date;
      const releaseYear = releaseDate.split('-')[0];

      return `
        <div data-movieid="${movie.id}" class="week-movie-card" style="background: linear-gradient(180deg, rgba(0, 0, 0, 0.00) 63.48%, rgba(0, 0, 0, 0.90) 92.16%), url('https://image.tmdb.org/t/p/w500${posterPath}') lightgray">
          <div>
            <h2 class="movie-title">${movie.title}</h2> 
            <p class="info-title">Rating: ${movie.vote_average}</p>
            <p>Genres: ${genreNames} | ${releaseYear}</p>
          </div>
        </div>
      `;
    };

    // Function to display movies
    const displayMovies = movies => {
      weekTrendingMoviesContainer.innerHTML = movies
        .map(createMovieCard)
        .join('');
    };

    // Show initial movies
    const showInitialMovies = () => {
      const moviesToShow = isMobile ? 1 : 3;
      const displayedMovies = movies.slice(0, moviesToShow);
      displayMovies(displayedMovies);
    };

    // Show all movies
    const showAllMovies = () => {
      displayMovies(movies);
      seeAllBtn.style.display = 'none';
    };

    // Event handler for displaying movie details
    const handleMovieDetails = e => {
      if (e.target.closest('.week-movie-card')) {
        const movieCard = e.target.closest('.week-movie-card');
        const movieId = Number(movieCard.dataset.movieid);
        const selectedMovie = movies.find(movie => movie.id === movieId);

        if (selectedMovie) {
          const posterPath = selectedMovie.poster_path
            ? selectedMovie.poster_path
            : 'default-poster.jpg';
          const genreNames = selectedMovie.genre_ids
            .map(id => genres[id] || 'Unknown')
            .join(', ');

          let html = `
            <button class="close-btn">X</button>
            <div class="trends-movie-details-container-content">
              <img src="https://image.tmdb.org/t/p/original${posterPath}" alt="${selectedMovie.title}">
              <div class="trends-movie-details">
                <h3 class="trends-movie-title">${selectedMovie.title}</h3>
                <div class="trends-movie-info-container">
                  <div class="trends-movie-info">
                    <p class="trends-info-title">Vote / Votes</p>
                    <p><span class="trends-rating-span">${selectedMovie.vote_average}</span> / <span class="trends-rating-span">${selectedMovie.vote_count}</span></p>
                  </div>
                  <div class="trends-movie-info">
                    <p class="trends-info-title">Popularity</p><span>${selectedMovie.popularity}</span>
                  </div>
                  <div class="trends-movie-info">
                    <p class="trends-info-title">Genre</p><span>${genreNames}</span>
                  </div>
                </div>
                <div class="trends-about-info">
                  <p class="trends-info-title">ABOUT</p>
                  <p class="trends-overview">${selectedMovie.overview}</p>
                </div>
                <button class="add-to-library-btn">Add to my library</button>
              </div>
            </div>
          `;
          movieDetailsContainer.innerHTML = html;
          movieDetailsContainer.classList.remove('is-hidden');
          const closeBtn = document.querySelector('.close-btn');
          closeBtn.addEventListener('click', () => {
            movieDetailsContainer.classList.add('is-hidden');
          });
          // Adăugare eveniment pentru butonul de bibliotecă
          const libraryBtn = document.querySelector('.add-to-library-btn');
          libraryBtn.addEventListener('click', () => {
            toggleLibrary(selectedMovie);
            libraryBtn.textContent = isInLibrary(selectedMovie.id)
              ? 'Remove from library'
              : 'Add to my library';
          });

          const isInLibrary = movieId => {
            const library = JSON.parse(localStorage.getItem('library')) || [];
            return library.some(selectedMovie => selectedMovie.id == movieId);
          };

          const toggleLibrary = movie => {
            let library = JSON.parse(localStorage.getItem('library')) || [];

            if (isInLibrary(movie.id)) {
              library = library.filter(item => item.id != selectedMovie.id);
              localStorage.setItem('library', JSON.stringify(library));
            } else {
              library.push(movie);
              localStorage.setItem('library', JSON.stringify(library));
            }
          };
        }
      }
    };

    // Add event listener to "See All" button
    seeAllBtn.addEventListener('click', showAllMovies);

    // Add event listener to container for movie details
    weekTrendingMoviesContainer.addEventListener('click', handleMovieDetails);

    // Update layout on window resize
    const handleResize = () => {
      showInitialMovies();
      const displayedMovies =
        weekTrendingMoviesContainer.querySelectorAll('.week-movie-card').length;
      if (displayedMovies === movies.length) {
        seeAllBtn.style.display = 'none';
      } else {
        seeAllBtn.style.display = 'block';
      }
    };

    window.addEventListener('resize', handleResize);

    // Display initial movies
    showInitialMovies();
  } catch (error) {
    console.error('Error displaying movie info: ', error);
  }
};

displayWeekMovieInfo();
