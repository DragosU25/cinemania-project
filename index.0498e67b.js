!function(){function e(e){return e&&e.__esModule?e.default:e}var n="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},i={},r=n.parcelRequirea071;null==r&&((r=function(e){if(e in t)return t[e].exports;if(e in i){var n=i[e];delete i[e];var r={id:e,exports:{}};return t[e]=r,n.call(r.exports,r,r.exports),r.exports}var o=new Error("Cannot find module '"+e+"'");throw o.code="MODULE_NOT_FOUND",o}).register=function(e,n){i[e]=n},n.parcelRequirea071=r);var o,a=r("bpxeT"),s=r("2TvXO"),c=r("2Vquh"),l=(o=e(a)(e(s).mark((function n(){var t,i,r,o,a,l,d,p,u,v,f,g;return e(s).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,(0,c.getGenres)();case 3:return t=e.sent,e.next=6,(0,c.getWeekTrendingMovies)();case 6:i=e.sent,r=document.querySelector(".week-trending-container"),o=document.getElementById("see-all-btn"),a=document.querySelector(".movie-card"),l=window.innerWidth<=768,d=function(e){var n=e.poster_path?e.poster_path:"default-poster.jpg",i=e.genre_ids.map((function(e){return t[e]||"Unknown"})).join(", "),r=e.release_date.split("-")[0];return'\n        <div data-movieid="'.concat(e.id,'" class="week-movie-card" style="background: linear-gradient(180deg, rgba(0, 0, 0, 0.00) 63.48%, rgba(0, 0, 0, 0.90) 92.16%), url(\'https://image.tmdb.org/t/p/w500').concat(n,'\') lightgray">\n          <div>\n            <h2 class="movie-title">').concat(e.title,'</h2> \n            <p class="info-title">Rating: ').concat(e.vote_average,"</p>\n            <p>Genres: ").concat(i," | ").concat(r,"</p>\n          </div>\n        </div>\n      ")},p=function(e){r.innerHTML=e.map(d).join("")},u=function(){var e=l?1:3,n=i.slice(0,e);p(n)},v=function(){p(i),o.style.display="none"},f=function(e){if(e.target.closest(".week-movie-card")){var n=e.target.closest(".week-movie-card"),r=Number(n.dataset.movieid),o=i.find((function(e){return e.id===r}));if(o){var s=o.poster_path?o.poster_path:"default-poster.jpg",c=o.genre_ids.map((function(e){return t[e]||"Unknown"})).join(", "),l='\n            <button class="close-btn">X</button>\n            <div class="movie-details-container-content">\n              <img src="https://image.tmdb.org/t/p/original'.concat(s,'" alt="').concat(o.title,'">\n              <div class="movie-details">\n                <h3 class="movie-title">').concat(o.title,'</h3>\n                <div class="movie-info-container">\n                  <div class="movie-info">\n                    <p class="info-title">Vote / Votes</p>\n                    <p><span class="rating-span">').concat(o.vote_average,'</span> / <span class="rating-span">').concat(o.vote_count,'</span></p>\n                  </div>\n                  <div class="movie-info">\n                    <p class="info-title">Popularity</p><span>').concat(o.popularity,'</span>\n                  </div>\n                  <div class="movie-info">\n                    <p class="info-title">Genre</p><span>').concat(c,'</span>\n                  </div>\n                </div>\n                <div class="about-info">\n                  <p class="info-title">ABOUT</p>\n                  <p class="overview">').concat(o.overview,'</p>\n                </div>\n                <button class="add-to-library-btn">Add to my library</button>\n              </div>\n            </div>\n          ');a.innerHTML=l,a.classList.remove("is-hidden"),document.querySelector(".close-btn").addEventListener("click",(function(){a.classList.add("is-hidden")}));var d=document.querySelector(".add-to-library-btn");d.addEventListener("click",(function(){u(o),d.textContent=p(o.id)?"Remove from library":"Add to my library"}));var p=function(e){return(JSON.parse(localStorage.getItem("library"))||[]).some((function(n){return n.id==e}))},u=function(e){var n=JSON.parse(localStorage.getItem("library"))||[];p(e.id)?(n=n.filter((function(e){return e.id!=o.id})),localStorage.setItem("library",JSON.stringify(n))):(n.push(e),localStorage.setItem("library",JSON.stringify(n)))}}}},o.addEventListener("click",v),r.addEventListener("click",f),g=function(){u(),r.querySelectorAll(".week-movie-card").length===i.length?o.style.display="none":o.style.display="block"},window.addEventListener("resize",g),u(),e.next=26;break;case 23:e.prev=23,e.t0=e.catch(0),console.error("Error displaying movie info: ",e.t0);case 26:case"end":return e.stop()}}),n,null,[[0,23]])}))),function(){return o.apply(this,arguments)});l()}();
//# sourceMappingURL=index.0498e67b.js.map