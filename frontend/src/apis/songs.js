import { BASE_URL, UPDATE_STAR_RATING, VIEW_SONG_DETAILS } from '../urls';
async function fetchSongs(page, pageSize) {
    let url = BASE_URL + `/?page=${page}&per_page=${pageSize}`;
    const response = await fetch(url);
    const songs = await response.json();
    return songs;
}

async function updateStarRating(song_id, star_rating) {
    let url = BASE_URL + `/${UPDATE_STAR_RATING}/${song_id}`;
    try {
        const res = fetch(url, { method: 'PUT', body: JSON.stringify({ star_rating }) });
        const data = await res.json();
        return data
    } catch (e) {
        return e;
    }
}

async function getSongDetails(title) {
    let url = BASE_URL + `/${VIEW_SONG_DETAILS}/${title}`;
    try {
        const response = await fetch(url);
        const song = await response.json();
        return song;
    } catch (e) {
        return e;
    }
}

export {
    fetchSongs,
    updateStarRating,
    getSongDetails
}