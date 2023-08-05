import React, { useEffect, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import PageNotFound from './components/PageNotFound/PageNotFound';
import BlogDetails from './components/Blog/BlogDetails';
import BlogCreateEdit from './components/Blog/BlogCreateEdit';
import Auth from './components/Auth/Auth';
import { checkAuth } from './services/apiClient';

function App() {
  useEffect(() => {
    
    const checkUserAuthentication = async () => {
      try {
        const response = await checkAuth();
        if (response.status == 200) {
          if (response.data.success == true) {
            localStorage.setItem('blog-user', JSON.stringify(response.data.user));
          } else {
            localStorage.removeItem('blog-user');
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
      <Route path='/' element={<Home />} />
      <Route path='/auth' element={<Auth />} />
      <Route path='/blog/details/:id' element={<BlogDetails />} />
      <Route path='/blog/create-edit/:id?' element={<BlogCreateEdit />} />
      <Route path='*' element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
