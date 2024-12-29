const express = require('express');
const exec = require('child_process').exec;
const app = express();
const port = 3001;

app.use(express.static('public')); // Serve static files like index.html

app.get('/start-ping', (req, res) => {
  const host = req.query.host || 'google.com';
  res.json({ status: 'success', message: `Started pinging ${host}.` });
});

app.get('/ping', (req, res) => {
  const host = req.query.host || 'google.com';
  exec(`ping -n 1 ${host}`, (err, stdout, stderr) => {
    if (err) {
      res.json({ status: 'error', message: 'Host not reachable.' });
    } else {
      const time = stdout.match(/time=(\d+)ms/);
      res.json({ status: 'success', time: time ? time[1] : 'N/A' });
    }
  });
});

app.get('/traceroute', (req, res) => {
  const host = req.query.host || 'google.com';
  exec(`tracert ${host}`, (err, stdout, stderr) => {
    if (err) {
      res.json({ status: 'error', message: 'Traceroute failed.' });
    } else {
      res.json({ status: 'success', trace: stdout });
    }
  });
});

app.get('/active-connections', (req, res) => {
  exec('netstat -an', (err, stdout, stderr) => {
    if (err) {
      res.json({ status: 'error', message: 'Failed to fetch active connections.' });
    } else {
      res.json({ status: 'success', connections: stdout });
    }
  });
});

app.listen(port, () => {
  console.log(`Network utility app running on http://localhost:${port}`);
});
