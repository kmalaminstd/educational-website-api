const { profileInfoService } = require("../service/profile.service");

const profileInfoController = async (req, res) => {
  try {
    const result = await profileInfoService();
    return res.status(200).json({
      result,
    });
  } catch (err) {
    console.log(err);

    return res.status(401).json({
      status: false,
      message: "Server error",
      err,
    });
  }
};

module.exports = {
  profileInfoController,
};
