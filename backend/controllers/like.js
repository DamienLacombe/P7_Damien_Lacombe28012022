// const db = require("../config/db")

const db = require("../config/db");


exports.addLike = (req, res, next) => {

    const {posts_id, users_id} = req.body;

    db.query(`SELECT * FROM likes WHERE posts_id = ${posts_id} AND users_id = ${users_id}`)
        .then(resp => { 
            console.log("ok");
            if(resp.length > 0) {
                db.query(`DELETE FROM likes WHERE posts_id = ${posts_id} AND users_id = ${users_id}`)
            
                       return res.status(200).json({like: 0})
        
                    
            } 
            
            db.query(`INSERT INTO likes (posts_id, users_id) VALUES (${posts_id}, ${users_id})`)
                .then(() => res.status(201).json({like: 1}))
                .catch(err => res.status(400).json({err}));
            
        })
        .catch(err => res.status(500).json({err}))
}

exports.getAllLikes = (req, res, next) => {

    const post_id = req.params.id;

    db.query(`SELECT likes.users_id FROM likes WHERE posts_id = ${post_id}`)
        .then(likes => res.status(200).json(likes))
        .catch(err => res.status(400).json({err}));
}

