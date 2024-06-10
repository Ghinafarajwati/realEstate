import User from "../Models/userModels.js"
import Listing from "../Models/listingModels.js";
import bcrypt from 'bcryptjs'
import { ErrorHandler } from "../Utils/error.js";

export const UserController = async (req, res) => {
    try {
        await res.status(200).json({success: true, message: 'API USER SUCCESS'})
    } catch (error) {
        console.log('err')
    }
};

export const updateUser = async (req, res, next) => {
    if(req.user.id !== req.params.id) return next(ErrorHandler(401, 'Own Acc!'))
    try {

        const existingUser = await User.findOne({username: req.body.username})
        if(existingUser && existingUser._id.toString() !== req.params.id)
        return next(ErrorHandler(400, "Username is already taken."))


        if(req.body.password) {
            req.body.password = bcrypt.hashSync(req.body.password, 10)
        }

        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                avatar: req.body.avatar
            }
        }, {new: true})

        const {password, ...rest} = updatedUser._doc
        res.status(200).json(rest)
    } catch (error) {
        next(ErrorHandler(500, "User cannot update"))
    }
}

export const deleteUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) 
    return next(errorHandler(401, 'You can only delete your own account!'));

    try {
        await User.findByIdAndDelete(req.params.id)
        res.clearCookie('access_token');
        res.status(200).json({success: true, message: 'User has been deleted!'})
    } catch (error) {
        next(ErrorHandler(401, 'Failed delete!'))
    }
}


export const GetUserListing = async (req, res, next) => {
    if(req.user.id === req.params.id) {    //Jika usernya sama dengan id yg diminta
        try {
            const newListing = await Listing.find({userRef: req.params.id})      //Temukan Listing berdasarkan id pengguna
            res.status(200).json({success: true, message: 'Succesfully getUserListing', data: newListing})
        } catch(error){
            next(error)
        }
    } else {
        return next(ErrorHandler(401, "Ypu can only view your own listings"))
    }
}

export const GetUserContact = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id)  //Temukan usermana yg ngepost
        if(!user) return next(ErrorHandler(401, 'user not found'))  //perlu ngasih info ke backend
        
        const {password, ...rest} = user._doc
        return res.status(200).json({success: true, message: 'getUser', data: rest})
    } catch(error) {
        next(error)
    }
} 