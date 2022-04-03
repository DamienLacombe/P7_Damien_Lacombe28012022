import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';
import Comments from './Comments';
import icone from "../images/icone.png";
import { getToLocalStorage } from '../utils/toLocalStorage';

const Post = (props) => {
  
    const [comments, setComments] = useState([])
    const [userData, setUserData] = useState([])
    const [content, setContent] = useState(props.postData.content)
    const [deletePost, setDeletepost] = useState(false)
    const [updatePost, setUpdatePost] = useState(false)
    const [comment, setComment] = useState({
        content: ""
    })
    const [newComment, setNewComment] = useState()
    const [usersLike, setUsersLike] = useState([])
    const [alreadyLike, setAlreadyLike] = useState(false)

    useEffect(() => {

        createComment()

        getUser()

        getLike()
    }, [])

    useEffect(() => {
        createComment()
        getUser()
    }, [props.reRender])

    const getUser = () => {
        fetch(`http://localhost:4200/api/auth/${props.postData.users_id}`, {
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
            setUserData(data)
        })
    }
    useEffect(() => {
        createComment()
    }, [newComment])

    const createComment = () => {
        fetch(`http://localhost:4200/api/Comment/${props.postData.id}`, {
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
            setComments(data)
        })
    }

    const update = (e) => {

        
        e.preventDefault()
        if (updatePost === false) {
            setUpdatePost(!updatePost)
        } else {
            const formData = new FormData(document.getElementById('updateForm'))
            const file = formData.get("file")
            formData.append('users_id', getToLocalStorage("dataUser").userId)
            fetch(`http://localhost:4200/api/post/${props.postData.id}`, {
                headers: {
                    'Authorization': getToLocalStorage("dataUser").token
                },
                method: "PUT",
                body: formData
            })
                .then(resp => {
                    return resp.json()
                })
                .then(resp => {
                    
                      props.setReRender(true)
                    setUpdatePost(!updatePost)
                })
        }
      
    }

    const addComment = (e) => {

        e.preventDefault()
        const body = {
            ...comment,
            posts_id: props.postData.id,
            users_id: getToLocalStorage("dataUser").userId
        }

        fetch(`http://localhost:4200/api/comment/`, {
           headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': getToLocalStorage("dataUser").token
            },
            method: "POST",
            body: JSON.stringify(body)
        })
            .then(resp => {
                return resp.json()
            })
            .then(resp => {
                setNewComment(resp)
            })
    }

    useEffect(() => {
        usersLike.map(user => {

            if (user.users_id === getToLocalStorage("dataUser").userId) {
                setAlreadyLike(!alreadyLike)
            }
            return ""
        })
    }, [usersLike])

    const getLike = () => {
        fetch(`http://localhost:4200/api/like/${props.postData.id}`, {
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
                setUsersLike(data)
            })
    }

    const like = () => {
        fetch(`http://localhost:4200/api/like/`, {
           headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': getToLocalStorage("dataUser").token
            },
            method: "POST",
            body: JSON.stringify({ posts_id: props.postData.id, users_id: getToLocalStorage("dataUser").userId })
        })
            .then(resp => {
                return resp.json()
            })
            .then(data => {
                if (data.like === 1) {
                    getLike()
                } else {
                    setAlreadyLike(false)
                    getLike()
                }

            })
    }
    
    const trash = () => {

        fetch(`http://localhost:4200/api/post/${props.postData.id}`, {
           headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': getToLocalStorage("dataUser").token
            },
            method: "DELETE",
            body: JSON.stringify({ user_id: props.postData.users_id })
        })
        .then(resp => {
            return resp.json()
        })
        .then(resp => {
            setDeletepost(!deletePost);
        })
    }
    return (

        <>
            {
                deletePost ? "" : (
                    <div className='post-container'>
                        <div className='post'>
                            <div className='post-head'>
                                <div>
                                    <img src={userData[0] === undefined ? "" : (
                                        userData[0].image_url === null ? icone : userData[0].image_url
                                    )} alt="Profil" className='pointer' onClick={() =>props.getProfil(props.postData.users_id)}/>
                                    <p className='pointer' onClick={() =>props.getProfil(props.postData.users_id)}>{userData[0] === undefined ? "" : userData[0].pseudo}</p>
                                    <p>{ }</p>
                                </div>
                                {
                                    props.postData.users_id === getToLocalStorage("dataUser").userId || getToLocalStorage("dataUser").admin === true ? (

                                        <div>
                                            <FontAwesomeIcon icon={faPen} onClick={update} />
                                            <FontAwesomeIcon icon={faTrash} onClick={trash} />
                                        </div>
                                    ) : ""
                                }

                            </div>
                            {
                                updatePost ? (
                                    <form onSubmit={(e) => update(e)} className="form" id='updateForm'>
                                        <textarea type="text" name="content" className='content' value={content} onChange={(e) => setContent(e.target.value)} />
                                        <div>
                                            <input type="file" name="file"  className='file ' id='file'/>
                                            <label htmlFor="file" name="file"className='fileLabel pointer'>Ajouter une image</label>
                                            <input type="submit" className='valider' />
                                        </div>
                                        
                                    </form>
                                ) : <p className='content'>{content} <br /> { props.postData.image_url === null ? "" : <img id="postImg"src={props.postData.image_url} alt="post"/>}</p>
                            }

                            <div className='like'>
                                {
                                    usersLike.map(user => {
                                        if (user === getToLocalStorage("dataUser").userId) {
                                            setAlreadyLike(!alreadyLike)
                                        }
                                        return ""
                                    })

                                }
                                {
                                    alreadyLike ? <FontAwesomeIcon className="red-heart" icon={faHeart} onClick={() => like()} /> : <FontAwesomeIcon className='black-heart' icon={faHeart} onClick={() => like()} />
                                }
                                <p>{usersLike.length}</p>
                            </div>
                        </div>
                        {
                            comments.map(comment => {
                                return <Comments key={comment.id} commentData={comment} userData={userData} getProfil={props.getProfil} reRender={props.reRender}/>
                            })
                        }
                        <div className='add-post'>
                            <div className='add-post-head add-comment-container'>
                                <img src={props.userImageUrl === null ? icone : props[0].image_url} className='pointer' alt="profil" />
                                <form onSubmit={(e) => addComment(e)} className="add-comment">
                                    <textarea rows="1" placeholder='Réagissez' onChange={(e) => setComment({ content: e.target.value })}></textarea>
                                    <input type="submit" value="Poster" className='button pointer' />
                                </form>
                            </div>
                        </div>
                    </div>
                  
                )  
               
            } 
           
        </>

    )
}

export default Post