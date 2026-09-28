const express = require('express');
const fs = require('fs');

const app = express();
const PORT = 5000;
const filePath = __dirname + '/registrations.json';

app.use(express.json());

app.post('/registrations', (req, res) => {
    const { participantName, email, eventName } = req.body;

    if (!participantName || !email || !eventName) {
        return res.status(400).json({
            success: false,
            message: 'All fields are required'
        });
    }

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: 'Error reading registrations'
            });
        }

        const registrations = JSON.parse(data);

        const duplicate = registrations.find(
            registration =>
                registration.email === email &&
                registration.eventName === eventName
        );

        if (duplicate) {
            return res.status(409).json({
                success: false,
                message: 'Already registered for this event'
            });
        }

        const newRegistration = {
            id: registrations.length > 0
                ? registrations[registrations.length - 1].id + 1
                : 1,
            participantName,
            email,
            eventName
        };

        registrations.push(newRegistration);

        fs.writeFile(
            filePath,
            JSON.stringify(registrations, null, 2),
            err => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: 'Error saving registration'
                    });
                }

                res.status(201).json({
                    success: true,
                    message: 'Registration successful',
                    data: newRegistration
                });
            }
        );
    });
});

app.get('/registrations', (req, res) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: 'Error reading registrations'
            });
        }

        const registrations = JSON.parse(data);

        res.json({
            success: true,
            count: registrations.length,
            data: registrations
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});