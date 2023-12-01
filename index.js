const express = require('express');
const app = express();
const port = 3001;
const {sequelize} = require('./connection');
const {Usuario, Productos, Factura, DetalleFactura} = require('./models');

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Factura!');
});

// Crear Usuario
app.post('/usuarios', async (req, res) => {
    try {
      const usuario = await Usuario.create(req.body);
      res.status(201).json(usuario);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

// Leer Usuario
  app.get('/usuarios', async (req, res) => {
    try {
      const usuarios = await Usuario.findAll();
      res.status(200).json(usuarios);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

// Update Usuario
app.put('/usuarios/:id', async (req, res) => {
    try {
      const usuario = await Usuario.findByPk(req.params.id);
      if (usuario) {
        await usuario.update(req.body);
        res.status(200).json(usuario);
      } else {
        res.status(404).json({ error: 'Usuario no encontrado' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

// Delete Usuario
app.delete('/usuarios/:id', async (req, res) => {
    try {
      const usuario = await Usuario.findByPk(req.params.id);
      if (usuario) {
        await usuario.destroy();
        res.status(200).json({ message: 'Usuario eliminado' });
      } else {
        res.status(404).json({ error: 'Usuario no encontrado' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

// Conexion

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection success');
    return sequelize.sync();
  })
  .then(() => {
    console.log('Sync models');
    app.listen(port, () => {
      console.log(`Server listen on http://localhost:${port} Factura ORM`);
    });
  })
  .catch((error) => {
    console.error('Connection fail', error);
  });







