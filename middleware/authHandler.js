const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken');

const validateToken = asyncHandler(async(req,res,next)=>{
    let token;

    let authHeader = req.headers.Authorization || req.headers.authorization
        if(authHeader){
        //     token = authHeader.split(" ")[1];
        token = authHeader;
        // if(token)
        console.log('token = ',token);
        jwt.verify(token,process.env.JWT_SIGNING_KEY,(err,decoded)=>{
            if(err){
                res.status(401).json("user is not authorized");
                // throw new Error("user is not authorized");
                return;
            }
            console.log("decoded",decoded)
            // req.user = decoded.user
            // next()
            next()
        })
    }
    if(!token){
        res.status(401).json("user is not authorized or token missing");
    }
})

module.exports = validateToken;
