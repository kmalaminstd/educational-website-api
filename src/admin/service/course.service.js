const db = require('../../config/database.config');
const isUserEnrolled = require('../../lib/verifyEnrollUser')


// get all course serive
const getAllCourseService = async (page = 1) => {
  
  const limit = 20;
  const offset = (page - 1) * limit;

  
  return new Promise((resolve, reject) => {
    const courseCountQuery = 'SELECT COUNT(*) as total FROM courses';
    db.query(courseCountQuery, (err, result) => {
      if (err) {
        reject({ status: false,err});
      } 
      
      const total = result[0].total;
      const totalPage = Math.ceil(total / limit)      
      const allCourseQuery = `SELECT 
        c.id, c.title, c.category_id, c.description, c.price, c.active, c.image, 
        c.created_at, m.position AS module_position,
        i.id AS instructor_id, i.name AS instructor_name,
        ct.id AS category_id, ct.name AS category_name,
        m.id AS module_id, m.module_title, m.position AS module_position,
        v.id AS video_id, v.video_title, v.video_url, v.position AS video_position
      FROM ( SELECT * FROM courses ORDER BY created_at DESC LIMIT ? OFFSET ? ) AS c
      LEFT JOIN course_instructors ci ON c.id = ci.course_id
      LEFT JOIN instructors i ON ci.instructor_id = i.id
      LEFT JOIN categories ct ON c.category_id = ct.id
      LEFT JOIN modules m ON c.id = m.course_id
      LEFT JOIN videos v ON m.id = v.module_id
      ORDER BY c.created_at DESC`;
      
      db.query(allCourseQuery, [limit, offset], (err, result) => {
        if (err) {
          console.log(err)
          reject({ status: false, err });
        } else {
          
          // console.log(result)
          
          const coursemap = {}
          const courses = []
          
          result.forEach(course => {
            if(!coursemap[course.id]){
              coursemap[course.id] = {
                id: course.id,
                title: course.title,
                category_id: course.category_id,
                description: course.description,
                price: course.price,
                active: course.active,
                image: course.image,
                instructor_name: course.instructor_name,
                modules: []
              };
              courses.push(coursemap[course.id])
            }
            
            
            if(course.module_id){
              let module = coursemap[course.id].modules.find(elm => elm.id === course.module_id)
              if(!module){
                module = {
                  id: course.module_id,
                  title: course.module_title,
                  position: course.module_position,
                  videos: []
                }
              coursemap[course.id].modules.push(module)
              }
              
              if(course.video_id){
                module.videos.push({
                  id: course.video_id,
                  title: course.video_title,
                  position: course.video_position,
                  url: course.video_url
                })
              }
              
            }
            
            
            
          });
          
          
          // console.log(courses[0].modules[4])
          
          resolve({ 
            status: true, 
            courses,
            pagination: {
              currentPage: page,
              totalPage,
              itemPerPage: limit,
              total
            }
          });
        }
      });
    });
  })
  
}
// show all active course for user
const getAllActiveCourseService = async (page = 1) => {
  
  const limit = 20;
  const offset = (page - 1) * limit;

  
  return new Promise((resolve, reject) => {
    const courseCountQuery = 'SELECT COUNT(*) as total FROM courses';
    db.query(courseCountQuery, (err, result) => {
      if (err) {
        reject({ status: false,err});
      } 
      
      const total = result[0].total;
      const totalPage = Math.ceil(total / limit)      
      const allCourseQuery = `SELECT 
        c.id, c.title, c.category_id, c.description, c.price, c.active, c.image, 
        c.created_at, m.position AS module_position,
        i.id AS instructor_id, i.name AS instructor_name,
        ct.id AS category_id, ct.name AS category_name,
        m.id AS module_id, m.module_title, m.position AS module_position,
        v.id AS video_id, v.video_title, v.video_url, v.position AS video_position
      FROM ( SELECT * FROM courses ORDER BY created_at DESC LIMIT ? OFFSET ? ) AS c
      LEFT JOIN course_instructors ci ON c.id = ci.course_id
      LEFT JOIN instructors i ON ci.instructor_id = i.id
      LEFT JOIN categories ct ON c.category_id = ct.id
      LEFT JOIN modules m ON c.id = m.course_id
      LEFT JOIN videos v ON m.id = v.module_id
      WHERE c.active = 1 
      ORDER BY c.created_at DESC`;
      
      db.query(allCourseQuery, [limit, offset], (err, result) => {
        if (err) {
          console.log(err)
          reject({ status: false, err });
        } else {
          
          // console.log(result)
          
          const coursemap = {}
          const courses = []
          
          result.forEach(course => {
            if(!coursemap[course.id]){
              coursemap[course.id] = {
                id: course.id,
                title: course.title,
                category_id: course.category_id,
                description: course.description,
                price: course.price,
                active: course.active,
                image: course.image,
                instructor_name: course.instructor_name,
                modules: [],
                moduleNumber : 0,
                videoNumber: 0
              };
              courses.push(coursemap[course.id])
            }
            
            
            if(course.module_id){
              let module = coursemap[course.id].modules.find(elm => elm.id === course.module_id)
              if(!module){
                module = {
                  id: course.module_id,
                  title: course.module_title,
                  position: course.module_position,
                  videos: []
                }
                coursemap[course.id].modules.push(module)
              }
                coursemap[course.id].moduleNumber = coursemap[course.id].modules.length
              
              let videoNumberCount = 0
              if(course.video_id){
                module.videos.push({
                  id: course.video_id,
                  title: course.video_title,
                  position: course.video_position,
                  url: course.video_url
                }, coursemap[course.id].videoNumber++)
              }
              course.videoNumber = videoNumberCount
              // console.log(videoNumberCount)
            }
            
            
            
          });
          
          courses.forEach(c => delete c.modules)
          
          // console.log(courses[0].modules[4])
          
          resolve({ 
            status: true, 
            courses,
            pagination: {
              currentPage: page,
              totalPage,
              itemPerPage: limit,
              total
            }
          });
        }
      });
    });
  })
}

// show the course for user . Filter enrolled and unenrolled user
const restrictedCoursDetailsService = async (id, userId = null) => {
  
  
  const isEnroll = await isUserEnrolled(id, userId)
  // console.log(isEnroll)
  
  return new Promise((resolve, reject) => {

    const courseCountQuery = 'SELECT COUNT(*) as total FROM courses';
    db.query(courseCountQuery, (err, result) => {
      if (err) {
        console.log(err)
        reject({ status: false,err});
      } 
      
      // console.log('res', result)
            
      const allCourseQuery = `SELECT 
        c.id, c.title, c.category_id, c.description, c.price, c.active, c.image, 
        c.created_at, m.position AS module_position,
        i.id AS instructor_id, i.name AS instructor_name,
        ct.id AS category_id, ct.name AS category_name,
        m.id AS module_id, m.module_title, m.position AS module_position,
        v.id AS video_id, v.video_title, v.video_url, v.position AS video_position
      FROM courses c
      LEFT JOIN course_instructors ci ON c.id = ci.course_id
      LEFT JOIN instructors i ON ci.instructor_id = i.id
      LEFT JOIN categories ct ON c.category_id = ct.id
      LEFT JOIN modules m ON c.id = m.course_id
      LEFT JOIN videos v ON m.id = v.module_id
      WHERE c.id = ?`;
      
      db.query(allCourseQuery, [id], (err, result) => {
        if (err) {
          console.log(err)
          reject({ status: false, err });
        } else {
          
          // console.log(result)
          
          const coursemap = {}
          const courses = []
          
          result.forEach(course => {
            if(!coursemap[course.id]){
              coursemap[course.id] = {
                id: course.id,
                title: course.title,
                category_id: course.category_id,
                category_name: course.category_name,
                description: course.description,
                price: course.price,
                active: course.active,
                image: course.image,
                instructor_name: course.instructor_name,
                modules: []
              };
              courses.push(coursemap[course.id])
            }
            
            
            if(course.module_id){
              let module = coursemap[course.id].modules.find(elm => elm.id === course.module_id)
              if(!module){
                module = {
                  id: course.module_id,
                  title: course.module_title,
                  position: course.module_position,
                  videos: []
                }
              coursemap[course.id].modules.push(module)
              }
              
                if(course.video_id){
                  // module.videos.push({
                    
                  // })
                  
                  const videoData = {
                    id: course.video_id,
                    title: course.video_title,
                    position: course.video_position,
                    url: null
                  }
                  if(isEnroll){
                    videoData.url = course.video_url
                  }
                  module.videos.push(videoData)
                }
              
              
            }
                       
          });
          
          resolve({ 
            status: true, 
            course: courses[0],
          });
        }
      });
    });
  })
  
}

// get course by id 
const getCourseByIdService = async (id) => {

  
  return new Promise((resolve, reject) => {

    const courseCountQuery = 'SELECT COUNT(*) as total FROM courses';
    db.query(courseCountQuery, (err, result) => {
      if (err) {
        console.log(err)
        reject({ status: false,err});
      } 
            
      const allCourseQuery = `SELECT 
        c.id, c.title, c.category_id, c.description, c.price, c.active, c.image, 
        c.created_at, m.position AS module_position,
        i.id AS instructor_id, i.name AS instructor_name,
        ct.id AS category_id, ct.name AS category_name,
        m.id AS module_id, m.module_title, m.position AS module_position,
        v.id AS video_id, v.video_title, v.video_url, v.position AS video_position
      FROM courses c
      LEFT JOIN course_instructors ci ON c.id = ci.course_id
      LEFT JOIN instructors i ON ci.instructor_id = i.id
      LEFT JOIN categories ct ON c.category_id = ct.id
      LEFT JOIN modules m ON c.id = m.course_id
      LEFT JOIN videos v ON m.id = v.module_id
      WHERE c.id = ?`;
      
      db.query(allCourseQuery, [id], (err, result) => {
        if (err) {
          console.log(err)
          reject({ status: false, err });
        } else {
          
          // console.log(result)
          
          const coursemap = {}
          const courses = []
          
          result.forEach(course => {
            if(!coursemap[course.id]){
              coursemap[course.id] = {
                id: course.id,
                title: course.title,
                category_id: course.category_id,
                category_name: course.category_name,
                description: course.description,
                price: course.price,
                active: course.active,
                image: course.image,
                instructor_name: course.instructor_name,
                modules: []
              };
              courses.push(coursemap[course.id])
            }
            
            
            if(course.module_id){
              let module = coursemap[course.id].modules.find(elm => elm.id === course.module_id)
              if(!module){
                module = {
                  id: course.module_id,
                  title: course.module_title,
                  position: course.module_position,
                  videos: []
                }
              coursemap[course.id].modules.push(module)
              }
              
              if(course.video_id){
                module.videos.push({
                  id: course.video_id,
                  title: course.video_title,
                  position: course.video_position,
                  url: course.video_url
                })
              }
              
            }
                       
          });
          
          resolve({ 
            status: true, 
            course: courses[0],
          });
        }
      });
    });
  })
}

// add course service
const addCourseService = async (title, category_id, description, price, active, image, instructor_id, modules) => {
  return new Promise((resolve, reject) => {
    const addCourseQuery = 'INSERT INTO courses (title, category_id, description, image, price, active) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(addCourseQuery, [title, category_id, description, image, price, active], (err, result) => {
      if (err) {
        console.log(err)
        reject({status: false, err});
      } 
      addCourseToInstructorService(instructor_id, result.insertId)
        .then(() => addModulesToCourseService(result.insertId, modules))
        .then(() => resolve({ status: true, courseId: result.insertId, message: 'Course added successfully' }))
        .catch(err => {
          console.log(err)
          reject({ status: false, err });
        });
      
    });
  })
}

// add course to instructor service
const addCourseToInstructorService = async (instructor_id, course_id) => {
  return new Promise((resolve, reject) => {
    const addCourseToInstructorQuery = 'INSERT INTO course_instructors (course_id, instructor_id) VALUES (?, ?)';
    db.query(addCourseToInstructorQuery, [course_id, instructor_id], (err, result) => {
      if (err) {
        reject({status: false, err});
      } else {
        resolve({ status: true, message: 'Course added to instructor successfully'});
      }
    });
  })
}

// add modules to course
const addModulesToCourseService = (course_id, modules) => {
  if (!modules || modules.length === 0) return Promise.resolve();

  return new Promise((resolve, reject) => {
    let processed = 0;
    const total = modules.length;

    modules.forEach(module => {
      const addModulesQuery = 'INSERT INTO modules (course_id, module_title, position) VALUES (?, ?, ?)';
      db.query(addModulesQuery, [course_id, module.title, module.position || 0], (err, result) => {
        if (err) {
          console.error(err);
          return reject({ status: false, err });
        }

        const moduleId = result.insertId;
        
        if(module.videos.length === 0) return resolve({ status: true, message: 'Modules added successfully' });

        if (module.videos && module.videos.length > 0) {
          // console.log(module.videos)
          addModuleVideosService(moduleId, module.videos)
            .then(() => {
              processed++;
              if (processed === total) resolve({ status: true, message: 'Modules and videos added successfully' });
            })
            .catch(err => reject({ status: false, err }));
        } else {
          processed++;
          if (processed === total) resolve({ status: true, message: 'Modules added successfully' });
        }
      });
    });
  });
};

// add module videos
const addModuleVideosService = (module_id, videos) => {
  if (!videos || videos.length === 0) return Promise.resolve();

  return new Promise((resolve, reject) => {
    let processed = 0;
    const total = videos.length;
    const addModuleVideosQuery = 'INSERT INTO videos (module_id, video_title, video_url, position) VALUES (?, ?, ?, ?)';

    videos.forEach(video => {
      db.query(addModuleVideosQuery, [module_id, video.title, video.url, video.position || 0], (err, result) => {
        if (err){
          console.log(err)
          return reject({ status: false, err })
        }

        processed++;
        if (processed === total) resolve({ status: true, message: 'Module videos added successfully' });
      });
    });
  });
};

// change course status
const changeCourseStatusService = (course_id, status) => {
  return new Promise((resolve, reject) => {
    const updateCourseStatusQuery = 'UPDATE courses SET active = ? WHERE id = ?';
    db.query(updateCourseStatusQuery, [status, course_id], (err, result) => {
      if (err) return reject({ status: false, err });

      resolve({ status: true, message: 'Course status updated successfully' });
    });
  });
};


// get all modules of a course  
const getAllModulesOfCourseService = (course_id) => {
  return new Promise((resolve, reject) => {
    const getModulesQuery = `SELECT m.*, v.id AS video_id, v.video_title AS video_title, v.position AS video_position, v.video_url AS video_url, c.title AS course_name FROM modules m
      LEFT JOIN videos v ON m.id = v.module_id
      LEFT JOIN courses c ON m.course_id = c.id
      WHERE course_id = ?
      ORDER BY m.created_at DESC`;
    
    db.query(getModulesQuery, [course_id], (err, result) => {
      if (err){
        console.log(err);
        return reject({ status: false, err });
      }
      
      if(!result || result.length === 0){
        return reject({ status: false, message: 'No modules found for the course' });
      }
      
      const modules = []
      const moduleMap = {}
      
      
      result.forEach((module) =>{
        // console.log(module.id)
        if(!moduleMap[module.id]){
          moduleMap[module.id] = {
            id: module.id,
            title: module.module_title,
            videos: []
          }
          modules.push(moduleMap[module.id])
        }
        
        if(module.video_id){
          moduleMap[module.id].videos.push({ id: module.video_id, title: module.video_title, position: module.video_position, url: module.video_url })
        }       
 
      })
      
      // console.log(result)
      
      resolve({ status: true, modules, course_name: result[0].course_name});
    });
  });
};

// delete a course
const deleteCourseService = async id => {
  return new Promise((resolve, reject) => {
    const deleteQuery = 'DELETE FROM courses WHERE id = ?';
    db.query(deleteQuery, [id], (err, result) => {
      if (err){
        console.log(err);
        return reject({ status: false, err });
      }
      resolve({ status: true, message: 'Course deleted successfully' });
    });
  })
}

// delete course module 
const deleteModuleService = async (course_id, module_id) => {
  return new Promise((resolve, reject) => {
    const deleteQuery = 'DELETE FROM modules WHERE id = ? AND course_id = ?';
    db.query(deleteQuery, [module_id, course_id], (err, result) => {
      if (err){
        console.log(err);
        return reject({ status: false, err });
      }
      resolve({ status: true, message: 'Module deleted successfully' });
    });
  })
}

// edit course modules
const editModuleService = async (course_id, module_id, module_title, module_position) => {
  return new Promise((resolve, reject) => {
    const updateQuery = `UPDATE modules SET module_title = ? , position = ? WHERE id = ? AND course_id = ?`;
    db.query(updateQuery, [module_title, module_position, module_id, course_id], (err, result) => {
      if(err){
        console.log(err);
        return reject({ status: false, err });
      }
      resolve({ status: true, message: 'Module updated successfully' });
    })
  })
}

// get module info
const getModuleInfoService = async (course_id, module_id) => {
  // console.log(course_id, module_id)
  return new Promise((resolve, reject) => {
    const selectQuery = 'SELECT id, module_title, position FROM modules WHERE id = ? AND course_id = ?';
    db.query(selectQuery, [module_id, course_id], (err, result) => {
      if(err){
        console.log(err);
        return reject({ status: false, err });
      }
      // console.log(result);
      resolve({ status: true, data: result[0] });
    })
  })
}

// add video to module
const addVideoToModuleService = async (course_id, module_id, video_title, video_url, video_position) =>{
  return new Promise((resolve, reject) => {
    
    const getModuleQuery = `SELECT * FROM modules WHERE id = ? AND course_id = ?`;
    
    // console.log(course_id, module_id, video_position, video_title, video_url)
    
    // return
    
    db.query(getModuleQuery, [module_id, course_id], (err, result) => {
      if(err){
        console.log(err);
        return reject({ status: false, err });
      }
      if(result.length === 0){
        return reject({ status: false, err: 'Module not found' });
      }
      
      const insertQuery = `INSERT INTO videos (module_id, video_title, video_url, position) VALUES (?, ?, ?, ?)`
      db.query(insertQuery, [module_id, video_title, video_url, video_position], (err, result) => {
        if(err){
          console.log(err)
          return reject({ status: false, err });
        }
        resolve({ status: true, message: 'Video added successfully' });
      })
    })
    
  })
}

// delete video from module service
const deleteVideoFromModueService = async (course_id, module_id, video_id) => {
  return new Promise((resolve, reject) => {
    
    const getCourseQuery = 'SELECT * FROM courses WHERE id = ?'
    
    db.query(getCourseQuery, [course_id], (err, result) => {
      if(err){
        console.log(err)
        reject({status: false, err, message: "Server error"})
      }
      if(result.length === 0){
        reject({status: false, message: "Course not found"})
      }
      
      const getModuleQuery = `SELECT * FROM modules WHERE id = ?`
      db.query(getModuleQuery, [module_id], (err, result) => {
        if(err){
          reject({ status: false, err, message: "Server error"})
        }
        if(result.length === 0){
          reject({status: false, message: "No module found"})
        }
        
        const deleteVideoQuery = 'DELETE FROM videos WHERE id = ?'
        db.query(deleteVideoQuery, [video_id], (err, result) => {
          if(err){
            console.log(err)
            reject({status: false, message: "server error", err})
          }
          resolve({status: true, message: "Video deleted"})
        })
      })
      
    })
    
  })
}

// edit course information
const updateCourseInfoService = async (course_id, title, category_id, description, price, active) => {
  return new Promise((resolve, reject) => {
    const updateQuery = `UPDATE courses SET title = ?, category_id = ?, description = ?, price = ?, active = ? WHERE id = ?`
    db.query(updateQuery, [title, category_id, description, price, active, course_id], (err, result) => {
      if(err){
        reject({status: false, message: "Server error", err})
      }
      resolve({status: true, message: "Course updated successfully"})
    })
  })
}

// change course image
const changeCourseImageService = async (course_id, image_link) => {
  return new Promise((resolve, reject) => {
    const updateQuery = `UPDATE courses SET image = ? WHERE id = ?`
    db.query(updateQuery, [image_link, course_id], (err, result) => {
      if(err){
        reject({status: false, message: "Failed to update course image"})
      }
      resolve({status: true, result, message: "Course image updated"})
    })
  })
}

// user enrolled course list
const userEnrolledCourseListService = async (user_id) => {
  
  return new Promise((resolve, reject) => {
    
    const query = "SELECT c.id AS course_id, c.title AS course_name, ct.name AS category_name, c.image, c.price  FROM enrollments e JOIN courses c ON e.course_id = c.id JOIN categories ct ON c.category_id = ct.id WHERE e.user_id = ? AND e.status = 'active' AND e.isPaid = 'paid'"
    
    db.query(query, [user_id], (err, result) => {
      if(err){
        console.log(err)
        reject({
          status: false,
          err,
          message: 'Something went wrong'
        })
      }
      // console.log(result)
      resolve({
        status: true,
        result
      })
    })
    
  })
  
}

module.exports = {
  getAllCourseService,
  addCourseService,
  getCourseByIdService,
  changeCourseStatusService,
  getAllModulesOfCourseService,
  deleteCourseService,
  addModulesToCourseService,
  addModuleVideosService,
  deleteModuleService,
  getModuleInfoService,
  editModuleService,
  addVideoToModuleService, 
  deleteVideoFromModueService,
  updateCourseInfoService,
  changeCourseImageService,
  getAllActiveCourseService,
  restrictedCoursDetailsService,
  userEnrolledCourseListService
}