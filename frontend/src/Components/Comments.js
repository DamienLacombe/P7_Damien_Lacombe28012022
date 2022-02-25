import React from 'react';
import profilIcone from "../images/icone-profil.jpg"

const Comments = (props) => {
    
    return (
        <>
            <img src={profilIcone} alt="profil" />
            <p>{props.commentData.content}</p>
        </>
    )
}

export default Comments;