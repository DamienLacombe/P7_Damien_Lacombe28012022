import React, { useEffect, useState } from 'react';
import icone from "../images/icone.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { getToLocalStorage } from '../utils/toLocalStorage';

const Comments = (props) => {

    const [deleteComment, setDeleteComment] = useState(false)
    const [updateComment, setUpdateComment] = useState(false)
    const [commentContent, setCommentContent] = useState(props.commentData.content)
    const [userData, setUserData] = useState([])

    const trash = () => {

        fetch(`http://localhost:4200/api/comment/${props.commentData.id}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': getToLocalStorage("dataUser").token
            },
            method: "DELETE",
            body: JSON.stringify({ user_id: props.commentData.users_id })
        })
            .then(resp => {
                return resp.json()
            })
            .then(resp => {

                setDeleteComment(!deleteComment);
            })
    }

    useEffect(() => {
        getUser()
    }, [props.reRender])

    useEffect(() => {

        getUser()
    }, [])

    const getUser = () => {
        fetch(`http://localhost:4200/api/auth/${props.commentData.users_id}`, {
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
    const update = (e) => {
        e.preventDefault()
        if (updateComment === false) {
            setUpdateComment(!updateComment)
        } else {

            fetch(`http://localhost:4200/api/comment/${props.commentData.id}`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': getToLocalStorage("dataUser").token
                },
                method: "PUT",
                body: JSON.stringify({
                    content: commentContent,
                    user_id: props.commentData.users_id
                })
            })
                .then(resp => {
                    return resp.json()
                })
                .then(resp => {
                    setUpdateComment(!updateComment)
                })
        }
    }

    return (
        <>
            {
                deleteComment ? "" : (
                    <div className='container-relatif'>
                        <div className='comment'>
                            {
                                updateComment ? (
                                    <form onSubmit={(e) => update(e)}>
                                        <textarea rows="1" type="text" className='content' value={commentContent} onChange={(e) => setCommentContent(e.target.value)} />
                                        <input type="submit" className='valider' />
                                    </form>
                                ) : (
                                    <>
                                        <img src={userData[0] === undefined ? icone : (
                                            userData[0].image_url === null ? icone : userData[0].image_url
                                        )} alt="profil" onClick={() => props.getProfil(props.commentData.users_id)} />
                                        <p>
                                            <span onClick={() => props.getProfil(props.commentData.users_id)} className='pseudo'>{userData[0] === undefined ? "" : userData[0].pseudo}</span> <br />
                                            {commentContent}
                                        </p>
                                    </>
                                )
                            }
                        </div>
                        {
                            props.commentData.users_id === getToLocalStorage("dataUser").userId ? (

                                <div className='icons'>
                                    <FontAwesomeIcon icon={faPen} onClick={update} />
                                    <FontAwesomeIcon icon={faTrash} onClick={trash} />
                                </div>
                            ) : ""
                        }
                    </div>
                )
            }

        </>

    )
}

export default Comments;