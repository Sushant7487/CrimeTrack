
// const CrimeReport = require('../models/CrimeReport');

// // --- HELPER: Parse Nested FormData Keys ---
// const structureFormData = (body) => {
//     const result = {};
//     for (const key in body) {
//         if (key.includes('[')) {
//             const [parent, childWithBracket] = key.split('[');
//             const child = childWithBracket.slice(0, -1); // remove ']'
            
//             if (!result[parent]) result[parent] = {};
//             result[parent][child] = body[key];
//         } else {
//             result[key] = body[key];
//         }
//     }
//     return result;
// };

// // ==========================================
// // 1. CREATE REPORT (Citizen)
// // ==========================================
// const createReport = async (req, res) => {
//   try {
//     const { 
//         crimeType, description, dateOfIncident, 
//         isAnonymous, reporterName, selectedStation,
        
//         // Victim Inputs
//         victimTitle, victimName, victimAge, victimGender, victimContact, victimAadhar, victimAddress,
        
//         // Incident Location (Text)
//         incidentLocationAddress,

//         // Suspect Inputs
//         suspectTitle, suspectName, suspectAge, suspectContact, suspectAddress, suspectGender, suspectAadhar,
        
//         // Manual User ID (Fallback)
//         userId
//     } = req.body;

//     // --- ✅ VALIDATIONS START ---
//     const mobileRegex = /^\d{10}$/;
//     const aadharRegex = /^\d{12}$/;

//     // 1. Victim Validation
//     if (victimContact && !mobileRegex.test(victimContact)) {
//         return res.status(400).json({ message: "Victim Contact must be exactly 10 digits (numbers only)." });
//     }
//     if (victimAadhar && !aadharRegex.test(victimAadhar)) {
//         return res.status(400).json({ message: "Victim Aadhaar must be exactly 12 digits (numbers only)." });
//     }

//     // 2. Suspect Validation (Only if provided)
//     if (suspectContact && suspectContact !== "N/A") {
//         if (!mobileRegex.test(suspectContact)) {
//             return res.status(400).json({ message: "Suspect Contact must be exactly 10 digits (numbers only)." });
//         }
//         if (victimContact && suspectContact === victimContact) {
//             return res.status(400).json({ message: "Victim and Suspect contact numbers cannot be the same." });
//         }
//     }

//     if (suspectAadhar && suspectAadhar !== "N/A") {
//         if (!aadharRegex.test(suspectAadhar)) {
//             return res.status(400).json({ message: "Suspect Aadhaar must be exactly 12 digits (numbers only)." });
//         }
//         if (victimAadhar && suspectAadhar === victimAadhar) {
//             return res.status(400).json({ message: "Victim and Suspect Aadhaar numbers cannot be the same." });
//         }
//     }
//     // --- ✅ VALIDATIONS END ---

//     // --- ✅ CLOUDINARY FILE EXTRACTION START ---
    
//     let victimIdUrl = null;
//     let suspectIdUrl = null;
//     let evidenceUrls = [];
//     let incidentProofUrls = [];

//     if (req.files) {
//         // Extract Victim ID Photo (Single)
//         if (req.files.victimIdPhoto && req.files.victimIdPhoto.length > 0) {
//             victimIdUrl = req.files.victimIdPhoto[0].path;
//         }

//         // Extract Suspect ID Photo (Single)
//         if (req.files.suspectIdPhoto && req.files.suspectIdPhoto.length > 0) {
//             suspectIdUrl = req.files.suspectIdPhoto[0].path;
//         }

//         // Extract Evidence (Existing logic)
//         if (req.files.evidence && req.files.evidence.length > 0) {
//             evidenceUrls = req.files.evidence.map(file => file.path);
//         }

//         // Extract Incident Proof (Multiple)
//         if (req.files.incidentProof && req.files.incidentProof.length > 0) {
//             incidentProofUrls = req.files.incidentProof.map(file => file.path);
//         }
//     }
//     // --- ✅ CLOUDINARY FILE EXTRACTION END ---

//     // Determine User ID (From Token > From Body > Null)
//     const finalUserId = req.user ? req.user._id : (userId || null);

//     const report = await CrimeReport.create({
//       user: finalUserId,
//       reporterName: isAnonymous === 'true' ? "Anonymous" : reporterName,
      
//       // Victim
//       victimTitle,
//       victimName, 
//       victimAge,
//       victimGender, 
//       victimContact, 
//       victimAadhar, 
//       victimAddress,
//       victimIdPhoto: victimIdUrl,

//       // Incident
//       selectedStation,
//       crimeType, 
//       description, 
//       dateOfIncident, 
//       incidentLocationAddress,

//       // Suspect
//       suspectTitle: suspectTitle || "",
//       suspectName: suspectName || "Unknown",
//       suspectAge: suspectAge || "",
//       suspectContact: suspectContact || "N/A",
//       suspectAddress: suspectAddress || "N/A",
//       suspectGender: suspectGender || "Unknown",
//       suspectAadhar: suspectAadhar || "",
//       suspectIdPhoto: suspectIdUrl,

//       isAnonymous: isAnonymous === 'true',
//       status: 'Complaint Received',
      
//       evidence: evidenceUrls,
//       incidentProof: incidentProofUrls, 

//       statusHistory: [{
//           status: 'Complaint Received',
//           remark: 'Complaint filed by citizen.',
//           updatedBy: 'System',
//           timestamp: new Date()
//       }]
//     });

//     res.status(201).json(report);
//   } catch (error) { 
//       console.error("Create Error:", error);
//       res.status(500).json({ message: "Server Error: Failed to save report." }); 
//   }
// };

// // ==========================================
// // 2. FILE OFFICIAL RECORD (FIR / NCR) - UPDATED
// // ==========================================
// const fileOfficialRecord = async (req, res) => {
//     try {
//         const rawBody = req.body;
//         const structured = structureFormData(rawBody);

//         const { complaintId, recordType, acts, existingEvidence } = structured;

//         const mappedData = {
//             ...structured, 
//             complainantName: structured.complainant?.fullName,
//             complainantGuardianName: structured.complainant?.guardianName,
//             complainantAge: structured.complainant?.age,
//             complainantGender: structured.complainant?.gender,
//             complainantMobile: structured.complainant?.mobile,
//             complainantEmail: structured.complainant?.email,
//             complainantAddress: structured.complainant?.address,
//             idProofType: structured.complainant?.idProofType,
//             idProofNumber: structured.complainant?.idProofNumber,

//             victimName: structured.victim?.fullName,
//             victimAge: structured.victim?.age,
//             victimGender: structured.victim?.gender,
//             victimMobile: structured.victim?.mobile,
//             victimAddress: structured.victim?.address,
//             victimAadhar: structured.victim?.idProofNumber, 

//             accusedName: structured.accused?.fullName,
//             accusedGender: structured.accused?.gender,
//             accusedMobile: structured.accused?.mobile,
//             accusedAddress: structured.accused?.address,
//             accusedAadhar: structured.accused?.idProofNumber,
//             relationWithAccused: structured.accused?.relation
//         };

//         if (!mappedData.occurrenceDate || !mappedData.occurrenceTime) {
//             return res.status(400).json({ message: "Occurrence Date & Time are MANDATORY." });
//         }
        
//         const targetId = complaintId || structured.onlineComplaintId;
//         const report = await CrimeReport.findById(targetId);
//         if (!report) return res.status(404).json({ message: 'Linked Complaint ID not found' });

//         // ✅ EVIDENCE HANDLING: Merge Existing + New
//         let finalEvidence = [];

//         // 1. Add Existing URLs (parsed from JSON string)
//         if (existingEvidence) {
//             try {
//                 const parsedExisting = JSON.parse(existingEvidence);
//                 if (Array.isArray(parsedExisting)) {
//                     finalEvidence = [...parsedExisting];
//                 }
//             } catch (e) {
//                 console.error("Error parsing existingEvidence", e);
//             }
//         }

//         // 2. Add New Files (Uploaded via Multer)
//         if (req.files && req.files.length > 0) {
//             const newPaths = req.files.map(file => file.path);
//             finalEvidence = [...finalEvidence, ...newPaths];
//         }

//         const currentYear = new Date().getFullYear();
//         const uniqueId = Math.floor(1000 + Math.random() * 9000); 
//         const stationCode = report.selectedStation ? report.selectedStation.substring(0, 3).toUpperCase() : "GEN";
//         const recordNumber = `${recordType}/${stationCode}/${currentYear}/${uniqueId}`;

//         let parsedActs = [];
//         try { parsedActs = typeof acts === 'string' ? JSON.parse(acts) : acts; } catch (e) { parsedActs = []; }

//         const officerName = `${req.user.designation} ${req.user.firstName} ${req.user.lastName}`;

//         report.officialRecord = {
//             ...mappedData,
//             recordType,
//             recordNumber,
//             recordDate: new Date(),
//             acts: parsedActs,
//             policeEvidence: finalEvidence, // ✅ SAVE COMBINED EVIDENCE
//             investigatingOfficer: officerName,
//             rank: req.user.designation
//         };

//         report.status = `${recordType} Filed`; 
        
//         if (!report.assignedOfficer || report.assignedOfficer === 'Not Assigned') {
//             report.assignedOfficer = officerName;
//         }
        
//         report.statusHistory.push({
//             status: `${recordType} Filed`,
//             remark: `Official ${recordType} generated: ${recordNumber}`,
//             updatedBy: officerName,
//             timestamp: new Date()
//         });

//         await report.save();
//         res.status(200).json({ message: `${recordType} Filed Successfully`, recordNumber });

//     } catch (error) {
//         console.error("File Record Error:", error);
//         res.status(500).json({ message: `Server Error: ${error.message}` });
//     }
// };

// // ==========================================
// // 3. SOS TRIGGER
// // ==========================================
// const triggerSOS = async (req, res) => {
//     try {
//         const { station, description, severity, lat, lng, contact, name } = req.body;
//         const report = await CrimeReport.create({
//             user: req.user ? req.user._id : null,
//             reporterName: name || "Unknown Citizen",
//             victimContact: contact || "N/A",
//             victimName: name || "N/A",
//             victimAddress: "Current GPS Location",
//             selectedStation: station,
//             crimeType: "SOS EMERGENCY", 
//             description: description || "Immediate Assistance Required!",
//             severity: severity || "Critical",
//             dateOfIncident: new Date().toISOString(),
//             location: { lat, lng },
//             isSOS: true,
//             status: "SOS Triggered",
//             statusHistory: [{
//                 status: 'SOS Triggered',
//                 remark: `Emergency Alert sent with Severity: ${severity}`,
//                 updatedBy: 'System',
//                 timestamp: new Date()
//             }]
//         });
//         res.status(201).json(report);
//     } catch (error) {
//         console.error("SOS Error:", error);
//         res.status(500).json({ message: "SOS Failed" });
//     }
// };

// // ==========================================
// // 4. FETCH REPORTS (Dashboard Feed)
// // ==========================================
// const getAllReports = async (req, res) => {
//   try {
//     const userRole = req.user.role;
//     let query = {};
//     if (userRole === 'police' || userRole === 'senior') {
//         if (userRole === 'senior' || req.user.designation === 'DGP') { query = {}; } 
//         else { query = { selectedStation: req.user.station }; }
//     } else { return res.status(401).json({ message: "Unauthorized" }); }
    
//     // ✅ Populated user details
//     const reports = await CrimeReport.find(query)
//       .populate('user', 'firstName lastName title mobile gender aadhar idPhoto')
//       .sort({ createdAt: -1 });
      
//     res.json(reports);
//   } catch (error) { res.status(500).json({ message: 'Error fetching reports' }); }
// };

// // ==========================================
// // 5. UPDATE STATUS / ASSIGN
// // ==========================================
// const updateReportStatus = async (req, res) => {
//   try {
//       const report = await CrimeReport.findById(req.params.id);
//       if (!report) return res.status(404).json({ message: 'Not Found' });
//       const isSenior = req.user.role === 'senior';
//       const isHighRank = req.user.designation === 'DGP' || req.user.designation === 'SP';
//       const isSameStation = req.user.station === report.selectedStation;
//       if (!isSenior && !isHighRank && !isSameStation) { return res.status(403).json({ message: "Jurisdiction Error" }); }
//       const updaterName = `${req.user.designation} ${req.user.firstName} ${req.user.lastName}`;
//       const { status, remark, importantNoteText, assignedOfficer, action } = req.body;
//       if (importantNoteText !== undefined) {
//           report.importantNote = { text: importantNoteText, author: updaterName, updatedAt: new Date() };
//           await report.save();
//           return res.json(report);
//       }
//       if (assignedOfficer) {
//           report.assignedOfficer = assignedOfficer;
//           report.status = "Officer Assigned";
//           report.statusHistory.push({ status: "Officer Assigned", remark: `Assigned to ${assignedOfficer}`, updatedBy: updaterName, timestamp: new Date() });
//       } else if (action === "assign_self") {
//           report.assignedOfficer = updaterName;
//           report.status = "Officer Assigned";
//           report.statusHistory.push({ status: "Officer Assigned", remark: "Officer took charge", updatedBy: updaterName, timestamp: new Date() });
//       } else {
//           if(status) report.status = status;
//           if(remark) {
//               report.statusHistory.push({ status: status || report.status, remark: remark, updatedBy: updaterName, timestamp: new Date() });
//           }
//       }
//       await report.save();
//       res.json(report);
//   } catch (error) { res.status(500).json({ message: 'Update failed' }); }
// };

// // ==========================================
// // 6. HISTORY & TRACKING
// // ==========================================
// const getPastCrimes = async (req, res) => {
//   try {
//     const { role, station } = req.user;
//     let query = {};
//     if (role === 'senior') { query = {}; } else { query = { selectedStation: station }; }
//     const records = await CrimeReport.find(query).sort({ dateOfIncident: -1 });
//     res.json(records);
//   } catch (error) { res.status(500).json({ message: "Server Error" }); }
// };

// // 7. MY REPORTS
// const getMyReports = async (req, res) => {
//     try {
//         const reports = await CrimeReport.find({ user: req.user._id }).sort({ createdAt: -1 });
//         res.json(reports);
//     } catch (error) { res.status(500).json({ message: "Error fetching data" }); }
// };

// // 8. ✅ GET BY ID (UPDATED)
// const getReportById = async (req, res) => {
//     try {
//         const report = await CrimeReport.findById(req.params.id)
//             .populate('user', 'firstName lastName title mobile gender aadhar idPhoto'); 
            
//         if(!report) return res.status(404).json({ message: "Invalid ID" });
//         res.json(report);
//     } catch (error) { res.status(500).json({ message: "Server Error" }); }
// };

// // 9. STATS
// const getStats = async (req, res) => { 
//     const totalComplaints = await CrimeReport.countDocuments();
//     const resolvedCases = await CrimeReport.countDocuments({ status: 'Closed' });
//     res.json({ totalComplaints, resolvedCases, activeOfficers: 15 });
// };

// const fileFIR = async (req, res) => { res.status(200).json({ message: "Use fileOfficialRecord" }); };

// module.exports = { 
//     createReport, 
//     getAllReports, 
//     getPastCrimes, 
//     getMyReports, 
//     getReportById,        
//     updateReportStatus, 
//     fileOfficialRecord, 
//     triggerSOS, 
//     fileFIR, 
//     getStats 
// };


















//Changes Started For Email


// const CrimeReport = require('../models/CrimeReport');
// // ✅ IMPORT EMAIL SERVICE (Brevo Based)
// const { sendComplaintConfirmation, sendStatusUpdateEmail } = require('../utils/emailService');

// // --- HELPER: Parse Nested FormData Keys ---
// const structureFormData = (body) => {
//     const result = {};
//     for (const key in body) {
//         if (key.includes('[')) {
//             const [parent, childWithBracket] = key.split('[');
//             const child = childWithBracket.slice(0, -1); // remove ']'
            
//             if (!result[parent]) result[parent] = {};
//             result[parent][child] = body[key];
//         } else {
//             result[key] = body[key];
//         }
//     }
//     return result;
// };

// // ==========================================
// // 1. CREATE REPORT (Citizen)
// // ==========================================
// const createReport = async (req, res) => {
//   try {
//     const { 
//         crimeType, description, dateOfIncident, 
//         isAnonymous, reporterName, selectedStation,
//         victimTitle, victimName, victimAge, victimGender, victimContact, victimAadhar, victimAddress,
//         incidentLocationAddress,
//         suspectTitle, suspectName, suspectAge, suspectContact, suspectAddress, suspectGender, suspectAadhar,
//         userId
//     } = req.body;

//     // --- ✅ VALIDATIONS ---
//     const mobileRegex = /^\d{10}$/;
//     const aadharRegex = /^\d{12}$/;

//     if (victimContact && !mobileRegex.test(victimContact)) {
//         return res.status(400).json({ message: "Victim Contact must be exactly 10 digits (numbers only)." });
//     }
//     if (victimAadhar && !aadharRegex.test(victimAadhar)) {
//         return res.status(400).json({ message: "Victim Aadhaar must be exactly 12 digits (numbers only)." });
//     }
//     if (suspectContact && suspectContact !== "N/A" && !mobileRegex.test(suspectContact)) {
//         return res.status(400).json({ message: "Suspect Contact must be exactly 10 digits (numbers only)." });
//     }
//     if (suspectAadhar && suspectAadhar !== "N/A" && !aadharRegex.test(suspectAadhar)) {
//         return res.status(400).json({ message: "Suspect Aadhaar must be exactly 12 digits (numbers only)." });
//     }

//     // --- ✅ FILE HANDLING ---
//     let victimIdUrl = null;
//     let suspectIdUrl = null;
//     let evidenceUrls = [];
//     let incidentProofUrls = [];

//     if (req.files) {
//         if (req.files.victimIdPhoto?.length > 0) victimIdUrl = req.files.victimIdPhoto[0].path;
//         if (req.files.suspectIdPhoto?.length > 0) suspectIdUrl = req.files.suspectIdPhoto[0].path;
//         if (req.files.evidence?.length > 0) evidenceUrls = req.files.evidence.map(f => f.path);
//         if (req.files.incidentProof?.length > 0) incidentProofUrls = req.files.incidentProof.map(f => f.path);
//     }

//     const finalUserId = req.user ? req.user._id : (userId || null);

//     const report = await CrimeReport.create({
//       user: finalUserId,
//       reporterName: isAnonymous === 'true' ? "Anonymous" : reporterName,
//       victimTitle, victimName, victimAge, victimGender, victimContact, victimAadhar, victimAddress, victimIdPhoto: victimIdUrl,
//       selectedStation, crimeType, description, dateOfIncident, incidentLocationAddress,
//       suspectTitle: suspectTitle || "", suspectName: suspectName || "Unknown", suspectAge: suspectAge || "",
//       suspectContact: suspectContact || "N/A", suspectAddress: suspectAddress || "N/A",
//       suspectGender: suspectGender || "Unknown", suspectAadhar: suspectAadhar || "", suspectIdPhoto: suspectIdUrl,
//       isAnonymous: isAnonymous === 'true', status: 'Complaint Received',
//       evidence: evidenceUrls, incidentProof: incidentProofUrls, 
//       statusHistory: [{ status: 'Complaint Received', remark: 'Complaint filed by citizen.', updatedBy: 'System', timestamp: new Date() }]
//     });

//     // ✅ NEW: SEND EMAIL CONFIRMATION
//     if (req.user && req.user.email) {
//         const userName = `${req.user.firstName} ${req.user.lastName}`;
//         sendComplaintConfirmation(req.user.email, userName, report._id).catch(e => console.error("Email fail", e.message));
//     }

//     res.status(201).json(report);
//   } catch (error) { 
//       console.error("Create Error:", error);
//       res.status(500).json({ message: "Server Error: Failed to save report." }); 
//   }
// };

// // ==========================================
// // 2. FILE OFFICIAL RECORD (FIR / NCR)
// // ==========================================
// const fileOfficialRecord = async (req, res) => {
//     try {
//         const rawBody = req.body;
//         const structured = structureFormData(rawBody);
//         const { complaintId, recordType, acts, existingEvidence } = structured;

//         const mappedData = {
//             ...structured, 
//             complainantName: structured.complainant?.fullName,
//             complainantGuardianName: structured.complainant?.guardianName,
//             complainantAge: structured.complainant?.age,
//             complainantGender: structured.complainant?.gender,
//             complainantMobile: structured.complainant?.mobile,
//             complainantEmail: structured.complainant?.email,
//             complainantAddress: structured.complainant?.address,
//             idProofType: structured.complainant?.idProofType,
//             idProofNumber: structured.complainant?.idProofNumber,
//             victimName: structured.victim?.fullName,
//             victimAge: structured.victim?.age,
//             victimGender: structured.victim?.gender,
//             victimMobile: structured.victim?.mobile,
//             victimAddress: structured.victim?.address,
//             victimAadhar: structured.victim?.idProofNumber, 
//             accusedName: structured.accused?.fullName,
//             accusedGender: structured.accused?.gender,
//             accusedMobile: structured.accused?.mobile,
//             accusedAddress: structured.accused?.address,
//             accusedAadhar: structured.accused?.idProofNumber,
//             relationWithAccused: structured.accused?.relation
//         };

//         if (!mappedData.occurrenceDate || !mappedData.occurrenceTime) {
//             return res.status(400).json({ message: "Occurrence Date & Time are MANDATORY." });
//         }
        
//         const targetId = complaintId || structured.onlineComplaintId;
//         const report = await CrimeReport.findById(targetId);
//         if (!report) return res.status(404).json({ message: 'Linked Complaint ID not found' });

//         let finalEvidence = [];
//         if (existingEvidence) {
//             try {
//                 const parsedExisting = JSON.parse(existingEvidence);
//                 if (Array.isArray(parsedExisting)) finalEvidence = [...parsedExisting];
//             } catch (e) { console.error("Error parsing existingEvidence", e); }
//         }
//         if (req.files && req.files.length > 0) {
//             const newPaths = req.files.map(file => file.path);
//             finalEvidence = [...finalEvidence, ...newPaths];
//         }

//         const currentYear = new Date().getFullYear();
//         const uniqueId = Math.floor(1000 + Math.random() * 9000); 
//         const stationCode = report.selectedStation ? report.selectedStation.substring(0, 3).toUpperCase() : "GEN";
//         const recordNumber = `${recordType}/${stationCode}/${currentYear}/${uniqueId}`;

//         let parsedActs = [];
//         try { parsedActs = typeof acts === 'string' ? JSON.parse(acts) : acts; } catch (e) { parsedActs = []; }

//         const officerName = `${req.user.designation} ${req.user.firstName} ${req.user.lastName}`;

//         report.officialRecord = {
//             ...mappedData, recordType, recordNumber, recordDate: new Date(), acts: parsedActs,
//             policeEvidence: finalEvidence, investigatingOfficer: officerName, rank: req.user.designation
//         };

//         report.status = `${recordType} Filed`; 
//         if (!report.assignedOfficer || report.assignedOfficer === 'Not Assigned') report.assignedOfficer = officerName;
        
//         report.statusHistory.push({
//             status: `${recordType} Filed`, remark: `Official ${recordType} generated: ${recordNumber}`,
//             updatedBy: officerName, timestamp: new Date()
//         });

//         await report.save();

//         // ✅ UPDATED EMAIL LOGIC FOR FULL DATA (TABLE FORMAT)
//         try {
//             const populatedReport = await CrimeReport.findById(report._id).populate('user');
//             if (populatedReport.user && populatedReport.user.email) {
                
//                 // Description for Email
//                 const officerDesc = `Official ${recordType} has been legally filed against Record Number ${recordNumber}. Investigation initiated by ${officerName}.`;
                
//                 // Pass the ENTIRE populated report object + Description
//                 await sendStatusUpdateEmail(populatedReport.user.email, populatedReport, `${recordType} Filed`, officerDesc);
//             }
//         } catch (emailError) {
//             console.error("Failed to send FIR email:", emailError.message);
//         }

//         res.status(200).json({ message: `${recordType} Filed Successfully`, recordNumber });

//     } catch (error) {
//         console.error("File Record Error:", error);
//         res.status(500).json({ message: `Server Error: ${error.message}` });
//     }
// };

// // ==========================================
// // 3. SOS TRIGGER
// // ==========================================
// const triggerSOS = async (req, res) => {
//     try {
//         const { station, description, severity, lat, lng, contact, name } = req.body;
//         const report = await CrimeReport.create({
//             user: req.user ? req.user._id : null,
//             reporterName: name || "Unknown Citizen",
//             victimContact: contact || "N/A", victimName: name || "N/A", victimAddress: "Current GPS Location",
//             selectedStation: station, crimeType: "SOS EMERGENCY", 
//             description: description || "Immediate Assistance Required!", severity: severity || "Critical",
//             dateOfIncident: new Date().toISOString(), location: { lat, lng }, isSOS: true, status: "SOS Triggered",
//             statusHistory: [{ status: 'SOS Triggered', remark: `Emergency Alert sent with Severity: ${severity}`, updatedBy: 'System', timestamp: new Date() }]
//         });
//         res.status(201).json(report);
//     } catch (error) {
//         console.error("SOS Error:", error);
//         res.status(500).json({ message: "SOS Failed" });
//     }
// };

// // ==========================================
// // 4. FETCH REPORTS
// // ==========================================
// const getAllReports = async (req, res) => {
//   try {
//     const userRole = req.user.role;
//     let query = {};
//     if (userRole === 'police' || userRole === 'senior') {
//         if (userRole === 'senior' || req.user.designation === 'DGP') { query = {}; } 
//         else { query = { selectedStation: req.user.station }; }
//     } else { return res.status(401).json({ message: "Unauthorized" }); }
    
//     const reports = await CrimeReport.find(query).populate('user', 'firstName lastName title mobile gender aadhar idPhoto').sort({ createdAt: -1 });
//     res.json(reports);
//   } catch (error) { res.status(500).json({ message: 'Error fetching reports' }); }
// };

// // ==========================================
// // 5. UPDATE STATUS / ASSIGN
// // ==========================================
// const updateReportStatus = async (req, res) => {
//   try {
//       const report = await CrimeReport.findById(req.params.id);
//       if (!report) return res.status(404).json({ message: 'Not Found' });
//       const isSenior = req.user.role === 'senior';
//       const isHighRank = req.user.designation === 'DGP' || req.user.designation === 'SP';
//       const isSameStation = req.user.station === report.selectedStation;
//       if (!isSenior && !isHighRank && !isSameStation) { return res.status(403).json({ message: "Jurisdiction Error" }); }
      
//       const updaterName = `${req.user.designation} ${req.user.firstName} ${req.user.lastName}`;
//       const { status, remark, importantNoteText, assignedOfficer, action } = req.body;
      
//       if (importantNoteText !== undefined) {
//           report.importantNote = { text: importantNoteText, author: updaterName, updatedAt: new Date() };
//           await report.save();
//           return res.json(report);
//       }

//       let statusMsg = report.status;
//       let descMsg = "";

//       if (assignedOfficer) {
//           report.assignedOfficer = assignedOfficer;
//           report.status = "Officer Assigned";
//           statusMsg = "Officer Assigned";
//           descMsg = `Case assigned to ${assignedOfficer}`;
//           report.statusHistory.push({ status: "Officer Assigned", remark: descMsg, updatedBy: updaterName, timestamp: new Date() });
//       } else if (action === "assign_self") {
//           report.assignedOfficer = updaterName;
//           report.status = "Officer Assigned";
//           statusMsg = "Officer Assigned";
//           descMsg = "Officer took charge";
//           report.statusHistory.push({ status: "Officer Assigned", remark: descMsg, updatedBy: updaterName, timestamp: new Date() });
//       } else {
//           if(status) { report.status = status; statusMsg = status; }
//           // Capture the officer's remark specifically
//           if(remark) { 
//               descMsg = remark; 
//               report.statusHistory.push({ status: status || report.status, remark: remark, updatedBy: updaterName, timestamp: new Date() }); 
//           }
//       }
      
//       await report.save();

//       // ✅ UPDATED EMAIL LOGIC FOR STATUS + DESCRIPTION (TABLE FORMAT)
//       try {
//           const populatedReport = await CrimeReport.findById(report._id).populate('user');
//           if (populatedReport.user && populatedReport.user.email) {
              
//               // Use the Officer's specific remark, or a default string if empty
//               const officerRemarkForMail = descMsg || `Case status has been updated to ${statusMsg}. Please check dashboard for details.`;

//               // Pass FULL report and the specific Remark
//               await sendStatusUpdateEmail(populatedReport.user.email, populatedReport, statusMsg, officerRemarkForMail);
//           }
//       } catch (emailError) {
//           console.error("Failed to send status email:", emailError.message);
//       }

//       res.json(report);
//   } catch (error) { res.status(500).json({ message: 'Update failed' }); }
// };

// // ==========================================
// // 6. HISTORY & TRACKING
// // ==========================================
// const getPastCrimes = async (req, res) => {
//   try {
//     const { role, station } = req.user;
//     let query = {};
//     if (role === 'senior') { query = {}; } else { query = { selectedStation: station }; }
//     const records = await CrimeReport.find(query).sort({ dateOfIncident: -1 });
//     res.json(records);
//   } catch (error) { res.status(500).json({ message: "Server Error" }); }
// };

// const getMyReports = async (req, res) => {
//     try {
//         const reports = await CrimeReport.find({ user: req.user._id }).sort({ createdAt: -1 });
//         res.json(reports);
//     } catch (error) { res.status(500).json({ message: "Error fetching data" }); }
// };

// const getReportById = async (req, res) => {
//     try {
//         const report = await CrimeReport.findById(req.params.id).populate('user', 'firstName lastName title mobile gender aadhar idPhoto'); 
//         if(!report) return res.status(404).json({ message: "Invalid ID" });
//         res.json(report);
//     } catch (error) { res.status(500).json({ message: "Server Error" }); }
// };

// const getStats = async (req, res) => { 
//     const totalComplaints = await CrimeReport.countDocuments();
//     const resolvedCases = await CrimeReport.countDocuments({ status: 'Closed' });
//     res.json({ totalComplaints, resolvedCases, activeOfficers: 15 });
// };

// const fileFIR = async (req, res) => { res.status(200).json({ message: "Use fileOfficialRecord" }); };

// module.exports = { 
//     createReport, getAllReports, getPastCrimes, getMyReports, getReportById,        
//     updateReportStatus, fileOfficialRecord, triggerSOS, fileFIR, getStats 
// };

















// const CrimeReport = require('../models/CrimeReport');
// // ✅ IMPORT EMAIL SERVICE (Brevo Based)
// const { sendComplaintConfirmation, sendStatusUpdateEmail } = require('../utils/emailService');

// // --- HELPER: Parse Nested FormData Keys ---
// const structureFormData = (body) => {
//     const result = {};
//     for (const key in body) {
//         if (key.includes('[')) {
//             const [parent, childWithBracket] = key.split('[');
//             const child = childWithBracket.slice(0, -1); // remove ']'
            
//             if (!result[parent]) result[parent] = {};
//             result[parent][child] = body[key];
//         } else {
//             result[key] = body[key];
//         }
//     }
//     return result;
// };

// // ==========================================
// // 1. CREATE REPORT (Citizen)
// // ==========================================
// const createReport = async (req, res) => {
//   try {
//     const { 
//         crimeType, description, dateOfIncident, 
//         isAnonymous, reporterName, selectedStation,
//         victimTitle, victimName, victimAge, victimGender, victimContact, victimAadhar, victimAddress,
//         incidentLocationAddress,
//         suspectTitle, suspectName, suspectAge, suspectContact, suspectAddress, suspectGender, suspectAadhar,
//         userId
//     } = req.body;

//     // --- ✅ VALIDATIONS ---
//     const mobileRegex = /^\d{10}$/;
//     const aadharRegex = /^\d{12}$/;

//     if (victimContact && !mobileRegex.test(victimContact)) {
//         return res.status(400).json({ message: "Victim Contact must be exactly 10 digits (numbers only)." });
//     }
//     if (victimAadhar && !aadharRegex.test(victimAadhar)) {
//         return res.status(400).json({ message: "Victim Aadhaar must be exactly 12 digits (numbers only)." });
//     }
//     if (suspectContact && suspectContact !== "N/A" && !mobileRegex.test(suspectContact)) {
//         return res.status(400).json({ message: "Suspect Contact must be exactly 10 digits (numbers only)." });
//     }
//     if (suspectAadhar && suspectAadhar !== "N/A" && !aadharRegex.test(suspectAadhar)) {
//         return res.status(400).json({ message: "Suspect Aadhaar must be exactly 12 digits (numbers only)." });
//     }

//     // --- ✅ FILE HANDLING ---
//     let victimIdUrl = null;
//     let suspectIdUrl = null;
//     let evidenceUrls = [];
//     let incidentProofUrls = [];

//     if (req.files) {
//         if (req.files.victimIdPhoto?.length > 0) victimIdUrl = req.files.victimIdPhoto[0].path;
//         if (req.files.suspectIdPhoto?.length > 0) suspectIdUrl = req.files.suspectIdPhoto[0].path;
//         if (req.files.evidence?.length > 0) evidenceUrls = req.files.evidence.map(f => f.path);
//         if (req.files.incidentProof?.length > 0) incidentProofUrls = req.files.incidentProof.map(f => f.path);
//     }

//     const finalUserId = req.user ? req.user._id : (userId || null);

//     const report = await CrimeReport.create({
//       user: finalUserId,
//       reporterName: isAnonymous === 'true' ? "Anonymous" : reporterName,
//       victimTitle, victimName, victimAge, victimGender, victimContact, victimAadhar, victimAddress, victimIdPhoto: victimIdUrl,
//       selectedStation, crimeType, description, dateOfIncident, incidentLocationAddress,
//       suspectTitle: suspectTitle || "", suspectName: suspectName || "Unknown", suspectAge: suspectAge || "",
//       suspectContact: suspectContact || "N/A", suspectAddress: suspectAddress || "N/A",
//       suspectGender: suspectGender || "Unknown", suspectAadhar: suspectAadhar || "", suspectIdPhoto: suspectIdUrl,
//       isAnonymous: isAnonymous === 'true', status: 'Complaint Received',
//       evidence: evidenceUrls, incidentProof: incidentProofUrls, 
//       statusHistory: [{ status: 'Complaint Received', remark: 'Complaint filed by citizen.', updatedBy: 'System', timestamp: new Date() }]
//     });

//     // ✅ NEW: SEND EMAIL CONFIRMATION
//     if (req.user && req.user.email) {
//         const userName = `${req.user.firstName} ${req.user.lastName}`;
//         sendComplaintConfirmation(req.user.email, userName, report._id).catch(e => console.error("Email fail", e.message));
//     }

//     res.status(201).json(report);
//   } catch (error) { 
//       console.error("Create Error:", error);
//       res.status(500).json({ message: "Server Error: Failed to save report." }); 
//   }
// };

// // ==========================================
// // 2. FILE OFFICIAL RECORD (FIR / NCR)
// // ==========================================
// const fileOfficialRecord = async (req, res) => {
//     try {
//         const rawBody = req.body;
//         const structured = structureFormData(rawBody);
//         const { complaintId, recordType, acts, existingEvidence } = structured;

//         const mappedData = {
//             ...structured, 
//             complainantName: structured.complainant?.fullName,
//             complainantGuardianName: structured.complainant?.guardianName,
//             complainantAge: structured.complainant?.age,
//             complainantGender: structured.complainant?.gender,
//             complainantMobile: structured.complainant?.mobile,
//             complainantEmail: structured.complainant?.email,
//             complainantAddress: structured.complainant?.address,
//             idProofType: structured.complainant?.idProofType,
//             idProofNumber: structured.complainant?.idProofNumber,
//             victimName: structured.victim?.fullName,
//             victimAge: structured.victim?.age,
//             victimGender: structured.victim?.gender,
//             victimMobile: structured.victim?.mobile,
//             victimAddress: structured.victim?.address,
//             victimAadhar: structured.victim?.idProofNumber, 
//             accusedName: structured.accused?.fullName,
//             accusedGender: structured.accused?.gender,
//             accusedMobile: structured.accused?.mobile,
//             accusedAddress: structured.accused?.address,
//             accusedAadhar: structured.accused?.idProofNumber,
//             relationWithAccused: structured.accused?.relation
//         };

//         if (!mappedData.occurrenceDate || !mappedData.occurrenceTime) {
//             return res.status(400).json({ message: "Occurrence Date & Time are MANDATORY." });
//         }
        
//         const targetId = complaintId || structured.onlineComplaintId;
//         const report = await CrimeReport.findById(targetId);
//         if (!report) return res.status(404).json({ message: 'Linked Complaint ID not found' });

//         let finalEvidence = [];
//         if (existingEvidence) {
//             try {
//                 const parsedExisting = JSON.parse(existingEvidence);
//                 if (Array.isArray(parsedExisting)) finalEvidence = [...parsedExisting];
//             } catch (e) { console.error("Error parsing existingEvidence", e); }
//         }
//         if (req.files && req.files.length > 0) {
//             const newPaths = req.files.map(file => file.path);
//             finalEvidence = [...finalEvidence, ...newPaths];
//         }

//         const currentYear = new Date().getFullYear();
//         const uniqueId = Math.floor(1000 + Math.random() * 9000); 
//         const stationCode = report.selectedStation ? report.selectedStation.substring(0, 3).toUpperCase() : "GEN";
//         const recordNumber = `${recordType}/${stationCode}/${currentYear}/${uniqueId}`;

//         let parsedActs = [];
//         try { parsedActs = typeof acts === 'string' ? JSON.parse(acts) : acts; } catch (e) { parsedActs = []; }

//         const officerName = `${req.user.designation} ${req.user.firstName} ${req.user.lastName}`;

//         report.officialRecord = {
//             ...mappedData, recordType, recordNumber, recordDate: new Date(), acts: parsedActs,
//             policeEvidence: finalEvidence, investigatingOfficer: officerName, rank: req.user.designation
//         };

//         report.status = `${recordType} Filed`; 
//         if (!report.assignedOfficer || report.assignedOfficer === 'Not Assigned') report.assignedOfficer = officerName;
        
//         report.statusHistory.push({
//             status: `${recordType} Filed`, remark: `Official ${recordType} generated: ${recordNumber}`,
//             updatedBy: officerName, timestamp: new Date()
//         });

//         await report.save();

//         // ✅ UPDATED EMAIL LOGIC FOR FULL DATA (TABLE FORMAT)
//         try {
//             const populatedReport = await CrimeReport.findById(report._id).populate('user');
//             if (populatedReport.user && populatedReport.user.email) {
                
//                 // Description for Email
//                 const officerDesc = `Official ${recordType} has been legally filed against Record Number ${recordNumber}. Investigation initiated by ${officerName}.`;
                
//                 // Pass the ENTIRE populated report object + Description
//                 await sendStatusUpdateEmail(populatedReport.user.email, populatedReport, `${recordType} Filed`, officerDesc);
//             }
//         } catch (emailError) {
//             console.error("Failed to send FIR email:", emailError.message);
//         }

//         res.status(200).json({ message: `${recordType} Filed Successfully`, recordNumber });

//     } catch (error) {
//         console.error("File Record Error:", error);
//         res.status(500).json({ message: `Server Error: ${error.message}` });
//     }
// };

// // ==========================================
// // 3. SOS TRIGGER (UPDATED WITH BACKEND SOCKET EMIT)
// // ==========================================
// const triggerSOS = async (req, res) => {
//     try {
//         const { station, description, severity, lat, lng, contact, name } = req.body;
        
//         const report = await CrimeReport.create({
//             user: req.user ? req.user._id : null,
//             reporterName: name || "Unknown Citizen",
//             victimContact: contact || "N/A", victimName: name || "N/A", victimAddress: "Current GPS Location",
//             selectedStation: station, crimeType: "SOS EMERGENCY", 
//             description: description || "Immediate Assistance Required!", severity: severity || "Critical",
//             dateOfIncident: new Date().toISOString(), location: { lat, lng }, isSOS: true, status: "SOS Triggered",
//             statusHistory: [{ status: 'SOS Triggered', remark: `Emergency Alert sent with Severity: ${severity}`, updatedBy: 'System', timestamp: new Date() }]
//         });

//         // ✅ FIX: TRIGGER SOCKET EVENT DIRECTLY FROM CONTROLLER
//         // This ensures Police Dashboard gets alert even if Frontend socket fails
//         const io = req.app.get('io');
//         if (io) {
//             console.log("🚀 Backend Emitting SOS Alert for:", station);
//             io.emit('new_crime_report', { ...report.toObject(), isSOS: true });
//         } else {
//             console.warn("⚠️ Socket.io instance not found. Make sure app.set('io', io) is in server.js");
//         }

//         res.status(201).json(report);
//     } catch (error) {
//         console.error("SOS Error:", error);
//         res.status(500).json({ message: "SOS Failed" });
//     }
// };

// // ==========================================
// // 4. FETCH REPORTS
// // ==========================================
// const getAllReports = async (req, res) => {
//   try {
//     const userRole = req.user.role;
//     let query = {};
//     if (userRole === 'police' || userRole === 'senior') {
//         if (userRole === 'senior' || req.user.designation === 'DGP') { query = {}; } 
//         else { query = { selectedStation: req.user.station }; }
//     } else { return res.status(401).json({ message: "Unauthorized" }); }
    
//     const reports = await CrimeReport.find(query).populate('user', 'firstName lastName title mobile gender aadhar idPhoto').sort({ createdAt: -1 });
//     res.json(reports);
//   } catch (error) { res.status(500).json({ message: 'Error fetching reports' }); }
// };

// // ==========================================
// // 5. UPDATE STATUS / ASSIGN
// // ==========================================
// const updateReportStatus = async (req, res) => {
//   try {
//       const report = await CrimeReport.findById(req.params.id);
//       if (!report) return res.status(404).json({ message: 'Not Found' });
//       const isSenior = req.user.role === 'senior';
//       const isHighRank = req.user.designation === 'DGP' || req.user.designation === 'SP';
//       const isSameStation = req.user.station === report.selectedStation;
//       if (!isSenior && !isHighRank && !isSameStation) { return res.status(403).json({ message: "Jurisdiction Error" }); }
      
//       const updaterName = `${req.user.designation} ${req.user.firstName} ${req.user.lastName}`;
//       const { status, remark, importantNoteText, assignedOfficer, action } = req.body;
      
//       if (importantNoteText !== undefined) {
//           report.importantNote = { text: importantNoteText, author: updaterName, updatedAt: new Date() };
//           await report.save();
//           return res.json(report);
//       }

//       let statusMsg = report.status;
//       let descMsg = "";

//       if (assignedOfficer) {
//           report.assignedOfficer = assignedOfficer;
//           report.status = "Officer Assigned";
//           statusMsg = "Officer Assigned";
//           descMsg = `Case assigned to ${assignedOfficer}`;
//           report.statusHistory.push({ status: "Officer Assigned", remark: descMsg, updatedBy: updaterName, timestamp: new Date() });
//       } else if (action === "assign_self") {
//           report.assignedOfficer = updaterName;
//           report.status = "Officer Assigned";
//           statusMsg = "Officer Assigned";
//           descMsg = "Officer took charge";
//           report.statusHistory.push({ status: "Officer Assigned", remark: descMsg, updatedBy: updaterName, timestamp: new Date() });
//       } else {
//           if(status) { report.status = status; statusMsg = status; }
//           // Capture the officer's remark specifically
//           if(remark) { 
//               descMsg = remark; 
//               report.statusHistory.push({ status: status || report.status, remark: remark, updatedBy: updaterName, timestamp: new Date() }); 
//           }
//       }
      
//       await report.save();

//       // ✅ UPDATED EMAIL LOGIC FOR STATUS + DESCRIPTION (TABLE FORMAT)
//       try {
//           const populatedReport = await CrimeReport.findById(report._id).populate('user');
//           if (populatedReport.user && populatedReport.user.email) {
              
//               // Use the Officer's specific remark, or a default string if empty
//               const officerRemarkForMail = descMsg || `Case status has been updated to ${statusMsg}. Please check dashboard for details.`;

//               // Pass FULL report and the specific Remark
//               await sendStatusUpdateEmail(populatedReport.user.email, populatedReport, statusMsg, officerRemarkForMail);
//           }
//       } catch (emailError) {
//           console.error("Failed to send status email:", emailError.message);
//       }

//       res.json(report);
//   } catch (error) { res.status(500).json({ message: 'Update failed' }); }
// };

// // ==========================================
// // 6. HISTORY & TRACKING
// // ==========================================
// const getPastCrimes = async (req, res) => {
//   try {
//     const { role, station } = req.user;
//     let query = {};
//     if (role === 'senior') { query = {}; } else { query = { selectedStation: station }; }
//     const records = await CrimeReport.find(query).sort({ dateOfIncident: -1 });
//     res.json(records);
//   } catch (error) { res.status(500).json({ message: "Server Error" }); }
// };

// const getMyReports = async (req, res) => {
//     try {
//         const reports = await CrimeReport.find({ user: req.user._id }).sort({ createdAt: -1 });
//         res.json(reports);
//     } catch (error) { res.status(500).json({ message: "Error fetching data" }); }
// };

// const getReportById = async (req, res) => {
//     try {
//         const report = await CrimeReport.findById(req.params.id).populate('user', 'firstName lastName title mobile gender aadhar idPhoto'); 
//         if(!report) return res.status(404).json({ message: "Invalid ID" });
//         res.json(report);
//     } catch (error) { res.status(500).json({ message: "Server Error" }); }
// };

// const getStats = async (req, res) => { 
//     const totalComplaints = await CrimeReport.countDocuments();
//     const resolvedCases = await CrimeReport.countDocuments({ status: 'Closed' });
//     res.json({ totalComplaints, resolvedCases, activeOfficers: 15 });
// };

// const fileFIR = async (req, res) => { res.status(200).json({ message: "Use fileOfficialRecord" }); };

// module.exports = { 
//     createReport, getAllReports, getPastCrimes, getMyReports, getReportById,        
//     updateReportStatus, fileOfficialRecord, triggerSOS, fileFIR, getStats 
// };











// const CrimeReport = require('../models/CrimeReport');
// const { sendComplaintConfirmation, sendStatusUpdateEmail } = require('../utils/emailService');

// // --- HELPER: Parse Nested FormData Keys ---
// const structureFormData = (body) => {
//     const result = {};
//     for (const key in body) {
//         if (key.includes('[')) {
//             const [parent, childWithBracket] = key.split('[');
//             const child = childWithBracket.slice(0, -1); 
//             if (!result[parent]) result[parent] = {};
//             result[parent][child] = body[key];
//         } else {
//             result[key] = body[key];
//         }
//     }
//     return result;
// };

// // ... [Existing createReport, fileOfficialRecord, triggerSOS, etc. remain UNCHANGED] ...
// // (I am hiding the middle functions to save space, they remain exactly as they were)

// const createReport = async (req, res) => { /* ... existing code ... */ };
// const fileOfficialRecord = async (req, res) => { /* ... existing code ... */ };

// // ✅ UPDATED SOS TRIGGER (Ensures Socket Emit)
// const triggerSOS = async (req, res) => {
//     try {
//         const { station, description, severity, lat, lng, contact, name } = req.body;
//         const report = await CrimeReport.create({
//             user: req.user ? req.user._id : null,
//             reporterName: name || "Unknown Citizen",
//             victimContact: contact || "N/A", victimName: name || "N/A", victimAddress: "Current GPS Location",
//             selectedStation: station, crimeType: "SOS EMERGENCY", 
//             description: description || "Immediate Assistance Required!", severity: severity || "Critical",
//             dateOfIncident: new Date().toISOString(), location: { lat, lng }, isSOS: true, status: "SOS Triggered",
//             statusHistory: [{ status: 'SOS Triggered', remark: `Emergency Alert sent with Severity: ${severity}`, updatedBy: 'System', timestamp: new Date() }]
//         });

//         const io = req.app.get('io');
//         if (io) {
//             console.log("🚀 Backend Emitting SOS Alert for:", station);
//             io.emit('new_crime_report', { ...report.toObject(), isSOS: true });
//         }

//         res.status(201).json(report);
//     } catch (error) {
//         console.error("SOS Error:", error);
//         res.status(500).json({ message: "SOS Failed" });
//     }
// };

// const getAllReports = async (req, res) => { /* ... existing code ... */ };
// const updateReportStatus = async (req, res) => { /* ... existing code ... */ };
// const getPastCrimes = async (req, res) => { /* ... existing code ... */ };
// const getMyReports = async (req, res) => { /* ... existing code ... */ };
// const getReportById = async (req, res) => { /* ... existing code ... */ };
// const getStats = async (req, res) => { /* ... existing code ... */ };
// const fileFIR = async (req, res) => { res.status(200).json({ message: "Use fileOfficialRecord" }); };

// // ==========================================
// // ✅ 7. LIVE LOCATION UPDATE (New Function)
// // ==========================================
// const updateLiveLocation = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { lat, lng } = req.body;

//         if (!lat || !lng) return res.status(400).json({ message: "Coordinates missing" });

//         await CrimeReport.findByIdAndUpdate(id, {
//             location: { lat, lng },
//             updatedAt: new Date() 
//         });

//         res.status(200).json({ message: "Location Updated" });
//     } catch (error) {
//         console.error("Loc Update Error:", error);
//         res.status(500).json({ message: "Update Failed" });
//     }
// };

// module.exports = { 
//     createReport, getAllReports, getPastCrimes, getMyReports, getReportById,        
//     updateReportStatus, fileOfficialRecord, triggerSOS, fileFIR, getStats,
//     updateLiveLocation // ✅ Exported
// };




















const CrimeReport = require('../models/CrimeReport');
// ✅ IMPORT EMAIL SERVICE (Brevo Based)
const { sendComplaintConfirmation, sendStatusUpdateEmail } = require('../utils/emailService');

// --- HELPER: Parse Nested FormData Keys ---
const structureFormData = (body) => {
    const result = {};
    for (const key in body) {
        if (key.includes('[')) {
            const [parent, childWithBracket] = key.split('[');
            const child = childWithBracket.slice(0, -1); // remove ']'
            
            if (!result[parent]) result[parent] = {};
            result[parent][child] = body[key];
        } else {
            result[key] = body[key];
        }
    }
    return result;
};

// ==========================================
// 1. CREATE REPORT (Citizen)
// ==========================================
const createReport = async (req, res) => {
  try {
    const { 
        crimeType, description, dateOfIncident, 
        isAnonymous, reporterName, selectedStation,
        victimTitle, victimName, victimAge, victimGender, victimContact, victimAadhar, victimAddress,
        incidentLocationAddress,
        suspectTitle, suspectName, suspectAge, suspectContact, suspectAddress, suspectGender, suspectAadhar,
        userId
    } = req.body;

    // --- ✅ VALIDATIONS ---
    const mobileRegex = /^\d{10}$/;
    const aadharRegex = /^\d{12}$/;

    if (victimContact && !mobileRegex.test(victimContact)) {
        return res.status(400).json({ message: "Victim Contact must be exactly 10 digits (numbers only)." });
    }
    if (victimAadhar && !aadharRegex.test(victimAadhar)) {
        return res.status(400).json({ message: "Victim Aadhaar must be exactly 12 digits (numbers only)." });
    }
    if (suspectContact && suspectContact !== "N/A" && !mobileRegex.test(suspectContact)) {
        return res.status(400).json({ message: "Suspect Contact must be exactly 10 digits (numbers only)." });
    }
    if (suspectAadhar && suspectAadhar !== "N/A" && !aadharRegex.test(suspectAadhar)) {
        return res.status(400).json({ message: "Suspect Aadhaar must be exactly 12 digits (numbers only)." });
    }

    // --- ✅ FILE HANDLING ---
    let victimIdUrl = null;
    let suspectIdUrl = null;
    let evidenceUrls = [];
    let incidentProofUrls = [];

    if (req.files) {
        if (req.files.victimIdPhoto?.length > 0) victimIdUrl = req.files.victimIdPhoto[0].path;
        if (req.files.suspectIdPhoto?.length > 0) suspectIdUrl = req.files.suspectIdPhoto[0].path;
        if (req.files.evidence?.length > 0) evidenceUrls = req.files.evidence.map(f => f.path);
        if (req.files.incidentProof?.length > 0) incidentProofUrls = req.files.incidentProof.map(f => f.path);
    }

    const finalUserId = req.user ? req.user._id : (userId || null);

    const report = await CrimeReport.create({
      user: finalUserId,
      reporterName: isAnonymous === 'true' ? "Anonymous" : reporterName,
      victimTitle, victimName, victimAge, victimGender, victimContact, victimAadhar, victimAddress, victimIdPhoto: victimIdUrl,
      selectedStation, crimeType, description, dateOfIncident, incidentLocationAddress,
      suspectTitle: suspectTitle || "", suspectName: suspectName || "Unknown", suspectAge: suspectAge || "",
      suspectContact: suspectContact || "N/A", suspectAddress: suspectAddress || "N/A",
      suspectGender: suspectGender || "Unknown", suspectAadhar: suspectAadhar || "", suspectIdPhoto: suspectIdUrl,
      isAnonymous: isAnonymous === 'true', status: 'Complaint Received',
      evidence: evidenceUrls, incidentProof: incidentProofUrls, 
      statusHistory: [{ status: 'Complaint Received', remark: 'Complaint filed by citizen.', updatedBy: 'System', timestamp: new Date() }]
    });

    // ✅ NEW: SEND EMAIL CONFIRMATION
    if (req.user && req.user.email) {
        const userName = `${req.user.firstName} ${req.user.lastName}`;
        sendComplaintConfirmation(req.user.email, userName, report._id).catch(e => console.error("Email fail", e.message));
    }

    res.status(201).json(report);
  } catch (error) { 
      console.error("Create Error:", error);
      res.status(500).json({ message: "Server Error: Failed to save report." }); 
  }
};

// ==========================================
// 2. FILE OFFICIAL RECORD (FIR / NCR)
// ==========================================
const fileOfficialRecord = async (req, res) => {
    try {
        const rawBody = req.body;
        const structured = structureFormData(rawBody);
        const { complaintId, recordType, acts, existingEvidence } = structured;

        const mappedData = {
            ...structured, 
            complainantName: structured.complainant?.fullName,
            complainantGuardianName: structured.complainant?.guardianName,
            complainantAge: structured.complainant?.age,
            complainantGender: structured.complainant?.gender,
            complainantMobile: structured.complainant?.mobile,
            complainantEmail: structured.complainant?.email,
            complainantAddress: structured.complainant?.address,
            idProofType: structured.complainant?.idProofType,
            idProofNumber: structured.complainant?.idProofNumber,
            victimName: structured.victim?.fullName,
            victimAge: structured.victim?.age,
            victimGender: structured.victim?.gender,
            victimMobile: structured.victim?.mobile,
            victimAddress: structured.victim?.address,
            victimAadhar: structured.victim?.idProofNumber, 
            accusedName: structured.accused?.fullName,
            accusedGender: structured.accused?.gender,
            accusedMobile: structured.accused?.mobile,
            accusedAddress: structured.accused?.address,
            accusedAadhar: structured.accused?.idProofNumber,
            relationWithAccused: structured.accused?.relation
        };

        if (!mappedData.occurrenceDate || !mappedData.occurrenceTime) {
            return res.status(400).json({ message: "Occurrence Date & Time are MANDATORY." });
        }
        
        const targetId = complaintId || structured.onlineComplaintId;
        const report = await CrimeReport.findById(targetId);
        if (!report) return res.status(404).json({ message: 'Linked Complaint ID not found' });

        let finalEvidence = [];
        if (existingEvidence) {
            try {
                const parsedExisting = JSON.parse(existingEvidence);
                if (Array.isArray(parsedExisting)) finalEvidence = [...parsedExisting];
            } catch (e) { console.error("Error parsing existingEvidence", e); }
        }
        if (req.files && req.files.length > 0) {
            const newPaths = req.files.map(file => file.path);
            finalEvidence = [...finalEvidence, ...newPaths];
        }

        const currentYear = new Date().getFullYear();
        const uniqueId = Math.floor(1000 + Math.random() * 9000); 
        const stationCode = report.selectedStation ? report.selectedStation.substring(0, 3).toUpperCase() : "GEN";
        const recordNumber = `${recordType}/${stationCode}/${currentYear}/${uniqueId}`;

        let parsedActs = [];
        try { parsedActs = typeof acts === 'string' ? JSON.parse(acts) : acts; } catch (e) { parsedActs = []; }

        const officerName = `${req.user.designation} ${req.user.firstName} ${req.user.lastName}`;

        report.officialRecord = {
            ...mappedData, recordType, recordNumber, recordDate: new Date(), acts: parsedActs,
            policeEvidence: finalEvidence, investigatingOfficer: officerName, rank: req.user.designation
        };

        report.status = `${recordType} Filed`; 
        if (!report.assignedOfficer || report.assignedOfficer === 'Not Assigned') report.assignedOfficer = officerName;
        
        report.statusHistory.push({
            status: `${recordType} Filed`, remark: `Official ${recordType} generated: ${recordNumber}`,
            updatedBy: officerName, timestamp: new Date()
        });

        await report.save();

        // ✅ UPDATED EMAIL LOGIC
        try {
            const populatedReport = await CrimeReport.findById(report._id).populate('user');
            if (populatedReport.user && populatedReport.user.email) {
                const officerDesc = `Official ${recordType} has been legally filed against Record Number ${recordNumber}. Investigation initiated by ${officerName}.`;
                await sendStatusUpdateEmail(populatedReport.user.email, populatedReport, `${recordType} Filed`, officerDesc);
            }
        } catch (emailError) {
            console.error("Failed to send FIR email:", emailError.message);
        }

        res.status(200).json({ message: `${recordType} Filed Successfully`, recordNumber });

    } catch (error) {
        console.error("File Record Error:", error);
        res.status(500).json({ message: `Server Error: ${error.message}` });
    }
};

// ==========================================
// 3. SOS TRIGGER (UPDATED WITH BACKEND SOCKET EMIT)
// ==========================================
const triggerSOS = async (req, res) => {
    try {
        const { station, description, severity, lat, lng, contact, name } = req.body;
        
        const report = await CrimeReport.create({
            user: req.user ? req.user._id : null,
            reporterName: name || "Unknown Citizen",
            victimContact: contact || "N/A", victimName: name || "N/A", victimAddress: "Current GPS Location",
            selectedStation: station, crimeType: "SOS EMERGENCY", 
            description: description || "Immediate Assistance Required!", severity: severity || "Critical",
            dateOfIncident: new Date().toISOString(), location: { lat, lng }, isSOS: true, status: "SOS Triggered",
            statusHistory: [{ status: 'SOS Triggered', remark: `Emergency Alert sent with Severity: ${severity}`, updatedBy: 'System', timestamp: new Date() }]
        });

        // ✅ FIX: TRIGGER SOCKET EVENT DIRECTLY FROM CONTROLLER
        const io = req.app.get('io');
        if (io) {
            console.log("🚀 Backend Emitting SOS Alert for:", station);
            io.emit('new_crime_report', { ...report.toObject(), isSOS: true });
        } else {
            console.warn("⚠️ Socket.io instance not found. Make sure app.set('io', io) is in server.js");
        }

        res.status(201).json(report);
    } catch (error) {
        console.error("SOS Error:", error);
        res.status(500).json({ message: "SOS Failed" });
    }
};

// ==========================================
// 4. FETCH REPORTS
// ==========================================
const getAllReports = async (req, res) => {
  try {
    const userRole = req.user.role;
    let query = {};
    if (userRole === 'police' || userRole === 'senior') {
        if (userRole === 'senior' || req.user.designation === 'DGP') { query = {}; } 
        else { query = { selectedStation: req.user.station }; }
    } else { return res.status(401).json({ message: "Unauthorized" }); }
    
    const reports = await CrimeReport.find(query).populate('user', 'firstName lastName title mobile gender aadhar idPhoto').sort({ createdAt: -1 });
    res.json(reports);
  } catch (error) { res.status(500).json({ message: 'Error fetching reports' }); }
};

// ==========================================
// 5. UPDATE STATUS / ASSIGN
// ==========================================
const updateReportStatus = async (req, res) => {
  try {
      const report = await CrimeReport.findById(req.params.id);
      if (!report) return res.status(404).json({ message: 'Not Found' });
      const isSenior = req.user.role === 'senior';
      const isHighRank = req.user.designation === 'DGP' || req.user.designation === 'SP';
      const isSameStation = req.user.station === report.selectedStation;
      if (!isSenior && !isHighRank && !isSameStation) { return res.status(403).json({ message: "Jurisdiction Error" }); }
      
      const updaterName = `${req.user.designation} ${req.user.firstName} ${req.user.lastName}`;
      const { status, remark, importantNoteText, assignedOfficer, action } = req.body;
      
      if (importantNoteText !== undefined) {
          report.importantNote = { text: importantNoteText, author: updaterName, updatedAt: new Date() };
          await report.save();
          return res.json(report);
      }

      let statusMsg = report.status;
      let descMsg = "";

      if (assignedOfficer) {
          report.assignedOfficer = assignedOfficer;
          report.status = "Officer Assigned";
          statusMsg = "Officer Assigned";
          descMsg = `Case assigned to ${assignedOfficer}`;
          report.statusHistory.push({ status: "Officer Assigned", remark: descMsg, updatedBy: updaterName, timestamp: new Date() });
      } else if (action === "assign_self") {
          report.assignedOfficer = updaterName;
          report.status = "Officer Assigned";
          statusMsg = "Officer Assigned";
          descMsg = "Officer took charge";
          report.statusHistory.push({ status: "Officer Assigned", remark: descMsg, updatedBy: updaterName, timestamp: new Date() });
      } else {
          if(status) { report.status = status; statusMsg = status; }
          // Capture the officer's remark specifically
          if(remark) { 
              descMsg = remark; 
              report.statusHistory.push({ status: status || report.status, remark: remark, updatedBy: updaterName, timestamp: new Date() }); 
          }
      }
      
      await report.save();

      // ✅ UPDATED EMAIL LOGIC
      try {
          const populatedReport = await CrimeReport.findById(report._id).populate('user');
          if (populatedReport.user && populatedReport.user.email) {
              const officerRemarkForMail = descMsg || `Case status has been updated to ${statusMsg}. Please check dashboard for details.`;
              await sendStatusUpdateEmail(populatedReport.user.email, populatedReport, statusMsg, officerRemarkForMail);
          }
      } catch (emailError) {
          console.error("Failed to send status email:", emailError.message);
      }

      res.json(report);
  } catch (error) { res.status(500).json({ message: 'Update failed' }); }
};

// ==========================================
// 6. HISTORY & TRACKING
// ==========================================
const getPastCrimes = async (req, res) => {
  try {
    const { role, station } = req.user;
    let query = {};
    if (role === 'senior') { query = {}; } else { query = { selectedStation: station }; }
    const records = await CrimeReport.find(query).sort({ dateOfIncident: -1 });
    res.json(records);
  } catch (error) { res.status(500).json({ message: "Server Error" }); }
};

const getMyReports = async (req, res) => {
    try {
        const reports = await CrimeReport.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.json(reports);
    } catch (error) { res.status(500).json({ message: "Error fetching data" }); }
};

const getReportById = async (req, res) => {
    try {
        const report = await CrimeReport.findById(req.params.id).populate('user', 'firstName lastName title mobile gender aadhar idPhoto'); 
        if(!report) return res.status(404).json({ message: "Invalid ID" });
        res.json(report);
    } catch (error) { res.status(500).json({ message: "Server Error" }); }
};

const getStats = async (req, res) => { 
    const totalComplaints = await CrimeReport.countDocuments();
    const resolvedCases = await CrimeReport.countDocuments({ status: 'Closed' });
    res.json({ totalComplaints, resolvedCases, activeOfficers: 15 });
};

const fileFIR = async (req, res) => { res.status(200).json({ message: "Use fileOfficialRecord" }); };

// ==========================================
// ✅ 7. LIVE LOCATION UPDATE (New Function)
// ==========================================
const updateLiveLocation = async (req, res) => {
    try {
        const { id } = req.params;
        const { lat, lng } = req.body;

        if (!lat || !lng) return res.status(400).json({ message: "Coordinates missing" });

        const report = await CrimeReport.findByIdAndUpdate(id, {
            location: { lat, lng },
            updatedAt: new Date() 
        }, { new: true });

        // Optional: Emit socket event for live tracking update on dashboard
        const io = req.app.get('io');
        if (io && report) {
             io.emit('location_update', { reportId: id, lat, lng });
        }

        res.status(200).json({ message: "Location Updated" });
    } catch (error) {
        console.error("Loc Update Error:", error);
        res.status(500).json({ message: "Update Failed" });
    }
};

module.exports = { 
    createReport, getAllReports, getPastCrimes, getMyReports, getReportById,        
    updateReportStatus, fileOfficialRecord, triggerSOS, fileFIR, getStats,
    updateLiveLocation // ✅ Exported correctly
};