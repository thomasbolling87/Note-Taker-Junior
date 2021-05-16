// Required dependencies
const express = require('express');
const fs = require('fs');
const path = require('path');

// Activating express in app
const app = express();
const PORT =  3000;

// data parsing
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname));
app.use(express.json());

require('./routing/routes.js');

// Listener statement
app.listen(PORT, function() {
    console.log(`App is listening on PORT: ${PORT}`);
});