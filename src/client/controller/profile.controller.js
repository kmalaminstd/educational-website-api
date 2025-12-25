const { changeProfilePictureService, allUserInformationSerivce } = require("../service/profile.service");

const changeProfilePictureController = async (req, res) => {
    try{

        const picture = req.file
        const {id} = req.params
        

        if(!id){
            return res.status(400).json({
                status: false,
                message: "Invalid user id",
            });
        }

        if (!picture) {
            return res.status(400).json({
                status: false,
                message: "No file uploaded or invalid field name.",
            });
        }

        // Generate the file URL — assuming your Express static path serves `/public`
        const imageUrl = `${req.protocol}://${req.get('host')}/profile_picture/${picture.filename}`

        const result = await changeProfilePictureService(imageUrl, id)

        return res.status(200).json({
            status: true,
            message: 'Image uploaded successfully',
            result
        })
        


    }catch(err){
        console.error('mserr', err);
        return res.status(500).json({
                status: false,
                message: "Failed to upload profile picture",
                error: err.message,
            });
        }
}

const userInformationController = async (req, res) => {
    const {id} = req.params

    if(!id){
        return res.status(401).json({
            status: false,
            message: "Invalid user"
        })
    }

    try{

        const result = await allUserInformationSerivce(id)
        // console.log(result)
        return res.status(200).json(result)

    }catch(err){
      console.log(err)
        return res.status(500).json({
            message: 'Server error',
            status: false,
            err
        })
    }
}

module.exports = {
    changeProfilePictureController,
    userInformationController
}