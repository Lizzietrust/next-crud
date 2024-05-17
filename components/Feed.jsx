'use client';

import React, { useState, useEffect } from 'react'
import Card from './Card'

const CardList = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
        <Card key={post._id} post={post} handleTagClick={handleTagClick} />
      ))}
    </div>
  )
}

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);
  const [posts, setPosts] = useState([]);

  // const filterPrompts = (searchtext) => {
  //   const regex = new RegExp(searchtext, "i")
  //   return posts.filter(
  //     (item) =>
  //       regex.test(item.creator.username) ||
  //       regex.test(item.tag) ||
  //       regex.test(item.prompt)
  //   );
  // };

  const handleChange = (e) => {
  //   clearTimeout(searchTimeout);
  //   setSearchText(e.target.value);

  //   setSearchTimeout(
  //     setTimeout(() => {
  //       const searchResult = filterPrompts(e.target.value);
  //       setSearchedResults(searchResult);
  //     }, 500)
  //   );
  }

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/post');

      const data = await response.json();
      setPosts(data);
    }

    fetchPosts();
  }, []);
  
  return (
    <section className="feed">
      {/* <form className="relative w-full flex-center">
        <input type="text" name="" id="" placeholder='Search' value={searchText} onChange={handleChange} required className='search_input peer' />
      </form> */}
      <CardList data={posts} handleTagClick={() => {}} />
    </section>
  )
}

export default Feed
