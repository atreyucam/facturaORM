const {DataTypes} = require('sequelize');
const {sequelize} = require('./connection');

// Tabla-usuarios
const Usuario = sequelize.define('Usuario', {
    nombreUsuario: {
        type:DataTypes.STRING,
        allowNull:false
    },
    cedula:{
        type:DataTypes.INTEGER,
        allowNull:false
    }
}, {tableName: 'Usuario'});

// Tabla-Productos
const Productos = sequelize.define('Productos',{
    nombreProducto:{
        type: DataTypes.STRING,
        allowNull:false,
    },
    precioUnidad:{
        type: DataTypes.DECIMAL,
        allowNull:false
    }
}, {tableName: 'Productos'});

// tabla-factura
const Factura = sequelize.define('Factura', {
    numeroFactura:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    fechaFactura:{
        type: DataTypes.DATE,
        allowNull: false
    },
    formaPago:{
        type: DataTypes.STRING,
        allowNull: false
    },
    guiaRemision:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    subTotalPorcent:{
        type: DataTypes.DECIMAL,
        allowNull:false
    },
    subTotalCero:{
        type:DataTypes.DECIMAL,
        allowNull: true
    },
    descuento:{
        type: DataTypes.DECIMAL,
        allowNull:true
    },
    subTotalSin:{
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    IVA:{
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    valorTotal:{
        type: DataTypes.DECIMAL,
        allowNull: false
    }
}, {tableName: 'Factura'});
Usuario.hasMany(Factura,{as:'Factura', foreignKey: 'id_usuario'});
Factura.belongsTo(Usuario,{
    foreignKey: "id_usuario",
});

// tabla-Detalle
const DetalleFactura = sequelize.define('DetalleFactura',{
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    valorTotal:{
        type:DataTypes.DECIMAL,
        allowNull: false
    }
}, {tableName: 'DetalleFactura'});
Factura.hasMany(DetalleFactura,{as: 'DetalleFactura', foreignKey: 'id_factura'});
DetalleFactura.belongsTo(Factura,{
    foreignKey: "id_factura",
});
DetalleFactura.hasMany(Productos, {as:'Producto', foreignKey: 'id_detalleFactura'});
Productos.belongsTo(DetalleFactura,{
    foreignKey: "id_detalleFactura",
});

module.exports = {
    Usuario,
    Productos,
    Factura, 
    DetalleFactura
};