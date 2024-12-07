const http = require('http');
const os = require('os');
const fs = require('fs/promises');
const path = require('path');
const EventEmitter = require('events');

// function sum(a, b, fun){
//     let c = 0;
//     setTimeout(() => {
//         c = a+b;
//         fun(c)
//     }, 0);
//     let a = sum(1, 4, function (data){
//         console(data)
//     });
// }

function getUserID(fn){
    setTimeout(() => {
     userID = 10;   
    });
}
function getPostUser(userID){
    setTimeout(() => {
     post = {id: 12, name: "hot"}   
    });
}

function getCommentPostUser(userID){
    setTimeout(() => {
     comment = {id: 13, name: "hot"}   
    });
}

// getUserID(userID, function (){
//     getPostUser(userID, function (post){
//         getCommentPostUser(post, function (comment){
//             console.log(comment);
//         });
//     });
// });


let abc = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("Hello resolve");
    }, 0);
});

abc.then((data) => {
    console.log(data);
    getPostUser(data, function(post){
        return post;
    })
})
    .then((post) => {
        getCommentPostUser(post, function (comment){
            console.log(comment);
        });
    
}).catch((data) => {
    console.log(data)
}).finally(()=>{
    console.log("finally");
});