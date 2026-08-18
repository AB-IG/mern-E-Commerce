import jwt from "jsonwebtoken"

const createToken = (res,userId) =>{

    const token = jwt.sign({userId},process.env.SECRET_KEY,{expiresIn:"30d"})

    res.cookie('token',token,{
         expires: new Date(Date.now() +30* 24*60*60*1000),
          httpOnly: true,
          sameSite:"strict",
          secure:process.env.NODE_ENV ==="production"
         })
    return token
}

export default createToken