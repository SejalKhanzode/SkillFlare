const Course = require("../models/Courses");
const Category = require("../models/Category");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const User = require("../models/User")

exports.createCourse = async (req, res) => {
  try {
    const userId = req.user.id;
    let {
      courseName,
      courseDescription,
      whatYouWillLearn,
      price,
      tag,
      category,
      status,
      instructions,
    } = req.body;

    const thumbnail = req.files.thumbnailImage;
    if (
        !courseName ||
        !courseDescription ||
        !whatYouWillLearn ||
        !price ||
        !tag ||
        !thumbnail ||
        !category
    ) {
        return res.status(400).json({
            success: false,
            message: "All Fields are Mandatory",
        });
    }
    if (!status || status === undefined) {
        status = "Draft";
    }
   
    const instructorDetails = await User.findById(userId, {
        accountType: "Instructor",
    });

    if (!instructorDetails) {
        return res.status(404).json({
            success: false,
            message: "Instructor Details Not Found",
        });
    }

    const categoryDetails = await Category.findById(category);
    console.log("categoryDetails>>", categoryDetails)
    if (!categoryDetails) {
        return res.status(404).json({
            success: false,
            message: "Category Details Not Found",
        });
    }

    // image upload
    const thumbnailImage = await uploadImageToCloudinary(
        thumbnail,
        process.env.FOLDER_NAME
    );
    console.log(thumbnailImage);

    const newCourse = await Course.create({
        courseName,courseDescription,
        whatYouWillLearn:whatYouWillLearn,
        tag:tag,
        instructor:instructorDetails._id,
        price,
        category:categoryDetails._id,
        thumbnail:thumbnailImage.secure_url,
        status:status,
        instructions:instructions
    })

    // update user
    await User.findByIDAndUpdate(
        {_id:instructorDetails._id},
        {
            $push:{
                courses:newCourse._id
            }
        },
        {new:true}
    )

    await Category.findByIdAndUpdate(
        {_id:categoryDetails._id},
        {
            $push:{
                courses:newCourse._id
            }
        },{new:true}
    )

    return res.status(200).json({
        success:true,
        message:'Course Created successfully',
        newCourse
    })
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "Error in Course Creation",
    });
  }
};

exports.getAllCourses = async(req, res)=>{
    try{
        const allCourses = await Course.find({},
            {
                courseName:true,
                // courseDescription:true,
                price:true,
                thumbnail:true,
                ratingAndReviews:true,
                instructor:true,
                studentsEnrolled:true
            }
        ).populate("instructor").exec();

        return res.status(200).json({
            success:true,
            allCourses,
            message:'Fetched all Courses successfully'
        })
    }catch(error){
        console.log("Error in get All Courses",error);
        return res.status(400).json({
            success:false,
            message:'Error in  get all Courses'
        })
    }
}


exports.getCourseDetails=async(req, res)=>{
    try{
        const {courseId} = req.body;
        const courseDetails = await Course.find( {_id:courseId})
        .populate
    }catch(error){
        console.log(error);
        return res.status(400).json({
            success:false,
            message: "Cannot get Course Details"
        })
    }
}