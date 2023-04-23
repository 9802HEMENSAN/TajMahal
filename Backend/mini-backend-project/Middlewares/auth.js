
const jwt = require('jsonwebtoken');

const auth = async (req,res,next)=>{
    let incToken= req.headers.authtoken;
    await jwt.verify(incToken, 'masai', function(err, decoded) {
  
   
       //_________________________
          if(err){
            
            res.status(401).json({error:"invalid token"})
        }
        else {
            //console.log(decoded.userId,"decoded");
            req.body.userId =decoded.userId;
            //console.log(req.body)

           next()
        }
    });      




    
}


module.exports={auth};
