const jwt =require("jsonwebtoken");


const auth =async (req, res, next) => {

    try {
        const token = req.headers.cookie
        console.log("your token is " + token)
        const tokenVerification =  jwt.verify(token,process.env.JWT_SECRET_KEY);
        next();
    }
    catch (err) {
        console.error(err)
    }
    

}

module.exports = auth;