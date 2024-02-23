const {getDoctor}=require('./doctor.service');

module.exports = {
 
    getDoctors:(req,res)=>{
        getDoctor((err,results)=>{//to call the getUser method from the user.service file
            if(err){
                console.log(err);
                return;
            }
            return res.json({
                success:1,
                data:results
            });
        });
    },


  
 
    


};//to export createUser method