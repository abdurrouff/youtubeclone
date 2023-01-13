import React from 'react';
import SidebarRow from './SidebarRow';
import { useSelector } from 'react-redux';
import { selectUserName } from '../features/user/userSlice';
import { AiOutlineHome, AiOutlineHistory, AiOutlineLike } from 'react-icons/ai';
import {
  MdOutlineExplore,
  MdOutlineSubscriptions,
  MdOutlineVideoLibrary,
  MdOndemandVideo,
  MdOutlineWatchLater,
  MdPlaylistPlay,
} from 'react-icons/md';

import styled from 'styled-components';
import { useGlobalContext } from '../context';
function Sidebar() {
  const { isSidebarOpen } = useGlobalContext();
  const userName = useSelector(selectUserName);
  return (
    <Aside show={isSidebarOpen}>
      {/* <div> */}
      <SidebarRow Icon={AiOutlineHome} title='Home' />
      <SidebarRow Icon={MdOutlineExplore} title='Explore' />
      <SidebarRow Icon={MdOutlineSubscriptions} title='Subscription' />
      <hr />
      <SidebarRow Icon={MdOutlineVideoLibrary} title='Library' />
      <SidebarRow Icon={AiOutlineHistory} title='History' />

      {!isSidebarOpen && (
        <div>
          <SidebarRow Icon={MdOndemandVideo} title='Video' />
          <SidebarRow Icon={MdOutlineWatchLater} title='Watch later' />
          <SidebarRow Icon={AiOutlineLike} title='Liked videos' />
          <SidebarRow Icon={MdPlaylistPlay} title='Now' />
        </div>
      )}
      {/* </div> */}
    </Aside>
  );
}

const Aside = styled.aside`
  width: ${(props) => (props.show ? '150px' : '250px')};
  height: calc(100vh - 70px);
  /* overflow-y: scroll; */
  hr {
    height: 1px;
    opacity: 0.6;
    margin: 10px 10px 0px;
    border-color: black;
  }
  @media (max-width: 600px) {
    display: ${(props) => (props.show ? 'none' : 'block')};
    /* div {
      display: flex;
      justify-content: center;
    } */
  }
`;
export default Sidebar;
