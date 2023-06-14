import './App.css';
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/navbar/Navbar';
import Home from './router/home/Home'
import Blog from './router/blog/Blog'
import Comment from './router/comments/Comment';
import Post from './router/posts/Post'
import SingleBlog from './router/single-blog/SingleBlog';
import NotFound from './router/notfound/NotFound';
import Login from './router/login/Login';
import Auth from './components/auth/Auth';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/' element={<Auth />}>
          <Route path='/' element={<Home />} />
          <Route path='/blog' element={<Blog />} />
          <Route path='/comments' element={<Comment />} />
          <Route path='/posts' element={<Post />} />
          <Route path='/single/:id' element={<SingleBlog />} />
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
