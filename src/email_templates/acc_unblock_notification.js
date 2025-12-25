module.exports = (user_name) => {
  return (
    `
      <!DOCTYPE html>
      
      <html>
        <body style="margin:0; padding:0; background:#f4f6f8; font-family:Arial, Helvetica, sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="padding:30px 0;">
            <tr>
              <td align="center">

            <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:8px;">
              
              <tr>
                <td style="background:#17a2b8; padding:20px; text-align:center;">
                  <h2 style="margin:0; color:#ffffff; font-size:20px;">
                    Account Unblocked 🎉
                  </h2>
                </td>
              </tr>
      
              <tr>
                <td style="padding:30px; font-size:14px; color:#333; line-height:1.6;">
                  <p style="margin:0 0 15px 0;">
                    Hi <strong>${user_name}</strong>,
                  </p>
      
                  <p style="margin:0 0 15px 0;">
                    Your temporary account restriction has ended, and your account is now fully active again.
                  </p>
      
                  <p style="background:#f8f9fa; padding:12px; border-radius:6px; margin:15px 0;">
                    <strong>🔓 Account Status:</strong> Active<br>
                    <strong>⏱️ Block Duration:</strong> Completed
                  </p>
      
                  <p style="margin:0 0 15px 0;">
                    You can now access your dashboard and continue your learning journey.
                  </p>
      
                  <p style="text-align:center; margin:25px 0;">
                    <a href="{{DASHBOARD_URL}}" style="background:#265367; color:#fff; text-decoration:none; padding:12px 22px; border-radius:6px; font-weight:bold;">
                      Go to Dashboard →
                    </a>
                  </p>
      
                  <p style="margin-top:25px;">
                    Let’s keep it moving 🚀<br>
                    <strong>Edulearn Team</strong>
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