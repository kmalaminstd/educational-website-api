

module.exports = (user_name, ban_reason) => {
  return (
    `
      <!DOCTYPE html>
      
      <html>
        <body style="margin:0; padding:0; background-color:#f4f6f8; font-family:Arial, Helvetica, sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="padding:30px 0;">
            <tr>
              <td align="center">

                <table width="100%" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:8px;">
                  
                  <!-- Header -->
                  <tr>
                    <td style="background:#d9534f; padding:20px; text-align:center;">
                      <h2 style="margin:0; color:#ffffff; font-size:20px;">
                        Account Permanently Banned ⛔
                      </h2>
                    </td>
                  </tr>
          
                  <!-- Body -->
                  <tr>
                    <td style="padding:30px; color:#333333; font-size:14px; line-height:1.6;">
                      
                      <p style="margin:0 0 15px 0;">
                        Hi <strong>${user_name}</strong>,
                      </p>
          
                      <p style="margin:0 0 15px 0;">
                        After careful review, your account has been permanently banned due to repeated or severe violations of our platform policies.
                      </p>
          
                      <p style="background:#f8f9fa; padding:12px; border-radius:6px; margin:15px 0;">
                        <strong>🚫 Account Status:</strong> Banned<br>
                        <strong>📌 Reason:</strong> ${ban_reason}
                      </p>
          
                      <p style="margin:0 0 15px 0;">
                        As a result, you will no longer have access to your account, enrolled courses, or platform services.
                      </p>
          
                      <p style="margin:0;">
                        If you believe this action was taken in error, you may submit an appeal by contacting our support team.
                      </p>
          
                      <p style="margin-top:25px;">
                        Sincerely,<br>
                        <strong>Edulearn Compliance Team</strong>
                      </p>
                    </td>
                  </tr>
          
                  <!-- Footer -->
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