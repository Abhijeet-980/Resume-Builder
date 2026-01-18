const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('./')); // Serve static files from root

// Simple in-memory rate limiting
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const RATE_LIMIT_MAX = 5; // Max 5 requests per minute per IP

function rateLimit(req, res, next) {
    const ip = req.ip || req.connection.remoteAddress;
    const now = Date.now();

    if (!rateLimitMap.has(ip)) {
        rateLimitMap.set(ip, { count: 1, firstRequest: now });
        return next();
    }

    const data = rateLimitMap.get(ip);

    // Reset window if expired
    if (now - data.firstRequest > RATE_LIMIT_WINDOW) {
        rateLimitMap.set(ip, { count: 1, firstRequest: now });
        return next();
    }

    // Check rate limit
    if (data.count >= RATE_LIMIT_MAX) {
        return res.status(429).json({
            success: false,
            message: 'Too many requests. Please try again later.'
        });
    }

    data.count++;
    next();
}

// Messages storage file
const MESSAGES_FILE = path.join(__dirname, 'contact_messages.json');

// Helper to read messages
function readMessages() {
    try {
        if (fs.existsSync(MESSAGES_FILE)) {
            const data = fs.readFileSync(MESSAGES_FILE, 'utf8');
            return JSON.parse(data);
        }
    } catch (err) {
        console.error('Error reading messages file:', err);
    }
    return [];
}

// Helper to write messages
function writeMessages(messages) {
    try {
        fs.writeFileSync(MESSAGES_FILE, JSON.stringify(messages, null, 2));
        return true;
    } catch (err) {
        console.error('Error writing messages file:', err);
        return false;
    }
}

// Contact API endpoint
app.post('/api/contact', rateLimit, (req, res) => {
    const { name, email, subject, message } = req.body;

    // Validation
    if (!email || !email.includes('@')) {
        return res.status(400).json({
            success: false,
            message: 'Please provide a valid email address.'
        });
    }

    if (!message || !message.trim()) {
        return res.status(400).json({
            success: false,
            message: 'Please provide a message.'
        });
    }

    // Create message object
    const newMessage = {
        id: Date.now().toString(),
        name: name || 'Anonymous',
        email: email.trim(),
        subject: subject || 'General Inquiry',
        message: message.trim(),
        timestamp: new Date().toISOString(),
        read: false
    };

    // Save to file
    const messages = readMessages();
    messages.push(newMessage);

    if (writeMessages(messages)) {
        console.log(`New contact message from ${email}`);
        return res.status(200).json({
            success: true,
            message: 'Thanks — your message has been sent. We\'ll be in touch soon.'
        });
    } else {
        return res.status(500).json({
            success: false,
            message: 'Failed to save message. Please try again.'
        });
    }
});

// Get all messages (for admin purposes)
app.get('/api/contact/messages', (req, res) => {
    const messages = readMessages();
    res.json({ success: true, messages });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Resume Builder server running at http://localhost:${PORT}`);
    console.log(`📧 Contact API available at http://localhost:${PORT}/api/contact`);
});
