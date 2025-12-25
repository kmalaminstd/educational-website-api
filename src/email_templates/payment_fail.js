module.exports = (user_name, course_name, ) => {
  return (
    `
      <!DOCTYPE html>
      
      <html>
        <body style="margin:0; padding:0; background-color:#f4f6f8; font-family:Arial, Helvetica, sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="padding:30px 0;">
            <tr>
              <td align="center">
                <table width="100%" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:8px;">
      
              <tr>
                <td style="background:#d9534f; padding:20px; text-align:center;">
                  <h2 style="margin:0; color:#ffffff; font-size:20px;">
                    Payment Failed ❌
                  </h2>
                </td>
              </tr>
      
              <tr>
                <td style="padding:30px; color:#333333; font-size:14px; line-height:1.6;">
                  <p style="margin:0 0 15px 0;">
                    Hi <strong> ${user_name} </strong>,
                  </p>
      
                  <p style="margin:0 0 15px 0;">
                    Unfortunately, your payment attempt for the course below was unsuccessful:
                  </p>
      
                  <p style="background:#f8f9fa; padding:12px; border-radius:6px; margin:15px 0;">
                    <strong>📘 Course:</strong> ${course_name}<br>
                    <strong>💳 Status:</strong> Payment Failed
                  </p>
      
                  <p style="margin:0 0 15px 0;">
                    No charges were made, and the course has not been added to your dashboard.
                  </p>
      
                  <p style="margin:0;">
                    You can retry the payment anytime from your dashboard or contact support if the issue persists.
                  </p>
      
                  <p style="margin-top:25px;">
                    Best regards,<br>
                    <strong>Edulearn Support Team</strong>
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