// const PCCApplication = require('../models/PCCApplication');
// const { uploadToCloudinary } = require('../utils/cloudinary'); // ✅ Linked your Cloudinary helper

// // ==========================================
// // 1. SUBMIT PCC APPLICATION (Citizen)
// // ==========================================
// const submitPCCApplication = async (req, res) => {
//     try {
//         const {
//             userId, fullName, fatherName, address, age, gender, mobile, purpose, selectedStation
//         } = req.body;

//         // ✅ Check if all files are present in req.files
//         if (!req.files || !req.files.applicantPhoto || !req.files.aadharFront || !req.files.aadharBack) {
//             return res.status(400).json({ message: "All 3 images (Photo, Aadhaar Front & Back) are required." });
//         }

//         // ✅ Upload each image buffer to Cloudinary using your helper
//         const photoResult = await uploadToCloudinary(req.files.applicantPhoto[0].buffer);
//         const aadharFrontResult = await uploadToCloudinary(req.files.aadharFront[0].buffer);
//         const aadharBackResult = await uploadToCloudinary(req.files.aadharBack[0].buffer);

//         const newApplication = await PCCApplication.create({
//             user: userId,
//             fullName,
//             fatherName,
//             address,
//             age,
//             gender,
//             mobile,
//             purpose,
//             selectedStation,
//             applicantPhoto: photoResult.secure_url, // ✅ Cloudinary URL
//             aadharFront: aadharFrontResult.secure_url, // ✅ Cloudinary URL
//             aadharBack: aadharBackResult.secure_url, // ✅ Cloudinary URL
//             status: 'Pending Verification'
//         });

//         res.status(201).json(newApplication);

//     } catch (error) {
//         console.error("PCC Submission Error:", error);
//         res.status(500).json({ message: "Server Error: Failed to upload images to Cloudinary." });
//     }
// };

// // ==========================================
// // 2. GET MY PCC APPLICATIONS (Citizen)
// // ==========================================
// const getMyPCCApplications = async (req, res) => {
//     try {
//         const applications = await PCCApplication.find({ user: req.user._id }).sort({ createdAt: -1 });
//         res.status(200).json(applications);
//     } catch (error) {
//         res.status(500).json({ message: "Failed to fetch applications." });
//     }
// };

// // ==========================================
// // 3. GET STATION PCC APPLICATIONS (Police)
// // ==========================================
// const getStationPCCApplications = async (req, res) => {
//     try {
//         const userRole = req.user.role;
//         let query = {};
        
//         // Police see only their station's applications. Seniors see all.
//         if (userRole === 'police') {
//              // Assuming the user's station is stored in req.user.station
//              query = { selectedStation: req.user.station };
//         }
        
//         const applications = await PCCApplication.find(query)
//             .populate('user', 'firstName lastName mobile')
//             .sort({ createdAt: -1 }); // Newest first
            
//         res.status(200).json(applications);
//     } catch (error) {
//         console.error("Fetch PCC Error:", error);
//         res.status(500).json({ message: "Failed to fetch station applications." });
//     }
// };

// // ==========================================
// // 4. GENERATE PCC / UPDATE STATUS (Police)
// // ==========================================
// const generatePCCCertificate = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { path, purpose, officerRemark, crimeRecords } = req.body;
        
//         const application = await PCCApplication.findById(id);
//         if (!application) {
//             return res.status(404).json({ message: "Application not found" });
//         }

//         let signatureUrl = null;
//         if (req.file) {
//             // ✅ Upload signature buffer to Cloudinary using your helper
//             const sigResult = await uploadToCloudinary(req.file.buffer);
//             signatureUrl = sigResult.secure_url;
//         }

//         // Parse crime records if sent as stringified JSON
//         let parsedCrimeRecords = [];
//         if (crimeRecords) {
//             parsedCrimeRecords = typeof crimeRecords === 'string' ? JSON.parse(crimeRecords) : crimeRecords;
//         }

//         // Update Application
//         application.status = path === 'clear' ? 'Approved' : 'Rejected'; // Or use 'Approved' for both, just flagged.
//         application.purpose = purpose || application.purpose;
//         application.officerRemark = officerRemark || "";
//         application.crimeRecords = parsedCrimeRecords;
        
//         // Save the signature URL as the proof of verification.
//         application.certificateUrl = signatureUrl; 

//         await application.save();

//         res.status(200).json({ message: "Certificate Generated Successfully", application });
//     } catch (error) {
//         console.error("Generate PCC Error:", error);
//         res.status(500).json({ message: "Failed to generate certificate." });
//     }
// };

// module.exports = {
//     submitPCCApplication,
//     getMyPCCApplications,
//     getStationPCCApplications,
//     generatePCCCertificate 
// };






























//problematic one

const PCCApplication = require('../models/PCCApplication');
const { uploadToCloudinary } = require('../utils/cloudinary'); // ✅ Linked your Cloudinary helper

// ==========================================
// 1. SUBMIT PCC APPLICATION (Citizen)
// ==========================================
const submitPCCApplication = async (req, res) => {
    try {
        const {
            userId, fullName, fatherName, address, age, gender, mobile, purpose, selectedStation
        } = req.body;

        // ✅ Check if all files are present in req.files
        if (!req.files || !req.files.applicantPhoto || !req.files.aadharFront || !req.files.aadharBack) {
            return res.status(400).json({ message: "All 3 images (Photo, Aadhaar Front & Back) are required." });
        }

        // ✅ Upload each image buffer to Cloudinary using your helper
        const photoResult = await uploadToCloudinary(req.files.applicantPhoto[0].buffer);
        const aadharFrontResult = await uploadToCloudinary(req.files.aadharFront[0].buffer);
        const aadharBackResult = await uploadToCloudinary(req.files.aadharBack[0].buffer);

        const newApplication = await PCCApplication.create({
            user: userId,
            fullName,
            fatherName,
            address,
            age,
            gender,
            mobile,
            purpose,
            selectedStation,
            applicantPhoto: photoResult.secure_url, // ✅ Cloudinary URL
            aadharFront: aadharFrontResult.secure_url, // ✅ Cloudinary URL
            aadharBack: aadharBackResult.secure_url, // ✅ Cloudinary URL
            status: 'Pending Verification'
        });

        res.status(201).json(newApplication);

    } catch (error) {
        console.error("PCC Submission Error:", error);
        res.status(500).json({ message: "Server Error: Failed to upload images to Cloudinary." });
    }
};

// ==========================================
// 2. GET MY PCC APPLICATIONS (Citizen)
// ==========================================
const getMyPCCApplications = async (req, res) => {
    try {
        const applications = await PCCApplication.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.status(200).json(applications);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch applications." });
    }
};

// ==========================================
// 3. GET STATION PCC APPLICATIONS (Police)
// ==========================================
const getStationPCCApplications = async (req, res) => {
    try {
        const userRole = req.user.role;
        let query = {};
        
        // Police see only their station's applications. Seniors see all.
        if (userRole === 'police') {
             // Assuming the user's station is stored in req.user.station
             query = { selectedStation: req.user.station };
        }
        
        const applications = await PCCApplication.find(query)
            .populate('user', 'firstName lastName mobile')
            .sort({ createdAt: -1 }); // Newest first
            
        res.status(200).json(applications);
    } catch (error) {
        console.error("Fetch PCC Error:", error);
        res.status(500).json({ message: "Failed to fetch station applications." });
    }
};

// ==========================================
// 4. GENERATE PCC / UPDATE STATUS (Police)
// ==========================================
const generatePCCCertificate = async (req, res) => {
    try {
        const { id } = req.params;
        const { path, purpose, officerRemark, crimeRecords } = req.body;
        
        const application = await PCCApplication.findById(id);
        if (!application) {
            return res.status(404).json({ message: "Application not found" });
        }

        let signatureUrl = null;
        if (req.file) {
            // ✅ Upload signature buffer to Cloudinary using your helper
            const sigResult = await uploadToCloudinary(req.file.buffer);
            signatureUrl = sigResult.secure_url;
        }

        // Parse crime records if sent as stringified JSON
        let parsedCrimeRecords = [];
        if (crimeRecords) {
            parsedCrimeRecords = typeof crimeRecords === 'string' ? JSON.parse(crimeRecords) : crimeRecords;
        }

        // ✅ CAPTURE LOGGED-IN OFFICER DATA
        const officerName = `${req.user.title || "Mr."} ${req.user.firstName} ${req.user.lastName}`;
        const officerDesignation = req.user.designation;
        const officerStation = req.user.station;

        // Update Application
        application.status = path === 'clear' ? 'Approved' : 'Rejected'; // Or use 'Approved' for both, just flagged.
        application.purpose = purpose || application.purpose;
        application.officerRemark = officerRemark || "";
        application.crimeRecords = parsedCrimeRecords;
        
        // Save the signature URL as the proof of verification.
        application.certificateUrl = signatureUrl; 

        // ✅ STORE OFFICER DETAILS FOR PDF GENERATION
        application.approvedBy = {
            name: officerName,
            designation: officerDesignation,
            station: officerStation
        };

        await application.save();

        res.status(200).json({ message: "Certificate Generated Successfully", application });
    } catch (error) {
        console.error("Generate PCC Error:", error);
        res.status(500).json({ message: "Failed to generate certificate." });
    }
};

module.exports = {
    submitPCCApplication,
    getMyPCCApplications,
    getStationPCCApplications,
    generatePCCCertificate 
};