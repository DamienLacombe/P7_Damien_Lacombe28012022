import React, { useEffect, useState } from 'react';
import { getToLocalStorage } from '../utils/toLocalStorage';

function Profil() {

    const [userInfo, setUserInfo] = useState({
        admin: 0,
        bio: "",
        email: "",
        id: 0,
        image_url: "",
        pseudo : ""
    })

    useEffect(() => {

        const userId = getToLocalStorage("dataUser");
        fetch(`http://localhost:4200/api/auth/${userId.userId}`, {
             headers: {
                 'Accept': 'application/json',
                 'Content-Type': 'application/json'
            },
             method: "GET",
        })
        .then(resp => {
            return resp.json()
        })
        .then(data => {
            setUserInfo(...data)
        })

    },[])
    console.log(userInfo);
    
    return (
        <div>Profil</div>
    )
}

export default Profil