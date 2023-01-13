import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUserName, selectUserPhoto } from '../features/user/userSlice';
import {
  AiOutlineMenu,
  AiOutlineSearch,
  AiFillVideoCamera,
} from 'react-icons/ai';
import { GrApps, GrNotification } from 'react-icons/gr';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useGlobalContext } from '../context';
function Header() {
  const userName = useSelector(selectUserName);
  const userPhoto = useSelector(selectUserPhoto);
  const { searchTerm, setSearchTerm, isSidebarOpen, setIsSidebarOpen } =
    useGlobalContext();
  return (
    <Nav>
      <NavLeft>
        <AiOutlineMenu onClick={() => setIsSidebarOpen(!isSidebarOpen)} />
        <Link to='/'>
          <img
            src='https://imgs.search.brave.com/nKoUlsnCjVglVPt38pyQh0JgAn1snVoe5czubt4fR7I/rs:fit:844:225:1/g:ce/aHR0cHM6Ly90c2Uz/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5f/MG1KZUwxbXg5NEt3/N0cyVGtMdTJRSGFF/SyZwaWQ9QXBp'
            alt=''
          />
        </Link>
      </NavLeft>
      <NavCenter>
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder='Search'
          type='text'
        />
        <Link to={`/search/${searchTerm}`}>
          <SearchIcon>
            <AiOutlineSearch />
          </SearchIcon>
        </Link>
      </NavCenter>
      <NavRight>
        {!userName ? (
          <div className='noSignUp'>
            <BiDotsVerticalRounded />
            <div id='signInDiv'></div>
          </div>
        ) : (
          <div className='logged-in'>
            <AiFillVideoCamera />
            <GrApps />
            <GrNotification />
            <img src={userPhoto} alt='' />
          </div>
        )}
      </NavRight>
    </Nav>
  );
}

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
  padding: 0px 40px;
  position: sticky;
  top: 0;
  z-index: 1;
`;

const NavLeft = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  svg {
    width: 30px;
    height: 30px;
  }
  img {
    height: 50px;
    width: 80px;
  }
`;

const NavCenter = styled.div`
  border: 1px solid lightgray;
  height: 50px;
  display: flex;
  width: 40%;
  input {
    flex: 1;
    border: none;
    padding: 5px;
    outline: none;
    font-size: 25px;
  }
`;
const SearchIcon = styled.div`
  width: 60px;
  background: #fafafa;
  color: gray;
  height: 100%;
  cursor: pointer;
  display: grid;
  place-items: center;
`;

const NavRight = styled.div`
  .logged-in {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 7px;
    cursor: pointer;
    img {
      height: 25px;
    }
  }
  .noSignUp {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 3px;
  }
`;

export default Header;
