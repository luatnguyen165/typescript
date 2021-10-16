const redis = require("redis");
const client = redis.createClient();
const employee = require('../model/employee');

module.exports ={
    getName :async function(req, res, next) {
        const name = req.body.name;
        
        const em =  await employee.findOne({name:name});
          if(em===null){
            res.status(200).json({message:'Data db',data:em})
          }else{
            client.setex(name,60,JSON.stringify(em))
       
            res.status(200).json({message:'Data db',data:em})
          }
            

        
        
      },
    // getSera: async function(req, res, next) {
    //   const name = req.params.name;
    // },
    cache: async function(req, res, next){
        const name = req.body.name;
      //  console.log('====================================');
      //  console.log(req.session.User);
      //  console.log('====================================');
        client.get(name,(err,data)=>{
          if(!err) {
            if(data!==null){
              res.status(200).json({message:'Data redis',data:JSON.parse(data)});
            }else{
              next();
            }
            
          }   
            
        }) 
    },
    postName :async function(req, res, next) {
        try {
            const name = req.body;
            console.log('====================================');
            console.log(name);
            console.log('====================================');
            const em = new employee(
              name
            )
           await em.save();
           res.send('Success')
          } catch (error) {
            throw new Error(error)
          } 
    }
}