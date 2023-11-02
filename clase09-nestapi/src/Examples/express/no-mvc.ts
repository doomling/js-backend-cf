// const express = require('express');
// const app = express();
// const PORT = 3000;

// // Permite a Express entender datos de formularios y JSON
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// // Configuración para usar EJS como motor de plantillas
// app.set('view engine', 'ejs');

// // Datos almacenados en memoria
// const messages = [];

// // Ruta para mostrar el formulario y los mensajes
// app.get('/', (req, res) => {
//   res.render('index', { messages });
// });

// // Ruta para manejar la creación de un mensaje
// app.post('/messages', (req, res) => {
//   const { text } = req.body;
//   if (text) {
//     const message = { id: messages.length + 1, text };
//     messages.push(message);
//     res.redirect('/');
//   } else {
//     res.status(400).send('Bad Request');
//   }
// });

// // Iniciar el servidor
// app.listen(PORT, () => {
//   console.log(`Servidor escuchando en el puerto ${PORT}`);
// });
