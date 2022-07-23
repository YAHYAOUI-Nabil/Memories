const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.signin = async(req, res) => {
    const {email, password} = req.body

    try {
        const userExist = await User.findOne({email})

        if(!userExist) {
            return res.status(404).json({message : `User doesn't exist!`})
        }

        const isPasswordCorrect = await bcrypt.compare(password, userExist.password)

        if(!isPasswordCorrect) {
            return res.status(400).json({message : `Invalid password!`})
        }

        const token = jwt.sign({email, id:userExist._id}, process.env.TOKEN_SECRET, {expiresIn:'999 days'})

        return res.status(200).json({
                    message : 'User logged in.',
                    username : userExist.name,
                    email,
                    token
                })
    } catch (error) {
         return res.status(500).json({message : 'Something went wrong?'})
    }
    
}


exports.signup = async(req, res) => {
    const {firstName, lastName, email, password, confirmPassword} = req.body

    try {

        if(!firstName || !lastName || !email || !password || !confirmPassword) {
            return res.status(400).json({message : 'Please add all fields.'})
        }

        userExist = await User.findOne({email})

        if(userExist) {
            return res.status(400).json({message : 'User already exist.'})
        }

        if(password !== confirmPassword){
            return res.status(400).json({message : `Passwords don't match.`})
        }
        
        salt = await bcrypt.genSalt(12)
        hashedPassword = await bcrypt.hash(password, salt)

        const user = await User.create({
            name : firstName + ' ' + lastName,
            email,
            password : hashedPassword
        })

        if(!user) {
            return res.status(400).json({message : `User not added. Please try again.`})
        }
        const token = await jwt.sign({email, id:user._id}, process.env.TOKEN_SECRET, {expiresIn:'999 days'})
        
        return res.status(201).json({
                message : 'User created.',
                username : user.name,
                email,
                token
            })
        

    } catch (error) {
        return res.status(500).json({message : 'Something went wrong?'})
    }
}