!function(){function n(n){return n&&n.__esModule?n.default:n}var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},a={},r=e.parcelRequirea071;null==r&&((r=function(n){if(n in t)return t[n].exports;if(n in a){var e=a[n];delete a[n];var r={id:n,exports:{}};return t[n]=r,e.call(r.exports,r,r.exports),r.exports}var i=new Error("Cannot find module '"+n+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(n,e){a[n]=e},e.parcelRequirea071=r);var i,o=r("bpxeT"),s=r("2TvXO"),c=r("2Vquh"),l=(new Date).toISOString().split("T")[0],u=(i=n(o)(n(s).mark((function e(){var t,a;return n(s).wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,(0,c.getUpcomingMovies)();case 2:return t=n.sent,a=t.filter((function(n){return n.release_date<=l})),n.abrupt("return",a);case 5:case"end":return n.stop()}}),e)}))),function(){return i.apply(this,arguments)}),d=function(n){return n&&0!==n.length?n[Math.floor(Math.random()*n.length)]:null},p=function(){var e=n(o)(n(s).mark((function e(){var t,a,r,i,o,l,p,f,v,g;return n(s).wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,(0,c.getGenres)();case 2:return t=n.sent,n.next=5,u();case 5:a=n.sent,r=d(a),i=document.querySelector(".upcoming-movie-container"),o=r.backdrop_path?r.backdrop_path:"default-poster.jpg",l=r.genre_ids.map((function(n){return t[n]||"Unknown"})).join(", "),r&&(p='\n      <div class="image-container" style="background-image: url(\'https://image.tmdb.org/t/p/original'.concat(o,'\')">\n      </div>\n      <div class="upcoming-movie-details-container">\n      <h2 class="upcoming-movie-title">').concat(r.title,'</h2>\n\n       <div class="movie-info">\n        <div class="upcoming-movie-details-flex-container">\n        <div class="release-date">\n            <span>Release date</span>\n            <span class="date align-left">').concat(r.release_date,'</span>\n        </div>\n        <div class="votes">\n            <span>Vote / Votes</span>\n            <span class="vote-count align-left">').concat(r.vote_count," / ").concat(r.vote_average,'</span>\n        </div>\n        </div>\n        <div class="upcoming-movie-details-flex-container">\n        <div class="popularity">\n            <span>Popularity</span>\n            <span class="popularity-score align-left">').concat(r.popularity,'</span>\n        </div>\n        <div class="genre">\n            <span>Genre</span>\n            <span class="genre-type align-left">').concat(l,'</span>\n        </div>\n        </div>\n        <div class="about">\n            <h2>ABOUT</h2>\n            <p>').concat(r.overview,'</p>\n        </div>\n        <button class="add-to-library-btn">Add to my library</button>\n    </div>\n      </div>\n        '),i.innerHTML=p,(f=document.querySelector(".add-to-library-btn")).addEventListener("click",(function(){g(r),f.textContent=v(r.id)?"Remove from library":"Add to my library"})),v=function(n){return(JSON.parse(localStorage.getItem("library"))||[]).some((function(e){return e.id==n}))},g=function(n){var e=JSON.parse(localStorage.getItem("library"))||[];v(n.id)?(e=e.filter((function(n){return n.id!=r.id})),localStorage.setItem("library",JSON.stringify(e))):(e.push(n),localStorage.setItem("library",JSON.stringify(e)))});case 11:case"end":return n.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();p()}();
//# sourceMappingURL=index.69acc9dd.js.map
