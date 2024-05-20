const http = require('http');

const server = http.createServer((req, res) => {
    // Парсимо URL для отримання логіна з запиту
    const url = new URL(req.url, `http://${req.headers.host}`);
    const login = url.searchParams.get('login');

    // Додавання заголовків для CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (login == 'is-22fiot-22-068') {
        // Відповідь з особистими даними
        const personalData = {
            surname: 'Ковальчук',
            name: 'Андрій',
            course: '2',
            group: 'ІС-22'
        };

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(personalData));
    } else {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('Login parameter is missing');
    }
});

const port = 3000;
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

