import {BASE_URL} from '../urls';
async function fetchSongs(page, pageSize) {
    let url = BASE_URL+`/?page=${page}&per_page=${pageSize}`;
    const response = await fetch(url);
    const songs = await response.json();
    return songs;
  }

async function updateStarRating(song_id, star_rating){
    let url = BASE_URL+`/update_star_rating/${song_id}`;
    try{
        const res = fetch(url,{method:'PUT', body: JSON.stringify({star_rating})});
        const data = await res.json();
        return data
    } catch (e) {
        return e;
    }
}




export {
    fetchSongs,
    updateStarRating
}