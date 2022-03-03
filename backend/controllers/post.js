const db = require("../config/db");

exports.createPost = (req, res, next) => {
    const {content, users_id} = req.body;
    let image_url = ""
    if (req.file) {
        image_url = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        db.query(`INSERT INTO posts (content,  image_url, users_id) VALUES ("${content}",  "${image_url}", ${users_id})`)
            .then(() => res.status(201).json({message: "Le post a bien été créé"}))
            .catch(err => res.status(400).json({err}));
    }
    else {
        db.query(`INSERT INTO posts (content, users_id) VALUES ("${content}", ${users_id})`)
            .then(() => {res.status(201).json({message: "Le post a bien été créé"})})
            .catch(err => res.status(400).json({err}));
    }
    
}

exports.getPost = (req, res, next) => {

    const id = req.params.id;
    db.query(`SELECT * FROM posts WHERE id = ${id}`)
        .then(post => res.status(200).json(post))
        .catch(err => res.status(400).json({err}));
}

exports.getAllPosts = (req, res, next) => { 
    
    db.query(`SELECT * FROM posts`)
        .then(posts => res.status(200).json(posts))
        .catch(err => res.status(400).json({err}));
}

exports.updatePost = (req, res, next) => {

    const id = req.params.id;
    const {content,  users_id} = req.body;
    let image_url;

    if(req.file) {

        image_url = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        db.query(`UPDATE posts SET content = "${content}", image_url = "${image_url}" WHERE id = ${id}`)
            .then(() => res.status(201).json({message: "Le post a bien été modifié"}))
            .catch(err => res.status(400).json({err}));
    } else {
   
        db.query(`UPDATE posts SET content = "${content}" WHERE id = ${id}`)
            .then(() => res.status(201).json({message: "Le post a bien été modifié"}))
            .catch(err => res.status(400).json({err}));    
    }
}

exports.deletePost = (req, res, next) => {

    const id = req.params.id;
    const user_id = req.body.user_id;
    db.query(`SELECT * FROM posts WHERE id = ${id}`)
        .then(post => {
            
            if(post[0].users_id !== user_id) {

                return res.status(400).json({message: "L'utilisateur ne peut pas supprimer de posts d'autres utilisateurs"})
            }
            db.query(`DELETE FROM posts WHERE id = ${id}`)
                .then(() => res.status(200).json({message: "Le post a bien été supprimé"}))
                .catch(err => res.status(400).json({err}));

        })
}

