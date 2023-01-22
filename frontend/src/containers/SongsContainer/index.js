import React, { useState, useEffect } from 'react';
import {useSearchParams} from 'react-router-dom';
import {fetchSongs} from '../../apis/songs';

const SongsContainer = () => {
  const pageSize = 10;
  const [searchParams, setSearchParams] = useSearchParams();
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(searchParams.get('page') || 1);
  const [songsData, setSongsData] = useState([]);

  useEffect(() => {
    fetchSongs(page,pageSize).then(songs => {
      setSongsData(songs);
    }).catch((err) => {throw(err)});
  },[]);

  return (
    <div>
      <p>You clicked {count} times {page}</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}

export default SongsContainer;