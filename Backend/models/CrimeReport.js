
const mongoose = require('mongoose');

// ✅ STANDARD PERSON SCHEMA (Reusable)
const personDetailsSchema = {
    fullName: String,
    guardianName: String, // Father/Husband
    age: String,
    gender: String,
    mobile: String,
    email: String,
    address: String,
    idProofType: String,
    idProofNumber: String
};

const crimeReportSchema = mongoose.Schema(
  {
    // =================================================
    // 1. CITIZEN REPORTING FIELDS (From User Dashboard)
    // =================================================
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    reporterName: { type: String, required: true },
    isAnonymous: { type: Boolean, default: false },
    
    // Victim Information (Citizen Input)
    victimTitle: String, 
    victimName: String,
    victimAge: String,   
    victimGender: String,
    victimContact: String,
    victimAadhar: String, 
    victimAddress: String,
    victimIdPhoto: String, // Cloudinary URL for Victim ID

    // Incident Basics
    selectedStation: { type: String, required: true },
    crimeType: { type: String, required: true },
    description: { type: String, required: true },
    dateOfIncident: { type: Date },
    severity: String,
    
    // Incident Location
    incidentLocationAddress: String, 

    // Suspect Information (Citizen Input)
    suspectTitle: String, 
    suspectName: String,
    suspectAge: String,   
    suspectContact: String,
    suspectAddress: String,
    suspectGender: String,
    suspectAadhar: String,
    suspectIdPhoto: String, // Cloudinary URL for Suspect ID

    // Metadata
    status: { type: String, default: 'Complaint Received' },
    assignedOfficer: { type: String, default: 'Not Assigned' },
    
    importantNote: { text: String, author: String, updatedAt: Date },
    
    evidence: [{ type: String }], // Existing field
    incidentProof: [{ type: String }], // ✅ NEW: Stores URLs for Proof of Incident (Photos/Videos/Audio)

    isSOS: { type: Boolean, default: false },
    location: { lat: Number, lng: Number }, 

    // =================================================
    // 2. ✅ OFFICIAL POLICE RECORD (FIR / NCR)
    // =================================================
    officialRecord: {
        recordType: { type: String, enum: ['FIR', 'NCR'], default: null }, 
        recordNumber: { type: String },
        recordDate: { type: Date },
        
        // General Info
        district: { type: String },
        policeStation: { type: String },
        year: { type: String },
        onlineComplaintId: { type: String },
        
        // Occurrence
        occurrenceDate: String, 
        occurrenceTime: String,
        generalDiaryReference: String, 
        
        // Location
        distanceFromPS: String,
        directionFromPS: String,
        beatNo: String,
        incidentPlace: String,
        
        // --- ✅ STANDARDIZED PERSON DETAILS ---
        complainant: personDetailsSchema,  // 1. Complainant
        victim: personDetailsSchema,       // 2. Victim
        accused: {
            ...personDetailsSchema,        // 3. Accused (Plus extra fields)
            details: String,               // Physical Marks/Description
            relation: String               // Relation with Complainant
        },

        // --- Details ---
        incidentType: String,            // For NCR Dropdown
        briefDescription: String,        // Story
        
        // FIR Specific (Property)
        acts: [{ actName: String, section: String }],
        stolenPropertyParticulars: String,
        totalValue: String,
        articleType: String,
        articleDescription: String,
        
        // Extra Info
        witnessDetails: {
            hasWitness: { type: String, default: "No" }, 
            name: String,
            contact: String
        },
        previousComplaint: {
            exists: { type: String, default: "No" }, 
            number: String
        },

        declaration: { type: Boolean, default: false },
        ncrLegalRemark: { type: String }, // For NCR
        policeEvidence: [{ type: String }], 

        investigatingOfficer: String,
        rank: String
    },

    // =================================================
    // 3. HISTORY TIMELINE
    // =================================================
    statusHistory: [
        {
            status: String,
            remark: String,
            updatedBy: String,
            timestamp: { type: Date, default: Date.now }
        }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model('CrimeReport', crimeReportSchema);