const musicAPI = 'https://proxy-itunes-api.glitch.me/'
const searchForm = document.querySelector('#search-form')

// Adds listener to submit button to take input field value and run it through
// the search, replacing spaces with + inside the search string url
searchForm.addEventListener('submit', (event) => {
    console.log(document.getElementById('search-input').value)
    const searchInput = document.getElementById('search-input').value
    event.preventDefault()
    searchFor(searchInput.replace(" ", "+"))
    searchForm.reset();
})

async function searchFor(searchTerm) {
    try {
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
    catch(error) {
        console.log(error)
        alert('Please try your search again.')
    }
}

function createResult(data) {
    // Creates cards for each result and appends them to results section div
    let resultCard = document.createElement('div');
    document.getElementById('results-section').appendChild(resultCard);
    resultCard.classList = "resultCard";
    // Takes thumbnail URL from JSON data to create an img to append to result card
    let thumbnail = document.createElement('img');
    resultCard.appendChild(thumbnail)
    thumbnail.classList = 'thumbnail';
    thumbnail.src = data.artworkUrl100;
    // Creates a div to hold the icon and text of the song title, pulled from the JSON
    // data and appended to the result card. Titles too long to fit will be truncated
    // and displayed with an ellipsis.
    let songDiv = document.createElement('div')
    resultCard.appendChild(songDiv)
    let songIcon = document.createElement('i')
    songIcon.classList = 'fas fa-music'
    songDiv.appendChild(songIcon)
    let songName = document.createElement('p');
    songDiv.appendChild(songName)
    songName.classList = 'songName';
    if (data.trackName.length > 20) {
        songName.textContent = data.trackName.substring(0, 19) + '...'
    }
    else { songName.textContent = data.trackName }

    let artistDiv = document.createElement('div')
    resultCard.appendChild(artistDiv)
    let artistIcon = document.createElement('i')
    artistIcon.classList = 'fas fa-user'
    artistDiv.appendChild(artistIcon)
    let artistName = document.createElement('p')
    artistDiv.appendChild(artistName)
    artistName.classList = 'artistName'
    if (data.artistName.length > 20) {
        artistName.textContent = data.artistName.substring(0, 19) + '...'
    }
    else { artistName.textContent = data.artistName }

    let albumDiv = document.createElement('div')
    resultCard.appendChild(albumDiv)
    let albumIcon = document.createElement('i')
    albumIcon.classList = 'fas fa-record-vinyl'
    albumDiv.appendChild(albumIcon)
    let albumName = document.createElement('p')
    albumDiv.appendChild(albumName)
    albumName.classList = 'albumName'
    if (data.collectionName.length > 20) {
        albumName.textContent = data.collectionName.substring(0, 19) + '...'
    }
    else { albumName.textContent = data.collectionName }

    let yearDiv = document.createElement('div')
    resultCard.appendChild(yearDiv)
    let yearIcon = document.createElement('i')
    yearIcon.classList = 'fas fa-calendar-alt'
    yearDiv.appendChild(yearIcon)
    let yearInfo = document.createElement('p')
    yearDiv.appendChild(yearInfo)
    yearInfo.classList = 'yearInfo'
    yearInfo.textContent = data.releaseDate.substring(0, 4)

    let audioContainer = document.createElement('audio')
    resultCard.appendChild(audioContainer)
    audioContainer.classList = 'audioContainer'
    audioContainer.setAttribute('controls', 'controls')
    let audioPreview = document.createElement('source')
    audioContainer.appendChild(audioPreview)
    audioPreview.src = data.previewUrl;
}