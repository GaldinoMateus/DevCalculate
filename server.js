const { request, response } = require("express");
const express = require("express")
const server = express()
const routes = require("./routes")
const path = require("path");
const { dirname } = require("path");

// utilizando template engine
server.set('view engine', 'ejs')


//habilitar aquivos estaticos - static file
server.use(express.static("public"))

// Mudar a localização da pasta views

server.set('views', path.join(__dirname,'views')) //Views dentro do src


//usar o req.body
server.use(express.urlencoded({ extended: true}))

//routes
server.use(routes);

server.listen(3000,() => console.log('rodando'));


