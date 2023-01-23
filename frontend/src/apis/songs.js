import { BASE_URL, UPDATE_STAR_RATING, VIEW_SONG_DETAILS } from '../urls';
async function fetchSongs(page, pageSize) {
    let url = BASE_URL + `/?page=${page}&per_page=${pageSize}`;
    try {
    const response = await fetch(url);
    const songs = await response.json();
    return songs;
    } catch (e) {
        alert(e)
    }
}

async function updateStarRating(song_id, star_rating) {
    let url = BASE_URL + `/${UPDATE_STAR_RATING}/${song_id}`;
    try {
        const res = fetch(url, { method: 'PUT', body: JSON.stringify({ star_rating }) });
        return res;
    } catch (e) {
        alert(e);
    }
}

async function getSongDetails(title) {
    let url = BASE_URL + `/${VIEW_SONG_DETAILS}/${title}`;
    try {
        const response = await fetch(url);
        const song = await response.json();
        return song;
    } catch (e) {
        alert(e);
    }
}

export {
    fetchSongs,
    updateStarRating,
    getSongDetails
}