import reviewModel from "../models/reviewModel.js";
import JWT from "jsonwebtoken";


export const submitReviewController = async (req, res) => {
    try {
        const { value, feedBack,user,token } = req.body;
        if (!value || !feedBack) {
            return res.send({ message: "Invalid Review" })
        }

        //verify user
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Invalid User"
            });
        }


        //verify token
        // const decoded = await JWT.verify(token, process.env.JWT_SECRET)
        // if (!decoded) {
        //     return res.status(404).send({
        //         success: false,
        //         message: "Invalid Token"
        //     });
        // }

        
        const review = await reviewModel.create({name:user.name, value:value, feedBack:feedBack,user_id:user._id })
        if (!review) {
            return res.status(404).send({
                success: false,
                message: "Invalid Review"
            });
        }

        return res.status(200).send({
            success: true,
            message: "Review Submitted Successfully",
            review

        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error while Submitting Review",
            error
        });
    }
}


export const getReviewController = async (req, res) => {
    try {
        const reviews = await reviewModel.find({})
        if (!reviews) {
            return res.status(404).send({
                success: false,
                message: "No Reviews Found"
            });
        }

        return res.status(200).send({
            success: true,
            message: "Reviews Found",
            reviews

        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error while Getting Reviews",
            error
        });
    }
}