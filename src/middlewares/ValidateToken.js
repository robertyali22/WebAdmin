import jsonwebtoken from 'jsonwebtoken'
import { SECRET } from '../config.js'

export const authRequired = (req, res, next) => {
    const { token } = req.cookies

    if (!token) return res.status(401).json({message: "No token, authorization denied!"})

        jsonwebtoken.verify(token, SECRET, (err, user)=> {
            if (err) return res.status(403).json({message: "Invalid Token"})
            
            console.log(token)
            req.user = user
            console.log(user)
            
            next()
        })
}