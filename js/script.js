export function validarDatos(input){
    const tipoInput = input.dataset.type;
    if (validadores[tipoInput]){
        validadores[tipoInput](input);
    }
}

const validadores = {
    birthDATE  : input => validarFecha(input),
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