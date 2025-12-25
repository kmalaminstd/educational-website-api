

module.exports = (user_name, block_reason) => {
  return (
    `
      <!DOCTYPE html>
      
      <html>
        <body style="margin:0; padding:0; background-color:#f4f6f8; font-family:Arial, Helvetica, sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="padding:30px 0;">
            <tr>
              <td align="center">

                <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:8px;">
                  
                  <!-- Header -->
                  <tr>
                    <td style="background:#f0ad4e; padding:20px; text-align:center;">
                      <h2 style="margin:0; color:#ffffff; font-size:20px;">
                        Account Temporarily Blocked 🚫
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
                        Your account has been temporarily blocked by our administration team due to a policy-related issue.
                      </p>
          
                      <p style="background:#f8f9fa; padding:12px; border-radius:6px; margin:15px 0;">
                        <strong>🔒 Account Status:</strong> Blocked<br>
                        <strong>📌 Reason:</strong> ${block_reason}
                      </p>
          
                      <p style="margin:0 0 15px 0;">
                        During this period, you will not be able to access your dashboard or enrolled courses.
                      </p>
          
                      <p style="margin:0;">
                        If you believe this is a mistake, you may contact our support team for clarification or resolution.
                      </p>
          
                      <p style="margin-top:25px;">
                        Regards,<br>
                        <strong>Edulearn Admin Team</strong>
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