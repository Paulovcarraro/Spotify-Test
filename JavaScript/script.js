const searchInput = document.getElementById("search-input");
const resultArtist = document.getElementById("result-artist");
const resultPlaylist = document.getElementById("result-playlists");
const arrowLeft = document.getElementById("arrow-left");
const arrowRight = document.getElementById("arrow-right");

let currentArtistIndex = 0;
let artistsData = [];

function requestApi(searchTerm) {
  const url = `http://localhost:3000/artists?name_like=${searchTerm}`;
  fetch(url)
    .then((response) => response.json())
    .then((result) => {
      console.log("Dados recebidos da API:", result); // Verificar dados recebidos da API
      displayResults(result);
    })
    .catch((error) => console.log("Erro na requisição:", error));
}

function displayResults(result) {
  console.log("Dados recebidos da API:", result);
  resultPlaylist.classList.add("hidden");
  artistsData = result;
  currentArtistIndex = 0;

  if (artistsData.length === 0) {
    resultArtist.innerHTML = "<p>Nenhum Artista encontrado.</p>";
    return;
  }

  currentArtistIndex = 0;
  showArtist(currentArtistIndex);
  resultArtist.classList.remove("hidden");
}

function showArtist(index) {
  const artist = artistsData[index];
  console.log("Exibindo artista:", artist);
  if (!artist) return;

  resultArtist.innerHTML = `
    <div class="grid-container">
      <div class="artist-card">
        <div class="card-img">
          <img id="artist-img" class="artist-img" src="${artist.urlImg}" alt="${artist.name}">
          <div class="play">
            <span class="fa fa-play"></span>
          </div>
        </div>
        <p>${artist.name}</p>
      </div>
    </div>
  `;
}

if (arrowLeft) {
  arrowLeft.addEventListener("click", function () {
    if (currentArtistIndex > 0) {
      currentArtistIndex--;
      console.log("Índice atual (esquerda):", currentArtistIndex);
      showArtist(currentArtistIndex);
    }
  });
}

if (arrowRight) {
  arrowRight.addEventListener("click", function () {
    if (currentArtistIndex < artistsData.length - 1) {
      currentArtistIndex++;
      console.log("Índice atual (direita):", currentArtistIndex);
      showArtist(currentArtistIndex);
    }
  });
}

document.addEventListener("input", function () {
  const searchTerm = searchInput.value.toLowerCase();
  console.log("Termo de pesquisa:", searchTerm);
  if (searchTerm === "") {
    resultArtist.innerHTML = "";
    resultPlaylist.classList.add("hidden");
    return;
  }

  requestApi(searchTerm);
});
