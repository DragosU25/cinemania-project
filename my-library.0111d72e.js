var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},n={},r=e.parcelRequirea071;null==r&&((r=function(e){if(e in t)return t[e].exports;if(e in n){var r=n[e];delete n[e];var o={id:e,exports:{}};return t[e]=o,r.call(o.exports,o,o.exports),o.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,t){n[e]=t},e.parcelRequirea071=r);var o=r("2bk9a");const i=(new Date).toISOString().split("T")[0];(async()=>{const e=await(0,o.getGenres)(),t=(e=>e&&0!==e.length?e[Math.floor(Math.random()*e.length)]:null)(await(async()=>(await(0,o.getTrendingMovies)()).filter((e=>e.release_date<=i)))()),n=await(0,o.getMovieTrailer)(t.id),r=document.querySelector("#hero-section"),a=document.querySelector("#hero-title"),s=document.querySelector("#hero-rating"),l=document.querySelector("#hero-description"),c=document.querySelector(".hero-buttons"),d=document.querySelector(".movie-card"),u=document.querySelector(".movie-trailer-container");if(t){const o=t.genre_ids.map((t=>e[t]||"Unknown")).join(", ");r.style.background=`linear-gradient(87deg, #111 33.93%, rgba(17, 17, 17, 0.00) 78.91%), url('https://image.tmdb.org/t/p/original${t.backdrop_path}') lightgray`,r.style.backgroundSize="cover",r.style.backgroundPosition="center",r.style.backgroundRepeat="no-repeat",a.textContent=t.title,s.textContent=`Rating:  ${t.vote_average}`,l.textContent=(p=t.overview,g=250,p.length>g?p.slice(0,g)+"...":p),c.addEventListener("click",(e=>{if(e.preventDefault(),"more-details"===e.target.id){let e=`\n        \n        <div class="hero-movie-details-container">\n        <button class="close-btn">X</button>\n          <img src="https://image.tmdb.org/t/p/original${t.poster_path}" alt="${t.title}" width="248" height="315">\n           <div class="hero-movie-details">\n          <h3 class="hero-movie-title">${t.title}</h3>\n          <div class="hero-movie-info-container">\n            <div class="hero-movie-info">\n              <p class="hero-info-title"</p>Vote / Votes</p>\n              <p><span class="hero-rating-span">${t.vote_average}</span> / <span class="hero-rating-span">${t.vote_count}</span></p>\n            </div>\n            <div class="hero-movie-info">\n              <p class="hero-info-title">Popularity</p><span>${t.popularity}</span>\n            </div>\n            <div class="hero-movie-info">\n              <p class="hero-info-title">Genre</p><span>${o}</span>\n            </div>\n          </div>\n          <div class="hero-about-info">\n          <p class="hero-info-title">ABOUT</p>\n          <p class="hero-overview">${t.overview}</p>\n          </div>\n\n          <button class="add-to-library-btn">Add to my library</button>\n          </div>\n        </div>\n        `;d.innerHTML=e,d.classList.remove("is-hidden");document.querySelector(".close-btn").addEventListener("click",(()=>{d.classList.add("is-hidden")}));const n=document.querySelector(".add-to-library-btn");n.addEventListener("click",(()=>{i(t),n.textContent=r(t.id)?"Remove from library":"Add to my library"}));const r=e=>(JSON.parse(localStorage.getItem("library"))||[]).some((t=>t.id==e)),i=e=>{let t=JSON.parse(localStorage.getItem("library"))||[];r(e.id)?(t=t.filter((t=>t.id!=e.id)),localStorage.setItem("library",JSON.stringify(t))):(t.push(e),localStorage.setItem("library",JSON.stringify(t)))}}else if("watch-trailer"===e.target.id){if(n&&n.key){let e=`\n        <button class="close-btn">X</button>\n        <iframe width="560" height="315" src="https://www.youtube.com/embed/${n.key}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>\n    `;u.innerHTML=e,u.classList.remove("is-hidden")}else{u.classList.add("error-container");let e='\n        <button class="close-btn">X</button>\n        <p class="text-warning">OOPS...<br>\n        We are very sorry!<br>\n        But we couldn’t find the trailer.</p>\n    ';u.innerHTML=e,u.classList.remove("is-hidden")}u.querySelector(".close-btn").addEventListener("click",(()=>{u.classList.add("is-hidden")}))}}))}else{r.style.background="url('../images/hero-image.jpg') !important",r.style.backgroundSize="cover",r.style.backgroundPosition="center",r.style.backgroundRepeat="no-repeat",a.textContent="Let’s Make Your Own Cinema",l.textContent="Is a guide to creating a personalized movie theater experience. You'll need a projector, screen, and speakers. Decorate your space, choose your films, and stock up on snacks for the full experience.";let e='<button class="get-started-button">Get Started</button>';c.innerHTML=e}var p,g})();
//# sourceMappingURL=my-library.0111d72e.js.map