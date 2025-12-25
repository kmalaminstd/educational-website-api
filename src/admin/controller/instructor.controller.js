const {
  createInstructorService,
  getAllInstructorsService,
  getSingleInstructorService,
  updateInstructorService,
  deleteInstructorService,
  activateInstructorService,
  deactivateInstructorService,
  allActiveInstructorService,
  changeInstructorImageService
} = require("../service/instructor.service");

// Create a new instructor
const createInstructorController = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      designation,
      bio,
      expertise,
      image,
      linkedin,
      facebook,
      twitter,
      website,
      experience_years,
      qualification,
      active
    } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({
        status: false,
        message: "Name , email and phone are required"
      });
    }

    const result = await createInstructorService(
      name,
      email,
      phone,
      designation,
      bio,
      expertise,
      image,
      linkedin,
      facebook,
      twitter,
      website,
      experience_years,
      qualification,
      active
    );

    return res.status(201).json(result);
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      status: false,
      message: "Server error",
      err
    });
  }
};

// Get all instructors (paginated optional)
const getAllInstructorsController = async (req, res) => {

  try {
    const { page = 1, limit = 10 } = req.query;
    const result = await getAllInstructorsService(Number(page), Number(limit));
    // console.log(result);

    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: "Failed to fetch instructors",
      err
    });
  }
};

// Get a single instructor by ID
const getSingleInstructorController = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await getSingleInstructorService(id);
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: "Failed to fetch instructor",
      err
    });
  }
};

// Update instructor
const updateInstructorController = async (req, res) => {
  
  
  
  try {
    const { id } = req.params;
    const { name, email, phone, designation, bio, expertise, linkedin, facebook, twitter, website, experience_years, qualification, active } = req.body

    const result = await updateInstructorService(id, name, email, phone, designation, bio, expertise, linkedin, facebook, twitter, website, experience_years, qualification, active);
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: "Failed to update instructor",
      err
    });
  }
};

// Delete instructor
const deleteInstructorController = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteInstructorService(id);
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: "Failed to delete instructor",
      err
    });
  }
};

// Activate instructor
const activateInstructorController = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await activateInstructorService(id);
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: "Failed to activate instructor",
      err
    });
  }
};

// Deactivate instructor
const deactivateInstructorController = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deactivateInstructorService(id);
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: "Failed to deactivate instructor",
      err
    });
  }
};

// all active instructor controller
const allActiveInstructorController = async (req, res) => {
  try{
    const result = await allActiveInstructorService()
    return res.status(200).json(result)
  }catch(err){
    return res.status(500).json({
      status: false,
      message: "Server error",
      err
    })
  }
}

// image chnage controller
const instructorImageChangeController = async (req, res) => {
  
  const {id} = req.params
  const {image} = req.body
  
  try{
    
    const result = await changeInstructorImageService(id, image)
    
    return res.status(200).json(result)
    
  }catch(err){
    return res.status(500).json({
      err,
      status: false,
      message: "Server error"
    })
  }
}

module.exports = {
  createInstructorController,
  getAllInstructorsController,
  getSingleInstructorController,
  updateInstructorController,
  deleteInstructorController,
  activateInstructorController,
  deactivateInstructorController,
  allActiveInstructorController,
  instructorImageChangeController
};
