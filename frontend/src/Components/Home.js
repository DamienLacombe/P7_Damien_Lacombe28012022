import React, {Fragment, useEffect, useState} from 'react';
import logo from "../images/logo.svg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket} from '@fortawesome/free-solid-svg-icons'
import { faUser} from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom';
import profilIcone from "../images/icone-profil.jpg";
import { getToLocalStorage } from '../utils/toLocalStorage';
import Post from './Post';

function Home() {

    let navigate = useNavigate();

    const [posts, setPosts] = useState([])
    const [content, setContent] = useState({
        content: "",
    })
    const [newPost, setNewPost] = useState();

    useEffect(() => {
      createPosts()
    },[]);

    const createPosts = () => {
        fetch(`http://localhost:4200/api/post/`, {
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
            setPosts(data)
        })
    }

    useEffect(() => {
        console.log(posts);
        createPosts()
    },[newPost])
    
    const addPost = (e) => { 
        e.preventDefault()
        const body = {
            ...content,
            user_id:  getToLocalStorage("dataUser").userId
        }

        fetch(`http://localhost:4200/api/post/`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
           },
            method: "POST",
            body: JSON.stringify(body)
       })
       .then(resp => {
           return resp.json()
       })
       .then(resp => {
           console.log(resp);
           setNewPost(resp)
       })
    }


    return (
        <Fragment>
            <nav>
                <FontAwesomeIcon icon={faArrowRightFromBracket}></FontAwesomeIcon>
                <img src={logo} alt="logo" />
                <FontAwesomeIcon icon={faUser} onClick={() => navigate("/profil")}></FontAwesomeIcon>
            </nav>
            <div className='add-post'>
                <div className='add-post-head'>
                    <img src={profilIcone} alt="profil" />
                    <form onSubmit={(e) => addPost(e)}>
                        <textarea placeholder='Comment allez vous ?' onChange={(e) => setContent({content: e.target.value })}></textarea> 
                        <input type="submit" value="Poster" className='button'/>
                    </form>
                </div>
                <div className='btn-container'>
                    
                    <input type="file" name="file" id='file' className='file'/>
                    <label for="file" className='fileLabel'>Ajouter une image</label>
                   
                </div> 
            </div>
            {
                posts.map((post) => {
                    return <Post key={post.id } postData={post}/>
                })
            }
        </Fragment>
    )
}

export default Home;

