
// const scene = new THREE.Scene(); // LA ESCENA
// // const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1,); // La camara o punto de vista
// // Script para el botón de encender/apagar la música de fondo


const audio = document.getElementById('miAudio');
const controlButton = document.getElementById('controlAudio');

// Función para alternar entre reproducción y pausa
function toggleAudio() {
    if (audio.paused) {
        audio.play();
        controlButton.textContent = "Pausar";
    } else {
        audio.pause();
        controlButton.textContent = "Reproducir";
    }
}