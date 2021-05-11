import React, { useState } from 'react'
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setLoggedIn } from '../../store/actions';
import loginImg from './login.svg';
import './style.scss';

const Register = (props) => {
    const [username,setUsername] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [isPending, setIsPending] = useState(false);
    const history = useHistory();
    
    const handleSubmit = (e) =>{
        let isExists=false;
        let token=null;
        e.preventDefault();
        const user= {email,password}
        let profile = {name:username , email};
        setIsPending(true);
        let requestOptions = {
            method: 'POST',
            headers: {"Content-Type" : "application/json"},
            body : JSON.stringify(user)
        };
        let url = "https://backend-react-json-server-auth.herokuapp.com/auth/register";
          fetch(url, requestOptions)
          .then((res) => {
              if(res.status!==200){
                isExists=true;
                throw Error(res.statusText);
              }else{
                console.log("New User Added");
                return res.json();
              }
          }).then(result => {
             token=result.access_token;
             if(!isExists){
                let profHeaders = new Headers();
                profHeaders.append("Authorization","Bearer "+token);
                profHeaders.append("Content-Type","application/json")
                requestOptions = {
                    method: 'POST',
                    headers: profHeaders,
                    body : JSON.stringify(profile)
                };
                url = "https://backend-react-json-server-auth.herokuapp.com/profile/"
                 fetch(url, requestOptions)
                .then((res) => {
                  if(res.status!==201){
                    throw Error(res.statusText);
                  }else{
                    console.log("New Profile Added");
                    setIsPending(false);
                    // history.push('/react-blog-test-v2');
                    return res.json();
                  }
                }).then(result=>{
                    const payload = {
                      accessToken:token,
                      profile_id:result.id
                    }
                    props.setRegisterData(payload);
                    console.log("Registered Successfully");
                    history.push('/react-blog-test-v2');
                })
                .catch((err) => {
                  console.log(err.message);
                  setIsPending(false);
                });
            }
          })
          .catch((err) => {
              console.log(err.message);
              setIsPending(false);
          });
    }
    return (
        <div className="base-container">
        <div className="header"><h2>Register</h2></div>
        {!props.isLoggedIn&&<div className="content">
        <div className="image">
            <img src={loginImg} alt="just a decoration"/>
        </div>
        <form onSubmit={handleSubmit}>
        <div className="form">
             <div className="form-group">
                <label htmlFor="username">Username</label>
                <input 
                    type="text" 
                    name="username" 
                    placeholder="username" 
                    value={username}
                    onChange={(e)=>setUsername(e.target.value)}
                    required
                />
             </div>
             <div className="form-group">
                <label htmlFor="email">Email</label>
                <input 
                    type="email" 
                    name="email" 
                    placeholder="email" 
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    required
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
                required
              />
             </div>
        </div>

        {!props.isLoggedIn&&!isPending&&<button type="submit" style = {{
                    color:"white",
                    backgroundColor : "#f1356d",
                    borderRadius : '8px',
                    width: '7rem',
                    height: '3rem',
                    borderBlockColor:'pinks'
        }}>
            Register
        </button>}
        </form>
        </div>}
        {props.isLoggedIn&&<h1>You already have an account!! You Are Logged In</h1>}
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
    setRegisterData:(payload)=>{
      dispatch(setLoggedIn(payload));
    }
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(Register);