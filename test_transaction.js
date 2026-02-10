const http = require('http');

const data = JSON.stringify({
    id: 'TX-TEST-001',
    type: 'distribution',
    sender: 'gateway_btc', // Mengubah 'from' menjadi 'sender' sesuai standar AI Guard
    amount: 1000,
    to: 'citizen_001',
    description: 'Initial Living Value Test'
});

const options = {
    hostname: '127.0.0.1',
    port: 5000,
    path: '/transfer',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
    }
};

const req = http.request(options, (res) => {
    let responseData = '';
    res.on('data', (chunk) => { responseData += chunk; });
    res.on('end', () => {
        console.log('🛡️  AI Guard Analysis:', responseData);
    });
});

req.on('error', (err) => {
    console.error('❌ Koneksi Gagal:', err.message);
});

req.write(data);
req.end();
