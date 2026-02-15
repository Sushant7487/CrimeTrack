// const Station = require('../models/Station');
// const Designation = require('../models/Designation');
// const LegalSection = require('../models/LegalSection');

// // @desc    Get all metadata (Stations, Designations, Sections)
// // @route   GET /api/metadata/all
// // @access  Public (Used in Signup/Login)
// const getAllMetadata = async (req, res) => {
//   try {
//     const stations = await Station.find().sort({ name: 1 });
//     const designations = await Designation.find();
//     const legalSections = await LegalSection.find();

//     res.json({
//       stations,
//       designations: {
//         senior: designations.filter(d => d.roleType === 'senior').map(d => d.title),
//         regular: designations.filter(d => d.roleType === 'police').map(d => d.title)
//       },
//       legal: {
//         ipc: legalSections.filter(l => l.category === 'IPC').map(l => l.sectionName),
//         ncr: legalSections.filter(l => l.category === 'NCR').map(l => l.sectionName)
//       }
//     });
//   } catch (error) {
//     console.error("Metadata Error:", error);
//     res.status(500).json({ message: "Server Error fetching metadata" });
//   }
// };

// module.exports = { getAllMetadata };








// const Station = require('../models/Station');
// const Designation = require('../models/Designation');
// const LegalSection = require('../models/LegalSection');

// // @desc    Get all metadata (Formatted for Signup/Forms) - EXISTING
// // @route   GET /api/metadata/all
// const getAllMetadata = async (req, res) => {
//   try {
//     const stations = await Station.find().sort({ name: 1 });
//     const designations = await Designation.find();
//     const legalSections = await LegalSection.find();

//     res.json({
//       stations,
//       designations: {
//         senior: designations.filter(d => d.roleType === 'senior').map(d => d.title),
//         regular: designations.filter(d => d.roleType === 'police').map(d => d.title)
//       },
//       legal: {
//         ipc: legalSections.filter(l => l.category === 'IPC').map(l => l.sectionName),
//         ncr: legalSections.filter(l => l.category === 'NCR').map(l => l.sectionName)
//       }
//     });
//   } catch (error) {
//     console.error("Metadata Error:", error);
//     res.status(500).json({ message: "Server Error fetching metadata" });
//   }
// };

// // ==========================================
// // ✅ NEW: ADMIN MANAGEMENT CONTROLLERS
// // ==========================================

// // --- STATIONS ---
// const getStations = async (req, res) => {
//     const stations = await Station.find().sort({ createdAt: -1 });
//     res.json(stations);
// };

// const addStation = async (req, res) => {
//     const { name, city, district } = req.body;
//     if (!name) return res.status(400).json({ message: "Station Name is required" });
//     const station = await Station.create({ name, city, district });
//     res.status(201).json(station);
// };

// const deleteStation = async (req, res) => {
//     await Station.findByIdAndDelete(req.params.id);
//     res.json({ message: "Station Removed" });
// };

// // --- DESIGNATIONS ---
// const getDesignations = async (req, res) => {
//     const designations = await Designation.find().sort({ roleType: 1 });
//     res.json(designations);
// };

// const addDesignation = async (req, res) => {
//     const { title, roleType } = req.body;
//     if (!title || !roleType) return res.status(400).json({ message: "Title and Role Type required" });
//     const designation = await Designation.create({ title, roleType });
//     res.status(201).json(designation);
// };

// const deleteDesignation = async (req, res) => {
//     await Designation.findByIdAndDelete(req.params.id);
//     res.json({ message: "Designation Removed" });
// };

// // --- LEGAL SECTIONS ---
// const getLegalSections = async (req, res) => {
//     const sections = await LegalSection.find().sort({ category: 1 });
//     res.json(sections);
// };

// const addLegalSection = async (req, res) => {
//     const { sectionName, category, description } = req.body;
//     if (!sectionName || !category) return res.status(400).json({ message: "Section Name and Category required" });
//     const section = await LegalSection.create({ sectionName, category, description });
//     res.status(201).json(section);
// };

// const deleteLegalSection = async (req, res) => {
//     await LegalSection.findByIdAndDelete(req.params.id);
//     res.json({ message: "Section Removed" });
// };

// module.exports = { 
//     getAllMetadata,
//     getStations, addStation, deleteStation,
//     getDesignations, addDesignation, deleteDesignation,
//     getLegalSections, addLegalSection, deleteLegalSection
// };









// const Station = require('../models/Station');
// const Designation = require('../models/Designation');
// const LegalSection = require('../models/LegalSection');

// // @desc    Get all metadata (Formatted for Signup/Forms) - EXISTING
// // @route   GET /api/metadata/all
// const getAllMetadata = async (req, res) => {
//   try {
//     const stations = await Station.find().sort({ name: 1 });
//     const designations = await Designation.find();
//     const legalSections = await LegalSection.find();

//     res.json({
//       stations,
//       designations: {
//         senior: designations.filter(d => d.roleType === 'senior').map(d => d.title),
//         regular: designations.filter(d => d.roleType === 'police').map(d => d.title)
//       },
//       legal: {
//         ipc: legalSections.filter(l => l.category === 'IPC').map(l => l.sectionName),
//         ncr: legalSections.filter(l => l.category === 'NCR').map(l => l.sectionName)
//       }
//     });
//   } catch (error) {
//     console.error("Metadata Error:", error);
//     res.status(500).json({ message: "Server Error fetching metadata" });
//   }
// };

// // ==========================================
// // ✅ NEW: ADMIN MANAGEMENT CONTROLLERS
// // ==========================================

// // --- STATIONS ---
// const getStations = async (req, res) => {
//     const stations = await Station.find().sort({ createdAt: -1 });
//     res.json(stations);
// };

// // ✅ UPDATED: Add Station with Location (Google Maps Support)
// const addStation = async (req, res) => {
//     const { name, city, district, location } = req.body;
    
//     if (!name) return res.status(400).json({ message: "Station Name is required" });

//     // Validate Location Coordinates from Map
//     if (!location || !location.lat || !location.lng) {
//         return res.status(400).json({ message: "Station Location is mandatory on the Map" });
//     }

//     try {
//         const station = await Station.create({ 
//             name, 
//             city, 
//             district,
//             location // Save the coordinates { lat, lng, address }
//         });
//         res.status(201).json(station);
//     } catch (error) {
//         res.status(500).json({ message: "Error adding station: " + error.message });
//     }
// };

// const deleteStation = async (req, res) => {
//     await Station.findByIdAndDelete(req.params.id);
//     res.json({ message: "Station Removed" });
// };

// // --- DESIGNATIONS ---
// const getDesignations = async (req, res) => {
//     const designations = await Designation.find().sort({ roleType: 1 });
//     res.json(designations);
// };

// const addDesignation = async (req, res) => {
//     const { title, roleType } = req.body;
//     if (!title || !roleType) return res.status(400).json({ message: "Title and Role Type required" });
//     const designation = await Designation.create({ title, roleType });
//     res.status(201).json(designation);
// };

// const deleteDesignation = async (req, res) => {
//     await Designation.findByIdAndDelete(req.params.id);
//     res.json({ message: "Designation Removed" });
// };

// // --- LEGAL SECTIONS ---
// const getLegalSections = async (req, res) => {
//     const sections = await LegalSection.find().sort({ category: 1 });
//     res.json(sections);
// };

// const addLegalSection = async (req, res) => {
//     const { sectionName, category, description } = req.body;
//     if (!sectionName || !category) return res.status(400).json({ message: "Section Name and Category required" });
//     const section = await LegalSection.create({ sectionName, category, description });
//     res.status(201).json(section);
// };

// const deleteLegalSection = async (req, res) => {
//     await LegalSection.findByIdAndDelete(req.params.id);
//     res.json({ message: "Section Removed" });
// };

// module.exports = { 
//     getAllMetadata,
//     getStations, addStation, deleteStation,
//     getDesignations, addDesignation, deleteDesignation,
//     getLegalSections, addLegalSection, deleteLegalSection
// };










const Station = require('../models/Station');
const Designation = require('../models/Designation');
const LegalSection = require('../models/LegalSection');

// @desc    Get all metadata (Formatted for Signup/Forms) - EXISTING
// @route   GET /api/metadata/all
const getAllMetadata = async (req, res) => {
  try {
    const stations = await Station.find().sort({ name: 1 });
    const designations = await Designation.find();
    const legalSections = await LegalSection.find();

    res.json({
      stations,
      designations: {
        senior: designations.filter(d => d.roleType === 'senior').map(d => d.title),
        regular: designations.filter(d => d.roleType === 'police').map(d => d.title)
      },
      legal: {
        ipc: legalSections.filter(l => l.category === 'IPC').map(l => l.sectionName),
        ncr: legalSections.filter(l => l.category === 'NCR').map(l => l.sectionName)
      }
    });
  } catch (error) {
    console.error("Metadata Error:", error);
    res.status(500).json({ message: "Server Error fetching metadata" });
  }
};

// ==========================================
// ✅ ADMIN MANAGEMENT CONTROLLERS
// ==========================================

// --- STATIONS ---
const getStations = async (req, res) => {
    const stations = await Station.find().sort({ createdAt: -1 });
    res.json(stations);
};

// ✅ UPDATED: Add Station with Location
const addStation = async (req, res) => {
    const { name, city, district, location } = req.body;
    
    if (!name) return res.status(400).json({ message: "Station Name is required" });

    // Validate Location Coordinates from Map
    if (!location || !location.lat || !location.lng) {
        return res.status(400).json({ message: "Station Location is mandatory on the Map" });
    }

    try {
        const station = await Station.create({ 
            name, 
            city, 
            district,
            location // Save the coordinates { lat, lng, address }
        });
        res.status(201).json(station);
    } catch (error) {
        res.status(500).json({ message: "Error adding station: " + error.message });
    }
};

const deleteStation = async (req, res) => {
    await Station.findByIdAndDelete(req.params.id);
    res.json({ message: "Station Removed" });
};

// --- DESIGNATIONS ---
const getDesignations = async (req, res) => {
    const designations = await Designation.find().sort({ roleType: 1 });
    res.json(designations);
};

const addDesignation = async (req, res) => {
    const { title, roleType } = req.body;
    if (!title || !roleType) return res.status(400).json({ message: "Title and Role Type required" });
    const designation = await Designation.create({ title, roleType });
    res.status(201).json(designation);
};

const deleteDesignation = async (req, res) => {
    await Designation.findByIdAndDelete(req.params.id);
    res.json({ message: "Designation Removed" });
};

// --- LEGAL SECTIONS ---
const getLegalSections = async (req, res) => {
    const sections = await LegalSection.find().sort({ category: 1 });
    res.json(sections);
};

const addLegalSection = async (req, res) => {
    const { sectionName, category, description } = req.body;
    if (!sectionName || !category) return res.status(400).json({ message: "Section Name and Category required" });
    const section = await LegalSection.create({ sectionName, category, description });
    res.status(201).json(section);
};

const deleteLegalSection = async (req, res) => {
    await LegalSection.findByIdAndDelete(req.params.id);
    res.json({ message: "Section Removed" });
};

module.exports = { 
    getAllMetadata,
    getStations, addStation, deleteStation,
    getDesignations, addDesignation, deleteDesignation,
    getLegalSections, addLegalSection, deleteLegalSection
};