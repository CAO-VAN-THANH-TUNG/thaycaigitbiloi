import http from "node:http"
import path from "node:path";
import os from "node:os"
import fs from "node:fs"
import EventEmitter from 'node:events';

const eventEmitter = new EventEmitter();

eventEmitter.on("end", (number, x) => {
    console.log(`done ${number} ${x} !!!`);
})
eventEmitter.emit("end", 1, 4)
eventEmitter.emit("end", 2, 3)
eventEmitter.emit("end", 5, 6)
    // const notes = '/users/joe/notes.txt';
    // let name = "abc"
    // let file = "xyz.txt"

// path.basename(notes)
// let a = path.join(name, file)
// console.log(os.arch())


// fs.readFile('./hello.txt', 'utf8', (err, data) => {
//     if (err) {
//         console.error(err);
//         return;
//     }
//     console.log(data);
// });

// let data = fs.readFileSync('./hello.txt', 'utf8');

fs.writeFileSync("./hello.txt", "hello.txt");
console.log('abc')

// // import { hello } from "./demo_modules.mjs";
// hello();


http
    .createServer((request, response) => {
        response.writeHead(200, {
            "Content-Type": 'text/html; charset=utf-8'
        });
        response.write('<h1>An, An !</h1>');
        response.end();

    })
    .listen(2000);