const http = require('http');
const os = require('os');
const fs = require('fs/promises');
const path = require('path');
const EventEmitter = require('events');


const systemInfo = {
    OSType: os.type(),
    Platform: os.platform(),
    RAM: os.totalmem(),
    USEDRAM: os.totalmem() - os.freemem(),
    CPU: os.cpus()
};

const eventEmitter = new EventEmitter();
const filePath = path.join('D:', 'Buoi2', 'systemInfo.json');

async function saveSystemInfoToFile(filePath, data) {
    try {
        await fs.mkdir(path.dirname(filePath), { recursive: true });
        await fs.writeFile(filePath, JSON.stringify(data, null, 2));
        eventEmitter.emit('fileSaved');
    } catch (err) {
        console.error('Error writing file:', err);
    }
}

eventEmitter.on('fileSaved', () => {
    console.log('System information successfully saved to file.');
    console.log('Completed task!'); 
});

http
    .createServer((request, response) => {
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify(systemInfo, null, 2));
    })
    .listen(8080, () => {
        console.log('Server is running on http://localhost:8080'); 
        saveSystemInfoToFile(filePath, systemInfo);
    });