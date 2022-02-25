const db = require("../config/db");

exports.createPost = (req, res, next) => {
    const {content, image_url, user_id} = req.body;

    if(!image_url) {
        db.query(`INSERT INTO posts (content, users_id) VALUES ('${content}', ${user_id})`)
            .then(() => res.status(201).json({message: "Le post a bien été créé"}))
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
    const {content, image_url, user_id} = req.body;

    if(!image_url) {

        db.query(`SELECT * FROM posts WHERE id = ${id}`)
            .then(post => {
                
                if(post[0].users_id !== user_id) {

                    return res.status(400).json({message: "L'utilisateur ne peut pas modifier de posts d'autres utilisateurs"})
                }
                db.query(`UPDATE posts SET content = "${content}" WHERE id = ${id}`)
                    .then(() => res.status(201).json({message: "Le post a bien été modifié"}))
                    .catch(err => res.status(400).json({err}));

            })
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

