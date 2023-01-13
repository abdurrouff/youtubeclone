import React, { useEffect, useState } from 'react';
import { MdTune } from 'react-icons/md';
import styled from 'styled-components';
import { useGlobalContext } from '../context';
import youtube from '../youtube';
function Search() {
  const { searchList } = useGlobalContext();
  return (
    <Container>
      <header>
        <MdTune />
        <h4>FILTER</h4>
      </header>
      <hr />
      <Section>
        {searchList.map((video) => {
          return <SingleVideo video={video} />;
        })}
      </Section>
    </Container>
  );
}

const SingleVideo = ({ video }) => {
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
  } = video;
  const [channelData, setChannelData] = useState({});
  useEffect(() => {
    async function getChannelImg() {
      const response = await youtube.get('channels/', {
        params: {
          part: 'snippet',
          key: 'AIzaSyA9PDfxLTmp263PT6Mut4RKox3VXAgdjs4',
          id: channelId,
          maxResults: 20,
        },
      });
      setChannelData(response.data.items[0].snippet);
    }
    getChannelImg();
  });
  console.log(id);
  return (
    <VideoPiece key={id}>
      <a href={`https://www.youtube.com/embed/${channelId}`}>
        <VideoImg>
          <img src={medium.url} />
        </VideoImg>
        <VideoDetails>
          <VideoDetailsImg>
            <img src={channelData?.thumbnails?.medium?.url} />
          </VideoDetailsImg>
          <VideoDetailsTexts>
            <UpPart>{title}</UpPart>
            <DownPart>
              <p>
                {channelTitle} <span>verified</span>{' '}
              </p>
              {/* <p>
                      {viewCount
                        ? `{viewCount} views <span>3 hours ago</span>`
                        : []}
                    </p> */}
              <p>yoo</p>
            </DownPart>
          </VideoDetailsTexts>
        </VideoDetails>
      </a>
    </VideoPiece>
  );
};

const Container = styled.div`
  background-color: #f9f9f9;
  padding: 20px 20px;
  bottom: 0;
  header {
    display: flex;
    flex-direction: row;
    gap: 5px;
    align-items: center;
    color: grey;
    cursor: pointer;
    width: 100px;
  }
  hr {
    margin: 12px 0px;
  }
`;
const Section = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px;
`;
const VideoPiece = styled.div`
  height: 300px;
  width: 250px;
  overflow: hidden;
  a {
    text-decoration: none;
  }
`;

const VideoImg = styled.div`
  height: 200px;
  width: 250px;
  img {
    object-fit: contain;
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

export default Search;
