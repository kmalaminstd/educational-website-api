const db = require('../../config/database.config');

//  Create Instructor
const createInstructorService = async (
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
  active = 1
) => {
  return new Promise((resolve, reject) => {
    const query = `
      INSERT INTO instructors 
      (name, email, phone, designation, bio, expertise, image, linkedin, facebook, twitter, website, experience_years, qualification, active) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
      query,
      [
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
      ],
      (err, result) => {
        if (err) {
          console.log(err)
          return reject({
            status: false,
            message: "Instructor not created",
            err
          });
        }
        resolve({
          status: true,
          message: "Instructor created successfully",
          result
        });
      }
    );
  });
};

//  Get all instructors
const getAllInstructorsService = async (page = 1, limit = 10) => {

  
  return new Promise((resolve, reject) => {

    const safeOffset = parseInt((page - 1) * limit)
    const safeLimit = parseInt(limit)

    // console.log(safeOffset, safeLimit);
    

    const query = `SELECT * FROM instructors ORDER BY created_at DESC LIMIT ${safeLimit} OFFSET ${safeOffset}`;
    const countQuery = 'SELECT COUNT(*) AS total FROM instructors'

    db.query(countQuery, (countErr, countResult) => {

      if(countErr){
        reject({
          status: false,
          message: "Failed to count instructors",
          err: countErr
        })
      }

      const total = countResult[0].total
      const totalPage = Math.ceil(total / limit)

      db.query(query, (err, result) => {
        if (err) {
          console.log(err);
          
          return reject({
            status: false,
            message: "Failed to fetch instructors",
            err
          });
        }
        resolve({
          status: true,
          message: "Instructors fetched successfully",
          result,
          pagination: {
            totalItems: total,
            totalPage,
            currentPage: page,
            limit
          }
        });
      });

    })

  });
};

// get all active instructors
const allActiveInstructorService = async (page = 1, limit = 10) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM instructors WHERE active = 1 ORDER BY created_at DESC';
    db.query(query, (err, result) => {
      if (err) {
        console.log(err)
        return reject({
          status: false,
          message: "Failed to fetch instructors",
          err
        });
      }
      resolve({
        status: true,
        message: "Instructors fetched successfully",
        result
      });
    });
  });
}

//  Get single instructor by ID
const getSingleInstructorService = async (id) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM instructors WHERE id = ?';
    db.query(query, [id], (err, result) => {
      if (err) {
        console.log(err)
        return reject({
          status: false,
          message: "Failed to fetch instructor",
          err
        });
      }
      resolve({
        status: true,
        message: "Instructor fetched successfully",
        result: result[0]
      });
    });
  });
};

// Update instructor
const updateInstructorService = async (
  id,
  name,
  email,
  phone,
  designation,
  bio,
  expertise,
  linkedin,
  facebook,
  twitter,
  website,
  experience_years,
  qualification,
  active
) => {
  return new Promise((resolve, reject) => {
    const query = `
      UPDATE instructors 
      SET name = ?, email = ?, phone = ?, designation = ?, bio = ?, expertise = ?, 
          linkedin = ?, facebook = ?, twitter = ?, website = ?, experience_years = ?, 
          qualification = ?, active = ? 
      WHERE id = ?
    `;
    db.query(
      query,
      [
        name,
        email,
        phone,
        designation,
        bio,
        expertise,
        linkedin,
        facebook,
        twitter,
        website,
        experience_years,
        qualification,
        active,
        id
      ],
      (err, result) => {
        if (err) {
          return reject({
            status: false,
            message: "Failed to update instructor",
            err
          });
        }
        resolve({
          status: true,
          message: "Instructor updated successfully",
          result
        });
      }
    );
  });
};

//  Delete instructor
const deleteInstructorService = async (id) => {
  return new Promise((resolve, reject) => {
    const query = 'DELETE FROM instructors WHERE id = ?';
    db.query(query, [id], (err, result) => {
      if (err) {
        return reject({
          status: false,
          message: "Failed to delete instructor",
          err
        });
      }
      resolve({
        status: true,
        message: "Instructor deleted successfully",
        result
      });
    });
  });
};

//  Activate instructor
const activateInstructorService = async (id) => {
  return new Promise((resolve, reject) => {
    const query = 'UPDATE instructors SET active = 1 WHERE id = ?';
    db.query(query, [id], (err, result) => {
      if (err) {
        return reject({
          status: false,
          message: "Failed to activate instructor",
          err
        });
      }
      resolve({
        status: true,
        message: "Instructor activated successfully",
        result
      });
    });
  });
};

//  Deactivate instructor
const deactivateInstructorService = async (id) => {
  return new Promise((resolve, reject) => {
    const query = 'UPDATE instructors SET active = 0 WHERE id = ?';
    db.query(query, [id], (err, result) => {
      if (err) {
        return reject({
          status: false,
          message: "Failed to deactivate instructor",
          err
        });
      }
      resolve({
        status: true,
        message: "Instructor deactivated successfully",
        result
      });
    });
  });
};

// chane instructor image
const changeInstructorImageService = async (id, imageLink) => {
  return new Promise((resolve, reject) => {
    const query = 'UPDATE instructors SET image = ? WHERE id = ?'
    db.query(query, [imageLink, id], (err, result) => {
      if(err){
        return reject({
          err,
          status: false,
          message: "Link not added on database"
        })
      }
      return resolve({
        status: true,
        message: "Image updated successfully",
        result
      })
    })
  })
}

module.exports = {
  createInstructorService,
  getAllInstructorsService,
  getSingleInstructorService,
  updateInstructorService,
  deleteInstructorService,
  activateInstructorService,
  deactivateInstructorService,
  allActiveInstructorService,
  changeInstructorImageService
};
