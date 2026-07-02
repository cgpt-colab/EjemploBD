const conexion = require("./database");

function obtenerPersonas(callback) {

    const consulta = "SELECT * FROM personas";

    conexion.query(consulta, function(error, resultados) {

        if (error) {
            callback(error, null);
            return;
        }

        callback(null, resultados);

    });
}

function insertarPersona(nombre, edad, telefono, correo, direccion, callback) {

    console.log("Entró a insertarPersona");

    const consulta = `
        INSERT INTO personas(nombre, edad, telefono, correo, direccion)
        VALUES (?, ?, ?, ?, ?)
    `;

    const valores = [nombre, edad, telefono, correo, direccion];

    conexion.query(consulta, valores, function(error, resultado) {

        console.log("Terminó la consulta INSERT");

        if (error) {
            callback(error, null);
            return;
        }

        callback(null, resultado);

    });
}

function actualizarPersona(id, nombre, edad, telefono, correo, direccion, callback){
    const consulta = `UPDATE personas SET 
    nombre = ?, 
    edad = ?, 
    telefono = ?, 
    correo = ?, 
    direccion = ? 
    WHERE id = ?`;
    alert(consulta);
    const valores = [nombre, edad, telefono, correo, direccion, id];

    conexion.query(consulta, valores, function(error, resultado) {
        if (error) {
            callback(error, null);
            return;
        }

        callback(null, resultado);
    });
}

function eliminarPersona(id, callback){
    const consulta = `DELETE FROM personas WHERE id = ?`;
    alert(consulta);
    conexion.query(consulta, [id], function(error, resultado) {
        if (error) {
            callback(error, null);
            return;
        }
        callback(null, resultado);
    });
}

module.exports = {
    obtenerPersonas,
    insertarPersona,
    actualizarPersona,
    eliminarPersona
};