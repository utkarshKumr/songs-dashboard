import React, { useState, useEffect } from 'react';
import {useSearchParams} from 'react-router-dom';
import {fetchSongs} from '../../apis/songs';

import SongsTable from '../../components/songsTable';

const SongsContainer = () => {
  const pageSize = 10;
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(searchParams.get('page') || 1);
  const [songsData, setSongsData] = useState([]);
  const [showNext, setShowNext] = useState(false);

  useEffect(() => {
    fetchSongs(page,pageSize).then(res => {
      let {data = '', next_ = false} = res
      data = JSON.parse(data)
      setShowNext(next_);
      setSongsData(data);
    }).catch((err) => {throw(err)});
  },[]);
  
  console.log(songsData,"songsData");
  return (
    <div>
      <SongsTable data={songsData}/>
    </div>
  );
}

export default SongsContainer;