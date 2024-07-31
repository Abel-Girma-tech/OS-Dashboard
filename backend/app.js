const express = require('express');
const cors = require('cors');
const os = require('os');
const server = 4000;

const app = express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true // Allow credentials if needed
}));

app.listen(server, (err) => {
  if (err) {
    console.error('Error starting the server:', err);
  } else {
    console.log(`Listening to the port ${server}`);
  }
});

// Convert uptime from seconds to hours
const uptimeInHours = (os.uptime() / 3600).toFixed(2); // 3600 seconds in an hour

const totalMemory = (os.totalmem() / (1024 ** 3)).toFixed(2);
const freeMemory = (os.freemem() / (1024 ** 3)).toFixed(2);
const machine = os.tmpdir();
const hostName = os.hostname();
const platform = os.platform(); // Get OS platform

// Map platform to human-readable format
const osType = {
  'win32': 'Windows',
  'darwin': 'macOS',
  'linux': 'Linux'
}[platform] || 'Unknown';

console.log('Total memory:', totalMemory, 'GB', 
            'Free Memory:', freeMemory, 'GB', 
            'Temporary Directory:', machine, 
            'Host Name:', hostName, 
            'Uptime (hours):', uptimeInHours,
            'Operating System:', osType);

app.get('/os/data', async (req, res) => {
  try {
    const data = {
      totalMemory: totalMemory + ' GB',
      freeMemory: freeMemory + ' GB',
      machin: machine,
      hostName: hostName,
      uptime: uptimeInHours + ' hours',
      osType: osType
    };

    return res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ "message": "Internal server error." });
  }
});
