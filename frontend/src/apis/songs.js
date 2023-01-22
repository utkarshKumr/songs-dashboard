import {BASE_URL} from '../urls';
async function fetchSongs(page, pageSize) {
    let url = BASE_URL+`/?page=${page}&per_page=${pageSize}`;
    const response = await fetch(url);
    const songs = await response.json();
    return songs;
  }


export {
    fetchSongs
};