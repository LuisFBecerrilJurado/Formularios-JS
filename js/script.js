export function validarDatos(input){
    const tipoInput = input.dataset.tipo;
    if (validadores[tipoInput]){
        validadores[tipoInput](input);
    }

    if (input.validity.valid) {
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = " ";
    } else {
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeError(tipoInput,input);
    }
}

const tipoError = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError",
]

const mensajeError = {
    nombre: {
        valueMissing: "El campo nombre no puede estar vacio",
    },
    email: {
        valueMissing: "El campo correo no puede estar vacio",
        typeMismatch: "El correo no es valido",
    },
    password: {
        valueMissing: "El campo contraseña no puede estar vacio",
        patternMismatch: "La contraseña no cumple con los requsitos min 8 caracteres,debe contener números y letras"
    },
    nacimiento: {
        valueMissing: "El campo fecha de nacimiento no puede estar vacio",
        customError: "Debes tener al menos 18 años de edad",
    },
    telefono: {
        valueMissing: "El campo telefono no puede estar vacio",
        patternMismatch: "El número de telefono no contiene el patron correcto XXXXXXXXXX 10 digitos numéricos"
    },
    direccion: {
        valueMissing: "El campo direccón no puede estar vacio",
        patternMismatch: "La dirección debe contener entre 10 a 50 caracteres",
    },
    ciudad: {
        valueMissing: "El campo ciudad no puede estar vacio",
        patternMismatch: "La ciudad debe contener entre 4 a 50 caracteres",
    },
    estado: {
        valueMissing: "El campo estado no puede estar vacio",
        patternMismatch: "La dirección debe contener entre 4 a 50 caracteres",
    },
}

function mostrarMensajeError(tipoInput, input) {
    let mensaje = "";
    tipoError.forEach(error => {
        if (input.validity[error]) {
            console.log(tipoInput, error);
            console.log(input.validity[error]);
            console.log(mensajeError[tipoInput][error]);
            mensaje = mensajeError[tipoInput][error];
        }
    })
    return mensaje;
}

const validadores = {
    nacimiento  : input => validarFecha(input),
}


const inputNacimiento = document.querySelector("#birth");

inputNacimiento.addEventListener("blur",(evento) =>{
    validarFecha(evento.target);
})

function validarFecha(input){
    const fechaCapturada    = new Date(input.value);
    let mensaje = "";
    validarMayorEdad(fechaCapturada) ? mensaje = "" : mensaje="Debes tener al menos 18 años de edad";
    input.setCustomValidity(mensaje);
}

function validarMayorEdad(fecha){
    const fechaActual   = new Date();
    const difFechas     = new Date( fecha.getUTCFullYear() +18, fecha.getUTCMonth(), fecha.getUTCDate());
    return difFechas    <=  fechaActual;
}