import { getGenres, getUpcomingMovies } from '../scripts/movie-api';
const currentDate = new Date().toISOString().split('T')[0];
const getMoviesForToday = async () => {
  const movies = await getUpcomingMovies();
  const todayMovies = movies.filter(movie => {
    const releaseDate = movie.release_date;
    return releaseDate <= currentDate;
  });
  return todayMovies;
};

const selectRandomMovie = movies => {
  if (!movies || movies.length === 0) {
    return null;
  }

  const randomIndex = Math.floor(Math.random() * movies.length);
  return movies[randomIndex];
};

const displayMovieInfo = async () => {
  const genres = await getGenres();
  const movies = await getMoviesForToday();
  const randomMovie = selectRandomMovie(movies);
  const upcomingMovieContainer = document.querySelector(
    '.upcoming-movie-container'
  );
  const backdropPath = randomMovie.backdrop_path
    ? randomMovie.backdrop_path
    : 'default-poster.jpg';

  const genreNames = randomMovie.genre_ids
    .map(id => genres[id] || 'Unknown')
    .join(', ');

  if (randomMovie) {
    let html = `
      <div class="image-container" style="background-image: url('https://image.tmdb.org/t/p/original${backdropPath}')">
      </div>
      <div class="upcoming-movie-details-container">
      <h2 class="upcoming-movie-title">${randomMovie.title}</h2>

       <div class="movie-info">
        <div class="upcoming-movie-details-flex-container">
        <div class="release-date">
            <span>Release date</span>
            <span class="date align-left">${randomMovie.release_date}</span>
        </div>
        <div class="votes">
            <span>Vote / Votes</span>
            <span class="vote-count align-left">${randomMovie.vote_count} / ${randomMovie.vote_average}</span>
        </div>
        </div>
        <div class="upcoming-movie-details-flex-container">
        <div class="popularity">
            <span>Popularity</span>
            <span class="popularity-score align-left">${randomMovie.popularity}</span>
        </div>
        <div class="genre">
            <span>Genre</span>
            <span class="genre-type align-left">${genreNames}</span>
        </div>
        </div>
        <div class="about">
            <h2>ABOUT</h2>
            <p>${randomMovie.overview}</p>
        </div>
        <button class="add-to-library-btn">Add to my library</button>
    </div>
      </div>
        `;

    upcomingMovieContainer.innerHTML = html;

    // Adăugare eveniment pentru butonul de bibliotecă
    const libraryBtn = document.querySelector('.add-to-library-btn');
    libraryBtn.addEventListener('click', () => {
      toggleLibrary(randomMovie);
      libraryBtn.textContent = isInLibrary(randomMovie.id)
        ? 'Remove from library'
        : 'Add to my library';
    });

    const isInLibrary = movieId => {
      const library = JSON.parse(localStorage.getItem('library')) || [];
      return library.some(randomMovie => randomMovie.id == movieId);
    };

    const toggleLibrary = movie => {
      let library = JSON.parse(localStorage.getItem('library')) || [];

      if (isInLibrary(movie.id)) {
        library = library.filter(item => item.id != randomMovie.id);
        localStorage.setItem('library', JSON.stringify(library));
      } else {
        library.push(movie);
        localStorage.setItem('library', JSON.stringify(library));
      }
    };
  }
};

displayMovieInfo();
