import {
  getTrendingMovies,
  getGenres,
  getMovieTrailer,
} from '../scripts/movie-api';

const currentDate = new Date().toISOString().split('T')[0];

const getMoviesForToday = async () => {
  const movies = await getTrendingMovies();
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

const truncateOverview = (overview, maxLength) => {
  if (overview.length > maxLength) {
    return overview.slice(0, maxLength) + '...';
  }
  return overview;
};

const displayMovieInfo = async () => {
  const genres = await getGenres();
  const movies = await getMoviesForToday();
  const randomMovie = selectRandomMovie(movies);
  const trailer = await getMovieTrailer(randomMovie.id);
  const heroSection = document.querySelector('#hero-section');
  const heroTitle = document.querySelector('#hero-title');
  const heroRating = document.querySelector('#hero-rating');
  const heroDescription = document.querySelector('#hero-description');
  const heroButtonsContainer = document.querySelector('.hero-buttons');
  const movieDetailsContainer = document.querySelector('.movie-card');
  const trailerContainer = document.querySelector('.movie-trailer-container');

  if (randomMovie) {
    const movieGenres = randomMovie.genre_ids
      .map(id => genres[id] || 'Unknown')
      .join(', ');
    heroSection.style.background = `linear-gradient(87deg, #111 33.93%, rgba(17, 17, 17, 0.00) 78.91%), url('https://image.tmdb.org/t/p/original${randomMovie.backdrop_path}') lightgray`;
    heroSection.style.backgroundSize = 'cover';
    heroSection.style.backgroundPosition = 'center';
    heroSection.style.backgroundRepeat = 'no-repeat';
    heroTitle.textContent = randomMovie.title;
    heroRating.textContent = `Rating:  ${randomMovie.vote_average}`;
    heroDescription.textContent = truncateOverview(randomMovie.overview, 250);

    heroButtonsContainer.addEventListener('click', e => {
      e.preventDefault();
      if (e.target.id === 'more-details') {
        let html = `
        
        <div class="hero-movie-details-container">
        <button class="close-btn">X</button>
          <img src="https://image.tmdb.org/t/p/original${randomMovie.poster_path}" alt="${randomMovie.title}" width="248" height="315">
           <div class="hero-movie-details">
          <h3 class="hero-movie-title">${randomMovie.title}</h3>
          <div class="hero-movie-info-container">
            <div class="hero-movie-info">
              <p class="hero-info-title"</p>Vote / Votes</p>
              <p><span class="hero-rating-span">${randomMovie.vote_average}</span> / <span class="hero-rating-span">${randomMovie.vote_count}</span></p>
            </div>
            <div class="hero-movie-info">
              <p class="hero-info-title">Popularity</p><span>${randomMovie.popularity}</span>
            </div>
            <div class="hero-movie-info">
              <p class="hero-info-title">Genre</p><span>${movieGenres}</span>
            </div>
          </div>
          <div class="hero-about-info">
          <p class="hero-info-title">ABOUT</p>
          <p class="hero-overview">${randomMovie.overview}</p>
          </div>

          <button class="add-to-library-btn">Add to my library</button>
          </div>
        </div>
        `;

        movieDetailsContainer.innerHTML = html;

        movieDetailsContainer.classList.remove('is-hidden');

        // Adăugare eveniment pentru închiderea detaliilor
        const closeBtn = document.querySelector('.close-btn');
        closeBtn.addEventListener('click', () => {
          movieDetailsContainer.classList.add('is-hidden');
        });

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
            library = library.filter(item => item.id != movie.id);
            localStorage.setItem('library', JSON.stringify(library));
          } else {
            library.push(movie);
            localStorage.setItem('library', JSON.stringify(library));
          }
        };
      } else if (e.target.id === 'watch-trailer') {
        if (trailer && trailer.key) {
          let html = `
        <button class="close-btn">X</button>
        <iframe width="560" height="315" src="https://www.youtube.com/embed/${trailer.key}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    `;
          trailerContainer.innerHTML = html;
          trailerContainer.classList.remove('is-hidden');
        } else {
          trailerContainer.classList.add('error-container');
          let html = `
        <button class="close-btn">X</button>
        <p class="text-warning">OOPS...<br>
        We are very sorry!<br>
        But we couldn’t find the trailer.</p>
    `;
          trailerContainer.innerHTML = html;
          trailerContainer.classList.remove('is-hidden');
        }

        const trailerCloseBtn = trailerContainer.querySelector('.close-btn');
        trailerCloseBtn.addEventListener('click', () => {
          trailerContainer.classList.add('is-hidden');
        });
      }
    });
  } else {
    heroSection.style.background = "url('../images/hero-image.jpg') !important";
    heroSection.style.backgroundSize = 'cover';
    heroSection.style.backgroundPosition = 'center';
    heroSection.style.backgroundRepeat = 'no-repeat';
    heroTitle.textContent = 'Let’s Make Your Own Cinema';
    heroDescription.textContent =
      "Is a guide to creating a personalized movie theater experience. You'll need a projector, screen, and speakers. Decorate your space, choose your films, and stock up on snacks for the full experience.";
    let buttonHtml = `<button class="get-started-button">Get Started</button>`;
    heroButtonsContainer.innerHTML = buttonHtml;
  }
};

displayMovieInfo();
