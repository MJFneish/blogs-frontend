import React, { useEffect, useState } from 'react'
import { deleteBlog, getBlog } from '../../services/apiClient';
import { Link, useParams, useNavigate } from 'react-router-dom';
import styles from '../../assets/css/blog.module.css'
import Swal from 'sweetalert2';
import { getDate } from '../common/functions/functions';

function BlogDetails(props) {
  const user = props.user;
  const [blog, setBlog] = useState({});
  const [startPage, setStartPage] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();


  useEffect(() => {
    //i need to know if the id send is only numbers
    if (!/^\d+$/.test(id)) {
      Swal.fire(
        'Wait!',
        'it seams an error occurred while fetching the data',
        'info'
      ).then((result) => {
        navigate('/');
      });
    } else {
      const getBlogDetail = async () => {

        try {
          const response = await getBlog(id);
          if (response.status === 200) {
            setBlog(response.data.data);
            setStartPage(true);
          } else {
            Swal.fire(
              'Wait!',
              'it seams an error occurred while fetching the data',
              'info'
            ).then((result) => {
              navigate('/');
            });
          }
        } catch (error) {
          Swal.fire(
            'Wait!',
            'blog cannot be found please try again later or search for another blog',
            'info'
          ).then((result) => {
            navigate('/');
          });
        }
      };
      getBlogDetail(); // Call the function to fetch blogs
    }

  }, []);

  const deleteBlogById = async () => {
    try {
      const response = await deleteBlog(blog.id);
      if (response.status === 200) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        ).then(navigate('/'));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteBlog = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteBlogById();
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Your blog is still safe!',
        });
      }
    });
  };
  
  return (
    <div className={`container gap-15 mx-auto py-15 mt-5`}>
      <div className={`m-auto text-center pt-16 pb-5`}>
        <div className={`text-6xl font-bold`}>Blog Details Page</div>
      </div>
      {
        startPage &&
        <div key={blog.id} className={`container grid-cols-2 lg:w-3/5 gap-15 mx-auto py-16 mt-5 ${styles.card}`}>
          <div className={`mx-2 md:mx-0`}>
            <h2 className={` text-blue-600 font-bold text-4xl uppercase`}>{blog.name}</h2>
          </div>
          <div className={``}>
            <p className={`font-bold text-gray-500 text-lg p-4 `}>{blog.desc}</p>
            <p className={`mb-5 p-4`}>Done By : <span style={{ color: '#4070f4' }}>{blog.author}</span>&nbsp; &#x2022;&nbsp; {getDate(blog.updated_at)}</p>
            <Link to={`/blog/create-edit/${blog.id}`} className={`bg-green-600 text-gray-100 my-5 ml-5 py-3 px-4 rounded-lg font-bold uppercase place-self-start`}>Edit</Link>
            <button onClick={handleDeleteBlog} className={`bg-red-600 text-gray-100 my-5 ml-5 py-3 px-4 rounded-lg font-bold uppercase place-self-start`}>Delete</button>
          </div>
        </div>
      }

    </div>
  )
}

export default BlogDetails