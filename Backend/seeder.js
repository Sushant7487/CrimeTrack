const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Station = require('./models/Station');
const Designation = require('./models/Designation');
const LegalSection = require('./models/LegalSection');

dotenv.config();

// --- DATA FROM YOUR MOCK DATA FILE ---
const seniorDesignations = [
  "Director General of Police (DGP)", "Additional Director General of Police (ADGP)",
  "Inspector General of Police (IGP)", "Deputy Inspector General of Police (DIG)",
  "Superintendent of Police (SP)", "Additional Superintendent of Police (ASP)"
];

const regularDesignations = [
  "Deputy Superintendent of Police (DSP)", "Inspector", "Sub-Inspector (SI)",
  "Assistant Sub-Inspector (ASI)", "Head Constable", "Constable"
];

const policeStations = [
  "Chandrapur City Police Station", "Ramnagar Police Station", "City Kotwali Police Station",
  "Bazar Peth Police Station", "Ballarpur Police Station", "Ghugus Police Station",
  "Bhadrawati Police Station", "Warora Police Station", "Rajura Police Station",
  "Mul Police Station", "Nagbhid Police Station", "Sindewahi Police Station",
  "Sawli Police Station", "Pombhurna Police Station", "Jiwati Police Station",
  "Gondpipri Police Station", "Korpana Police Station", "Chimur Police Station",
  "Bhisi Police Station", "MIDC Chandrapur Police Station"
];

const ipcSections = [
  "IPC 107 – Abetment", "IPC 120B – Criminal Conspiracy", "IPC 121 – Waging War Against State",
  "IPC 302 – Punishment for Murder", "IPC 307 – Attempt to Murder", "IPC 375 – Rape",
  "IPC 376 – Punishment for Rape", "IPC 379 – Theft", "IPC 420 – Cheating"
  // ... Add rest of your IPC list here if you want all of them
];

const ncrOffenses = [
  "Voluntarily Causing Hurt (Sec 323 IPC)", "Intentional Insult (Sec 504 IPC)",
  "Criminal Intimidation (Sec 506 IPC)", "Simple Cheating (Sec 417 IPC)",
  "Lost Property (Mobile/Documents)"
];

const importData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB...');

    // Clear existing data to avoid duplicates
    await Station.deleteMany();
    await Designation.deleteMany();
    await LegalSection.deleteMany();

    // Prepare Data
    const stations = policeStations.map(name => ({ name }));
    
    const designations = [
      ...seniorDesignations.map(title => ({ title, roleType: 'senior' })),
      ...regularDesignations.map(title => ({ title, roleType: 'police' }))
    ];

    const sections = [
      ...ipcSections.map(sectionName => ({ sectionName, category: 'IPC' })),
      ...ncrOffenses.map(sectionName => ({ sectionName, category: 'NCR' }))
    ];

    // Insert Data
    await Station.insertMany(stations);
    await Designation.insertMany(designations);
    await LegalSection.insertMany(sections);

    console.log('🎉 Data Imported Successfully!');
    process.exit();
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

importData();