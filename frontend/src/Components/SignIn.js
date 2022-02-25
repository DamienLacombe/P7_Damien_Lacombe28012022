import React, {useState} from 'react';
import { Link } from 'react-router-dom';

const SignIn = (props) => {
    const [userInfo, setUserInfo] = useState({
        email:"",
        password:"",
        pseudo:""
    })

    const handle = (e) => {
        if (e.target.name === 'email') {
            setUserInfo({email: e.target.value, password: userInfo.password, pseudo: userInfo.pseudo});
        } else if(e.target.name === "password"){           
            setUserInfo({ email: userInfo.email, password: e.target.value, pseudo: userInfo.pseudo});
        } else {
            setUserInfo({ email: userInfo.email, password: userInfo.password , pseudo: e.target.value});
        }
    }

    const handleSubmit = (e) => {
        console.log(userInfo);
        e.preventDefault()
        fetch("http://localhost:4200/api/auth/signup", {
             headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(userInfo)
        })
        .then(() => props.toLogin())
    }

    return (
        <div className='form-container'>
            
            <h1>Inscription</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email</label>
                    <input name='email' type="text" value={userInfo.email} onChange={handle}/>
                </div>
                <div>
                    <label>Mot de passe</label>
                    <input name='password' type="password" onChange={handle}/>
                </div>
                <div>
                    <label>Pseudo</label>
                    <input type="text" onChange={handle}/>
                </div>
                <input type="submit" value="Inscription" className='btn'/>
            </form>
            <button onClick={() => props.toLogin()}>Déja inscrit ?</button>
        </div>
    )
}

export default SignIn;