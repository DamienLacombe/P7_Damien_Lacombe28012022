const jwt = require("jsonwebtoken");
const dotenv = require("dotenv"); 

dotenv.config()

module.exports = (req, res, next) => {

    try {
        const token = req.headers.authorization;
        const decodedToken = jwt.verify(token, process.env.RANDOM_TOKEN_SECRET);
        const userId = decodedToken.userId;
        if(req.body.userId && req.body.userId !== userId){

            throw "invalid user id";
        }
        else {
            next();
        }
    } catch {
        
        res.status(401).json({
            error: new Error("invalide request")
        })
    }
}