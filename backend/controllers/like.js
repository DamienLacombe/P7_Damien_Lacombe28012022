// const db = require("../config/db")

const db = require("../config/db");


exports.addLike = (req, res, next) => {

    const {posts_id, users_id} = req.body;

    db.query(`SELECT * FROM likes WHERE posts_id = ${posts_id} AND users_id = ${users_id}`)
        .then(resp => { 
            
            if(resp.length > 0) {
                    
                db.query(`DELETE FROM likes WHERE posts_id = ${posts_id} AND users_id = ${users_id}`)
                    .then(() => res.status(200).json({message: "Le like a bien été supprimé"}))
                    .catch(err => res.status(400).json({err}))
            } 
            
            db.query(`INSERT INTO likes (posts_id, users_id) VALUES (${posts_id}, ${users_id})`)
                .then(() => res.status(201).json({message: "Le like a bien été ajouté"}))
                .catch(err => res.status(400).json({err}));
            
        })
        .catch(err => res.status(500).json({err}))
}

exports.getAllLikes = (req, res, next) => {

    const posts_id = req.body.posts_id;

    db.query(`SELECT COUNT(*) FROM likes WHERE posts_id = ${posts_id}`)
        .then(total => res.status(200).json(total[0]["COUNT(*)"]))
        .catch(err => res.status(400).json({err}));
}

