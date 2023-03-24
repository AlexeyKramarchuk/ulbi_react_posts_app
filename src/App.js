import React, { useState, useEffect } from "react";
import "./components/styles/App.css";
import PostList from "./components/PostList";
import MyButton from "./components/UI/button/MyButton";
import PostForm from "./components/PostForm";
import PostFilter from "./components/PostFilter";
import MyModal from "./components/UI/MyModal/MyModal";
import { usePosts } from "./components/hooks/usePosts";
import PostService from "./API/PostService";
import Loader from "./components/UI/Loader/Loader";
import { useFetching } from "./components/hooks/useFetching";
import { getPageCount } from "./utils/pages";
import { getPagesArray } from "./utils/pages";

function App() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({ sort: "", query: "" });
  const [modal, setModal] = useState(false);
  const [totalPages, setTotalPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const sortedSearchedPosts = usePosts(posts, filter.sort, filter.query);

  let pagesArray = getPagesArray(totalPages);

  const [fetchPosts, isPostLoading, postError] = useFetching(async () => {
    const response = await PostService.getAll(limit, page);
    setPosts(response.data);
    const totalCount = response.headers["x-total-count"];
    setTotalPage(getPageCount(totalCount, limit));
  });

  console.log(totalPages);

  useEffect(() => {
    fetchPosts();
  }, [page]);

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
  };

  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };

  const changePage = (page) => {
    setPage(page)
  }

  return (
    <div className="App">
      <MyButton style={{ marginTop: 30 }} onClick={() => setModal(true)}>
        Create post
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>

      <hr style={{ margin: "15px 0" }} />
      <PostFilter filter={filter} setFilter={setFilter} />
      {postError && <h1>POSTS ERROR! ${postError}</h1>}
      {isPostLoading 
        ? <div style={{ display: "flex", justifyContent: "center", marginTop: 50 }}><Loader /></div>
        : <PostList remove={removePost} posts={sortedSearchedPosts} title="Posts" />
      }
      <div className="page__wrapper">
        {pagesArray.map(p => 
            <span 
                onClick={() =>changePage(p)} 
                key={p} 
                className={page === p ? 'page page__current' : 'page'}
              >
                {p}
            </span>
      )}
      </div>

    
    </div>
  );
}

export default App;
