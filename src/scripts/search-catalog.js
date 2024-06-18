import {
  searchMovies,
  getGenres,
  getTrendingMovies,
} from '../scripts/movie-api';

const gallery = document.querySelector('.gallery');
const searchForm = document.querySelector('form');
const pagination = document.querySelector('#pagination');
const message = document.querySelector('#message');
const yearFilterContainer = document.querySelector('#year-filter-container');
const genreFilterContainer = document.querySelector('#genre-filter-container');
const currentDate = new Date().toISOString().split('T')[0];

const getMoviesForToday = async () => {
  const movies = await getTrendingMovies();
  const todayMovies = movies.filter(movie => movie.release_date <= currentDate);
  return todayMovies;
};

let currentPage = 1;
let currentQuery = 'popular';
const perPage = 20;
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
const LOCAL_PLACEHOLDER_IMAGE = '../images/hero-image.jpg';
let allMovies = [];
let allGenres = [];

const renderMovies = async movies => {
  const genres = await getGenres();

  const movieHTML = movies
    .map(movie => {
      const movieGenres = movie.genre_ids
        .map(id => genres[id] || 'Unknown')
        .join(', ');
      const posterPath = movie.poster_path
        ? `${IMAGE_BASE_URL}${movie.poster_path}`
        : LOCAL_PLACEHOLDER_IMAGE;

      return `
        <div class="search-section-movie" style="background: linear-gradient(180deg, rgba(0, 0, 0, 0.00) 63.48%, rgba(0, 0, 0, 0.90) 92.16%), url('${posterPath}');" data-movie-id="${
        movie.id
      }">
          <div class="search-section-movie-card-info">
            <h3 class="search-section-movie-card-title">${
              movie.name || movie.title
            }</h3> 
            <div class="search-section-movie-card-details">
              <p class="search-section-movie-card-genre-year">${movieGenres} | ${new Date(
        movie.release_date
      ).getFullYear()}</p>
              <p class="search-section-movie-card-rate">${
                movie.vote_average
              }</p>
            </div>
          </div>
        </div>
      `;
    })
    .join('');

  gallery.innerHTML = movieHTML;

  gallery.querySelectorAll('.search-section-movie').forEach(movieElement => {
    movieElement.addEventListener('click', async e => {
      const movieId = movieElement.dataset.movieId;
      const movie = movies.find(m => m.id == movieId);
      const movieGenres = movie.genre_ids
        .map(id => genres[id] || 'Unknown')
        .join(', ');

      const html = `
      <div class="search-movie-details-container">
        <button class="close-btn">X</button>
        <img src="${
          movie.poster_path
            ? IMAGE_BASE_URL + movie.poster_path
            : LOCAL_PLACEHOLDER_IMAGE
        }" alt="${movie.title}" width="248" height="315">
        <div class="search-movie-details">
          <h3 class="search-movie-title">${movie.title}</h3>
          <div class="search-movie-info-container">
            <div class="search-movie-info">
              <p class="search-info-title">Vote / Votes</p>
              <p><span class="search-rating-span">${
                movie.vote_average
              }</span> / <span class="search-rating-span">${
        movie.vote_count
      }</span></p>
            </div>
            <div class="search-movie-info">
              <p class="search-info-title">Popularity</p><span>${
                movie.popularity
              }</span>
            </div>
            <div class="search-movie-info">
              <p class="search-info-title">Genre</p><span>${movieGenres}</span>
            </div>
          </div>
          <div class="search-about-info">
            <p class="search-about-info-title">ABOUT</p>
            <p class="search-overview">${movie.overview}</p>
          </div>
          <button class="add-to-library-btn">${
            isInLibrary(movie.id) ? 'Remove from library' : 'Add to my library'
          }</button>
        </div>
      </div>
    `;
      const movieDetailsContainer = document.getElementById(
        'search-movie-details-container'
      );
      movieDetailsContainer.innerHTML = html;
      movieDetailsContainer.classList.remove('hidden');

      // Add event listener for closing the movie details
      document.querySelector('.close-btn').addEventListener('click', () => {
        movieDetailsContainer.classList.add('hidden');
      });

      // Add event listener for the library button
      const libraryBtn = document.querySelector('.add-to-library-btn');
      libraryBtn.addEventListener('click', () => {
        toggleLibrary(movie);
        libraryBtn.textContent = isInLibrary(movie.id)
          ? 'Remove from library'
          : 'Add to my library';
      });
    });
  });
};

const handlePageChange = async page => {
  currentPage = page;

  try {
    const data = await searchMovies(currentQuery, currentPage);
    allMovies = data.results;
    renderMovies(allMovies);
    renderPagination(data.total_pages);
    renderYearFilter();
    renderGenreFilter(); // Render the genre filter
  } catch (err) {
    console.error(err);
    showMessage('Something went wrong. Please try again.');
  }
};

const showMessage = msg => {
  message.innerHTML = `<p>${msg}</p>`;
  gallery.innerHTML = '';
  pagination.innerHTML = '';
};

const renderPagination = totalPages => {
  pagination.innerHTML = '';

  if (totalPages <= 1) return;

  if (currentPage > 1) {
    const prevButton = createPaginationButton('<');
    prevButton.addEventListener('click', () =>
      handlePageChange(currentPage - 1)
    );
    pagination.appendChild(prevButton);
  }

  const visiblePages = Math.min(3, totalPages);
  let startPage = currentPage - Math.floor(visiblePages / 2);
  startPage = Math.max(1, startPage);
  let endPage = startPage + visiblePages - 1;
  endPage = Math.min(totalPages, endPage);

  for (let i = startPage; i <= endPage; i++) {
    const pageButton = createPaginationButton(i);
    if (i === currentPage) pageButton.classList.add('active');
    pagination.appendChild(pageButton);
  }

  if (currentPage < totalPages) {
    const nextButton = createPaginationButton('>');
    nextButton.addEventListener('click', () =>
      handlePageChange(currentPage + 1)
    );
    pagination.appendChild(nextButton);
  }

  function createPaginationButton(label) {
    const pageButton = document.createElement('button');
    pageButton.innerText = label;
    pageButton.classList.add('pagination-button');
    pageButton.classList.add('light-mode');
    if (label === currentPage) {
      pageButton.classList.add('active');
    }
    if (label !== '<' && label !== '>') {
      pageButton.addEventListener('click', () =>
        handlePageChange(parseInt(label))
      );
    }
    return pageButton;
  }
};

const renderYearFilter = () => {
  const yearSelect = document.createElement('select');
  yearSelect.id = 'year-filter';
  yearSelect.classList.add('select');
  yearSelect.innerHTML = '<option value="">Year</option>';

  for (let year = 2015; year <= 2024; year++) {
    yearSelect.innerHTML += `<option value="${year}">${year}</option>`;
  }

  yearSelect.addEventListener('change', handleFilterChange);
  yearFilterContainer.innerHTML = '';
  yearFilterContainer.appendChild(yearSelect);
};

const renderGenreFilter = async () => {
  const genres = await getGenres();
  const genreSelect = document.createElement('select');
  genreSelect.id = 'genre-filter';
  genreSelect.classList.add('select');
  genreSelect.innerHTML = '<option value="">Genre</option>';

  Object.keys(genres).forEach(genreId => {
    genreSelect.innerHTML += `<option value="${genreId}">${genres[genreId]}</option>`;
  });

  genreSelect.addEventListener('change', handleFilterChange);
  genreFilterContainer.innerHTML = '';
  genreFilterContainer.appendChild(genreSelect);
};

const handleFilterChange = () => {
  const selectedYear = document.querySelector('#year-filter').value;
  const selectedGenre = document.querySelector('#genre-filter').value;

  let filteredMovies = allMovies;

  if (selectedYear) {
    filteredMovies = filteredMovies.filter(
      movie => new Date(movie.release_date).getFullYear() == selectedYear
    );
  }

  if (selectedGenre) {
    filteredMovies = filteredMovies.filter(movie =>
      movie.genre_ids.includes(parseInt(selectedGenre))
    );
  }

  renderMovies(filteredMovies);
};

const isInLibrary = movieId => {
  const library = JSON.parse(localStorage.getItem('library')) || [];
  return library.some(movie => movie.id == movieId);
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

const initialize = async () => {
  try {
    const movies = await getMoviesForToday();
    allMovies = movies;
    renderMovies(allMovies);
    renderYearFilter();
    renderGenreFilter();
  } catch (err) {
    console.error(err);
    showMessage('Something went wrong. Please try again.');
  }
};

searchForm.addEventListener('submit', async e => {
  e.preventDefault();
  const searchInputValue = searchForm.searchQuery.value.trim();
  if (!searchInputValue) {
    showMessage('Please enter a search query');
    return;
  }
  currentPage = 1;
  currentQuery = searchInputValue;
  await handlePageChange(currentPage);
});

initialize();
