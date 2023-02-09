require('dotenv').config()
const express = require('express')
const hbs = require('hbs');


const app = express()
const port = process.env.PORT;

// Handlebars
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials', function (err) {});

// Servir contenido estatico
app.use( express.static('public') );

app.get('/', (req, res) => {
    res.render('home', {
        nombre: 'Taiel Nunes',
        titulo: 'Home Page'
    });
})

app.get('/generic', (req, res) => {
    res.render('generic', {
        nombre: 'Taiel Nunes',
        titulo: 'Generic Page'
    });
})

app.get('/elements', (req, res) => {
    res.render('elements', {
        nombre: 'Taiel Nunes',
        titulo: 'Elements Page'
    });
})

app.listen(port);