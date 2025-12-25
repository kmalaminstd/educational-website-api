const express = require("express")
const path = require("path")
const multer = require("multer")
const {uid} = require("uid")
const { changeProfilePictureController } = require("../client/controller/profile.controller")
const checkUserAuth = require("../middlewares/checkuserAuth.middleware")

const router = express.Router()

// setup storate for upload profile picture
const profilePictureStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../public/profile_picture'))
    },
    filename: (req, file, cb) => {
        const uniqueProfilePictureName = `${uid()}_${Date.now()}_${file.originalname}`
        cb(null, uniqueProfilePictureName)
    }
})

const uploadProfilePicture = multer({storage: profilePictureStorage})

// 
router.post('/change-profile-picture/:id', checkUserAuth, uploadProfilePicture.single('profile_picture'), changeProfilePictureController)

module.exports = router