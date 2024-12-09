const http = require('http');
const { parse } = require ('querystring');
const client = require('./db');

const server = http.createServer((req, res)=> {
    if(req.method === 'POST' && req.url === '/register') {
        let body = '';
        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', async () => {
            const { username, email, password } = JSON.parse(body);

            try {
                const result = await client.query(
                    'INSERT INTO public.users (username, email, password) VALUES ($1, $2, $3) RETURNING *;',
                    [username, email, password]
                );
                res.writeHead(201, {'Content-Type': 'application/json'});
                res.end(JSON.stringify({ message: 'User created', user: result.rows[0] }));
            } catch(error){
                console.error('Error registering user:', error);
                res.writeHead(500, {'Content-Type': 'application/json'})
                res.end(JSON.stringify({ error: 'Internal Server Error' }));
            }
        })
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Not Found' }));
    }
});

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
})