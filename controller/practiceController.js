const { default: mongoose, set } = require("mongoose");
const { User } = require("../models/practiceModel");

const createUser = async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        console.log('New user has been created', newUser);
        res.status(201).json(newUser); // Respond with the newly created user
    } catch (error) {
        console.error('Error creating a new user', error);
        res.status(400).json({ error: 'Invalid request data' }); // Respond with a bad request status and an error message
    }
};

const allUser = async (req, res) => {
    try {
        const allUsers = await User.find({})
        res.status(200).send(allUsers)
    } catch (error) {
        res.status(404).json({ "Error": error })
    }
}

const editUser = async (req, res) => {
    try {
        const id = req.params.id;
        const objectId = new mongoose.Types.ObjectId(id);

        const user = await User.findById(objectId);
        
        res.json(user)
    } catch (error) {
        res.json({ "Error": error })
        console.log('Error occured while call editUser:', error)
    }
}

const setEditUser = async (req, res) => {
    try {
        const id = req.params.id;
        const objectId = new mongoose.Types.ObjectId(id);
        const setUser = req.body 
        const updatadUser = await User.findByIdAndUpdate(objectId, setUser,{new:true})
        res.json(updatadUser)
        console.log(updatadUser)
    } catch (error) {
        console.log('Failed setEdit User in backend :', error)
        res.status(401)
    }
}

const deleteUser = async (req,res) => {
    try {
        const id = req.params.id;
        const objectId = new mongoose.Types.ObjectId(id);
        const deletedUser = await User.deleteOne({_id:objectId})
        res.json(deletedUser)
    } catch (error) {
        console.log('Error occured on backend deleteUser :', error)
    }
}

module.exports = { createUser, allUser, editUser, setEditUser, deleteUser };
