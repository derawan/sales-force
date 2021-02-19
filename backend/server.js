//let express = require('express');  - CommonJS
// import express from 'express';       // ES - Ecmascript

// // create instance
// let app = express();

// // inisialisasi middleware

// // inisialisasi routenya
// app.get('/', (req, res) => {
//     res.send('hallo selamat datang adsfasfasdfdasfas!!!');
// })

// // listening
// let applicationPort = 3000;
// app.listen(applicationPort, ()=>{
//     console.log(`Server is listening on ${applicationPort}`);
// });


import App from './core/app';

const app = new App();
      app.start();