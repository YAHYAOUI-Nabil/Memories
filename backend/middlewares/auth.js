const jwt = require('jsonwebtoken')

module.exports = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const isCustomToken = token.length < 500
        
        if(token && isCustomToken) {
            let decodedToken = jwt.verify(token, process.env.TOKEN_SECRET)
            req.userId = decodedToken?.id
        }else {
            let decodedToken = jwt.decode(token)
            req.userId = decodedToken?.sub
        }
        next()

    } catch (error) {
        console.log(error)
        res.status(401).json({error : `Invalid request!`})
    }
}

