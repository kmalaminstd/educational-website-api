
const {getAllCourseService, addCourseService, getCourseByIdService, changeCourseStatusService, getAllModulesOfCourseService, deleteCourseService, addModulesToCourseService, addModuleVideosService, deleteModuleService, getModuleInfoService, editModuleService, addVideoToModuleService, deleteVideoFromModueService, updateCourseInfoService, changeCourseImageService, getAllActiveCourseService, restrictedCoursDetailsService, userEnrolledCourseListService} = require('../service/course.service');


// get all course controller
const getAllCourseController = async (req, res) => {
  
  const page = req.query.page || 1;
  
  try {
    const courses = await getAllCourseService(page);
    return res.status(200).json(courses);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getAllActiveCourseController = async (req, res) => {
  
  const page = req.query.page || 1;
  
  try {
    const courses = await getAllActiveCourseService(page);
    return res.status(200).json(courses);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// add course controller
const addCourseController = async (req, res) => {
  
  const { title, category_id, instructor_id, description, price, active, image, modules } = req.body;
  
  // console.log(title, category_id, instructor_id, description, price, active, image)
  
  if(!title || !category_id || !description || !price || !image || !instructor_id){
    return res.status(400).json({ status: false, error: 'Missing required fields' });
  }
  
  if (Number(active) < 0 || Number(active) > 1) {
    return res.status(400).json({ status: false, error: 'Invalid active value' });
  }
  
  
  try {
    const result = await addCourseService(title, category_id, description, price, Number(active), image, instructor_id, modules);
    return res.status(201).json(result);
  } catch (error) {
    return res.status(500).json({ 
      status: false,
      error: error.message
    });
  }
};

// restricted course details controller
const restrictedCourseDetailsController = async (req, res) => {
  const {course_id, user_id} = req.params
  
  // console.log(course_id, user_id)
  
  if(!course_id) {
    return res.status(400).json({status: false, message: "Invalide credentials"})
  } 
  try{
    const data = await restrictedCoursDetailsService(course_id , user_id)
    // console.log( data)
    res.status(200).json(data)
  }catch(err){
    console.log(err)
    res.status(500).json({status: false, err, message: "Server error"})
  }
}

// get course by id controller
const getCourseByIdController = async (req, res) => {
  
  const { id } = req.params;
  
  // console.log( 'id', id)
  
  if(!id){
    return res.status(400).json({ status: false, error: 'Missing required fields' });
  }
  
  try {
    const course = await getCourseByIdService(id);
    // const data = await course.html()
    // console.log( 'course', course)
    return res.status(200).json(course);
  } catch (error) {
    console.log(error)
    return res.status(500).json({ 
      status: false,
      error: error.message
    });
  }
};

// change course status controller
const changeCourseStatusController = async (req, res) => {
  
  const { id } = req.params;
  const { status } = req.body;
  
  if(!id){
    return res.status(400).json({ status: false, error: 'Missing required fields' });
  }
  
  if(status > 1 || status < 0){
    return res.status(400).json({ status: false, error: 'Invalid status value' });
  }
  
  if(status === undefined){
    return res.status(400).json({ status: false, error: 'Missing required fields' });
  }
  
  try {
    const result = await changeCourseStatusService(id, status);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ 
      status: false,
      error: error.message
    });
  }
};

// get all modules of a course
const getAllModulesOfCourseController = async (req, res) => {
  
  const { id } = req.params;
  
  if(!id){
    return res.status(400).json({ status: false, error: 'Missing required fields' });
  }
  
  try {
    const modules = await getAllModulesOfCourseService(id);
    return res.status(200).json(modules);
  } catch (error) {
    return res.status(500).json({ 
      status: false,
      error: error.message
    });
  }
};

// delete a course
const deleteCourseController = async (req, res) => {
  
  const { id } = req.params;
  
  if(!id){
    return res.status(400).json({ status: false, error: 'Missing required fields' });
  }
  
  try {
    const result = await deleteCourseService(id);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ 
      status: false,
      error: error.message
    });
  }
};

// add module to course controller
const addModuleToCourseController = async (req, res) => {
  
  const { id } = req.params;
  const {modules} = req.body;
  
  if(!id){
    return res.status(400).json({ status: false, error: 'Missing required fields' });
  }

  if(modules.length === 0){
    return res.status(400).json({ status: false, error: 'Missing required fields' });
  }
  
  // console.log(modules[0]?.videos, id)
  // return
  try {
    const result = await addModulesToCourseService(id, modules);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ 
      status: false,
      error: error.message
    });
  }
};

// add videos to module controller
const addModuleVideosController = async (req, res) => {
  
  const { course_id, module_id  } = req.params;
  const {videos} = req.body;
  
  if(!course_id || !module_id){
    return res.status(400).json({ status: false, error: 'Missing required fields' });
  }

  if(videos.length === 0){
    return res.status(400).json({ status: false, error: 'Missing required fields' });
  }
  
  // console.log(modules[0]?.videos, id)
  // return
  try {
    const result = await addModuleVideosService(id, videos);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ 
      status: false,
      error: error.message
    });
  }
};

// delete module controller
const deleteModuleController = async (req, res) => {
  
  const { course_id, module_id  } = req.params;
  
  if(!course_id || !module_id){
    return res.status(400).json({ status: false, error: 'Missing required fields' });
  }
  
  // console.log(modules[0]?.videos, id)
  // return
  try {
    const result = await deleteModuleService(course_id, module_id);
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ 
      status: false,
      error: error.message
    });
  }
};

// get module info controller 
const getModuleController = async (req, res) => {
  const { course_id, module_id } = req.params;
  
  if(!course_id || !module_id){
    return res.status(400).json({ status: false, error: 'Missing required fields' });
  }
  
  try{
    const module = await getModuleInfoService(course_id, module_id);
    return res.status(200).json(module);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ 
      status: false,
      error: error.message
    });
  }
}

// edit module controller
const editModuleController = async (req, res) => {
  const { course_id, module_id } = req.params;
  const { module_title, position } = req.body;
  
  if(!module_title || !position){
    return res.status(400).json({ status: false, error: 'Missing required fields' });
  }
  
  if(!course_id || !module_id){
    return res.status(400).json({ status: false, error: 'Missing required fields' });
  }
  
  try{
    const module = await editModuleService(course_id, module_id, module_title, position);
    return res.status(200).json(module);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ 
      status: false,
      error: error.message
    });
  }
}

// add video to module controller
const addVideoToModuleController = async (req, res) => {
  const { course_id, module_id } = req.params;
  const { video_title, video_url, position } = req.body;
  
  if(!video_title || !video_url){
    return res.status(400).json({ status: false, error: 'Missing required fields' });
  }
  
  if(!course_id || !module_id){
    return res.status(400).json({ status: false, error: 'Missing required fields' });
  }
  
  try{
    const video = await addVideoToModuleService(course_id, module_id, video_title, video_url, position);
    return res.status(200).json(video);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ 
      status: false,
      error: error.message
    });
  }
}

// delete video from module controller
const deleteVideoFromModuleController = async (req, res) => {
  const {course_id, module_id, video_id} = req.params
  if(!course_id || !module_id || !video_id){
    return res.status(400).json({status: false, message: "Missing credentials"})
  }
  
  try{
    
    const res = await deleteVideoFromModueService(course_id, module_id, video_id)
    // console.log(res)
    return res.status(200).json(response)
    
  }catch(err){
    console.log(err)
    return res.status(400).json({status: false, message: "Something went wrong"})
  }
}

// update course info controller
const updateCourseInfoController = async (req, res) => {
  const {course_id} = req.params
  const {title, category_id, description, price, active} = req.body
  
  if(!course_id || !title || !category_id || !description || !price){
    return res.status(400).json({
      status: false,
      message: "Missing credentials"
    })
  }
  
  try{
    
    const data = await updateCourseInfoService(course_id, title, category_id, description, price, active)
    // const data = await
    // conso
    return res.status(200).json(data)
    
  }catch(err){
    console.log(err)
    return res.status(500).json({status: false, message: "Something went wrong"})
  }
}

// change course image controller
const changeCourseImageController = async (req, res) => {
  const {id} = req.params
  const { image } = req.body
  if(!image){
    return res.status(401).json({
      status: false,
      message: "Invalid credentials"
    })
  }
  try{
    
    const data = await changeCourseImageService(id, image)
    return res.status(200).json(data)
    
  }catch(err){
    return res.status(500).json({
      status: false,
      message: "Server error"
    })
  }
}

// get enrolled course list controller
const enrolledCourseListController = async (req, res) => {
  const {user_id} = req.params
  // console.log(user_id)
  if(!user_id){
    return res.status(401).json({
      status: false,
      message: "Invalide credientials"
    })
  }
  
  try{
    
    const data = await userEnrolledCourseListService(user_id)
    return res.status(200).json(data)
    
  }catch(err){
    console.log(err)
    return res.status(500).json({
      status: false,
      err,
      message: "Server error"
    })
  }
}

module.exports = {
  getAllCourseController,
  addCourseController,
  getCourseByIdController,
  changeCourseStatusController,
  getAllModulesOfCourseController,
  deleteCourseController,
  addModuleToCourseController,
  deleteModuleController,
  getModuleController,
  editModuleController,
  addVideoToModuleController,
  deleteVideoFromModuleController,
  updateCourseInfoController,
  changeCourseImageController,
  getAllActiveCourseController,
  restrictedCourseDetailsController,
  enrolledCourseListController
};