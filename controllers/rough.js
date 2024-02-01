const UserModel = require('./path-to-your-model');

app.post('/api/userData', authMiddleware.verifyToken, async (req, res) => {
    try {
        // The candidateID from the token (authenticated user)
        const authenticatedCandidateId = req.candidateId;

        // The candidateID from the request payload
        const requestedCandidateId = req.body.candidateID; // Assuming the client sends candidateID in the request body

        // Check if the authenticated user's candidateID matches the requested candidateID
        if (authenticatedCandidateId === requestedCandidateId) {
            // Retrieve data from MongoDB based on candidateID
            const userData = await UserModel.findOne({ candidateID: authenticatedCandidateId });

            if (userData) {
                // Return the user data
                res.json({ userData: userData });
            } else {
                // If user not found in MongoDB, handle accordingly
                res.status(404).json({ message: 'User not found in MongoDB' });
            }
        } else {
            // If authenticated user's candidateID does not match requested candidateID
            res.status(403).json({ message: 'Access denied. CandidateIDs do not match.' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});