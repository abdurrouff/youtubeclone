import React, { useState, useContext, useEffect } from 'react';
import { useCallback } from 'react';
import youtube from './youtube';
import jwtDecode from 'jwt-decode';
// import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import { setUserLogin } from './features/user/userSlice';
import { useDispatch } from 'react-redux/es/exports';
import { setVideos } from './features/video/videoSlice';

const AppContext = React.createContext();
// client ID
// 488921957282 - utnaek4o3l7lh62so0d4c4ofm3a79v0b.apps.googleusercontent.com;

// client secret
// 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
const AppProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchList, setSearchList] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // LOGIN
  function handleCallBackResponse(response) {
    var userObject = jwtDecode(response.credential);
    dispatch(
      setUserLogin({
        name: userObject.name,
        email: userObject.email,
        photo: userObject.picture,
      })
    );
    document.getElementById('signInDiv').hidden = true;
  }

  const fetchVideos = async () => {
    try {
      let response = await youtube.get('/videos', {
        params: {
          part: 'snippet, contentDetails, statistics',
          chart: 'mostPopular',
          maxResults: 20,
          key: 'AIzaSyA9PDfxLTmp263PT6Mut4RKox3VXAgdjs4',
        },
      });
      dispatch(setVideos(response.data.items));
    } catch (error) {
      console.log(error.response);
    }
  };
  useEffect(() => {
    fetchVideos();
  }, []);
  useEffect(() => {
    /* global google*/
    google.accounts.id.initialize({
      client_id:
        '488921957282-utnaek4o3l7lh62so0d4c4ofm3a79v0b.apps.googleusercontent.com',
      callback: handleCallBackResponse,
    });
    google.accounts.id.renderButton(document.getElementById('signInDiv'), {
      theme: 'outline',
      size: 'large',
    });
  }, []);
  // END OF LOGIN
  useEffect(() => {
    async function getSearchList() {
      try {
        const response = await youtube.get('/search', {
          params: {
            part: 'snippet',
            q: searchTerm,
            maxResults: 20,
            key: 'AIzaSyA9PDfxLTmp263PT6Mut4RKox3VXAgdjs4',
          },
        });
        setSearchList(response.data.items);
      } catch (error) {
        console.log(error.response);
      }
    }
    getSearchList();
  }, [searchTerm]);
  return (
    <AppContext.Provider
      value={{
        searchTerm,
        setSearchTerm,
        searchList,
        isSidebarOpen,
        setIsSidebarOpen,
        fetchVideos,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
