
import jsPDF from "jspdf";

// ==========================================
// 1. UTILITIES & CONFIG
// ==========================================

// Load Image from URL (Cloudinary / Local)
const getBase64ImageFromURL = (url) => {
    return new Promise((resolve) => {
        if (!url || url === "undefined") return resolve(null);
        const img = new Image();
        img.setAttribute("crossOrigin", "anonymous");
        img.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);
            resolve(canvas.toDataURL("image/png"));
        };
        img.onerror = () => resolve(null);
        img.src = url;
    });
};

// Draw Professional Border
const drawPageBorder = (doc) => {
    const width = doc.internal.pageSize.width;
    const height = doc.internal.pageSize.height;
    doc.setDrawColor(0);
    doc.setLineWidth(0.8);
    doc.rect(5, 5, width - 10, height - 10); // Heavy Outer
    doc.setLineWidth(0.2);
    doc.rect(7, 7, width - 14, height - 14); // Light Inner
};

// Standard Header
const addHeader = async (doc, title, station) => {
    const width = doc.internal.pageSize.width;
    drawPageBorder(doc);

    try {
        const crimeTrackLogo = await getBase64ImageFromURL("/CrimeTrack.png");
        const policeLogo = await getBase64ImageFromURL("/Chandrapur_Police.png");
        if (crimeTrackLogo) doc.addImage(crimeTrackLogo, "PNG", 12, 10, 20, 20);
        if (policeLogo) doc.addImage(policeLogo, "PNG", width - 32, 10, 20, 20);
    } catch (e) { console.error("Logo Error", e); }

    doc.setFont("times", "bold");
    doc.setFontSize(16);
    doc.text("MAHARASHTRA STATE POLICE", width / 2, 18, { align: "center" });
    
    doc.setFontSize(11);
    doc.setFont("times", "normal");
    doc.text("GOVERNMENT OF MAHARASHTRA", width / 2, 24, { align: "center" });
    
    doc.setFontSize(12);
    doc.setFont("times", "bold");
    doc.text(`POLICE STATION: ${(station || "HEADQUARTERS").toUpperCase()}`, width / 2, 30, { align: "center" });

    // Gray Title Bar
    doc.setFillColor(230, 230, 230);
    doc.rect(10, 36, width - 20, 9, 'F');
    doc.setDrawColor(0);
    doc.rect(10, 36, width - 20, 9);
    
    doc.setFontSize(13);
    doc.text(title.toUpperCase(), width / 2, 42, { align: "center" });
};

// Smart Page Break
const checkPageBreak = (doc, y, marginNeeded = 30) => {
    const pageHeight = doc.internal.pageSize.height;
    if (y + marginNeeded >= pageHeight - 15) {
        doc.addPage();
        drawPageBorder(doc);
        return 20; // Reset Y
    }
    return y;
};

// Signature Block
const addSignature = async (doc, y, officerName, designation) => {
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;
    
    y = checkPageBreak(doc, y, 50);

    try {
        const signatureImg = await getBase64ImageFromURL("/digital_signature.png");
        if (signatureImg) {
            doc.addImage(signatureImg, "PNG", pageWidth - 60, y, 30, 15);
        }
    } catch (e) {
        doc.text("[Signed]", pageWidth - 50, y + 10);
    }

    y += 20;
    doc.setFont("times", "bold");
    doc.setFontSize(11);
    doc.text(officerName || "Officer In-Charge", pageWidth - 20, y, { align: "right" });
    y += 5;
    doc.setFont("times", "normal");
    doc.setFontSize(10);
    doc.text(designation || "Investigating Officer", pageWidth - 20, y, { align: "right" });
    y += 5;
    doc.text("Chandrapur, Maharashtra", pageWidth - 20, y, { align: "right" });
    
    // Footer Timestamp
    doc.setFontSize(8);
    doc.setTextColor(100);
    doc.text(`Generated via CrimeTrack | ${new Date().toLocaleString()}`, 15, pageHeight - 10);
    doc.setTextColor(0);
};

// Helper to format Address lines
const getFormattedAddress = (addr) => addr ? addr.replace(/\n/g, ", ") : "N/A";

// ==========================================
// REPORT 1: COMPLAINT RECEIPT
// ==========================================
export const generateReceipt = async (data) => {
    const doc = new jsPDF();
    await addHeader(doc, "COMPLAINT ACKNOWLEDGEMENT RECEIPT", data.selectedStation);
    
    let y = 55;
    doc.setFont("times", "normal");
    doc.setFontSize(10);

    // --- REFERENCE INFO ---
    doc.setLineWidth(0.1);
    doc.rect(15, y, 180, 15);
    doc.setFont("times", "bold");
    doc.text("Reference No (Object ID):", 20, y + 6);
    doc.text("Date Reported:", 110, y + 6);
    doc.text("Status:", 20, y + 11);
    
    doc.setFont("times", "normal");
    // ✅ FULL OBJECT ID
    doc.text(data._id || "N/A", 65, y + 6); 
    doc.text(new Date(data.createdAt).toLocaleDateString(), 140, y + 6);
    doc.text("RECEIVED / PENDING INQUIRY", 65, y + 11);

    y += 25;

    // --- REPORTER INFO ---
    doc.setFont("times", "bold");
    doc.text("1. Complainant / Reporter Information:", 15, y);
    y += 5;
    doc.setFont("times", "normal");
    doc.text(`Name: ${data.reporterName || "N/A"}`, 20, y);
    doc.text(`Contact: ${data.user?.mobile || "N/A"}`, 110, y);
    y += 10;

    // --- VICTIM & SUSPECT DETAILS (ALL FIELDS) ---
    doc.setFont("times", "bold");
    doc.text("2. Parties Involved (Full Details):", 15, y);
    y += 2;
    
    const vImg = await getBase64ImageFromURL(data.victimIdPhoto);
    const sImg = await getBase64ImageFromURL(data.suspectIdPhoto);
    
    // Increased Box Height to fit all details
    doc.rect(15, y, 180, 60); 
    doc.line(105, y, 105, y + 60); // Middle Line

    // -- Victim Side (Left) --
    if (vImg) doc.addImage(vImg, "JPEG", 20, y + 5, 25, 30);
    doc.setFont("times", "bold"); doc.text("VICTIM", 50, y + 8);
    doc.setFont("times", "normal");
    doc.text(`Name: ${data.victimTitle || ""} ${data.victimName}`, 50, y + 14);
    doc.text(`Age: ${data.victimAge || "--"} | Gender: ${data.victimGender}`, 50, y + 19);
    doc.text(`Mobile: ${data.victimContact || "N/A"}`, 50, y + 24);
    doc.text(`Aadhaar: ${data.victimAadhar || "N/A"}`, 50, y + 29);
    const vAddr = doc.splitTextToSize(`Address: ${getFormattedAddress(data.victimAddress)}`, 50);
    doc.text(vAddr, 50, y + 34);

    // -- Suspect Side (Right) --
    if (sImg) doc.addImage(sImg, "JPEG", 110, y + 5, 25, 30);
    doc.setFont("times", "bold"); doc.text("SUSPECT", 140, y + 8);
    doc.setFont("times", "normal");
    doc.text(`Name: ${data.suspectName || "Unknown"}`, 140, y + 14);
    doc.text(`Age: ${data.suspectAge || "--"} | Gender: ${data.suspectGender || "--"}`, 140, y + 19);
    doc.text(`Mobile: ${data.suspectContact || "Unknown"}`, 140, y + 24);
    const sAddr = doc.splitTextToSize(`Address: ${getFormattedAddress(data.suspectAddress)}`, 40);
    doc.text(sAddr, 140, y + 34);

    y += 70;

    // --- FULL DESCRIPTION ---
    y = checkPageBreak(doc, y, 40);
    doc.setFont("times", "bold");
    doc.text("3. Full Incident Description:", 15, y);
    y += 5;
    doc.setFont("times", "normal");
    // ✅ Showing FULL Description
    const summary = doc.splitTextToSize(data.description || "No details provided.", 180);
    doc.text(summary, 15, y);
    y += (summary.length * 5) + 15;

    // --- DEAR CITIZEN PARAGRAPH ---
    y = checkPageBreak(doc, y, 35);
    doc.setFont("times", "italic");
    doc.setFontSize(10);
    
    const thankYouText = `Dear ${data.reporterName},\n\nThank you for bringing this matter to our attention via the CrimeTrack Digital Portal. We understand that reporting an incident can be distressing, and we appreciate your vigilance. Your complaint has been formally registered, and a preliminary inquiry has been initiated. Rest assured, the Maharashtra Police is committed to ensuring your safety and justice. You will be updated on the progress of this case via SMS/Email.`;
    
    const splitThankYou = doc.splitTextToSize(thankYouText, 180);
    doc.text(splitThankYou, 15, y);
    y += (splitThankYou.length * 5) + 10;

    // Signature
    await addSignature(doc, y, "System Administrator", "CrimeTrack Portal");
    doc.save(`Receipt_${data._id}.pdf`);
};

// ==========================================
// REPORT 2: FIR / NCR (Standard 5.4 Format)
// ==========================================
export const generateOfficialRecord = async (data) => {
    const doc = new jsPDF();
    const rec = data.officialRecord || {};
    const isFIR = rec.recordType === 'FIR';
    const title = isFIR ? "FIRST INFORMATION REPORT (F.I.R)" : "NON-COGNIZABLE REPORT (N.C.R)";
    
    await addHeader(doc, `${title} - U/S 154 Cr.P.C`, rec.policeStation || data.selectedStation);

    let y = 55;
    doc.setFont("times", "normal");
    doc.setFontSize(10);

    // 1. Registry Details
    doc.setLineWidth(0.1);
    doc.rect(15, y, 180, 16); 
    doc.setFont("times", "bold");
    doc.text("1. District", 20, y + 6); doc.text("P.S.", 60, y + 6); doc.text("Year", 100, y + 6); doc.text("No.", 130, y + 6); doc.text("Date", 170, y + 6);
    doc.setFont("times", "normal");
    doc.text(rec.district || "Chandrapur", 20, y + 13); doc.text(rec.policeStation || data.selectedStation, 60, y + 13); doc.text(String(rec.year || new Date().getFullYear()), 100, y + 13); doc.text(rec.recordNumber || "Pending", 130, y + 13); doc.text(new Date().toLocaleDateString(), 170, y + 13);

    y += 25;

    // 2. Acts
    doc.setFont("times", "bold"); doc.text("2. Acts and Sections:", 15, y); y += 6;
    doc.setFont("times", "normal");
    const acts = rec.acts?.map(a => `${a.actName} (${a.section})`).join(", ") || "N/A";
    doc.text(doc.splitTextToSize(acts, 180), 15, y); y += 15;

    // 3. Occurrence
    doc.setFont("times", "bold"); doc.text("3. Occurrence of Offence:", 15, y); y += 6;
    doc.setFont("times", "normal");
    doc.text(`Date From: ${rec.occurrenceDate || "--"}   Time: ${rec.occurrenceTime || "--"}`, 15, y);
    y += 6;
    doc.text(`Information Received Date: ${new Date(data.createdAt).toLocaleDateString()}`, 15, y);
    y += 12;

    // 4. Complainant & Accused (WITH ALL DETAILS)
    y = checkPageBreak(doc, y, 80);
    doc.rect(15, y, 180, 70); 
    doc.line(105, y, 105, y + 70);

    const vImg = await getBase64ImageFromURL(data.victimIdPhoto);
    const sImg = await getBase64ImageFromURL(data.suspectIdPhoto);

    // Left: Victim
    if (vImg) doc.addImage(vImg, "JPEG", 20, y + 12, 25, 30);
    doc.setFont("times", "bold"); doc.text("4. Complainant / Victim:", 20, y + 6);
    doc.setFont("times", "normal");
    doc.text(`Name: ${data.victimTitle || ""} ${data.victimName}`, 50, y + 15);
    doc.text(`Age: ${data.victimAge || "--"} | Gender: ${data.victimGender}`, 50, y + 20);
    doc.text(`Mobile: ${data.victimContact}`, 50, y + 25);
    doc.text(`Aadhaar: ${data.victimAadhar || "N/A"}`, 50, y + 30);
    doc.text(doc.splitTextToSize(`Add: ${getFormattedAddress(data.victimAddress)}`, 50), 50, y + 36);

    // Right: Accused
    if (sImg) doc.addImage(sImg, "JPEG", 110, y + 12, 25, 30);
    doc.setFont("times", "bold"); doc.text("5. Accused / Suspect:", 110, y + 6);
    doc.setFont("times", "normal");
    doc.text(`Name: ${data.suspectName || "Unknown"}`, 140, y + 15);
    doc.text(`Age: ${data.suspectAge || "--"} | Gender: ${data.suspectGender || "--"}`, 140, y + 20);
    doc.text(`Mobile: ${data.suspectContact || "Unknown"}`, 140, y + 25);
    doc.text(doc.splitTextToSize(`Add: ${getFormattedAddress(data.suspectAddress)}`, 40), 140, y + 36);

    y += 80;

    // 6. Narrative
    y = checkPageBreak(doc, y, 40);
    doc.setFont("times", "bold"); doc.text("6. Narrative (First Information):", 15, y); y += 6;
    doc.setFont("times", "normal");
    
    // ✅ Full Description
    const fullText = `   Complaint received from ${data.reporterName}. \n   Incident Details: ${data.description}. \n   Based on the initial inquiry, this ${rec.recordType} is registered under the aforementioned sections.`;
    doc.text(doc.splitTextToSize(fullText, 180), 15, y);

    // Signature
    y = doc.internal.pageSize.height - 60; 
    await addSignature(doc, y, rec.investigatingOfficer, rec.rank);
    doc.save(`${rec.recordType}_${rec.recordNumber}.pdf`);
};

// ==========================================
// REPORT 3: CLOSURE REPORT (OPTIMIZED)
// ==========================================
export const generateFinalReport = async (data) => {
    const doc = new jsPDF();
    const rec = data.officialRecord || {};
    await addHeader(doc, "FINAL INVESTIGATION CLOSURE REPORT", rec.policeStation || data.selectedStation);

    let y = 55;
    doc.setFont("times", "normal");
    doc.setFontSize(10);

    // --- SECTION 1: CASE REFERENCE ---
    doc.setFillColor(245, 245, 245);
    doc.rect(15, y, 180, 12, 'F');
    doc.setDrawColor(0);
    doc.rect(15, y, 180, 12);
    
    doc.setFont("times", "bold");
    doc.text("FIR/NCR No:", 20, y + 8);
    doc.text("Date Filed:", 80, y + 8);
    doc.text("District:", 140, y + 8);
    
    doc.setFont("times", "normal");
    doc.text(rec.recordNumber || "Pending", 45, y + 8);
    doc.text(rec.recordDate ? new Date(rec.recordDate).toLocaleDateString() : "--", 100, y + 8);
    doc.text(rec.district || "Chandrapur", 155, y + 8);

    y += 18;

    // --- SECTION 2: INVOLVED PARTIES (Reporter | Victim | Suspect) ---
    // ✅ Expanded to include all details
    
    const vPhoto = await getBase64ImageFromURL(data.victimIdPhoto);
    const sPhoto = await getBase64ImageFromURL(data.suspectIdPhoto);
    
    // Draw outer box - Increased Height for Details
    const boxHeight = 65; 
    doc.rect(15, y, 180, boxHeight);
    
    // Vertical dividers
    doc.line(75, y, 75, y + boxHeight); // Split 1
    doc.line(135, y, 135, y + boxHeight); // Split 2

    // -- COL 1: REPORTER --
    doc.setFont("times", "bold");
    doc.text("REPORTER", 20, y + 6);
    doc.setFont("times", "normal");
    doc.text(`Name: ${data.reporterName}`, 20, y + 14);
    doc.text(`Date: ${new Date(data.createdAt).toLocaleDateString()}`, 20, y + 20);
    
    // -- COL 2: VICTIM --
    doc.setFont("times", "bold");
    doc.text("VICTIM", 80, y + 6);
    if (vPhoto) doc.addImage(vPhoto, "JPEG", 80, y + 10, 20, 25);
    doc.setFont("times", "normal");
    let vY = vPhoto ? 40 : 14; 
    doc.text(doc.splitTextToSize(`${data.victimTitle} ${data.victimName}`, 50), 80, y + vY);
    doc.text(`Age: ${data.victimAge} | ${data.victimGender}`, 80, y + vY + 5);
    doc.text(`Mob: ${data.victimContact}`, 80, y + vY + 10);
    doc.text(doc.splitTextToSize(`Add: ${getFormattedAddress(data.victimAddress)}`, 50), 80, y + vY + 15);

    // -- COL 3: SUSPECT --
    doc.setFont("times", "bold");
    doc.text("SUSPECT / ACCUSED", 140, y + 6);
    if (sPhoto) doc.addImage(sPhoto, "JPEG", 140, y + 10, 20, 25);
    doc.setFont("times", "normal");
    let sY = sPhoto ? 40 : 14;
    doc.text(doc.splitTextToSize(`${data.suspectName || "Unknown"}`, 40), 140, y + sY);
    doc.text(`Age: ${data.suspectAge || "--"} | ${data.suspectGender || "--"}`, 140, y + sY + 5);
    doc.text(doc.splitTextToSize(`Add: ${getFormattedAddress(data.suspectAddress)}`, 40), 140, y + sY + 15);

    y += boxHeight + 10;

    // --- SECTION 3: FULL DESCRIPTION & CHRONOLOGY ---
    doc.setFont("times", "bold");
    doc.text("3. Incident & Investigation Details:", 15, y);
    y += 6;
    doc.setFont("times", "normal");
    
    // ✅ Print Full Citizen Description first
    const fullDesc = `Complaint: ${data.description}`;
    const splitFullDesc = doc.splitTextToSize(fullDesc, 180);
    doc.text(splitFullDesc, 15, y);
    y += (splitFullDesc.length * 5) + 8;

    if (data.statusHistory && data.statusHistory.length > 0) {
        // Sort history by date
        const sortedHistory = data.statusHistory.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

        sortedHistory.forEach((entry, index) => {
            const dateStr = new Date(entry.timestamp).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' });
            const officer = entry.updatedBy || "Officer";
            const status = entry.status.toUpperCase();
            const remark = entry.remark || "Routine check.";

            const narrative = `${index + 1}. [${dateStr}] ${status}\n    Findgs: ${remark} (By: ${officer})`;
            
            const splitNarrative = doc.splitTextToSize(narrative, 175);
            
            // Smart Page Break
            y = checkPageBreak(doc, y, splitNarrative.length * 5 + 5);
            
            doc.text(splitNarrative, 20, y);
            y += (splitNarrative.length * 5) + 4; 
        });
    } else {
        doc.text("   No detailed investigation history recorded.", 20, y);
        y += 10;
    }

    y += 10;

    // --- SECTION 4: CONCLUSION ---
    y = checkPageBreak(doc, y, 40);
    doc.setLineWidth(0.5);
    doc.line(15, y, 195, y); // Separator line
    y += 10;

    doc.setFont("times", "bold");
    doc.text("FINAL ORDER / CONCLUSION:", 15, y);
    y += 7;
    doc.setFont("times", "normal");
    const conclusion = "Based on the investigation conducted, statements recorded, and evidence analyzed, the case is hereby CLOSED. The findings have been submitted to the judicial magistrate for record. No further police action is required at this stage.";
    doc.text(doc.splitTextToSize(conclusion, 180), 15, y);

    // --- SIGNATURE ---
    await addSignature(doc, y + 20, rec.investigatingOfficer, "Investigating Officer");

    doc.save(`Closure_Report_${data._id}.pdf`);
};