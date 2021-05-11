import React, { Component } from 'react'
import { withRouter } from "react-router";
class ProfileDetails extends Component {
    constructor(props){
        super(props);
        this.state={
            profileData : null,
            isLoading : true,
            isError : null
        }
    }
    abortController = new window.AbortController();
    fetchPosts(id){
        const {accessToken} = this.props.UserProfileID;
        let url ="https://backend-react-json-server-auth.herokuapp.com/profile/"+id;
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
                    profileData : null,
                    isLoading : false,
                    isError:"Login Expired"
                })
                throw Error("Login Expired");
            }else{
                this.setState({
                    profileData : result,
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
                    isError:e.message
                });
            }
        });
    }
    componentDidMount(){
        const id = this.props.match.params.id;
        const {accessToken} = this.props.UserProfileID;
        if(accessToken){
            this.fetchPosts(id);
        }
    }
    componentWillUnmount(){
        this.abortController.abort();
    }
    render() {
        const {accessToken}=this.props.UserProfileID;
        return (
            <div className="profile-container">
            {accessToken&&!this.state.isError&&this.state.isLoading&&<div>Loading Profile...</div>}
            {accessToken&&this.state.isError &&<div className="error">{this.state.isError}!!{<br></br>}Profile not found</div>}
            {this.state.profileData &&(
                <div className="profile-data"> 
                    <h2>Name : {this.state.profileData.name}</h2>
                    <p>Email : {this.state.profileData.email}</p>
                </div>
            )}
            {!accessToken&&<h1 className="error">Please Login</h1>}
        </div>
        )
    }
}

export default withRouter(ProfileDetails);
