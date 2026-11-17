export const buildMAKIdCardHtml = ({
    fullName,
    idNumber,
    designation,
    dob,
    phone,
    address,
    photoDataUri,
    logoDataUri,
    sarmLogoFullDataUri,
    stampDataUri,
    issueDate
}) => `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { margin: 0; padding: 0; background: transparent; font-family: 'Inter', 'Segoe UI', Arial, sans-serif; }
        .id-card {
            width: 320px;
            height: 500px;
            position: relative;
            overflow: hidden;
            background-color: #ffffff;
            border: 2px solid #cbd5e1;
            display: flex;
            flex-direction: column;
        }
        .header {
            background: #ffffff;
            padding: 16px 16px 10px 16px;
            border-bottom: 4px solid #ea580c;
            z-index: 5;
        }
        .header-top {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
            margin-bottom: 8px;
        }
        .sarm-brand { flex: 1; display: flex; flex-direction: column; align-items: center; }
        .sarm-brand img { height: 32px; object-fit: contain; }
        .separator { width: 1.5px; height: 40px; background-color: #e2e8f0; }
        .mak-brand { flex: 1; display: flex; align-items: center; justify-content: center; gap: 8px; }
        .mak-brand img { height: 32px; width: 32px; object-fit: contain; }
        .mak-brand span { font-size: 18px; font-weight: 900; color: #0A192F; letter-spacing: 1px; }
        
        .header-sub { text-align: center; border-top: 1px solid #f1f5f9; padding-top: 6px; }
        .header-sub div:first-child { font-size: 8px; font-weight: 800; color: #64748b; text-transform: uppercase; letter-spacing: 0.2px; white-space: nowrap; }
        .header-sub div:last-child { font-size: 7.5px; font-weight: 700; color: #94a3b8; text-transform: uppercase; margin-top: 1px; }

        .label-banner {
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #ea580c;
            color: white;
            font-size: 11px;
            font-weight: 900;
            letter-spacing: 6px;
            text-transform: uppercase;
        }

        .main-content { display: flex; padding: 24px 20px 0 20px; gap: 16px; align-items: flex-start; }
        .photo-box {
            width: 105px;
            height: 130px;
            border: 3px solid #0A192F;
            border-radius: 8px;
            overflow: hidden;
            background-color: #f8fafc;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        .photo-box img { width: 100%; height: 100%; object-fit: cover; }
        
        .details { flex: 1; display: flex; flex-direction: column; gap: 6px; padding-top: 4px; }
        .name { font-size: 15px; font-weight: 900; color: #0A192F; text-transform: uppercase; line-height: 1.2; margin-bottom: 4px; }
        .desig {
            align-self: flex-start;
            font-size: 8px;
            font-weight: 800;
            color: #ea580c;
            letter-spacing: 1px;
            text-transform: uppercase;
            background-color: #fff7ed;
            padding: 2px 8px;
            border-radius: 4px;
            border: 1px solid #fed7aa;
            margin-bottom: 8px;
        }
        .info-table { width: 100%; border-collapse: collapse; }
        .info-table td { font-size: 8px; font-weight: 800; text-transform: uppercase; padding-bottom: 4px; }
        .info-table .label { color: #64748b; width: 45px; }
        .info-table .val { color: #0f172a; font-size: 9px; }

        .address-section { padding: 12px 24px 0 24px; text-align: center; flex: 1; }
        .address-sep { border-top: 1px solid #e2e8f0; margin: 4px auto 8px; width: 80%; }
        .address-label { font-size: 8px; font-weight: 800; color: #64748b; text-transform: uppercase; margin-bottom: 4px; letter-spacing: 1px; }
        .address-text { font-size: 10px; font-weight: 800; color: #0f172a; line-height: 1.5; text-transform: uppercase; max-width: 240px; margin: 0 auto; }

        .footer { padding: 0 20px 24px 20px; display: flex; justify-content: space-between; align-items: flex-end; position: relative; z-index: 2; }
        .issue-box { text-align: left; }
        .issue-date { font-size: 10px; font-weight: 900; color: #0A192F; border-bottom: 1.5px solid #0A192F; padding-bottom: 2px; margin-bottom: 4px; }
        .issue-label { font-size: 8px; font-weight: 900; color: #64748b; text-transform: uppercase; letter-spacing: 1px; }
        
        .seal-box { text-align: right; display: flex; flex-direction: column; align-items: center; }
        .stamp-container { position: relative; height: 50px; width: 90px; display: flex; align-items: center; justify-content: center; }
        .stamp-img { width: 64px; height: 48px; object-fit: contain; transform: rotate(-5deg); opacity: 0.9; }
        .seal-label { font-size: 7px; font-weight: 800; color: #0A192F; border-top: 1.5px solid #cbd5e1; padding-top: 3px; width: 130px; text-align: center; text-transform: uppercase; letter-spacing: 0.5px; }

        .bottom-accent { height: 8px; background: linear-gradient(90deg, #ea580c 0%, #0A192F 50%, #ea580c 100%); }
    </style>
</head>
<body>
    <div class="id-card">
        <div class="header">
            <div class="header-top">
                <div class="sarm-brand"><img src="${sarmLogoFullDataUri}" /></div>
                <div class="separator"></div>
                <div class="mak-brand">
                    <img src="${logoDataUri}" />
                    <span>MAK</span>
                </div>
            </div>
            <div class="header-sub">
                <div>Manav Adhikar Kendra is part of SARM Foundation</div>
                <div>Udyam Registration: UDYAM-WB-14-0254277</div>
            </div>
        </div>
        <div class="label-banner">IDENTITY CARD</div>
        <div class="main-content">
            <div class="photo-box">
                <img src="${photoDataUri}" />
            </div>
            <div class="details">
                <div class="name">${fullName}</div>
                <div class="desig">${designation}</div>
                <table class="info-table">
                    <tr><td class="label">ID NO.</td><td class="val">${idNumber}</td></tr>
                    <tr><td class="label">D.O.B.</td><td class="val">${dob}</td></tr>
                    <tr><td class="label">PHONE</td><td class="val">${phone}</td></tr>
                </table>
            </div>
        </div>
        <div class="address-section">
            <div class="address-sep"></div>
            <div class="address-label">Corresponding Address</div>
            <div class="address-text">${address}</div>
        </div>
        <div class="footer">
            <div class="issue-box">
                <div class="issue-date">${issueDate}</div>
                <div class="issue-label">Date of Issue</div>
            </div>
            <div class="seal-box">
                <div class="stamp-container">
                    <img src="${stampDataUri}" class="stamp-img" />
                </div>
                <div class="seal-label">Authorized Seal & Signature</div>
            </div>
        </div>
        <div class="bottom-accent"></div>
    </div>
</body>
</html>
`;

export const buildMAKCertificateHtml = ({
    fullName,
    idNumber,
    designation,
    issueDate,
    logoDataUri,
    sarmLogoFullDataUri,
    sarmLogoWatermarkDataUri,
    stampDataUri
}) => `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body { margin: 0; padding: 0; background: #ffffff; font-family: 'Georgia', serif; }
        .cert-container {
            width: 1100px;
            height: 780px;
            position: relative;
            overflow: hidden;
            background-color: #ffffff;
            display: flex;
            flex-direction: column;
        }
        .outer-border {
            position: absolute; inset: 0;
            background: linear-gradient(135deg, #ea580c 0%, #0A192F 25%, #ea580c 50%, #0A192F 75%, #ea580c 100%);
            z-index: 1;
        }
        .white-bg {
            position: absolute; inset: 6px;
            background-color: #ffffff;
            z-index: 1;
        }
        .inner-border {
            position: absolute; inset: 14px;
            border: 1.5px solid #cbd5e1;
            z-index: 2;
        }
        .watermark {
            position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
            width: 450px; height: 450px; opacity: 0.10; z-index: 3;
            display: flex; align-items: center; justify-content: center;
        }
        .watermark img { width: 100%; object-fit: contain; }

        .ornament { position: absolute; width: 90px; height: 90px; opacity: 0.6; z-index: 3; }
        .ornament.tl { top: 14px; left: 14px; }
        .ornament.tr { top: 14px; right: 14px; transform: rotate(90deg); }
        .ornament.bl { bottom: 14px; left: 14px; transform: rotate(-90deg); }
        .ornament.br { bottom: 14px; right: 14px; transform: rotate(180deg); }

        .content {
            position: relative; z-index: 10; height: 100%; display: flex; flex-direction: column;
            padding: 25px 50px; box-sizing: border-box;
        }

        .header { display: flex; justify-content: center; align-items: center; gap: 30px; margin-bottom: 8px; }
        .header img.sarm { height: 70px; }
        .header .titles { text-align: center; }
        .header .titles h1 { font-size: 30px; font-weight: 900; color: #0A192F; letter-spacing: 2px; margin: 0; }
        .header .titles p { font-size: 10px; font-weight: 700; color: #64748b; margin: 2px 0 0; text-transform: uppercase; }
        .header img.mak { height: 50px; }
        .header .v-line { width: 1.5px; height: 45px; background-color: #cbd5e1; }

        .reg-info { text-align: center; font-size: 8px; font-weight: 800; color: #94a3b8; letter-spacing: 1px; text-transform: uppercase; margin-top: 6px; }

        .divider { display: flex; align-items: center; justify-content: center; gap: 12px; margin: 6px 0; }
        .divider .line { width: 100px; height: 1px; background: rgba(10, 25, 47, 0.2); }
        .divider .diamond { width: 8px; height: 8px; transform: rotate(45deg); background: #ea580c; }

        .cert-title { text-align: center; margin-top: 10px; }
        .cert-title .sub { font-size: 15px; font-weight: 700; color: #ea580c; text-transform: uppercase; letter-spacing: 8px; margin-bottom: 4px; }
        .cert-title .main { font-size: 40px; font-weight: 900; color: #ea580c; text-transform: uppercase; letter-spacing: 5px; }

        .body-text { flex: 1; display: flex; flex-direction: column; justify-content: center; text-align: center; }
        .body-text p.intro { font-size: 17px; color: #475569; font-style: italic; margin-bottom: 10px; }
        .body-text .name-box { display: inline-block; margin: 0 auto; border-bottom: 3px solid #0A192F; padding: 0 80px 8px; position: relative; }
        .body-text .name-box h3 { font-size: 38px; font-weight: 900; color: #0A192F; text-transform: uppercase; margin: 0; font-family: Arial, sans-serif; letter-spacing: 4px; }
        .body-text .name-box .diamond { position: absolute; bottom: -7px; left: 50%; transform: translateX(-50%) rotate(45deg); width: 12px; height: 12px; background: #ea580c; border: 2px solid white; }

        .body-text .main-para { font-size: 17px; color: #475569; line-height: 1.7; margin: 20px auto 0; max-width: 850px; }
        .body-text .main-para strong { color: #0A192F; }
        .body-text .main-para .orange { color: #ea580c; font-weight: 900; }
        .body-text .id-text { color: #0A192F; font-size: 19px; letter-spacing: 4px; font-weight: 900; }

        .body-text .commitment {
            font-size: 11px; font-weight: 700; color: #94a3b8;
            text-transform: uppercase; letter-spacing: 2px;
            max-width: 750px; margin: 20px auto 0;
            border-top: 1px solid #f1f5f9; paddingTop: 15px;
            line-height: 1.5;
        }

        .footer { border-top: 2px solid #ea580c; padding-top: 20px; display: flex; justify-content: space-between; align-items: flex-end; }
        .footer .ids { text-align: left; width: 220px; }
        .footer .ids .id-item { margin-bottom: 10px; }
        .footer .ids .id-item .lab { font-size: 9px; font-weight: 800; color: #64748b; letter-spacing: 1px; text-transform: uppercase; }
        .footer .ids .id-item .val { font-size: 13px; font-weight: 900; color: #0A192F; letter-spacing: 1px; }

        .footer .sig { text-align: center; margin-right: 20px; }
        .footer .sig .stamp-container { height: 90px; width: 240px; position: relative; display: flex; justify-content: center; align-items: center; }
        .footer .sig .stamp-container img { width: 130px; transform: rotate(-4deg); opacity: 0.95; }
        .footer .sig .sig-line { border-top: 2.5px solid #0A192F; width: 240px; padding-top: 8px; }
        .footer .sig .sig-line .dir { font-size: 17px; font-weight: 900; color: #0A192F; letter-spacing: 2px; }
        .footer .sig .sig-line .org { font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 1px; }

        .contact-bar { border-top: 1px solid #f1f5f9; padding-top: 10px; margin-top: 20px; text-align: center; font-size: 9px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 1.5px; }
    </style>
</head>
<body>
    <div class="cert-container">
        <div class="outer-border"></div>
        <div class="white-bg"></div>
        <div class="inner-border"></div>
        <div class="watermark">
            <img src="${sarmLogoWatermarkDataUri}" />
        </div>
        
        <!-- Corner Ornaments -->
        <svg class="ornament tl" viewBox="0 0 100 100"><path d="M5 5 L5 35 Q5 5 35 5 Z" fill="#0A192F" opacity="0.12" /><path d="M5 5 L5 50 Q5 12 50 5" fill="none" stroke="#ea580c" stroke-width="1.2" /><path d="M8 8 L8 40 Q8 15 40 8" fill="none" stroke="#0A192F" stroke-width="0.8" /><circle cx="12" cy="12" r="2" fill="#ea580c" /><circle cx="22" cy="6" r="1.5" fill="#0A192F" /><circle cx="6" cy="22" r="1.5" fill="#0A192F" /></svg>
        <svg class="ornament tr" viewBox="0 0 100 100"><path d="M5 5 L5 35 Q5 5 35 5 Z" fill="#0A192F" opacity="0.12" /><path d="M5 5 L5 50 Q5 12 50 5" fill="none" stroke="#ea580c" stroke-width="1.2" /><path d="M8 8 L8 40 Q8 15 40 8" fill="none" stroke="#0A192F" stroke-width="0.8" /><circle cx="12" cy="12" r="2" fill="#ea580c" /><circle cx="22" cy="6" r="1.5" fill="#0A192F" /><circle cx="6" cy="22" r="1.5" fill="#0A192F" /></svg>
        <svg class="ornament bl" viewBox="0 0 100 100"><path d="M5 5 L5 35 Q5 5 35 5 Z" fill="#0A192F" opacity="0.12" /><path d="M5 5 L5 50 Q5 12 50 5" fill="none" stroke="#ea580c" stroke-width="1.2" /><path d="M8 8 L8 40 Q8 15 40 8" fill="none" stroke="#0A192F" stroke-width="0.8" /><circle cx="12" cy="12" r="2" fill="#ea580c" /><circle cx="22" cy="6" r="1.5" fill="#0A192F" /><circle cx="6" cy="22" r="1.5" fill="#0A192F" /></svg>
        <svg class="ornament br" viewBox="0 0 100 100"><path d="M5 5 L5 35 Q5 5 35 5 Z" fill="#0A192F" opacity="0.12" /><path d="M5 5 L5 50 Q5 12 50 5" fill="none" stroke="#ea580c" stroke-width="1.2" /><path d="M8 8 L8 40 Q8 15 40 8" fill="none" stroke="#0A192F" stroke-width="0.8" /><circle cx="12" cy="12" r="2" fill="#ea580c" /><circle cx="22" cy="6" r="1.5" fill="#0A192F" /><circle cx="6" cy="22" r="1.5" fill="#0A192F" /></svg>

        <div class="content">
            <div class="header">
                <img src="${sarmLogoFullDataUri}" class="sarm" />
                <div class="titles">
                    <h1>Manav Adhikar Kendra</h1>
                    <p>is part of SARM Foundation • Section 8 Registered NGO</p>
                </div>
                <div class="v-line"></div>
                <img src="${logoDataUri}" class="mak" />
            </div>
            <div class="reg-info">DARPAN: WB/2025/0798807 • UDYAM: UDYAM-WB-14-0254277 • PAN: ABRCS1239C</div>
            <div class="divider">
                <div class="line"></div>
                <div class="diamond"></div>
                <div class="line"></div>
            </div>
            <div class="cert-title">
                <div class="sub">This is to certify that</div>
                <div class="main">Certificate of Membership</div>
            </div>
            <div class="body-text">
                <p class="intro">We hereby proudly certify that</p>
                <div class="name-box">
                    <h3>${fullName}</h3>
                    <div class="diamond"></div>
                </div>
                <div class="main-para">
                    has been officially registered and inducted as <span class="orange">[${designation}]</span> 
                    in <strong>Manav Adhikar Kendra</strong>, which is part of <strong>SARM Foundation</strong>.
                    <br/>
                    Membership Registration Number: <span class="id-text">${idNumber}</span>
                </div>
                <div class="commitment">
                    Committed to the preservation, protection, and promotion of Human Rights
                    alongside social welfare initiatives across the nation.
                </div>
            </div>
            <div class="footer">
                <div class="ids">
                    <div class="id-item"><div class="lab">CERTIFICATE ID</div><div class="val">${idNumber}</div></div>
                    <div class="id-item"><div class="lab">ISSUE DATE</div><div class="val">${issueDate}</div></div>
                </div>
                <div class="sig">
                    <div class="stamp-container">
                        <img src="${stampDataUri}" />
                    </div>
                    <div class="sig-line">
                        <div class="dir">DIRECTOR</div>
                        <div class="org">SARM Foundation</div>
                    </div>
                </div>
            </div>
            <div class="contact-bar">Email: sarmfoundation1@gmail.com • Phone: +91 91142 91151 • Regd. Office: WB – 743439</div>
        </div>
    </div>
</body>
</html>
`;
