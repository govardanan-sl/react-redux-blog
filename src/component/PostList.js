import {Link} from 'react-router-dom';
import { useHistory } from "react-router-dom";
const PostList = ({posts,title}) =>{
   // const posts=props.posts;
   const history = useHistory();
    return (  
        <div className= "post-list"> 
            <h2>{title}</h2>
            {posts.map((post)=>(
                <Link to={`/posts/${post.id}`} key={post.id}>
                    <div key={post.id}>
                        <div className = "post-preview"> 
                            <h2>{post.title}</h2>
                            <p>{post.body}</p>
                            <p>by <button onClick={()=>history.push(`/profile/${post.author_id}`)}>{post.author}</button></p> 
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}

export default PostList;