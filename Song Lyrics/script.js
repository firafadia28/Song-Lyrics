const form = document.getElementById('form');
const search = document.getElementById('search');
const result = document.getElementById('result');

const apiURL = 'https://api.lyrics.ovh';

// menambahkan event listener di form
form.addEventListener('submit', (e) => {
  e.preventDefault();
  searchValue = search.value.trim();

  // memeriksa apakah search value kosong atau tidak
  if (!searchValue) {
    alert('Tidak ada yang dicari');
  } else {
    searchSong(searchValue);
  }
});

// mencari lagu
async function searchSong(searchValue) {
  const searchResult = await fetch(`${apiURL}/suggest/${searchValue}`);
  const data = await searchResult.json();

  showData(data);
}

// update DOM
function showData(data) {
  result.innerHTML = `
   
    <ul class="song-list">
      ${data.data
        .map(
          (song) => `<li>
                    <div>
                        <strong>${song.artist.name}</strong> -${song.title} 
                    </div>
                    <span data-artist="${song.artist.name}" data-songtitle="${song.title}"> get lyrics</span>
                </li>`
        )
        .join('')}
    </ul>
  `;
}

// event listener di button
result.addEventListener('click', (e) => {
  const clickedElement = e.target;

  //memeriksa clickedElement adalah button atau bukan
  if (clickedElement.tagName === 'SPAN') {
    const artist = clickedElement.getAttribute('data-artist');
    const songTitle = clickedElement.getAttribute('data-songtitle');

    getLyrics(artist, songTitle);
  }
});

// mendapatkan lirik dari lagu
async function getLyrics(artist, songTitle) {
  const res = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);

  const data = await res.json();
  const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');
  result.innerHTML = ` 
    <h4 style="margin-bottom:40px;"><strong>${artist}</strong> - ${songTitle}</h4><ul>
    <div data-artist="${artist}" data-songtitle="${songTitle}"> get lyrics</div>
    <p style="margin-top:30px;">${lyrics}</p>
`;
}
