// const axios = require('axios');

// // ✅ Generic Helper Function for Brevo
// const sendBrevoEmail = async (to, subject, htmlContent) => {
//   try {
//     await axios.post(
//       'https://api.brevo.com/v3/smtp/email',
//       {
//         sender: { email: process.env.EMAIL_FROM, name: 'CrimeTrack Security' },
//         to: [{ email: to }],
//         subject: subject,
//         htmlContent: htmlContent,
//       },
//       {
//         headers: {
//           'api-key': process.env.BREVO_API_KEY,
//           'Content-Type': 'application/json',
//           'Accept': 'application/json',
//         },
//       }
//     );
//     console.log(`✅ Email sent via Brevo to ${to}`);
//   } catch (error) {
//     console.error("❌ Brevo Email Error:", error.response?.data || error.message);
//     // We do NOT throw error here to prevent crashing the main process
//   }
// };

// // 1. Welcome Email (New Registration)
// const sendWelcomeEmail = async (email, name, password) => {
//   const subject = "Welcome to CrimeTrack - Registration Successful";
//   const html = `
//     <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd; max-width: 600px;">
//       <h2 style="color: #0F172A;">Registration Successful</h2>
//       <p>Hello <strong>${name}</strong>,</p>
//       <p>Welcome to the CrimeTrack Portal. Your account has been successfully created.</p>
//       <p><strong>Your Login Credentials:</strong></p>
//       <ul>
//         <li><strong>Username/Email:</strong> ${email}</li>
//         <li><strong>Password:</strong> ${password}</li>
//       </ul>
//       <p style="color: red; font-size: 12px;">For security reasons, please change your password after logging in.</p>
//       <p>Regards,<br/>CrimeTrack Authority</p>
//     </div>
//   `;
//   await sendBrevoEmail(email, subject, html);
// };

// // 2. Complaint Confirmation (Citizen)
// const sendComplaintConfirmation = async (email, name, complaintId) => {
//   const subject = `Complaint Received: #${complaintId}`;
//   const html = `
//     <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd; max-width: 600px;">
//       <h2 style="color: #0F172A;">Complaint Successfully Submitted</h2>
//       <p>Hello <strong>${name}</strong>,</p>
//       <p>This is to confirm that your complaint has been received by the system.</p>
//       <p><strong>Complaint ID:</strong> ${complaintId}</p>
//       <p>The concerned authority will review your complaint shortly. You can track the status on your dashboard.</p>
//       <p>Regards,<br/>CrimeTrack Authority</p>
//     </div>
//   `;
//   await sendBrevoEmail(email, subject, html);
// };

// // 3. Status Update (FIR & Updates)
// const sendStatusUpdateEmail = async (email, name, complaintId, status, description) => {
//   const subject = `Case Update: #${complaintId} - ${status}`;
//   const html = `
//     <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd; max-width: 600px;">
//       <h2 style="color: #d97706;">Case Status Update</h2>
//       <p>Hello <strong>${name}</strong>,</p>
//       <p>There has been an update regarding your case <strong>#${complaintId}</strong>.</p>
//       <div style="background-color: #f4f4f4; padding: 15px; border-radius: 5px; margin: 15px 0;">
//         <p><strong>Current Status:</strong> <span style="color: #0F172A; font-weight: bold;">${status}</span></p>
//         <p><strong>Officer's Remark/Description:</strong><br/>${description}</p>
//       </div>
//       <p>You can view full details on your dashboard.</p>
//       <p>Regards,<br/>CrimeTrack Police Department</p>
//     </div>
//   `;
//   await sendBrevoEmail(email, subject, html);
// };

// module.exports = { sendWelcomeEmail, sendComplaintConfirmation, sendStatusUpdateEmail };
















const axios = require('axios');

// 👇 YAHAN APNA CLOUDINARY LOGO LINK DAALO
const LOGO_URL = "https://res.cloudinary.com/dukrcgv8s/image/upload/v1770304918/CrimeTrack_abbtdr.png"; 

// --- 🎨 HELPER: Common Email Header (Logo + Title) ---
const getEmailHeader = (title) => {
  return `
    <div style="background-color: #0F172A; color: white; padding: 25px; text-align: center; border-top-left-radius: 8px; border-top-right-radius: 8px;">
      <img src="${LOGO_URL}" alt="CrimeTrack Logo" style="width: 60px; height: 60px; margin-bottom: 10px; object-fit: contain;" />
      <h2 style="margin: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 20px; letter-spacing: 1px;">CRIMETRACK</h2>
      <p style="margin: 5px 0 0; font-size: 12px; text-transform: uppercase; opacity: 0.8;">${title}</p>
    </div>
  `;
};

// --- 🎨 HELPER: Common Footer ---
const getEmailFooter = () => {
  return `
    <div style="background-color: #f1f5f9; color: #64748b; padding: 15px; text-align: center; font-size: 11px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;">
      <p style="margin: 0;">This is a system-generated email from the CrimeTrack Digital Policing Network.</p>
      <p style="margin: 5px 0 0;">&copy; ${new Date().getFullYear()} CrimeTrack. All rights reserved.</p>
    </div>
  `;
};

// --- 🛠️ HELPER: Generate Detailed HTML Template (For FIR/Status) ---
const generateCaseEmailTemplate = (report, title, highlightRemark = "") => {
  const record = report.officialRecord || {};
  
  // Formatting Dates
  const recordDate = record.recordDate ? new Date(record.recordDate).toLocaleString() : "N/A";
  const incidentDate = record.occurrenceDate ? `${record.occurrenceDate} at ${record.occurrenceTime}` : "N/A";

  // Acts String
  const actsString = record.acts && record.acts.length > 0 
    ? record.acts.map(a => `${a.actName} (Sec: ${a.section})`).join(', ') 
    : "N/A";

  return `
    <div style="font-family: Arial, sans-serif; max-width: 700px; margin: auto; border: 1px solid #e2e8f0; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
      
      ${getEmailHeader("Official Notification")}

      <div style="background-color: #ffffff; padding: 20px; border-bottom: 2px solid #3b82f6;">
        <h3 style="color: #1e40af; margin-top: 0; font-size: 18px;">${title}</h3>
        <p style="font-size: 14px; color: #475569; line-height: 1.5;">
          <strong>Case ID:</strong> #${report._id} <br/>
          <strong>Police Station:</strong> ${report.selectedStation}
        </p>
        
        ${highlightRemark ? `
        <div style="background-color: #fff7ed; border-left: 4px solid #f97316; padding: 15px; margin-top: 15px; border-radius: 4px;">
          <p style="margin: 0; font-size: 11px; color: #9a3412; font-weight: bold; text-transform: uppercase;">Officer's Remark:</p>
          <p style="margin: 5px 0 0; font-size: 14px; color: #1e293b; font-style: italic;">"${highlightRemark}"</p>
        </div>` : ''}
      </div>

      <div style="padding: 20px; background-color: #ffffff;">
        <h4 style="border-bottom: 1px solid #cbd5e1; padding-bottom: 8px; color: #334155; font-size: 14px; margin-top: 0;">OFFICIAL RECORD DETAILS</h4>
        
        <table style="width: 100%; border-collapse: collapse; font-size: 13px; margin-top: 10px;">
          
          <tr style="background-color: #f8fafc;">
            <td style="padding: 10px; border: 1px solid #cbd5e1; font-weight: bold; width: 40%;">Record Number</td>
            <td style="padding: 10px; border: 1px solid #cbd5e1; color: #b91c1c; font-weight: bold;">${record.recordNumber || "Pending"}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #cbd5e1; font-weight: bold;">Filing Date</td>
            <td style="padding: 10px; border: 1px solid #cbd5e1;">${recordDate}</td>
          </tr>
          <tr style="background-color: #f8fafc;">
            <td style="padding: 10px; border: 1px solid #cbd5e1; font-weight: bold;">Applicable Acts</td>
            <td style="padding: 10px; border: 1px solid #cbd5e1;">${actsString}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #cbd5e1; font-weight: bold;">Incident Location</td>
            <td style="padding: 10px; border: 1px solid #cbd5e1;">${record.incidentPlace || report.incidentLocationAddress || "N/A"}</td>
          </tr>
          <tr style="background-color: #f8fafc;">
            <td style="padding: 10px; border: 1px solid #cbd5e1; font-weight: bold;">Occurrence</td>
            <td style="padding: 10px; border: 1px solid #cbd5e1;">${incidentDate}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #cbd5e1; font-weight: bold;">Officer In-Charge</td>
            <td style="padding: 10px; border: 1px solid #cbd5e1;">${record.investigatingOfficer || report.assignedOfficer} (${record.rank || "Officer"})</td>
          </tr>

        </table>

        <h4 style="border-bottom: 1px solid #cbd5e1; padding-bottom: 8px; color: #334155; margin-top: 25px; font-size: 14px;">PERSONS INVOLVED</h4>
        <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
          <thead style="background-color: #e2e8f0;">
            <tr>
              <th style="padding: 8px; border: 1px solid #cbd5e1; text-align: left;">Role</th>
              <th style="padding: 8px; border: 1px solid #cbd5e1; text-align: left;">Name</th>
              <th style="padding: 8px; border: 1px solid #cbd5e1; text-align: left;">Details</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding: 8px; border: 1px solid #cbd5e1; font-weight: bold;">Complainant</td>
              <td style="padding: 8px; border: 1px solid #cbd5e1;">${record.complainant?.fullName || report.reporterName}</td>
              <td style="padding: 8px; border: 1px solid #cbd5e1;">${record.complainant?.mobile || "N/A"}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #cbd5e1; font-weight: bold; color: #047857;">Victim</td>
              <td style="padding: 8px; border: 1px solid #cbd5e1;">${record.victim?.fullName || report.victimName}</td>
              <td style="padding: 8px; border: 1px solid #cbd5e1;">Age: ${record.victim?.age || report.victimAge || "N/A"}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #cbd5e1; font-weight: bold; color: #b91c1c;">Accused</td>
              <td style="padding: 8px; border: 1px solid #cbd5e1;">${record.accused?.fullName || report.suspectName || "Unknown"}</td>
              <td style="padding: 8px; border: 1px solid #cbd5e1;">${record.accused?.address || "N/A"}</td>
            </tr>
          </tbody>
        </table>
      </div>

      ${getEmailFooter()}
    </div>
  `;
};

// ✅ Generic Helper Function for Brevo
const sendBrevoEmail = async (to, subject, htmlContent) => {
  try {
    await axios.post(
      'https://api.brevo.com/v3/smtp/email',
      {
        sender: { email: process.env.EMAIL_FROM, name: 'CrimeTrack Security' },
        to: [{ email: to }],
        subject: subject,
        htmlContent: htmlContent,
      },
      {
        headers: {
          'api-key': process.env.BREVO_API_KEY,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      }
    );
    console.log(`✅ Email sent via Brevo to ${to}`);
  } catch (error) {
    console.error("❌ Brevo Email Error:", error.response?.data || error.message);
  }
};

/* =======================
    1. 🔐 OTP EMAIL
======================= */
const sendOtpEmail = async (email, otp) => {
  const subject = "Verification Code - CrimeTrack";
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto; border: 1px solid #e2e8f0; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
      ${getEmailHeader("Secure Verification")}
      <div style="padding: 30px; text-align: center; background-color: #ffffff;">
        <p style="font-size: 16px; color: #334155;">Your One-Time Password (OTP) is:</p>
        <div style="background-color: #f1f5f9; display: inline-block; padding: 15px 30px; margin: 20px 0; border-radius: 8px; letter-spacing: 5px; font-size: 32px; font-weight: bold; color: #0F172A; border: 1px dashed #94a3b8;">
          ${otp}
        </div>
        <p style="font-size: 13px; color: #64748b;">This code is valid for 10 minutes. Do not share it with anyone.</p>
      </div>
      ${getEmailFooter()}
    </div>
  `;
  await sendBrevoEmail(email, subject, html);
};

/* =======================
    2. 👋 WELCOME EMAIL
======================= */
const sendWelcomeEmail = async (email, name, password) => {
  const subject = "Welcome to CrimeTrack - Registration Successful";
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e2e8f0; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
      ${getEmailHeader("Registration Successful")}
      <div style="padding: 30px; background-color: #ffffff;">
        <p style="font-size: 16px; color: #334155;">Hello <strong>${name}</strong>,</p>
        <p style="color: #475569; line-height: 1.6;">Welcome to the CrimeTrack Portal. Your account has been successfully created. You can now access digital policing services securely.</p>
        
        <div style="background-color: #f8fafc; padding: 20px; border-radius: 6px; margin: 20px 0; border: 1px solid #e2e8f0;">
          <p style="margin: 0 0 10px; font-weight: bold; color: #0F172A; text-transform: uppercase; font-size: 12px;">Your Login Credentials:</p>
          <ul style="list-style: none; padding: 0; margin: 0;">
            <li style="margin-bottom: 8px;">📧 <strong>Username:</strong> ${email}</li>
            <li>🔑 <strong>Password:</strong> ${password}</li>
          </ul>
        </div>
        <p style="color: #ef4444; font-size: 13px; font-weight: bold;">⚠️ Security Alert: Please change your password immediately after logging in.</p>
      </div>
      ${getEmailFooter()}
    </div>`;
  await sendBrevoEmail(email, subject, html);
};

/* =======================
    3. 📩 COMPLAINT CONFIRMATION
======================= */
const sendComplaintConfirmation = async (email, name, complaintId) => {
  const subject = `Complaint Received: #${complaintId}`;
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e2e8f0; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
      ${getEmailHeader("Complaint Acknowledgment")}
      <div style="padding: 30px; background-color: #ffffff;">
        <p style="font-size: 16px; color: #334155;">Hello <strong>${name}</strong>,</p>
        <p style="color: #475569; line-height: 1.6;">This is to confirm that your complaint has been successfully received by the system.</p>
        
        <div style="text-align: center; margin: 25px 0;">
          <p style="font-size: 12px; text-transform: uppercase; color: #64748b; margin-bottom: 5px;">Complaint Reference ID</p>
          <span style="font-size: 24px; font-weight: bold; color: #2563eb; background-color: #eff6ff; padding: 10px 20px; border-radius: 50px;">#${complaintId}</span>
        </div>

        <p style="color: #475569; font-size: 14px;">The concerned authority will review your complaint shortly. You can track the live status on your dashboard.</p>
      </div>
      ${getEmailFooter()}
    </div>`;
  await sendBrevoEmail(email, subject, html);
};

/* =======================
    4. 🚨 STATUS / FIR UPDATE
======================= */
const sendStatusUpdateEmail = async (email, report, status, officerRemark) => {
  const subject = `Case Update: #${report._id} - ${status}`;
  const isOfficialFiling = status.includes("FIR") || status.includes("NCR");
  let title = isOfficialFiling ? `OFFICIAL ${status} GENERATED` : `CASE STATUS UPDATED: ${status}`;
  
  const html = generateCaseEmailTemplate(report, title, officerRemark);
  await sendBrevoEmail(email, subject, html);
};

/* =======================
    5. 🛡️ ADMIN NOTIFICATION (Owner Alert)
======================= */
const sendAdminAlert = async (action, user) => {
  const ownerEmail = "sushanttelekune@gmail.com";
  const subject = `Admin Alert: User ${action} - ${user.name}`;
  const time = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

  const colorMap = {
    'Signup': '#16a34a', // Green
    'Login': '#2563eb',  // Blue
    'Logout': '#dc2626'  // Red
  };
  const color = colorMap[action] || '#64748b';

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
      ${getEmailHeader("Admin Security Alert")}
      <div style="padding: 25px; background-color: #fff;">
         <h3 style="color: ${color}; border-bottom: 2px solid ${color}; padding-bottom: 10px; margin-top: 0;">
           ${action.toUpperCase()} DETECTED
         </h3>
         <p style="margin: 5px 0 15px; font-size: 14px; color: #64748b;"><strong>Timestamp:</strong> ${time}</p>
         
         <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
           <tr style="background-color: #f8fafc;"><td style="padding: 10px; border-bottom: 1px solid #eee; width: 30%;"><strong>Name:</strong></td><td style="padding: 10px; border-bottom: 1px solid #eee;">${user.name}</td></tr>
           <tr><td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Role:</strong></td><td style="padding: 10px; border-bottom: 1px solid #eee;"><span style="background-color: #e2e8f0; padding: 2px 8px; border-radius: 4px; font-weight: bold; font-size: 12px; text-transform: uppercase;">${user.role}</span></td></tr>
           <tr style="background-color: #f8fafc;"><td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Email:</strong></td><td style="padding: 10px; border-bottom: 1px solid #eee;">${user.email}</td></tr>
           <tr><td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>User ID:</strong></td><td style="padding: 10px; border-bottom: 1px solid #eee; font-family: monospace;">${user._id}</td></tr>
         </table>
      </div>
      ${getEmailFooter()}
    </div>
  `;
  await sendBrevoEmail(ownerEmail, subject, html);
};

module.exports = { 
  sendOtpEmail, 
  sendWelcomeEmail, 
  sendComplaintConfirmation, 
  sendStatusUpdateEmail,
  sendAdminAlert // ✅ Exported new function
};