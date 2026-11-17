export const getWelcomeEmailTemplate = (fullName, mobile, password, loginUrl) => `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; }
        .header { background: #1a237e; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; }
        .credentials { background: #f5f5f5; padding: 15px; border-left: 4px solid #1a237e; margin: 20px 0; }
        .footer { font-size: 12px; color: #777; text-align: center; margin-top: 20px; }
        .button { background: #1a237e; color: white; padding: 10px 20px; text-decoration: none; display: inline-block; border-radius: 4px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Manav Adhikar Kendra</h1>
            <p>Empowering Rights, Together</p>
        </div>
        <div class="content">
            <p>Dear <strong>${fullName}</strong>,</p>
            <p>Welcome to <strong>Manav Adhikar Kendra (MAK)</strong>. Your membership has been successfully registered by the administrator.</p>
            <p>You can now log in to the Member Portal to download your ID card, certificate, and stay updated with our latest events.</p>
            
            <div class="credentials">
                <p><strong>Login Credentials:</strong></p>
                <p><strong>Mobile Number (ID):</strong> ${mobile}</p>
                <p><strong>Temporary Password:</strong> ${password}</p>
            </div>

            <p><strong>Instructions to Login:</strong></p>
            <ol>
                <li>Visit the member login page using the link below.</li>
                <li>Enter your registered mobile number and password.</li>
                <li>Wait for the OTP (if applicable) sent to your WhatsApp for additional security.</li>
                <li>Go to 'Downloads' to get your membership documents.</li>
            </ol>

            <p style="text-align: center;">
                <a href="${loginUrl}" class="button" style="color: white !important;">Login to Portal</a>
            </p>

            <p>If you have any questions, feel free to contact us.</p>
            <p>Best Regards,<br/>Team MAK</p>
        </div>
        <div class="footer">
            &copy; ${new Date().getFullYear()} Manav Adhikar Kendra. All Rights Reserved.
        </div>
    </div>
</body>
</html>
`;

export const getWelcomeWhatsAppTemplate = (fullName, mobile, loginUrl) => `🎉 *Manav Adhikar Kendra में आपका स्वागत है!*

प्रिय सदस्य,
आप अब *Manav Adhikar Kendra* के आधिकारिक सदस्य बन चुके हैं। हमें आपके साथ जुड़कर खुशी है।

🌐 *Member Portal Login:*
https://manavadhikarkendra.org/mak-login

📌 कृपया ऊपर दिए गए लिंक पर जाकर 
अपने *Registered Mobile Number* से login करें और:

• अपना *Profile Update* करें
• *Membership Certificate* डाउनलोड करें
• *ID Card* डाउनलोड करें
• *Events और Updates* की जानकारी प्राप्त करें

📞 *Support:* +91 91142 91151
📧 *Email:* sarmfoundation1@gmail.com

धन्यवाद 🙏
*Team Manav Adhikar Kendra*`;


export const getOTPWhatsAppTemplate = (otp) => `*Verification Code: ${otp}*

Please use this verification code to login to your *Manav Adhikar Kendra Portal*.

⚠️ *Security Notice:*  
Do not share this code with anyone.`;


