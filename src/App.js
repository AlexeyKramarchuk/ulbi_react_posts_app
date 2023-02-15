import React, { useState } from "react";
import Counter from "./components/Counter";
import ClassCounter from "./components/ClassCounter";
import './components/styles/App.css'
import PostItem from "./components/PostItem";
import PostList from "./components/PostList";
import MyButton from "./components/UI/button/MyButton";
import MyInput from "./components/UI/input/MyInput";




function App() {
  const [posts, setPosts] = useState( [
    {id: 1, title: 'JavaScript', body: 'Description'},
    {id: 2, title: 'JavaScript 2', body: 'Description'},
    {id: 3, title: 'JavaScript 3', body: 'Description'},
  ]);

  const [title, setTitle] = useState('')
  const addNewPost = (e) => {
    e.preventDefault();
    console.log(title)
  }

  return (
    <div className="App"> 
    <form>
      <MyInput 
        value={title}
        onChange={e => setTitle(e.target.value)}
        type="text"  
        placeholder="name of post"
      />
      <MyInput type="text" placeholder="description of post" />
      <MyButton onClick={addNewPost}>Create Post</MyButton>
    </form>
      <PostList posts={posts} title="Posts" />
    </div>
  );
}

export default App;
