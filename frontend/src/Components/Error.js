
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Error = () => {
    const navigate = useNavigate()

    useEffect(() => {
        setTimeout(() => {
            navigate("/")
        }, 3000)
    }, [])
    
  return (
    <div className='error'>Utilisateur non autorisé :(</div>
  )
}

export default Error