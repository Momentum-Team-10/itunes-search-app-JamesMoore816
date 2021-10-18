const musicAPI = 'https://itunes.apple.com/'
const searchForm = document.querySelector('#search-form')
console.log('test')


searchForm.addEventListener('submit', (event) => {
    console.log(document.getElementById('search-input').value)
    const searchInput = document.getElementById('search-input').value
    event.preventDefault()
    searchFor(searchInput)
    searchForm.reset();
})

function searchFor(searchTerm) {
    console.log(musicAPI + '/search?term=' + searchTerm)
    fetch(musicAPI + '/search?term=' + searchTerm)
    .then((response) => response.json())
    .then((data) => {
        console.log(data)
})
}