const baseUri = 'http://localhost'

module.exports = (user_name, course_name) => {
  return(`
    <!DOCTYPE html>
    
    <html>
      <body style="margin:0; padding:0; background-color:#f4f6f8; font-family:Arial, Helvetica, sans-serif;">
    

    <table width="100%" cellpadding="0" cellspacing="0" style="padding:30px 0;">
      <tr>
        <td align="center">
    
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:8px; overflow:hidden;">
            
            <!-- Header -->
            <tr>
              <td style="background:#28a745; padding:20px; text-align:center;">
                <h2 style="margin:0; color:#ffffff; font-size:20px;">
                  Payment Successful 🎉
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
                  Your payment was successful, and the course has been added to your dashboard.
                </p>
    
                <table width="100%" cellpadding="0" cellspacing="0" style="margin:20px 0;">
                  <tr>
                    <td style="background:#f8f9fa; padding:15px; border-radius:6px;">
                      <p style="margin:0;">
                        <strong>📘 Course:</strong> ${course_name}
                      </p>
                      <p style="margin:5px 0 0 0;">
                        <strong>💳 Payment Status:</strong> Paid
                      </p>
                      
                    </td>
                  </tr>
                </table>
    
                <p style="margin:0 0 20px 0;">
                  You can start learning right away by accessing your dashboard.
                </p>
    
                <!-- CTA -->
                <p style="text-align:center; margin:25px 0;">
                  <a href="${baseUri}" 
                     style="background:#265367; color:#ffffff; text-decoration:none; padding:12px 22px; border-radius:6px; font-weight:bold; display:inline-block;">
                    Go to Dashboard →
                  </a>
                </p>
    
                <p style="margin:0;">
                  Need help? Our support team has your back.
                </p>
    
                <p style="margin-top:25px;">
                  Let’s go 🚀<br>
                  <strong>Edulearn Team</strong>
                </p>
    
              </td>
            </tr>
    
            <!-- Footer -->
            <tr>
              <td style="background:#f0f3f6; padding:15px; text-align:center; font-size:12px; color:#666;">
                © 2025 Edulearn. All rights reserved.
              </td>
            </tr>
    
          </table>
    
        </td>
      </tr>
    </table>

    
      </body>
    </html>

    `)
}