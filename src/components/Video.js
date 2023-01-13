import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { selectVideos } from '../features/video/videoSlice';
import youtube from '../youtube';
import { useState } from 'react';
import { useGlobalContext } from '../context';
import moment from 'moment';
import numeral from 'numeral';
import InfiniteScroll from 'react-infinite-scroll-component';
function Video() {
  const videos = useSelector(selectVideos);
  const { fetchVideos } = useGlobalContext();
  const fetchData = () => {
    fetchVideos();
  };
  return (
    <InfiniteScroll
      dataLength={videos.length} //This is important field to render the next data
      next={fetchData}
      hasMore={true}
      loader={<h4>Loading...</h4>}
    >
      <Container>
        {videos.map((video) => {
          return <SingleVideo video={video} key={video.id} />;
        })}
      </Container>
    </InfiniteScroll>
  );
}
const SingleVideo = ({ video }) => {
  const { isSidebarOpen } = useGlobalContext();
  const {
    id,
    snippet: {
      channelId,
      channelTitle,
      description,
      publishedAt,
      title,
      thumbnails: { medium },
    },
    // statistics: { viewCount },
  } = video;
  const [channelData, setChannelData] = useState({});
  useEffect(() => {
    async function getChannelImg() {
      const response = await youtube.get('channels/', {
        params: {
          part: 'snippet',
          id: channelId,
          key: 'AIzaSyA9PDfxLTmp263PT6Mut4RKox3VXAgdjs4',
        },
      });
      setChannelData(response.data.items[0].snippet);
    }
    getChannelImg();
  }, []);

  const [views, setViews] = useState(null);
  const [duration, setDuration] = useState(null);

  const seconds = moment.duration(duration).asSeconds;
  const _duration = moment.utc(seconds * 1000).format('mm:ss');
  useEffect(() => {
    const getVideoDetails = async () => {
      const {
        data: { items },
      } = await youtube.get('/videos', {
        params: {
          part: 'contentDetails,statistics',
          id: id,
          key: 'AIzaSyA9PDfxLTmp263PT6Mut4RKox3VXAgdjs4',
        },
      });
      setDuration(items[0].contentDetails.duration);
      setViews(items[0].statistics.viewCount);
    };
    getVideoDetails();
  }, [id]);
  return (
    <VideoPiece show={isSidebarOpen}>
      <a href={`https://www.youtube.com/embed/${id}`}>
        <VideoImg show={isSidebarOpen}>
          <img src={medium.url} />
        </VideoImg>
      </a>
      <VideoDetails>
        <VideoDetailsImg>
          <img src={channelData?.thumbnails?.medium?.url} />
        </VideoDetailsImg>
        <VideoDetailsTexts>
          <UpPart>{title}</UpPart>
          <DownPart>
            <p>
              {channelTitle} <span>verified</span>
            </p>
            <p>
              {numeral(views).format('0.a')} views
              <span> {moment(publishedAt).fromNow()}</span>
            </p>
          </DownPart>
        </VideoDetailsTexts>
      </VideoDetails>
    </VideoPiece>
  );
};

export default Video;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 20px;
`;

const VideoPiece = styled.div`
  height: 320px;
  width: ${(prop) => (prop.show ? '340px' : '320px')};
  /* overflow: hidden; */
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const VideoImg = styled.div`
  height: 200px;
  /* width: ${(prop) => (prop.show ? '320px' : '300px')}; */
  img {
    border-radius: 15px;
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;

const VideoDetails = styled.div`
  display: flex;
  flex-direction: row;
`;

const VideoDetailsImg = styled.div`
  width: 20%;
  img {
    height: 40px;
    border-radius: 100%;
  }
`;

const VideoDetailsTexts = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  word-wrap: break-word;
`;

const UpPart = styled.div`
  font-size: 12px;
  font-weight: bold;
  line-height: 1.5;
`;

const DownPart = styled.div`
  font-size: 12px;
  font-weight: lighter;
  line-height: 1.5;
  color: gray;
`;
