import React, { Component } from 'react'
import { connect } from 'react-redux';
import PostList from '../PostList';

class Home extends Component {
    constructor(props){
        super(props);
        this.state={
            posts : [],
            isLoading : true,
            isError : null
        }
    }
    abortController = new window.AbortController();
    fetchPosts(accessToken){
        let url ="https://backend-react-json-server-auth.herokuapp.com/posts";
        let homeHeaders = new Headers();
        homeHeaders.append("Authorization","Bearer "+accessToken);
        homeHeaders.append("signal",this.abortController.signal);
        let requestOptions= {
            method: 'GET',
            headers:homeHeaders,
            redirect: 'follow'
        };
        fetch(url,requestOptions)
        .then(response => {
            if(response.status===401){
                return response.json();
            }
            if(!response.ok){
                throw Error("Could not Fetch data");
            }
            return response.json();
        })
        .then(result => {
            if(result.message==="Access token not provided"){
                this.setState({
                    posts : null,
                    isLoading : false,
                    isError:"Login Expired"
                })
                throw Error("Login Expired");
            }else{
                this.setState({
                    posts : result,
                    isLoading : false,
                    isError:false
                })
            }
        })
        .catch((e) =>{
            if(e.name==='AbortError'){
                console.log("Fetch Aborted");
            }else{
                console.log(e.message);
                this.setState({
                    isError:e.message,
                    isLoading:false
                });
            }
        });
    }
    componentDidMount(){
        const accessToken = this.props?.accessToken;
        accessToken&&this.fetchPosts(accessToken);
    }
    componentWillUnmount() {
        this.abortController.abort();
    }
    render() {
        return (
            <div className="home">
                {this.props.isLoggedIn&&<h2>Welcome Back</h2>}
                <h1>Home Page</h1>
                {!this.state.isError && this.state.isLoading && this.props.accessToken&&<div>Loading....</div>}
                {this.state.isError && 
                    <div> 
                        <h2 style={{color:"#ff003cf0"}}>{this.state.isError}</h2>
                    </div>
                }
                {this.state.posts && <PostList posts={this.state.posts} title="All Posts"></PostList>}
                {this.props.profile_id&&this.state.posts && <PostList posts={this.state.posts.filter((post)=>post.author_id ===this.props.profile_id)} title="My Posts"/>}
                {!this.props.accessToken&&<h1 className="error">Please Login</h1>}
            </div>
        )
    }
}
const mapStateToProps = (state) =>{
    return{
        isLoggedIn : state.isLoggedIn,
        profile_id : state.profile_id,
        accessToken: state.accessToken
    }
}


export default connect(mapStateToProps,null)(Home);