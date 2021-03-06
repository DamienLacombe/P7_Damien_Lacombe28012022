const bcrypt = require("bcrypt");
const db = require("../config/db");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv")


exports.signUp = (req, res, next) => {

    console.log(req.body.pseudo);
    
    bcrypt.hash(req.body.password, 10)
        .then(hash => { 
            db.query(`INSERT INTO users (email, password, pseudo) VALUES ('${req.body.email}','${hash}', '${req.body.pseudo}')`)
            res.status(201).json({message : "Utilisateur créé"});
        })
        .catch(error => res.status(400).json({error}));
}

exports.login = (req, res, next) => {

    const {email, password} = req.body;
    let isAdmin = false;

    db.query(`SELECT * FROM users WHERE email = '${email}' `)
        .then(user => {
            if (user[0].admin === 1) {
                isAdmin = true;
            }
            if(!user) {

                return res.status(404).json({message: "l'utilisateur n'existe pas"});
            }
            bcrypt.compare(password, user[0].password) 
                .then(valid => {

                    if(!valid) {
                        return res.status(401).json({message: "Le mot de passe est invalide"});
                    }

                    db.query(`SELECT users.id FROM users WHERE email = '${email}'`)
                    .then(user_Id => { 
                        res.status(201).json({   
                            userId: user_Id[0].id,
                            token: jwt.sign({userId: user_Id[0].id}, process.env.RANDOM_TOKEN_SECRET, {expiresIn: "24h"}),
                            admin: isAdmin
                        })
                    })
                    .catch(err => res.status(400).json({message: "ok"}));
                })
                .catch(err => res.status(400).json({err}));
        })
        .catch(error => res.status(500).json({error}));
}

exports.getUser = (req, res, next) => {

    const id = req.params.id;

    db.query(`SELECT * FROM users WHERE id = ${id}`)
        .then(user => res.status(200).json(user))
        .catch(error => res.status(404).json({error}));  
}

exports.updateUser = (req, res, next) => {

    const {password, pseudo, bio} = req.body;
    const id = req.params.id;
    let image_url = ""
    
    if (req.file) {
        image_url = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    }
    if (password === ""){
        db.query(`UPDATE users SET pseudo = "${pseudo}", bio = "${bio}", image_url = '${image_url}' WHERE id = ${id}`)
            .then(() => res.status(201).json({message : "L'utilisateur a bien été modifié"}))
            .catch(error => res.status(400).json({error}));
    } else {
        bcrypt.hash(req.body.password, 10)
        .then(hash => {
            db.query(`UPDATE users SET password = '${hash}', pseudo = '${pseudo}', bio = '${bio}', image_url = '${image_url}' WHERE id = ${id}`)
                .then(() => res.status(201).json({message : "L'utilisateur a bien été modifié"}))
                .catch(error => res.status(400).json({error}));
        })
    }
    
    
}

exports.deleteUser = (req, res, next) => {

    const id = req.params.id;

    db.query(`DELETE FROM users WHERE id = ${id}`)
        .then(() => res.status(200).json({message: "L'utilisateur a bien été supprimé"}))
        .catch(error => res.status(400).json({error}));
}