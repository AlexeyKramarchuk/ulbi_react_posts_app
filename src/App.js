import React, { useRef, useState, useMemo, useEffect } from "react";
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
import MyModal from "./components/UI/MyModal/MyModal";
import { usePosts } from "./components/hooks/usePosts";
import axios from 'axios';
import PostService from "./API/PostService";
import Loader from "./components/UI/Loader/Loader";
import { useFetching } from "./components/hooks/useFetching";
import { getPageCount } from "./utils/pages";

function App() {

  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({sort: '', query: ''})
  const [modal, setModal] = useState(false)
  const [totalPages, setTotalPage] = useState(0)
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(1)
  const sortedSearchedPosts = usePosts(posts, filter.sort, filter.query)

  fori

  const [fetchPosts, isPostLoading, postError] = useFetching( async () => {
    const response = await PostService.getAll(limit, page);
    setPosts(response.data);
    const totalCount = response.headers['x-total-count']
    setTotalPage(getPageCount(totalCount, limit))
  })

  console.log(totalPages)

  useEffect(() => {
    fetchPosts();
  }, [])

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false)
  };


  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };


  return (
    <div className="App">
      <MyButton style={{marginTop: 30}} onClick={() => setModal(true)}>
        Create post
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>
      
      <hr style={{ margin: "15px 0" }} />
      <PostFilter 
        filter={filter} 
        setFilter={setFilter} 
      />
        {postError &&
          <h1>POSTS ERROR! ${postError}</h1>
        }
      {isPostLoading
          ? <div style={{display: 'flex', justifyContent: 'center', marginTop: 50}}><Loader /></div>
          : <PostList remove={removePost} posts={sortedSearchedPosts} title="Posts" />
      }
    </div>
  );
}

export default App;

