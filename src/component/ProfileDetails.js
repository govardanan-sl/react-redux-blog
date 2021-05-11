import { useParams } from "react-router-dom";
import useFetch from "../useFetch";

const ProfileDetails = (props) => {
    const { id } = useParams();
    const {accessToken} = props.UserProfileID;
    let profHeaders = new Headers();
    profHeaders.append("Authorization","Bearer "+accessToken);
    let requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: profHeaders
    };
    const {data:profile ,isError:error, isLoading} = useFetch("https://backend-react-json-server-auth.herokuapp.com/profile/"+id,requestOptions);
    
    return (
        <div className="profile-container">
            {accessToken&&!error&&isLoading&&<div>Loading Profile...</div>}
            {accessToken&&error &&<div>{error}!!{<br></br>}Profile not found</div>}
            {profile &&(
                <div className="profile-data"> 
                    <h2>Name : {profile.name}</h2>
                    <p>Email : {profile.email}</p>
                </div>
            )}
            {!accessToken&&<h1 className="error">Please Login</h1>}
        </div>
    )
}

export default ProfileDetails;
