const authenticateApiKey = (req, res, next) => {
    const apiKey = req.headers['x-api-key'];
    
    if (!apiKey) {
        return res.status(401).json({ 
            message: 'API Key required',
            error: 'Missing x-api-key header'
        });
    }
    
    if (apiKey !== process.env.API_KEY) {
        return res.status(401).json({ 
            message: 'Invalid API Key',
            error: 'Unauthorized access'
        });
    }
    
    next();
};

module.exports = authenticateApiKey;
