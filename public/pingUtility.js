let pingInterval;
let pingHistory = [];

async function startPing() {
  const host = document.getElementById('host').value;
  const interval = document.getElementById('interval').value;
  const resultElement = document.getElementById('pingResult');
  resultElement.textContent = `Pinging ${host} continuously...`;

  const response = await fetch(`/start-ping?host=${host}&interval=${interval}`);
  const data = await response.json();
  if (data.status === 'success') {
    resultElement.textContent = `Started pinging ${host}. You can stop it anytime.`;
  } else {
    resultElement.textContent = data.message;
  }
}

async function stopPing() {
  const resultElement = document.getElementById('pingResult');
  
  const response = await fetch('/stop-ping');
  const data = await response.json();
  if (data.status === 'success') {
    resultElement.textContent = data.message;
  } else {
    resultElement.textContent = 'Failed to stop pinging.';
  }
}
