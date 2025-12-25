const {
    addCategoryService,
    getCategoriesService,
    getActiveCategoriesService,
    activateCategoryService,
    deactivateCategoryService,
    updateCategoryService,
    deleteCategoryService,
    getCategoryInfoService
} = require("../service/category.service")

//  Add Category
const addCategoryController = async (req, res) => {
    const { name, active } = req.body

    if (!name || active > 1 || active < 0) {
        return res.status(400).json({
            status: false,
            message: "Invalid field"
        })
    }

    try {
        const result = await addCategoryService(name, active)
        return res.status(200).json(result)
    } catch (err) {
        return res.status(500).json({
            status: false,
            message: "Server error",
            err
        })
    }
}

//  Get Paginated Categories
const getCategoriesController = async (req, res) => {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10

    try {
        const result = await getCategoriesService(page, limit)
        return res.status(200).json(result)
    } catch (err) {
        return res.status(500).json(err)
    }
}

//  Get category information
const getCategoryInfoController = async (req, res) => {

    const {id} = req.params

    if(!id){
        return res.status(401).json({status: false, messag: "Invalid id"})
    }

    try {
        const result = await getCategoryInfoService(id)
        return res.status(200).json(result)
    } catch (err) {
        return res.status(500).json(err)
    }
}


//  Get All Active Categories
const getActiveCategoriesController = async (req, res) => {
    try {
        const result = await getActiveCategoriesService()
        return res.status(200).json(result)
    } catch (err) {
        return res.status(500).json(err)
    }
}

//  Activate Category
const activateCategoryController = async (req, res) => {
    const { id } = req.params

    if (!id) {
        return res.status(400).json({
            status: false,
            message: "Category ID required"
        })
    }

    try {
        const result = await activateCategoryService(id)
        return res.status(200).json(result)
    } catch (err) {
        return res.status(500).json(err)
    }
}

//  Deactivate Category
const deactivateCategoryController = async (req, res) => {
    const { id } = req.params

    if (!id) {
        return res.status(400).json({
            status: false,
            message: "Category ID required"
        })
    }

    try {
        const result = await deactivateCategoryService(id)
        return res.status(200).json(result)
    } catch (err) {
        return res.status(500).json(err)
    }
}

//  Update Category
const updateCategoryController = async (req, res) => {
    const { id } = req.params
    const { name, active } = req.body

    if (!id || !name || active > 1 || active < 0) {
        return res.status(400).json({
            status: false,
            message: "Invalid input fields"
        })
    }

    try {
        const result = await updateCategoryService(id, name, active)
        return res.status(200).json(result)
    } catch (err) {
        return res.status(500).json(err)
    }
}

//  Delete Category
const deleteCategoryController = async (req, res) => {
    const { id } = req.params

    if (!id) {
        return res.status(400).json({
            status: false,
            message: "Category ID required"
        })
    }

    try {
        const result = await deleteCategoryService(id)
        return res.status(200).json(result)
    } catch (err) {
        return res.status(500).json(err)
    }
}

module.exports = {
    addCategoryController,
    getCategoriesController,
    getActiveCategoriesController,
    activateCategoryController,
    deactivateCategoryController,
    updateCategoryController,
    deleteCategoryController,
    getCategoryInfoController
}
