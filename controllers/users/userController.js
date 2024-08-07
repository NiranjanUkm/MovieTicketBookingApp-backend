const UserModel = require('../../models/userSchema')

exports.addUsers = async(req, res)=>{
    const data = req.body;
    if(!data) throw new Error (404, 'Data not found!')

    // console.log("Data:",data)
    const saveData = new UserModel(data);
    if(!saveData) throw new Error (404, 'Data not found!');
    // console.log(saveData);

    
    // Check for existing user with the same email or phone number
    const existingUser = await UserModel.findOne({ $or: [{ email: data.email }, { phone: data.phone }] });
    if (existingUser) {
      return res.status(409).json({ error: 'User with this email or phone number already exists' });
    }

    await saveData.save();  
    res.status(201).send({message:'data saved successfully'})

}