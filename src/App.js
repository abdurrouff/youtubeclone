import React from 'react';
// import { render } from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import VideoMain from './components/VideoMain';
import Sidebar from './components/Sidebar';
import Search from './components/Search';
import styled from 'styled-components';
function App() {
  return (
    <BrowserRouter>
      <div className='app'>
        <Header />
        <Main>
          <Sidebar />
          <Routes>
            <Route path='/' element={<VideoMain />} />
            <Route path='search/:searchTerm' element={<Search />} />
          </Routes>
        </Main>
      </div>
    </BrowserRouter>
  );
}
const Main = styled.main`
  height: calc(100vh - 70px);
  overflow-y: hidden;
`;
export default App;
