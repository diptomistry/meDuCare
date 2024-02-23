const pool=require('../../database');//import the pool object from the database file
module.exports = {//to export create method
 
getDoctor: callBack => {//to get all the users
    pool.query(
        `SELECT id, name, position, contact_no, email,image_path
        FROM doctors;`,
        [],
        (error, results, fields) => {
            if (error) {
                return callBack(error);//if error occurs, return the error to the callback function 
            }
            return callBack(null, results);//null is returned as there is no error
        }
    )
    },




};