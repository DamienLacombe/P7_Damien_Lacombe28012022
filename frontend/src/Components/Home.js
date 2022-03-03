import React, { Fragment, useEffect, useState } from 'react';
import logo from "../images/logo.svg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import icone from "../images/icone.png";
import { getToLocalStorage } from '../utils/toLocalStorage';
import Post from './Post';
import Profil from './Profil';
import { useNavigate } from 'react-router-dom';

function Home() {

    let navigate = useNavigate()

    const [posts, setPosts] = useState([])
    const [content, setContent] = useState({
        content: "",
    })
    const [newPost, setNewPost] = useState();
    const [showProfil, setShowProfil] = useState(false)
    const [userProfil, setUserProfil] = useState()
    const [reRender, setReRender] = useState(false)
    const [userLog, setUserLog] = useState()

    useEffect(() => {
        userLogInfo()
        createPosts()
    }, []);

    useEffect(() =>{
        userLogInfo()
        createPosts()
        setReRender(false)
    }, [reRender])

    const userLogInfo = () => {

        fetch(`http://localhost:4200/api/auth/${getToLocalStorage("dataUser").userId}`, {
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
            setUserLog(data)
        })
    }
    
    const createPosts = () => {

       
        fetch(`http://localhost:4200/api/post/`, {
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
            setPosts(data)
        })
    }

    useEffect(() => {
        createPosts()
    }, [newPost])

    const addPost = (e) => {
        e.preventDefault() 
        
        const formData = new FormData(document.getElementById('addPostForm'))
        const content = formData.get("content")
        formData.append('users_id', getToLocalStorage("dataUser").userId)
        fetch(`http://localhost:4200/api/post/`, {
           headers: {
                'Authorization': getToLocalStorage("dataUser").token
            },
            method: "POST",
            body: formData
        })
            .then(resp => {
                return resp.json()
            })
            .then(resp => {
                setNewPost(resp)
            })
    }

    const tx = document.getElementsByTagName("textarea");
    for (let i = 0; i < tx.length; i++) {
        tx[i].setAttribute("style", "height:" + (tx[i].scrollHeight) + "px;overflow-y:hidden;");
        tx[i].addEventListener("input", OnInput, false);
    }

    function OnInput() {
        this.style.height = "auto";
        this.style.height = (this.scrollHeight) + "px";
    }

    const getProfil = (user) => {

        setShowProfil(!showProfil);
        setUserProfil(user);
    }
    
    return (
        <Fragment>
            <nav>
                <FontAwesomeIcon icon={faArrowRightFromBracket} onClick={() => {
                    localStorage.clear()
                    navigate("/")
                }}></FontAwesomeIcon>
                <img src={logo} alt="logo" />
                <FontAwesomeIcon icon={faUser} onClick={() =>getProfil(getToLocalStorage("dataUser").userId)}></FontAwesomeIcon>
            </nav>
            <div className='add-post first'>
                <div className='add-post-head'>
                    <img src={userLog === undefined ? "icone" : (
                        userLog[0].image_url === null ? icone : userLog[0].image_url
                    )} alt="profil" onClick={() =>getProfil(getToLocalStorage("dataUser").userId)}/>
                    <form onSubmit={(e) => addPost(e)} id='addPostForm'>
                        <textarea rows={1}  name="content" placeholder='Comment allez vous ?' onChange={(e) => setContent({ content: e.target.value })}></textarea>
                        <div className='btn-container'>
                            <input type="file" name="file"  className='file ' id='addPostFile'/>
                            <label htmlFor="addPostFile" name="file"className='fileLabel'>Ajouter une image</label>
                            <input type="submit" value="Poster" className='button' />
                        </div>
                    </form>
                </div>
            </div>
            {
                posts.map((post) => {
                    return <Post key={post.id} postData={post} setReRender={setReRender} reRender={reRender} getProfil={getProfil} setUser={setUserProfil} userImageUrl={userLog[0].image_url}/>
                })
            }
            {
                showProfil && <Profil user={userProfil} reRender={reRender} setShow={setShowProfil} setReRender={setReRender}/>
            }
        </Fragment>
    )
}

export default Home;

