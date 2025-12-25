
module.exports = (course_name, course_category, payment_status, user_name) => {
  
  return ( `
    <!DOCTYPE html>
    
    <html>
      <body style="margin:0; padding:0; background-color:#f4f6f8; font-family:Arial, Helvetica, sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f6f8; padding:30px 0;">
          <tr>
            <td align="center">
              
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:8px; overflow:hidden;">
                
                <!-- Header -->
                <tr>
                  <td style="background-color:#265367; padding:20px; text-align:center;">
                    <h1 style="margin:0; font-size:22px; color:#ffffff;">
                      Enrollment Confirmed 🎉
                    </h1>
                  </td>
                </tr>
        
                <!-- Body -->
                <tr>
                  <td style="padding:30px; color:#333333; font-size:14px; line-height:1.6;">
                    
                    <p style="margin:0 0 15px 0;">
                      Hi <strong>${user_name}</strong>,
                    </p>
        
                    <p style="margin:0 0 15px 0;">
                      You’ve successfully enrolled in the following course:
                    </p>
        
                    <table width="100%" cellpadding="0" cellspacing="0" style="margin:20px 0;">
                      <tr>
                        <td style="padding:10px; background-color:#f0f3f6; border-radius:6px;">
                          <p style="margin:0; font-size:15px;">
                            <strong>📘 Course:</strong> ${course_name}
                          </p>
                          <p style="margin:5px 0 0 0; font-size:14px;">
                            <strong>📂 Category:</strong> ${course_category}
                          </p>
                          <p style="margin:5px 0 0 0; font-size:14px;">
                            <strong>💳 Payment Status:</strong> ${payment_status}
                          </p>
                        </td>
                      </tr>
                    </table>
        
                    <p style="margin:0 0 20px 0;">
                      You can now access your course from your dashboard anytime.
                    </p>
        
                    <p style="margin:0;">
                      If you have any questions, feel free to reach out to our support team.
                    </p>
        
                    <p style="margin:25px 0 0 0;">
                      Cheers,<br>
                      <strong>Edulearn Team</strong>
                    </p>
        
                  </td>
                </tr>
        
                <!-- Footer -->
                <tr>
                  <td style="background-color:#f0f3f6; padding:15px; text-align:center; font-size:12px; color:#666666;">
                    © 2025 Edulearn. All rights reserved.
                  </td>
                </tr>
        
              </table>
        
            </td>
          </tr>
        </table>
      </body>
    </html>
    ` )
}
