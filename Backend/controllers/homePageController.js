const FAQ = require('../models/FAQ');
const HomeSettings = require('../models/HomeSettings');
const Feedback = require('../models/Feedback');

// 1. Get All Public Content (Marquee, FAQs, Featured Reviews)
//    Accessed by: Home Page (Public)
const getPublicContent = async (req, res) => {
  try {
    // A. Fetch Marquee
    let settings = await HomeSettings.findOne({ type: 'general' });
    if (!settings) {
        // Create default if not exists
        settings = await HomeSettings.create({});
    }

    // B. Fetch FAQs
    const faqs = await FAQ.find().sort({ createdAt: -1 });

    // C. Fetch Featured Reviews (Only 5 stars or explicitly featured)
    const featuredReviews = await Feedback.find({ isFeatured: true, type: 'Review' })
        .populate('user', 'firstName lastName idPhoto role designation')
        .sort({ createdAt: -1 });

    res.json({
        marquee: settings.marqueeText,
        faqs,
        featuredReviews
    });

  } catch (error) {
    console.error("Home Content Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// 2. Update Marquee Text
//    Accessed by: Admin
const updateMarquee = async (req, res) => {
    try {
        const { text } = req.body;
        await HomeSettings.findOneAndUpdate(
            { type: 'general' },
            { marqueeText: text },
            { upsert: true, new: true }
        );
        res.json({ message: "Marquee Updated" });
    } catch (error) {
        res.status(500).json({ message: "Update Failed" });
    }
};

// 3. Add FAQ
//    Accessed by: Admin
const addFAQ = async (req, res) => {
    try {
        const { question, answer } = req.body;
        const newFaq = await FAQ.create({ question, answer });
        res.status(201).json(newFaq);
    } catch (error) {
        res.status(500).json({ message: "Add Failed" });
    }
};

// 4. Delete FAQ
//    Accessed by: Admin
const deleteFAQ = async (req, res) => {
    try {
        await FAQ.findByIdAndDelete(req.params.id);
        res.json({ message: "Deleted" });
    } catch (error) {
        res.status(500).json({ message: "Delete Failed" });
    }
};

// 5. Toggle Review "Featured" Status
//    Accessed by: Admin
const toggleReviewFeature = async (req, res) => {
    try {
        const review = await Feedback.findById(req.params.id);
        if(!review) return res.status(404).json({ message: "Not found" });

        review.isFeatured = !review.isFeatured;
        await review.save();
        res.json({ message: "Status Toggled", isFeatured: review.isFeatured });
    } catch (error) {
        res.status(500).json({ message: "Toggle Failed" });
    }
};

module.exports = {
    getPublicContent,
    updateMarquee,
    addFAQ,
    deleteFAQ,
    toggleReviewFeature
};