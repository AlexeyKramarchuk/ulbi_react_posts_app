import React, { useRef, useState, useMemo } from "react";
import Counter from "./components/Counter";
import ClassCounter from "./components/ClassCounter";
import "./components/styles/App.css";
import PostItem from "./components/PostItem";
import PostList from "./components/PostList";
import MyButton from "./components/UI/button/MyButton";
import MyInput from "./components/UI/input/MyInput";
import PostForm from "./components/PostForm";
import MySelect from "./components/UI/select/MySelect";
import PostFilter from "./components/PostFilter";

function App() {
  const [posts, setPosts] = useState([
    { id: 1, title: "aa", body: "tt" },
    { id: 2, title: "ff 2", body: "nn" },
    { id: 3, title: "rr 3", body: "kk" },
  ]);

  const [filter, setFilter] = useState({sort: '', query: ''})


  const sortedPosts = useMemo(() => {
    if(filter.sort) {
      return [...posts].sort((a, b) => a[filter.sort].localeCompare(b[filter.sort]))
    }
      return posts;

  }, [filter.sort, posts])

  const sortedSearchedPosts = useMemo(() => {
    return sortedPosts.filter(post => post.title.toLowerCase().includes(filter.query))
  }, [filter.query, sortedPosts])


  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
  };

  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };


  return (
    <div className="App">
      <PostForm create={createPost} />
      <hr style={{ margin: "15px 0" }} />
      <PostFilter 
        filter={filter} 
        setFilter={setFilter} 
      />
      {sortedSearchedPosts.length 
      ? 
        <PostList remove={removePost} posts={sortedSearchedPosts} title="Posts" />
      : 
        <h1 style={{ textAlign: "center" }}>No posts!</h1>
      }
    </div>
  );
}

export default App;
