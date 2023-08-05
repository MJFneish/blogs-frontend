import React, { useEffect, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import PageNotFound from './components/PageNotFound/PageNotFound';
import BlogDetails from './components/Blog/BlogDetails';
import BlogCreateEdit from './components/Blog/BlogCreateEdit';
import Auth from './components/Auth/Auth';
import { checkAuth } from './services/apiClient';

function App() {
  const [user, setUser] = useState({});

  useEffect(() => {
    const checkUserAuthentication = async () => {

      try {
        const response = await checkAuth();
        if (response.status == 200) {
          if (response.data.success == true) {
            setUser(response.data.user, { active: true });
          } else {
            setUser({ active: false });

          }
        }
      } catch (error) {
        console.log(error.message);
      }
    }
    checkUserAuthentication();
  }, []);

  return (
    <Routes>
      <Route path='/' element={<Home user={user} />} /> {/*sho all blogs from all users*/}
      <Route path='/auth' element={<Auth user={user} />} />
      <Route path='/blog/details/:id' element={<BlogDetails user={user} />} /> {/*sho detailed blogs from current user*/}
      <Route path='/blog/create-edit/:id?' element={<BlogCreateEdit user={user} />} /> {/*create a blog from current user*/}
      <Route path='*' element={<PageNotFound user={user} />} />
    </Routes>
  );
}

export default App;
