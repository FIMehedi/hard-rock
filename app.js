// Async way
const searchSongs = async () => {
    const searchText = document.getElementById('search-text').value;
    const url = `https://api.lyrics.ovh/suggest/${searchText}`;

    const res = await fetch(url);
    const data = await res.json();
    displaySongs(data.data);
};

const displaySongs = songs => {
    const songsContainer = document.getElementById('songs-container');
    songsContainer.innerHTML = ''
    songs.forEach(song => {
        const songTitle = song.title;
        const artistName = song.artist.name;
        const preview = song.preview;

        const songDiv = document.createElement('div');
        songDiv.classList = 'single-result row align-items-center my-3 p-3';
        songDiv.innerHTML = createSongItem(songTitle, artistName, preview);
        songsContainer.appendChild(songDiv);
    })
}

const createSongItem = (songTitle, artistName, preview) => {
    return `
    <div class="col-md-9">
        <h3 class="lyrics-name">${songTitle}</h3>
        <p class="author lead">Album by <span>${artistName}</span></p>
        <audio controls preload="none">
            <source src="${preview}" type="audio/mpeg">
        </audio>
    </div>
    <div class="col-md-3 text-md-right text-center">
        <button onclick="getLyrics('${artistName}', '${songTitle}')" class="btn btn-success">Get Lyrics</button>
    </div>
`}

// Fetch way
const getLyrics = (artistName, songTitle) => {
    const url = `https://api.lyrics.ovh/v1/${artistName}/${songTitle}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayLyrics(data.lyrics));
}

const displayLyrics = lyrics => {
    const songLyricsDiv = document.getElementById('song-lyrics');
    songLyricsDiv.innerText = lyrics;
}