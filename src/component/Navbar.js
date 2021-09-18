import {Link} from 'react-router-dom';
import React, { useState } from 'react';
import {connect} from 'react-redux';
import { Loggout } from '../store/actions';
import { Modal } from '@mui/material';


const Navbar= ({isLoggedIn,profile_id,setLoggout}) =>{
    const [isModalDisplayed, setModalDisplayed] = useState(false);
    const [ModalComponent, setModalComponent] = useState(null);

    const loadComponent = async () => {
        const loadResult = await import('./Create');
        setModalComponent(() => loadResult.default);
    };
    const openModal = ()=>{
        loadComponent();
        setModalDisplayed(true);
    }
    return (
        <nav className="navbar">
            <Modal open={isModalDisplayed} onClose={()=> setModalDisplayed(false)}>
                <div>
                {isLoggedIn &&  isModalDisplayed ? ModalComponent : <div>Loading...</div>}
                </div>
            </Modal>
           <Link to ='/react-blog-test-v2'><h1>The Social Media App</h1></Link>
            <div className="links">
                <Link to = "/react-blog-test-v2">Home</Link>
                <Link to = "/profile">Profile</Link>
                <Link to = "/">About</Link>
                {isLoggedIn&&<button onClick={openModal} style = {{
                    color:"white",
                    backgroundColor : "#f1356d",
                    borderRadius : '8px'
                }}>New Post</button>}
                {!isLoggedIn&&<Link to = "/login" style = {{
                    color:"white",
                    backgroundColor : "#f1356d",
                    borderRadius : '8px'
                }}>Login</Link>}
                {profile_id&&<Link to = "#" style = {{
                    color:"white",
                    backgroundColor : "#f1356d",
                    borderRadius : '8px'
                }} onClick={setLoggout}>Logout</Link>}
            </div>
        </nav>
    )
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
        setLoggout: ()=>{
            dispatch(Loggout())
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Navbar);