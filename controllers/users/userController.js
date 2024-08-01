const UserModel = require('../../models/userSchema')

exports.addUsers = async(req, res)=>{
    const data = req.body;
    if(!data) throw new Error (404, 'Data not found!')

    // console.log("Data:",data)
    const saveData = new UserModel(data);
    // if(!saveData) throw new Error (404, 'Data not found!')
    // console.log(saveData);
    await saveData.save();  
    res.status(201).send({message:'data saved successfully'})

}