


// Folder/File Path: Crime-Track-main/src/data/mockData.jsx
// ⚠️ MOCK DATA ONLY – FOR DEVELOPMENT / PRACTICE PURPOSE

// ================= SENIOR OFFICER RANKS =================
export const seniorDesignations = [
  "Director General of Police (DGP)",
  "Additional Director General of Police (ADGP)",
  "Inspector General of Police (IGP)",
  "Deputy Inspector General of Police (DIG)",
  "Superintendent of Police (SP)",
  "Additional Superintendent of Police (ASP)"
];

// ================= REGULAR POLICE RANKS =================
export const regularDesignations = [
  "Deputy Superintendent of Police (DSP)",
  "Inspector",
  "Sub-Inspector (SI)",
  "Assistant Sub-Inspector (ASI)",
  "Head Constable",
  "Constable"
];

export const designations = [...seniorDesignations, ...regularDesignations];

// ================= ALL MAJOR CRIME TYPES IN INDIA =================
export const crimeTypes = [
  "Murder",
  "Attempt to Murder",
  "Culpable Homicide",
  "Theft",
  "Robbery",
  "Dacoity",
  "Burglary",
  "Chain Snatching",
  "Physical Assault",
  "Grievous Hurt",
  "Domestic Violence",
  "Dowry Harassment",
  "Rape / Sexual Assault",
  "Women Harassment / Eve Teasing",
  "Stalking",
  "Child Abuse / POCSO",
  "Kidnapping",
  "Abduction",
  "Human Trafficking",
  "Missing Person",
  "Cyber Crime",
  "Online Fraud / Scam",
  "Identity Theft",
  "Hacking",
  "Financial Fraud",
  "Cheating",
  "Forgery",
  "Criminal Breach of Trust",
  "Extortion",
  "Criminal Intimidation",
  "Rioting",
  "Unlawful Assembly",
  "Public Nuisance",
  "Illegal Arms Possession",
  "Drug Trafficking / NDPS",
  "Alcohol Prohibition Violation",
  "Traffic Violation",
  "Hit and Run",
  "Rash Driving",
  "Accident Case",
  "Environmental Crime",
  "Illegal Mining",
  "Corruption / Bribery",
  "Money Laundering",
  "Terrorism Related Offence",
  "Sedition",
  "Other"
];

// ================= IPC SECTIONS (EXTENSIVE – MOCK LIST) =================
// Note: Full IPC contains 500+ sections. Below is an extended practical list
// commonly used in police systems. Suitable for dropdowns & filtering.

export const ipcSections = [
  "IPC 107 – Abetment",
  "IPC 120B – Criminal Conspiracy",
  "IPC 121 – Waging War Against State",
  "IPC 124A – Sedition",
  "IPC 141 – Unlawful Assembly",
  "IPC 146 – Rioting",
  "IPC 149 – Every Member of Unlawful Assembly",
  "IPC 166 – Public Servant Disobeying Law",
  "IPC 174 – Non-Attendance",
  "IPC 177 – Furnishing False Information",
  "IPC 186 – Obstructing Public Servant",
  "IPC 191 – Giving False Evidence",
  "IPC 193 – Punishment for False Evidence",
  "IPC 195 – Fabricating False Evidence",
  "IPC 211 – False Charge",
  "IPC 216 – Harbouring Offender",
  "IPC 217 – Public Servant Disobedience",
  "IPC 218 – Framing Incorrect Record",
  "IPC 228 – Intentional Insult",
  "IPC 299 – Culpable Homicide",
  "IPC 300 – Murder",
  "IPC 302 – Punishment for Murder",
  "IPC 304 – Culpable Homicide not Murder",
  "IPC 307 – Attempt to Murder",
  "IPC 308 – Attempt to Commit Culpable Homicide",
  "IPC 323 – Voluntarily Causing Hurt",
  "IPC 324 – Hurt by Dangerous Weapons",
  "IPC 325 – Grievous Hurt",
  "IPC 326 – Grievous Hurt by Weapons",
  "IPC 341 – Wrongful Restraint",
  "IPC 342 – Wrongful Confinement",
  "IPC 354 – Assault on Woman",
  "IPC 354A – Sexual Harassment",
  "IPC 354D – Stalking",
  "IPC 363 – Kidnapping",
  "IPC 365 – Kidnapping with Intent",
  "IPC 366 – Abduction of Woman",
  "IPC 370 – Human Trafficking",
  "IPC 375 – Rape",
  "IPC 376 – Punishment for Rape",
  "IPC 379 – Theft",
  "IPC 380 – Theft in Dwelling House",
  "IPC 392 – Robbery",
  "IPC 395 – Dacoity",
  "IPC 397 – Robbery with Deadly Weapon",
  "IPC 406 – Criminal Breach of Trust",
  "IPC 409 – CBT by Public Servant",
  "IPC 415 – Cheating",
  "IPC 417 – Punishment for Cheating",
  "IPC 420 – Cheating and Dishonestly Inducing",
  "IPC 463 – Forgery",
  "IPC 465 – Punishment for Forgery",
  "IPC 468 – Forgery for Cheating",
  "IPC 471 – Using Forged Document",
  "IPC 474 – Possession of Forged Document",
  "IPC 489A – Counterfeit Currency",
  "IPC 489B – Using Fake Currency",
  "IPC 499 – Defamation",
  "IPC 500 – Punishment for Defamation",
  "IPC 503 – Criminal Intimidation",
  "IPC 504 – Intentional Insult",
  "IPC 506 – Punishment for Criminal Intimidation",
  "IPC 509 – Insulting Modesty of Woman"
];

// ================= CHANDRAPUR DISTRICT POLICE STATIONS =================
export const policeStations = [
  "Chandrapur City Police Station",
  "Ramnagar Police Station",
  "City Kotwali Police Station",
  "Bazar Peth Police Station",
  "Ballarpur Police Station",
  "Ghugus Police Station",
  "Bhadrawati Police Station",
  "Warora Police Station",
  "Rajura Police Station",
  "Mul Police Station",
  "Nagbhid Police Station",
  "Sindewahi Police Station",
  "Sawli Police Station",
  "Pombhurna Police Station",
  "Jiwati Police Station",
  "Gondpipri Police Station",
  "Korpana Police Station",
  "Chimur Police Station",
  "Bhisi Police Station",
  "MIDC Chandrapur Police Station"
];

// ================= MOCK OFFICERS =================
export const mockOfficers = [
  { id: 1, name: "Inspector Vijay Patil", designation: "Inspector", station: "Ramnagar Police Station" },
  { id: 2, name: "SI Anil Deshmukh", designation: "Sub-Inspector (SI)", station: "City Kotwali Police Station" },
  { id: 3, name: "ASI Rahul Shinde", designation: "Assistant Sub-Inspector (ASI)", station: "Ballarpur Police Station" },
  { id: 4, name: "Constable Suresh Pawar", designation: "Constable", station: "Ghugus Police Station" }
];


// src/data/mockData.jsx

// ... (Existing code for seniorDesignations, regularDesignations, crimeTypes...)

// ✅ NEW: Non-Cognizable Offenses (NCR List)
export const ncrOffenses = [
  "Voluntarily Causing Hurt (Sec 323 IPC)",
  "Intentional Insult with Intent to Provoke Breach of Peace (Sec 504 IPC)",
  "Criminal Intimidation (Sec 506 IPC)",
  "Misconduct in Public by a Drunken Person (Sec 510 IPC)",
  "Simple Cheating (Sec 417 IPC)",
  "Mischief Causing Damage (Sec 426 IPC)",
  "Affray (Fighting in Public) (Sec 160 IPC)",
  "Public Nuisance (Sec 268/290 IPC)",
  "Negligent Conduct with Animals (Sec 289 IPC)",
  "Trespass (Civil Dispute Nature)",
  "Lost Property (Mobile/Documents)",
  "Other Non-Cognizable Offence"
];

// ... (Rest of the file remains same)