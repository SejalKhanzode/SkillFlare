const router = require("express").Router();
const {createCategory, showAllCategories, categoryPageDetails} = require('../controllers/Category');
const { createCourse, getAllCourses , getCourseDetails} = require("../controllers/Course");
const {createSection, updateSection, deleteSection} = require("../controllers/Section")
const {createSubSection, updateSubSection, deleteSubSection} = require("../controllers/Subsection")
const { auth, isAdmin, isInstructor } = require("../middlewares/auth");

router.post("/createCategory",auth, isAdmin, createCategory);
router.get("/showAllCategories", showAllCategories)
router.get("/getCategoryPageDetails", categoryPageDetails)

router.post("/createCourse", auth, isInstructor, createCourse)

router.post("/addSection", auth, isInstructor, createSection)
router.post("/updateSection", auth, isInstructor, updateSection)
router.post("/deleteSection", auth, isInstructor, deleteSection)

router.post("/updateSubSection", auth, isInstructor, updateSubSection)
router.post("/deleteSubSection", auth, isInstructor, deleteSubSection)
router.post("/addSubSection", auth, isInstructor, createSubSection)

router.get("/getAllCourses", getAllCourses)
router.post("/getCourseDetails", getCourseDetails)

module.exports= router;