const API_KEY = 'c0eccbee8238aa3ee19c6b09d37fc317';
const BASE_URL = 'https://api.themoviedb.org/3/';

const searchMovies = async (query, page = 1) => {
  try {
    const response = await fetch(
      `${BASE_URL}search/movie?query=${query}&include_adult=false&language=en-US&page=${page}&api_key=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error('Network response was not ok: ' + response.statusText);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error: ', error);
    return { results: [], totalResults: 0 }; // Return empty data in case of error
  }
};

const getTrendingMovies = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}trending/movie/day?api_key=${API_KEY}`
    );
    if (!response.ok) {
      throw new Error('Network response was not ok: ' + response.statusText);
    }

    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Fetch error: ', error);
    throw error;
  }
};

const getWeekTrendingMovies = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}trending/movie/week?api_key=${API_KEY}`
    );
    if (!response.ok) {
      throw new Error('Network response was not ok: ' + response.statusText);
    }

    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Fetch error: ', error);
    throw error;
  }
};

const getUpcomingMovies = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/upcoming?api_key=${API_KEY}`
    );
    if (!response.ok) {
      throw new Error('Network response was not ok: ' + response.statusText);
    }

    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Fetch error: ', error);
    throw error;
  }
};

const getGenres = async () => {
  const response = await fetch(
    `${BASE_URL}genre/movie/list?api_key=${API_KEY}`
  );
  const data = await response.json();
  return data.genres.reduce((acc, genre) => {
    acc[genre.id] = genre.name;
    return acc;
  }, {});
};

const getMovieTrailer = async id => {
  const response = await fetch(
    `${BASE_URL}movie/${id}/videos?api_key=${API_KEY}&language=en-US`
  );
  const data = await response.json();
  const trailers = data.results.filter(
    video => video.type === 'Trailer' && video.site === 'YouTube'
  );
  return trailers.length ? trailers[0] : null;
};

export {
  getTrendingMovies,
  getGenres,
  getMovieTrailer,
  getWeekTrendingMovies,
  getUpcomingMovies,
  searchMovies,
};
