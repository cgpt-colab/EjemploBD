const { obtenerPersonas, insertarPersona } = require("./personas");

const btnCargar = document.getElementById("btnCargar");
const btnGuardar = document.getElementById("btnGuardar");

const tablaPersonas = document.getElementById("tablaPersonas");

const nombre = document.getElementById("nombre");
const edad = document.getElementById("edad");
const telefono = document.getElementById("telefono");
const correo = document.getElementById("correo");
const direccion = document.getElementById("direccion");

btnCargar.addEventListener("click", function() {
    cargarPersonas();
});

btnGuardar.addEventListener("click", function() {

    if (
        nombre.value === "" ||
        edad.value === "" ||
        telefono.value === "" ||
        correo.value === "" ||
        direccion.value === ""
    ) {
        alert("Debe completar todos los campos.");
        return;
    }

    insertarPersona(
        nombre.value,
        Number(edad.value),
        telefono.value,
        correo.value,
        direccion.value,
        function(error, resultado) {

            if (error) {
                console.error("Error al insertar persona:", error);
                alert("Error: " + error.message);
                return;
            }

            alert("Persona guardada correctamente.");

            limpiarFormulario();
            cargarPersonas();

        }
    );

});

function cargarPersonas() {

    obtenerPersonas(function(error, personas) {

        if (error) {
            console.error("Error al obtener personas:", error);
            alert("Error: " + error.message);
            return;
        }

        tablaPersonas.innerHTML = "";

        personas.forEach(function(persona) {

            let fila = document.createElement("tr");

            fila.innerHTML = `
                <td>${persona.id}</td>
                <td>${persona.nombre}</td>
                <td>${persona.edad}</td>
                <td>${persona.telefono}</td>
                <td>${persona.correo}</td>
                <td>${persona.direccion}</td>
            `;

            tablaPersonas.appendChild(fila);

        });

    });
}

function limpiarFormulario() {
    nombre.value = "";
    edad.value = "";
    telefono.value = "";
    correo.value = "";
    direccion.value = "";
}