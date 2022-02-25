const db = require("../config/db");



exports.createComment = (req, res, next) => {

    const {content, image_url, posts_id, users_id} = req.body;

    if(!image_url) {
        
        db.query(`INSERT INTO comments (content, posts_id, users_id) VALUES ("${content}", ${posts_id}, ${users_id})`)
            .then(() => res.status(201).json({message: "Le commentaire à bien été créé"}))
            .catch(err => res.status(400).json({err}));
    }   
}

exports.removeComment = (req, res, next) => {

    const id = req.params.id;
    const user_id = req.body.user_id;

    db.query(`SELECT * FROM comments WHERE id = ${id}`)
        .then(resp => {
            console.log(resp[0].users_id);
            if(resp[0].users_id !== user_id){

                return res.status(400).json({message: "L'utilisateur ne peut pas supprimer de commentaires d'autres utilisateurs"})
            }
            db.query(`DELETE FROM comments WHERE id = ${id}`)
                .then(() => res.status(200).json({message: "le commentaire a bien été supprimé"}))
                .catch(() => res.status(400).json({err}))
        })
        .catch(err => res.status(400).json({err}))
}
exports.updateComment = (req, res, next) => {

    const id = req.params.id;
    const {content, user_id} = req.body;

    db.query(`SELECT * FROM comments WHERE id = ${id}`)
        .then(resp => {
            console.log(resp[0].users_id);
            if(resp[0].users_id !== user_id){

                return res.status(400).json({message: "L'utilisateur ne peut pas modifier de commentaires d'autres utilisateurs"})
            }
            db.query(`UPDATE comments SET content = "${content}" WHERE id = ${id}`)
                .then(() => res.status(200).json({message: "le commentaire a bien été modifié"}))
                .catch(() => res.status(400).json({err}))
        })
        .catch(err => res.status(400).json({err}))

}   
exports.getAllComments = (req, res, next) => {

    
    const post_id = req.params.id;
    console.log(post_id);
    db.query(`SELECT * FROM comments WHERE posts_id = ${post_id}`)
        .then(comments => res.status(200).json(comments))
}