// Importamos las bibliotecas necesarias. 
// Concretamente el framework express
const express = require('express');

// Inicializamos la aplicación
const app = express();

// Indicamos que la aplicación puede recibir JSON (API Rest)
app.use(express.json());

// Indicamos el puerto en el que vamos a desplegar la aplicación
const port = process.env.PORT || 8080;

// Arrancamos la aplicación
app.listen(port, () => {
    console.log('Servidor desplegado por ' + port);
});

// Definimos una estructura de datos 
// (temporal hasta incorporar una base de datos)
let concesionarios = [
    {nombre: "Opel", localizacion: "C/ Falsa 123", 
        coches: [{modelo: "Corsa", cv:75, precio: 12345 }] },
    {nombre: "Ford", localizacion: "C/ Falsa 456", 
        coches: [{modelo: "Fiesta", cv:90, precio: 13425 }] },
    {nombre: "Peugeot", localizacion: "C/ Falsa 789", 
        coches: [{modelo: "208", cv:110, precio: 15432 }] },
]

app.get('/concesionarios',  (req, res) => {
    res.json(concesionarios);
});

app.post('/concesionarios', (req, res) => {
    concesionarios.push(req.body);
    res.json(concesionarios);
});

app.get('/concesionarios/:id', (req, res) => {
    const id = parseInt(req.params.id);
    console.log(concesionarios.length)
    const isIdInvalido = isNaN(id) || id >= concesionarios.length || id < 0;

    if(isIdInvalido) {
        res.status(404).json({ error: 404, message: "Id inválida" });
    } else {
        const result = concesionarios[id];
        res.json(result);
    }
});

app.put('/concesionarios/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const isIdInvalido = isNaN(id) || id >= concesionarios.length || id < 0;
    
    if(isIdInvalido) {
        res.status(404).json({ error: 404, message: "Id inválida" });
    } else {
        concesionarios[id] = req.body;
        res.json(concesionarios);
    }
});

app.delete('/concesionarios/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const isIdInvalido = isNaN(id) || id >= concesionarios.length || id < 0;
    
    if(isIdInvalido) {
        res.status(404).json({ error: 404, message: "Id inválida" });
    } else {
        concesionarios = concesionarios.filter(item => concesionarios.indexOf(item) !== id);

        res.json(concesionarios);
    }
});



// --------------------------------------

app.get('/concesionarios/:id/coches', (req, res) => {
    const id = parseInt(req.params.id);
    const isIdInvalido = isNaN(id) || id >= concesionarios.length || id < 0;
    
    if(isIdInvalido) {
        res.status(404).json({ error: 404, message: "Id inválida" });
    } else {
        const result = concesionarios[id].coches;
        
        res.json(result);
    }
});


app.post('/concesionarios/:id/coches', (req, res) => {
    const id = parseInt(req.params.id);
    const isIdInvalido = isNaN(id) || id >= concesionarios.length || id < 0;
    
    if(isIdInvalido) {
        res.status(404).json({ error: 404, message: "Id inválida" });
    } else {
        concesionarios[id].coches.push(req.body);
        const result = concesionarios[id].coches;
        res.json(result);
    }
});



app.get('/concesionarios/:id/coches/:cocheId', (req, res) => {
    const id = parseInt(req.params.id);
    const cocheId = parseInt(req.params.cocheId);
    const isIdInvalido = isNaN(id) || id >= concesionarios.length || id < 0;
    
    if(isIdInvalido) {
        res.status(404).json({ error: 404, message: "Id inválida" });
    } else {
        const result = concesionarios[id].coches[cocheId];
        res.json(result);
    }
});

app.put('/concesionarios/:id/coches/:cocheId', (req, res) => {
    const id = parseInt(req.params.id);
    const cocheId = parseInt(req.params.cocheId);
    const isIdInvalido = isNaN(id) || id >= concesionarios.length || id < 0;
    
    if(isIdInvalido) {
        res.status(404).json({ error: 404, message: "Id inválida" });
    } else {
        concesionarios[id].coches[cocheId] = req.body;
        const result = concesionarios[id].coches;
        res.json(result);
    }
});



app.delete('/concesionarios/:id/coches/:cocheId', (req, res) => {
    const id = parseInt(req.params.id);
    const cocheId = parseInt(req.params.cocheId);
    const isIdInvalido = isNaN(id) || id >= concesionarios.length || id < 0;
    
    if(isIdInvalido) {
        res.status(404).json({ error: 404, message: "Id inválida" });
    } else {
        let coches = concesionarios[id].coches;
        coches = coches.filter(item => coches.indexOf(item) !== cocheId);
        concesionarios[id].coches = coches;

        res.json(concesionarios[id].coches);
    }
});