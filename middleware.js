require('dotenv').config(); // Load .env

const z = require("zod");
const jwt = require("jsonwebtoken")

async function auth(req,res,next) {
    
     const validedData = z.object({
           email:z.string().min(4).max(40).email(),
           password:z.string().min(8).regex(/[A-Z]/)
                                     .regex(/[a-z]/)
                                     .regex(/[0-9]/)
                                     .regex(/[^A-Za-z0-9]/,)
       })

       const parsed = validedData.safeParse(req.body);

        if(!parsed.success){
         res.json({
            msg:"incorrect format",
            error:parsed.error.errors
        })
        return
    }
      
       const token = localStorage.getItem("token");
    try{
        const decodedData = jwt.verify(token,process.env.JWT_USER_SECRET)

        if(decodedData){
            req.UserId = decodedData.id;
            next();
        }else{
            res.status(403).json({
                msg:"Incorrect credentials"
            })
        }
    }catch(error) {
        console.error("Error during todo operation:",error)
        res.status(500).json({
            msg:"An error occurred during todo operation",
            error:error.message
        })
    }

}

module.exports = {
    auth:auth
}