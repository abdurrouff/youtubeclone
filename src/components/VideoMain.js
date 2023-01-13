import React, { useEffect, useState } from 'react';
import Video from './Video';
import styled from 'styled-components';

function VideoMain() {
  return (
    <Container>
      <h2>Recommended</h2>
      <Video />
    </Container>
  );
}
export default VideoMain;
const Container = styled.section`
  background-color: #f9f9f9;
  padding: 40px 20px;
  overflow-y: scroll;
  width: 100%;
`;
