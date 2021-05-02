import React, { useCallback, useEffect, useState } from 'react';
import styles from './app.module.css';
import SearchHeader from './components/search_header/search_header';
import VideoDetail from './components/video_detail/video_detail';
import VideoList from './components/video_list/video_list';

function App({ youtube }) {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null); // setSelectedVideo : React Hook을 이용하여 state 추가

  const selectVideo = (video) => {
    setSelectedVideo(video);
  };

  const search = useCallback(
    query => {
      setSelectedVideo(null);
      youtube
        .search(query)
        .then(videos => setVideos(videos));
    }, 
    [youtube]
  );

  useEffect(() => {
    // 컴포넌트(의 state나 prop)가 업데이트나 마운트 될 때 마다 반복적으로 콜백함수가 호출된다
    // 컴포넌트가 업데이트될 때마다 네트워크 통신을 하는 것은 성능에 좋지 않으므로 [] (빈 배열)을 두 번째 인자로 전달함으로써 마운트됐을 때만 (한 번만)호출된다
    // 만약 videos가 업데이트된 경우에도 호출하고 싶다면 [videos]를 인자로 준다.
    // [name, videos] 와 같이 원하는 변수의 목록을 콜백함수의 인자로 전달할 수 있다.
    youtube
      .mostPopular()
      .then(videos => setVideos(videos));

  }, [youtube]);
  
  return (
  <div className={styles.app}>
    <SearchHeader onSearch={search} />
    <section className={styles.content}>
      {selectedVideo && 
        <div className={styles.detail}>
          <VideoDetail video={selectedVideo} />
        </div>
      }
      <div className={styles.list}>
        <VideoList videos={videos} onVideoClick={selectVideo} display={selectedVideo? 'list' : 'grid'} />
      </div>
    </section>
  </div>
  );
}

export default App;
