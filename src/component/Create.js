import { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

const Create = (props) => {
    const [title,setTitle] =useState('');
    const [body,setBody] = useState('');
    const [author,setAuthor] =useState('');
    const [isPending, setIsPending] = useState(false);
    const [isError,setIsError]=useState(false);
    const history = useHistory();
    const inputRef = useRef();

    useEffect(() => {
        inputRef.current.focus();
    }, [inputRef]);

    const handleSubmit= (e) => {
        e.preventDefault();
        const post = {title , body, author,author_id: props.profile_id};
        setIsPending(true);
        var createPostHeader = new Headers();
        createPostHeader.append("Authorization", "Bearer "+props.accessToken);
        createPostHeader.append("Content-Type", "application/json");
        let requestOptions = {
            method: 'POST',
            Authorization : "Bearer "+props.accessToken,
            headers: createPostHeader,
            body : JSON.stringify(post)
        };
        let url = "https://backend-react-json-server-auth.herokuapp.com/posts"
          fetch(url, requestOptions)
          .then((res) => {
              if(res.status!==201){
                throw Error(res.statusText);
              }else{
                console.log("Posted");
                setIsPending(false);
                history.push('/react-blog-test-v2');
              }
          })
          .catch((err) => {
              console.log(err.message);
              setIsError(true);
              setIsPending(false);
          });

    }
    return (
        <div className="create">
            <h2>New Post</h2>
            <form onSubmit={handleSubmit}>
                <label>Post Title : </label>
                <input 
                    type="text"
                    required
                    value={title}
                    onChange={(e)=>setTitle(e.target.value)}
                    ref={inputRef}
                />
                <label>Post Body : </label>
                <textarea
                    value={body}
                    onChange={(e)=>setBody(e.target.value)}
                    required
                />
                <label>Author Name : </label>
                <input 
                    value={author}
                    onChange={(e)=>setAuthor(e.target.value)}
                    type="text"
                    required
                />
               {props.profile_id&&!isPending&&!isError&&<button type='submit'>
                    Post
                </button>}
                {isError&&<h2 className="error">Login Expired</h2>}
                {isPending&&<button disabled>
                    Please Wait...    
                </button>}
                {!props.profile_id&&<h2 className="error">Login to Post</h2>}
            </form>
        </div>
    );
}

const mapStateToProps = (state) =>{
    return{
        isLoggedIn : state.isLoggedIn,
        profile_id : state.profile_id,
        accessToken: state.accessToken
    }
}

export default connect(mapStateToProps,null)(Create);


