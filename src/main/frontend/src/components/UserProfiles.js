import axios from "axios";
import {useEffect, useState} from "react";

export const UserProfiles = () => {
    const [userProfiles, setUserProfiles] = useState([])

    const fetchUserProfiles = () => {
        axios.get('http://localhost:8080/api/v1/user-profile')
            .then(res => {
                const data = res.data;
                setUserProfiles(data)
            })
            .catch(err => {
                console.log(err);
            })
    }

    useEffect(() => {
        fetchUserProfiles();
    },[])

    return userProfiles.map((userProfile, index) => {
        return (
            <div key={index}>
                <h1>{userProfile.userName}</h1>
                <p>{userProfile.userProfileId}</p>
            </div>
        )
    })
}