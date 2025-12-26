require('dotenv').config()

const express = require("express")
const cors = require("cors")
const { PORT } = require("./config/app.config")
const db = require("./config/database.config")
const userRegistrtion = require("./auth/userRegistration")
const userLogin = require("./auth/userLogin")
const path = require("path")
const cookieParser = require("cookie-parser")
const adminRouter = require('./routes/adminRoutes')



const userRoutes = require('./routes/userRoutes')
const userUploadRoutes = require("./routes/userUploadRoutes")
const adminLogin = require("./auth/adminLogin")
const generateHashPassword = require("./auth/adminPasswordHash")

const app = express()

app.set("trust proxy", 1);

// middlewares
app.use(cors({ 
  origin: [
    "http://localhost:5173",
    "http://localhost:5174"
  ],
  credentials: true,
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization"
}))



app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/upload', userUploadRoutes)
app.use('/profile_picture', express.static(path.join(__dirname, '../public/profile_picture')))
app.use('/public/instructor', express.static(path.join(__dirname, '../public/instructor')))
app.use('/public/courseImage', express.static(path.join(__dirname, '../public/courseImage')))

// connect database
db.connect((err) => {
    if(err){
      console.log(err)
      return "database crashed"
    }
    console.log("Database connected")
})



// api endpoints
app.use('/user/login', userLogin)
app.use('/user/register', userRegistrtion)
app.use('/user', userRoutes)


// admin routes
// app.use('/admin',)
app.post('/admin/login', adminLogin)
app.post('/hashpassword', generateHashPassword)
app.use('/admin', adminRouter)



// start server
app.listen(PORT, ()=>{
  console.log(`server running on the port: ${PORT}`);
})