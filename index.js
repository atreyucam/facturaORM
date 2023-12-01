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

// Create Producto
app.post('/productos', async (req, res) => {
    try {
      const producto = await Productos.create(req.body);
      res.status(201).json(producto);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  
  // Read Productos
  app.get('/productos', async (req, res) => {
    try {
      const productos = await Productos.findAll();
      res.status(200).json(productos);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  
  // Update Producto
  app.put('/productos/:id', async (req, res) => {
    try {
      const producto = await Productos.findByPk(req.params.id);
      if (producto) {
        await producto.update(req.body);
        res.status(200).json(producto);
      } else {
        res.status(404).json({ error: 'Producto no encontrado' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  
  // Delete Producto
  app.delete('/productos/:id', async (req, res) => {
    try {
      const producto = await Productos.findByPk(req.params.id);
      if (producto) {
        await producto.destroy();
        res.status(200).json({ message: 'Producto eliminado' });
      } else {
        res.status(404).json({ error: 'Producto no encontrado' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

// Create Factura
app.post('/facturas', async (req, res) => {
    try {
      const factura = await Factura.create(req.body);
      res.status(201).json(factura);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  
  // Read Facturas
  app.get('/facturas', async (req, res) => {
    try {
      const facturas = await Factura.findAll();
      res.status(200).json(facturas);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  
  // Update Factura
  app.put('/facturas/:id', async (req, res) => {
    try {
      const factura = await Factura.findByPk(req.params.id);
      if (factura) {
        await factura.update(req.body);
        res.status(200).json(factura);
      } else {
        res.status(404).json({ error: 'Factura no encontrada' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  
  // Delete Factura
  app.delete('/facturas/:id', async (req, res) => {
    try {
      const factura = await Factura.findByPk(req.params.id);
      if (factura) {
        await factura.destroy();
        res.status(200).json({ message: 'Factura eliminada' });
      } else {
        res.status(404).json({ error: 'Factura no encontrada' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  
// Create DetalleFactura
app.post('/detalleFacturas', async (req, res) => {
    try {
      const detalleFactura = await DetalleFactura.create(req.body);
      res.status(201).json(detalleFactura);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  
  // Read DetalleFacturas
  app.get('/detalleFacturas', async (req, res) => {
    try {
      const detalleFacturas = await DetalleFactura.findAll();
      res.status(200).json(detalleFacturas);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  
 // Update DetalleFactura
app.put('/detalleFacturas/:id', async (req, res) => {
    try {
      const detalleFactura = await DetalleFactura.findByPk(req.params.id);
      if (detalleFactura) {
        await detalleFactura.update(req.body);
        res.status(200).json(detalleFactura);
      } else {
        res.status(404).json({ error: 'DetalleFactura no encontrado' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

// Delete DetalleFactura
app.delete('/detalleFacturas/:id', async (req, res) => {
    try {
      const detalleFactura = await DetalleFactura.findByPk(req.params.id);
      if (detalleFactura) {
        await detalleFactura.destroy();
        res.status(200).json({ message: 'DetalleFactura eliminado' });
      } else {
        res.status(404).json({ error: 'DetalleFactura no encontrado' });
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







