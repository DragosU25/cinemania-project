!function(){function e(e){return e&&e.__esModule?e.default:e}var n="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},i={},a={},t=n.parcelRequirea071;null==t&&((t=function(e){if(e in i)return i[e].exports;if(e in a){var n=a[e];delete a[e];var t={id:e,exports:{}};return i[e]=t,n.call(t.exports,t,t.exports),t.exports}var r=new Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r}).register=function(e,n){a[e]=n},n.parcelRequirea071=t);var r=t("bpxeT"),o=t("2TvXO");document.addEventListener("DOMContentLoaded",(function(){var n,i=document.querySelector(".gallery"),a="https://image.tmdb.org/t/p/w500",t="../images/alternative-image.png",l=function(){var e=JSON.parse(localStorage.getItem("library"))||[];if(0!==e.length){var n=e.map((function(e){var n=e.poster_path?"".concat(a).concat(e.poster_path):t;return'\n          <div class="library-section-movie" style="background: linear-gradient(180deg, rgba(0, 0, 0, 0.00) 63.48%, rgba(0, 0, 0, 0.90) 92.16%), url(\''.concat(n,'\');" data-movie-id="').concat(e.id,'">\n            <div class="library-section-movie-card-info">\n              <h3 class="library-section-movie-card-title">').concat(e.name||e.title,'</h3> \n              <div class="library-section-movie-card-details">\n                <p class="library-section-movie-card-genre-year">').concat(e.genre_ids.join(", ")," | ").concat(new Date(e.release_date).getFullYear(),'</p>\n                <p class="library-section-movie-card-rate">').concat(e.vote_average,"</p>\n              </div>\n            </div>\n          </div>\n        ")})).join("");i.innerHTML=n}else i.innerHTML="<p>No movies in your library.</p>"};l(),i.addEventListener("click",(n=e(r)(e(o).mark((function n(i){var r,c,d,v,p,u;return e(o).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:(r=i.target.closest(".library-section-movie"))&&(c=r.dataset.movieId,d=JSON.parse(localStorage.getItem("library"))||[],(v=d.find((function(e){return e.id==c})))&&(p='\n          <div class="library-movie-details-container">\n            <button class="close-btn">X</button>\n            <img src="'.concat(v.poster_path?a+v.poster_path:t,'" alt="').concat(v.title,'" width="248" height="315">\n            <div class="library-movie-details">\n              <h3 class="library-movie-title">').concat(v.title,'</h3>\n              <div class="library-movie-info-container">\n                <div class="library-movie-info">\n                  <p class="library-info-title">Vote / Votes</p>\n                  <p><span class="library-rating-span">').concat(v.vote_average,'</span> / <span class="library-rating-span">').concat(v.vote_count,'</span></p>\n                </div>\n                <div class="library-movie-info">\n                  <p class="library-info-title">Popularity</p><span>').concat(v.popularity,'</span>\n                </div>\n                <div class="library-movie-info">\n                  <p class="library-info-title">Genre</p><span>').concat(v.genre_ids.join(", "),'</span>\n                </div>\n              </div>\n              <div class="library-about-info">\n                <p class="library-info-title">ABOUT</p>\n                <p class="library-overview">').concat(v.overview,'</p>\n              </div>\n              <button class="remove-from-library-btn">Remove from library</button>\n            </div>\n          </div>\n        '),(u=document.getElementById("movie-details-container")).innerHTML=p,u.classList.remove("hidden"),document.querySelector(".close-btn").addEventListener("click",(function(){u.classList.add("hidden")})),u.querySelector(".remove-from-library-btn").addEventListener("click",(function(){s(v.id),u.classList.add("hidden"),l()}))));case 2:case"end":return e.stop()}}),n)}))),function(e){return n.apply(this,arguments)}));var s=function(e){var n=JSON.parse(localStorage.getItem("library"))||[];n=n.filter((function(n){return n.id!=e})),localStorage.setItem("library",JSON.stringify(n))}}))}();
//# sourceMappingURL=my-library.9499304c.js.map
