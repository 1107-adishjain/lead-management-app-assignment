const Lead = require('../models/Lead');

// Controller to create a new lead
exports.createLead = async (req, res) => {
    try {
        const { name, email, phone } = req.body;

        // Basic validation
        if (!name || !email || !phone) {
            return res.status(400).json({ message: 'Please provide name, email, and phone.' });
        }

        // Check if lead with the same email already exists
        const existingLead = await Lead.findOne({ email });
        if (existingLead) {
            return res.status(409).json({ message: 'A lead with this email already exists.' });
        }

        const newLead = new Lead({
            name,
            email,
            phone,
        });

        await newLead.save();

        res.status(201).json({ message: 'Lead created successfully', lead: newLead });

    } catch (error) {
        console.error('Error creating lead:', error);
        res.status(500).json({ message: 'Server error while creating lead.' });
    }
};

// Controller to get all leads
exports.getLeads = async (req, res) => {
    try {
        const leads = await Lead.find().sort({ createdAt: -1 }); 
        res.status(200).json(leads);
    } catch (error) {
        console.error('Error fetching leads:', error);
        res.status(500).json({ message: 'Server error while fetching leads.' });
    }
};