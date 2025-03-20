const RatingAndReview = require("../models/RatingAndReview");
const User = require("../models/User")
const Course =  require("../models/Courses")

exports.createRating = async(req, res)=>{
    try{
const userId = req.user.id;
const {courseId, rating, review } = req.body;

const courseDetails = await Course.findOne(
    {_id:courseId,
        studentsEnrolled:{$elemMatch:{$eq:userId}}
    }
)

if(!courseDetails){
    return res.status(401).json({
        success:false,
        message:"Student is not enrolled in the course yet"
    })
}

const alreadyReviewed = await RatingAndReview.findOne({
    user:userId,
    course:courseId
})

if(alreadyReviewed){
    return res.status(402).json({
        success:false,
        message:"The course is already reviewed by user"
    })
}

const newRatingReview = await RatingAndReview.create({
    user:userId, course:courseId, rating, review
})

const updatedCourseDetails = await Course.findByIdAndUpdate({_id:courseId},
    {
        $push:{
            ratingAndReviews:newRatingReview._id
        }
    },{new:true}
)

console.log("updatedCourseDetails>", updatedCourseDetails)

res.status(200).json({
    success:true,
    message:"Rating and Review submitted successfully",
    newRatingReview
})
    }catch(error){
        console.log(error)
        res.status(400).json({
            success:false,
            message:"Rating cannot created"
        })
    }
}

exports.getAverageRating = async(req, res)=>{
    try{
        const {courseId} = req.body;
        const result = await RatingAndReview.aggregate([
            {
                $match:{
                    course:new mongoose.Types.ObjectId(courseId)
                }
            },{
                $group:{
                    _id:null,
                    averageRating:{$avg:"$rating"}
                }
            }
        ])

        if(result.length > 0) {

            return res.status(200).json({
                success:true,
                averageRating: result[0].averageRating,
            })

        }
        
        //if no rating/Review exist
        return res.status(200).json({
            success:true,
            message:'Average Rating is 0, no ratings given till now',
            averageRating:0,
        })
    }catch(error){
        console.log(error)
        return res.status(400).json({
            success:false,
            message:error.message
        })
    }
}

exports.getAllRatings= async(req, res)=>{
    try{
const allReviews = await RatingAndReview.find({})
.sort({rating:"desc"})
.populate({
    path:"user",
    select:"firstName lastName email image"
})
.populate({
    path:"course",
    select:"courseName"
}).exec();

return res.status(200).json({
    success:true,
    message:"All reviews are fetched successfully",
    allReviews
})

    }catch(error){
        console.log(error);
        return res.status(400).json({
            succesS:false,
            message:"Error in getting All Ratings"
        })
    }
}