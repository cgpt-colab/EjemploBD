const mysql = require("mysql2");
//Importamos la libreria mysql2 para conectar a MySQL

const conexion = mysql.createPool({//creamos conexion
    host: "localhost",
    //servidor donde se encuentra la base de datos
    user: "root",
    //Usuario de MySQL
    password:"",
    //Contraseña del usuario
    database:"comercial",
    //Nombre de la base de datos
    waitForConnections: true,
    //esperar a que se libere la conexion antes de hacer otra consulta
    connectionLimit: 10,
    //limite de conexiones simultaneas
    queueLimit: 0
    //limite de consultas en cola
});

conexion.getConnection(function(error, connection){
    //Abrimos la conexion a la base de datos
    if(error){//si ocurre un error, se muestre en consola
        console.log("Error al conectar MySQL: ", error);
        return;
    }
    //si todo funciona, tambien muestre un msj.
    console.log("Conexion exitosa" );
});

module.exports = conexion;
//exportar la conexion y usarla en otros archivos