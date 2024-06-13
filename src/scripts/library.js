document.addEventListener('DOMContentLoaded', () => {
  const gallery = document.querySelector('.gallery');
  const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
  const LOCAL_PLACEHOLDER_IMAGE = '../images/alternative-image.png'; // Ajustează acest path la imaginea ta de substituție

  // Funcție pentru afișarea bibliotecii de filme
  const displayLibrary = () => {
    let library = JSON.parse(localStorage.getItem('library')) || [];

    if (library.length === 0) {
      gallery.innerHTML = '<p>No movies in your library.</p>';
      return;
    }

    const movieHTML = library
      .map(movie => {
        const posterPath = movie.poster_path
          ? `${IMAGE_BASE_URL}${movie.poster_path}`
          : LOCAL_PLACEHOLDER_IMAGE;

        return `
          <div class="library-section-movie" style="background: linear-gradient(180deg, rgba(0, 0, 0, 0.00) 63.48%, rgba(0, 0, 0, 0.90) 92.16%), url('${posterPath}');" data-movie-id="${
          movie.id
        }">
            <div class="library-section-movie-card-info">
              <h3 class="library-section-movie-card-title">${
                movie.name || movie.title
              }</h3> 
              <div class="library-section-movie-card-details">
                <p class="library-section-movie-card-genre-year">${movie.genre_ids.join(
                  ', '
                )} | ${new Date(movie.release_date).getFullYear()}</p>
                <p class="library-section-movie-card-rate">${
                  movie.vote_average
                }</p>
              </div>
            </div>
          </div>
        `;
      })
      .join('');

    gallery.innerHTML = movieHTML;
  };

  // Afiseaza initial biblioteca de filme
  displayLibrary();

  // Adaugare eveniment pentru click pe un element din galerie
  gallery.addEventListener('click', async e => {
    const movieElement = e.target.closest('.library-section-movie');
    if (movieElement) {
      const movieId = movieElement.dataset.movieId;
      const library = JSON.parse(localStorage.getItem('library')) || [];
      const movie = library.find(m => m.id == movieId);

      if (movie) {
        const html = `
          <div class="library-movie-details-container">
            <button class="close-btn">X</button>
            <img src="${
              movie.poster_path
                ? IMAGE_BASE_URL + movie.poster_path
                : LOCAL_PLACEHOLDER_IMAGE
            }" alt="${movie.title}" width="248" height="315">
            <div class="library-movie-details">
              <h3 class="library-movie-title">${movie.title}</h3>
              <div class="library-movie-info-container">
                <div class="library-movie-info">
                  <p class="library-info-title">Vote / Votes</p>
                  <p><span class="library-rating-span">${
                    movie.vote_average
                  }</span> / <span class="library-rating-span">${
          movie.vote_count
        }</span></p>
                </div>
                <div class="library-movie-info">
                  <p class="library-info-title">Popularity</p><span>${
                    movie.popularity
                  }</span>
                </div>
                <div class="library-movie-info">
                  <p class="library-info-title">Genre</p><span>${movie.genre_ids.join(
                    ', '
                  )}</span>
                </div>
              </div>
              <div class="library-about-info">
                <p class="library-info-title">ABOUT</p>
                <p class="library-overview">${movie.overview}</p>
              </div>
              <button class="remove-from-library-btn">Remove from library</button>
            </div>
          </div>
        `;
        const movieDetailsContainer = document.getElementById(
          'movie-details-container'
        );
        movieDetailsContainer.innerHTML = html;
        movieDetailsContainer.classList.remove('hidden');

        // Adăugare eveniment pentru închiderea detaliilor
        const closeBtn = document.querySelector('.close-btn');
        closeBtn.addEventListener('click', () => {
          movieDetailsContainer.classList.add('hidden');
        });

        // Adăugare eveniment pentru butonul "Remove from library"
        const removeFromLibraryBtn = movieDetailsContainer.querySelector(
          '.remove-from-library-btn'
        );
        removeFromLibraryBtn.addEventListener('click', () => {
          removeFromLibrary(movie.id);
          movieDetailsContainer.classList.add('hidden'); // Ascunde detaliile după eliminare
          displayLibrary(); // Reafișează galeria actualizată după eliminare
        });
      }
    }
  });

  // Funcție pentru eliminarea unui film din biblioteca de filme
  const removeFromLibrary = movieId => {
    let library = JSON.parse(localStorage.getItem('library')) || [];
    library = library.filter(movie => movie.id != movieId);
    localStorage.setItem('library', JSON.stringify(library));
  };
});
