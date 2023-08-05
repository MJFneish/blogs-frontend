import React, { useEffect, useState } from 'react'
import { EditBlog, addBlog, editBlog, getBlog } from '../../services/apiClient';
import { Link, useParams, useNavigate } from 'react-router-dom';
import styles from '../../assets/css/blog.module.css'
import authStyles from '../Auth/auth.module.css'
import Swal from 'sweetalert2';
import { generateSlug } from '../common/functions/functions';

function BlogCreateEdit(props) {
  const user = props.user;

  const [blog, setBlog] = useState({
    name: '',
    slug: '',
    desc: '',
  });
  const { id } = useParams();
  const navigate = useNavigate();

  
  useEffect(() => {
    const newSlug = generateSlug(blog.name);
    setBlog((b) => ({ ...b, slug: newSlug }));
  }, [blog.name]);


  useEffect(() => {
    //i need to know if the id send is only numbers
    if (id && !/^\d+$/.test(id)) {
      Swal.fire(
        'Wait!',
        'it seams an error occurred while fetching the data',
        'info'
      ).then((result) => {
        navigate('/');
      });
    } else if (id) {
      const getBlogDetail = async () => {

        try {
          const response = await getBlog(id);
          if (response.status === 200) {
            setBlog(response.data.data);
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
  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (blog.name == '' || (blog.name == '' && blog.desc == '')) {
      Swal.fire({
        title: 'Stop there!',
        text: "You need to fill all required input!",
        icon: 'warning',
      })
    } else {
      
      const createOrEditBlogInfo = async () => {
        let response;
        try {
          if (id)
            response = await editBlog(id, blog.user_id, blog.name, blog.slug, blog.desc, blog.author);
          else
            response = await addBlog(1, blog.name, blog.slug, blog.desc, 'author');
          if (response.status === 200) {
            setBlog(response.data.data);
            Swal.fire(
              'Success!',
              `${response.data.message}`,
              'success'
            ).then((result) => {
              navigate(`/blog/details/${response.data.data.id}`);
            });
          } else {
            Swal.fire(
              'Wait!',
              `${response.data.message}`,
              'info'
            )
          }
        } catch (error) {
          Swal.fire(
            'Oops...!',
            `${error.message}`,
            'info'
          );

          if(error?.response?.status == 401) {
            navigate(`/auth`);
          }
        }
      };
      createOrEditBlogInfo();
    }
  }
  return (
    <div className={`container gap-15 mx-auto py-15 mt-5`}>
      <div className={`container grid-cols-2 lg:w-3/5 gap-15 mx-auto py-16 ${styles.card}`}>
        <div className={`text-center text-6xl font-bold`}>{id? 'Edit Your Post' : 'Create new Post'}</div>
        <form className={`align-items-center ${authStyles.blogForm}`}>
          <div className={`${authStyles.field} ${authStyles.input_field}`}>
            <input
              type="text"
              value={blog.name}
              placeholder="Title of your post"
              onChange={(e) => setBlog((b) => ({ ...b, name: e.target.value }))}
              required={true} />
          </div>
          <div className={`${authStyles.field} ${authStyles.input_field}`}>
            <textarea
              placeholder="description"
              rows={7}
              className={`w-100 ${authStyles.password} `}
              required={true}
              onChange={(e) => setBlog((b) => ({ ...b, desc: e.target.value }))}
              value={blog.desc} />
          </div>
          <div className={`${authStyles.field} ${authStyles.button_field}`}>
            <button onClick={handleSubmitForm}>Submit changes</button>
          </div>
        </form>
      </div>
    </div>

  )
}

export default BlogCreateEdit