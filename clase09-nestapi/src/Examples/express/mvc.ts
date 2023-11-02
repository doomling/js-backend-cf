const express = require('express');
const app = express();
const PORT = 3000;

// Permite a Express entender datos de formularios y JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configuración para usar EJS como motor de plantillas
app.set('view engine', 'ejs');

// Modelo
const messages = [];

// Controlador
const MessagesController = {
  findAll: (req, res) => {
    res.render('messages', { messages });
  },
  create: (req, res) => {
    const { text } = req.body;
    if (text) {
      const message = { id: messages.length + 1, text };
      messages.push(message);
      res.redirect('/messages');
    } else {
      res.status(400).send('Bad Request');
    }
  },
};

// Rutas
app.get('/messages', MessagesController.findAll);
app.post('/messages', MessagesController.create);

// Vista simple para mostrar mensajes y un formulario para enviarlos
app.get('/', (req, res) => {
  res.render('index');
});

// Iniciando el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
