import React, {useState} from 'react';
import {setToLocalStorage} from "../utils/toLocalStorage";
import {useNavigate} from "react-router-dom";

function Login(props) {
    
    let navigate = useNavigate()
    
    const [userInfo, setUserInfo] = useState({
        email:"",
        password:""
    })

    const handle = (e) => {
        if (e.target.name === 'email') {
            setUserInfo({email: e.target.value, password: userInfo.password});
        } else {           
            setUserInfo({ email: userInfo.email, password: e.target.value });
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch("http://localhost:4200/api/auth/login", {
             headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(userInfo)
        })       
        .then(resp => {
            if (resp.ok) {
                return resp.json();
            } 
            throw new Error('Utilisateur non autorisé');
        })
        .then(data => {
            setToLocalStorage("dataUser", data);
            navigate("/home")
        })
        .catch(err => {
            navigate("/error")
        })
    }

    return (
        
        <div className='form-container'>
            <h1>Connection</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email</label>
                    <input name='email' type="text" value={userInfo.email} onChange={handle}/>
                </div>
                <div>
                    <label>Mot de passe</label>
                    <input name='password' type="password" onChange={handle}/>
                </div>
                <input type="submit" value="connexion" className="btn"/>
            </form>
            <button onClick={() => props.toLogin()}>Vous n'êtes pas inscrit ?</button>
        </div>
    )
}

export default Login;