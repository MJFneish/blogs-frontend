import React, { useEffect, useState } from 'react'
import styles from '../assets/css/blog.module.css'
import { getAllBlogs } from '../services/apiClient';
import { Link } from 'react-router-dom';
import { getDate } from './common/functions/functions';

function Home(props) {
  const user = props.user;
  const batchSize = 15; // number of blogs to be shown each time scroll
  const [allBlogs, setAllBlogs] = useState([]);
  const [startEffects, setStartEffects] = useState(false);
  useEffect(() => {
    const getBlogs = async () => {
      try {
        const response = await getAllBlogs();
        if (response.status === 200) {
          setAllBlogs(response.data.data);
          setStartEffects(true);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getBlogs(); // Call the function to fetch blogs
  }, []);

  const [startIndex, setStartIndex] = useState(0);
  const [visibleBlogs, setVisibleBlogs] = useState([]);
  const loadMoreBlogs = () => {
    const nextStartIndex = startIndex + batchSize;
    const nextBlogs = allBlogs.slice(nextStartIndex, nextStartIndex + batchSize);
    setVisibleBlogs((prevBlogs) => [...prevBlogs, ...nextBlogs]);
    setStartIndex(nextStartIndex);
  };

  useEffect(() => {
    // Load the initial batch of products when the component mounts
    const initialBlogs = allBlogs.slice(startIndex, startIndex + batchSize);
    setVisibleBlogs(initialBlogs);
  }, [startEffects]);
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.innerHeight + window.scrollY;
      const pageHeight = document.documentElement.scrollHeight;
      if (scrollPosition >= pageHeight - 400) {
        loadMoreBlogs();
        console.log(visibleBlogs);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [startIndex]);
  
  return (
    <div className={`container gap-15 mx-auto py-15 mt-5`}>
      <div className={`m-auto text-center pt-16 pb-5`}>
        <div className={`text-6xl font-bold`}>All Posts</div>
      </div>
      {visibleBlogs.map((blog) => (
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