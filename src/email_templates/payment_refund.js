module.exports = (user_name, course_name) => {
  
  return(
    `
    
      <!DOCTYPE html>
      
      <html>
        <body style="margin:0; padding:0; background-color:#f4f6f8; font-family:Arial, Helvetica, sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="padding:30px 0;">
            <tr>
              <td align="center">
                <table width="100%" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:8px;">
              <tr>
                <td style="background:#f0ad4e; padding:20px; text-align:center;">
                  <h2 style="margin:0; color:#ffffff; font-size:20px;">
                    Payment Refunded 🔄
                  </h2>
                </td>
              </tr>
      
              <tr>
                <td style="padding:30px; color:#333333; font-size:14px; line-height:1.6;">
                  <p style="margin:0 0 15px 0;">
                    Hi <strong>${user_name}</strong>,
                  </p>
      
                  <p style="margin:0 0 15px 0;">
                    This is to confirm that your payment for the following course has been successfully refunded:
                  </p>
      
                  <p style="background:#f8f9fa; padding:12px; border-radius:6px; margin:15px 0;">
                    <strong>📘 Course:</strong> ${course_name}<br>
                    <strong>💳 Refund Status:</strong> Completed
                  </p>
      
                  <p style="margin:0 0 15px 0;">
                    The course has been removed from your dashboard, and the refunded amount should reflect in your account within a few business days.
                  </p>
      
                  <p style="margin:0;">
                    If you believe this was a mistake or need further help, our support team is here for you.
                  </p>
      
                  <p style="margin-top:25px;">
                    Sincerely,<br>
                    <strong>Edulearn Billing Team</strong>
                  </p>
                </td>
              </tr>
      
              <tr>
                <td style="background:#f0f3f6; padding:15px; text-align:center; font-size:12px; color:#666;">
                  © 2025 Edulearn
                </td>
              </tr>
      
            </table>
          </td>
        </tr>
      </table>
    
        </body>
      </html>
      
    `
  )

}