import React, { useEffect, useState } from 'react'
import styles from '../assets/css/blog.module.css'
import { getAllBlogs } from '../services/apiClient';
import { Link } from 'react-router-dom';
import { getDate } from './common/functions/functions';

function Home() {
  const perPage = 10;
  const [firstId, setFirstId] = useState(0);
  const [allBlogs, setAllBlogs] = useState([]);
  const [dummy, setDummy] = useState(0);
  const [requestAccess, setRequestAccess] = useState(true);


  const getBlogs = async () => {
    if(dummy%2 == 0){
      try {
        const response = await getAllBlogs(firstId, perPage);
        if (response.status === 200) {
          setAllBlogs((prevBlogs) => [ ...prevBlogs, ...response.data.data ]);
          setFirstId(response.data.data.reduce((max, blog) => (blog.id > max ? blog.id : max), firstId))
          setRequestAccess(true);
          console.log(allBlogs);
        }
      } catch (error) {
        console.error(error);
      }
    }
    setDummy(dummy++);
  };

  useEffect(() => {
    getBlogs()
  }, []);

  const handleScroll = () => {
    const scrollPosition = window.innerHeight + window.scrollY;
    const pageHeight = document.documentElement.scrollHeight;
    if (scrollPosition >= pageHeight - 400) {
      getBlogs();
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  console.log(allBlogs)
  return (
    <div className={`container gap-15 mx-auto py-15 mt-5`}>
      <div className={`m-auto text-center pt-16 pb-5`}>
        <div className={`font-bold lg:text-6xl md:text-5xl text-4xl`}>All Posts</div>
      </div>
      {allBlogs.map((blog) => (
        <div key={blog.id} className={`container grid-cols-2 lg:w-3/5 gap-15 mx-auto py-16 mt-5 ${styles.card}`}>
          <div className={`mx-2 md:mx-0`}>
            <h2 className={`text-blue-600 font-bold text-4xl uppercase`}>{blog.name}</h2>
          </div>
          <div className={``}>
            <p className={`font-bold text-gray-500 text-lg p-4 `}>{blog.desc}</p>
            <p className={`mb-5 p-4`}>Done By : <span className={`text-blue-500`}>{blog.author}</span>&nbsp; &#x2022;&nbsp; {getDate(blog.updated_at)}</p>
            <Link to={`/blog/details/${blog.id}`} className={`bg-blue-600 text-gray-100 my-5 py-3 px-4 rounded-lg font-bold uppercase place-self-start`}>Read More</Link>
          </div>
        </div>
      ))}

    </div>
  )
}

export default Home