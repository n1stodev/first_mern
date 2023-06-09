import './App.css';
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/navbar/Navbar';
import Home from './router/home/Home'
import Blog from './router/blog/Blog'
import Comment from './router/comments/Comment';
import SingleBlog from './router/singleBlog/SingleBlog';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/blog' element={<Blog />} />
        <Route path='/comments' element={<Comment />} />
        <Route path='/single/:id' element={<SingleBlog />} />
      </Routes>
    </div>
  );
}

export default App;
