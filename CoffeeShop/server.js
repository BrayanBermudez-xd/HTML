const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
//const initDB = require('./config/db')
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5500;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Conexión a MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado a MongoDB'))
  .catch((err) => console.error('Error al conectar a MongoDB:', err));

// Modelo de Pedido
const pedidoSchema = new mongoose.Schema({
  nombre: String,
  drink: String,
  ounce: Number,
  shots: Number,
  precio: Number,
});

const Pedido = mongoose.model('Pedido', pedidoSchema);

// Ruta para crear un pedido
app.post('/api/pedidos', async (req, res) => {
  try {
    const nuevoPedido = new Pedido(req.body);
    const pedidoGuardado = await nuevoPedido.save();
    res.status(201).json(pedidoGuardado);
  } catch (err) {
    res.status(400).json({ error: 'Error al crear pedido' });
  }
});

// Ruta para obtener pedidos
app.get('/api/pedidos', async (req, res) => {
  try {
    const pedidos = await Pedido.find();
    res.json(pedidos);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener pedidos' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

//initDB()
