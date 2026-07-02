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

module.exports = {
    obtenerPersonas,
    insertarPersona
};