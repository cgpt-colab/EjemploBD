const { obtenerPersonas, 
        insertarPersona, 
        actualizarPersona, 
        eliminarPersona } 
        = require("./personas");

const btnCargar = document.getElementById("btnCargar");
const btnGuardar = document.getElementById("btnGuardar");

const tablaPersonas = document.getElementById("tablaPersonas");

const nombre = document.getElementById("nombre");
const edad = document.getElementById("edad");
const telefono = document.getElementById("telefono");
const correo = document.getElementById("correo");
const direccion = document.getElementById("direccion");
let idEditar=null;

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

    if(idEditar===null){
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
    }else{
       
        actualizarPersona(
            idEditar,
            nombre.value,
            Number(edad.value),
            telefono.value,
            correo.value,
            direccion.value,

            
            function(error, resultado) {
                if (error) {
                    console.error("Error al actualizar persona:", error);
                    alert("Error: " + error.message);
                    return;
                }
                alert("Persona actualizada correctamente.");
                limpiarFormulario();
                cargarPersonas();
            }
        )
    }

 

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
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editarPersona(
                        ${persona.id}, 
                        '${persona.nombre}', 
                        ${persona.edad}, 
                        '${persona.telefono}', 
                        '${persona.correo}', 
                        '${persona.direccion}'
                        )">
                        Editar
                    </button>
                    <button class="btn btn-danger btn-sm" onclick="borrarPersona(
                        ${persona.id}
                    )">Eliminar</button>
                </td>
            `;

            tablaPersonas.appendChild(fila);

        });

    });
}

function editarPersona(id, nombrePersona, edadPersona, telefonoPersona, correoPersona, direccionPersona){
    idEditar = id;
    nombre.value = nombrePersona;
    edad.value = edadPersona;
    telefono.value = telefonoPersona;
    correo.value = correoPersona;
    direccion.value = direccionPersona;

    btnGuardar.textContent = "Actualizar";
    btnGuardar.classList.remove("btn-success");
    btnGuardar.classList.add("btn-warning");
}

function borrarPersona(id){
    let confirmacion = confirm("¿Está seguro de que desea eliminar esta persona?");

    if(!confirmacion){
        return;
    }
    eliminarPersona(id, function(error, resultado){
        if(error){
            console.error("Error al eliminar persona:", error);
            alert("Error: " + error.message);
            return;
        }
        alert("Persona eliminada correctamente.");
        cargarPersonas();
    });

}

function limpiarFormulario() {
    nombre.value = "";
    edad.value = "";
    telefono.value = "";
    correo.value = "";
    direccion.value = "";
}