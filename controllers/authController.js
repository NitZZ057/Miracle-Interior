import JWT from "jsonwebtoken";
import { comparePassword, hashPassword } from "../helper/authHelper.js";
import userModel from "../models/userModel.js";

export const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address } = req.body;
        if (!name) {
            return res.send({ message: "Name required!!" })
        }
        if (!email) {
            return res.send({ message: "Email required!!" })
        }
        if (!password) {
            return res.send({ message: "Password required!!" })
        }
        if (!phone) {
            return res.send({ message: "Phone Number required!!" })
        }
        if (!address) {
            return res.send({ message: "Address required!!" })
        }

        const userExist = await userModel.findOne({ email });
        if (userExist) {
            return res.status(200).send({
                success: false,
                message: "User Already Exist, Please Sign in"
            })
        }

        const hashedPassword = await hashPassword(password);
        const user = await new userModel({
            name,
            email,
            password: hashedPassword,
            address,
            phone,
        }).save();

        return res.status(201).send({
            success: true,
            message: "User Registered successfully",
        });

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: "Error in Registration",
            error
        })
    }
};

export const signInController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.send({ message: "Invalid Email or Password" })
        }

        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Invalid Email"
            });
        }

        const match =await comparePassword(password, user.password);
        if (!match) {
            return res.status(404).send({ 
                success:false,
                message: "Invalid Password"
             });
        }

        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET,{expiresIn:"7d"})
        return res.status(200).send({
            success: true,
            message: "Login Successfull",
            user: {
                _id:user._id,
                name: user.name,
                phone: user.phone,
                email: user.email,
                address: user.address,
                role:user.role
            },
            token

        });


    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error while Sign in",
            error
        });
    }
}