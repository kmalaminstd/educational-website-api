const db = require("../../config/database.config")

// Add a new category
const addCategoryService = async (category_name, active = 1) => {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO categories (name, active) VALUES (?, ?)'
        db.query(query, [category_name, active], (err, result) => {
            if (err) {
                console.log(err);
                
                return reject({
                    status: false,
                    err,
                    message: "Failed to add category"
                })
            }
            resolve({
                status: true,
                message: "Category added successfully",
                insertedId: result.insertId
            })
        })
    })
}

// Get paginated categories
const getCategoriesService = async (page = 1, limit = 10) => {
    const offset = (page - 1) * limit
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM categories ORDER BY created_at DESC LIMIT ? OFFSET ?'
        db.query(query, [limit, offset], (err, result) => {
            if (err) {
                return reject({
                    status: false,
                    err,
                    message: "Failed to fetch categories"
                })
            }

            const countQuery = 'SELECT COUNT(*) AS total FROM categories'
            db.query(countQuery, (countErr, countResult) => {
                if (countErr) {
                    return reject({
                        status: false,
                        err: countErr,
                        message: "Failed to count categories"
                    })
                }

                const totalItems = countResult[0].total
                const totalPages = Math.ceil(totalItems / limit)

                resolve({
                    status: true,
                    message: "Categories fetched successfully",
                    result,
                    pagination: {
                        totalItems,
                        totalPages,
                        currentPage: page,
                        itemsPerPage: limit,
                        hasNextPage: page < totalPages,
                        hasPrevPage: page > 1
                    }
                })
            })
        })
    })
}

// get category info
const getCategoryInfoService = async (id) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM categories WHERE id = ?'
        db.query(query, [id], (err, result) => {
            if (err) {
                return reject({
                    status: false,
                    err,
                    message: "Failed to fetch active categories"
                })
            }
            resolve({
                status: true,
                message: "Active categories fetched successfully",
                result
            })
        })
    })
}


// Get all active categories
const getActiveCategoriesService = async () => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM categories WHERE active = 1 ORDER BY created_at DESC'
        db.query(query, (err, result) => {
            if (err) {
                return reject({
                    status: false,
                    err,
                    message: "Failed to fetch active categories"
                })
            }
            resolve({
                status: true,
                message: "Active categories fetched successfully",
                result
            })
        })
    })
}

// Activate a category
const activateCategoryService = async (id) => {
    return new Promise((resolve, reject) => {
        const query = 'UPDATE categories SET active = 1 WHERE id = ?'
        db.query(query, [id], (err, result) => {
            if (err) {
                return reject({
                    message: "Category activation failed",
                    err,
                    status: false
                })
            }
            resolve({
                message: "Category activated successfully",
                status: true
            })
        })
    })
}

// Deactivate a category
const deactivateCategoryService = async (id) => {
    return new Promise((resolve, reject) => {
        const query = 'UPDATE categories SET active = 0 WHERE id = ?'
        db.query(query, [id], (err, result) => {
            if (err) {
                return reject({
                    message: "Category deactivation failed",
                    err,
                    status: false
                })
            }
            resolve({
                message: "Category deactivated successfully",
                status: true
            })
        })
    })
}

// Update a category
const updateCategoryService = async (id, newName, active) => {
    return new Promise((resolve, reject) => {
        const query = 'UPDATE categories SET name = ?, active = ? WHERE id = ?'
        db.query(query, [newName, active, id], (err, result) => {
            if (err) {
                return reject({
                    message: "Failed to update category",
                    err,
                    status: false
                })
            }
            resolve({
                message: "Category updated successfully",
                status: true
            })
        })
    })
}

// Delete a category
const deleteCategoryService = async (id) => {
    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM categories WHERE id = ?'
        db.query(query, [id], (err, result) => {
            if (err) {
                return reject({
                    message: "Failed to delete category",
                    err,
                    status: false
                })
            }
            resolve({
                message: "Category deleted successfully",
                status: true
            })
        })
    })
}

module.exports = {
    addCategoryService,
    getCategoriesService,
    getActiveCategoriesService,
    activateCategoryService,
    deactivateCategoryService,
    updateCategoryService,
    deleteCategoryService,
    getCategoryInfoService
}
