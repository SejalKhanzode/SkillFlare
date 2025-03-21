const {instance} = require("../config/razorpay");
const Course = require("../models/Courses")
const User = require("../models/User")
const mailSender = require("../utils/mailSender")
const {courseEnrollmentEmail} = require("../mail/templates/courseEnrollmentEmail")

const capturePayment = async(req, res)=>{
    try{
const {courseId} = req.body;
const {userId} = req.user.id;
if(!courseId){
    res.status(401).json({
        success:false,
        message:"PLease enter valid courseId"
    })
}

let course;
try{
 course = await Course.findById(courseId);
 if(!course){
    res.json({
        success:false,
        message:"Could not find the course"
    })
 }

 const uid = new mongoose.Types.ObjectId(userId);
 if(course.studentsEnrolled.includes(uid)){
    res.json({
        success:false,
        message:'User is already enrolled in this course'
    })
 }
}
catch(error){
console.log(error);
res.status(500).json({
    success:false,
    message:error.message
})
}

 const amount = course.price;
const currency = "INR"

const options={
    amount:amount*100,
    currency,
    receipt:Math.random(Date.now().toString()),
    notes:{
        courseId:courseId, userId
    }
}

const paymentResponse = await instance.orders.create(options)
res.status(200).json({
    success:true,
    courseName:course.courseName,
    courseDescription:course.courseDescription,
    thumbnail: course.thumbnail,
    orderId: paymentResponse.id,
    currency:paymentResponse.currency,
    amount:paymentResponse.amount,
})
    }catch(error){
        console.log(error);
        res.status(400).json({
            success:false,
            message:"Error in capturing Payment"
        })
    }
}

exports.verifySignature= async(req, res)=>{
    
const webhookSecret  = "12345678";
const signature = req.headers["x-razorpay-signature"]
const shasum =  crypto.createHmac("sha256", webhookSecret);
shasum.update(JSON.stringify(req.body));
const digest = shasum.digest("hex");


if(signature === digest) {
    console.log("Payment is Authorised")

    const {courseId, userId} = req.body.payload.payment.entity.notes;

    try{
            //fulfil the action

            //find the course and enroll the student in it
            const enrolledCourse = await Course.findOneAndUpdate(
                                            {_id: courseId},
                                            {$push:{studentsEnrolled: userId}},
                                            {new:true},
            );

            if(!enrolledCourse) {
                return res.status(500).json({
                    success:false,
                    message:'Course not Found',
                });
            }

            console.log(enrolledCourse);

            //find the student andadd the course to their list enrolled courses me 
            const enrolledStudent = await User.findOneAndUpdate(
                                            {_id:userId},
                                            {$push:{courses:courseId}},
                                            {new:true},
            );

            console.log(enrolledStudent);

            //mail send krdo confirmation wala 
            const emailResponse = await mailSender(
                                    enrolledStudent.email,
                                    "Congratulations from CodeHelp",
                                    "Congratulations, you are onboarded into new CodeHelp Course",
            );

            console.log(emailResponse);
            return res.status(200).json({
                success:true,
                message:"Signature Verified and COurse Added",
            });


    }       
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
}
else {
    return res.status(400).json({
        success:false,
        message:'Invalid request',
    });
}
}