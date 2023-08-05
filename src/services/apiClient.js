import axios from 'axios';

const APIClient = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
});

APIClient.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("blog-token");
  if( accessToken ) {
    config.headers.Authorization = "Bearer " + accessToken;
  }
  return config;
});


// Auth API functions 
export const login = (username, password) => {
  return APIClient.post('/auth/login', { username, password });
};

export const register = (username, password, confirmPassword) => {
  let form = new FormData()
  form.append('username', username)
  form.append('password', password)
  form.append('password_confirmation', confirmPassword)
  return APIClient.post('/auth/register', form);
};

export const logout = () => {
  return APIClient.post('/auth/logout');
}

export const checkAuth = () => {
    return APIClient.post('/auth/check-auth');
};
  
// Blog API functions 

export const getAllBlogs = (firstId, perPage) => {
    return APIClient.get('/blogs', {firstId, perPage});
};

export const getBlog = (id) => {
    return APIClient.get(`/blogs/${id}`);
};

export const addBlog = (user_id, name, slug, desc, author ) => {
    return APIClient.post('/blogs', { name, slug, desc, author, user_id });
};

export const editBlog = (id, user_id, name, slug, desc, author) => {
    return APIClient.put(`/blogs/${id}`, { user_id, name, slug, desc, author });
};

export const deleteBlog = (id) => {
    return APIClient.delete(`/blogs/${id}`);
};


export default APIClient;
