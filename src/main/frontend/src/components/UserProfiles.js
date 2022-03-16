import axios from "axios";
import {useEffect} from "react";

export const UserProfiles = () => {
    const fetchUserProfiles = () => {
        axios.get('http://localhost:8080/api/v1/user-profile')
            .then(res => {
                console.log('AXIOS -----------')
                console.log(res);
            })
            .catch(err => {
                console.log('ERROR -------')
                console.log(err);
            })
    }

    useEffect(() => {
        fetchUserProfiles();
    },[])

    return <h1>UserProfiles</h1>
}