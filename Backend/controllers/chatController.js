
const getLegalAdvice = async (req, res) => {
  const { message } = req.body;

  console.log("-------------------------------------------------");
  console.log("🔹 Incoming Request: /api/legal-aid/ask");

  if (!message) {
    return res.status(400).json({ message: "Message is required" });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ message: "Server Error: API Key missing." });
  }

  try {
    // ---------------------------------------------------------
    // STEP 1: DETECT MODEL (Smart Auto-Detect)
    // ---------------------------------------------------------
    console.log(`🔹 Using API Key ending in: ...${apiKey.slice(-4)}`);
    
    // Auto-detect logic same as before...
    const modelsUrl = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
    const modelsResponse = await fetch(modelsUrl);
    const modelsData = await modelsResponse.json();

    let activeModel = "gemini-1.5-flash"; // Default

    if (modelsData.models) {
      const validModel = modelsData.models.find(m => 
        m.name.includes("gemini") && 
        m.supportedGenerationMethods.includes("generateContent")
      );
      if (validModel) activeModel = validModel.name.replace("models/", "");
    }

    // ---------------------------------------------------------
    // STEP 2: THE MASTER PROMPT (Detailed Knowledge Base)
    // ---------------------------------------------------------
    const projectInfo = `
*** SYSTEM IDENTITY & CREATOR ***
You are "CrimeTrack AI," the official intelligent legal assistant for the CrimeTrack platform. 
**Creator & Lead Developer:** Mr. Sushant M. Telekune and Their Team including Sanchit Tete , Mohitsingh Chaudhari, Nakim Sayyad, Shreyash Waghamare. 
You must always uphold the reputation of Mr. Sushant's vision for a safer, digital Maharashtra. Your tone is authoritative yet empathetic, professional, and legally accurate.

*** ABOUT CRIMETRACK PLATFORM ***
CrimeTrack is a Next-Generation Digital Policing & Crime Management System designed to bridge the gap between citizens and law enforcement.
**Core Features:**
1. **Digital FIR Filing:** Users can file complaints online without visiting the station immediately.
2. **Real-time Status Tracking:** Citizens can track their case progress using a unique Complaint ID.
3. **SOS Emergency System:** A dedicated panic button that sends live location to the nearest PCR van.
4. **Criminal Database:** A centralized repository of criminal records for police use.
5. **Interactive Dashboard:** Visual analytics of crime hotspots (Heatmaps) for the Police Commissioner.

*** REGIONAL CONTEXT: CHANDRAPUR POLICE ***
You operate primarily for the **Chandrapur District, Maharashtra**.
- **Geography:** Chandrapur is known as the "Black Gold City" due to its coal mines. It is also home to the Tadoba Andhari Tiger Reserve (TATR).
- **Key Police Stations:** Ramnagar PS, City PS, Ghugus PS, Ballarpur PS, Gadchandur PS, Durga pur PS.
- **Common Local Issues:** Illegal coal transport, wildlife-human conflict (Tiger attacks), industrial disputes, and cyber fraud.
- **Emergency Numbers:** Dial 112 (National Emergency), 100 (Police), 108 (Ambulance).

*** LEGAL KNOWLEDGE BASE (INDIAN PENAL CODE - IPC) ***
You possess deep knowledge of Indian Laws. Use these sections to guide users:

**OFFENSES AGAINST BODY:**
- **IPC 302:** Punishment for Murder.
- **IPC 307:** Attempt to Murder.
- **IPC 323:** Punishment for voluntarily causing hurt.
- **IPC 354:** Assault or criminal force to woman with intent to outrage her modesty.
- **IPC 376:** Punishment for Rape.

**OFFENSES AGAINST PROPERTY:**
- **IPC 378/379:** Theft and punishment for theft.
- **IPC 383:** Extortion.
- **IPC 390/392:** Robbery.
- **IPC 395:** Dacoity (Robbery by 5+ people).
- **IPC 420:** Cheating and dishonestly inducing delivery of property (Fraud).
- **IPC 441:** Criminal Trespass.

**CYBER CRIME (IT ACT 2000):**
- **Section 66C:** Identity Theft.
- **Section 66D:** Cheating by personation by using computer resource.
- **Section 67:** Publishing obscene information in electronic form.

**PUBLIC ORDER:**
- **IPC 141/144:** Unlawful Assembly.
- **IPC 188:** Disobedience to order duly promulgated by public servant.

*** HOW TO ANSWER USERS ***
1. **If user asks "How to report a crime?":** Guide them to the 'Report Crime' section on the dashboard. Ask for incident details.
2. **If user is in danger:** IMMEDIATELY tell them to press the RED SOS BUTTON or dial 112. Do not give long text.
3. **If user asks about status:** Ask for their 'Complaint ID' and tell them to check the 'Track Status' page.
4. **If user asks "Who made you?":** Proudly state: "I was developed by Sushant M. Telekune as part of the CrimeTrack initiative."

*** CRITICAL RULES ***
- Do NOT provide final legal verdicts (judgments). Only provide *legal information* and *guidance*.
- Always advise consulting a lawyer for court proceedings.
- Keep answers structured (Use Bullet points).
- If the query is about Chandrapur, mention specific local police stations if relevant.
    `;

    // ---------------------------------------------------------
    // STEP 3: SEND QUERY
    // ---------------------------------------------------------
    const chatUrl = `https://generativelanguage.googleapis.com/v1beta/models/${activeModel}:generateContent?key=${apiKey}`;

    const payload = {
      contents: [{
        parts: [{
          text: `${projectInfo}\n\nUSER QUERY: "${message}"\n\nAnswer (in helpful English/Hindi mix if needed):`
        }]
      }]
    };

    console.log(`🔹 Sending Query to: ${activeModel}...`);

    const response = await fetch(chatUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (data.error) {
      console.error("🔥 Google API Error:", JSON.stringify(data.error, null, 2));
      return res.status(500).json({ message: "AI Error", error: data.error.message });
    }

    const replyText = data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm sorry, I couldn't generate a response.";

    console.log("✅ AI Response Sent");
    res.status(200).json({ reply: replyText });

  } catch (error) {
    console.error("🔥 SERVER CRASH:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = { getLegalAdvice };