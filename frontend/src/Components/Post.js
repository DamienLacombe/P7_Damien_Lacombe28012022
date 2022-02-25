import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart} from '@fortawesome/free-solid-svg-icons';
import { faPen} from '@fortawesome/free-solid-svg-icons';
import { faTrash} from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';
import Comments from './Comments';
import profilIcone from "../images/icone-profil.jpg"

const Post = (props) => {

    const [comments, setComments] = useState([])
    const [userData, setUserData] = useState([])

    useEffect(() => {
        fetch(`http://localhost:4200/api/Comment/${props.postData.id}`, {
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
            setComments(data)
        })

        fetch(`http://localhost:4200/api/auth/${props.postData.users_id}`, {
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
            setUserData(data)
        })

    },[])
    console.log(userData[0].pseudo);
    return (
        <div className='post-container'>
          <div className='post'>
            <div className='post-head'>
                  <img src={profilIcone} alt="Profil" />
                  <p>{userData[0].pseudo}</p>
                  <p>{}</p>
                  <div>
                      <FontAwesomeIcon icon={faPen}/>
                      <FontAwesomeIcon icon={faTrash}/>
                  </div>
              </div>
              <p className='content'>{props.postData.content}</p>
              <div>
                  <FontAwesomeIcon icon={faHeart}/>
                  <p>{}</p>
              </div>
          </div>
            <div className='comment'>
              {
                comments.map(comment => {
                    return <Comments key={comment.id} commentData={comment}/>
                })
              }  
            </div>
        </div>
    )
}

export default Post