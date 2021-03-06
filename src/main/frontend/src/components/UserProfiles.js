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
                <Dropzone {...userProfile}/>
                <br/>
            </div>
        )
    })
}

function Dropzone({ userProfileId }) {
    const onDrop = useCallback(acceptedFiles => {
        const file = acceptedFiles[0];

        const formData = new FormData();
        formData.append("file", file)

        axios.post(
            `http://localhost:8080/api/v1/user-profile/${userProfileId}/image/upload`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        ).then(() => {
            console.log("file uploaded successfully")
        }).catch(err => {
            console.log(err);
        })
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