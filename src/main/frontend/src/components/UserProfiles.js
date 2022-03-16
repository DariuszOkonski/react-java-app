import axios from "axios";
import {useEffect, useState, useCallback} from "react";
import {useDropzone} from 'react-dropzone'

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
                <br/>
                <h1>{userProfile.userName}</h1>
                <p>{userProfile.userProfileId}</p>
                <Dropzone />
                <br/>
            </div>
        )
    })
}

function Dropzone() {
    const onDrop = useCallback(acceptedFiles => {
        const file = acceptedFiles[0];
        console.log(file)
    }, [])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
    return (
        <div {...getRootProps()}>
            <input {...getInputProps()} />
            {
                isDragActive ?
                    <p>Drop the image here ...</p> :
                    <p>Drag 'n' drop profile image, or click to select profile image</p>
            }
        </div>
    )
}