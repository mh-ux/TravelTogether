const Group = require('../models/Group');
const User = require('../models/User');
const { validationResult } = require('express-validator');

const createGroup = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    const { name, description } = req.body;

    try {
        const group = new Group({
            name,
            description,
            members: [{ user: req.user.id, role: 'admin' }],
        });
        const createdGroup = await group.save();
        res.status(201).json(createdGroup);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const inviteMember = async (req, res) => {
    const { groupId, email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const group = await Group.findById(groupId);
        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }

        if (group.members.some(member => member.user.toString() === user._id.toString())) {
            return res.status(400).json({ message: 'User is already a member of this group' });
        }

        group.members.push({ user: user._id, role: 'member' });
        await group.save();

        res.status(200).json({ message: 'Member added successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const getGroup = async (req, res) => {
    try {
        const group = await Group.findById(req.params.groupId).populate('members.user', 'name email');
        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }

        res.json(group);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    createGroup,
    inviteMember,
    getGroup,
};
