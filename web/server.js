
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const fs = require('fs');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = 3000;

// Serve the frontend files
app.use(express.static(path.join(__dirname, 'public')));

// Handle socket connection
io.on('connection', (socket) => {
    console.log('A user connected');

    // Send signal data
    socket.on('requestSignalData', () => {
        fs.readFile('signal_data.csv', 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading signal data:', err);
                return;
            }
            socket.emit('signalData', data);
        });
    });

    // Send FFT data
    socket.on('requestFFTData', () => {
        fs.readFile('fft_data.csv', 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading FFT data:', err);
                return;
            }
            socket.emit('fftData', data);
        });
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

