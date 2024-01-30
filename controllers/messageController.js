const messageModel = require('../model/message')

messsageController = {
    newMessage: async (req, res) => {
        try {
            const { sender, text, timestamp } = req.body;
            const newMessage = new messageModel({ sender, text, timestamp });
            await newMessage.save();
            res.status(201).json(newMessage);
        } catch (error) {
            console.error('Error adding message:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
   
    getMessage: async (req, res) => {
        try {
            const messages = await messageModel.find();
            res.json(messages);
        } catch (error) {
            console.error('Error fetching messages:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};

module.exports = messsageController