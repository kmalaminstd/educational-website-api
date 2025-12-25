const { overviewStatsService, twoMonthComparisionStatsService } = require("../service/stats.service")


const overviewStatsController = async (req, res) => {
  try{
    
    const data = await overviewStatsService()
    return res.status(200).json(data)
  }catch(err){
    console.log(err)
    return res.status(500).json({
      status: false,
      err,
      message: 'Server error'
    })
  }
}

const twoMonthComparisionStatConroller = async (req, res) => {
  try{
    
    const data = await twoMonthComparisionStatsService()
    
    return res.status(200).json(data)
    
  }catch(err){
    console.log(err)
    return res.status(500).json({
      status: false,
      err,
      message: 'Server error'
    })
  }
}

module.exports = {
  overviewStatsController,
  twoMonthComparisionStatConroller
}