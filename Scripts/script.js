let currentState = 0;
let contadorDias = 0;  // Contador de días
let intervalo;  // Para guardar el intervalo y poder detenerlo
const probabilidadAveria = 0.3; // Probabilidad de que una máquina se averíe
const estados = ["state0", "state1", "state2", "state3"];

function actualizarEstadoVisual() {
    // Resetear todos los estados a color normal
    estados.forEach(estado => {
        document.getElementById(estado).style.opacity = 0.5;
    });

    // Resaltar el estado actual
    document.getElementById(`state${currentState}`).style.opacity = 1;

    // Actualizar el texto del estado actual
    document.getElementById("currentState").textContent = currentState;
}

function siguienteEstado() {
    const r = Math.random();
    contadorDias++;  // Aumenta el contador de días

    switch (currentState) {
        case 0:
            currentState = r < probabilidadAveria ? 2 : 0;
            break;
        case 1:
            currentState = 3;
            break;
        case 2:
            currentState = 1;
            break;
        case 3:
            // Si se completa la reparación de ambas máquinas y ninguna se avería, volvemos al estado 0
            currentState = r < probabilidadAveria ? 2 : 0;
            break;
    }

    actualizarEstadoVisual();

    // Si llegamos al estado 0, detenemos la simulación
    if (currentState === 0 && contadorDias > 1) {  // Asegura que no sea el primer estado 0
        clearInterval(intervalo);  // Detiene la simulación
        alert(`¡Ambas máquinas están operativas nuevamente después de ${contadorDias} días!`);
    }
}

document.getElementById("start").addEventListener("click", () => {
    // Reinicia el contador de días y empieza la simulación
    contadorDias = 0;
    currentState = 0;  // Inicia desde el estado 0
    actualizarEstadoVisual();

    intervalo = setInterval(siguienteEstado, 2000);  // Cambia de estado cada 2 segundos
});
