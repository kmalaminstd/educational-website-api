const ExcelJs = require("exceljs")

const paymentworkbook = new ExcelJs.Workbook()
paymentworkbook.creator = 'Edulearn'
const worksheet = paymentworkbook.addWorksheet('Payments')

worksheet.columns = [
  { header: "#", key: "index", width: 5 },
  { header: "User", key: "user", width: 25 },
  { header: "Email", key: "email", width: 30 },
  { header: "Date", key: "date", width: 35 },
  { header: "Amount ($)", key: "amount", width: 15 },
  { header: "Method", key: "method", width: 15 },
  { header: "Status", key: "status", width: 15 },
];

const downloadPaymentInfo = async (dataArr) => {
  
  // console.log(dataArr)
  
  data.result.forEach((item, index) => {
    worksheet.addRow({
         index: index + 1,
         user: item.name,
         email: item.email,
         date: item.created_at,
         amount: item.amount,
         method: item.method,
         status: item.status,
    });
  });
}

module.exports = {downloadPaymentInfo, paymentworkbook}