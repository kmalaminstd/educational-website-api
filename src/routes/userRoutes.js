const express = require("express")
const { userInformationController } = require('../client/controller/profile.controller')
const userRegistration = require('../auth/userRegistration')
const checkUserAuth = require("../middlewares/checkuserAuth.middleware")
const userLogin = require("../auth/userLogin")
const {getAllActiveCourseController, getCourseByIdController, restrictedCourseDetailsController, enrolledCourseListController} = require('../admin/controller/course.controller')
const { createEnrollmentController } = require("../client/controller/enrollment.controller")
const userLogout = require("../auth/userLogout")
const checkAuth = require("../auth/userAuthCheck")
const { getAllPaymentInfoOfUserController, paymentOverviewController } = require("../client/controller/payment.controller")
// const { restrictedCoursDetailsService } = require("../admin/service/course.service")


const router = express.Router()

router.get('/user-logout', userLogout)

router.get('/check-user-auth', checkAuth)

router.get('/info/:id', checkUserAuth, userInformationController)
router.get('/courses', getAllActiveCourseController)
router.get('/course-details/:id', getCourseByIdController)
// router.post('/registration', userRegistration)
// router.post('/login', userLogin)
// 
router.post('/create-enrollment', checkUserAuth, createEnrollmentController)
router.get('/get-restrict-course/:course_id/:user_id', restrictedCourseDetailsController)
router.get('/payment-list/:user_id', checkUserAuth, getAllPaymentInfoOfUserController)
router.get('/enrolled-course-list/:user_id', checkUserAuth , enrolledCourseListController)
router.get('/enrolled-course/:user_id/:course_id', checkUserAuth, restrictedCourseDetailsController)

router.get('/payment-overview/:id', checkUserAuth, paymentOverviewController)

module.exports = router