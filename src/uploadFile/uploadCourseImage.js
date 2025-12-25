const multer = require('multer');
const path = require('path');
const {uid} = require("uid")

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../public/courseImage'))
  },
  filename: (req, file, cb) => {
    cb(null, `${uid()}-${file.originalname}`)
  }
})

const uploadCourseImageToMulter = multer({storage, 
 fileFilter: (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed'), false);
  }
}})

const getCourseImageUrl = (req, res) => {
  if(!req.file){
    return res.status(400).json({ status: false, message: 'No file uploaded'})
  }
  const imageUrl = `${req.protocol}://${req.get('host')}/public/courseImage/${req.file.filename}`;
  return res.status(200).json({ status: true, message: 'File uploaded successfully', imageUrl });
}

module.exports = {
  uploadCourseImageToMulter,
  getCourseImageUrl
}