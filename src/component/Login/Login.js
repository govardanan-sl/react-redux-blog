import React, { useState } from 'react'
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { setLoggedIn } from '../../store/actions';
import loginImg from './login.svg'
import "./style.scss";

const Login = (props) => {
    const isLoggedIn = props.isLoggedIn;
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [isPending, setIsPending] = useState(false);
    const [isInvalidUser,setIsInvalidUser] = useState(false);
    const history=useHistory();
    const handleSubmit = (e) =>{
        e.preventDefault();
        const user= {email,password}
        setIsPending(true);
        let requestOptions = {
            method: 'POST',
            headers: {"Content-Type" : "application/json"},
            body : JSON.stringify(user)
        };
        let url = "https://backend-react-json-server-auth.herokuapp.com/auth/login"
          fetch(url, requestOptions)
          .then((res) => {
              if(res.status===401){
                setIsInvalidUser(true);
              }
              if(res.status!==200){
                throw Error(res.statusText);
              }else{
                console.log("Verified successfully");
                return res.json();
              }
          })
          .then(result =>{
            const payload = {
                accessToken:result.access_token,
                profile_id:result.id
            }
            props.setLoginData(payload);
            console.log("Logged In successfully");
            history.push('/react-blog-test-v2');
          })
          .catch((err) => {
            console.log(err.message);
            setIsPending(false);
        });
    }
    return (
        <div className="base-container">
        <div className="header">Login</div>
        {!isLoggedIn&&<div className="content">
        {isInvalidUser&&<h2 className="error">Invalid Username or Password</h2>}
        <div className="image">
            <img src={loginImg} alt="just a decoration"/>
        </div>
        <form onSubmit={handleSubmit}>
            <div className="form">
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input 
                        type="email" 
                        name="email" 
                        placeholder="Email" 
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}  
                        />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password" 
                        name="password" 
                        placeholder="password" 
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}    
                        />
                </div>
            </div>
            {!isLoggedIn&&!isPending&&<button type="submit" style = {{
                    color:"white",
                    backgroundColor : "#f1356d",
                    borderRadius : '8px',
                    width: '7rem',
                    height: '3rem'
            }}>
                Login
            </button>}
        </form>
        <Link to="/register" style = {{
               color:'#333',
               marginTop: '1rem',
               fontSize:'1.2rem'
            }}>
           Don't Have an account?? Register!
        </Link>
        </div>}
        {isLoggedIn&&
        <div>
        <h2 style={
            {
                margin:'1rem'
            }
        }>You are already Logged In</h2><br></br>
        Click Here To Go <Link to="/react-blog-test-v2" className="link-highlight">Home</Link></div>}
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
const mapDispatchToProps = (dispatch) =>{
    return{
        setLoginData:(payload)=>{
            dispatch(setLoggedIn(payload))
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);
