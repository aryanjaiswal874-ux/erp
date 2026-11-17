export function buildPartnerCertificateHtml({
  companyName,
  certificateTitle,
  logoDataUri,
  watermarkDataUri,
  partnerPhotoDataUri,
  partnerFullName,
  partnerId,
  certificateId,
  issueDateText,
  signatoryName,
  signatoryRole,
  verificationUrl,
  footerAddress,
  footerWebsite,
}) {
  const safe = (v) => String(v ?? "").replace(/[<>]/g, "");

  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Montserrat:wght@300;400;600;700&family=Pinyon+Script&display=swap" rel="stylesheet">
    <style>
      :root {
        --certificate-bg: #fdfaf3;
        --border-color: #c5a059;
        --text-main: #1a1a1a;
        --text-muted: #555555;
        --accent-gold: #b8860b;
        --accent-green: #064e3b;
        --accent-cyan: #0891b2;
      }

      * { box-sizing: border-box; }
      body {
        margin: 0;
        padding: 0;
        background: #ffffff;
        font-family: 'Montserrat', sans-serif;
      }

      .certificate-container {
        width: 297mm;
        height: 210mm;
        padding: 0;
        margin: 0;
        position: relative;
        background-color: var(--certificate-bg);
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      /* Ornate Corner Elements */
      .corner-element {
        position: absolute;
        width: 120px;
        height: 120px;
        z-index: 10;
        opacity: 0.8;
      }
      .tl { top: 20px; left: 20px; border-top: 4px solid var(--border-color); border-left: 4px solid var(--border-color); }
      .tr { top: 20px; right: 20px; border-top: 4px solid var(--border-color); border-right: 4px solid var(--border-color); }
      .bl { bottom: 20px; left: 20px; border-bottom: 4px solid var(--border-color); border-left: 4px solid var(--border-color); }
      .br { bottom: 20px; right: 20px; border-bottom: 4px solid var(--border-color); border-right: 4px solid var(--border-color); }

      /* Dual Border System */
      .outer-border {
        position: absolute;
        top: 25px;
        left: 25px;
        right: 25px;
        bottom: 25px;
        border: 2px solid var(--border-color);
        pointer-events: none;
      }

      .inner-border {
        position: absolute;
        top: 40px;
        left: 40px;
        right: 40px;
        bottom: 40px;
        border: 1px solid rgba(197, 160, 89, 0.4);
        pointer-events: none;
      }

      .content-wrapper {
        position: relative;
        width: 100%;
        height: 100%;
        padding: 60px 80px;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        z-index: 5;
      }

      .watermark {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 400px;
        opacity: 0.04;
        z-index: 1;
        pointer-events: none;
      }

      .header-logo {
        height: 70px;
        margin-bottom: 25px;
        filter: grayscale(0.2);
      }

      .certificate-title {
        font-family: 'Cinzel', serif;
        font-size: 42px;
        color: var(--accent-gold);
        font-weight: 700;
        margin-bottom: 5px;
        letter-spacing: 2px;
        text-transform: uppercase;
      }

      .certificate-subtitle {
        font-family: 'Cinzel', serif;
        font-size: 18px;
        color: var(--text-muted);
        letter-spacing: 4px;
        margin-bottom: 40px;
      }

      .presentation-text {
        font-size: 16px;
        color: var(--text-muted);
        font-style: italic;
        margin-bottom: 20px;
      }

      .partner-name {
        font-family: 'Pinyon Script', cursive;
        font-size: 64px;
        color: var(--accent-green);
        margin: 10px 0;
        font-weight: 400;
      }

      .authorization-body {
        max-width: 800px;
        font-size: 15px;
        line-height: 1.8;
        color: var(--text-main);
        font-weight: 400;
        margin-bottom: 40px;
      }

      .authorization-body strong {
        color: var(--accent-gold);
      }

      .details-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 30px;
        width: 100%;
        max-width: 800px;
        margin-bottom: 50px;
        padding: 25px;
        background: rgba(255, 255, 255, 0.4);
        border: 1px solid rgba(197, 160, 89, 0.2);
        border-radius: 8px;
        text-align: left;
      }

      .detail-item label {
        display: block;
        font-size: 9px;
        font-weight: 700;
        color: var(--text-muted);
        text-transform: uppercase;
        letter-spacing: 1.5px;
        margin-bottom: 5px;
      }

      .detail-item span {
        display: block;
        font-size: 12px;
        font-weight: 700;
        color: var(--text-main);
        letter-spacing: 0.5px;
      }

      .footer-section {
        width: 100%;
        max-width: 900px;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        margin-top: auto;
      }

      .signature-block {
        width: 250px;
        text-align: center;
      }

      .signature-line {
        border-top: 1.5px solid var(--border-color);
        margin-bottom: 10px;
      }

      .signatory-name {
        font-weight: 700;
        font-size: 14px;
        color: var(--text-main);
      }

      .signatory-role {
        font-size: 11px;
        color: var(--text-muted);
        font-weight: 500;
      }

      .seal-container {
        position: relative;
        width: 120px;
        height: 120px;
      }

      .gold-seal {
        width: 100%;
        height: 100%;
        background: radial-gradient(circle, #ffd700 0%, #daa520 100%);
        border-radius: 50%;
        box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        display: flex;
        align-items: center;
        justify-content: center;
        border: 4px double #b8860b;
        position: relative;
      }

      .seal-ribbon {
        position: absolute;
        bottom: -20px;
        width: 40px;
        height: 60px;
        background: #8b0000; /* Dark Red Ribbon */
        clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 50% 80%, 0% 100%);
        z-index: -1;
      }
      .ribbon-l { left: 25px; transform: rotate(10deg); }
      .ribbon-r { right: 25px; transform: rotate(-10deg); }

      .seal-logo {
        width: 60%;
        opacity: 0.8;
        filter: brightness(0) invert(1);
      }

      .verification-footer {
        position: absolute;
        bottom: 45px;
        font-size: 9px;
        color: var(--text-muted);
        font-family: 'Montserrat', sans-serif;
        font-weight: 500;
        letter-spacing: 1px;
      }

      .verification-footer strong {
        color: var(--accent-cyan);
      }
    </style>
  </head>
  <body>
    <div class="certificate-container">
      <div class="outer-border"></div>
      <div class="inner-border"></div>
      <div class="corner-element tl"></div>
      <div class="corner-element tr"></div>
      <div class="corner-element bl"></div>
      <div class="corner-element br"></div>

      ${watermarkDataUri ? `<img class="watermark" src="${watermarkDataUri}" />` : ""}

      <div class="content-wrapper">
        ${logoDataUri ? `<img src="${logoDataUri}" class="header-logo" />` : ""}
        
        <h1 class="certificate-title">Certificate of Authorization</h1>
        <p class="certificate-subtitle">Official Partner Network</p>

        <p class="presentation-text">This is to certify that</p>
        <h2 class="partner-name">${safe(partnerFullName)}</h2>

        <div class="authorization-body">
          is an officially authorized Partner of <strong>${safe(companyName)}</strong> and is permitted to represent, promote, and provide 
          services on behalf of the organization as per agreed terms and professional compliance standards. 
          This authorization entitles the holder to access the official SBGM Partner Portal and associated benefits.
        </div>

        <div class="details-grid">
          <div class="detail-item">
            <label>Partner ID</label>
            <span>${safe(partnerId)}</span>
          </div>
          <div class="detail-item">
            <label>Authorization Status</label>
            <span style="color: var(--accent-green)">ACTIVE</span>
          </div>
          <div class="detail-item">
            <label>Certificate ID</label>
            <span>${safe(certificateId)}</span>
          </div>
          <div class="detail-item">
            <label>Issue Date</label>
            <span>${safe(issueDateText)}</span>
          </div>
          <div class="detail-item">
            <label>Organization</label>
            <span>${safe(companyName)}</span>
          </div>
          <div class="detail-item">
            <label>Valid Through</label>
            <span>Perpetual (Subject to Terms)</span>
          </div>
        </div>

        <div class="footer-section">
          <div class="signature-block">
            <div class="signature-line"></div>
            <div class="signatory-name">${safe(issueDateText)}</div>
            <div class="signatory-role">Date of Issuance</div>
          </div>

          <div class="seal-container">
            <div class="seal-ribbon ribbon-l"></div>
            <div class="seal-ribbon ribbon-r"></div>
            <div class="gold-seal">
              ${logoDataUri ? `<img src="${logoDataUri}" class="seal-logo" />` : ""}
            </div>
          </div>

          <div class="signature-block">
            <div class="signature-line"></div>
            <div class="signatory-name">${safe(signatoryName)}</div>
            <div class="signatory-role">${safe(signatoryRole)}</div>
          </div>
        </div>

        <div class="verification-footer">
          Digitally Signed • Verify at: <strong>${safe(verificationUrl)}</strong>
        </div>
      </div>
    </div>
  </body>
</html>`;
}
