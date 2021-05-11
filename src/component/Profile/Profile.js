import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './style.scss';
class Profile extends Component {
    constructor(props){
        super(props);
        this.state={
            profileData : null,
            isLoading : true,
            isError : null
        }
    }
    abortController = new window.AbortController();
    fetchPosts(){
        let url ="https://backend-react-json-server-auth.herokuapp.com/profile/"+this.props.profile_id;
        let homeHeaders = new Headers();
        homeHeaders.append("Authorization","Bearer "+this.props.accessToken);
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
        if(this.props.accessToken){
            this.fetchPosts();
        }
    }
    componentWillUnmount(){
        this.abortController.abort();
    }
    render() {
        const profile_id = this.props.profile_id;
        return (
            <div className="">
            {!profile_id&&<h1><Link to="/login"  className="link-highlight">Please Login</Link></h1>}
            {profile_id&&this.state.isError&&<h2 className="error">{this.state.isError}</h2>}
            {profile_id&&this.state.isLoading&&<h2>Loading!!...</h2>}
            <h2>Profile</h2>
            {profile_id&&<div className="container center">
            <div className="card">
               <h2>Profile</h2>
               <hr/>
               <p> Name : {!this.state.isError&&this.state.profileData&&this.state.profileData.name}</p>
               <p> Status : {}</p>
            </div>   
            </div>}
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

export default connect(mapStateToProps,null)(Profile);
