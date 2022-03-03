import React, { useEffect, useState } from 'react';
import icone from "../images/icone.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import ReactDOM from "react-dom";
import { getToLocalStorage } from '../utils/toLocalStorage';
import { useNavigate } from 'react-router-dom';


function Profil(props) {

    let navigate = useNavigate()

    const [userInfo, setUserInfo] = useState({
        admin: 0,
        bio: "Bio",
        email: "",
        id: 0,
        image_url: "",
        pseudo: ""
    })

    const [newPassword, setNewPassword] = useState()
    const [updateUser, setUpdateUser] = useState(false)
    const [sameUser, setSameUser] = useState(false)


    useEffect(() => {
        getUser()
    }, [])

    useEffect(() => {
        getUser()
    }, [props.reRender])

    const getUser = () => {
        fetch(`http://localhost:4200/api/auth/${props.user}`, {
           headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': getToLocalStorage("dataUser").token
            },
            method: "GET",
        })
        .then(resp => {
            return resp.json()
        })
        .then(data => {
            setUserInfo(...data)
        })

        verifSameUser()
    }

    const verifSameUser = () => {
        if (getToLocalStorage("dataUser").userId === props.user) {
            setSameUser(!sameUser)
        }
    }

    
    const sendUpdateUser = (e) => {
        
        e.preventDefault()
        const formData = new FormData(document.getElementById('formUser'))
        const pseudo = formData.get("pseudo")
        const bio = formData.get("bio")
        const password = formData.get("password")
        const file = document.getElementById('file').files[0];
        formData.append('file', file)
    
        fetch(`http://localhost:4200/api/auth/${props.user}`, {
           headers: {
                'Authorization': getToLocalStorage("dataUser").token
            },
            method: "PUT",
            body: formData
        })
        .then(resp => {
            return resp.json()
        })
        .then(data => {
            props.setReRender(true)
            setUpdateUser(false)
        })
    }

    const deleteUser = () => {

        fetch(`http://localhost:4200/api/auth/${props.user}`, {
            headers: {
                 'Accept': 'application/json',
                 'Content-Type': 'application/json',
                 'Authorization': getToLocalStorage("dataUser").token
             },
             method: "DELETE",
         })
         .then(resp => {
             return resp.json()
         })
         .then(resp => {
             localStorage.clear()
             navigate("/")
         })
    }

    return ReactDOM.createPortal(
        <div className='modal'>
            <div className='profil-container'>
                <div className='icons'>
                    <FontAwesomeIcon icon={faXmark} onClick={() => { 
                        props.setShow(false) 
                        navigate("/home")
                    }} />
                    {
                        sameUser && <FontAwesomeIcon icon={faPen} onClick={() => setUpdateUser(!updateUser)} />
                    }
                </div>
                <img src={userInfo.image_url === undefined ? icone : (
                        userInfo.image_url === null ? icone : userInfo.image_url
                    )} alt="profil" />
                {

                    updateUser && (
                        <>
                            <label className='fileLabel' htmlFor="file" >Choisissez une nouvelle image</label>
                            <input type="file" name='file' className='file profilImage' id='file'/>
                            
                        </>
                    )
                }
                {
                    updateUser ? (
                        <form onSubmit={(e) => sendUpdateUser(e)} id='formUser'>
                            <input type="text" value={userInfo.pseudo} name='pseudo' onChange={(e) => {
                                setUserInfo({
                                    admin: 0,
                                    bio: userInfo.bio,
                                    email: userInfo.email,
                                    id: props.user,
                                    image_url: userInfo.image_url,
                                    pseudo: e.target.value
                                })
                            }} />
                            <textarea name="bio" value={userInfo.bio} placeholder="Modifier votre bio" onChange={(e) => {
                                setUserInfo({
                                    admin: 0,
                                    bio: e.target.value,
                                    email: userInfo.email,
                                    id: props.user,
                                    image_url: userInfo.image_url,
                                    pseudo: userInfo.pseudo
                                })
                            }} ></textarea>
                            <input name="password" type="text" value={newPassword} className="password" placeholder='Modifier votre mot de passe' onChange={(e) => {setNewPassword(e.target.value)}} />
                            <input type="submit" value="Valider" className='valider' />
                        </form>
                    ) : (
                        <>
                            <p className='profil-pseudo'>{userInfo.pseudo}</p>
                            <p className='bio'>{userInfo.bio}</p>
                            <a href={userInfo.email} className='email'>{userInfo.email}</a>
                        </>
                    )
                }
                {
                    sameUser && <button className='delete' onClick={() => deleteUser()}>Supprimer le compte</button>
                }
            </div>
        </div>,
        document.getElementById("profil")
    )
}

export default Profil