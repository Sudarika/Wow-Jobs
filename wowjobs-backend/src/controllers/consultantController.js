const Consultant = require('../models/consultantModel');
const User = require('../models/userModel');
const { hashPassword, comparePassword, generateToken } = require('../middleware/auth');
const { validateConsultantUpdate } = require('../middleware/validation');

exports.consultantLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const consultant = await Consultant.findOne({ email });

        if (!consultant) {
            return res.status(404).json({ message: 'Consultant not found' });
        }

        const isValidPassword = await comparePassword(password, consultant.password);

        if (!isValidPassword) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        const token = generateToken(consultant);
        const id = consultant._id;
        res.status(200).json({ token, id });
    } catch (error) {
        console.error('Error logging in consultant:', error);
        res.status(500).json({ message: 'Error logging in consultant' });
    }
};


exports.consultantUpdate = async (req, res) => {
    try {
        const consultantId = req.params.consultantId;
        const updatedConsultant = await Consultant.findByIdAndUpdate(
            consultantId,
            { $set: req.body },
            { new: true }
        );

        if (!updatedConsultant) {
            return res.status(404).json({ message: 'Consultant not found or no changes were made' });
        }

        res.status(200).json(updatedConsultant);
    } catch (error) {
        console.error('Error updating consultant profile:', error);
        res.status(500).json({ message: 'Error updating consultant profile. Please try again.' });
    }
};


exports.viewConsultantProfile = async (req, res) => {
    try {
        const consultantId = req.params.consultantId;
        const consultant = await Consultant.findById(consultantId);
        if (!consultant) {
            return res.status(404).json({ message: 'Consultant not found' });
        }
        res.status(200).json(consultant);
    } catch (error) {
        console.error('Error fetching consultant profile:', error);
        res.status(500).json({ message: 'Error fetching consultant profile' });
    }
};

exports.updateConsultantProfile = async (req, res) => {
    try {
        const consultantId = req.params.consultantId;
        const updatedProfile = req.body;
        const updatedConsultant = await Consultant.findByIdAndUpdate(
            consultantId,
            { $set: { profile: updatedProfile } },
            { new: true }
        );
        if (!updatedConsultant) {
            return res.status(404).json({ message: 'Consultant not found' });
        }
        res.status(200).json(updatedConsultant);
    } catch (error) {
        console.error('Error updating consultant profile:', error);
        res.status(500).json({ message: 'Error updating consultant profile' });
    }
};


exports.viewAllSlots = async (req, res) => {
    try {
        const consultantId = req.params.consultantId;
        const consultant = await Consultant.findById(consultantId);
        if (!consultant) {
            return res.status(404).send('Consultant not found');
        }
        res.send(consultant.slots);
    } catch (error) {
        console.error('Error fetching slots:', error);
        res.status(500).send('Error fetching slots');
    }
};

exports.addSlot = async (req, res) => {
    try {
        const consultantId = req.params.consultantId;
        const { date, startTime, endTime } = req.body;
        const consultant = await Consultant.findById(consultantId);
        if (!consultant) {
            return res.status(404).send('Consultant not found');
        }
        consultant.slots.push({ date, startTime, endTime, availability: true, booked: null });
        await consultant.save();
        res.status(201).send('Slot added successfully');
    } catch (error) {
        console.error('Error adding slot:', error);
        res.status(500).send('Error adding slot');
    }
};


exports.deleteSlot = async (req, res) => {
    try {
        const consultantId = req.params.consultantId;
        const slotId = req.params.slotId;
        const consultant = await Consultant.findById(consultantId);
        if (!consultant) {
            return res.status(404).send('Consultant not found');
        }
        consultant.slots = consultant.slots.filter(slot => slot._id != slotId);
        await consultant.save();
        res.send('Slot deleted successfully');
    } catch (error) {
        console.error('Error deleting slot:', error);
        res.status(500).send('Error deleting slot');
    }
};


exports.acceptSlotRequest = async (req, res) => {
    try {
        const { requestId } = req.body;

        // Ensure req.user is defined and contains an id property
        if (!req.user || !req.user.id) {
            return res.status(401).send('Unauthorized');
        }

        const consultant = await Consultant.findById(req.user.id);
        if (!consultant) {
            return res.status(404).send('Consultant not found');
        }

        const index = consultant.slotReq.findIndex(req => req._id === requestId);
        if (index === -1) {
            return res.status(404).send('Slot request not found');
        }

        const acceptedRequest = consultant.slotReq.splice(index, 1)[0];
        consultant.acceptedReq.push(acceptedRequest);

        await consultant.save();
        res.send('Slot request accepted');
    } catch (error) {
        console.error('Error accepting slot request:', error);
        res.status(500).send('Error accepting slot request');
    }
};

exports.rejectSlotRequest = async (req, res) => {
    try {
        const { requestId } = req.body;

        // Ensure req.user is defined and contains an id property
        if (!req.user || !req.user.id) {
            return res.status(401).send('Unauthorized');
        }

        const consultant = await Consultant.findById(req.user.id);
        if (!consultant) {
            return res.status(404).send('Consultant not found');
        }

        const index = consultant.slotReq.findIndex(req => req._id === requestId);
        if (index === -1) {
            return res.status(404).send('Slot request not found');
        }

        const rejectedRequest = consultant.slotReq.splice(index, 1)[0];
        consultant.rejectedReq.push(rejectedRequest);

        await consultant.save();
        res.send('Slot request rejected');
    } catch (error) {
        console.error('Error rejecting slot request:', error);
        res.status(500).send('Error rejecting slot request');
    }
}

exports.viewAllSlotRequests = async (req, res) => {
    try {
        const consultantId = req.params.consultantId;
        const consultant = await Consultant.findById(consultantId).populate('slotReq.userId');
        if (!consultant) {
            return res.status(404).send('Consultant not found');
        }
        const slotRequests = consultant.slotReq;
        res.json(slotRequests);
    } catch (error) {
        console.error('Error fetching slot requests:', error);
        res.status(500).send('Error fetching slot requests');
    }
};





