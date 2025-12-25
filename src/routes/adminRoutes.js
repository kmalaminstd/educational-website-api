const express = require("express")
const { addCategoryController, getCategoriesController, activateCategoryController, deactivateCategoryController, updateCategoryController, getActiveCategoriesController, deleteCategoryController, getCategoryInfoController } = require("../admin/controller/category.controller")

const { profileInfoController } = require("../admin/controller/profile.controller")
const checkUserAuth = require("../middlewares/checkuserAuth.middleware")
const { uploadInstructorMulter, uploadInstructorImage } = require("../uploadFile/uploadImageInstructorImage")

const { uploadCourseImageToMulter, getCourseImageUrl } = require("../uploadFile/uploadCourseImage")
const { getAllInstructorsController, createInstructorController, getSingleInstructorController, updateInstructorController, deleteInstructorController, activateInstructorController, deactivateInstructorController,allActiveInstructorController, instructorImageChangeController } = require("../admin/controller/Instructor.controller")

const { addCourseController, getAllCourseController, getCourseByIdController, changeCourseStatusController, getAllModulesOfCourseController, deleteCourseController, addModuleToCourseController, deleteModuleController, getModuleController, editModuleController, addVideoToModuleController, deleteVideoFromModuleController, updateCourseInfoController, changeCourseImageController } = require("../admin/controller/course.controller")
const { getAllPaymentForAdminConroller, getPaymentDetailsForAdminController, changePaymentStatusByAdminController, getAllPaymentInfoOfUserController, downloadPaymentForAdminController } = require("../client/controller/payment.controller")
const { getAllEnrollmentForAdminController, getEnrollmentDetailsController } = require("../client/controller/enrollment.controller")
const { getAllUsersController, changeUserStatusController, userDetailsAdminController } = require("../admin/controller/users.controller")
const { overviewStatsController, twoMonthComparisionStatConroller } = require("../admin/controller/stats.controller")

const router = express.Router()

router.post('/add-category', checkUserAuth, addCategoryController)
router.get('/all-categories', checkUserAuth, getCategoriesController)
router.get('/active-categories', getActiveCategoriesController)
router.get('/info', checkUserAuth, profileInfoController)
router.get('/get-category-info/:id', checkUserAuth, getCategoryInfoController)

// Update
router.put("/activate-category/:id", checkUserAuth, activateCategoryController)
router.put("/deactivate-category/:id", checkUserAuth, deactivateCategoryController)
router.put("/update-category/:id", checkUserAuth, updateCategoryController)


// Delete
router.delete("/delete-category/:id", checkUserAuth, deleteCategoryController)

// instructor
router.get('/all-instructors', getAllInstructorsController)
router.get('/all-active-instructors', allActiveInstructorController)
router.post('/add-instructor', checkUserAuth, createInstructorController)
router.get('/instructor/:id', getSingleInstructorController)
router.put('/update-instructor/:id', checkUserAuth, updateInstructorController)
router.delete('/delete-instructor/:id', checkUserAuth, deleteInstructorController)
router.put('/activate-instructor/:id', checkUserAuth, activateInstructorController)
router.put('/deactivate-instructor/:id', checkUserAuth, deactivateInstructorController)
router.put('/update-instructor-image/:id', checkUserAuth, instructorImageChangeController)

// upload instructor image
router.post('/upload-instructor-image', checkUserAuth, uploadInstructorMulter.single('image'), uploadInstructorImage)

// courses routes
// router.get('/all-courses', getAllCourseController)
router.post('/upload-course-image', checkUserAuth, uploadCourseImageToMulter.single('image'), getCourseImageUrl)
router.post('/add-course', checkUserAuth, addCourseController)
router.get('/courses', checkUserAuth, getAllCourseController)
router.get('/course/:id', checkUserAuth, getCourseByIdController)
router.put('/chnage-course-status/:id', checkUserAuth, changeCourseStatusController)
router.get('/course-modules/:id', checkUserAuth, getAllModulesOfCourseController)
router.delete('/delete-course/:id', checkUserAuth, deleteCourseController)
router.post('/add-module/:id', checkUserAuth, addModuleToCourseController)
router.post('/add-module-vidoe/:course_id/:module_id', checkUserAuth)
router.delete('/delete-module/:course_id/:module_id', checkUserAuth, deleteModuleController)
router.get('/module-info/:course_id/:module_id', checkUserAuth, getModuleController)
router.put('/edit-module/:course_id/:module_id', checkUserAuth, editModuleController)
router.post('/add-video-to-module/:course_id/:module_id', checkUserAuth, addVideoToModuleController)
router.delete('/delete-video-from-module/:course_id/:module_id/:video_id', checkUserAuth, deleteVideoFromModuleController)
router.put('/update-course-info/:course_id', checkUserAuth, updateCourseInfoController)
router.put('/update-course-image/:id', checkUserAuth, changeCourseImageController)

// payment routes
router.get('/all-payments', checkUserAuth, getAllPaymentForAdminConroller)
router.get('/payment-details/:payment_id/:user_id/:course_id', checkUserAuth, getPaymentDetailsForAdminController)
router.put('/change-payment-status/:payment_id/:user_id/:course_id', checkUserAuth, changePaymentStatusByAdminController)

// enrollment routes
router.get('/all-enrollment', checkUserAuth, getAllEnrollmentForAdminController)
router.get('/enrollment-details/:enroll_id', checkUserAuth, getEnrollmentDetailsController)


// users route
router.get('/all-users', checkUserAuth, getAllUsersController)
router.put('/update-user-status/:id', checkUserAuth, changeUserStatusController)
router.get('/user-full-details/:id', checkUserAuth, userDetailsAdminController)
router.get('/payment-list/:user_id', checkUserAuth, getAllPaymentInfoOfUserController)

// stats routes
router.get('/overview-stats', checkUserAuth, overviewStatsController)
router.get('/two-month-comparision-stat', checkUserAuth, twoMonthComparisionStatConroller)

// payment routes
router.get('/download-payment-list', checkUserAuth , downloadPaymentForAdminController)

module.exports = router