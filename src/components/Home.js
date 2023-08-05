import React, { useEffect, useState } from 'react'
import styles from '../assets/css/blog.module.css'
import { getAllBlogs } from '../services/apiClient';
import { Link } from 'react-router-dom';
import { getDate } from './common/functions/functions';

function Home() {
  const perPage = 10;
  const [firstId, setFirstId] = useState(0);
  let [allBlogs, setAllBlogs] = useState([]);
  let [fetching, setFetching] = useState(false);
  let [scrollHeight, setScrollHeight] = useState(0);


  let getBlogs = async () => {
    if(fetching) return;
      setFetching(true);
      try {
  console.log(firstId, perPage)
        let params = {firstId, perPage}
        const response = await getAllBlogs(params);
        if (response.status === 200) {
          setAllBlogs([ ...allBlogs, ...response.data.data ]);
          setFirstId(response.data.data.reduce((max, blog) => (blog.id > max ? blog.id : max), firstId))
        }
      } catch (error) {
        console.error(error);
      }
      setFetching(false);
    
  };

  useEffect(() => {
    getBlogs()
  }, []);

  const handleScroll = () => {
    const pageHeight = document.documentElement.scrollHeight;
    if (scrollHeight >= pageHeight - 400) {
      getBlogs();
    }
  };

  useEffect(() => {
    handleScroll()
  }, [scrollHeight]);
  
  window.addEventListener('scroll', function () {
    setScrollHeight(window.innerHeight + window.scrollY)
  });
  
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