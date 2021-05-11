//import {useState,useEffect} from 'react';
import PostList from './PostList';
import useFetch from '../useFetch';
import { Link } from 'react-router-dom';
const Home = () =>{
   const {data:posts,isLoading,isError} = useFetch("https://backend-react-json-server.herokuapp.com/posts",{headers:new Headers()}); 
    return(
        <div className="Home">
            <div className="moved-out" style={
                {
                    marginBottom:"1rem"
                }}>
                <h2 style={{color:"#ff003cf0", margin:'1rem'}}>This Page is Depreciated</h2>
                <Link to="/react-blog-test-v2" className="link-highlight">Click Here </Link>to Move to New Home Page
            </div>
        {!isError && isLoading && <div>Loading....</div>}
        {isError && <div> 
            <h2 style={{color:"#ff003cf0"}}>{isError}</h2>
            </div>
        }
        {posts && <PostList posts={posts} title="All Posts"></PostList>}
        {posts && <PostList posts={posts.filter((post)=>post.author ==='bruce')} title="My Posts"/>}
        </div>
    )
}
export default Home;