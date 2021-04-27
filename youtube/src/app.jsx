import React, { useEffect, useState } from 'react';
import styles from './app.module.css';
import SearchHeader from './components/search_header/search_header';
import VideoList from './components/video_list/video_list';

function App() {
  const [videos, setVideos] = useState([]);
  const search = query => {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    fetch(
      `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${query}&type=video&key=AIzaSyAGSff-g2uYBvqpIdrUSijYV5G-jjJXNV0`
      , requestOptions
    )
      .then(response => response.json())
      .then(result => result.items.map(item => ({ ...item, id: item.id.videoId })))
      .then(items => setVideos(items))
      .catch(error => console.log('error', error));
  };

  useEffect(() => {
    // 컴포넌트(의 state나 prop)가 업데이트나 마운트 될 때 마다 반복적으로 콜백함수가 호출된다
    // 컴포넌트가 업데이트될 때마다 네트워크 통신을 하는 것은 성능에 좋지 않으므로 [] (빈 배열)을 두 번째 인자로 전달함으로써 마운트됐을 때만 (한 번만)호출된다
    // 만약 videos가 업데이트된 경우에도 호출하고 싶다면 [videos]를 인자로 준다.
    // [name, videos] 와 같이 원하는 변수의 목록을 콜백함수의 인자로 전달할 수 있다.
    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    fetch(
      "https://youtube.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=25&key=AIzaSyAGSff-g2uYBvqpIdrUSijYV5G-jjJXNV0"
      ,requestOptions
    )
      .then(response => response.json())  // response.text(), resonse.json()
      .then(result => setVideos(result.items))
      .catch(error => console.log('error', error))

  }, []);
  return (
  <div className={styles.app}>
    <SearchHeader onSearch={search} />
    <VideoList videos={videos} />
  </div>
  );
}

export default App;
