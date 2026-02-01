const http = require('http');

async function testRateLimit() {
    console.log("🚀 Testing Rate Limiter (Max 5 req/min)...");

    const url = 'http://localhost:3000/api/v1/upload-file/view/test.jpg';

    for (let i = 1; i <= 7; i++) {
        await new Promise(resolve => {
            const req = http.get(url, (res) => {
                console.log(`Request ${i}: Status ${res.statusCode}`);
                res.emit('close'); // Consume data to free memory
                resolve();
            });

            req.on('error', (e) => {
                console.error(`Request ${i} error:`, e);
                resolve();
            });
        });
    }
}

testRateLimit();
