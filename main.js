const musicAPI = 'https://proxy-itunes-api.glitch.me/'
const searchForm = document.querySelector('#search-form')


searchForm.addEventListener('submit', (event) => {
    console.log(document.getElementById('search-input').value)
    const searchInput = document.getElementById('search-input').value
    event.preventDefault()
    searchFor(searchInput.replace(" ","+"))
    searchForm.reset();
})

async function searchFor(searchTerm) {
    const data = await (fetch(musicAPI + '/search?term=' + searchTerm).then((response) => response.json()))
    {
        document.getElementById('results-section').innerHTML = ''
        for (let i = 0; i < data.results.length; i++) {
            if (data.results[i].kind === 'song') {
                createResult(data.results[i])
            }
        }
    }
}

function createResult(data) {
    let resultCard = document.createElement('div');
    document.getElementById('results-section').appendChild(resultCard);
    // resultCard.id = data.results
    resultCard.classList = "resultCard";

    let thumbnail = document.createElement('img');
    resultCard.appendChild(thumbnail)
    thumbnail.classList = 'thumbnail';
    thumbnail.src = data.artworkUrl100;

    let songName = document.createElement('p');
    resultCard.appendChild(songName)
    songName.classList = 'songName';
    songName.textContent = data.trackName;

    let artistName = document.createElement('p')
    resultCard.appendChild(artistName)
    artistName.classList = 'artistName'
    artistName.textContent = data.artistName;

    let audioContainer = document.createElement('audio')
    resultCard.appendChild(audioContainer)
    audioContainer.classList = 'audioContainer'
    audioContainer.setAttribute('controls', 'controls')
    let audioPreview = document.createElement('source')
    audioContainer.appendChild(audioPreview)
    audioPreview.src = data.previewUrl;
}