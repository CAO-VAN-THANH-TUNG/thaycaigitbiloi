import http from 'http';
import os from 'os';
import { writeFile } from 'fs';
import Logger from './logger.js';

const logger = new Logger();

const hostname = '127.0.0.1';
const port = 3000;

logger.on('print computer\'s infos ', (args) => {
    console.log('Completed task!')
});

var information = {
    OSType: os.type(),
    Platform: os.platform(),
    RAM: os.totalmem(),
    USERRAM: os.totalmem() - os.freemem(),
    CPU: os.cpus()
};

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain')
    res.end(JSON.stringify(information, null, 2));
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/ `);
});

writeFile('D:\\Laptrinhmanguonmo\\nodejsda\\Homework\\homework.txt', JSON.stringify(information, null, 2), (err) => {
    if (err) {
        console.log(err);
        return;
    }
    logger.log('print computer\'s infos')
});