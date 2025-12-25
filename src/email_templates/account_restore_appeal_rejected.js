module.exports = (user_name, account_status) => {
  return(
    `
      <!DOCTYPE html>
      
      <html>
        <body style="margin:0; padding:0; background:#f4f6f8; font-family:Arial, Helvetica, sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="padding:30px 0;">
            <tr>
              <td align="center">

            <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:8px;">
              
              <tr>
                <td style="background:#d9534f; padding:20px; text-align:center;">
                  <h2 style="margin:0; color:#ffffff; font-size:20px;">
                    Appeal Rejected ❌
                  </h2>
                </td>
              </tr>
      
              <tr>
                <td style="padding:30px; font-size:14px; color:#333; line-height:1.6;">
                  <p style="margin:0 0 15px 0;">
                    Hi <strong>${user_name}</strong>,
                  </p>
      
                  <p style="margin:0 0 15px 0;">
                    We’ve reviewed your appeal carefully. Unfortunately, the decision regarding your account remains unchanged.
                  </p>
      
                  <p style="background:#f8f9fa; padding:12px; border-radius:6px; margin:15px 0;">
                    <strong>🚫 Account Status:</strong> ${account_status}<br>
                    <strong>📌 Reason:</strong> 
                  </p>
      
                  <p style="margin:0 0 15px 0;">
                    At this time, no further action will be taken. Please make sure to review our platform policies to avoid future issues.
                  </p>
      
                  <p style="margin-top:25px;">
                    Thanks for understanding,<br>
                    <strong>Edulearn Compliance Team</strong>
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