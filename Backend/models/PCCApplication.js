const mongoose = require('mongoose');

const pccSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    
    // Personal Information
    applicantPhoto: { type: String, required: true }, // Cloudinary URL
    fullName: { type: String, required: true },
    fatherName: { type: String, required: true },
    address: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    mobile: { type: String, required: true },
    
    // Application Details
    purpose: { type: String, required: true },
    selectedStation: { type: String, required: true },
    
    // Identity Verification
    aadharFront: { type: String, required: true }, // Cloudinary URL
    aadharBack: { type: String, required: true },  // Cloudinary URL
    
    // Status & Police Verification
    status: { 
        type: String, 
        default: 'Pending Verification',
        enum: ['Pending Verification', 'Approved', 'Rejected'] 
    },
    assignedOfficer: { type: String, default: 'Not Assigned' },
    officerRemark: { type: String }, // Custom remark typed by officer
    
    // For "Criminal Record Found" logic
    crimeRecords: [
        {
            date: String,
            ipcSection: String,
            remark: String
        }
    ],

    // Generated PDF
    certificateUrl: { type: String } 
  },
  { timestamps: true }
);

module.exports = mongoose.model('PCCApplication', pccSchema);