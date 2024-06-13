import { searchMovies, getGenres } from '../scripts/movie-api';

const gallery = document.querySelector('.gallery');
const searchForm = document.querySelector('form');
const pagination = document.querySelector('#pagination');
const message = document.querySelector('#message');
const yearFilterContainer = document.querySelector('#year-filter-container'); // Container for the year select

let currentPage = 1;
let currentQuery = 'popular'; // Implicit search query for popular movies
const perPage = 20;
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'; // Base URL for images
const LOCAL_PLACEHOLDER_IMAGE = '../images/alternative-image.png'; // Path to local placeholder image
let allMovies = []; // Store all movies for filtering

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

  gallery.addEventListener('click', async e => {
    const movieElement = e.target.closest('.search-section-movie');
    if (movieElement) {
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
      const closeBtn = document.querySelector('.close-btn');
      closeBtn.addEventListener('click', () => {
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
    }
  });

  // Function to check if a movie is in the library
  const isInLibrary = movieId => {
    const library = JSON.parse(localStorage.getItem('library')) || [];
    return library.some(movie => movie.id == movieId);
  };

  // Function to toggle a movie in the library
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
};

const handlePageChange = async page => {
  currentPage = page;

  try {
    const data = await searchMovies(currentQuery, currentPage);
    allMovies = data.results; // Store all movies for filtering
    renderMovies(allMovies);
    renderPagination(data.total_pages);
    renderYearFilter(); // Render the year filter select
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
  console.log(`Rendering pagination for ${totalPages} pages`); // Debug log
  pagination.innerHTML = '';

  if (totalPages <= 1) return; // Do not display pagination if there's only one page

  // Add "Previous" button if not on the first page
  if (currentPage > 1) {
    const prevButton = createPaginationButton('<');
    prevButton.addEventListener('click', () =>
      handlePageChange(currentPage - 1)
    );
    pagination.appendChild(prevButton);
  }

  // Determine the number of pagination buttons to display (max 3)
  const visiblePages = Math.min(3, totalPages);

  // Determine the start and end of pagination button range
  let startPage = currentPage - Math.floor(visiblePages / 2);
  startPage = Math.max(1, startPage);
  let endPage = startPage + visiblePages - 1;
  endPage = Math.min(totalPages, endPage);

  // Add individual page buttons
  for (let i = startPage; i <= endPage; i++) {
    const pageButton = createPaginationButton(i);
    if (i === currentPage) pageButton.classList.add('active');
    pagination.appendChild(pageButton);
  }

  // Add "Next" button if not on the last page
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

const handleNextPage = nextPage => {
  handlePageChange(nextPage);
};

const renderYearFilter = () => {
  // Create a select element for the year filter
  const yearSelect = document.createElement('select');
  yearSelect.id = 'year-filter';
  yearSelect.innerHTML = '<option value="">Year</option>';

  // Add options for years from 2000 to 2024
  for (let year = 2015; year <= 2024; year++) {
    yearSelect.innerHTML += `<option value="${year}">${year}</option>`;
  }

  yearSelect.addEventListener('change', handleYearFilterChange);

  // Append the select element to the container
  yearFilterContainer.innerHTML = ''; // Clear previous content
  yearFilterContainer.appendChild(yearSelect);
};

const handleYearFilterChange = event => {
  const selectedYear = event.target.value;
  if (!selectedYear) {
    renderMovies(allMovies); // If no year is selected, show all movies
  } else {
    const filteredMovies = allMovies.filter(
      movie => new Date(movie.release_date).getFullYear() == selectedYear
    );
    renderMovies(filteredMovies); // Show filtered movies
  }
};

// Event listener for form submission
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

// Initial rendering
renderPagination(0);

// Initial search to display first 20 popular movies
handlePageChange(currentPage);
