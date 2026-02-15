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
















// const axios = require('axios');

// // 👇 YAHAN APNA CLOUDINARY LOGO LINK DAALO
// const LOGO_URL = "https://res.cloudinary.com/dukrcgv8s/image/upload/v1770304918/CrimeTrack_abbtdr.png"; 

// // --- 🎨 HELPER: Common Email Header (Logo + Title) ---
// const getEmailHeader = (title) => {
//   return `
//     <div style="background-color: #0F172A; color: white; padding: 25px; text-align: center; border-top-left-radius: 8px; border-top-right-radius: 8px;">
//       <img src="${LOGO_URL}" alt="CrimeTrack Logo" style="width: 60px; height: 60px; margin-bottom: 10px; object-fit: contain;" />
//       <h2 style="margin: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 20px; letter-spacing: 1px;">CRIMETRACK</h2>
//       <p style="margin: 5px 0 0; font-size: 12px; text-transform: uppercase; opacity: 0.8;">${title}</p>
//     </div>
//   `;
// };

// // --- 🎨 HELPER: Common Footer ---
// const getEmailFooter = () => {
//   return `
//     <div style="background-color: #f1f5f9; color: #64748b; padding: 15px; text-align: center; font-size: 11px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;">
//       <p style="margin: 0;">This is a system-generated email from the CrimeTrack Digital Policing Network.</p>
//       <p style="margin: 5px 0 0;">&copy; ${new Date().getFullYear()} CrimeTrack. All rights reserved.</p>
//     </div>
//   `;
// };

// // --- 🛠️ HELPER: Generate Detailed HTML Template (For FIR/Status) ---
// const generateCaseEmailTemplate = (report, title, highlightRemark = "") => {
//   const record = report.officialRecord || {};
  
//   // Formatting Dates
//   const recordDate = record.recordDate ? new Date(record.recordDate).toLocaleString() : "N/A";
//   const incidentDate = record.occurrenceDate ? `${record.occurrenceDate} at ${record.occurrenceTime}` : "N/A";

//   // Acts String
//   const actsString = record.acts && record.acts.length > 0 
//     ? record.acts.map(a => `${a.actName} (Sec: ${a.section})`).join(', ') 
//     : "N/A";

//   return `
//     <div style="font-family: Arial, sans-serif; max-width: 700px; margin: auto; border: 1px solid #e2e8f0; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
      
//       ${getEmailHeader("Official Notification")}

//       <div style="background-color: #ffffff; padding: 20px; border-bottom: 2px solid #3b82f6;">
//         <h3 style="color: #1e40af; margin-top: 0; font-size: 18px;">${title}</h3>
//         <p style="font-size: 14px; color: #475569; line-height: 1.5;">
//           <strong>Case ID:</strong> #${report._id} <br/>
//           <strong>Police Station:</strong> ${report.selectedStation}
//         </p>
        
//         ${highlightRemark ? `
//         <div style="background-color: #fff7ed; border-left: 4px solid #f97316; padding: 15px; margin-top: 15px; border-radius: 4px;">
//           <p style="margin: 0; font-size: 11px; color: #9a3412; font-weight: bold; text-transform: uppercase;">Officer's Remark:</p>
//           <p style="margin: 5px 0 0; font-size: 14px; color: #1e293b; font-style: italic;">"${highlightRemark}"</p>
//         </div>` : ''}
//       </div>

//       <div style="padding: 20px; background-color: #ffffff;">
//         <h4 style="border-bottom: 1px solid #cbd5e1; padding-bottom: 8px; color: #334155; font-size: 14px; margin-top: 0;">OFFICIAL RECORD DETAILS</h4>
        
//         <table style="width: 100%; border-collapse: collapse; font-size: 13px; margin-top: 10px;">
          
//           <tr style="background-color: #f8fafc;">
//             <td style="padding: 10px; border: 1px solid #cbd5e1; font-weight: bold; width: 40%;">Record Number</td>
//             <td style="padding: 10px; border: 1px solid #cbd5e1; color: #b91c1c; font-weight: bold;">${record.recordNumber || "Pending"}</td>
//           </tr>
//           <tr>
//             <td style="padding: 10px; border: 1px solid #cbd5e1; font-weight: bold;">Filing Date</td>
//             <td style="padding: 10px; border: 1px solid #cbd5e1;">${recordDate}</td>
//           </tr>
//           <tr style="background-color: #f8fafc;">
//             <td style="padding: 10px; border: 1px solid #cbd5e1; font-weight: bold;">Applicable Acts</td>
//             <td style="padding: 10px; border: 1px solid #cbd5e1;">${actsString}</td>
//           </tr>
//           <tr>
//             <td style="padding: 10px; border: 1px solid #cbd5e1; font-weight: bold;">Incident Location</td>
//             <td style="padding: 10px; border: 1px solid #cbd5e1;">${record.incidentPlace || report.incidentLocationAddress || "N/A"}</td>
//           </tr>
//           <tr style="background-color: #f8fafc;">
//             <td style="padding: 10px; border: 1px solid #cbd5e1; font-weight: bold;">Occurrence</td>
//             <td style="padding: 10px; border: 1px solid #cbd5e1;">${incidentDate}</td>
//           </tr>
//           <tr>
//             <td style="padding: 10px; border: 1px solid #cbd5e1; font-weight: bold;">Officer In-Charge</td>
//             <td style="padding: 10px; border: 1px solid #cbd5e1;">${record.investigatingOfficer || report.assignedOfficer} (${record.rank || "Officer"})</td>
//           </tr>

//         </table>

//         <h4 style="border-bottom: 1px solid #cbd5e1; padding-bottom: 8px; color: #334155; margin-top: 25px; font-size: 14px;">PERSONS INVOLVED</h4>
//         <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
//           <thead style="background-color: #e2e8f0;">
//             <tr>
//               <th style="padding: 8px; border: 1px solid #cbd5e1; text-align: left;">Role</th>
//               <th style="padding: 8px; border: 1px solid #cbd5e1; text-align: left;">Name</th>
//               <th style="padding: 8px; border: 1px solid #cbd5e1; text-align: left;">Details</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td style="padding: 8px; border: 1px solid #cbd5e1; font-weight: bold;">Complainant</td>
//               <td style="padding: 8px; border: 1px solid #cbd5e1;">${record.complainant?.fullName || report.reporterName}</td>
//               <td style="padding: 8px; border: 1px solid #cbd5e1;">${record.complainant?.mobile || "N/A"}</td>
//             </tr>
//             <tr>
//               <td style="padding: 8px; border: 1px solid #cbd5e1; font-weight: bold; color: #047857;">Victim</td>
//               <td style="padding: 8px; border: 1px solid #cbd5e1;">${record.victim?.fullName || report.victimName}</td>
//               <td style="padding: 8px; border: 1px solid #cbd5e1;">Age: ${record.victim?.age || report.victimAge || "N/A"}</td>
//             </tr>
//             <tr>
//               <td style="padding: 8px; border: 1px solid #cbd5e1; font-weight: bold; color: #b91c1c;">Accused</td>
//               <td style="padding: 8px; border: 1px solid #cbd5e1;">${record.accused?.fullName || report.suspectName || "Unknown"}</td>
//               <td style="padding: 8px; border: 1px solid #cbd5e1;">${record.accused?.address || "N/A"}</td>
//             </tr>
//           </tbody>
//         </table>
//       </div>

//       ${getEmailFooter()}
//     </div>
//   `;
// };

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
//   }
// };

// /* =======================
//     1. 🔐 OTP EMAIL
// ======================= */
// const sendOtpEmail = async (email, otp) => {
//   const subject = "Verification Code - CrimeTrack";
//   const html = `
//     <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto; border: 1px solid #e2e8f0; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
//       ${getEmailHeader("Secure Verification")}
//       <div style="padding: 30px; text-align: center; background-color: #ffffff;">
//         <p style="font-size: 16px; color: #334155;">Your One-Time Password (OTP) is:</p>
//         <div style="background-color: #f1f5f9; display: inline-block; padding: 15px 30px; margin: 20px 0; border-radius: 8px; letter-spacing: 5px; font-size: 32px; font-weight: bold; color: #0F172A; border: 1px dashed #94a3b8;">
//           ${otp}
//         </div>
//         <p style="font-size: 13px; color: #64748b;">This code is valid for 10 minutes. Do not share it with anyone.</p>
//       </div>
//       ${getEmailFooter()}
//     </div>
//   `;
//   await sendBrevoEmail(email, subject, html);
// };

// /* =======================
//     2. 👋 WELCOME EMAIL
// ======================= */
// const sendWelcomeEmail = async (email, name, password) => {
//   const subject = "Welcome to CrimeTrack - Registration Successful";
//   const html = `
//     <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e2e8f0; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
//       ${getEmailHeader("Registration Successful")}
//       <div style="padding: 30px; background-color: #ffffff;">
//         <p style="font-size: 16px; color: #334155;">Hello <strong>${name}</strong>,</p>
//         <p style="color: #475569; line-height: 1.6;">Welcome to the CrimeTrack Portal. Your account has been successfully created. You can now access digital policing services securely.</p>
        
//         <div style="background-color: #f8fafc; padding: 20px; border-radius: 6px; margin: 20px 0; border: 1px solid #e2e8f0;">
//           <p style="margin: 0 0 10px; font-weight: bold; color: #0F172A; text-transform: uppercase; font-size: 12px;">Your Login Credentials:</p>
//           <ul style="list-style: none; padding: 0; margin: 0;">
//             <li style="margin-bottom: 8px;">📧 <strong>Username:</strong> ${email}</li>
//             <li>🔑 <strong>Password:</strong> ${password}</li>
//           </ul>
//         </div>
//         <p style="color: #ef4444; font-size: 13px; font-weight: bold;">⚠️ Security Alert: Please change your password immediately after logging in.</p>
//       </div>
//       ${getEmailFooter()}
//     </div>`;
//   await sendBrevoEmail(email, subject, html);
// };

// /* =======================
//     3. 📩 COMPLAINT CONFIRMATION
// ======================= */
// const sendComplaintConfirmation = async (email, name, complaintId) => {
//   const subject = `Complaint Received: #${complaintId}`;
//   const html = `
//     <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e2e8f0; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
//       ${getEmailHeader("Complaint Acknowledgment")}
//       <div style="padding: 30px; background-color: #ffffff;">
//         <p style="font-size: 16px; color: #334155;">Hello <strong>${name}</strong>,</p>
//         <p style="color: #475569; line-height: 1.6;">This is to confirm that your complaint has been successfully received by the system.</p>
        
//         <div style="text-align: center; margin: 25px 0;">
//           <p style="font-size: 12px; text-transform: uppercase; color: #64748b; margin-bottom: 5px;">Complaint Reference ID</p>
//           <span style="font-size: 24px; font-weight: bold; color: #2563eb; background-color: #eff6ff; padding: 10px 20px; border-radius: 50px;">#${complaintId}</span>
//         </div>

//         <p style="color: #475569; font-size: 14px;">The concerned authority will review your complaint shortly. You can track the live status on your dashboard.</p>
//       </div>
//       ${getEmailFooter()}
//     </div>`;
//   await sendBrevoEmail(email, subject, html);
// };

// /* =======================
//     4. 🚨 STATUS / FIR UPDATE
// ======================= */
// const sendStatusUpdateEmail = async (email, report, status, officerRemark) => {
//   const subject = `Case Update: #${report._id} - ${status}`;
//   const isOfficialFiling = status.includes("FIR") || status.includes("NCR");
//   let title = isOfficialFiling ? `OFFICIAL ${status} GENERATED` : `CASE STATUS UPDATED: ${status}`;
  
//   const html = generateCaseEmailTemplate(report, title, officerRemark);
//   await sendBrevoEmail(email, subject, html);
// };

// /* =======================
//     5. 🛡️ ADMIN NOTIFICATION (Owner Alert)
// ======================= */
// const sendAdminAlert = async (action, user) => {
//   const ownerEmail = "sushanttelekune@gmail.com";
//   const subject = `Admin Alert: User ${action} - ${user.name}`;
//   const time = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

//   const colorMap = {
//     'Signup': '#16a34a', // Green
//     'Login': '#2563eb',  // Blue
//     'Logout': '#dc2626'  // Red
//   };
//   const color = colorMap[action] || '#64748b';

//   const html = `
//     <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
//       ${getEmailHeader("Admin Security Alert")}
//       <div style="padding: 25px; background-color: #fff;">
//          <h3 style="color: ${color}; border-bottom: 2px solid ${color}; padding-bottom: 10px; margin-top: 0;">
//            ${action.toUpperCase()} DETECTED
//          </h3>
//          <p style="margin: 5px 0 15px; font-size: 14px; color: #64748b;"><strong>Timestamp:</strong> ${time}</p>
         
//          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
//            <tr style="background-color: #f8fafc;"><td style="padding: 10px; border-bottom: 1px solid #eee; width: 30%;"><strong>Name:</strong></td><td style="padding: 10px; border-bottom: 1px solid #eee;">${user.name}</td></tr>
//            <tr><td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Role:</strong></td><td style="padding: 10px; border-bottom: 1px solid #eee;"><span style="background-color: #e2e8f0; padding: 2px 8px; border-radius: 4px; font-weight: bold; font-size: 12px; text-transform: uppercase;">${user.role}</span></td></tr>
//            <tr style="background-color: #f8fafc;"><td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Email:</strong></td><td style="padding: 10px; border-bottom: 1px solid #eee;">${user.email}</td></tr>
//            <tr><td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>User ID:</strong></td><td style="padding: 10px; border-bottom: 1px solid #eee; font-family: monospace;">${user._id}</td></tr>
//          </table>
//       </div>
//       ${getEmailFooter()}
//     </div>
//   `;
//   await sendBrevoEmail(ownerEmail, subject, html);
// };

// module.exports = { 
//   sendOtpEmail, 
//   sendWelcomeEmail, 
//   sendComplaintConfirmation, 
//   sendStatusUpdateEmail,
//   sendAdminAlert // ✅ Exported new function
// };

















//Changes 09 feb 


// const axios = require('axios');

// // 👇 YAHAN APNA CLOUDINARY LOGO LINK DAALO
// const LOGO_URL = "https://res.cloudinary.com/dukrcgv8s/image/upload/v1770304918/CrimeTrack_abbtdr.png"; 

// // --- 🎨 HELPER: Common Email Header (Logo + Title) ---
// const getEmailHeader = (title) => {
//   return `
//     <div style="background-color: #0F172A; color: white; padding: 25px; text-align: center; border-top-left-radius: 8px; border-top-right-radius: 8px;">
//       <img src="${LOGO_URL}" alt="CrimeTrack Logo" style="width: 60px; height: 60px; margin-bottom: 10px; object-fit: contain;" />
//       <h2 style="margin: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 20px; letter-spacing: 1px;">CRIMETRACK</h2>
//       <p style="margin: 5px 0 0; font-size: 12px; text-transform: uppercase; opacity: 0.8;">${title}</p>
//     </div>
//   `;
// };

// // --- 🎨 HELPER: Common Footer ---
// const getEmailFooter = () => {
//   return `
//     <div style="background-color: #f1f5f9; color: #64748b; padding: 15px; text-align: center; font-size: 11px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;">
//       <p style="margin: 0;">This is a system-generated email from the CrimeTrack Digital Policing Network.</p>
//       <p style="margin: 5px 0 0;">&copy; ${new Date().getFullYear()} CrimeTrack. All rights reserved.</p>
//     </div>
//   `;
// };

// // --- 🛠️ HELPER: Generate Detailed HTML Template (For FIR/Status) ---
// const generateCaseEmailTemplate = (report, title, highlightRemark = "") => {
//   const record = report.officialRecord || {};
  
//   // Formatting Dates
//   const recordDate = record.recordDate ? new Date(record.recordDate).toLocaleString() : "N/A";
//   const incidentDate = record.occurrenceDate ? `${record.occurrenceDate} at ${record.occurrenceTime}` : "N/A";

//   // Acts String
//   const actsString = record.acts && record.acts.length > 0 
//     ? record.acts.map(a => `${a.actName} (Sec: ${a.section})`).join(', ') 
//     : "N/A";

//   return `
//     <div style="font-family: Arial, sans-serif; max-width: 700px; margin: auto; border: 1px solid #e2e8f0; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
      
//       ${getEmailHeader("Official Notification")}

//       <div style="background-color: #ffffff; padding: 20px; border-bottom: 2px solid #3b82f6;">
//         <h3 style="color: #1e40af; margin-top: 0; font-size: 18px;">${title}</h3>
//         <p style="font-size: 14px; color: #475569; line-height: 1.5;">
//           <strong>Case ID:</strong> #${report._id} <br/>
//           <strong>Police Station:</strong> ${report.selectedStation}
//         </p>
        
//         ${highlightRemark ? `
//         <div style="background-color: #fff7ed; border-left: 4px solid #f97316; padding: 15px; margin-top: 15px; border-radius: 4px;">
//           <p style="margin: 0; font-size: 11px; color: #9a3412; font-weight: bold; text-transform: uppercase;">Officer's Remark:</p>
//           <p style="margin: 5px 0 0; font-size: 14px; color: #1e293b; font-style: italic;">"${highlightRemark}"</p>
//         </div>` : ''}
//       </div>

//       <div style="padding: 20px; background-color: #ffffff;">
//         <h4 style="border-bottom: 1px solid #cbd5e1; padding-bottom: 8px; color: #334155; font-size: 14px; margin-top: 0;">OFFICIAL RECORD DETAILS</h4>
        
//         <table style="width: 100%; border-collapse: collapse; font-size: 13px; margin-top: 10px;">
          
//           <tr style="background-color: #f8fafc;">
//             <td style="padding: 10px; border: 1px solid #cbd5e1; font-weight: bold; width: 40%;">Record Number</td>
//             <td style="padding: 10px; border: 1px solid #cbd5e1; color: #b91c1c; font-weight: bold;">${record.recordNumber || "Pending"}</td>
//           </tr>
//           <tr>
//             <td style="padding: 10px; border: 1px solid #cbd5e1; font-weight: bold;">Filing Date</td>
//             <td style="padding: 10px; border: 1px solid #cbd5e1;">${recordDate}</td>
//           </tr>
//           <tr style="background-color: #f8fafc;">
//             <td style="padding: 10px; border: 1px solid #cbd5e1; font-weight: bold;">Applicable Acts</td>
//             <td style="padding: 10px; border: 1px solid #cbd5e1;">${actsString}</td>
//           </tr>
//           <tr>
//             <td style="padding: 10px; border: 1px solid #cbd5e1; font-weight: bold;">Incident Location</td>
//             <td style="padding: 10px; border: 1px solid #cbd5e1;">${record.incidentPlace || report.incidentLocationAddress || "N/A"}</td>
//           </tr>
//           <tr style="background-color: #f8fafc;">
//             <td style="padding: 10px; border: 1px solid #cbd5e1; font-weight: bold;">Occurrence</td>
//             <td style="padding: 10px; border: 1px solid #cbd5e1;">${incidentDate}</td>
//           </tr>
//           <tr>
//             <td style="padding: 10px; border: 1px solid #cbd5e1; font-weight: bold;">Officer In-Charge</td>
//             <td style="padding: 10px; border: 1px solid #cbd5e1;">${record.investigatingOfficer || report.assignedOfficer} (${record.rank || "Officer"})</td>
//           </tr>

//         </table>

//         <h4 style="border-bottom: 1px solid #cbd5e1; padding-bottom: 8px; color: #334155; margin-top: 25px; font-size: 14px;">PERSONS INVOLVED</h4>
//         <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
//           <thead style="background-color: #e2e8f0;">
//             <tr>
//               <th style="padding: 8px; border: 1px solid #cbd5e1; text-align: left;">Role</th>
//               <th style="padding: 8px; border: 1px solid #cbd5e1; text-align: left;">Name</th>
//               <th style="padding: 8px; border: 1px solid #cbd5e1; text-align: left;">Details</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td style="padding: 8px; border: 1px solid #cbd5e1; font-weight: bold;">Complainant</td>
//               <td style="padding: 8px; border: 1px solid #cbd5e1;">${record.complainant?.fullName || report.reporterName}</td>
//               <td style="padding: 8px; border: 1px solid #cbd5e1;">${record.complainant?.mobile || "N/A"}</td>
//             </tr>
//             <tr>
//               <td style="padding: 8px; border: 1px solid #cbd5e1; font-weight: bold; color: #047857;">Victim</td>
//               <td style="padding: 8px; border: 1px solid #cbd5e1;">${record.victim?.fullName || report.victimName}</td>
//               <td style="padding: 8px; border: 1px solid #cbd5e1;">Age: ${record.victim?.age || report.victimAge || "N/A"}</td>
//             </tr>
//             <tr>
//               <td style="padding: 8px; border: 1px solid #cbd5e1; font-weight: bold; color: #b91c1c;">Accused</td>
//               <td style="padding: 8px; border: 1px solid #cbd5e1;">${record.accused?.fullName || report.suspectName || "Unknown"}</td>
//               <td style="padding: 8px; border: 1px solid #cbd5e1;">${record.accused?.address || "N/A"}</td>
//             </tr>
//           </tbody>
//         </table>
//       </div>

//       ${getEmailFooter()}
//     </div>
//   `;
// };

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
//   }
// };

// /* =======================
//    1. 🔐 OTP EMAIL (Signup/Forgot Password)
// ======================= */
// const sendOtpEmail = async (email, otp) => {
//   const subject = "Verification Code - CrimeTrack";
//   const html = `
//     <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto; border: 1px solid #e2e8f0; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
//       ${getEmailHeader("Secure Verification")}
//       <div style="padding: 30px; text-align: center; background-color: #ffffff;">
//         <p style="font-size: 16px; color: #334155;">Your One-Time Password (OTP) is:</p>
//         <div style="background-color: #f1f5f9; display: inline-block; padding: 15px 30px; margin: 20px 0; border-radius: 8px; letter-spacing: 5px; font-size: 32px; font-weight: bold; color: #0F172A; border: 1px dashed #94a3b8;">
//           ${otp}
//         </div>
//         <p style="font-size: 13px; color: #64748b;">This code is valid for 10 minutes. Do not share it with anyone.</p>
//       </div>
//       ${getEmailFooter()}
//     </div>
//   `;
//   await sendBrevoEmail(email, subject, html);
// };

// /* =======================
//    2. 👋 WELCOME EMAIL
// ======================= */
// const sendWelcomeEmail = async (email, name, password) => {
//   const subject = "Welcome to CrimeTrack - Registration Successful";
//   const html = `
//     <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e2e8f0; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
//       ${getEmailHeader("Registration Successful")}
//       <div style="padding: 30px; background-color: #ffffff;">
//         <p style="font-size: 16px; color: #334155;">Hello <strong>${name}</strong>,</p>
//         <p style="color: #475569; line-height: 1.6;">Welcome to the CrimeTrack Portal. Your account has been successfully created. You can now access digital policing services securely.</p>
        
//         <div style="background-color: #f8fafc; padding: 20px; border-radius: 6px; margin: 20px 0; border: 1px solid #e2e8f0;">
//           <p style="margin: 0 0 10px; font-weight: bold; color: #0F172A; text-transform: uppercase; font-size: 12px;">Your Login Credentials:</p>
//           <ul style="list-style: none; padding: 0; margin: 0;">
//             <li style="margin-bottom: 8px;">📧 <strong>Username:</strong> ${email}</li>
//             <li>🔑 <strong>Password:</strong> ${password}</li>
//           </ul>
//         </div>
//         <p style="color: #ef4444; font-size: 13px; font-weight: bold;">⚠️ Security Alert: Please change your password immediately after logging in.</p>
//       </div>
//       ${getEmailFooter()}
//     </div>`;
//   await sendBrevoEmail(email, subject, html);
// };

// /* =======================
//    3. 📩 COMPLAINT CONFIRMATION
// ======================= */
// const sendComplaintConfirmation = async (email, name, complaintId) => {
//   const subject = `Complaint Received: #${complaintId}`;
//   const html = `
//     <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e2e8f0; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
//       ${getEmailHeader("Complaint Acknowledgment")}
//       <div style="padding: 30px; background-color: #ffffff;">
//         <p style="font-size: 16px; color: #334155;">Hello <strong>${name}</strong>,</p>
//         <p style="color: #475569; line-height: 1.6;">This is to confirm that your complaint has been successfully received by the system.</p>
        
//         <div style="text-align: center; margin: 25px 0;">
//           <p style="font-size: 12px; text-transform: uppercase; color: #64748b; margin-bottom: 5px;">Complaint Reference ID</p>
//           <span style="font-size: 24px; font-weight: bold; color: #2563eb; background-color: #eff6ff; padding: 10px 20px; border-radius: 50px;">#${complaintId}</span>
//         </div>

//         <p style="color: #475569; font-size: 14px;">The concerned authority will review your complaint shortly. You can track the live status on your dashboard.</p>
//       </div>
//       ${getEmailFooter()}
//     </div>`;
//   await sendBrevoEmail(email, subject, html);
// };

// /* =======================
//    4. 🚨 STATUS / FIR UPDATE
// ======================= */
// const sendStatusUpdateEmail = async (email, report, status, officerRemark) => {
//   const subject = `Case Update: #${report._id} - ${status}`;
//   const isOfficialFiling = status.includes("FIR") || status.includes("NCR");
//   let title = isOfficialFiling ? `OFFICIAL ${status} GENERATED` : `CASE STATUS UPDATED: ${status}`;
  
//   const html = generateCaseEmailTemplate(report, title, officerRemark);
//   await sendBrevoEmail(email, subject, html);
// };

// /* =======================
//    5. 🛡️ ADMIN NOTIFICATION (Owner Alert)
// ======================= */
// const sendAdminAlert = async (action, user) => {
//   const ownerEmail = "sushanttelekune@gmail.com";
//   const subject = `Admin Alert: User ${action} - ${user.name}`;
//   const time = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

//   const colorMap = {
//     'Signup': '#16a34a', // Green
//     'Login': '#2563eb',  // Blue
//     'Logout': '#dc2626'  // Red
//   };
//   const color = colorMap[action] || '#64748b';

//   const html = `
//     <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
//       ${getEmailHeader("Admin Security Alert")}
//       <div style="padding: 25px; background-color: #fff;">
//          <h3 style="color: ${color}; border-bottom: 2px solid ${color}; padding-bottom: 10px; margin-top: 0;">
//            ${action.toUpperCase()} DETECTED
//          </h3>
//          <p style="margin: 5px 0 15px; font-size: 14px; color: #64748b;"><strong>Timestamp:</strong> ${time}</p>
         
//          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
//            <tr style="background-color: #f8fafc;"><td style="padding: 10px; border-bottom: 1px solid #eee; width: 30%;"><strong>Name:</strong></td><td style="padding: 10px; border-bottom: 1px solid #eee;">${user.name}</td></tr>
//            <tr><td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Role:</strong></td><td style="padding: 10px; border-bottom: 1px solid #eee;"><span style="background-color: #e2e8f0; padding: 2px 8px; border-radius: 4px; font-weight: bold; font-size: 12px; text-transform: uppercase;">${user.role}</span></td></tr>
//            <tr style="background-color: #f8fafc;"><td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Email:</strong></td><td style="padding: 10px; border-bottom: 1px solid #eee;">${user.email}</td></tr>
//            <tr><td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>User ID:</strong></td><td style="padding: 10px; border-bottom: 1px solid #eee; font-family: monospace;">${user._id}</td></tr>
//          </table>
//       </div>
//       ${getEmailFooter()}
//     </div>
//   `;
//   await sendBrevoEmail(ownerEmail, subject, html);
// };

// /* =======================
//    6. 📹 MEETING INVITE (RESTORED from previous update)
// ======================= */
// const sendMeetingInvite = async (email, name, meetingDetails) => {
//   const subject = `Meeting Invitation: ${meetingDetails.title}`;
//   const meetingTime = new Date(meetingDetails.scheduledTime).toLocaleString();
  
//   const html = `
//     <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
//       ${getEmailHeader("Meeting Invitation")}
//       <div style="padding: 30px; background-color: #ffffff;">
//         <p style="font-size: 16px; color: #334155;">Hello <strong>${name}</strong>,</p>
//         <p style="color: #475569; line-height: 1.6;">You have been invited to an official online meeting regarding a case/inquiry.</p>
        
//         <div style="background-color: #f8fafc; padding: 20px; border-radius: 6px; margin: 20px 0; border: 1px solid #e2e8f0;">
//           <p style="margin: 0 0 10px; font-weight: bold; color: #0F172A; text-transform: uppercase; font-size: 12px;">Meeting Details:</p>
//           <ul style="list-style: none; padding: 0; margin: 0; color: #334155;">
//             <li style="margin-bottom: 8px;">📌 <strong>Topic:</strong> ${meetingDetails.title}</li>
//             <li style="margin-bottom: 8px;">⏰ <strong>Time:</strong> ${meetingTime}</li>
//             <li>📊 <strong>Status:</strong> Scheduled</li>
//           </ul>
//         </div>

//         <p style="color: #2563eb; font-size: 14px; font-weight: bold;">Please log in to your dashboard to join the meeting at the scheduled time.</p>
//       </div>
//       ${getEmailFooter()}
//     </div>
//   `;
//   await sendBrevoEmail(email, subject, html);
// };

// /* =======================
//    7. ✏️ PROFILE EDIT OTP (NEWLY ADDED)
// ======================= */
// const sendProfileOtpEmail = async (email, otp) => {
//   const subject = "Security Alert: Profile Edit Request";
//   const html = `
//     <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto; border: 1px solid #e2e8f0; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
//       ${getEmailHeader("Security Verification")}
//       <div style="padding: 30px; text-align: center; background-color: #ffffff;">
//         <p style="font-size: 16px; color: #b91c1c; font-weight: bold;">Action Required: Profile Update</p>
//         <p style="font-size: 14px; color: #334155;">You requested to edit your CrimeTrack profile details.</p>
        
//         <div style="background-color: #fef2f2; display: inline-block; padding: 15px 30px; margin: 20px 0; border-radius: 8px; letter-spacing: 5px; font-size: 32px; font-weight: bold; color: #dc2626; border: 1px dashed #f87171;">
//           ${otp}
//         </div>
//         <p style="font-size: 13px; color: #64748b;">If you did not request this, please change your password immediately.</p>
//       </div>
//       ${getEmailFooter()}
//     </div>
//   `;
//   await sendBrevoEmail(email, subject, html);
// };

// module.exports = { 
//   sendOtpEmail, 
//   sendWelcomeEmail, 
//   sendComplaintConfirmation, 
//   sendStatusUpdateEmail,
//   sendAdminAlert,
//   sendMeetingInvite,    // ✅ Restored Meeting Feature
//   sendProfileOtpEmail   // ✅ Added Profile Update Feature
// };















// const axios = require('axios');

// // 👇 YAHAN APNA CLOUDINARY LOGO LINK DAALO
// const LOGO_URL = "https://res.cloudinary.com/dukrcgv8s/image/upload/v1770304918/CrimeTrack_abbtdr.png"; 

// // --- 🎨 HELPER: Common Email Header (Logo + Title) ---
// const getEmailHeader = (title) => {
//   return `
//     <div style="background-color: #0F172A; color: white; padding: 25px; text-align: center; border-top-left-radius: 8px; border-top-right-radius: 8px;">
//       <img src="${LOGO_URL}" alt="CrimeTrack Logo" style="width: 60px; height: 60px; margin-bottom: 10px; object-fit: contain;" />
//       <h2 style="margin: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 20px; letter-spacing: 1px;">CRIMETRACK</h2>
//       <p style="margin: 5px 0 0; font-size: 12px; text-transform: uppercase; opacity: 0.8;">${title}</p>
//     </div>
//   `;
// };

// // --- 🎨 HELPER: Common Footer ---
// const getEmailFooter = () => {
//   return `
//     <div style="background-color: #f1f5f9; color: #64748b; padding: 15px; text-align: center; font-size: 11px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;">
//       <p style="margin: 0;">This is a system-generated email from the CrimeTrack Digital Policing Network.</p>
//       <p style="margin: 5px 0 0;">&copy; ${new Date().getFullYear()} CrimeTrack. All rights reserved.</p>
//     </div>
//   `;
// };

// // --- 🛠️ HELPER: Generate Detailed HTML Template (For FIR/Status) ---
// const generateCaseEmailTemplate = (report, title, highlightRemark = "") => {
//   const record = report.officialRecord || {};
  
//   // Formatting Dates
//   const recordDate = record.recordDate ? new Date(record.recordDate).toLocaleString() : "N/A";
//   const incidentDate = record.occurrenceDate ? `${record.occurrenceDate} at ${record.occurrenceTime}` : "N/A";

//   // Acts String
//   const actsString = record.acts && record.acts.length > 0 
//     ? record.acts.map(a => `${a.actName} (Sec: ${a.section})`).join(', ') 
//     : "N/A";

//   return `
//     <div style="font-family: Arial, sans-serif; max-width: 700px; margin: auto; border: 1px solid #e2e8f0; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
      
//       ${getEmailHeader("Official Notification")}

//       <div style="background-color: #ffffff; padding: 20px; border-bottom: 2px solid #3b82f6;">
//         <h3 style="color: #1e40af; margin-top: 0; font-size: 18px;">${title}</h3>
//         <p style="font-size: 14px; color: #475569; line-height: 1.5;">
//           <strong>Case ID:</strong> #${report._id} <br/>
//           <strong>Police Station:</strong> ${report.selectedStation}
//         </p>
        
//         ${highlightRemark ? `
//         <div style="background-color: #fff7ed; border-left: 4px solid #f97316; padding: 15px; margin-top: 15px; border-radius: 4px;">
//           <p style="margin: 0; font-size: 11px; color: #9a3412; font-weight: bold; text-transform: uppercase;">Officer's Remark:</p>
//           <p style="margin: 5px 0 0; font-size: 14px; color: #1e293b; font-style: italic;">"${highlightRemark}"</p>
//         </div>` : ''}
//       </div>

//       <div style="padding: 20px; background-color: #ffffff;">
//         <h4 style="border-bottom: 1px solid #cbd5e1; padding-bottom: 8px; color: #334155; font-size: 14px; margin-top: 0;">OFFICIAL RECORD DETAILS</h4>
        
//         <table style="width: 100%; border-collapse: collapse; font-size: 13px; margin-top: 10px;">
          
//           <tr style="background-color: #f8fafc;">
//             <td style="padding: 10px; border: 1px solid #cbd5e1; font-weight: bold; width: 40%;">Record Number</td>
//             <td style="padding: 10px; border: 1px solid #cbd5e1; color: #b91c1c; font-weight: bold;">${record.recordNumber || "Pending"}</td>
//           </tr>
//           <tr>
//             <td style="padding: 10px; border: 1px solid #cbd5e1; font-weight: bold;">Filing Date</td>
//             <td style="padding: 10px; border: 1px solid #cbd5e1;">${recordDate}</td>
//           </tr>
//           <tr style="background-color: #f8fafc;">
//             <td style="padding: 10px; border: 1px solid #cbd5e1; font-weight: bold;">Applicable Acts</td>
//             <td style="padding: 10px; border: 1px solid #cbd5e1;">${actsString}</td>
//           </tr>
//           <tr>
//             <td style="padding: 10px; border: 1px solid #cbd5e1; font-weight: bold;">Incident Location</td>
//             <td style="padding: 10px; border: 1px solid #cbd5e1;">${record.incidentPlace || report.incidentLocationAddress || "N/A"}</td>
//           </tr>
//           <tr style="background-color: #f8fafc;">
//             <td style="padding: 10px; border: 1px solid #cbd5e1; font-weight: bold;">Occurrence</td>
//             <td style="padding: 10px; border: 1px solid #cbd5e1;">${incidentDate}</td>
//           </tr>
//           <tr>
//             <td style="padding: 10px; border: 1px solid #cbd5e1; font-weight: bold;">Officer In-Charge</td>
//             <td style="padding: 10px; border: 1px solid #cbd5e1;">${record.investigatingOfficer || report.assignedOfficer} (${record.rank || "Officer"})</td>
//           </tr>

//         </table>

//         <h4 style="border-bottom: 1px solid #cbd5e1; padding-bottom: 8px; color: #334155; margin-top: 25px; font-size: 14px;">PERSONS INVOLVED</h4>
//         <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
//           <thead style="background-color: #e2e8f0;">
//             <tr>
//               <th style="padding: 8px; border: 1px solid #cbd5e1; text-align: left;">Role</th>
//               <th style="padding: 8px; border: 1px solid #cbd5e1; text-align: left;">Name</th>
//               <th style="padding: 8px; border: 1px solid #cbd5e1; text-align: left;">Details</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td style="padding: 8px; border: 1px solid #cbd5e1; font-weight: bold;">Complainant</td>
//               <td style="padding: 8px; border: 1px solid #cbd5e1;">${record.complainant?.fullName || report.reporterName}</td>
//               <td style="padding: 8px; border: 1px solid #cbd5e1;">${record.complainant?.mobile || "N/A"}</td>
//             </tr>
//             <tr>
//               <td style="padding: 8px; border: 1px solid #cbd5e1; font-weight: bold; color: #047857;">Victim</td>
//               <td style="padding: 8px; border: 1px solid #cbd5e1;">${record.victim?.fullName || report.victimName}</td>
//               <td style="padding: 8px; border: 1px solid #cbd5e1;">Age: ${record.victim?.age || report.victimAge || "N/A"}</td>
//             </tr>
//             <tr>
//               <td style="padding: 8px; border: 1px solid #cbd5e1; font-weight: bold; color: #b91c1c;">Accused</td>
//               <td style="padding: 8px; border: 1px solid #cbd5e1;">${record.accused?.fullName || report.suspectName || "Unknown"}</td>
//               <td style="padding: 8px; border: 1px solid #cbd5e1;">${record.accused?.address || "N/A"}</td>
//             </tr>
//           </tbody>
//         </table>
//       </div>

//       ${getEmailFooter()}
//     </div>
//   `;
// };

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
//   }
// };

// /* =======================
//    1. 🔐 OTP EMAIL
// ======================= */
// const sendOtpEmail = async (email, otp) => {
//   const subject = "Verification Code - CrimeTrack";
//   const html = `
//     <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto; border: 1px solid #e2e8f0; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
//       ${getEmailHeader("Secure Verification")}
//       <div style="padding: 30px; text-align: center; background-color: #ffffff;">
//         <p style="font-size: 16px; color: #334155;">Your One-Time Password (OTP) is:</p>
//         <div style="background-color: #f1f5f9; display: inline-block; padding: 15px 30px; margin: 20px 0; border-radius: 8px; letter-spacing: 5px; font-size: 32px; font-weight: bold; color: #0F172A; border: 1px dashed #94a3b8;">
//           ${otp}
//         </div>
//         <p style="font-size: 13px; color: #64748b;">This code is valid for 10 minutes. Do not share it with anyone.</p>
//       </div>
//       ${getEmailFooter()}
//     </div>
//   `;
//   await sendBrevoEmail(email, subject, html);
// };

// /* =======================
//    2. 👋 WELCOME EMAIL
// ======================= */
// const sendWelcomeEmail = async (email, name, password) => {
//   const subject = "Welcome to CrimeTrack - Registration Successful";
//   const html = `
//     <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e2e8f0; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
//       ${getEmailHeader("Registration Successful")}
//       <div style="padding: 30px; background-color: #ffffff;">
//         <p style="font-size: 16px; color: #334155;">Hello <strong>${name}</strong>,</p>
//         <p style="color: #475569; line-height: 1.6;">Welcome to the CrimeTrack Portal. Your account has been successfully created. You can now access digital policing services securely.</p>
        
//         <div style="background-color: #f8fafc; padding: 20px; border-radius: 6px; margin: 20px 0; border: 1px solid #e2e8f0;">
//           <p style="margin: 0 0 10px; font-weight: bold; color: #0F172A; text-transform: uppercase; font-size: 12px;">Your Login Credentials:</p>
//           <ul style="list-style: none; padding: 0; margin: 0;">
//             <li style="margin-bottom: 8px;">📧 <strong>Username:</strong> ${email}</li>
//             <li>🔑 <strong>Password:</strong> ${password}</li>
//           </ul>
//         </div>
//         <p style="color: #ef4444; font-size: 13px; font-weight: bold;">⚠️ Security Alert: Please change your password immediately after logging in.</p>
//       </div>
//       ${getEmailFooter()}
//     </div>`;
//   await sendBrevoEmail(email, subject, html);
// };

// /* =======================
//    3. 📩 COMPLAINT CONFIRMATION
// ======================= */
// const sendComplaintConfirmation = async (email, name, complaintId) => {
//   const subject = `Complaint Received: #${complaintId}`;
//   const html = `
//     <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e2e8f0; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
//       ${getEmailHeader("Complaint Acknowledgment")}
//       <div style="padding: 30px; background-color: #ffffff;">
//         <p style="font-size: 16px; color: #334155;">Hello <strong>${name}</strong>,</p>
//         <p style="color: #475569; line-height: 1.6;">This is to confirm that your complaint has been successfully received by the system.</p>
        
//         <div style="text-align: center; margin: 25px 0;">
//           <p style="font-size: 12px; text-transform: uppercase; color: #64748b; margin-bottom: 5px;">Complaint Reference ID</p>
//           <span style="font-size: 24px; font-weight: bold; color: #2563eb; background-color: #eff6ff; padding: 10px 20px; border-radius: 50px;">#${complaintId}</span>
//         </div>

//         <p style="color: #475569; font-size: 14px;">The concerned authority will review your complaint shortly. You can track the live status on your dashboard.</p>
//       </div>
//       ${getEmailFooter()}
//     </div>`;
//   await sendBrevoEmail(email, subject, html);
// };

// /* =======================
//    4. 🚨 STATUS / FIR UPDATE
// ======================= */
// const sendStatusUpdateEmail = async (email, report, status, officerRemark) => {
//   const subject = `Case Update: #${report._id} - ${status}`;
//   const isOfficialFiling = status.includes("FIR") || status.includes("NCR");
//   let title = isOfficialFiling ? `OFFICIAL ${status} GENERATED` : `CASE STATUS UPDATED: ${status}`;
  
//   const html = generateCaseEmailTemplate(report, title, officerRemark);
//   await sendBrevoEmail(email, subject, html);
// };

// /* =======================
//    5. 🛡️ ADMIN NOTIFICATION (Owner Alert)
// ======================= */
// const sendAdminAlert = async (action, user) => {
//   const ownerEmail = "sushanttelekune@gmail.com";
//   const subject = `Admin Alert: User ${action} - ${user.name}`;
//   const time = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

//   const colorMap = {
//     'Signup': '#16a34a', // Green
//     'Login': '#2563eb',  // Blue
//     'Logout': '#dc2626'  // Red
//   };
//   const color = colorMap[action] || '#64748b';

//   const html = `
//     <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
//       ${getEmailHeader("Admin Security Alert")}
//       <div style="padding: 25px; background-color: #fff;">
//          <h3 style="color: ${color}; border-bottom: 2px solid ${color}; padding-bottom: 10px; margin-top: 0;">
//            ${action.toUpperCase()} DETECTED
//          </h3>
//          <p style="margin: 5px 0 15px; font-size: 14px; color: #64748b;"><strong>Timestamp:</strong> ${time}</p>
         
//          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
//            <tr style="background-color: #f8fafc;"><td style="padding: 10px; border-bottom: 1px solid #eee; width: 30%;"><strong>Name:</strong></td><td style="padding: 10px; border-bottom: 1px solid #eee;">${user.name}</td></tr>
//            <tr><td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Role:</strong></td><td style="padding: 10px; border-bottom: 1px solid #eee;"><span style="background-color: #e2e8f0; padding: 2px 8px; border-radius: 4px; font-weight: bold; font-size: 12px; text-transform: uppercase;">${user.role}</span></td></tr>
//            <tr style="background-color: #f8fafc;"><td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Email:</strong></td><td style="padding: 10px; border-bottom: 1px solid #eee;">${user.email}</td></tr>
//            <tr><td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>User ID:</strong></td><td style="padding: 10px; border-bottom: 1px solid #eee; font-family: monospace;">${user._id}</td></tr>
//          </table>
//       </div>
//       ${getEmailFooter()}
//     </div>
//   `;
//   await sendBrevoEmail(ownerEmail, subject, html);
// };

// /* =======================
//    6. 📹 MEETING INVITE
// ======================= */
// const sendMeetingInvite = async (email, name, meetingDetails) => {
//   const subject = `Meeting Invitation: ${meetingDetails.title}`;
//   const meetingTime = new Date(meetingDetails.scheduledTime).toLocaleString();
  
//   const html = `
//     <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
//       ${getEmailHeader("Meeting Invitation")}
//       <div style="padding: 30px; background-color: #ffffff;">
//         <p style="font-size: 16px; color: #334155;">Hello <strong>${name}</strong>,</p>
//         <p style="color: #475569; line-height: 1.6;">You have been invited to an official online meeting regarding a case/inquiry.</p>
        
//         <div style="background-color: #f8fafc; padding: 20px; border-radius: 6px; margin: 20px 0; border: 1px solid #e2e8f0;">
//           <p style="margin: 0 0 10px; font-weight: bold; color: #0F172A; text-transform: uppercase; font-size: 12px;">Meeting Details:</p>
//           <ul style="list-style: none; padding: 0; margin: 0; color: #334155;">
//             <li style="margin-bottom: 8px;">📌 <strong>Topic:</strong> ${meetingDetails.title}</li>
//             <li style="margin-bottom: 8px;">⏰ <strong>Time:</strong> ${meetingTime}</li>
//             <li>📊 <strong>Status:</strong> Scheduled</li>
//           </ul>
//         </div>

//         <p style="color: #2563eb; font-size: 14px; font-weight: bold;">Please log in to your dashboard to join the meeting at the scheduled time.</p>
//       </div>
//       ${getEmailFooter()}
//     </div>
//   `;
//   await sendBrevoEmail(email, subject, html);
// };

// /* =======================
//    7. ✏️ PROFILE EDIT OTP
// ======================= */
// const sendProfileOtpEmail = async (email, otp) => {
//   const subject = "Security Alert: Profile Edit Request";
//   const html = `
//     <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto; border: 1px solid #e2e8f0; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
//       ${getEmailHeader("Security Verification")}
//       <div style="padding: 30px; text-align: center; background-color: #ffffff;">
//         <p style="font-size: 16px; color: #b91c1c; font-weight: bold;">Action Required: Profile Update</p>
//         <p style="font-size: 14px; color: #334155;">You requested to edit your CrimeTrack profile details.</p>
        
//         <div style="background-color: #fef2f2; display: inline-block; padding: 15px 30px; margin: 20px 0; border-radius: 8px; letter-spacing: 5px; font-size: 32px; font-weight: bold; color: #dc2626; border: 1px dashed #f87171;">
//           ${otp}
//         </div>
//         <p style="font-size: 13px; color: #64748b;">If you did not request this, please change your password immediately.</p>
//       </div>
//       ${getEmailFooter()}
//     </div>
//   `;
//   await sendBrevoEmail(email, subject, html);
// };

// /* =======================
//    8. ✅ PROFILE UPDATE SUCCESS EMAIL (NEW)
// ======================= */
// const sendProfileUpdateSuccessEmail = async (email, name) => {
//   const subject = "Profile Updated Successfully - CrimeTrack";
//   const html = `
//     <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e2e8f0; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
//       ${getEmailHeader("Profile Update Notification")}
//       <div style="padding: 30px; background-color: #ffffff;">
//         <p style="font-size: 16px; color: #334155;">Hello <strong>${name}</strong>,</p>
//         <p style="color: #475569; line-height: 1.6;">
//           Your CrimeTrack profile details have been successfully updated.
//         </p>
        
//         <div style="background-color: #f0fdf4; padding: 15px; border-left: 4px solid #16a34a; margin: 20px 0; border-radius: 4px;">
//           <p style="margin: 0; color: #166534; font-weight: bold;">✔ Update Confirmed</p>
//           <p style="margin: 5px 0 0; font-size: 13px; color: #15803d;">Your changes are now live in the system.</p>
//         </div>

//         <p style="font-size: 13px; color: #64748b;">If you did not make these changes, please contact support or reset your password immediately.</p>
//       </div>
//       ${getEmailFooter()}
//     </div>
//   `;
//   await sendBrevoEmail(email, subject, html);
// };

// module.exports = { 
//   sendOtpEmail, 
//   sendWelcomeEmail, 
//   sendComplaintConfirmation, 
//   sendStatusUpdateEmail,
//   sendAdminAlert,
//   sendMeetingInvite,    // ✅ Meeting Feature
//   sendProfileOtpEmail,  // ✅ Profile Edit OTP Feature
//   sendProfileUpdateSuccessEmail // ✅ Profile Update Success Notification
// };












// const axios = require('axios');

// // 👇 YAHAN APNA CLOUDINARY LOGO LINK DAALO
// const LOGO_URL = "https://res.cloudinary.com/dukrcgv8s/image/upload/v1770304918/CrimeTrack_abbtdr.png"; 

// // --- 🎨 HELPER: Common Email Header (Logo + Title) ---
// const getEmailHeader = (title) => {
//   return `
//     <div style="background-color: #0F172A; color: white; padding: 25px; text-align: center; border-top-left-radius: 8px; border-top-right-radius: 8px;">
//       <img src="${LOGO_URL}" alt="CrimeTrack Logo" style="width: 60px; height: 60px; margin-bottom: 10px; object-fit: contain;" />
//       <h2 style="margin: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 20px; letter-spacing: 1px;">CRIMETRACK</h2>
//       <p style="margin: 5px 0 0; font-size: 12px; text-transform: uppercase; opacity: 0.8;">${title}</p>
//     </div>
//   `;
// };

// // --- 🎨 HELPER: Common Footer ---
// const getEmailFooter = () => {
//   return `
//     <div style="background-color: #f1f5f9; color: #64748b; padding: 15px; text-align: center; font-size: 11px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;">
//       <p style="margin: 0;">This is a system-generated email from the CrimeTrack Digital Policing Network.</p>
//       <p style="margin: 5px 0 0;">&copy; ${new Date().getFullYear()} CrimeTrack. All rights reserved.</p>
//     </div>
//   `;
// };

// // --- 🛠️ HELPER: Generate Detailed HTML Template (For FIR/Status) ---
// const generateCaseEmailTemplate = (report, title, highlightRemark = "") => {
//   const record = report.officialRecord || {};
  
//   // Formatting Dates
//   const recordDate = record.recordDate ? new Date(record.recordDate).toLocaleString() : "N/A";
//   const incidentDate = record.occurrenceDate ? `${record.occurrenceDate} at ${record.occurrenceTime}` : "N/A";

//   // Acts String
//   const actsString = record.acts && record.acts.length > 0 
//     ? record.acts.map(a => `${a.actName} (Sec: ${a.section})`).join(', ') 
//     : "N/A";

//   return `
//     <div style="font-family: Arial, sans-serif; max-width: 700px; margin: auto; border: 1px solid #e2e8f0; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
      
//       ${getEmailHeader("Official Notification")}

//       <div style="background-color: #ffffff; padding: 20px; border-bottom: 2px solid #3b82f6;">
//         <h3 style="color: #1e40af; margin-top: 0; font-size: 18px;">${title}</h3>
//         <p style="font-size: 14px; color: #475569; line-height: 1.5;">
//           <strong>Case ID:</strong> #${report._id} <br/>
//           <strong>Police Station:</strong> ${report.selectedStation}
//         </p>
        
//         ${highlightRemark ? `
//         <div style="background-color: #fff7ed; border-left: 4px solid #f97316; padding: 15px; margin-top: 15px; border-radius: 4px;">
//           <p style="margin: 0; font-size: 11px; color: #9a3412; font-weight: bold; text-transform: uppercase;">Officer's Remark:</p>
//           <p style="margin: 5px 0 0; font-size: 14px; color: #1e293b; font-style: italic;">"${highlightRemark}"</p>
//         </div>` : ''}
//       </div>

//       <div style="padding: 20px; background-color: #ffffff;">
//         <h4 style="border-bottom: 1px solid #cbd5e1; padding-bottom: 8px; color: #334155; font-size: 14px; margin-top: 0;">OFFICIAL RECORD DETAILS</h4>
        
//         <table style="width: 100%; border-collapse: collapse; font-size: 13px; margin-top: 10px;">
          
//           <tr style="background-color: #f8fafc;">
//             <td style="padding: 10px; border: 1px solid #cbd5e1; font-weight: bold; width: 40%;">Record Number</td>
//             <td style="padding: 10px; border: 1px solid #cbd5e1; color: #b91c1c; font-weight: bold;">${record.recordNumber || "Pending"}</td>
//           </tr>
//           <tr>
//             <td style="padding: 10px; border: 1px solid #cbd5e1; font-weight: bold;">Filing Date</td>
//             <td style="padding: 10px; border: 1px solid #cbd5e1;">${recordDate}</td>
//           </tr>
//           <tr style="background-color: #f8fafc;">
//             <td style="padding: 10px; border: 1px solid #cbd5e1; font-weight: bold;">Applicable Acts</td>
//             <td style="padding: 10px; border: 1px solid #cbd5e1;">${actsString}</td>
//           </tr>
//           <tr>
//             <td style="padding: 10px; border: 1px solid #cbd5e1; font-weight: bold;">Incident Location</td>
//             <td style="padding: 10px; border: 1px solid #cbd5e1;">${record.incidentPlace || report.incidentLocationAddress || "N/A"}</td>
//           </tr>
//           <tr style="background-color: #f8fafc;">
//             <td style="padding: 10px; border: 1px solid #cbd5e1; font-weight: bold;">Occurrence</td>
//             <td style="padding: 10px; border: 1px solid #cbd5e1;">${incidentDate}</td>
//           </tr>
//           <tr>
//             <td style="padding: 10px; border: 1px solid #cbd5e1; font-weight: bold;">Officer In-Charge</td>
//             <td style="padding: 10px; border: 1px solid #cbd5e1;">${record.investigatingOfficer || report.assignedOfficer} (${record.rank || "Officer"})</td>
//           </tr>

//         </table>

//         <h4 style="border-bottom: 1px solid #cbd5e1; padding-bottom: 8px; color: #334155; margin-top: 25px; font-size: 14px;">PERSONS INVOLVED</h4>
//         <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
//           <thead style="background-color: #e2e8f0;">
//             <tr>
//               <th style="padding: 8px; border: 1px solid #cbd5e1; text-align: left;">Role</th>
//               <th style="padding: 8px; border: 1px solid #cbd5e1; text-align: left;">Name</th>
//               <th style="padding: 8px; border: 1px solid #cbd5e1; text-align: left;">Details</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td style="padding: 8px; border: 1px solid #cbd5e1; font-weight: bold;">Complainant</td>
//               <td style="padding: 8px; border: 1px solid #cbd5e1;">${record.complainant?.fullName || report.reporterName}</td>
//               <td style="padding: 8px; border: 1px solid #cbd5e1;">${record.complainant?.mobile || "N/A"}</td>
//             </tr>
//             <tr>
//               <td style="padding: 8px; border: 1px solid #cbd5e1; font-weight: bold; color: #047857;">Victim</td>
//               <td style="padding: 8px; border: 1px solid #cbd5e1;">${record.victim?.fullName || report.victimName}</td>
//               <td style="padding: 8px; border: 1px solid #cbd5e1;">Age: ${record.victim?.age || report.victimAge || "N/A"}</td>
//             </tr>
//             <tr>
//               <td style="padding: 8px; border: 1px solid #cbd5e1; font-weight: bold; color: #b91c1c;">Accused</td>
//               <td style="padding: 8px; border: 1px solid #cbd5e1;">${record.accused?.fullName || report.suspectName || "Unknown"}</td>
//               <td style="padding: 8px; border: 1px solid #cbd5e1;">${record.accused?.address || "N/A"}</td>
//             </tr>
//           </tbody>
//         </table>
//       </div>

//       ${getEmailFooter()}
//     </div>
//   `;
// };

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
//   }
// };

// /* =======================
//    1. 🔐 OTP EMAIL
// ======================= */
// const sendOtpEmail = async (email, otp) => {
//   const subject = "Verification Code - CrimeTrack";
//   const html = `
//     <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto; border: 1px solid #e2e8f0; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
//       ${getEmailHeader("Secure Verification")}
//       <div style="padding: 30px; text-align: center; background-color: #ffffff;">
//         <p style="font-size: 16px; color: #334155;">Your One-Time Password (OTP) is:</p>
//         <div style="background-color: #f1f5f9; display: inline-block; padding: 15px 30px; margin: 20px 0; border-radius: 8px; letter-spacing: 5px; font-size: 32px; font-weight: bold; color: #0F172A; border: 1px dashed #94a3b8;">
//           ${otp}
//         </div>
//         <p style="font-size: 13px; color: #64748b;">This code is valid for 10 minutes. Do not share it with anyone.</p>
//       </div>
//       ${getEmailFooter()}
//     </div>
//   `;
//   await sendBrevoEmail(email, subject, html);
// };

// /* =======================
//    2. 👋 WELCOME EMAIL
// ======================= */
// const sendWelcomeEmail = async (email, name, password) => {
//   const subject = "Welcome to CrimeTrack - Registration Successful";
//   const html = `
//     <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e2e8f0; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
//       ${getEmailHeader("Registration Successful")}
//       <div style="padding: 30px; background-color: #ffffff;">
//         <p style="font-size: 16px; color: #334155;">Hello <strong>${name}</strong>,</p>
//         <p style="color: #475569; line-height: 1.6;">Welcome to the CrimeTrack Portal. Your account has been successfully created. You can now access digital policing services securely.</p>
        
//         <div style="background-color: #f8fafc; padding: 20px; border-radius: 6px; margin: 20px 0; border: 1px solid #e2e8f0;">
//           <p style="margin: 0 0 10px; font-weight: bold; color: #0F172A; text-transform: uppercase; font-size: 12px;">Your Login Credentials:</p>
//           <ul style="list-style: none; padding: 0; margin: 0;">
//             <li style="margin-bottom: 8px;">📧 <strong>Username:</strong> ${email}</li>
//             <li>🔑 <strong>Password:</strong> ${password}</li>
//           </ul>
//         </div>
//         <p style="color: #ef4444; font-size: 13px; font-weight: bold;">⚠️ Security Alert: Please change your password immediately after logging in.</p>
//       </div>
//       ${getEmailFooter()}
//     </div>`;
//   await sendBrevoEmail(email, subject, html);
// };

// /* =======================
//    3. 📩 COMPLAINT CONFIRMATION
// ======================= */
// const sendComplaintConfirmation = async (email, name, complaintId) => {
//   const subject = `Complaint Received: #${complaintId}`;
//   const html = `
//     <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e2e8f0; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
//       ${getEmailHeader("Complaint Acknowledgment")}
//       <div style="padding: 30px; background-color: #ffffff;">
//         <p style="font-size: 16px; color: #334155;">Hello <strong>${name}</strong>,</p>
//         <p style="color: #475569; line-height: 1.6;">This is to confirm that your complaint has been successfully received by the system.</p>
        
//         <div style="text-align: center; margin: 25px 0;">
//           <p style="font-size: 12px; text-transform: uppercase; color: #64748b; margin-bottom: 5px;">Complaint Reference ID</p>
//           <span style="font-size: 24px; font-weight: bold; color: #2563eb; background-color: #eff6ff; padding: 10px 20px; border-radius: 50px;">#${complaintId}</span>
//         </div>

//         <p style="color: #475569; font-size: 14px;">The concerned authority will review your complaint shortly. You can track the live status on your dashboard.</p>
//       </div>
//       ${getEmailFooter()}
//     </div>`;
//   await sendBrevoEmail(email, subject, html);
// };

// /* =======================
//    4. 🚨 STATUS / FIR UPDATE
// ======================= */
// const sendStatusUpdateEmail = async (email, report, status, officerRemark) => {
//   const subject = `Case Update: #${report._id} - ${status}`;
//   const isOfficialFiling = status.includes("FIR") || status.includes("NCR");
//   let title = isOfficialFiling ? `OFFICIAL ${status} GENERATED` : `CASE STATUS UPDATED: ${status}`;
  
//   const html = generateCaseEmailTemplate(report, title, officerRemark);
//   await sendBrevoEmail(email, subject, html);
// };

// /* =======================
//    5. 🛡️ ADMIN NOTIFICATION (Owner Alert)
// ======================= */
// const sendAdminAlert = async (action, user) => {
//   const ownerEmail = "sushanttelekune@gmail.com";
//   const subject = `Admin Alert: User ${action} - ${user.name}`;
//   const time = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

//   const colorMap = {
//     'Signup': '#16a34a', // Green
//     'Login': '#2563eb',  // Blue
//     'Logout': '#dc2626'  // Red
//   };
//   const color = colorMap[action] || '#64748b';

//   const html = `
//     <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
//       ${getEmailHeader("Admin Security Alert")}
//       <div style="padding: 25px; background-color: #fff;">
//          <h3 style="color: ${color}; border-bottom: 2px solid ${color}; padding-bottom: 10px; margin-top: 0;">
//            ${action.toUpperCase()} DETECTED
//          </h3>
//          <p style="margin: 5px 0 15px; font-size: 14px; color: #64748b;"><strong>Timestamp:</strong> ${time}</p>
         
//          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
//            <tr style="background-color: #f8fafc;"><td style="padding: 10px; border-bottom: 1px solid #eee; width: 30%;"><strong>Name:</strong></td><td style="padding: 10px; border-bottom: 1px solid #eee;">${user.name}</td></tr>
//            <tr><td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Role:</strong></td><td style="padding: 10px; border-bottom: 1px solid #eee;"><span style="background-color: #e2e8f0; padding: 2px 8px; border-radius: 4px; font-weight: bold; font-size: 12px; text-transform: uppercase;">${user.role}</span></td></tr>
//            <tr style="background-color: #f8fafc;"><td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Email:</strong></td><td style="padding: 10px; border-bottom: 1px solid #eee;">${user.email}</td></tr>
//            <tr><td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>User ID:</strong></td><td style="padding: 10px; border-bottom: 1px solid #eee; font-family: monospace;">${user._id}</td></tr>
//          </table>
//       </div>
//       ${getEmailFooter()}
//     </div>
//   `;
//   await sendBrevoEmail(ownerEmail, subject, html);
// };

// /* =======================
//    6. 📹 MEETING INVITE
// ======================= */
// const sendMeetingInvite = async (email, name, meetingDetails) => {
//   const subject = `Meeting Invitation: ${meetingDetails.title}`;
//   const meetingTime = new Date(meetingDetails.scheduledTime).toLocaleString();
  
//   const html = `
//     <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
//       ${getEmailHeader("Meeting Invitation")}
//       <div style="padding: 30px; background-color: #ffffff;">
//         <p style="font-size: 16px; color: #334155;">Hello <strong>${name}</strong>,</p>
//         <p style="color: #475569; line-height: 1.6;">You have been invited to an official online meeting regarding a case/inquiry.</p>
        
//         <div style="background-color: #f8fafc; padding: 20px; border-radius: 6px; margin: 20px 0; border: 1px solid #e2e8f0;">
//           <p style="margin: 0 0 10px; font-weight: bold; color: #0F172A; text-transform: uppercase; font-size: 12px;">Meeting Details:</p>
//           <ul style="list-style: none; padding: 0; margin: 0; color: #334155;">
//             <li style="margin-bottom: 8px;">📌 <strong>Topic:</strong> ${meetingDetails.title}</li>
//             <li style="margin-bottom: 8px;">⏰ <strong>Time:</strong> ${meetingTime}</li>
//             <li>📊 <strong>Status:</strong> Scheduled</li>
//           </ul>
//         </div>

//         <p style="color: #2563eb; font-size: 14px; font-weight: bold;">Please log in to your dashboard to join the meeting at the scheduled time.</p>
//       </div>
//       ${getEmailFooter()}
//     </div>
//   `;
//   await sendBrevoEmail(email, subject, html);
// };

// /* =======================
//    7. ✏️ PROFILE EDIT OTP
// ======================= */
// const sendProfileOtpEmail = async (email, otp) => {
//   const subject = "Security Alert: Profile Edit Request";
//   const html = `
//     <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto; border: 1px solid #e2e8f0; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
//       ${getEmailHeader("Security Verification")}
//       <div style="padding: 30px; text-align: center; background-color: #ffffff;">
//         <p style="font-size: 16px; color: #b91c1c; font-weight: bold;">Action Required: Profile Update</p>
//         <p style="font-size: 14px; color: #334155;">You requested to edit your CrimeTrack profile details.</p>
        
//         <div style="background-color: #fef2f2; display: inline-block; padding: 15px 30px; margin: 20px 0; border-radius: 8px; letter-spacing: 5px; font-size: 32px; font-weight: bold; color: #dc2626; border: 1px dashed #f87171;">
//           ${otp}
//         </div>
//         <p style="font-size: 13px; color: #64748b;">If you did not request this, please change your password immediately.</p>
//       </div>
//       ${getEmailFooter()}
//     </div>
//   `;
//   await sendBrevoEmail(email, subject, html);
// };

// /* =======================
//    8. ✅ PROFILE UPDATE SUCCESS EMAIL (NEW)
// ======================= */
// const sendProfileUpdateSuccessEmail = async (email, name) => {
//   const subject = "Profile Updated Successfully - CrimeTrack";
//   const html = `
//     <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e2e8f0; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
//       ${getEmailHeader("Profile Update Notification")}
//       <div style="padding: 30px; background-color: #ffffff;">
//         <p style="font-size: 16px; color: #334155;">Hello <strong>${name}</strong>,</p>
//         <p style="color: #475569; line-height: 1.6;">
//           Your CrimeTrack profile details have been successfully updated.
//         </p>
        
//         <div style="background-color: #f0fdf4; padding: 15px; border-left: 4px solid #16a34a; margin: 20px 0; border-radius: 4px;">
//           <p style="margin: 0; color: #166534; font-weight: bold;">✔ Update Confirmed</p>
//           <p style="margin: 5px 0 0; font-size: 13px; color: #15803d;">Your changes are now live in the system.</p>
//         </div>

//         <p style="font-size: 13px; color: #64748b;">If you did not make these changes, please contact support or reset your password immediately.</p>
//       </div>
//       ${getEmailFooter()}
//     </div>
//   `;
//   await sendBrevoEmail(email, subject, html);
// };

// /* =======================
//    9. 🆘 HELP TICKET ACKNOWLEDGEMENT (NEW)
// ======================= */
// const sendHelpTicketAck = async (email, name, ticketId) => {
//     const subject = `[Ticket #${ticketId.toString().slice(-6)}] Help Request Received`;
//     const html = `
//       <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e2e8f0; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
//         ${getEmailHeader("Help Request Received")}
//         <div style="padding: 30px; background-color: #ffffff;">
//           <p style="font-size: 16px; color: #334155;">Hello <strong>${name}</strong>,</p>
//           <p style="color: #475569; line-height: 1.6;">We have received your help request. Our support team (Admin) will review it shortly.</p>
          
//           <div style="background-color: #eff6ff; padding: 15px; border-left: 4px solid #3b82f6; margin: 20px 0; border-radius: 4px;">
//             <p style="margin: 0; color: #1e40af; font-weight: bold;">Ticket ID: ${ticketId}</p>
//           </div>
  
//           <p style="font-size: 13px; color: #64748b;">You will receive an email notification when an admin replies.</p>
//         </div>
//         ${getEmailFooter()}
//       </div>
//     `;
//     await sendBrevoEmail(email, subject, html);
// };
  
// /* =======================
//    10. 💬 ADMIN REPLY NOTIFICATION (NEW)
// ======================= */
// const sendAdminReplyEmail = async (email, name, ticketId, adminMessage) => {
//     const subject = `[Ticket #${ticketId.toString().slice(-6)}] New Reply from Admin`;
//     const html = `
//       <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e2e8f0; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
//         ${getEmailHeader("Support Ticket Update")}
//         <div style="padding: 30px; background-color: #ffffff;">
//           <p style="font-size: 16px; color: #334155;">Hello <strong>${name}</strong>,</p>
//           <p style="color: #475569; line-height: 1.6;">An admin has replied to your help request.</p>
          
//           <div style="background-color: #f3f4f6; padding: 15px; border-left: 4px solid #3b82f6; margin: 20px 0;">
//             <strong style="color: #1e3a8a;">Admin Reply:</strong><br>
//             <p style="margin: 5px 0 0; color: #334155;">${adminMessage}</p>
//           </div>
  
//           <p style="font-size: 13px; color: #64748b;">You can view the full conversation in your dashboard.</p>
//         </div>
//         ${getEmailFooter()}
//       </div>
//     `;
//     await sendBrevoEmail(email, subject, html);
// };
  
// /* =======================
//    11. ⭐ FEEDBACK THANK YOU (NEW)
// ======================= */
// const sendFeedbackThankYou = async (email, name, type) => {
//     const subject = `Thank You for your ${type}!`;
//     const html = `
//       <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e2e8f0; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
//         ${getEmailHeader("Feedback Received")}
//         <div style="padding: 30px; background-color: #ffffff;">
//           <p style="font-size: 16px; color: #334155;">Hello <strong>${name}</strong>,</p>
//           <p style="color: #475569; line-height: 1.6;">Thank you for submitting your <strong>${type}</strong> to CrimeTrack.</p>
//           <p style="color: #475569; line-height: 1.6;">We value your feedback and use it to improve our system for everyone.</p>
//         </div>
//         ${getEmailFooter()}
//       </div>
//     `;
//     await sendBrevoEmail(email, subject, html);
// };

// module.exports = { 
//   sendOtpEmail, 
//   sendWelcomeEmail, 
//   sendComplaintConfirmation, 
//   sendStatusUpdateEmail,
//   sendAdminAlert,
//   sendMeetingInvite,    
//   sendProfileOtpEmail,  
//   sendProfileUpdateSuccessEmail,
//   sendHelpTicketAck,      // ✅ Exported
//   sendAdminReplyEmail,    // ✅ Exported
//   sendFeedbackThankYou    // ✅ Exported
// };












// const axios = require('axios');

// // 👇 YAHAN APNA CLOUDINARY LOGO LINK DAALO
// const LOGO_URL = "https://res.cloudinary.com/dukrcgv8s/image/upload/v1770304918/CrimeTrack_abbtdr.png"; 

// // --- 🎨 HELPER: Common Email Header (Logo + Title) ---
// const getEmailHeader = (title) => {
//   return `
//     <div style="background-color: #0F172A; color: white; padding: 25px; text-align: center; border-top-left-radius: 8px; border-top-right-radius: 8px;">
//       <img src="${LOGO_URL}" alt="CrimeTrack Logo" style="width: 60px; height: 60px; margin-bottom: 10px; object-fit: contain;" />
//       <h2 style="margin: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 20px; letter-spacing: 1px;">CRIMETRACK</h2>
//       <p style="margin: 5px 0 0; font-size: 12px; text-transform: uppercase; opacity: 0.8;">${title}</p>
//     </div>
//   `;
// };

// // --- 🎨 HELPER: Common Footer ---
// const getEmailFooter = () => {
//   return `
//     <div style="background-color: #f1f5f9; color: #64748b; padding: 15px; text-align: center; font-size: 11px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;">
//       <p style="margin: 0;">This is a system-generated email from the CrimeTrack Digital Policing Network.</p>
//       <p style="margin: 5px 0 0;">&copy; ${new Date().getFullYear()} CrimeTrack. All rights reserved.</p>
//     </div>
//   `;
// };

// // --- 🛠️ HELPER: Generate Detailed HTML Template (For FIR/Status) ---
// const generateCaseEmailTemplate = (report, title, highlightRemark = "") => {
//   const record = report.officialRecord || {};
  
//   // Formatting Dates
//   const recordDate = record.recordDate ? new Date(record.recordDate).toLocaleString() : "N/A";
//   const incidentDate = record.occurrenceDate ? `${record.occurrenceDate} at ${record.occurrenceTime}` : "N/A";

//   // Acts String
//   const actsString = record.acts && record.acts.length > 0 
//     ? record.acts.map(a => `${a.actName} (Sec: ${a.section})`).join(', ') 
//     : "N/A";

//   return `
//     <div style="font-family: Arial, sans-serif; max-width: 700px; margin: auto; border: 1px solid #e2e8f0; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
      
//       ${getEmailHeader("Official Notification")}

//       <div style="background-color: #ffffff; padding: 20px; border-bottom: 2px solid #3b82f6;">
//         <h3 style="color: #1e40af; margin-top: 0; font-size: 18px;">${title}</h3>
//         <p style="font-size: 14px; color: #475569; line-height: 1.5;">
//           <strong>Case ID:</strong> #${report._id} <br/>
//           <strong>Police Station:</strong> ${report.selectedStation}
//         </p>
        
//         ${highlightRemark ? `
//         <div style="background-color: #fff7ed; border-left: 4px solid #f97316; padding: 15px; margin-top: 15px; border-radius: 4px;">
//           <p style="margin: 0; font-size: 11px; color: #9a3412; font-weight: bold; text-transform: uppercase;">Officer's Remark:</p>
//           <p style="margin: 5px 0 0; font-size: 14px; color: #1e293b; font-style: italic;">"${highlightRemark}"</p>
//         </div>` : ''}
//       </div>

//       <div style="padding: 20px; background-color: #ffffff;">
//         <h4 style="border-bottom: 1px solid #cbd5e1; padding-bottom: 8px; color: #334155; font-size: 14px; margin-top: 0;">OFFICIAL RECORD DETAILS</h4>
        
//         <table style="width: 100%; border-collapse: collapse; font-size: 13px; margin-top: 10px;">
          
//           <tr style="background-color: #f8fafc;">
//             <td style="padding: 10px; border: 1px solid #cbd5e1; font-weight: bold; width: 40%;">Record Number</td>
//             <td style="padding: 10px; border: 1px solid #cbd5e1; color: #b91c1c; font-weight: bold;">${record.recordNumber || "Pending"}</td>
//           </tr>
//           <tr>
//             <td style="padding: 10px; border: 1px solid #cbd5e1; font-weight: bold;">Filing Date</td>
//             <td style="padding: 10px; border: 1px solid #cbd5e1;">${recordDate}</td>
//           </tr>
//           <tr style="background-color: #f8fafc;">
//             <td style="padding: 10px; border: 1px solid #cbd5e1; font-weight: bold;">Applicable Acts</td>
//             <td style="padding: 10px; border: 1px solid #cbd5e1;">${actsString}</td>
//           </tr>
//           <tr>
//             <td style="padding: 10px; border: 1px solid #cbd5e1; font-weight: bold;">Incident Location</td>
//             <td style="padding: 10px; border: 1px solid #cbd5e1;">${record.incidentPlace || report.incidentLocationAddress || "N/A"}</td>
//           </tr>
//           <tr style="background-color: #f8fafc;">
//             <td style="padding: 10px; border: 1px solid #cbd5e1; font-weight: bold;">Occurrence</td>
//             <td style="padding: 10px; border: 1px solid #cbd5e1;">${incidentDate}</td>
//           </tr>
//           <tr>
//             <td style="padding: 10px; border: 1px solid #cbd5e1; font-weight: bold;">Officer In-Charge</td>
//             <td style="padding: 10px; border: 1px solid #cbd5e1;">${record.investigatingOfficer || report.assignedOfficer} (${record.rank || "Officer"})</td>
//           </tr>

//         </table>

//         <h4 style="border-bottom: 1px solid #cbd5e1; padding-bottom: 8px; color: #334155; margin-top: 25px; font-size: 14px;">PERSONS INVOLVED</h4>
//         <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
//           <thead style="background-color: #e2e8f0;">
//             <tr>
//               <th style="padding: 8px; border: 1px solid #cbd5e1; text-align: left;">Role</th>
//               <th style="padding: 8px; border: 1px solid #cbd5e1; text-align: left;">Name</th>
//               <th style="padding: 8px; border: 1px solid #cbd5e1; text-align: left;">Details</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td style="padding: 8px; border: 1px solid #cbd5e1; font-weight: bold;">Complainant</td>
//               <td style="padding: 8px; border: 1px solid #cbd5e1;">${record.complainant?.fullName || report.reporterName}</td>
//               <td style="padding: 8px; border: 1px solid #cbd5e1;">${record.complainant?.mobile || "N/A"}</td>
//             </tr>
//             <tr>
//               <td style="padding: 8px; border: 1px solid #cbd5e1; font-weight: bold; color: #047857;">Victim</td>
//               <td style="padding: 8px; border: 1px solid #cbd5e1;">${record.victim?.fullName || report.victimName}</td>
//               <td style="padding: 8px; border: 1px solid #cbd5e1;">Age: ${record.victim?.age || report.victimAge || "N/A"}</td>
//             </tr>
//             <tr>
//               <td style="padding: 8px; border: 1px solid #cbd5e1; font-weight: bold; color: #b91c1c;">Accused</td>
//               <td style="padding: 8px; border: 1px solid #cbd5e1;">${record.accused?.fullName || report.suspectName || "Unknown"}</td>
//               <td style="padding: 8px; border: 1px solid #cbd5e1;">${record.accused?.address || "N/A"}</td>
//             </tr>
//           </tbody>
//         </table>
//       </div>

//       ${getEmailFooter()}
//     </div>
//   `;
// };

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
//   }
// };

// /* =======================
//    1. 🔐 OTP EMAIL
// ======================= */
// const sendOtpEmail = async (email, otp) => {
//   const subject = "Verification Code - CrimeTrack";
//   const html = `
//     <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto; border: 1px solid #e2e8f0; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
//       ${getEmailHeader("Secure Verification")}
//       <div style="padding: 30px; text-align: center; background-color: #ffffff;">
//         <p style="font-size: 16px; color: #334155;">Your One-Time Password (OTP) is:</p>
//         <div style="background-color: #f1f5f9; display: inline-block; padding: 15px 30px; margin: 20px 0; border-radius: 8px; letter-spacing: 5px; font-size: 32px; font-weight: bold; color: #0F172A; border: 1px dashed #94a3b8;">
//           ${otp}
//         </div>
//         <p style="font-size: 13px; color: #64748b;">This code is valid for 10 minutes. Do not share it with anyone.</p>
//       </div>
//       ${getEmailFooter()}
//     </div>
//   `;
//   await sendBrevoEmail(email, subject, html);
// };

// /* =======================
//    2. 👋 WELCOME EMAIL
// ======================= */
// const sendWelcomeEmail = async (email, name, password) => {
//   const subject = "Welcome to CrimeTrack - Registration Successful";
//   const html = `
//     <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e2e8f0; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
//       ${getEmailHeader("Registration Successful")}
//       <div style="padding: 30px; background-color: #ffffff;">
//         <p style="font-size: 16px; color: #334155;">Hello <strong>${name}</strong>,</p>
//         <p style="color: #475569; line-height: 1.6;">Welcome to the CrimeTrack Portal. Your account has been successfully created. You can now access digital policing services securely.</p>
        
//         <div style="background-color: #f8fafc; padding: 20px; border-radius: 6px; margin: 20px 0; border: 1px solid #e2e8f0;">
//           <p style="margin: 0 0 10px; font-weight: bold; color: #0F172A; text-transform: uppercase; font-size: 12px;">Your Login Credentials:</p>
//           <ul style="list-style: none; padding: 0; margin: 0;">
//             <li style="margin-bottom: 8px;">📧 <strong>Username:</strong> ${email}</li>
//             <li>🔑 <strong>Password:</strong> ${password}</li>
//           </ul>
//         </div>
//         <p style="color: #ef4444; font-size: 13px; font-weight: bold;">⚠️ Security Alert: Please change your password immediately after logging in.</p>
//       </div>
//       ${getEmailFooter()}
//     </div>`;
//   await sendBrevoEmail(email, subject, html);
// };

// /* =======================
//    3. 📩 COMPLAINT CONFIRMATION
// ======================= */
// const sendComplaintConfirmation = async (email, name, complaintId) => {
//   const subject = `Complaint Received: #${complaintId}`;
//   const html = `
//     <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e2e8f0; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
//       ${getEmailHeader("Complaint Acknowledgment")}
//       <div style="padding: 30px; background-color: #ffffff;">
//         <p style="font-size: 16px; color: #334155;">Hello <strong>${name}</strong>,</p>
//         <p style="color: #475569; line-height: 1.6;">This is to confirm that your complaint has been successfully received by the system.</p>
        
//         <div style="text-align: center; margin: 25px 0;">
//           <p style="font-size: 12px; text-transform: uppercase; color: #64748b; margin-bottom: 5px;">Complaint Reference ID</p>
//           <span style="font-size: 24px; font-weight: bold; color: #2563eb; background-color: #eff6ff; padding: 10px 20px; border-radius: 50px;">#${complaintId}</span>
//         </div>

//         <p style="color: #475569; font-size: 14px;">The concerned authority will review your complaint shortly. You can track the live status on your dashboard.</p>
//       </div>
//       ${getEmailFooter()}
//     </div>`;
//   await sendBrevoEmail(email, subject, html);
// };

// /* =======================
//    4. 🚨 STATUS / FIR UPDATE
// ======================= */
// const sendStatusUpdateEmail = async (email, report, status, officerRemark) => {
//   const subject = `Case Update: #${report._id} - ${status}`;
//   const isOfficialFiling = status.includes("FIR") || status.includes("NCR");
//   let title = isOfficialFiling ? `OFFICIAL ${status} GENERATED` : `CASE STATUS UPDATED: ${status}`;
  
//   const html = generateCaseEmailTemplate(report, title, officerRemark);
//   await sendBrevoEmail(email, subject, html);
// };

// /* =======================
//    5. 🛡️ ADMIN NOTIFICATION (Owner Alert)
// ======================= */
// const sendAdminAlert = async (action, user) => {
//   const ownerEmail = "sushanttelekune@gmail.com";
//   const subject = `Admin Alert: User ${action} - ${user.name}`;
//   const time = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

//   const colorMap = {
//     'Signup': '#16a34a', // Green
//     'Login': '#2563eb',  // Blue
//     'Logout': '#dc2626'  // Red
//   };
//   const color = colorMap[action] || '#64748b';

//   const html = `
//     <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
//       ${getEmailHeader("Admin Security Alert")}
//       <div style="padding: 25px; background-color: #fff;">
//          <h3 style="color: ${color}; border-bottom: 2px solid ${color}; padding-bottom: 10px; margin-top: 0;">
//            ${action.toUpperCase()} DETECTED
//          </h3>
//          <p style="margin: 5px 0 15px; font-size: 14px; color: #64748b;"><strong>Timestamp:</strong> ${time}</p>
         
//          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
//            <tr style="background-color: #f8fafc;"><td style="padding: 10px; border-bottom: 1px solid #eee; width: 30%;"><strong>Name:</strong></td><td style="padding: 10px; border-bottom: 1px solid #eee;">${user.name}</td></tr>
//            <tr><td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Role:</strong></td><td style="padding: 10px; border-bottom: 1px solid #eee;"><span style="background-color: #e2e8f0; padding: 2px 8px; border-radius: 4px; font-weight: bold; font-size: 12px; text-transform: uppercase;">${user.role}</span></td></tr>
//            <tr style="background-color: #f8fafc;"><td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Email:</strong></td><td style="padding: 10px; border-bottom: 1px solid #eee;">${user.email}</td></tr>
//            <tr><td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>User ID:</strong></td><td style="padding: 10px; border-bottom: 1px solid #eee; font-family: monospace;">${user._id}</td></tr>
//          </table>
//       </div>
//       ${getEmailFooter()}
//     </div>
//   `;
//   await sendBrevoEmail(ownerEmail, subject, html);
// };

// /* =======================
//    6. 📹 MEETING INVITE
// ======================= */
// const sendMeetingInvite = async (email, name, meetingDetails) => {
//   const subject = `Meeting Invitation: ${meetingDetails.title}`;
//   const meetingTime = new Date(meetingDetails.scheduledTime).toLocaleString();
  
//   const html = `
//     <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
//       ${getEmailHeader("Meeting Invitation")}
//       <div style="padding: 30px; background-color: #ffffff;">
//         <p style="font-size: 16px; color: #334155;">Hello <strong>${name}</strong>,</p>
//         <p style="color: #475569; line-height: 1.6;">You have been invited to an official online meeting regarding a case/inquiry.</p>
        
//         <div style="background-color: #f8fafc; padding: 20px; border-radius: 6px; margin: 20px 0; border: 1px solid #e2e8f0;">
//           <p style="margin: 0 0 10px; font-weight: bold; color: #0F172A; text-transform: uppercase; font-size: 12px;">Meeting Details:</p>
//           <ul style="list-style: none; padding: 0; margin: 0; color: #334155;">
//             <li style="margin-bottom: 8px;">📌 <strong>Topic:</strong> ${meetingDetails.title}</li>
//             <li style="margin-bottom: 8px;">⏰ <strong>Time:</strong> ${meetingTime}</li>
//             <li>📊 <strong>Status:</strong> Scheduled</li>
//           </ul>
//         </div>

//         <p style="color: #2563eb; font-size: 14px; font-weight: bold;">Please log in to your dashboard to join the meeting at the scheduled time.</p>
//       </div>
//       ${getEmailFooter()}
//     </div>
//   `;
//   await sendBrevoEmail(email, subject, html);
// };

// /* =======================
//    7. ✏️ PROFILE EDIT OTP
// ======================= */
// const sendProfileOtpEmail = async (email, otp) => {
//   const subject = "Security Alert: Profile Edit Request";
//   const html = `
//     <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto; border: 1px solid #e2e8f0; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
//       ${getEmailHeader("Security Verification")}
//       <div style="padding: 30px; text-align: center; background-color: #ffffff;">
//         <p style="font-size: 16px; color: #b91c1c; font-weight: bold;">Action Required: Profile Update</p>
//         <p style="font-size: 14px; color: #334155;">You requested to edit your CrimeTrack profile details.</p>
        
//         <div style="background-color: #fef2f2; display: inline-block; padding: 15px 30px; margin: 20px 0; border-radius: 8px; letter-spacing: 5px; font-size: 32px; font-weight: bold; color: #dc2626; border: 1px dashed #f87171;">
//           ${otp}
//         </div>
//         <p style="font-size: 13px; color: #64748b;">If you did not request this, please change your password immediately.</p>
//       </div>
//       ${getEmailFooter()}
//     </div>
//   `;
//   await sendBrevoEmail(email, subject, html);
// };

// /* =======================
//    8. ✅ PROFILE UPDATE SUCCESS EMAIL (NEW)
// ======================= */
// const sendProfileUpdateSuccessEmail = async (email, name) => {
//   const subject = "Profile Updated Successfully - CrimeTrack";
//   const html = `
//     <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e2e8f0; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
//       ${getEmailHeader("Profile Update Notification")}
//       <div style="padding: 30px; background-color: #ffffff;">
//         <p style="font-size: 16px; color: #334155;">Hello <strong>${name}</strong>,</p>
//         <p style="color: #475569; line-height: 1.6;">
//           Your CrimeTrack profile details have been successfully updated.
//         </p>
        
//         <div style="background-color: #f0fdf4; padding: 15px; border-left: 4px solid #16a34a; margin: 20px 0; border-radius: 4px;">
//           <p style="margin: 0; color: #166534; font-weight: bold;">✔ Update Confirmed</p>
//           <p style="margin: 5px 0 0; font-size: 13px; color: #15803d;">Your changes are now live in the system.</p>
//         </div>

//         <p style="font-size: 13px; color: #64748b;">If you did not make these changes, please contact support or reset your password immediately.</p>
//       </div>
//       ${getEmailFooter()}
//     </div>
//   `;
//   await sendBrevoEmail(email, subject, html);
// };

// /* =======================
//    9. 🆘 HELP TICKET ACKNOWLEDGEMENT (NEW)
// ======================= */
// const sendHelpTicketAck = async (email, name, ticketId) => {
//     const subject = `[Ticket #${ticketId.toString().slice(-6)}] Help Request Received`;
//     const html = `
//       <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e2e8f0; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
//         ${getEmailHeader("Help Request Received")}
//         <div style="padding: 30px; background-color: #ffffff;">
//           <p style="font-size: 16px; color: #334155;">Hello <strong>${name}</strong>,</p>
//           <p style="color: #475569; line-height: 1.6;">We have received your help request. Our support team (Admin) will review it shortly.</p>
          
//           <div style="background-color: #eff6ff; padding: 15px; border-left: 4px solid #3b82f6; margin: 20px 0; border-radius: 4px;">
//             <p style="margin: 0; color: #1e40af; font-weight: bold;">Ticket ID: ${ticketId}</p>
//           </div>
  
//           <p style="font-size: 13px; color: #64748b;">You will receive an email notification when an admin replies.</p>
//         </div>
//         ${getEmailFooter()}
//       </div>
//     `;
//     await sendBrevoEmail(email, subject, html);
// };
  
// /* =======================
//    10. 💬 ADMIN REPLY NOTIFICATION (NEW)
// ======================= */
// const sendAdminReplyEmail = async (email, name, ticketId, adminMessage) => {
//     const subject = `[Ticket #${ticketId.toString().slice(-6)}] New Reply from Admin`;
//     const html = `
//       <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e2e8f0; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
//         ${getEmailHeader("Support Ticket Update")}
//         <div style="padding: 30px; background-color: #ffffff;">
//           <p style="font-size: 16px; color: #334155;">Hello <strong>${name}</strong>,</p>
//           <p style="color: #475569; line-height: 1.6;">An admin has replied to your help request.</p>
          
//           <div style="background-color: #f3f4f6; padding: 15px; border-left: 4px solid #3b82f6; margin: 20px 0;">
//             <strong style="color: #1e3a8a;">Admin Reply:</strong><br>
//             <p style="margin: 5px 0 0; color: #334155;">${adminMessage}</p>
//           </div>
  
//           <p style="font-size: 13px; color: #64748b;">You can view the full conversation in your dashboard.</p>
//         </div>
//         ${getEmailFooter()}
//       </div>
//     `;
//     await sendBrevoEmail(email, subject, html);
// };
  
// /* =======================
//    11. ⭐ FEEDBACK THANK YOU (NEW)
// ======================= */
// const sendFeedbackThankYou = async (email, name, type) => {
//     const subject = `Thank You for your ${type}!`;
//     const html = `
//       <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e2e8f0; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
//         ${getEmailHeader("Feedback Received")}
//         <div style="padding: 30px; background-color: #ffffff;">
//           <p style="font-size: 16px; color: #334155;">Hello <strong>${name}</strong>,</p>
//           <p style="color: #475569; line-height: 1.6;">Thank you for submitting your <strong>${type}</strong> to CrimeTrack.</p>
//           <p style="color: #475569; line-height: 1.6;">We value your feedback and use it to improve our system for everyone.</p>
//         </div>
//         ${getEmailFooter()}
//       </div>
//     `;
//     await sendBrevoEmail(email, subject, html);
// };

// /* =======================
//    12. 📜 OFFICIAL NOTICE ALERT (NEW)
// ======================= */
// const sendNoticeAlert = async (email, name, senderDetails, type) => {
//   const subject = `Official ${type} Received - CrimeTrack`;
  
//   // Choose color based on urgency/type
//   const color = type === 'Notice' ? '#dc2626' : '#2563eb'; // Red for Notice, Blue for Application

//   const html = `
//     <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #cbd5e1; border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.05); overflow: hidden;">
      
//       <div style="background-color: #0F172A; color: white; padding: 20px; text-align: center;">
//         <h2 style="margin: 0; font-size: 18px; letter-spacing: 1px;">MAHARASHTRA POLICE</h2>
//         <p style="margin: 5px 0 0; font-size: 11px; opacity: 0.8; text-transform: uppercase;">Official Digital Communication</p>
//       </div>

//       <div style="padding: 30px; background-color: #ffffff;">
//         <h3 style="color: ${color}; margin-top: 0; border-bottom: 2px solid ${color}; display: inline-block; padding-bottom: 5px;">
//           ${type.toUpperCase()} RECEIVED
//         </h3>
        
//         <p style="font-size: 15px; color: #334155; margin-top: 20px;">
//           Dear <strong>${name}</strong>,
//         </p>
//         <p style="color: #475569; line-height: 1.6;">
//           You have received an official <strong>${type}</strong> from <strong>${senderDetails.name}</strong> (${senderDetails.designation}, ${senderDetails.station}).
//         </p>

//         <div style="background-color: #f1f5f9; padding: 15px; border-left: 4px solid ${color}; margin: 20px 0; border-radius: 4px;">
//           <p style="margin: 0; font-weight: bold; color: #0F172A; font-size: 13px;">ACTION REQUIRED:</p>
//           <p style="margin: 5px 0 0; color: #334155; font-size: 14px;">Please login to your CrimeTrack Dashboard to view and download the official document.</p>
//         </div>

//         <p style="font-size: 12px; color: #64748b; margin-top: 30px;">
//           *This is a digitally generated alert. Do not reply to this email directly.*
//         </p>
//       </div>
//     </div>
//   `;
  
//   await sendBrevoEmail(email, subject, html);
// };

// module.exports = { 
//   sendOtpEmail, 
//   sendWelcomeEmail, 
//   sendComplaintConfirmation, 
//   sendStatusUpdateEmail,
//   sendAdminAlert,
//   sendMeetingInvite,    
//   sendProfileOtpEmail,  
//   sendProfileUpdateSuccessEmail,
//   sendHelpTicketAck,      
//   sendAdminReplyEmail,    
//   sendFeedbackThankYou,
//   sendNoticeAlert // ✅ Exported New Function
// };
















// const axios = require('axios');
// const nodemailer = require('nodemailer'); // Keep if using nodemailer elsewhere, otherwise axios is enough for Brevo API

// // 👇 CLOUDINARY LOGO URL
// const LOGO_URL = "https://res.cloudinary.com/dukrcgv8s/image/upload/v1770304918/CrimeTrack_abbtdr.png"; 

// // --- 🎨 HELPER: Common Email Header (Logo + Title) ---
// const getEmailHeader = (title) => {
//   return `
//     <div style="background-color: #0F172A; color: white; padding: 25px; text-align: center; border-top-left-radius: 8px; border-top-right-radius: 8px;">
//       <img src="${LOGO_URL}" alt="CrimeTrack Logo" style="width: 60px; height: 60px; margin-bottom: 10px; object-fit: contain; display: block; margin-left: auto; margin-right: auto;" />
//       <h2 style="margin: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 20px; letter-spacing: 1px;">CRIMETRACK</h2>
//       <p style="margin: 5px 0 0; font-size: 12px; text-transform: uppercase; opacity: 0.8;">${title}</p>
//     </div>
//   `;
// };

// // --- 🎨 HELPER: Common Footer ---
// const getEmailFooter = () => {
//   return `
//     <div style="background-color: #f1f5f9; color: #64748b; padding: 15px; text-align: center; font-size: 11px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;">
//       <p style="margin: 0;">This is a system-generated email from the CrimeTrack Digital Policing Network.</p>
//       <p style="margin: 5px 0 0;">&copy; ${new Date().getFullYear()} CrimeTrack. All rights reserved.</p>
//     </div>
//   `;
// };

// // --- 🛠️ HELPER: Generate Detailed HTML Template (For FIR/Status) ---
// const generateCaseEmailTemplate = (report, title, highlightRemark = "") => {
//   const record = report.officialRecord || {};
  
//   const recordDate = record.recordDate ? new Date(record.recordDate).toLocaleString() : "N/A";
//   const incidentDate = record.occurrenceDate ? `${record.occurrenceDate} at ${record.occurrenceTime}` : "N/A";

//   const actsString = record.acts && record.acts.length > 0 
//     ? record.acts.map(a => `${a.actName} (Sec: ${a.section})`).join(', ') 
//     : "N/A";

//   return `
//     <div style="font-family: Arial, sans-serif; max-width: 700px; margin: auto; border: 1px solid #e2e8f0; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
//       ${getEmailHeader("Official Notification")}

//       <div style="background-color: #ffffff; padding: 20px; border-bottom: 2px solid #3b82f6;">
//         <h3 style="color: #1e40af; margin-top: 0; font-size: 18px;">${title}</h3>
//         <p style="font-size: 14px; color: #475569; line-height: 1.5;">
//           <strong>Case ID:</strong> #${report._id} <br/>
//           <strong>Police Station:</strong> ${report.selectedStation}
//         </p>
        
//         ${highlightRemark ? `
//         <div style="background-color: #fff7ed; border-left: 4px solid #f97316; padding: 15px; margin-top: 15px; border-radius: 4px;">
//           <p style="margin: 0; font-size: 11px; color: #9a3412; font-weight: bold; text-transform: uppercase;">Officer's Remark:</p>
//           <p style="margin: 5px 0 0; font-size: 14px; color: #1e293b; font-style: italic;">"${highlightRemark}"</p>
//         </div>` : ''}
//       </div>

//       <div style="padding: 20px; background-color: #ffffff;">
//         <h4 style="border-bottom: 1px solid #cbd5e1; padding-bottom: 8px; color: #334155; font-size: 14px; margin-top: 0;">OFFICIAL RECORD DETAILS</h4>
//         <table style="width: 100%; border-collapse: collapse; font-size: 13px; margin-top: 10px;">
//           <tr style="background-color: #f8fafc;">
//             <td style="padding: 10px; border: 1px solid #cbd5e1; font-weight: bold; width: 40%;">Record Number</td>
//             <td style="padding: 10px; border: 1px solid #cbd5e1; color: #b91c1c; font-weight: bold;">${record.recordNumber || "Pending"}</td>
//           </tr>
//           <tr>
//             <td style="padding: 10px; border: 1px solid #cbd5e1; font-weight: bold;">Filing Date</td>
//             <td style="padding: 10px; border: 1px solid #cbd5e1;">${recordDate}</td>
//           </tr>
//           <tr style="background-color: #f8fafc;">
//             <td style="padding: 10px; border: 1px solid #cbd5e1; font-weight: bold;">Applicable Acts</td>
//             <td style="padding: 10px; border: 1px solid #cbd5e1;">${actsString}</td>
//           </tr>
//           <tr>
//             <td style="padding: 10px; border: 1px solid #cbd5e1; font-weight: bold;">Incident Location</td>
//             <td style="padding: 10px; border: 1px solid #cbd5e1;">${record.incidentPlace || report.incidentLocationAddress || "N/A"}</td>
//           </tr>
//           <tr style="background-color: #f8fafc;">
//             <td style="padding: 10px; border: 1px solid #cbd5e1; font-weight: bold;">Occurrence</td>
//             <td style="padding: 10px; border: 1px solid #cbd5e1;">${incidentDate}</td>
//           </tr>
//           <tr>
//             <td style="padding: 10px; border: 1px solid #cbd5e1; font-weight: bold;">Officer In-Charge</td>
//             <td style="padding: 10px; border: 1px solid #cbd5e1;">${record.investigatingOfficer || report.assignedOfficer} (${record.rank || "Officer"})</td>
//           </tr>
//         </table>
//       </div>
//       ${getEmailFooter()}
//     </div>
//   `;
// };

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
//   }
// };

// /* =======================
//    1. 🔐 OTP EMAIL
// ======================= */
// const sendOtpEmail = async (email, otp) => {
//   const subject = "Verification Code - CrimeTrack";
//   const html = `
//     <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto; border: 1px solid #e2e8f0; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
//       ${getEmailHeader("Secure Verification")}
//       <div style="padding: 30px; text-align: center; background-color: #ffffff;">
//         <p style="font-size: 16px; color: #334155;">Your One-Time Password (OTP) is:</p>
//         <div style="background-color: #f1f5f9; display: inline-block; padding: 15px 30px; margin: 20px 0; border-radius: 8px; letter-spacing: 5px; font-size: 32px; font-weight: bold; color: #0F172A; border: 1px dashed #94a3b8;">
//           ${otp}
//         </div>
//         <p style="font-size: 13px; color: #64748b;">This code is valid for 10 minutes. Do not share it with anyone.</p>
//       </div>
//       ${getEmailFooter()}
//     </div>
//   `;
//   await sendBrevoEmail(email, subject, html);
// };

// /* =======================
//    2. 👋 WELCOME EMAIL
// ======================= */
// const sendWelcomeEmail = async (email, name, password) => {
//   const subject = "Welcome to CrimeTrack - Registration Successful";
//   const html = `
//     <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e2e8f0; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
//       ${getEmailHeader("Registration Successful")}
//       <div style="padding: 30px; background-color: #ffffff;">
//         <p style="font-size: 16px; color: #334155;">Hello <strong>${name}</strong>,</p>
//         <p style="color: #475569; line-height: 1.6;">Welcome to the CrimeTrack Portal. Your account has been successfully created. You can now access digital policing services securely.</p>
//         <div style="background-color: #f8fafc; padding: 20px; border-radius: 6px; margin: 20px 0; border: 1px solid #e2e8f0;">
//           <p style="margin: 0 0 10px; font-weight: bold; color: #0F172A; text-transform: uppercase; font-size: 12px;">Your Login Credentials:</p>
//           <ul style="list-style: none; padding: 0; margin: 0;">
//             <li style="margin-bottom: 8px;">📧 <strong>Username:</strong> ${email}</li>
//             <li>🔑 <strong>Password:</strong> ${password}</li>
//           </ul>
//         </div>
//         <p style="color: #ef4444; font-size: 13px; font-weight: bold;">⚠️ Security Alert: Please change your password immediately after logging in.</p>
//       </div>
//       ${getEmailFooter()}
//     </div>`;
//   await sendBrevoEmail(email, subject, html);
// };

// /* =======================
//    3. 📩 COMPLAINT CONFIRMATION
// ======================= */
// const sendComplaintConfirmation = async (email, name, complaintId) => {
//   const subject = `Complaint Received: #${complaintId}`;
//   const html = `
//     <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e2e8f0; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
//       ${getEmailHeader("Complaint Acknowledgment")}
//       <div style="padding: 30px; background-color: #ffffff;">
//         <p style="font-size: 16px; color: #334155;">Hello <strong>${name}</strong>,</p>
//         <p style="color: #475569; line-height: 1.6;">This is to confirm that your complaint has been successfully received by the system.</p>
//         <div style="text-align: center; margin: 25px 0;">
//           <p style="font-size: 12px; text-transform: uppercase; color: #64748b; margin-bottom: 5px;">Complaint Reference ID</p>
//           <span style="font-size: 24px; font-weight: bold; color: #2563eb; background-color: #eff6ff; padding: 10px 20px; border-radius: 50px;">#${complaintId}</span>
//         </div>
//         <p style="color: #475569; font-size: 14px;">The concerned authority will review your complaint shortly. You can track the live status on your dashboard.</p>
//       </div>
//       ${getEmailFooter()}
//     </div>`;
//   await sendBrevoEmail(email, subject, html);
// };

// /* =======================
//    4. 🚨 STATUS / FIR UPDATE
// ======================= */
// const sendStatusUpdateEmail = async (email, report, status, officerRemark) => {
//   const subject = `Case Update: #${report._id} - ${status}`;
//   const isOfficialFiling = status.includes("FIR") || status.includes("NCR");
//   let title = isOfficialFiling ? `OFFICIAL ${status} GENERATED` : `CASE STATUS UPDATED: ${status}`;
  
//   const html = generateCaseEmailTemplate(report, title, officerRemark);
//   await sendBrevoEmail(email, subject, html);
// };

// /* =======================
//    5. 🛡️ ADMIN NOTIFICATION
// ======================= */
// const sendAdminAlert = async (action, user) => {
//   const ownerEmail = "sushanttelekune@gmail.com";
//   const subject = `Admin Alert: User ${action} - ${user.name}`;
//   const time = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

//   const colorMap = { 'Signup': '#16a34a', 'Login': '#2563eb', 'Logout': '#dc2626' };
//   const color = colorMap[action] || '#64748b';

//   const html = `
//     <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
//       ${getEmailHeader("Admin Security Alert")}
//       <div style="padding: 25px; background-color: #fff;">
//          <h3 style="color: ${color}; border-bottom: 2px solid ${color}; padding-bottom: 10px; margin-top: 0;">${action.toUpperCase()} DETECTED</h3>
//          <p style="margin: 5px 0 15px; font-size: 14px; color: #64748b;"><strong>Timestamp:</strong> ${time}</p>
//          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
//            <tr style="background-color: #f8fafc;"><td style="padding: 10px; border-bottom: 1px solid #eee; width: 30%;"><strong>Name:</strong></td><td style="padding: 10px; border-bottom: 1px solid #eee;">${user.name}</td></tr>
//            <tr><td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Role:</strong></td><td style="padding: 10px; border-bottom: 1px solid #eee;"><span style="background-color: #e2e8f0; padding: 2px 8px; border-radius: 4px; font-weight: bold; font-size: 12px; text-transform: uppercase;">${user.role}</span></td></tr>
//            <tr style="background-color: #f8fafc;"><td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Email:</strong></td><td style="padding: 10px; border-bottom: 1px solid #eee;">${user.email}</td></tr>
//            <tr><td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>User ID:</strong></td><td style="padding: 10px; border-bottom: 1px solid #eee; font-family: monospace;">${user._id}</td></tr>
//          </table>
//       </div>
//       ${getEmailFooter()}
//     </div>
//   `;
//   await sendBrevoEmail(ownerEmail, subject, html);
// };

// /* =======================
//    6. 📹 MEETING INVITE
// ======================= */
// const sendMeetingInvite = async (email, name, meetingDetails) => {
//   const subject = `Meeting Invitation: ${meetingDetails.title}`;
//   const meetingTime = new Date(meetingDetails.scheduledTime).toLocaleString();
  
//   const html = `
//     <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
//       ${getEmailHeader("Meeting Invitation")}
//       <div style="padding: 30px; background-color: #ffffff;">
//         <p style="font-size: 16px; color: #334155;">Hello <strong>${name}</strong>,</p>
//         <p style="color: #475569; line-height: 1.6;">You have been invited to an official online meeting regarding a case/inquiry.</p>
//         <div style="background-color: #f8fafc; padding: 20px; border-radius: 6px; margin: 20px 0; border: 1px solid #e2e8f0;">
//           <p style="margin: 0 0 10px; font-weight: bold; color: #0F172A; text-transform: uppercase; font-size: 12px;">Meeting Details:</p>
//           <ul style="list-style: none; padding: 0; margin: 0; color: #334155;">
//             <li style="margin-bottom: 8px;">📌 <strong>Topic:</strong> ${meetingDetails.title}</li>
//             <li style="margin-bottom: 8px;">⏰ <strong>Time:</strong> ${meetingTime}</li>
//             <li>📊 <strong>Status:</strong> Scheduled</li>
//           </ul>
//         </div>
//         <p style="color: #2563eb; font-size: 14px; font-weight: bold;">Please log in to your dashboard to join the meeting at the scheduled time.</p>
//       </div>
//       ${getEmailFooter()}
//     </div>
//   `;
//   await sendBrevoEmail(email, subject, html);
// };

// /* =======================
//    7. ✏️ PROFILE EDIT OTP
// ======================= */
// const sendProfileOtpEmail = async (email, otp) => {
//   const subject = "Security Alert: Profile Edit Request";
//   const html = `
//     <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto; border: 1px solid #e2e8f0; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
//       ${getEmailHeader("Security Verification")}
//       <div style="padding: 30px; text-align: center; background-color: #ffffff;">
//         <p style="font-size: 16px; color: #b91c1c; font-weight: bold;">Action Required: Profile Update</p>
//         <p style="font-size: 14px; color: #334155;">You requested to edit your CrimeTrack profile details.</p>
//         <div style="background-color: #fef2f2; display: inline-block; padding: 15px 30px; margin: 20px 0; border-radius: 8px; letter-spacing: 5px; font-size: 32px; font-weight: bold; color: #dc2626; border: 1px dashed #f87171;">
//           ${otp}
//         </div>
//         <p style="font-size: 13px; color: #64748b;">If you did not request this, please change your password immediately.</p>
//       </div>
//       ${getEmailFooter()}
//     </div>
//   `;
//   await sendBrevoEmail(email, subject, html);
// };

// /* =======================
//    8. ✅ PROFILE UPDATE SUCCESS
// ======================= */
// const sendProfileUpdateSuccessEmail = async (email, name) => {
//   const subject = "Profile Updated Successfully - CrimeTrack";
//   const html = `
//     <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e2e8f0; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
//       ${getEmailHeader("Profile Update Notification")}
//       <div style="padding: 30px; background-color: #ffffff;">
//         <p style="font-size: 16px; color: #334155;">Hello <strong>${name}</strong>,</p>
//         <p style="color: #475569; line-height: 1.6;">Your CrimeTrack profile details have been successfully updated.</p>
//         <div style="background-color: #f0fdf4; padding: 15px; border-left: 4px solid #16a34a; margin: 20px 0; border-radius: 4px;">
//           <p style="margin: 0; color: #166534; font-weight: bold;">✔ Update Confirmed</p>
//           <p style="margin: 5px 0 0; font-size: 13px; color: #15803d;">Your changes are now live in the system.</p>
//         </div>
//         <p style="font-size: 13px; color: #64748b;">If you did not make these changes, please contact support or reset your password immediately.</p>
//       </div>
//       ${getEmailFooter()}
//     </div>
//   `;
//   await sendBrevoEmail(email, subject, html);
// };

// /* =======================
//    9. 🆘 HELP TICKET ACKNOWLEDGEMENT
// ======================= */
// const sendHelpTicketAck = async (email, name, ticketId) => {
//     const subject = `[Ticket #${ticketId.toString().slice(-6)}] Help Request Received`;
//     const html = `
//       <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e2e8f0; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
//         ${getEmailHeader("Help Request Received")}
//         <div style="padding: 30px; background-color: #ffffff;">
//           <p style="font-size: 16px; color: #334155;">Hello <strong>${name}</strong>,</p>
//           <p style="color: #475569; line-height: 1.6;">We have received your help request. Our support team (Admin) will review it shortly.</p>
//           <div style="background-color: #eff6ff; padding: 15px; border-left: 4px solid #3b82f6; margin: 20px 0; border-radius: 4px;">
//             <p style="margin: 0; color: #1e40af; font-weight: bold;">Ticket ID: ${ticketId}</p>
//           </div>
//           <p style="font-size: 13px; color: #64748b;">You will receive an email notification when an admin replies.</p>
//         </div>
//         ${getEmailFooter()}
//       </div>
//     `;
//     await sendBrevoEmail(email, subject, html);
// };
  
// /* =======================
//    10. 💬 ADMIN REPLY NOTIFICATION
// ======================= */
// const sendAdminReplyEmail = async (email, name, ticketId, adminMessage) => {
//     const subject = `[Ticket #${ticketId.toString().slice(-6)}] New Reply from Admin`;
//     const html = `
//       <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e2e8f0; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
//         ${getEmailHeader("Support Ticket Update")}
//         <div style="padding: 30px; background-color: #ffffff;">
//           <p style="font-size: 16px; color: #334155;">Hello <strong>${name}</strong>,</p>
//           <p style="color: #475569; line-height: 1.6;">An admin has replied to your help request.</p>
//           <div style="background-color: #f3f4f6; padding: 15px; border-left: 4px solid #3b82f6; margin: 20px 0;">
//             <strong style="color: #1e3a8a;">Admin Reply:</strong><br>
//             <p style="margin: 5px 0 0; color: #334155;">${adminMessage}</p>
//           </div>
//           <p style="font-size: 13px; color: #64748b;">You can view the full conversation in your dashboard.</p>
//         </div>
//         ${getEmailFooter()}
//       </div>
//     `;
//     await sendBrevoEmail(email, subject, html);
// };
  
// /* =======================
//    11. ⭐ FEEDBACK THANK YOU
// ======================= */
// const sendFeedbackThankYou = async (email, name, type) => {
//     const subject = `Thank You for your ${type}!`;
//     const html = `
//       <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e2e8f0; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
//         ${getEmailHeader("Feedback Received")}
//         <div style="padding: 30px; background-color: #ffffff;">
//           <p style="font-size: 16px; color: #334155;">Hello <strong>${name}</strong>,</p>
//           <p style="color: #475569; line-height: 1.6;">Thank you for submitting your <strong>${type}</strong> to CrimeTrack.</p>
//           <p style="color: #475569; line-height: 1.6;">We value your feedback and use it to improve our system for everyone.</p>
//         </div>
//         ${getEmailFooter()}
//       </div>
//     `;
//     await sendBrevoEmail(email, subject, html);
// };

// /* =======================
//    12. 📜 OFFICIAL NOTICE ALERT (UPDATED WITH LOGO)
// ======================= */
// const sendNoticeAlert = async (email, name, senderDetails, type) => {
//   const subject = `Official ${type} Received - CrimeTrack`;
//   const color = type === 'Notice' ? '#dc2626' : '#2563eb'; 

//   const html = `
//     <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #cbd5e1; border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.05); overflow: hidden;">
      
//       <div style="background-color: #0F172A; color: white; padding: 20px; text-align: center;">
//         <img src="${LOGO_URL}" alt="CrimeTrack Logo" style="width: 60px; height: 60px; margin-bottom: 10px; display: block; margin-left: auto; margin-right: auto;" />
//         <h2 style="margin: 0; font-size: 18px; letter-spacing: 1px;">MAHARASHTRA POLICE</h2>
//         <p style="margin: 5px 0 0; font-size: 11px; opacity: 0.8; text-transform: uppercase;">Official Digital Communication</p>
//       </div>

//       <div style="padding: 30px; background-color: #ffffff;">
//         <h3 style="color: ${color}; margin-top: 0; border-bottom: 2px solid ${color}; display: inline-block; padding-bottom: 5px;">
//           ${type.toUpperCase()} RECEIVED
//         </h3>
        
//         <p style="font-size: 15px; color: #334155; margin-top: 20px;">
//           Dear <strong>${name}</strong>,
//         </p>
//         <p style="color: #475569; line-height: 1.6;">
//           You have received an official <strong>${type}</strong> from <strong>${senderDetails.name}</strong> (${senderDetails.designation}, ${senderDetails.station}).
//         </p>

//         <div style="background-color: #f1f5f9; padding: 15px; border-left: 4px solid ${color}; margin: 20px 0; border-radius: 4px;">
//           <p style="margin: 0; font-weight: bold; color: #0F172A; font-size: 13px;">ACTION REQUIRED:</p>
//           <p style="margin: 5px 0 0; color: #334155; font-size: 14px;">Please login to your CrimeTrack Dashboard to view and download the official document.</p>
//         </div>

//         <p style="font-size: 12px; color: #64748b; margin-top: 30px;">
//           *This is a digitally generated alert. Do not reply to this email directly.*
//         </p>
//       </div>
//     </div>
//   `;
  
//   await sendBrevoEmail(email, subject, html);
// };

// module.exports = { 
//   sendOtpEmail, 
//   sendWelcomeEmail, 
//   sendComplaintConfirmation, 
//   sendStatusUpdateEmail,
//   sendAdminAlert,
//   sendMeetingInvite,    
//   sendProfileOtpEmail,  
//   sendProfileUpdateSuccessEmail,
//   sendHelpTicketAck,      
//   sendAdminReplyEmail,    
//   sendFeedbackThankYou,
//   sendNoticeAlert 
// };

















// const axios = require('axios');

// // 👇 CLOUDINARY LOGO LINK
// const LOGO_URL = "https://res.cloudinary.com/dukrcgv8s/image/upload/v1770304918/CrimeTrack_abbtdr.png"; 

// // --- 🎨 HELPER: Common Email Header (Logo + Title) ---
// const getEmailHeader = (title) => {
//   return `
//     <div style="background-color: #0F172A; color: white; padding: 25px; text-align: center; border-top-left-radius: 8px; border-top-right-radius: 8px;">
//       <img src="${LOGO_URL}" alt="CrimeTrack Logo" style="width: 60px; height: 60px; margin-bottom: 10px; object-fit: contain; display: block; margin-left: auto; margin-right: auto;" />
//       <h2 style="margin: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 20px; letter-spacing: 1px;">CRIMETRACK</h2>
//       <p style="margin: 5px 0 0; font-size: 12px; text-transform: uppercase; opacity: 0.8;">${title}</p>
//     </div>
//   `;
// };

// // --- 🎨 HELPER: Common Footer ---
// const getEmailFooter = () => {
//   return `
//     <div style="background-color: #f1f5f9; color: #64748b; padding: 15px; text-align: center; font-size: 11px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;">
//       <p style="margin: 0;">This is a system-generated email from the CrimeTrack Digital Policing Network.</p>
//       <p style="margin: 5px 0 0;">&copy; ${new Date().getFullYear()} CrimeTrack. All rights reserved.</p>
//     </div>
//   `;
// };

// // --- 🛠️ HELPER: Generate Detailed HTML Template (For FIR/Status) ---
// const generateCaseEmailTemplate = (report, title, highlightRemark = "") => {
//   const record = report.officialRecord || {};
  
//   const recordDate = record.recordDate ? new Date(record.recordDate).toLocaleString() : "N/A";
//   const incidentDate = record.occurrenceDate ? `${record.occurrenceDate} at ${record.occurrenceTime}` : "N/A";

//   const actsString = record.acts && record.acts.length > 0 
//     ? record.acts.map(a => `${a.actName} (Sec: ${a.section})`).join(', ') 
//     : "N/A";

//   return `
//     <div style="font-family: Arial, sans-serif; max-width: 700px; margin: auto; border: 1px solid #e2e8f0; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
//       ${getEmailHeader("Official Notification")}
//       <div style="background-color: #ffffff; padding: 20px; border-bottom: 2px solid #3b82f6;">
//         <h3 style="color: #1e40af; margin-top: 0; font-size: 18px;">${title}</h3>
//         <p style="font-size: 14px; color: #475569; line-height: 1.5;">
//           <strong>Case ID:</strong> #${report._id} <br/>
//           <strong>Police Station:</strong> ${report.selectedStation}
//         </p>
//         ${highlightRemark ? `
//         <div style="background-color: #fff7ed; border-left: 4px solid #f97316; padding: 15px; margin-top: 15px; border-radius: 4px;">
//           <p style="margin: 0; font-size: 11px; color: #9a3412; font-weight: bold; text-transform: uppercase;">Officer's Remark:</p>
//           <p style="margin: 5px 0 0; font-size: 14px; color: #1e293b; font-style: italic;">"${highlightRemark}"</p>
//         </div>` : ''}
//       </div>
//       <div style="padding: 20px; background-color: #ffffff;">
//         <h4 style="border-bottom: 1px solid #cbd5e1; padding-bottom: 8px; color: #334155; font-size: 14px; margin-top: 0;">OFFICIAL RECORD DETAILS</h4>
//         <table style="width: 100%; border-collapse: collapse; font-size: 13px; margin-top: 10px;">
//           <tr style="background-color: #f8fafc;">
//             <td style="padding: 10px; border: 1px solid #cbd5e1; font-weight: bold; width: 40%;">Record Number</td>
//             <td style="padding: 10px; border: 1px solid #cbd5e1; color: #b91c1c; font-weight: bold;">${record.recordNumber || "Pending"}</td>
//           </tr>
//           <tr>
//             <td style="padding: 10px; border: 1px solid #cbd5e1; font-weight: bold;">Filing Date</td>
//             <td style="padding: 10px; border: 1px solid #cbd5e1;">${recordDate}</td>
//           </tr>
//           <tr style="background-color: #f8fafc;">
//             <td style="padding: 10px; border: 1px solid #cbd5e1; font-weight: bold;">Applicable Acts</td>
//             <td style="padding: 10px; border: 1px solid #cbd5e1;">${actsString}</td>
//           </tr>
//           <tr>
//             <td style="padding: 10px; border: 1px solid #cbd5e1; font-weight: bold;">Incident Location</td>
//             <td style="padding: 10px; border: 1px solid #cbd5e1;">${record.incidentPlace || report.incidentLocationAddress || "N/A"}</td>
//           </tr>
//           <tr style="background-color: #f8fafc;">
//             <td style="padding: 10px; border: 1px solid #cbd5e1; font-weight: bold;">Occurrence</td>
//             <td style="padding: 10px; border: 1px solid #cbd5e1;">${incidentDate}</td>
//           </tr>
//           <tr>
//             <td style="padding: 10px; border: 1px solid #cbd5e1; font-weight: bold;">Officer In-Charge</td>
//             <td style="padding: 10px; border: 1px solid #cbd5e1;">${record.investigatingOfficer || report.assignedOfficer} (${record.rank || "Officer"})</td>
//           </tr>
//         </table>
//       </div>
//       ${getEmailFooter()}
//     </div>
//   `;
// };

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
//   }
// };

// /* ==========================================
//     1. AUTHENTICATION & PROFILE EMAILS
// ========================================== */
// const sendOtpEmail = async (email, otp) => {
//   const subject = "Verification Code - CrimeTrack";
//   const html = `
//     <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto; border: 1px solid #e2e8f0; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
//       ${getEmailHeader("Secure Verification")}
//       <div style="padding: 30px; text-align: center; background-color: #ffffff;">
//         <p style="font-size: 16px; color: #334155;">Your One-Time Password (OTP) is:</p>
//         <div style="background-color: #f1f5f9; display: inline-block; padding: 15px 30px; margin: 20px 0; border-radius: 8px; letter-spacing: 5px; font-size: 32px; font-weight: bold; color: #0F172A; border: 1px dashed #94a3b8;">
//           ${otp}
//         </div>
//         <p style="font-size: 13px; color: #64748b;">This code is valid for 10 minutes. Do not share it with anyone.</p>
//       </div>
//       ${getEmailFooter()}
//     </div>`;
//   await sendBrevoEmail(email, subject, html);
// };

// const sendWelcomeEmail = async (email, name, password) => {
//   const subject = "Welcome to CrimeTrack - Registration Successful";
//   const html = `
//     <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e2e8f0; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
//       ${getEmailHeader("Registration Successful")}
//       <div style="padding: 30px; background-color: #ffffff;">
//         <p style="font-size: 16px; color: #334155;">Hello <strong>${name}</strong>,</p>
//         <p style="color: #475569; line-height: 1.6;">Welcome to the CrimeTrack Portal. Your account has been successfully created.</p>
//         <div style="background-color: #f8fafc; padding: 20px; border-radius: 6px; margin: 20px 0; border: 1px solid #e2e8f0;">
//           <p style="margin: 0 0 10px; font-weight: bold; color: #0F172A; text-transform: uppercase; font-size: 12px;">Your Login Credentials:</p>
//           <ul style="list-style: none; padding: 0; margin: 0;">
//             <li style="margin-bottom: 8px;">📧 <strong>Username:</strong> ${email}</li>
//             <li>🔑 <strong>Password:</strong> ${password}</li>
//           </ul>
//         </div>
//         <p style="color: #ef4444; font-size: 13px; font-weight: bold;">⚠️ Security Alert: Please change your password immediately after logging in.</p>
//       </div>
//       ${getEmailFooter()}
//     </div>`;
//   await sendBrevoEmail(email, subject, html);
// };

// const sendProfileOtpEmail = async (email, otp) => {
//   const subject = "Security Alert: Profile Edit Request";
//   const html = `
//     <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto; border: 1px solid #e2e8f0; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
//       ${getEmailHeader("Security Verification")}
//       <div style="padding: 30px; text-align: center; background-color: #ffffff;">
//         <p style="font-size: 16px; color: #b91c1c; font-weight: bold;">Action Required: Profile Update</p>
//         <p style="font-size: 14px; color: #334155;">You requested to edit your profile details.</p>
//         <div style="background-color: #fef2f2; display: inline-block; padding: 15px 30px; margin: 20px 0; border-radius: 8px; letter-spacing: 5px; font-size: 32px; font-weight: bold; color: #dc2626; border: 1px dashed #f87171;">
//           ${otp}
//         </div>
//       </div>
//       ${getEmailFooter()}
//     </div>`;
//   await sendBrevoEmail(email, subject, html);
// };

// const sendProfileUpdateSuccessEmail = async (email, name) => {
//   const subject = "Profile Updated Successfully - CrimeTrack";
//   const html = `
//     <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e2e8f0; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
//       ${getEmailHeader("Profile Update Notification")}
//       <div style="padding: 30px; background-color: #ffffff;">
//         <p style="font-size: 16px; color: #334155;">Hello <strong>${name}</strong>,</p>
//         <p style="color: #475569; line-height: 1.6;">Your profile details have been successfully updated and are now live.</p>
//       </div>
//       ${getEmailFooter()}
//     </div>`;
//   await sendBrevoEmail(email, subject, html);
// };

// /* ==========================================
//     2. CASE & COMPLAINT EMAILS
// ========================================== */
// const sendComplaintConfirmation = async (email, name, complaintId) => {
//   const subject = `Complaint Received: #${complaintId}`;
//   const html = `
//     <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e2e8f0; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
//       ${getEmailHeader("Complaint Acknowledgment")}
//       <div style="padding: 30px; background-color: #ffffff;">
//         <p style="font-size: 16px; color: #334155;">Hello <strong>${name}</strong>,</p>
//         <div style="text-align: center; margin: 25px 0;">
//           <p style="font-size: 12px; text-transform: uppercase; color: #64748b; margin-bottom: 5px;">Reference ID</p>
//           <span style="font-size: 24px; font-weight: bold; color: #2563eb; background-color: #eff6ff; padding: 10px 20px; border-radius: 50px;">#${complaintId}</span>
//         </div>
//         <p style="color: #475569; font-size: 14px;">The concerned authority will review your complaint shortly.</p>
//       </div>
//       ${getEmailFooter()}
//     </div>`;
//   await sendBrevoEmail(email, subject, html);
// };

// const sendStatusUpdateEmail = async (email, report, status, officerRemark) => {
//   const subject = `Case Update: #${report._id} - ${status}`;
//   const isOfficialFiling = status.includes("FIR") || status.includes("NCR");
//   let title = isOfficialFiling ? `OFFICIAL ${status} GENERATED` : `CASE STATUS UPDATED: ${status}`;
//   const html = generateCaseEmailTemplate(report, title, officerRemark);
//   await sendBrevoEmail(email, subject, html);
// };

// /* ==========================================
//     3. ADMINISTRATIVE & MEETING EMAILS
// ========================================== */
// const sendAdminAlert = async (action, user) => {
//   const ownerEmail = "sushanttelekune@gmail.com";
//   const subject = `Admin Alert: User ${action} - ${user.name}`;
//   const time = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
//   const colorMap = { 'Signup': '#16a34a', 'Login': '#2563eb', 'Logout': '#dc2626' };
//   const color = colorMap[action] || '#64748b';
//   const html = `
//     <div style="max-width: 600px; margin: auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
//       ${getEmailHeader("Admin Security Alert")}
//       <div style="padding: 25px; background-color: #fff;">
//          <h3 style="color: ${color}; border-bottom: 2px solid ${color}; padding-bottom: 10px;">${action.toUpperCase()} DETECTED</h3>
//          <p><strong>Timestamp:</strong> ${time}</p>
//          <p><strong>Name:</strong> ${user.name}</p>
//          <p><strong>Email:</strong> ${user.email}</p>
//          <p><strong>Role:</strong> ${user.role}</p>
//       </div>
//       ${getEmailFooter()}
//     </div>`;
//   await sendBrevoEmail(ownerEmail, subject, html);
// };

// const sendMeetingInvite = async (email, name, meetingDetails) => {
//   const subject = `Meeting Invitation: ${meetingDetails.title}`;
//   const meetingTime = new Date(meetingDetails.scheduledTime).toLocaleString();
//   const html = `
//     <div style="max-width: 600px; margin: auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
//       ${getEmailHeader("Meeting Invitation")}
//       <div style="padding: 30px; background-color: #ffffff;">
//         <p>Hello <strong>${name}</strong>, you have been invited to an official meeting.</p>
//         <div style="background-color: #f8fafc; padding: 20px; border-radius: 6px; margin: 20px 0; border: 1px solid #e2e8f0;">
//           <p>📌 <strong>Topic:</strong> ${meetingDetails.title}</p>
//           <p>⏰ <strong>Time:</strong> ${meetingTime}</p>
//         </div>
//       </div>
//       ${getEmailFooter()}
//     </div>`;
//   await sendBrevoEmail(email, subject, html);
// };

// /* ==========================================
//     4. SUPPORT & NOTICE EMAILS (NEW IN v1.3)
// ========================================== */
// const sendHelpTicketAck = async (email, name, ticketId) => {
//   const subject = `[Ticket #${ticketId.toString().slice(-6)}] Help Request Received`;
//   const html = `
//     <div style="max-width: 600px; margin: auto; border: 1px solid #e2e8f0; border-radius: 8px;">
//       ${getEmailHeader("Help Request Received")}
//       <div style="padding: 30px;">
//         <p>Hello <strong>${name}</strong>, we have received your request. Ticket ID: <strong>${ticketId}</strong>.</p>
//       </div>
//       ${getEmailFooter()}
//     </div>`;
//   await sendBrevoEmail(email, subject, html);
// };

// const sendAdminReplyEmail = async (email, name, ticketId, adminMessage) => {
//   const subject = `[Ticket #${ticketId.toString().slice(-6)}] New Reply from Admin`;
//   const html = `
//     <div style="max-width: 600px; margin: auto; border: 1px solid #e2e8f0; border-radius: 8px;">
//       ${getEmailHeader("Support Ticket Update")}
//       <div style="padding: 30px;">
//         <div style="background-color: #f3f4f6; padding: 15px; border-left: 4px solid #3b82f6;">
//           <strong>Admin Reply:</strong><br><p>${adminMessage}</p>
//         </div>
//       </div>
//       ${getEmailFooter()}
//     </div>`;
//   await sendBrevoEmail(email, subject, html);
// };

// const sendFeedbackThankYou = async (email, name, type) => {
//   const subject = `Thank You for your ${type}!`;
//   const html = `
//     <div style="max-width: 600px; margin: auto; border: 1px solid #e2e8f0; border-radius: 8px;">
//       ${getEmailHeader("Feedback Received")}
//       <div style="padding: 30px;"><p>Hello <strong>${name}</strong>, thank you for your ${type}!</p></div>
//       ${getEmailFooter()}
//     </div>`;
//   await sendBrevoEmail(email, subject, html);
// };

// const sendNoticeAlert = async (email, name, senderDetails, type) => {
//   const subject = `Official ${type} Received - CrimeTrack`;
//   const color = type === 'Notice' ? '#dc2626' : '#2563eb'; 
//   const html = `
//     <div style="max-width: 600px; margin: auto; border: 1px solid #cbd5e1; border-radius: 8px; overflow: hidden;">
//       <div style="background-color: #0F172A; color: white; padding: 20px; text-align: center;">
//         <img src="${LOGO_URL}" alt="Logo" style="width: 50px;" />
//         <h2 style="margin: 0;">OFFICIAL ${type.toUpperCase()}</h2>
//       </div>
//       <div style="padding: 30px;">
//         <p>Dear <strong>${name}</strong>, you have received a <strong>${type}</strong> from <strong>${senderDetails.name}</strong>.</p>
//         <p>Please login to your dashboard to download the document.</p>
//       </div>
//       ${getEmailFooter()}
//     </div>`;
//   await sendBrevoEmail(email, subject, html);
// };

// module.exports = { 
//   sendOtpEmail, 
//   sendWelcomeEmail, 
//   sendComplaintConfirmation, 
//   sendStatusUpdateEmail,
//   sendAdminAlert,
//   sendMeetingInvite,    
//   sendProfileOtpEmail,  
//   sendProfileUpdateSuccessEmail,
//   sendHelpTicketAck,      
//   sendAdminReplyEmail,    
//   sendFeedbackThankYou,
//   sendNoticeAlert 
// };














// const axios = require('axios');

// // 👇 CLOUDINARY LOGO LINK
// const LOGO_URL = "https://res.cloudinary.com/dukrcgv8s/image/upload/v1770304918/CrimeTrack_abbtdr.png"; 

// // ==========================================
// // 🎨 UI HELPERS (STYLES & COMPONENTS)
// // ==========================================

// // 1. Common Header
// const getEmailHeader = (title, color = "#0F172A") => {
//   return `
//     <div style="background-color: ${color}; color: white; padding: 25px; text-align: center; border-top-left-radius: 8px; border-top-right-radius: 8px;">
//       <img src="${LOGO_URL}" alt="CrimeTrack Logo" style="width: 60px; height: 60px; margin-bottom: 10px; object-fit: contain; display: block; margin-left: auto; margin-right: auto;" />
//       <h2 style="margin: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 20px; letter-spacing: 1px;">CRIMETRACK</h2>
//       <p style="margin: 5px 0 0; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; opacity: 0.9;">${title}</p>
//     </div>
//   `;
// };

// // 2. Common Footer
// const getEmailFooter = () => {
//   return `
//     <div style="background-color: #f8fafc; color: #64748b; padding: 20px; text-align: center; font-size: 11px; border-top: 1px solid #e2e8f0; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;">
//       <p style="margin: 0;"><strong>Confidentiality Notice:</strong> This email and any attachments are confidential and intended solely for the use of the individual or entity to whom they are addressed.</p>
//       <p style="margin: 10px 0 0;">&copy; ${new Date().getFullYear()} CrimeTrack Digital Policing Network. All rights reserved.</p>
//     </div>
//   `;
// };

// // 3. ⭐ NEW: Official Digital Signature Block
// // Use this to show exactly WHO sent the email (Officer Name, Rank, Station)
// const getOfficialSignature = (name, designation, station) => {
//   return `
//     <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
//       <p style="font-size: 10px; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 10px;">Issued By Authority:</p>
//       <div style="display: flex; align-items: center;">
//         <div style="border-left: 4px solid #1e40af; padding-left: 15px;">
//           <p style="margin: 0; font-weight: bold; color: #0F172A; font-size: 15px;">${name}</p>
//           <p style="margin: 2px 0 0; font-size: 13px; color: #475569; font-weight: 600;">${designation || "Officer In-Charge"}</p>
//           <p style="margin: 2px 0 0; font-size: 13px; color: #64748b;">${station || "Police Headquarters"}</p>
//         </div>
//       </div>
//     </div>
//   `;
// };

// // 4. Helper to Send via Brevo
// const sendBrevoEmail = async (to, subject, htmlContent) => {
//   try {
//     await axios.post(
//       'https://api.brevo.com/v3/smtp/email',
//       {
//         sender: { email: process.env.EMAIL_FROM, name: 'CrimeTrack Official' },
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
//   }
// };

// /* ==========================================
//    1. NOTICE & ALERTS (High Priority)
//    (Refactored for detailed Sender Info)
// ========================================== */
// const sendNoticeAlert = async (email, name, senderDetails, type) => {
//   // senderDetails must contain: { name, designation, station }
//   const isUrgent = type.toLowerCase().includes('urgent') || type.toLowerCase().includes('warrant');
//   const headerColor = isUrgent ? '#dc2626' : '#1e40af'; // Red for urgent, Blue for normal
//   const subject = `OFFICIAL ${type.toUpperCase()}: ${senderDetails.station}`;

//   const html = `
//     <div style="font-family: Arial, sans-serif; max-width: 650px; margin: auto; border: 1px solid #e2e8f0; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
//       ${getEmailHeader("Official Correspondence", headerColor)}
      
//       <div style="padding: 30px; background-color: #ffffff;">
//         <p style="font-size: 14px; color: #64748b; margin-bottom: 5px;">To: ${name}</p>
//         <h3 style="margin: 0 0 20px 0; color: #1e293b; font-size: 18px;">Subject: Official ${type} Received</h3>
        
//         <p style="color: #334155; line-height: 1.6;">
//           You are hereby notified that an official <strong>${type}</strong> has been issued to you or your department.
//           Please access the secure dashboard immediately to view the full documentation.
//         </p>

//         <div style="background-color: #f1f5f9; border: 1px solid #e2e8f0; padding: 15px; border-radius: 6px; margin: 20px 0;">
//           <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
//              <tr>
//                <td style="color: #64748b; padding-bottom: 5px;">Document Type:</td>
//                <td style="font-weight: bold; color: #0f172a; padding-bottom: 5px;">${type}</td>
//              </tr>
//              <tr>
//                <td style="color: #64748b; padding-bottom: 5px;">Date Issued:</td>
//                <td style="font-weight: bold; color: #0f172a; padding-bottom: 5px;">${new Date().toLocaleString()}</td>
//              </tr>
//              <tr>
//                <td style="color: #64748b;">Origin:</td>
//                <td style="font-weight: bold; color: #0f172a;">${senderDetails.station}</td>
//              </tr>
//           </table>
//         </div>

//         <div style="text-align: center; margin: 25px 0;">
//           <a href="#" style="background-color: ${headerColor}; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold; font-size: 14px;">Access Dashboard</a>
//         </div>

//         ${getOfficialSignature(senderDetails.name, senderDetails.designation, senderDetails.station)}
//       </div>
//       ${getEmailFooter()}
//     </div>`;

//   await sendBrevoEmail(email, subject, html);
// };

// /* ==========================================
//    2. CASE UPDATES & FIRs (Detailed Table)
// ========================================== */
// const generateCaseEmailTemplate = (report, title, highlightRemark = "") => {
//   const record = report.officialRecord || {};
//   const recordDate = record.recordDate ? new Date(record.recordDate).toLocaleString() : "N/A";
  
//   // Determine who is "signing" this update
//   const signerName = record.investigatingOfficer || report.assignedOfficer || "System Administrator";
//   const signerRank = record.rank || "Officer";
//   const signerStation = report.selectedStation || "Police HQ";

//   const actsString = record.acts && record.acts.length > 0 
//     ? record.acts.map(a => `${a.actName} (Sec: ${a.section})`).join(', ') 
//     : "N/A";

//   return `
//     <div style="font-family: Arial, sans-serif; max-width: 700px; margin: auto; border: 1px solid #e2e8f0; border-radius: 8px;">
//       ${getEmailHeader("Case Status Notification", "#0F172A")}
      
//       <div style="padding: 30px; background-color: #ffffff;">
//         <h3 style="color: #1e40af; margin-top: 0; font-size: 18px; text-transform: uppercase; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">${title}</h3>

//         ${highlightRemark ? `
//         <div style="background-color: #fff7ed; border-left: 4px solid #f97316; padding: 15px; margin: 20px 0; border-radius: 4px;">
//           <p style="margin: 0; font-size: 11px; color: #9a3412; font-weight: bold; text-transform: uppercase;">Officer's Remark:</p>
//           <p style="margin: 5px 0 0; font-size: 14px; color: #1e293b; font-style: italic;">"${highlightRemark}"</p>
//         </div>` : ''}

//         <p style="font-size: 12px; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; margin-top: 20px;">Official Case Record</p>
        
//         <table style="width: 100%; border-collapse: collapse; font-size: 13px; margin-top: 5px; border: 1px solid #e2e8f0;">
//           <tr style="background-color: #f8fafc;">
//             <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #475569; width: 35%;">Case ID</td>
//             <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #0F172A;">#${report._id}</td>
//           </tr>
//           <tr>
//             <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #475569;">Record Number (FIR/NCR)</td>
//             <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; color: #b91c1c; font-weight: bold;">${record.recordNumber || "Processing"}</td>
//           </tr>
//           <tr style="background-color: #f8fafc;">
//              <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #475569;">Filing Date</td>
//              <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">${recordDate}</td>
//           </tr>
//           <tr>
//              <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #475569;">Police Station</td>
//              <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">${report.selectedStation}</td>
//           </tr>
//           <tr style="background-color: #f8fafc;">
//              <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #475569;">Applicable Acts</td>
//              <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">${actsString}</td>
//           </tr>
//         </table>

//         ${getOfficialSignature(signerName, signerRank, signerStation)}
//       </div>
//       ${getEmailFooter()}
//     </div>
//   `;
// };

// const sendStatusUpdateEmail = async (email, report, status, officerRemark) => {
//   const subject = `Case Update: #${report._id} - ${status}`;
//   const isOfficialFiling = status.includes("FIR") || status.includes("NCR");
//   let title = isOfficialFiling ? `OFFICIAL ${status} GENERATED` : `CASE STATUS UPDATED: ${status}`;
//   const html = generateCaseEmailTemplate(report, title, officerRemark);
//   await sendBrevoEmail(email, subject, html);
// };

// /* ==========================================
//    3. AUTHENTICATION (OTP / Welcome)
// ========================================== */
// const sendOtpEmail = async (email, otp) => {
//   const subject = "Verification Code - CrimeTrack";
//   const html = `
//     <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto; border: 1px solid #e2e8f0; border-radius: 8px;">
//       ${getEmailHeader("Secure Access")}
//       <div style="padding: 40px 30px; text-align: center; background-color: #ffffff;">
//         <p style="font-size: 16px; color: #334155; margin-bottom: 20px;">Please use the following One-Time Password (OTP) to verify your identity.</p>
        
//         <div style="background-color: #f8fafc; display: inline-block; padding: 15px 40px; border-radius: 8px; border: 2px dashed #cbd5e1;">
//           <span style="letter-spacing: 8px; font-size: 32px; font-weight: bold; color: #0F172A;">${otp}</span>
//         </div>
        
//         <p style="font-size: 12px; color: #94a3b8; margin-top: 20px;">This code expires in 10 minutes. <br>If you did not request this, please ignore this email.</p>
//       </div>
//       ${getEmailFooter()}
//     </div>`;
//   await sendBrevoEmail(email, subject, html);
// };

// const sendWelcomeEmail = async (email, name, password) => {
//   const subject = "Welcome to CrimeTrack - Registration Successful";
//   const html = `
//     <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e2e8f0; border-radius: 8px;">
//       ${getEmailHeader("Account Created", "#16a34a")}
//       <div style="padding: 30px; background-color: #ffffff;">
//         <p style="font-size: 16px; color: #334155;">Welcome <strong>${name}</strong>,</p>
//         <p style="color: #475569;">Your account on the CrimeTrack Digital Policing Network is now active.</p>
        
//         <div style="background-color: #f0fdf4; border-left: 4px solid #16a34a; padding: 20px; margin: 25px 0; border-radius: 4px;">
//           <h4 style="margin: 0 0 10px 0; color: #166534; font-size: 14px; text-transform: uppercase;">Login Credentials</h4>
//           <p style="margin: 0 0 5px 0; font-size: 14px;"><strong>Username:</strong> ${email}</p>
//           <p style="margin: 0; font-size: 14px;"><strong>Password:</strong> ${password}</p>
//         </div>
        
//         <p style="color: #dc2626; font-size: 12px; font-weight: bold;">⚠️ For security reasons, please change your password immediately after your first login.</p>
//       </div>
//       ${getEmailFooter()}
//     </div>`;
//   await sendBrevoEmail(email, subject, html);
// };

// /* ==========================================
//    4. MEETING INVITES
// ========================================== */
// const sendMeetingInvite = async (email, name, meetingDetails) => {
//   const subject = `Meeting Invitation: ${meetingDetails.title}`;
//   const meetingDate = new Date(meetingDetails.scheduledTime);
//   const dateStr = meetingDate.toLocaleDateString();
//   const timeStr = meetingDate.toLocaleTimeString();

//   const html = `
//     <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e2e8f0; border-radius: 8px;">
//       ${getEmailHeader("Official Meeting")}
//       <div style="padding: 30px; background-color: #ffffff;">
//         <p>Hello <strong>${name}</strong>,</p>
//         <p>You have been invited to attend the following meeting:</p>
        
//         <div style="display: flex; margin: 25px 0; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
//           <div style="background-color: #3b82f6; width: 8px;"></div>
//           <div style="padding: 20px; flex: 1;">
//             <h3 style="margin: 0 0 5px 0; color: #0F172A; font-size: 18px;">${meetingDetails.title}</h3>
//             <p style="margin: 0; color: #64748b; font-size: 14px;">📅 ${dateStr} &nbsp; | &nbsp; ⏰ ${timeStr}</p>
//           </div>
//         </div>

//         <p style="font-size: 13px; color: #64748b;">Please login to the portal to view the agenda and participant list.</p>
//       </div>
//       ${getEmailFooter()}
//     </div>`;
//   await sendBrevoEmail(email, subject, html);
// };

// /* ==========================================
//    5. ADMIN & SYSTEM ALERTS
// ========================================== */
// const sendAdminAlert = async (action, user) => {
//   const ownerEmail = "sushanttelekune@gmail.com";
//   const subject = `Admin Alert: User ${action} - ${user.name}`;
//   const time = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
  
//   // Dynamic color coding
//   let color = '#64748b'; // default gray
//   if (action === 'Signup') color = '#16a34a'; // green
//   if (action === 'Login') color = '#2563eb';  // blue
//   if (action === 'Logout') color = '#dc2626'; // red

//   const html = `
//     <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e2e8f0; border-radius: 8px;">
//       ${getEmailHeader("System Monitor", color)}
//       <div style="padding: 25px; background-color: #ffffff;">
//          <h3 style="color: ${color}; margin-top: 0; border-bottom: 2px solid ${color}; padding-bottom: 10px; text-transform: uppercase;">${action} Event Detected</h3>
         
//          <table style="width: 100%; font-size: 14px; margin-top: 15px;">
//            <tr><td style="padding: 5px; color: #64748b; width: 30%;">User Name:</td><td style="font-weight: bold;">${user.name}</td></tr>
//            <tr><td style="padding: 5px; color: #64748b;">Email:</td><td style="font-weight: bold;">${user.email}</td></tr>
//            <tr><td style="padding: 5px; color: #64748b;">Role:</td><td style="font-weight: bold;">${user.role}</td></tr>
//            <tr><td style="padding: 5px; color: #64748b;">Time:</td><td style="font-weight: bold;">${time}</td></tr>
//          </table>
//       </div>
//       ${getEmailFooter()}
//     </div>`;
//   await sendBrevoEmail(ownerEmail, subject, html);
// };

// // ... Keep other simple functions (Profile Updates, Help Tickets) using the getEmailHeader/Footer pattern ...

// const sendComplaintConfirmation = async (email, name, complaintId) => {
//   const subject = `Complaint Received: #${complaintId}`;
//   const html = `
//     <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e2e8f0; border-radius: 8px;">
//       ${getEmailHeader("Complaint Received")}
//       <div style="padding: 30px; background-color: #ffffff; text-align: center;">
//         <p style="font-size: 16px; color: #334155;">Hello <strong>${name}</strong>,</p>
//         <p style="color: #64748b;">Your complaint has been successfully registered.</p>
        
//         <div style="background-color: #eff6ff; display: inline-block; padding: 10px 30px; border-radius: 50px; margin: 20px 0;">
//           <span style="color: #2563eb; font-weight: bold; font-size: 20px;">#${complaintId}</span>
//         </div>
        
//         <p style="font-size: 13px; color: #64748b;">You will receive updates via email as the investigation proceeds.</p>
//       </div>
//       ${getEmailFooter()}
//     </div>`;
//   await sendBrevoEmail(email, subject, html);
// };

// // Placeholder for remaining simple functions to keep file complete
// const sendProfileOtpEmail = async (email, otp) => sendOtpEmail(email, otp); // Reusing OTP template for simplicity
// const sendProfileUpdateSuccessEmail = async (email, name) => sendWelcomeEmail(email, name, "******"); // Reusing for structure
// const sendHelpTicketAck = async (email, name, ticketId) => {
//     const html = `<div style="max-width:600px; margin:auto;">${getEmailHeader("Support")}<div style="padding:20px;">Ticket #${ticketId} received.</div>${getEmailFooter()}</div>`;
//     await sendBrevoEmail(email, `Ticket #${ticketId}`, html);
// };
// const sendAdminReplyEmail = async (email, name, ticketId, msg) => {
//     const html = `<div style="max-width:600px; margin:auto;">${getEmailHeader("Support Reply")}<div style="padding:20px;"><h3>Reply to #${ticketId}</h3><p>${msg}</p></div>${getEmailFooter()}</div>`;
//     await sendBrevoEmail(email, `Reply #${ticketId}`, html);
// };
// const sendFeedbackThankYou = async (email, name, type) => {
//     const html = `<div style="max-width:600px; margin:auto;">${getEmailHeader("Feedback")}<div style="padding:20px;">Thanks for your ${type}.</div>${getEmailFooter()}</div>`;
//     await sendBrevoEmail(email, "Thank You", html);
// };

// module.exports = { 
//   sendOtpEmail, 
//   sendWelcomeEmail, 
//   sendComplaintConfirmation, 
//   sendStatusUpdateEmail,
//   sendAdminAlert,
//   sendMeetingInvite,    
//   sendProfileOtpEmail,  
//   sendProfileUpdateSuccessEmail,
//   sendHelpTicketAck,      
//   sendAdminReplyEmail,    
//   sendFeedbackThankYou,
//   sendNoticeAlert 
// };






























// const axios = require('axios');

// // ==========================================
// // 🔗 BRANDING & CONFIGURATION
// // ==========================================
// const LOGO_URL = "https://res.cloudinary.com/dukrcgv8s/image/upload/v1770304918/CrimeTrack_abbtdr.png"; 

// const COLORS = {
//     navy: "#0F172A",    // Official Primary
//     blue: "#2563eb",    // Informational
//     red: "#dc2626",     // Urgent/Alert
//     green: "#16a34a",   // Success/Confirmed
//     slate: "#64748b",   // Text/Muted
//     bg: "#f8fafc",      // Page Background
//     border: "#e2e8f0"   // Dividers
// };

// // ==========================================
// // 🎨 REUSABLE UI COMPONENTS (HTML)
// // ==========================================

// const getEmailHeader = (title, color = COLORS.navy) => `
//     <div style="background-color: ${color}; color: white; padding: 30px 20px; text-align: center; border-top-left-radius: 12px; border-top-right-radius: 12px;">
//       <img src="${LOGO_URL}" alt="CrimeTrack Logo" style="width: 70px; height: auto; margin-bottom: 12px;" />
//       <h1 style="margin: 0; font-family: 'Segoe UI', Tahoma, sans-serif; font-size: 24px; letter-spacing: 2px; text-transform: uppercase;">CrimeTrack</h1>
//       <p style="margin: 8px 0 0; font-size: 12px; font-weight: 300; opacity: 0.8; text-transform: uppercase; letter-spacing: 1px;">${title}</p>
//     </div>
// `;

// const getEmailFooter = () => `
//     <div style="background-color: #f1f5f9; color: #64748b; padding: 20px; text-align: center; font-size: 11px; border-bottom-left-radius: 12px; border-bottom-right-radius: 12px; border-top: 1px solid ${COLORS.border};">
//       <p style="margin: 0; font-weight: bold;">Maharashtra State Police - Digital Policing Division</p>
//       <p style="margin: 5px 0 0;">This is an automated encrypted system communication. Please do not reply.</p>
//       <p style="margin: 10px 0 0;">&copy; ${new Date().getFullYear()} CrimeTrack. All Rights Reserved.</p>
//     </div>
// `;

// const infoRow = (label, value, isBold = false) => `
//     <tr>
//         <td style="padding: 12px; border-bottom: 1px solid ${COLORS.border}; color: ${COLORS.slate}; font-size: 13px; width: 35%; text-transform: uppercase;">${label}</td>
//         <td style="padding: 12px; border-bottom: 1px solid ${COLORS.border}; color: ${COLORS.navy}; font-size: 14px; ${isBold ? 'font-weight: bold;' : ''}">${value || "N/A"}</td>
//     </tr>
// `;

// // ==========================================
// // 🚀 CORE DISPATCHER (BREVO API)
// // ==========================================

// const sendBrevoEmail = async (to, subject, htmlContent) => {
//     try {
//         await axios.post('https://api.brevo.com/v3/smtp/email', {
//             sender: { email: process.env.EMAIL_FROM, name: 'CrimeTrack Official' },
//             to: [{ email: to }],
//             subject: subject,
//             htmlContent: `
//                 <body style="margin: 0; padding: 20px; background-color: ${COLORS.bg}; font-family: 'Segoe UI', Arial, sans-serif;">
//                     <div style="max-width: 600px; margin: auto; background: white; border-radius: 12px; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);">
//                         ${htmlContent}
//                     </div>
//                 </body>`
//         }, {
//             headers: { 'api-key': process.env.BREVO_API_KEY, 'Content-Type': 'application/json' }
//         });
//         console.log(`✉️ Email Success: [${subject}] to ${to}`);
//     } catch (error) {
//         console.error("❌ Email Failure:", error.response?.data || error.message);
//     }
// };

// // ==========================================
// // 🛡️ 1. AUTHENTICATION & SECURITY
// // ==========================================

// const sendOtpEmail = async (email, otp) => {
//     const html = `
//     ${getEmailHeader("Verify Your Identity", COLORS.blue)}
//     <div style="padding: 40px 20px; text-align: center;">
//         <p style="color: ${COLORS.slate}; font-size: 16px;">Authorization requested for your account access. Use the code below:</p>
//         <div style="background-color: ${COLORS.bg}; border: 2px dashed ${COLORS.blue}; display: inline-block; padding: 15px 40px; margin: 25px 0; border-radius: 12px; font-size: 38px; font-weight: 900; color: ${COLORS.navy}; letter-spacing: 10px;">
//             ${otp}
//         </div>
//         <p style="color: ${COLORS.slate}; font-size: 12px;">Expires in 10 minutes. Do not share this with anyone.</p>
//     </div>
//     ${getEmailFooter()}`;
//     await sendBrevoEmail(email, "Verification Code - CrimeTrack", html);
// };

// const sendWelcomeEmail = async (email, name, password) => {
//     const html = `
//     ${getEmailHeader("Account Created Successfully", COLORS.green)}
//     <div style="padding: 30px 25px;">
//         <h2 style="color: ${COLORS.navy}; font-size: 20px;">Welcome, ${name}</h2>
//         <p style="color: ${COLORS.slate}; line-height: 1.6;">Your credentials for the official CrimeTrack Digital Portal are listed below:</p>
//         <table style="width: 100%; border-collapse: collapse; margin: 20px 0; background: ${COLORS.bg}; border-radius: 8px;">
//             ${infoRow("Login Email", email, true)}
//             ${infoRow("Access Key", password, true)}
//             ${infoRow("Security Level", "Authorized User")}
//         </table>
//         <p style="color: ${COLORS.red}; font-size: 13px; font-weight: bold;">Note: Please change this password after your first login.</p>
//     </div>
//     ${getEmailFooter()}`;
//     await sendBrevoEmail(email, "Welcome to CrimeTrack", html);
// };

// // ==========================================
// // 🚨 2. CASE & OFFICIAL UPDATES
// // ==========================================

// const sendStatusUpdateEmail = async (email, report, status, officerRemark) => {
//     const isFIR = status.includes("FIR") || status.includes("NCR");
//     const themeColor = isFIR ? COLORS.red : COLORS.blue;
    
//     // Extracting Detailed Officer Information
//     const record = report.officialRecord || {};
//     const officerName = record.investigatingOfficer || report.assignedOfficer || "Department Officer";
//     const rank = record.rank || "Duty Officer";

//     const html = `
//     ${getEmailHeader("Official Case Update", themeColor)}
//     <div style="padding: 30px 25px;">
//         <h3 style="color: ${themeColor}; margin-bottom: 20px;">Status Change: ${status}</h3>
//         <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px;">
//             ${infoRow("Case Reference", `#${report._id.toString().toUpperCase()}`, true)}
//             ${infoRow("Police Station", report.selectedStation)}
//             ${infoRow("Reporting Officer", `${officerName} (${rank})`, true)}
//             ${infoRow("Updated Status", status, true)}
//         </table>
//         <div style="background-color: #f1f5f9; padding: 20px; border-radius: 8px; border-left: 5px solid ${themeColor};">
//             <p style="margin: 0 0 8px; font-weight: bold; color: ${COLORS.navy}; font-size: 11px; text-transform: uppercase;">Official Statement:</p>
//             <p style="margin: 0; color: #334155; font-style: italic; line-height: 1.6;">"${officerRemark}"</p>
//         </div>
//     </div>
//     ${getEmailFooter()}`;
//     await sendBrevoEmail(email, `Case Update: #${report._id.toString().slice(-6).toUpperCase()}`, html);
// };

// // ==========================================
// // 📹 3. VIRTUAL MEETINGS & NOTICES
// // ==========================================

// const sendMeetingInvite = async (email, name, meetingDetails) => {
//     const time = new Date(meetingDetails.scheduledTime).toLocaleString('en-IN', { dateStyle: 'full', timeStyle: 'short' });
//     const html = `
//     ${getEmailHeader("Meeting Summons", COLORS.navy)}
//     <div style="padding: 30px 25px;">
//         <p>Dear ${name}, you are requested to attend a virtual briefing regarding an official inquiry.</p>
//         <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
//             ${infoRow("Topic", meetingDetails.title, true)}
//             ${infoRow("Time (IST)", time, true)}
//             ${infoRow("Platform", "CrimeTrack Secure Video")}
//         </table>
//         <div style="text-align: center; margin-top: 30px;">
//             <a href="https://crimetrack.com/dashboard" style="background-color: ${COLORS.blue}; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 14px;">JOIN MEETING</a>
//         </div>
//     </div>
//     ${getEmailFooter()}`;
//     await sendBrevoEmail(email, `Official Meeting Invitation: ${meetingDetails.title}`, html);
// };

// // ==========================================
// // 🛠️ 4. EXPORTING THE SERVICE
// // ==========================================

// module.exports = {
//     sendOtpEmail,
//     sendWelcomeEmail,
//     sendMeetingInvite,
//     sendStatusUpdateEmail,
    
//     // Complaint Confirmation
//     sendComplaintConfirmation: async (email, name, id) => {
//         const html = `
//         ${getEmailHeader("Complaint Logged", COLORS.navy)}
//         <div style="padding: 30px 25px; text-align: center;">
//             <p>Your digital complaint has been officially registered in the police records.</p>
//             <div style="margin: 25px 0; background: ${COLORS.bg}; padding: 20px; border-radius: 8px;">
//                 <span style="font-size: 12px; color: ${COLORS.slate}; text-transform: uppercase;">Unique Complaint ID</span><br/>
//                 <span style="font-size: 24px; font-weight: bold; color: ${COLORS.blue};">#${id}</span>
//             </div>
//             <p style="font-size: 13px; color: ${COLORS.slate};">Track the progress on your portal using this ID.</p>
//         </div>
//         ${getEmailFooter()}`;
//         await sendBrevoEmail(email, "Complaint Registered Successfully", html);
//     },

//     // Admin Security Alerts
//     sendAdminAlert: async (action, user) => {
//         const html = `
//         ${getEmailHeader("System Admin Alert", COLORS.red)}
//         <div style="padding: 25px;">
//             <h4 style="border-bottom: 1px solid ${COLORS.border}; padding-bottom: 10px;">ACTION DETECTED: ${action.toUpperCase()}</h4>
//             <table style="width: 100%; border-collapse: collapse;">
//                 ${infoRow("Name", user.name)}
//                 ${infoRow("Role", user.role)}
//                 ${infoRow("Email", user.email)}
//                 ${infoRow("User ID", user._id)}
//             </table>
//         </div>
//         ${getEmailFooter()}`;
//         await sendBrevoEmail("sushanttelekune@gmail.com", `Security Alert: User ${action}`, html);
//     },

//     // Profile Edit Security
//     sendProfileOtpEmail: async (email, otp) => {
//         const html = `${getEmailHeader("Security: Profile Update", COLORS.red)}<div style="padding: 40px; text-align: center;"><p>Verification code for sensitive profile modification:</p><h2 style="font-size: 40px; letter-spacing: 5px;">${otp}</h2></div>${getEmailFooter()}`;
//         await sendBrevoEmail(email, "Security Alert: Profile Change", html);
//     },

//     // Support Response
//     sendAdminReplyEmail: async (email, name, ticketId, msg) => {
//         const html = `
//         ${getEmailHeader("Admin Response", COLORS.blue)}
//         <div style="padding: 30px 25px;">
//             <p>Re: Ticket #${ticketId}</p>
//             <div style="background: ${COLORS.bg}; padding: 20px; border-radius: 8px; border-left: 4px solid ${COLORS.blue};">
//                 <strong>Admin Team Statement:</strong><br/><p style="margin-top: 10px; line-height: 1.6;">${msg}</p>
//             </div>
//         </div>
//         ${getEmailFooter()}`;
//         await sendBrevoEmail(email, "Update to your Support Request", html);
//     }
// };


















// const axios = require('axios');

// // 👇 CLOUDINARY LOGO LINK
// const LOGO_URL = "https://res.cloudinary.com/dukrcgv8s/image/upload/v1770304918/CrimeTrack_abbtdr.png"; 

// // ==========================================
// // 🎨 GLOBAL STYLES & CONSTANTS
// // ==========================================
// const COLORS = {
//   primary: "#0F172A",   // Navy Blue (Official)
//   secondary: "#334155", // Slate Gray (Text)
//   accent: "#2563EB",    // Royal Blue (Links/Buttons)
//   success: "#166534",   // Green (Approved)
//   warning: "#D97706",   // Amber (Pending/Remark)
//   danger: "#DC2626",    // Red (Alerts/Notices)
//   bg: "#F1F5F9",        // Light Gray Background
//   white: "#FFFFFF",
//   border: "#E2E8F0"
// };

// const FONTS = `'Helvetica Neue', Helvetica, Arial, sans-serif`;

// // ==========================================
// // 🛠️ HELPER: Date Formatter
// // ==========================================
// const formatDate = (date) => {
//   if (!date) return "N/A";
//   return new Date(date).toLocaleString("en-IN", {
//     day: '2-digit', month: 'short', year: 'numeric',
//     hour: '2-digit', minute: '2-digit', hour12: true
//   });
// };

// // ==========================================
// // 🧱 LAYOUT COMPONENTS (Header, Footer, Wrapper)
// // ==========================================

// const getEmailHeader = (title, subtitle = "Digital Policing Network") => {
//   return `
//     <div style="background-color: ${COLORS.primary}; padding: 30px 20px; text-align: center; border-top-left-radius: 6px; border-top-right-radius: 6px;">
//       <img src="${LOGO_URL}" alt="CrimeTrack Logo" style="width: 70px; height: 70px; margin-bottom: 15px; display: block; margin-left: auto; margin-right: auto; object-fit: contain;" />
//       <h1 style="margin: 0; font-family: ${FONTS}; font-size: 24px; color: ${COLORS.white}; letter-spacing: 2px; text-transform: uppercase;">CRIMETRACK</h1>
//       <p style="margin: 5px 0 0; font-family: ${FONTS}; font-size: 12px; color: #94A3B8; text-transform: uppercase; letter-spacing: 1px;">${subtitle}</p>
//       <div style="margin-top: 15px; border-top: 1px solid #334155; width: 50%; margin-left: auto; margin-right: auto;"></div>
//       <h2 style="margin: 15px 0 0; font-family: ${FONTS}; font-size: 18px; color: ${COLORS.white}; font-weight: 400;">${title}</h2>
//     </div>
//   `;
// };

// const getEmailFooter = () => {
//   return `
//     <div style="background-color: ${COLORS.bg}; color: ${COLORS.secondary}; padding: 20px; text-align: center; font-size: 11px; font-family: ${FONTS}; border-bottom-left-radius: 6px; border-bottom-right-radius: 6px; border-top: 1px solid #E2E8F0;">
//       <p style="margin-bottom: 10px;"><strong>CONFIDENTIALITY NOTICE:</strong> The contents of this email message and any attachments are intended solely for the addressee(s) and may contain confidential and/or privileged information and may be legally protected from disclosure.</p>
//       <p style="margin: 0;">&copy; ${new Date().getFullYear()} CrimeTrack Digital Policing System. All rights reserved.</p>
//       <p style="margin: 5px 0 0;">System Generated Email • Do Not Reply</p>
//     </div>
//   `;
// };

// const wrapHtml = (content, title) => {
//   return `
//     <div style="background-color: #F8FAFC; padding: 40px 10px; font-family: ${FONTS};">
//       <div style="max-width: 680px; margin: auto; background-color: ${COLORS.white}; border-radius: 8px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);">
//         ${getEmailHeader(title)}
//         <div style="padding: 30px 40px;">
//           ${content}
//         </div>
//         ${getEmailFooter()}
//       </div>
//     </div>
//   `;
// };

// // ==========================================
// // 📨 BREVO SENDING FUNCTION
// // ==========================================
// const sendBrevoEmail = async (to, subject, htmlContent) => {
//   try {
//     if (!process.env.BREVO_API_KEY) {
//       console.error("❌ MISSING BREVO_API_KEY");
//       return;
//     }
//     await axios.post(
//       'https://api.brevo.com/v3/smtp/email',
//       {
//         sender: { email: process.env.EMAIL_FROM || "no-reply@crimetrack.gov", name: 'CrimeTrack Official' },
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
//     console.log(`✅ Email sent to ${to}: ${subject}`);
//   } catch (error) {
//     console.error("❌ Email Error:", error.response?.data || error.message);
//   }
// };

// /* ==========================================
//    1. AUTHENTICATION & SECURITY
// ========================================== */

// const sendOtpEmail = async (email, otp) => {
//   const content = `
//     <p style="font-size: 16px; color: ${COLORS.secondary}; margin-bottom: 20px;">Dear User,</p>
//     <p style="color: ${COLORS.secondary}; line-height: 1.6;">Use the verification code below to complete your secure login process. For your security, this code expires in 10 minutes.</p>
    
//     <div style="text-align: center; margin: 30px 0;">
//       <span style="font-size: 32px; font-weight: bold; letter-spacing: 8px; color: ${COLORS.primary}; background: #F1F5F9; padding: 15px 30px; border-radius: 4px; border: 1px dashed #94A3B8;">${otp}</span>
//     </div>

//     <p style="font-size: 12px; color: ${COLORS.danger}; text-align: center;"><strong>Warning:</strong> CrimeTrack staff will never ask for this code over the phone.</p>
//   `;
//   await sendBrevoEmail(email, "Secure Verification Code", wrapHtml(content, "IDENTITY VERIFICATION"));
// };

// const sendWelcomeEmail = async (email, name, password) => {
//   const content = `
//     <p style="font-size: 16px; color: ${COLORS.secondary};"><strong>Subject: Account Creation Successful</strong></p>
//     <p style="color: ${COLORS.secondary}; line-height: 1.6;">Dear ${name},</p>
//     <p style="color: ${COLORS.secondary}; line-height: 1.6;">Your official account has been created on the CrimeTrack Portal. You are now authorized to access digital policing services.</p>
    
//     <div style="background-color: #EFF6FF; border-left: 4px solid ${COLORS.accent}; padding: 20px; margin: 25px 0;">
//       <h4 style="margin: 0 0 10px; color: ${COLORS.accent}; text-transform: uppercase; font-size: 12px;">Login Credentials</h4>
//       <table style="width: 100%; font-size: 14px; color: ${COLORS.secondary};">
//         <tr>
//           <td style="padding: 5px 0; width: 100px;"><strong>Username:</strong></td>
//           <td>${email}</td>
//         </tr>
//         <tr>
//           <td style="padding: 5px 0;"><strong>Password:</strong></td>
//           <td><code>${password}</code></td>
//         </tr>
//       </table>
//     </div>
    
//     <p style="color: ${COLORS.secondary}; font-size: 13px;"><em>Please change your password immediately upon your first login via the Profile Settings page.</em></p>
//   `;
//   await sendBrevoEmail(email, "Welcome to CrimeTrack", wrapHtml(content, "NEW ACCOUNT REGISTRATION"));
// };

// /* ==========================================
//    2. CASE MANAGEMENT (Detailed & Official)
// ========================================== */

// const sendComplaintConfirmation = async (email, name, complaintId, stationName) => {
//   const date = formatDate(new Date());
//   const content = `
//     <div style="border-bottom: 1px solid #E2E8F0; padding-bottom: 15px; margin-bottom: 20px;">
//       <table style="width: 100%; font-size: 12px; color: #64748B;">
//         <tr>
//           <td><strong>DATE:</strong> ${date}</td>
//           <td style="text-align: right;"><strong>REF NO:</strong> ${complaintId}</td>
//         </tr>
//       </table>
//     </div>

//     <p style="color: ${COLORS.secondary}; line-height: 1.6;">Dear ${name},</p>
//     <p style="color: ${COLORS.secondary}; line-height: 1.6;">This is an automated acknowledgment that your complaint has been electronically received by <strong>${stationName || "Central Command"}</strong>.</p>

//     <div style="background-color: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 6px; padding: 20px; margin: 20px 0;">
//       <h3 style="margin-top: 0; color: ${COLORS.primary}; font-size: 16px; border-bottom: 1px solid #CBD5E1; padding-bottom: 10px;">COMPLAINT DETAILS</h3>
//       <table style="width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 14px;">
//         <tr>
//           <td style="padding: 8px 0; color: #64748B; width: 40%;">Complaint ID</td>
//           <td style="padding: 8px 0; font-weight: bold; color: ${COLORS.primary};">#${complaintId}</td>
//         </tr>
//         <tr>
//           <td style="padding: 8px 0; color: #64748B;">Jurisdiction</td>
//           <td style="padding: 8px 0; color: ${COLORS.secondary};">${stationName || "General"}</td>
//         </tr>
//         <tr>
//           <td style="padding: 8px 0; color: #64748B;">Current Status</td>
//           <td style="padding: 8px 0; color: ${COLORS.warning}; font-weight: bold;">UNDER REVIEW</td>
//         </tr>
//       </table>
//     </div>

//     <p style="color: ${COLORS.secondary}; font-size: 13px;">Your complaint will be reviewed by the assigned Station House Officer (SHO). You will receive further updates via email.</p>
//   `;
//   await sendBrevoEmail(email, `Complaint Acknowledgment: #${complaintId}`, wrapHtml(content, "COMPLAINT FILED"));
// };

// // 🌟 THE BIG ONE: DETAILED FIR/STATUS EMAIL
// const sendStatusUpdateEmail = async (email, report, status, officerRemark, officerDetails = {}) => {
//   const record = report.officialRecord || {};
//   const isOfficial = status.includes("FIR") || status.includes("NCR") || status === "Approved";
  
//   // Format Acts nicely
//   const actsHtml = record.acts && record.acts.length > 0 
//     ? record.acts.map(a => `<span style="background:#E0F2FE; color:#0369A1; padding:2px 6px; border-radius:4px; font-size:12px; margin-right:5px;">${a.actName} (${a.section})</span>`).join('')
//     : "Pending Classification";

//   // Determine header color based on status
//   let statusColor = COLORS.primary;
//   if(status === 'Rejected') statusColor = COLORS.danger;
//   if(status === 'Approved') statusColor = COLORS.success;

//   const content = `
//     <div style="text-align: right; margin-bottom: 20px;">
//       <span style="background-color: ${statusColor}; color: white; padding: 6px 12px; border-radius: 20px; font-size: 12px; font-weight: bold; text-transform: uppercase;">STATUS: ${status}</span>
//     </div>

//     <p style="color: ${COLORS.secondary}; margin-bottom: 20px;">
//       <strong>Case Reference:</strong> #${report._id}<br>
//       <strong>Date of Update:</strong> ${formatDate(new Date())}
//     </p>

//     ${officerRemark ? `
//       <div style="background-color: #FFF7ED; border-left: 4px solid ${COLORS.warning}; padding: 15px; margin-bottom: 25px;">
//         <p style="margin: 0 0 5px; color: #9A3412; font-weight: bold; font-size: 11px; text-transform: uppercase;">OFFICIAL REMARK FROM INVESTIGATING OFFICER</p>
//         <p style="margin: 0; color: #431407; font-style: italic;">"${officerRemark}"</p>
//       </div>
//     ` : ''}

//     <table style="width: 100%; border-collapse: collapse; font-size: 14px; border: 1px solid #E2E8F0;">
//       <thead style="background-color: #F1F5F9;">
//         <tr>
//           <th colspan="2" style="text-align: left; padding: 12px; color: ${COLORS.primary}; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 2px solid #CBD5E1;">Official Case Record</th>
//         </tr>
//       </thead>
//       <tbody>
//         <tr>
//           <td style="padding: 12px; border-bottom: 1px solid #E2E8F0; width: 40%; color: #64748B;">Record Number (FIR/NCR)</td>
//           <td style="padding: 12px; border-bottom: 1px solid #E2E8F0; font-weight: bold; color: ${COLORS.danger};">${record.recordNumber || "Pending Generation"}</td>
//         </tr>
//         <tr>
//           <td style="padding: 12px; border-bottom: 1px solid #E2E8F0; color: #64748B;">Police Station</td>
//           <td style="padding: 12px; border-bottom: 1px solid #E2E8F0;">${report.selectedStation}</td>
//         </tr>
//         <tr>
//           <td style="padding: 12px; border-bottom: 1px solid #E2E8F0; color: #64748B;">Applicable Acts</td>
//           <td style="padding: 12px; border-bottom: 1px solid #E2E8F0; line-height: 1.6;">${actsHtml}</td>
//         </tr>
//         <tr>
//           <td style="padding: 12px; border-bottom: 1px solid #E2E8F0; color: #64748B;">Incident Date & Time</td>
//           <td style="padding: 12px; border-bottom: 1px solid #E2E8F0;">${record.occurrenceDate || "N/A"} at ${record.occurrenceTime || "N/A"}</td>
//         </tr>
//         <tr>
//           <td style="padding: 12px; border-bottom: 1px solid #E2E8F0; color: #64748B;">Location of Offense</td>
//           <td style="padding: 12px; border-bottom: 1px solid #E2E8F0;">${record.incidentPlace || report.incidentLocationAddress || "N/A"}</td>
//         </tr>
//       </tbody>
//     </table>

//     <div style="margin-top: 40px; display: flex; justify-content: flex-end;">
//       <div style="width: 220px; text-align: left; border-top: 1px solid #CBD5E1; padding-top: 10px;">
//         <p style="margin: 0; font-weight: bold; color: ${COLORS.primary};">Digitally Signed By:</p>
//         <p style="margin: 5px 0 0; color: ${COLORS.secondary}; font-size: 15px;">${record.investigatingOfficer || officerDetails.name || "Duty Officer"}</p>
//         <p style="margin: 0; font-size: 12px; color: #64748B; font-style: italic;">${record.rank || officerDetails.rank || "Officer In-Charge"}</p>
//         <p style="margin: 0; font-size: 12px; color: #64748B;">${report.selectedStation}</p>
//       </div>
//     </div>
//   `;

//   const subject = isOfficial 
//     ? `OFFICIAL NOTIFICATION: ${status} Registered - Case #${report._id}` 
//     : `Status Update: Case #${report._id}`;

//   await sendBrevoEmail(email, subject, wrapHtml(content, isOfficial ? "OFFICIAL RECORD NOTIFICATION" : "CASE STATUS UPDATE"));
// };

// /* ==========================================
//    3. ADMINISTRATIVE & NOTICES
// ========================================== */

// const sendNoticeAlert = async (email, recipientName, noticeType, senderDetails) => {
//   // noticeType e.g., "Summons", "Show Cause Notice", "Legal Notice"
//   const content = `
//     <div style="border: 2px solid ${COLORS.danger}; padding: 15px; text-align: center; margin-bottom: 25px; background-color: #FEF2F2;">
//       <h3 style="margin:0; color: ${COLORS.danger}; text-transform: uppercase;">ACTION REQUIRED: ${noticeType}</h3>
//     </div>

//     <p style="color: ${COLORS.secondary};">Dear ${recipientName},</p>
//     <p style="color: ${COLORS.secondary};">You are hereby notified that an official <strong>${noticeType}</strong> has been issued against your name/account by the authority mentioned below.</p>

//     <div style="margin: 20px 0; background: #FFF; border: 1px solid #E2E8F0; padding: 20px;">
//       <p style="margin: 0 0 10px; font-size: 12px; color: #64748B; text-transform: uppercase; font-weight: bold;">Issued By Authority</p>
//       <p style="margin: 0; font-size: 16px; font-weight: bold; color: ${COLORS.primary};">${senderDetails.name || "Competent Authority"}</p>
//       <p style="margin: 0; color: ${COLORS.secondary};">${senderDetails.designation || "Officer In-Charge"}</p>
//       <p style="margin: 0; color: ${COLORS.secondary}; font-size: 13px;">${senderDetails.station || "Police Headquarters"}</p>
//     </div>

//     <p style="color: ${COLORS.secondary};">Please log in to the CrimeTrack portal immediately to view and respond to this document. Failure to respond may attract legal consequences.</p>

//     <div style="text-align: center; margin-top: 30px;">
//       <a href="https://your-crimetrack-domain.com/dashboard" style="background-color: ${COLORS.danger}; color: white; text-decoration: none; padding: 12px 24px; border-radius: 4px; font-weight: bold; font-size: 14px;">VIEW DOCUMENT</a>
//     </div>
//   `;
//   await sendBrevoEmail(email, `URGENT: ${noticeType} Issued`, wrapHtml(content, "OFFICIAL NOTICE"));
// };

// const sendAdminAlert = async (action, user) => {
//   const ownerEmail = "sushanttelekune@gmail.com";
//   const content = `
//     <h3 style="color: ${COLORS.primary}; border-bottom: 2px solid #E2E8F0; padding-bottom: 10px;">Security Event Detected</h3>
//     <table style="width: 100%; font-size: 14px; margin-top: 15px; border-collapse: collapse;">
//       <tr><td style="color:#64748B; padding:8px 0;">Event Type:</td><td style="font-weight:bold; color:${COLORS.primary};">${action.toUpperCase()}</td></tr>
//       <tr><td style="color:#64748B; padding:8px 0;">User Name:</td><td>${user.name}</td></tr>
//       <tr><td style="color:#64748B; padding:8px 0;">User Email:</td><td>${user.email}</td></tr>
//       <tr><td style="color:#64748B; padding:8px 0;">Role:</td><td><span style="background:#E2E8F0; padding:2px 8px; border-radius:10px; font-size:12px;">${user.role}</span></td></tr>
//       <tr><td style="color:#64748B; padding:8px 0;">Timestamp:</td><td>${new Date().toLocaleString()}</td></tr>
//     </table>
//   `;
//   await sendBrevoEmail(ownerEmail, `Security Alert: ${action}`, wrapHtml(content, "SYSTEM ALERT"));
// };

// const sendMeetingInvite = async (email, name, meetingDetails) => {
//   const meetingTime = formatDate(meetingDetails.scheduledTime);
//   const content = `
//     <p style="color: ${COLORS.secondary};">Hello ${name},</p>
//     <p style="color: ${COLORS.secondary};">You have been invited to an official meeting regarding Case/Inquiry <strong>${meetingDetails.caseId || "General"}</strong>.</p>
    
//     <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 6px; padding: 20px; margin: 20px 0;">
//       <div style="margin-bottom: 15px;">
//         <span style="display: block; font-size: 11px; color: #64748B; text-transform: uppercase;">Topic</span>
//         <span style="display: block; font-size: 16px; font-weight: bold; color: ${COLORS.primary};">${meetingDetails.title}</span>
//       </div>
//       <div>
//         <span style="display: block; font-size: 11px; color: #64748B; text-transform: uppercase;">Scheduled Time</span>
//         <span style="display: block; font-size: 16px; font-weight: bold; color: ${COLORS.primary};">${meetingTime}</span>
//       </div>
//     </div>
    
//     <div style="text-align: center; margin-top: 25px;">
//       <a href="${meetingDetails.link || '#'}" style="background-color: ${COLORS.accent}; color: white; text-decoration: none; padding: 12px 24px; border-radius: 4px; font-weight: bold;">JOIN MEETING</a>
//     </div>
//   `;
//   await sendBrevoEmail(email, `Invitation: ${meetingDetails.title}`, wrapHtml(content, "MEETING INVITATION"));
// };

// // ==========================================
// // EXPORTS
// // ==========================================
// module.exports = { 
//   sendOtpEmail, 
//   sendWelcomeEmail, 
//   sendComplaintConfirmation, 
//   sendStatusUpdateEmail,
//   sendAdminAlert,
//   sendNoticeAlert,
//   sendMeetingInvite
// };








// const axios = require('axios');

// // 🔗 CONFIGURATION
// const LOGO_URL = "https://res.cloudinary.com/dukrcgv8s/image/upload/v1770304918/CrimeTrack_abbtdr.png"; 

// // 🎨 OFFICIAL COLORS (Navy Blue Theme - No Red Backgrounds)
// const COLORS = {
//     headerBg: "#1e3a8a",   // Official Navy Blue
//     headerText: "#ffffff",
//     bodyBg: "#f8fafc",     // Light Grey for email background
//     cardBg: "#ffffff",     // White paper effect
//     textMain: "#1e293b",   // Dark Slate
//     textLight: "#64748b",  // Muted Text
//     border: "#cbd5e1",     // Light border
//     accent: "#2563eb"      // Link/Highlight color
// };

// // 📅 HELPER: Get Current Timestamp
// const getTimestamp = () => new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

// // ==========================================
// // 📄 MAIN TEMPLATE GENERATOR (Official Circular Style)
// // ==========================================
// const generateOfficialTemplate = ({ title, recipientName, refNo, subject, dataTable, bodyText, footerNote }) => {
//     return `
//     <!DOCTYPE html>
//     <html>
//     <head>
//         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     </head>
//     <body style="margin: 0; padding: 0; background-color: ${COLORS.bodyBg}; font-family: Arial, sans-serif;">
        
//         <div style="max-width: 650px; margin: 20px auto; background-color: ${COLORS.cardBg}; border: 1px solid ${COLORS.border}; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
            
//             <div style="background-color: ${COLORS.headerBg}; padding: 25px; text-align: center;">
//                 <img src="${LOGO_URL}" alt="Logo" style="width: 60px; height: 60px; object-fit: contain; margin-bottom: 10px;">
//                 <h2 style="margin: 0; color: ${COLORS.headerText}; font-size: 22px; text-transform: uppercase; letter-spacing: 1px;">Maharashtra State Police</h2>
//                 <p style="margin: 5px 0 0; color: #93c5fd; font-size: 12px; text-transform: uppercase;">CrimeTrack Digital Communication System</p>
//             </div>

//             <div style="padding: 30px;">
                
//                 <div style="display: flex; justify-content: space-between; font-size: 12px; color: ${COLORS.textLight}; margin-bottom: 25px; border-bottom: 1px solid ${COLORS.border}; padding-bottom: 10px;">
//                     <span><strong>Ref No:</strong> ${refNo || `CT-${Math.floor(100000 + Math.random() * 900000)}`}</span>
//                     <span><strong>Date:</strong> ${getTimestamp()}</span>
//                 </div>

//                 <p style="font-size: 14px; color: ${COLORS.textMain}; margin-bottom: 20px;">
//                     <strong>To,</strong><br>
//                     ${recipientName}<br>
//                     <span style="font-size: 12px; color: ${COLORS.textLight};">CrimeTrack User / Official</span>
//                 </p>

//                 <div style="text-align: center; margin-bottom: 25px;">
//                     <span style="background-color: #f1f5f9; padding: 8px 15px; border-radius: 4px; font-weight: bold; color: ${COLORS.headerBg}; font-size: 14px; text-transform: uppercase; text-decoration: underline;">
//                         SUBJECT: ${subject}
//                     </span>
//                 </div>

//                 <div style="font-size: 14px; line-height: 1.6; color: ${COLORS.textMain}; text-align: justify; margin-bottom: 25px;">
//                     ${bodyText}
//                 </div>

//                 ${dataTable ? `
//                 <table style="width: 100%; border-collapse: collapse; font-size: 13px; margin-bottom: 25px;">
//                     ${dataTable}
//                 </table>` : ''}

//                 <div style="text-align: right; margin-top: 40px;">
//                     <p style="margin: 0; font-weight: bold; color: ${COLORS.textMain};">ISSUING AUTHORITY</p>
//                     <p style="margin: 5px 0 0; font-size: 12px; color: ${COLORS.textLight};">Digital Command Center<br>CrimeTrack HQ</p>
//                 </div>

//             </div>

//             <div style="background-color: #f1f5f9; padding: 15px; text-align: center; font-size: 11px; color: ${COLORS.textLight}; border-top: 1px solid ${COLORS.border};">
//                 <p style="margin: 0;"><strong>${footerNote || "System Generated Official Document"}</strong></p>
//                 <p style="margin: 5px 0 0;">This communication is electronically generated and valid under IT Act, 2000. Do not reply directly.</p>
//             </div>

//         </div>
//     </body>
//     </html>
//     `;
// };

// // 🛠️ HELPER: Table Row Generator
// const createRow = (label, value, highlight = false) => `
//     <tr>
//         <td style="padding: 10px; border: 1px solid ${COLORS.border}; background-color: #f8fafc; font-weight: bold; width: 35%; color: ${COLORS.textMain};">${label}</td>
//         <td style="padding: 10px; border: 1px solid ${COLORS.border}; color: ${highlight ? COLORS.accent : COLORS.textMain}; font-weight: ${highlight ? 'bold' : 'normal'};">${value || "N/A"}</td>
//     </tr>
// `;

// // 🚀 CORE SENDER (Brevo)
// const sendBrevoEmail = async (to, subject, htmlContent) => {
//     try {
//         await axios.post('https://api.brevo.com/v3/smtp/email', {
//             sender: { email: process.env.EMAIL_FROM || "admin@crimetrack.com", name: 'CrimeTrack Official' },
//             to: [{ email: to }],
//             subject: subject,
//             htmlContent: htmlContent,
//         }, {
//             headers: { 'api-key': process.env.BREVO_API_KEY, 'Content-Type': 'application/json' }
//         });
//         console.log(`✅ Email Sent to ${to}: ${subject}`);
//     } catch (error) {
//         console.error("❌ Email Failed:", error.response?.data || error.message);
//     }
// };

// /* =========================================================================
//    1. 🔐 OTP VERIFICATION
//    ========================================================================= */
// const sendOtpEmail = async (email, otp) => {
//     const table = `
//         ${createRow("Verification Code", otp, true)}
//         ${createRow("Valid For", "10 Minutes")}
//         ${createRow("Request Type", "Identity Verification")}
//     `;

//     const bodyText = `
//         This is a secure system alert initiated by your recent request to access the CrimeTrack Portal. 
//         To ensure the integrity of your account and prevent unauthorized access, we require you to verify your identity using the One-Time Password (OTP) provided below.
//         <br><br>
//         Please note that this code is strictly confidential. CrimeTrack officials will never ask for this OTP via phone or email. If you did not initiate this request, please report it to our Cyber Cell immediately.
//     `;

//     const html = generateOfficialTemplate({
//         title: "SECURITY VERIFICATION",
//         recipientName: "Applicant / User",
//         subject: "ONE-TIME PASSWORD (OTP) FOR ACCESS AUTHORIZATION",
//         bodyText: bodyText,
//         dataTable: table,
//         footerNote: "Security Alert: Unauthorized access attempts are monitored and logged."
//     });

//     await sendBrevoEmail(email, "CrimeTrack Verification Code", html);
// };

// /* =========================================================================
//    2. 👋 WELCOME (Registration)
//    ========================================================================= */
// const sendWelcomeEmail = async (email, name, password) => {
//     const table = `
//         ${createRow("Registered Email", email)}
//         ${createRow("Temporary Password", password, true)}
//         ${createRow("Access Role", "Citizen / User")}
//         ${createRow("Registration Date", getTimestamp())}
//     `;

//     const bodyText = `
//         Welcome to <strong>CrimeTrack</strong>, the Maharashtra State Police's advanced Digital Policing Initiative. 
//         <br><br>
//         Our mission is to bridge the gap between citizens and law enforcement through technology. With this account, you now have access to a suite of digital services designed for your safety and convenience:
//         <ul>
//             <li><strong>e-FIR Filing:</strong> Report non-emergency crimes online instantly.</li>
//             <li><strong>SOS Emergency:</strong> Trigger instant alerts to the nearest PCR van with live location tracking.</li>
//             <li><strong>Case Tracking:</strong> Monitor the real-time status of your complaints and official records.</li>
//             <li><strong>Legal Aid:</strong> Access AI-powered legal guidance based on the Indian Penal Code (IPC).</li>
//         </ul>
//         Please find your secure login credentials below. We strongly recommend changing your password immediately after your first login.
//     `;

//     const html = generateOfficialTemplate({
//         title: "ACCOUNT REGISTRATION",
//         recipientName: name,
//         subject: "CONFIRMATION OF DIGITAL ACCOUNT CREATION",
//         bodyText: bodyText,
//         dataTable: table,
//         footerNote: "CrimeTrack: Committed to Safety, Service, and Transparency."
//     });

//     await sendBrevoEmail(email, "Registration Successful - CrimeTrack", html);
// };

// /* =========================================================================
//    3. 📩 COMPLAINT ACKNOWLEDGEMENT
//    ========================================================================= */
// const sendComplaintConfirmation = async (email, name, complaintId) => {
//     const table = `
//         ${createRow("Complaint Ref ID", `#${complaintId}`, true)}
//         ${createRow("Date of Filing", getTimestamp())}
//         ${createRow("Current Status", "Received / Under Preliminary Review")}
//         ${createRow("Handling Department", "Central Digital Desk")}
//     `;

//     const bodyText = `
//         This is an official acknowledgement that your complaint has been successfully lodged in the CrimeTrack Central Registry. 
//         <br><br>
//         Your report has been assigned a unique <strong>Reference ID</strong> for tracking purposes. The details have been forwarded to the jurisdictional Station House Officer (SHO) for immediate assessment. 
//         <br><br>
//         An investigating officer will be assigned to your case shortly. You will receive further notifications regarding the acceptance, inquiry, or FIR registration status via email and SMS.
//     `;

//     const html = generateOfficialTemplate({
//         title: "COMPLAINT RECEIPT",
//         recipientName: name,
//         refNo: `FIR/REQ/${complaintId}`,
//         subject: "ACKNOWLEDGEMENT OF COMPLAINT REGISTRATION",
//         bodyText: bodyText,
//         dataTable: table,
//         footerNote: "Please retain this Reference ID for all future correspondence."
//     });

//     await sendBrevoEmail(email, `Complaint Recorded: #${complaintId}`, html);
// };

// /* =========================================================================
//    4. 🚨 STATUS / FIR UPDATE (Detailed)
//    ========================================================================= */
// const sendStatusUpdateEmail = async (email, report, status, officerRemark) => {
//     // Determine Header Title
//     let docTitle = "CASE STATUS UPDATE";
//     if (status.includes("FIR")) docTitle = "OFFICIAL F.I.R. GENERATED";
//     if (status.includes("NCR")) docTitle = "NON-COGNIZABLE REPORT (NCR)";

//     // Extract Data safely from report object
//     const record = report.officialRecord || {};
//     const officerName = record.investigatingOfficer || report.assignedOfficer || "Duty Officer";
//     const designation = record.rank || "Investigating Officer";
//     const recordNo = record.recordNumber || "Pending";
//     const acts = record.acts && record.acts.length > 0 ? record.acts.map(a => `${a.actName}`).join(', ') : "Under Review";
//     const incidentLoc = record.incidentPlace || report.incidentLocationAddress || "As per record";

//     const table = `
//         ${createRow("Case Reference ID", `#${report._id}`)}
//         ${createRow("Record Number (FIR/NCR)", recordNo, true)}
//         ${createRow("Updated Status", status.toUpperCase(), true)}
//         ${createRow("Police Station", report.selectedStation)}
//         ${createRow("Incident Location", incidentLoc)}
//         ${createRow("Applicable Acts", acts)}
//         ${createRow("Investigating Officer", officerName)}
//         ${createRow("Officer Designation", designation)}
//         ${createRow("Official Remark", officerRemark || "Procedural Update")}
//     `;

//     const bodyText = `
//         This notification is issued to inform you of a significant development in the investigation of Case #${report._id}. 
//         <br><br>
//         The status of the case has been officially updated by the Investigating Officer. If an FIR or NCR has been registered, the corresponding Record Number is provided below. 
//         This action has been taken in accordance with the standard operating procedures of the Maharashtra State Police.
//         <br><br>
//         You are requested to review the specific remarks made by the officer and take necessary action if required (e.g., submitting further evidence or attending an inquiry).
//     `;

//     const html = generateOfficialTemplate({
//         title: docTitle,
//         recipientName: report.user?.name || "Complainant",
//         refNo: recordNo !== "Pending" ? recordNo : `CASE/${report._id}`,
//         subject: `NOTICE OF CASE UPDATE: ${status.toUpperCase()}`,
//         bodyText: bodyText,
//         dataTable: table,
//         footerNote: "Digitally signed documents are available for download in your user dashboard."
//     });

//     await sendBrevoEmail(email, `Official Update: Case #${report._id}`, html);
// };

// /* =========================================================================
//    5. 📜 OFFICIAL NOTICES (Summons/Legal)
//    ========================================================================= */
// const sendNoticeAlert = async (email, name, senderDetails, type) => {
//     const table = `
//         ${createRow("Notice Type", type.toUpperCase(), true)}
//         ${createRow("Issuing Authority", senderDetails.name)}
//         ${createRow("Designation", senderDetails.designation)}
//         ${createRow("Station / Dept", senderDetails.station)}
//         ${createRow("Date of Issue", getTimestamp())}
//     `;

//     const bodyText = `
//         <strong>NOTICE UNDER OFFICIAL PROCEDURE</strong>
//         <br><br>
//         You are hereby served with an official <strong>${type}</strong> issued by the competent authority mentioned below. 
//         This document contains critical directions, summons, or information that requires your immediate attention.
//         <br><br>
//         Failure to comply with the instructions contained in this notice or failure to respond within the stipulated time frame may lead to further legal or procedural action as deemed necessary by the department.
//         <br><br>
//         Please login to the CrimeTrack Portal immediately to view the full digital copy of this notice and acknowledge its receipt.
//     `;

//     const html = generateOfficialTemplate({
//         title: "LEGAL NOTICE / INTIMATION",
//         recipientName: name,
//         subject: `ISSUANCE OF OFFICIAL ${type.toUpperCase()}`,
//         bodyText: bodyText,
//         dataTable: table,
//         footerNote: "ACTION REQUIRED: Login to CrimeTrack Portal to view the full document."
//     });

//     await sendBrevoEmail(email, `URGENT: Official ${type} Served`, html);
// };

// /* =========================================================================
//    6. 📹 MEETING INVITE
//    ========================================================================= */
// const sendMeetingInvite = async (email, name, meetingDetails) => {
//     const meetingTime = new Date(meetingDetails.scheduledTime).toLocaleString('en-IN', {
//         dateStyle: 'full', timeStyle: 'short'
//     });

//     const table = `
//         ${createRow("Purpose", meetingDetails.title, true)}
//         ${createRow("Scheduled Date & Time", meetingTime)}
//         ${createRow("Mode", "Video Conference")}
//         ${createRow("Platform", "CrimeTrack Secure Interface")}
//     `;

//     const bodyText = `
//         You are requested to attend an official virtual meeting regarding ongoing departmental proceedings or an inquiry related to your case. 
//         <br><br>
//         It is mandatory to be present at the scheduled time. Please ensure you have a stable internet connection and are in a quiet environment. 
//         If you are required to produce any documents during this session, please keep them ready beforehand.
//         <br><br>
//         A secure, encrypted link to join the session will be activated on your CrimeTrack Dashboard 10 minutes prior to the commencement of the meeting.
//     `;

//     const html = generateOfficialTemplate({
//         title: "MEETING SUMMONS",
//         recipientName: name,
//         subject: "INVITATION TO ATTEND OFFICIAL INQUIRY / MEETING",
//         bodyText: bodyText,
//         dataTable: table,
//         footerNote: "Do not share the meeting access link with unauthorized persons."
//     });

//     await sendBrevoEmail(email, `Meeting Scheduled: ${meetingDetails.title}`, html);
// };

// /* =========================================================================
//    7. 🆘 ADMIN & SUPPORT
//    ========================================================================= */
// const sendAdminAlert = async (action, user) => {
//     const table = `
//         ${createRow("Event Type", action.toUpperCase(), true)}
//         ${createRow("User Name", user.name)}
//         ${createRow("User Email", user.email)}
//         ${createRow("Role", user.role)}
//         ${createRow("Timestamp", getTimestamp())}
//     `;

//     const bodyText = `
//         An automated security event has been detected and logged in the system registry. 
//         This alert is generated to keep the administration informed of critical user activities such as Signups, Logins, or Profile Modifications.
//         <br><br>
//         Please review the details below. If this activity appears suspicious or unauthorized, please investigate the user logs immediately via the Admin Console.
//     `;

//     const html = generateOfficialTemplate({
//         title: "SYSTEM SECURITY ALERT",
//         recipientName: "System Administrator",
//         subject: `SECURITY EVENT LOGGED: ${action.toUpperCase()}`,
//         bodyText: bodyText,
//         dataTable: table,
//         footerNote: "Automated Watchdog System - Internal Use Only"
//     });

//     await sendBrevoEmail("sushanttelekune@gmail.com", `Alert: ${action}`, html);
// };

// // Aliases
// const sendProfileOtpEmail = (e, o) => sendOtpEmail(e, o);
// const sendProfileUpdateSuccessEmail = async (e, n) => sendWelcomeEmail(e, n, "Profile Updated Successfully");
// const sendHelpTicketAck = async (e, n, i) => sendComplaintConfirmation(e, n, `TICKET-${i}`);
// const sendAdminReplyEmail = async (e, n, i, m) => sendStatusUpdateEmail(e, {_id: `TICKET-${i}`, selectedStation: "Support", officialRecord: {}}, "Reply Received", m);
// const sendFeedbackThankYou = async (e, n, t) => sendWelcomeEmail(e, n, `Thank you for your ${t}`);

// module.exports = { 
//   sendOtpEmail, 
//   sendWelcomeEmail, 
//   sendComplaintConfirmation, 
//   sendStatusUpdateEmail,
//   sendAdminAlert,
//   sendMeetingInvite,    
//   sendProfileOtpEmail,  
//   sendProfileUpdateSuccessEmail,
//   sendHelpTicketAck,      
//   sendAdminReplyEmail,    
//   sendFeedbackThankYou,
//   sendNoticeAlert 
// };



















// const axios = require('axios');

// // 🔗 CONFIGURATION
// const CRIMETRACK_LOGO = "https://res.cloudinary.com/dukrcgv8s/image/upload/v1770304918/CrimeTrack_abbtdr.png"; 
// const MAH_POLICE_LOGO = "https://res.cloudinary.com/dukrcgv8s/image/upload/v1771074848/MH_POLICE_LOGO_WHITE_wmf9hd.png";

// // 🎨 OFFICIAL COLORS (Updated Theme)
// const COLORS = {
//     headerBg: "#2f0b4d",   // ✅ New Purple Theme
//     headerText: "#ffffff",
//     bodyBg: "#e2e8f0",     // Slightly darker grey for better contrast
//     cardBg: "#ffffff",     // White paper effect
//     textMain: "#334155",   // Dark Slate
//     textLight: "#64748b",  // Muted Text
//     border: "#cbd5e1",     // Light border
//     accent: "#7c3aed"      // Purple Accent
// };

// // 📅 HELPER: Get Current Timestamp
// const getTimestamp = () => new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

// // ==========================================
// // 📄 MAIN TEMPLATE GENERATOR (Stylish & Rounded)
// // ==========================================
// const generateOfficialTemplate = ({ title, recipientName, refNo, subject, dataTable, bodyText, footerNote }) => {
//     return `
//     <!DOCTYPE html>
//     <html>
//     <head>
//         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//         <style>
//             /* Email client resets */
//             body { margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
//             .content-table { width: 100%; border-collapse: collapse; }
//             @media only screen and (max-width: 600px) {
//                 .header-text { font-size: 16px !important; }
//                 .logo-img { width: 60px !important; height: 60px !important; }
//                 .wrapper { padding: 10px !important; }
//             }
//         </style>
//     </head>
//     <body style="background-color: ${COLORS.bodyBg}; padding: 20px 0;">
        
//         <div class="wrapper" style="max-width: 650px; margin: 0 auto; background-color: ${COLORS.cardBg}; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.15); font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
            
//             <div style="background-color: ${COLORS.headerBg}; padding: 20px;">
//                 <table width="100%" cellpadding="0" cellspacing="0" border="0">
//                     <tr>
//                         <td align="left" width="20%" style="vertical-align: middle;">
//                             <img src="${MAH_POLICE_LOGO}" alt="Mah Police" class="logo-img" style="width: 85px; height: 85px; object-fit: contain; display: block;">
//                         </td>
                        
//                         <td align="center" width="60%" style="vertical-align: middle;">
//                             <h2 class="header-text" style="margin: 0; color: ${COLORS.headerText}; font-size: 20px; font-weight: 800; text-transform: uppercase; letter-spacing: 1.5px; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">
//                                 Maharashtra State Police
//                             </h2>
//                             <p style="margin: 5px 0 0; color: #e9d5ff; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">
//                                 CrimeTrack Digital Communication System
//                             </p>
//                         </td>

//                         <td align="right" width="30%" style="vertical-align: middle;">
//                             <img src="${CRIMETRACK_LOGO}" alt="CrimeTrack" class="logo-img" style="width: 140px; height: 125px; object-fit: contain; display: block;">
//                         </td>
//                     </tr>
//                 </table>
//             </div>

//             <div style="padding: 30px;">
                
//                 <table width="100%" style="border-bottom: 2px solid ${COLORS.bodyBg}; margin-bottom: 20px; padding-bottom: 10px;">
//                     <tr>
//                         <td align="left" style="font-size: 12px; color: ${COLORS.textLight}; font-weight: 600;">
//                             <strong>REF:</strong> ${refNo || `CT-${Math.floor(100000 + Math.random() * 900000)}`}
//                         </td>
//                         <td align="right" style="font-size: 12px; color: ${COLORS.textLight}; font-weight: 600;">
//                             <strong>DATE:</strong> ${getTimestamp()}
//                         </td>
//                     </tr>
//                 </table>

//                 <div style="margin-bottom: 30px;">
//                     <p style="font-size: 15px; color: ${COLORS.textMain}; margin: 0; line-height: 1.5;">
//                         <strong style="color: ${COLORS.headerBg}; font-size: 16px;">To,</strong><br>
//                         <span style="font-size: 18px; font-weight: bold;">${recipientName}</span><br>
//                         <span style="font-size: 13px; color: ${COLORS.textLight}; background-color: #f1f5f9; padding: 2px 8px; border-radius: 4px;">CrimeTrack User / Official</span>
//                     </p>
//                 </div>

//                 <div style="text-align: center; margin-bottom: 30px;">
//                     <div style="display: inline-block; background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); padding: 12px 25px; border-radius: 50px; border: 1px solid ${COLORS.border}; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
//                         <span style="font-weight: 800; color: ${COLORS.headerBg}; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">
//                             SUBJECT: ${subject}
//                         </span>
//                     </div>
//                 </div>

//                 <div style="font-size: 14px; line-height: 1.8; color: ${COLORS.textMain}; text-align: justify; margin-bottom: 30px; font-weight: 500;">
//                     ${bodyText}
//                 </div>

//                 ${dataTable ? `
//                 <div style="border-radius: 8px; overflow: hidden; border: 1px solid ${COLORS.border}; margin-bottom: 30px;">
//                     <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
//                         ${dataTable}
//                     </table>
//                 </div>` : ''}

//                 <div style="text-align: right; margin-top: 40px; padding-top: 20px; border-top: 1px dashed ${COLORS.border};">
//                     <p style="margin: 0; font-weight: 800; color: ${COLORS.headerBg}; font-size: 14px; text-transform: uppercase;">ISSUING AUTHORITY</p>
//                     <p style="margin: 5px 0 0; font-size: 12px; color: ${COLORS.textLight}; font-weight: 500;">Digital Command Center<br>CrimeTrack HQ, Maharashtra</p>
//                 </div>

//             </div>

//             <div style="background-color: #f1f5f9; padding: 20px; text-align: center; font-size: 11px; color: ${COLORS.textLight}; border-top: 1px solid ${COLORS.border};">
//                 <p style="margin: 0; font-weight: bold; color: ${COLORS.textMain};">${footerNote || "System Generated Official Document"}</p>
//                 <p style="margin: 8px 0 0; line-height: 1.4;">This communication is electronically generated and valid under IT Act, 2000.<br>Please do not reply directly to this automated email.</p>
//             </div>

//         </div>
//     </body>
//     </html>
//     `;
// };

// // 🛠️ HELPER: Table Row Generator (Styled)
// const createRow = (label, value, highlight = false) => `
//     <tr>
//         <td style="padding: 12px 15px; border-bottom: 1px solid ${COLORS.border}; background-color: #f8fafc; font-weight: 700; width: 35%; color: ${COLORS.textMain}; vertical-align: top;">${label}</td>
//         <td style="padding: 12px 15px; border-bottom: 1px solid ${COLORS.border}; background-color: #ffffff; color: ${highlight ? COLORS.headerBg : COLORS.textMain}; font-weight: ${highlight ? '800' : '500'}; vertical-align: top;">${value || "N/A"}</td>
//     </tr>
// `;

// // 🚀 CORE SENDER (Brevo)
// const sendBrevoEmail = async (to, subject, htmlContent) => {
//     try {
//         await axios.post('https://api.brevo.com/v3/smtp/email', {
//             sender: { email: process.env.EMAIL_FROM || "admin@crimetrack.com", name: 'CrimeTrack Official' },
//             to: [{ email: to }],
//             subject: subject,
//             htmlContent: htmlContent,
//         }, {
//             headers: { 'api-key': process.env.BREVO_API_KEY, 'Content-Type': 'application/json' }
//         });
//         console.log(`✅ Email Sent to ${to}: ${subject}`);
//     } catch (error) {
//         console.error("❌ Email Failed:", error.response?.data || error.message);
//     }
// };

// /* =========================================================================
//    1. 🔐 OTP VERIFICATION
//    ========================================================================= */
// const sendOtpEmail = async (email, otp) => {
//     const table = `
//         ${createRow("Verification Code", `<span style="font-size: 18px; letter-spacing: 2px;">${otp}</span>`, true)}
//         ${createRow("Valid For", "10 Minutes")}
//         ${createRow("Request Type", "Identity Verification")}
//     `;

//     const bodyText = `
//         This is a secure system alert initiated by your recent request to access the CrimeTrack Portal. 
//         To ensure the integrity of your account and prevent unauthorized access, we require you to verify your identity using the One-Time Password (OTP) provided below.
//         <br><br>
//         Please note that this code is strictly confidential. CrimeTrack officials will never ask for this OTP via phone or email. If you did not initiate this request, please report it to our Cyber Cell immediately.
//     `;

//     const html = generateOfficialTemplate({
//         title: "SECURITY VERIFICATION",
//         recipientName: "Applicant / User",
//         subject: "ONE-TIME PASSWORD (OTP) FOR ACCESS AUTHORIZATION",
//         bodyText: bodyText,
//         dataTable: table,
//         footerNote: "Security Alert: Unauthorized access attempts are monitored and logged."
//     });

//     await sendBrevoEmail(email, "CrimeTrack Verification Code", html);
// };

// /* =========================================================================
//    2. 👋 WELCOME (Registration)
//    ========================================================================= */
// const sendWelcomeEmail = async (email, name, password) => {
//     const table = `
//         ${createRow("Registered Email", email)}
//         ${createRow("Temporary Password", password, true)}
//         ${createRow("Access Role", "Citizen / User")}
//         ${createRow("Registration Date", getTimestamp())}
//     `;

//     const bodyText = `
//         Welcome to <strong>CrimeTrack</strong>, the Maharashtra State Police's advanced Digital Policing Initiative. 
//         <br><br>
//         Our mission is to bridge the gap between citizens and law enforcement through technology. With this account, you now have access to a suite of digital services designed for your safety and convenience:
//         <ul>
//             <li><strong>e-FIR Filing:</strong> Report non-emergency crimes online instantly.</li>
//             <li><strong>SOS Emergency:</strong> Trigger instant alerts to the nearest PCR van with live location tracking.</li>
//             <li><strong>Case Tracking:</strong> Monitor the real-time status of your complaints and official records.</li>
//             <li><strong>Legal Aid:</strong> Access AI-powered legal guidance based on the Indian Penal Code (IPC).</li>
//         </ul>
//         Please find your secure login credentials below. We strongly recommend changing your password immediately after your first login.
//     `;

//     const html = generateOfficialTemplate({
//         title: "ACCOUNT REGISTRATION",
//         recipientName: name,
//         subject: "CONFIRMATION OF DIGITAL ACCOUNT CREATION",
//         bodyText: bodyText,
//         dataTable: table,
//         footerNote: "CrimeTrack: Committed to Safety, Service, and Transparency."
//     });

//     await sendBrevoEmail(email, "Registration Successful - CrimeTrack", html);
// };

// /* =========================================================================
//    3. 📩 COMPLAINT ACKNOWLEDGEMENT
//    ========================================================================= */
// const sendComplaintConfirmation = async (email, name, complaintId) => {
//     const table = `
//         ${createRow("Complaint Ref ID", `#${complaintId}`, true)}
//         ${createRow("Date of Filing", getTimestamp())}
//         ${createRow("Current Status", "Received / Under Preliminary Review")}
//         ${createRow("Handling Department", "Central Digital Desk")}
//     `;

//     const bodyText = `
//         This is an official acknowledgement that your complaint has been successfully lodged in the CrimeTrack Central Registry. 
//         <br><br>
//         Your report has been assigned a unique <strong>Reference ID</strong> for tracking purposes. The details have been forwarded to the jurisdictional Station House Officer (SHO) for immediate assessment. 
//         <br><br>
//         An investigating officer will be assigned to your case shortly. You will receive further notifications regarding the acceptance, inquiry, or FIR registration status via email and SMS.
//     `;

//     const html = generateOfficialTemplate({
//         title: "COMPLAINT RECEIPT",
//         recipientName: name,
//         refNo: `FIR/REQ/${complaintId}`,
//         subject: "ACKNOWLEDGEMENT OF COMPLAINT REGISTRATION",
//         bodyText: bodyText,
//         dataTable: table,
//         footerNote: "Please retain this Reference ID for all future correspondence."
//     });

//     await sendBrevoEmail(email, `Complaint Recorded: #${complaintId}`, html);
// };

// /* =========================================================================
//    4. 🚨 STATUS / FIR UPDATE (Detailed)
//    ========================================================================= */
// const sendStatusUpdateEmail = async (email, report, status, officerRemark) => {
//     // Determine Header Title
//     let docTitle = "CASE STATUS UPDATE";
//     if (status.includes("FIR")) docTitle = "OFFICIAL F.I.R. GENERATED";
//     if (status.includes("NCR")) docTitle = "NON-COGNIZABLE REPORT (NCR)";

//     // Extract Data safely from report object
//     const record = report.officialRecord || {};
//     const officerName = record.investigatingOfficer || report.assignedOfficer || "Duty Officer";
//     const designation = record.rank || "Investigating Officer";
//     const recordNo = record.recordNumber || "Pending";
//     const acts = record.acts && record.acts.length > 0 ? record.acts.map(a => `${a.actName}`).join(', ') : "Under Review";
//     const incidentLoc = record.incidentPlace || report.incidentLocationAddress || "As per record";

//     const table = `
//         ${createRow("Case Reference ID", `#${report._id}`)}
//         ${createRow("Record Number (FIR/NCR)", recordNo, true)}
//         ${createRow("Updated Status", status.toUpperCase(), true)}
//         ${createRow("Police Station", report.selectedStation)}
//         ${createRow("Incident Location", incidentLoc)}
//         ${createRow("Applicable Acts", acts)}
//         ${createRow("Investigating Officer", officerName)}
//         ${createRow("Officer Designation", designation)}
//         ${createRow("Official Remark", officerRemark || "Procedural Update")}
//     `;

//     const bodyText = `
//         This notification is issued to inform you of a significant development in the investigation of Case #${report._id}. 
//         <br><br>
//         The status of the case has been officially updated by the Investigating Officer. If an FIR or NCR has been registered, the corresponding Record Number is provided below. 
//         This action has been taken in accordance with the standard operating procedures of the Maharashtra State Police.
//         <br><br>
//         You are requested to review the specific remarks made by the officer and take necessary action if required (e.g., submitting further evidence or attending an inquiry).
//     `;

//     const html = generateOfficialTemplate({
//         title: docTitle,
//         recipientName: report.user?.name || "Complainant",
//         refNo: recordNo !== "Pending" ? recordNo : `CASE/${report._id}`,
//         subject: `NOTICE OF CASE UPDATE: ${status.toUpperCase()}`,
//         bodyText: bodyText,
//         dataTable: table,
//         footerNote: "Digitally signed documents are available for download in your user dashboard."
//     });

//     await sendBrevoEmail(email, `Official Update: Case #${report._id}`, html);
// };

// /* =========================================================================
//    5. 📜 OFFICIAL NOTICES (Summons/Legal)
//    ========================================================================= */
// const sendNoticeAlert = async (email, name, senderDetails, type) => {
//     const table = `
//         ${createRow("Notice Type", type.toUpperCase(), true)}
//         ${createRow("Issuing Authority", senderDetails.name)}
//         ${createRow("Designation", senderDetails.designation)}
//         ${createRow("Station / Dept", senderDetails.station)}
//         ${createRow("Date of Issue", getTimestamp())}
//     `;

//     const bodyText = `
//         <strong>NOTICE UNDER OFFICIAL PROCEDURE</strong>
//         <br><br>
//         You are hereby served with an official <strong>${type}</strong> issued by the competent authority mentioned below. 
//         This document contains critical directions, summons, or information that requires your immediate attention.
//         <br><br>
//         Failure to comply with the instructions contained in this notice or failure to respond within the stipulated time frame may lead to further legal or procedural action as deemed necessary by the department.
//         <br><br>
//         Please login to the CrimeTrack Portal immediately to view the full digital copy of this notice and acknowledge its receipt.
//     `;

//     const html = generateOfficialTemplate({
//         title: "LEGAL NOTICE / INTIMATION",
//         recipientName: name,
//         subject: `ISSUANCE OF OFFICIAL ${type.toUpperCase()}`,
//         bodyText: bodyText,
//         dataTable: table,
//         footerNote: "ACTION REQUIRED: Login to CrimeTrack Portal to view the full document."
//     });

//     await sendBrevoEmail(email, `URGENT: Official ${type} Served`, html);
// };

// /* =========================================================================
//    6. 📹 MEETING INVITE
//    ========================================================================= */
// const sendMeetingInvite = async (email, name, meetingDetails) => {
//     const meetingTime = new Date(meetingDetails.scheduledTime).toLocaleString('en-IN', {
//         dateStyle: 'full', timeStyle: 'short'
//     });

//     const table = `
//         ${createRow("Purpose", meetingDetails.title, true)}
//         ${createRow("Scheduled Date & Time", meetingTime)}
//         ${createRow("Mode", "Video Conference")}
//         ${createRow("Platform", "CrimeTrack Secure Interface")}
//     `;

//     const bodyText = `
//         You are requested to attend an official virtual meeting regarding ongoing departmental proceedings or an inquiry related to your case. 
//         <br><br>
//         It is mandatory to be present at the scheduled time. Please ensure you have a stable internet connection and are in a quiet environment. 
//         If you are required to produce any documents during this session, please keep them ready beforehand.
//         <br><br>
//         A secure, encrypted link to join the session will be activated on your CrimeTrack Dashboard 10 minutes prior to the commencement of the meeting.
//     `;

//     const html = generateOfficialTemplate({
//         title: "MEETING SUMMONS",
//         recipientName: name,
//         subject: "INVITATION TO ATTEND OFFICIAL INQUIRY / MEETING",
//         bodyText: bodyText,
//         dataTable: table,
//         footerNote: "Do not share the meeting access link with unauthorized persons."
//     });

//     await sendBrevoEmail(email, `Meeting Scheduled: ${meetingDetails.title}`, html);
// };

// /* =========================================================================
//    7. 🆘 ADMIN & SUPPORT
//    ========================================================================= */
// const sendAdminAlert = async (action, user) => {
//     const table = `
//         ${createRow("Event Type", action.toUpperCase(), true)}
//         ${createRow("User Name", user.name)}
//         ${createRow("User Email", user.email)}
//         ${createRow("Role", user.role)}
//         ${createRow("Timestamp", getTimestamp())}
//     `;

//     const bodyText = `
//         An automated security event has been detected and logged in the system registry. 
//         This alert is generated to keep the administration informed of critical user activities such as Signups, Logins, or Profile Modifications.
//         <br><br>
//         Please review the details below. If this activity appears suspicious or unauthorized, please investigate the user logs immediately via the Admin Console.
//     `;

//     const html = generateOfficialTemplate({
//         title: "SYSTEM SECURITY ALERT",
//         recipientName: "System Administrator",
//         subject: `SECURITY EVENT LOGGED: ${action.toUpperCase()}`,
//         bodyText: bodyText,
//         dataTable: table,
//         footerNote: "Automated Watchdog System - Internal Use Only"
//     });

//     await sendBrevoEmail("sushanttelekune@gmail.com", `Alert: ${action}`, html);
// };

// // Aliases
// const sendProfileOtpEmail = (e, o) => sendOtpEmail(e, o);
// const sendProfileUpdateSuccessEmail = async (e, n) => sendWelcomeEmail(e, n, "Profile Updated Successfully");
// const sendHelpTicketAck = async (e, n, i) => sendComplaintConfirmation(e, n, `TICKET-${i}`);
// const sendAdminReplyEmail = async (e, n, i, m) => sendStatusUpdateEmail(e, {_id: `TICKET-${i}`, selectedStation: "Support", officialRecord: {}}, "Reply Received", m);
// const sendFeedbackThankYou = async (e, n, t) => sendWelcomeEmail(e, n, `Thank you for your ${t}`);

// module.exports = { 
//   sendOtpEmail, 
//   sendWelcomeEmail, 
//   sendComplaintConfirmation, 
//   sendStatusUpdateEmail,
//   sendAdminAlert,
//   sendMeetingInvite,    
//   sendProfileOtpEmail,  
//   sendProfileUpdateSuccessEmail,
//   sendHelpTicketAck,      
//   sendAdminReplyEmail,    
//   sendFeedbackThankYou,
//   sendNoticeAlert 
// };










// const axios = require('axios');

// // 🔗 CONFIGURATION
// const CRIMETRACK_LOGO = "https://res.cloudinary.com/dukrcgv8s/image/upload/v1770304918/CrimeTrack_abbtdr.png"; 
// const MAH_POLICE_LOGO = "https://res.cloudinary.com/dukrcgv8s/image/upload/v1771074848/MH_POLICE_LOGO_WHITE_wmf9hd.png";

// // 🎨 OFFICIAL COLORS
// const COLORS = {
//     headerBg: "#2f0b4d",   // ✅ New Purple Theme
//     headerText: "#ffffff",
//     bodyBg: "#e2e8f0",     
//     cardBg: "#ffffff",     
//     textMain: "#334155",   
//     textLight: "#64748b",  
//     border: "#cbd5e1",     
//     accent: "#7c3aed"      
// };

// // 📅 HELPER: Get Current Timestamp
// const getTimestamp = () => new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

// // ==========================================
// // 📄 MAIN TEMPLATE GENERATOR (Fixed Logo Size Issue)
// // ==========================================
// const generateOfficialTemplate = ({ title, recipientName, refNo, subject, dataTable, bodyText, footerNote }) => {
//     return `
//     <!DOCTYPE html>
//     <html>
//     <head>
//         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//         <style>
//             /* Email client resets */
//             body { margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
//             .content-table { width: 100%; border-collapse: collapse; }
            
//             /* --- MOBILE RESPONSIVENESS FIX --- */
//             @media only screen and (max-width: 600px) {
//                 .header-text { font-size: 14px !important; }
//                 .subheader-text { font-size: 9px !important; }
//                 .wrapper { padding: 0px !important; width: 100% !important; }
                
//                 /* Alag se size control mobile ke liye */
//                 .logo-police { width: 70px !important; height: auto !important; } /* ✅ Increased Mobile Size */
//                 .logo-crimetrack { width: 90px !important; height: auto !important; } 
//             }
//         </style>
//     </head>
//     <body style="background-color: ${COLORS.bodyBg}; padding: 20px 0;">
        
//         <div class="wrapper" style="max-width: 650px; margin: 0 auto; background-color: ${COLORS.cardBg}; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.15); font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
            
//             <div style="background-color: ${COLORS.headerBg}; padding: 15px 20px;">
//                 <table width="100%" cellpadding="0" cellspacing="0" border="0">
//                     <tr>
//                         <td align="left" width="20%" style="vertical-align: middle;">
//                             <img src="${MAH_POLICE_LOGO}" alt="Mah Police" class="logo-police" style="width: 100px; height: auto; display: block;">
//                         </td>
                        
//                         <td align="center" width="55%" style="vertical-align: middle; padding: 0 5px;">
//                             <h2 class="header-text" style="margin: 0; color: ${COLORS.headerText}; font-size: 18px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">
//                                 Maharashtra State Police
//                             </h2>
//                             <p class="subheader-text" style="margin: 4px 0 0; color: #e9d5ff; font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">
//                                 CrimeTrack Digital Communication System
//                             </p>
//                         </td>

//                         <td align="right" width="25%" style="vertical-align: middle;">
//                             <img src="${CRIMETRACK_LOGO}" alt="CrimeTrack" class="logo-crimetrack" style="width: 130px; height: auto; display: block;">
//                         </td>
//                     </tr>
//                 </table>
//             </div>

//             <div style="padding: 30px;">
                
//                 <table width="100%" style="border-bottom: 2px solid ${COLORS.bodyBg}; margin-bottom: 20px; padding-bottom: 10px;">
//                     <tr>
//                         <td align="left" style="font-size: 12px; color: ${COLORS.textLight}; font-weight: 600;">
//                             <strong>REF:</strong> ${refNo || `CT-${Math.floor(100000 + Math.random() * 900000)}`}
//                         </td>
//                         <td align="right" style="font-size: 12px; color: ${COLORS.textLight}; font-weight: 600;">
//                             <strong>DATE:</strong> ${getTimestamp()}
//                         </td>
//                     </tr>
//                 </table>

//                 <div style="margin-bottom: 30px;">
//                     <p style="font-size: 15px; color: ${COLORS.textMain}; margin: 0; line-height: 1.5;">
//                         <strong style="color: ${COLORS.headerBg}; font-size: 16px;">To,</strong><br>
//                         <span style="font-size: 18px; font-weight: bold;">${recipientName}</span><br>
//                         <span style="font-size: 13px; color: ${COLORS.textLight}; background-color: #f1f5f9; padding: 2px 8px; border-radius: 4px;">CrimeTrack User / Official</span>
//                     </p>
//                 </div>

//                 <div style="text-align: center; margin-bottom: 30px;">
//                     <div style="display: inline-block; background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); padding: 12px 25px; border-radius: 50px; border: 1px solid ${COLORS.border}; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
//                         <span style="font-weight: 800; color: ${COLORS.headerBg}; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">
//                             SUBJECT: ${subject}
//                         </span>
//                     </div>
//                 </div>

//                 <div style="font-size: 14px; line-height: 1.8; color: ${COLORS.textMain}; text-align: justify; margin-bottom: 30px; font-weight: 500;">
//                     ${bodyText}
//                 </div>

//                 ${dataTable ? `
//                 <div style="border-radius: 8px; overflow: hidden; border: 1px solid ${COLORS.border}; margin-bottom: 30px;">
//                     <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
//                         ${dataTable}
//                     </table>
//                 </div>` : ''}

//                 <div style="text-align: right; margin-top: 40px; padding-top: 20px; border-top: 1px dashed ${COLORS.border};">
//                     <p style="margin: 0; font-weight: 800; color: ${COLORS.headerBg}; font-size: 14px; text-transform: uppercase;">ISSUING AUTHORITY</p>
//                     <p style="margin: 5px 0 0; font-size: 12px; color: ${COLORS.textLight}; font-weight: 500;">Digital Command Center<br>CrimeTrack HQ, Maharashtra</p>
//                 </div>

//             </div>

//             <div style="background-color: #f1f5f9; padding: 20px; text-align: center; font-size: 11px; color: ${COLORS.textLight}; border-top: 1px solid ${COLORS.border};">
//                 <p style="margin: 0; font-weight: bold; color: ${COLORS.textMain};">${footerNote || "System Generated Official Document"}</p>
//                 <p style="margin: 8px 0 0; line-height: 1.4;">This communication is electronically generated and valid under IT Act, 2000.<br>Please do not reply directly to this automated email.</p>
//             </div>

//         </div>
//     </body>
//     </html>
//     `;
// };

// // 🛠️ HELPER: Table Row Generator (Styled)
// const createRow = (label, value, highlight = false) => `
//     <tr>
//         <td style="padding: 12px 15px; border-bottom: 1px solid ${COLORS.border}; background-color: #f8fafc; font-weight: 700; width: 35%; color: ${COLORS.textMain}; vertical-align: top;">${label}</td>
//         <td style="padding: 12px 15px; border-bottom: 1px solid ${COLORS.border}; background-color: #ffffff; color: ${highlight ? COLORS.headerBg : COLORS.textMain}; font-weight: ${highlight ? '800' : '500'}; vertical-align: top;">${value || "N/A"}</td>
//     </tr>
// `;

// // 🚀 CORE SENDER (Brevo)
// const sendBrevoEmail = async (to, subject, htmlContent) => {
//     try {
//         await axios.post('https://api.brevo.com/v3/smtp/email', {
//             sender: { email: process.env.EMAIL_FROM || "admin@crimetrack.com", name: 'CrimeTrack Official' },
//             to: [{ email: to }],
//             subject: subject,
//             htmlContent: htmlContent,
//         }, {
//             headers: { 'api-key': process.env.BREVO_API_KEY, 'Content-Type': 'application/json' }
//         });
//         console.log(`✅ Email Sent to ${to}: ${subject}`);
//     } catch (error) {
//         console.error("❌ Email Failed:", error.response?.data || error.message);
//     }
// };

// /* =========================================================================
//    1. 🔐 OTP VERIFICATION
//    ========================================================================= */
// const sendOtpEmail = async (email, otp) => {
//     const table = `
//         ${createRow("Verification Code", `<span style="font-size: 18px; letter-spacing: 2px;">${otp}</span>`, true)}
//         ${createRow("Valid For", "10 Minutes")}
//         ${createRow("Request Type", "Identity Verification")}
//     `;

//     const bodyText = `
//         This is a secure system alert initiated by your recent request to access the CrimeTrack Portal. 
//         To ensure the integrity of your account and prevent unauthorized access, we require you to verify your identity using the One-Time Password (OTP) provided below.
//         <br><br>
//         Please note that this code is strictly confidential. CrimeTrack officials will never ask for this OTP via phone or email. If you did not initiate this request, please report it to our Cyber Cell immediately.
//     `;

//     const html = generateOfficialTemplate({
//         title: "SECURITY VERIFICATION",
//         recipientName: "Applicant / User",
//         subject: "ONE-TIME PASSWORD (OTP) FOR ACCESS AUTHORIZATION",
//         bodyText: bodyText,
//         dataTable: table,
//         footerNote: "Security Alert: Unauthorized access attempts are monitored and logged."
//     });

//     await sendBrevoEmail(email, "CrimeTrack Verification Code", html);
// };

// /* =========================================================================
//    2. 👋 WELCOME (Registration)
//    ========================================================================= */
// const sendWelcomeEmail = async (email, name, password) => {
//     const table = `
//         ${createRow("Registered Email", email)}
//         ${createRow("Temporary Password", password, true)}
//         ${createRow("Access Role", "Citizen / User")}
//         ${createRow("Registration Date", getTimestamp())}
//     `;

//     const bodyText = `
//         Welcome to <strong>CrimeTrack</strong>, the Maharashtra State Police's advanced Digital Policing Initiative. 
//         <br><br>
//         Our mission is to bridge the gap between citizens and law enforcement through technology. With this account, you now have access to a suite of digital services designed for your safety and convenience:
//         <ul>
//             <li><strong>e-FIR Filing:</strong> Report non-emergency crimes online instantly.</li>
//             <li><strong>SOS Emergency:</strong> Trigger instant alerts to the nearest PCR van with live location tracking.</li>
//             <li><strong>Case Tracking:</strong> Monitor the real-time status of your complaints and official records.</li>
//             <li><strong>Legal Aid:</strong> Access AI-powered legal guidance based on the Indian Penal Code (IPC).</li>
//         </ul>
//         Please find your secure login credentials below. We strongly recommend changing your password immediately after your first login.
//     `;

//     const html = generateOfficialTemplate({
//         title: "ACCOUNT REGISTRATION",
//         recipientName: name,
//         subject: "CONFIRMATION OF DIGITAL ACCOUNT CREATION",
//         bodyText: bodyText,
//         dataTable: table,
//         footerNote: "CrimeTrack: Committed to Safety, Service, and Transparency."
//     });

//     await sendBrevoEmail(email, "Registration Successful - CrimeTrack", html);
// };

// /* =========================================================================
//    3. 📩 COMPLAINT ACKNOWLEDGEMENT
//    ========================================================================= */
// const sendComplaintConfirmation = async (email, name, complaintId) => {
//     const table = `
//         ${createRow("Complaint Ref ID", `#${complaintId}`, true)}
//         ${createRow("Date of Filing", getTimestamp())}
//         ${createRow("Current Status", "Received / Under Preliminary Review")}
//         ${createRow("Handling Department", "Central Digital Desk")}
//     `;

//     const bodyText = `
//         This is an official acknowledgement that your complaint has been successfully lodged in the CrimeTrack Central Registry. 
//         <br><br>
//         Your report has been assigned a unique <strong>Reference ID</strong> for tracking purposes. The details have been forwarded to the jurisdictional Station House Officer (SHO) for immediate assessment. 
//         <br><br>
//         An investigating officer will be assigned to your case shortly. You will receive further notifications regarding the acceptance, inquiry, or FIR registration status via email and SMS.
//     `;

//     const html = generateOfficialTemplate({
//         title: "COMPLAINT RECEIPT",
//         recipientName: name,
//         refNo: `FIR/REQ/${complaintId}`,
//         subject: "ACKNOWLEDGEMENT OF COMPLAINT REGISTRATION",
//         bodyText: bodyText,
//         dataTable: table,
//         footerNote: "Please retain this Reference ID for all future correspondence."
//     });

//     await sendBrevoEmail(email, `Complaint Recorded: #${complaintId}`, html);
// };

// /* =========================================================================
//    4. 🚨 STATUS / FIR UPDATE (Detailed)
//    ========================================================================= */
// const sendStatusUpdateEmail = async (email, report, status, officerRemark) => {
//     let docTitle = "CASE STATUS UPDATE";
//     if (status.includes("FIR")) docTitle = "OFFICIAL F.I.R. GENERATED";
//     if (status.includes("NCR")) docTitle = "NON-COGNIZABLE REPORT (NCR)";

//     const record = report.officialRecord || {};
//     const officerName = record.investigatingOfficer || report.assignedOfficer || "Duty Officer";
//     const designation = record.rank || "Investigating Officer";
//     const recordNo = record.recordNumber || "Pending";
//     const acts = record.acts && record.acts.length > 0 ? record.acts.map(a => `${a.actName}`).join(', ') : "Under Review";
//     const incidentLoc = record.incidentPlace || report.incidentLocationAddress || "As per record";

//     const table = `
//         ${createRow("Case Reference ID", `#${report._id}`)}
//         ${createRow("Record Number (FIR/NCR)", recordNo, true)}
//         ${createRow("Updated Status", status.toUpperCase(), true)}
//         ${createRow("Police Station", report.selectedStation)}
//         ${createRow("Incident Location", incidentLoc)}
//         ${createRow("Applicable Acts", acts)}
//         ${createRow("Investigating Officer", officerName)}
//         ${createRow("Officer Designation", designation)}
//         ${createRow("Official Remark", officerRemark || "Procedural Update")}
//     `;

//     const bodyText = `
//         This notification is issued to inform you of a significant development in the investigation of Case #${report._id}. 
//         <br><br>
//         The status of the case has been officially updated by the Investigating Officer. If an FIR or NCR has been registered, the corresponding Record Number is provided below. 
//         This action has been taken in accordance with the standard operating procedures of the Maharashtra State Police.
//         <br><br>
//         You are requested to review the specific remarks made by the officer and take necessary action if required (e.g., submitting further evidence or attending an inquiry).
//     `;

//     const html = generateOfficialTemplate({
//         title: docTitle,
//         recipientName: report.user?.name || "Complainant",
//         refNo: recordNo !== "Pending" ? recordNo : `CASE/${report._id}`,
//         subject: `NOTICE OF CASE UPDATE: ${status.toUpperCase()}`,
//         bodyText: bodyText,
//         dataTable: table,
//         footerNote: "Digitally signed documents are available for download in your user dashboard."
//     });

//     await sendBrevoEmail(email, `Official Update: Case #${report._id}`, html);
// };

// /* =========================================================================
//    5. 📜 OFFICIAL NOTICES (Summons/Legal)
//    ========================================================================= */
// const sendNoticeAlert = async (email, name, senderDetails, type) => {
//     const table = `
//         ${createRow("Notice Type", type.toUpperCase(), true)}
//         ${createRow("Issuing Authority", senderDetails.name)}
//         ${createRow("Designation", senderDetails.designation)}
//         ${createRow("Station / Dept", senderDetails.station)}
//         ${createRow("Date of Issue", getTimestamp())}
//     `;

//     const bodyText = `
//         <strong>NOTICE UNDER OFFICIAL PROCEDURE</strong>
//         <br><br>
//         You are hereby served with an official <strong>${type}</strong> issued by the competent authority mentioned below. 
//         This document contains critical directions, summons, or information that requires your immediate attention.
//         <br><br>
//         Failure to comply with the instructions contained in this notice or failure to respond within the stipulated time frame may lead to further legal or procedural action as deemed necessary by the department.
//         <br><br>
//         Please login to the CrimeTrack Portal immediately to view the full digital copy of this notice and acknowledge its receipt.
//     `;

//     const html = generateOfficialTemplate({
//         title: "LEGAL NOTICE / INTIMATION",
//         recipientName: name,
//         subject: `ISSUANCE OF OFFICIAL ${type.toUpperCase()}`,
//         bodyText: bodyText,
//         dataTable: table,
//         footerNote: "ACTION REQUIRED: Login to CrimeTrack Portal to view the full document."
//     });

//     await sendBrevoEmail(email, `URGENT: Official ${type} Served`, html);
// };

// /* =========================================================================
//    6. 📹 MEETING INVITE
//    ========================================================================= */
// const sendMeetingInvite = async (email, name, meetingDetails) => {
//     const meetingTime = new Date(meetingDetails.scheduledTime).toLocaleString('en-IN', {
//         dateStyle: 'full', timeStyle: 'short'
//     });

//     const table = `
//         ${createRow("Purpose", meetingDetails.title, true)}
//         ${createRow("Scheduled Date & Time", meetingTime)}
//         ${createRow("Mode", "Video Conference")}
//         ${createRow("Platform", "CrimeTrack Secure Interface")}
//     `;

//     const bodyText = `
//         You are requested to attend an official virtual meeting regarding ongoing departmental proceedings or an inquiry related to your case. 
//         <br><br>
//         It is mandatory to be present at the scheduled time. Please ensure you have a stable internet connection and are in a quiet environment. 
//         If you are required to produce any documents during this session, please keep them ready beforehand.
//         <br><br>
//         A secure, encrypted link to join the session will be activated on your CrimeTrack Dashboard 10 minutes prior to the commencement of the meeting.
//     `;

//     const html = generateOfficialTemplate({
//         title: "MEETING SUMMONS",
//         recipientName: name,
//         subject: "INVITATION TO ATTEND OFFICIAL INQUIRY / MEETING",
//         bodyText: bodyText,
//         dataTable: table,
//         footerNote: "Do not share the meeting access link with unauthorized persons."
//     });

//     await sendBrevoEmail(email, `Meeting Scheduled: ${meetingDetails.title}`, html);
// };

// /* =========================================================================
//    7. 🆘 ADMIN & SUPPORT
//    ========================================================================= */
// const sendAdminAlert = async (action, user) => {
//     const table = `
//         ${createRow("Event Type", action.toUpperCase(), true)}
//         ${createRow("User Name", user.name)}
//         ${createRow("User Email", user.email)}
//         ${createRow("Role", user.role)}
//         ${createRow("Timestamp", getTimestamp())}
//     `;

//     const bodyText = `
//         An automated security event has been detected and logged in the system registry. 
//         This alert is generated to keep the administration informed of critical user activities such as Signups, Logins, or Profile Modifications.
//         <br><br>
//         Please review the details below. If this activity appears suspicious or unauthorized, please investigate the user logs immediately via the Admin Console.
//     `;

//     const html = generateOfficialTemplate({
//         title: "SYSTEM SECURITY ALERT",
//         recipientName: "System Administrator",
//         subject: `SECURITY EVENT LOGGED: ${action.toUpperCase()}`,
//         bodyText: bodyText,
//         dataTable: table,
//         footerNote: "Automated Watchdog System - Internal Use Only"
//     });

//     await sendBrevoEmail("sushanttelekune@gmail.com", `Alert: ${action}`, html);
// };

// // Aliases
// const sendProfileOtpEmail = (e, o) => sendOtpEmail(e, o);
// const sendProfileUpdateSuccessEmail = async (e, n) => sendWelcomeEmail(e, n, "Profile Updated Successfully");
// const sendHelpTicketAck = async (e, n, i) => sendComplaintConfirmation(e, n, `TICKET-${i}`);
// const sendAdminReplyEmail = async (e, n, i, m) => sendStatusUpdateEmail(e, {_id: `TICKET-${i}`, selectedStation: "Support", officialRecord: {}}, "Reply Received", m);
// const sendFeedbackThankYou = async (e, n, t) => sendWelcomeEmail(e, n, `Thank you for your ${t}`);

// module.exports = { 
//   sendOtpEmail, 
//   sendWelcomeEmail, 
//   sendComplaintConfirmation, 
//   sendStatusUpdateEmail,
//   sendAdminAlert,
//   sendMeetingInvite,    
//   sendProfileOtpEmail,  
//   sendProfileUpdateSuccessEmail,
//   sendHelpTicketAck,      
//   sendAdminReplyEmail,    
//   sendFeedbackThankYou,
//   sendNoticeAlert 
// };














const axios = require('axios');

// 🔗 CONFIGURATION
const CRIMETRACK_LOGO = "https://res.cloudinary.com/dukrcgv8s/image/upload/v1770304918/CrimeTrack_abbtdr.png"; 
const MAH_POLICE_LOGO = "https://res.cloudinary.com/dukrcgv8s/image/upload/v1771074848/MH_POLICE_LOGO_WHITE_wmf9hd.png";

// 🎨 OFFICIAL COLORS
const COLORS = {
    headerBg: "#2f0b4d",   // Purple Theme
    headerText: "#ffffff",
    bodyBg: "#e2e8f0",     
    cardBg: "#ffffff",     
    textMain: "#334155",   
    textLight: "#64748b",  
    border: "#cbd5e1",     
    accent: "#7c3aed"      
};

// 📅 HELPER: Get Current Timestamp
const getTimestamp = () => new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

// ==========================================
// 📄 MAIN TEMPLATE GENERATOR (UI Layout)
// ==========================================
const generateOfficialTemplate = ({ title, recipientName, refNo, subject, dataTable, bodyText, footerNote }) => {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            body { margin: 0; padding: 0; font-family: 'Segoe UI', sans-serif; background-color: ${COLORS.bodyBg}; }
            .wrapper { max-width: 650px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; font-family: 'Segoe UI', sans-serif; }
            @media only screen and (max-width: 600px) {
                .logo-police { width: 60px !important; }
                .logo-crimetrack { width: 100px !important; }
                .header-text { font-size: 14px !important; }
                .wrapper { width: 100% !important; border-radius: 0; }
            }
        </style>
    </head>
    <body style="padding: 20px 0;">
        <div class="wrapper">
            <div style="background-color: ${COLORS.headerBg}; padding: 15px 20px;">
                <table width="100%">
                    <tr>
                        <td align="left" width="20%"><img src="${MAH_POLICE_LOGO}" class="logo-police" style="width: 80px; display: block;"></td>
                        <td align="center" width="60%">
                            <h2 class="header-text" style="margin:0; color:#fff; font-size:18px; text-transform:uppercase;">Maharashtra State Police</h2>
                            <p style="margin:5px 0 0; color:#e9d5ff; font-size:11px; text-transform:uppercase;">CrimeTrack Digital System</p>
                        </td>
                        <td align="right" width="20%"><img src="${CRIMETRACK_LOGO}" class="logo-crimetrack" style="width: 110px; display: block;"></td>
                    </tr>
                </table>
            </div>

            <div style="padding: 30px;">
                <table width="100%" style="border-bottom: 2px solid #f1f5f9; margin-bottom: 20px; padding-bottom: 10px;">
                    <tr>
                        <td align="left" style="font-size:12px; color:#64748b;"><strong>REF:</strong> ${refNo || `SYS-${Date.now().toString().slice(-6)}`}</td>
                        <td align="right" style="font-size:12px; color:#64748b;"><strong>DATE:</strong> ${getTimestamp()}</td>
                    </tr>
                </table>

                <p style="font-size:15px; color:#334155; margin-bottom:20px;">
                    <strong style="color:${COLORS.headerBg};">To,</strong><br>
                    <span style="font-size:18px; font-weight:bold;">${recipientName}</span>
                </p>

                <div style="text-align:center; margin-bottom:25px;">
                    <div style="display:inline-block; background:#f8fafc; padding:10px 20px; border-radius:50px; border:1px solid #cbd5e1; font-weight:bold; color:${COLORS.headerBg}; font-size:13px;">
                        SUBJECT: ${subject}
                    </div>
                </div>

                <div style="font-size:14px; line-height:1.6; color:#334155; text-align:justify; margin-bottom:25px;">
                    ${bodyText}
                </div>

                ${dataTable ? `
                <table style="width:100%; border-collapse:collapse; font-size:13px; margin-bottom:25px; border:1px solid #e2e8f0;">
                    ${dataTable}
                </table>` : ''}

                <div style="text-align:right; margin-top:30px; border-top:1px dashed #cbd5e1; padding-top:15px;">
                    <p style="margin:0; font-weight:bold; color:${COLORS.headerBg}; font-size:13px;">ISSUING AUTHORITY</p>
                    <p style="margin:2px 0 0; font-size:11px; color:#64748b;">CrimeTrack Digital HQ</p>
                </div>
            </div>

            <div style="background-color:#f8fafc; padding:15px; text-align:center; font-size:11px; color:#94a3b8; border-top:1px solid #e2e8f0;">
                <strong>${footerNote || "Official Digital Communication"}</strong><br>
                Valid under IT Act, 2000. Automated System Email.
            </div>
        </div>
    </body>
    </html>
    `;
};

// 🛠️ HELPER: Row Builder
const createRow = (label, value, highlight = false) => `
    <tr>
        <td style="padding:10px; border-bottom:1px solid #e2e8f0; background:#f8fafc; font-weight:bold; width:35%; color:#475569;">${label}</td>
        <td style="padding:10px; border-bottom:1px solid #e2e8f0; color:${highlight ? COLORS.headerBg : '#334155'}; font-weight:${highlight ? 'bold' : 'normal'};">${value || "N/A"}</td>
    </tr>
`;

// 🚀 CORE EMAIL SENDER (Brevo)
const sendBrevoEmail = async (to, subject, htmlContent) => {
    try {
        await axios.post('https://api.brevo.com/v3/smtp/email', {
            sender: { email: process.env.EMAIL_FROM || "admin@crimetrack.com", name: 'CrimeTrack Police Dept' },
            to: [{ email: to }],
            subject: subject,
            htmlContent: htmlContent,
        }, {
            headers: { 'api-key': process.env.BREVO_API_KEY, 'Content-Type': 'application/json' }
        });
        console.log(`✅ Mail Sent to ${to}: ${subject}`);
    } catch (error) {
        console.error("❌ Mail Error:", error.response?.data || error.message);
    }
};

/* =========================================================================
   1. 🔐 OTP & VERIFICATION
   ========================================================================= */
const sendOtpEmail = async (email, otp) => {
    const table = `
        ${createRow("OTP Code", `<span style="font-size:18px; letter-spacing:2px;">${otp}</span>`, true)}
        ${createRow("Validity", "10 Minutes")}
        ${createRow("Purpose", "Identity Verification")}
    `;
    const body = `Use the One-Time Password (OTP) below to verify your identity on the CrimeTrack Portal. Do not share this code with anyone.`;
    
    await sendBrevoEmail(email, "Your Verification Code", generateOfficialTemplate({
        title: "SECURITY VERIFICATION", recipientName: "User", subject: "LOGIN VERIFICATION CODE",
        bodyText: body, dataTable: table
    }));
};

/* =========================================================================
   2. 👋 WELCOME / REGISTRATION
   ========================================================================= */
const sendWelcomeEmail = async (email, name, password) => {
    const table = `
        ${createRow("Registered Email", email)}
        ${createRow("Login Password", password, true)}
        ${createRow("Role", "Citizen / User")}
    `;
    const body = `Welcome to <strong>CrimeTrack</strong>. Your digital account has been created successfully. You can now file e-FIRs, send SOS alerts, and track cases online.`;

    await sendBrevoEmail(email, "Welcome to CrimeTrack", generateOfficialTemplate({
        title: "ACCOUNT CREATED", recipientName: name, subject: "REGISTRATION SUCCESSFUL",
        bodyText: body, dataTable: table, footerNote: "Please change your password after logging in."
    }));
};

/* =========================================================================
   3. 📝 PROFILE UPDATE ALERT (New Function)
   ========================================================================= */
const sendProfileUpdateSuccessEmail = async (email, name) => {
    const table = `
        ${createRow("Update Type", "Profile Information")}
        ${createRow("Date", getTimestamp())}
        ${createRow("Status", "Successful", true)}
    `;
    const body = `This is to inform you that your personal profile details on the CrimeTrack Portal have been successfully updated. If you did not make this change, please contact support immediately.`;

    await sendBrevoEmail(email, "Profile Updated", generateOfficialTemplate({
        title: "PROFILE MODIFICATION", recipientName: name, subject: "ACCOUNT DETAILS UPDATED",
        bodyText: body, dataTable: table
    }));
};

/* =========================================================================
   4. ⭐ FEEDBACK / REVIEW ACKNOWLEDGEMENT (New Function - Fixed Bug)
   ========================================================================= */
const sendFeedbackThankYou = async (email, name, type) => {
    const table = `
        ${createRow("Submission Type", type, true)}
        ${createRow("Received Date", getTimestamp())}
        ${createRow("Status", "Logged for Review")}
    `;
    const body = `Thank you for taking the time to submit your <strong>${type}</strong>. We value your input as it helps us improve the Digital Policing experience for all citizens.`;

    await sendBrevoEmail(email, "We Received Your Feedback", generateOfficialTemplate({
        title: "FEEDBACK RECEIVED", recipientName: name, subject: `ACKNOWLEDGEMENT OF ${type.toUpperCase()}`,
        bodyText: body, dataTable: table, footerNote: "Your voice matters to us."
    }));
};

/* =========================================================================
   5. 🎫 HELP TICKET ACKNOWLEDGEMENT (New Function - Fixed Bug)
   ========================================================================= */
const sendHelpTicketAck = async (email, name, ticketId) => {
    const table = `
        ${createRow("Ticket ID", `#${ticketId}`, true)}
        ${createRow("Date Opened", getTimestamp())}
        ${createRow("Priority", "Standard")}
    `;
    const body = `We have received your support request. Our support team is reviewing your query and will get back to you shortly via the portal or email.`;

    await sendBrevoEmail(email, `Support Request #${ticketId}`, generateOfficialTemplate({
        title: "SUPPORT TICKET OPENED", recipientName: name, subject: "HELP DESK REQUEST RECEIVED",
        bodyText: body, dataTable: table
    }));
};

/* =========================================================================
   6. 💬 SUPPORT REPLY FROM ADMIN (New Function - Fixed Bug)
   ========================================================================= */
const sendAdminReplyEmail = async (email, name, ticketId, replyMessage) => {
    const table = `
        ${createRow("Ticket Ref", `#${ticketId}`, true)}
        ${createRow("Replied By", "Support Admin")}
        ${createRow("Status", "Responded")}
    `;
    const body = `You have received a new response to your support ticket. <br><br><strong>Admin Response:</strong><br><em>"${replyMessage}"</em>`;

    await sendBrevoEmail(email, `Reply: Ticket #${ticketId}`, generateOfficialTemplate({
        title: "SUPPORT RESPONSE", recipientName: name, subject: "UPDATE ON YOUR TICKET",
        bodyText: body, dataTable: table, footerNote: "Log in to the portal to view full history."
    }));
};

/* =========================================================================
   7. 📩 COMPLAINT / FIR FILING
   ========================================================================= */
const sendComplaintConfirmation = async (email, name, complaintId) => {
    const table = `
        ${createRow("Complaint ID", `#${complaintId}`, true)}
        ${createRow("Filing Date", getTimestamp())}
        ${createRow("Status", "Under Review")}
    `;
    const body = `Your complaint has been successfully lodged in the Central Registry. It has been forwarded to the concerned Station House Officer (SHO) for assessment.`;

    await sendBrevoEmail(email, `Complaint Lodged: #${complaintId}`, generateOfficialTemplate({
        title: "COMPLAINT RECEIPT", recipientName: name, refNo: `FIR/REQ/${complaintId}`,
        subject: "OFFICIAL COMPLAINT REGISTRATION", bodyText: body, dataTable: table
    }));
};

/* =========================================================================
   8. 🚨 CASE STATUS UPDATE (FIR / NCR)
   ========================================================================= */
const sendStatusUpdateEmail = async (email, report, status, officerRemark) => {
    const record = report.officialRecord || {};
    const table = `
        ${createRow("Case Ref ID", `#${report._id}`)}
        ${createRow("Record No", record.recordNumber || "Pending", true)}
        ${createRow("New Status", status.toUpperCase(), true)}
        ${createRow("Officer Remark", officerRemark || "Update logged.")}
    `;
    const body = `There has been an official update regarding your case. Please review the details below. If an FIR/NCR has been filed, the record number is provided.`;

    await sendBrevoEmail(email, `Case Update: #${report._id}`, generateOfficialTemplate({
        title: "CASE STATUS NOTIFICATION", recipientName: report.user?.name || "Citizen",
        subject: `STATUS CHANGED TO: ${status.toUpperCase()}`, bodyText: body, dataTable: table
    }));
};

/* =========================================================================
   9. 📜 OFFICIAL NOTICES (Summons)
   ========================================================================= */
const sendNoticeAlert = async (email, name, senderDetails, type) => {
    const table = `
        ${createRow("Notice Type", type.toUpperCase(), true)}
        ${createRow("Issued By", senderDetails.name)}
        ${createRow("Station", senderDetails.station)}
    `;
    const body = `You are hereby served with an official <strong>${type}</strong>. This document requires your immediate attention. Please login to the portal to view the full digitally signed document.`;

    await sendBrevoEmail(email, `URGENT: Official ${type}`, generateOfficialTemplate({
        title: "LEGAL INTIMATION", recipientName: name, subject: `ISSUANCE OF ${type.toUpperCase()}`,
        bodyText: body, dataTable: table, footerNote: "Failure to comply may lead to legal action."
    }));
};

/* =========================================================================
   10. 📹 MEETING INVITE
   ========================================================================= */
const sendMeetingInvite = async (email, name, meetingDetails) => {
    const meetingTime = new Date(meetingDetails.scheduledTime).toLocaleString('en-IN', { dateStyle: 'full', timeStyle: 'short' });
    const table = `
        ${createRow("Topic", meetingDetails.title, true)}
        ${createRow("Time", meetingTime)}
        ${createRow("Mode", "Online Video Conference")}
    `;
    const body = `You are requested to attend an official virtual meeting regarding an ongoing inquiry. Please be present at the scheduled time. Link available on dashboard.`;

    await sendBrevoEmail(email, "Meeting Invitation", generateOfficialTemplate({
        title: "MEETING SUMMONS", recipientName: name, subject: "OFFICIAL INQUIRY MEETING",
        bodyText: body, dataTable: table
    }));
};

/* =========================================================================
   11. 🆘 ADMIN ALERTS
   ========================================================================= */
const sendAdminAlert = async (action, user) => {
    const table = `
        ${createRow("Event", action.toUpperCase(), true)}
        ${createRow("User", `${user.name} (${user.email})`)}
        ${createRow("Role", user.role)}
    `;
    const body = `A critical security event has been logged in the system registry.`;

    await sendBrevoEmail("sushanttelekune@gmail.com", `System Alert: ${action}`, generateOfficialTemplate({
        title: "SYSTEM ALERT", recipientName: "Administrator", subject: "SECURITY EVENT LOGGED",
        bodyText: body, dataTable: table
    }));
};

module.exports = { 
    sendOtpEmail, 
    sendWelcomeEmail, 
    sendProfileUpdateSuccessEmail, // ✅ Correct Function
    sendComplaintConfirmation, 
    sendStatusUpdateEmail,
    sendHelpTicketAck,             // ✅ Correct Function
    sendAdminReplyEmail,           // ✅ Correct Function
    sendFeedbackThankYou,          // ✅ Correct Function
    sendNoticeAlert,
    sendMeetingInvite,    
    sendAdminAlert
};