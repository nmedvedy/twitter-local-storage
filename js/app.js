// Variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];

// Event Listeners
eventListeners();

function eventListeners() {
    // Cuando el user agrega nuevo tweet
    formulario.addEventListener('submit', agregarTweet) 

    // Cuando el documento está listo
    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse(localStorage.getItem('tweets')) || [];        
        crearHTML();
    });
}

// Funciones
function agregarTweet(e) {
    e.preventDefault();

    // Textarea donde el user escribe
    const tweet = document.querySelector('#tweet').value;
    
    if ( tweet === '' ) {
        mostrarError('El mensaje No puede ir vacío')
        return; // Evita que se ejecuten + lineas de codigo
    }    

    const tweetObj = {
        id: Date.now(),
        tweet
    }

    // Añadir al arreglo de tweets
    tweets = [...tweets, tweetObj];
    console.log(tweets);
    
    // Una vez agregado, creamos el HTML
    crearHTML();

    // Reiniciamos formulario
    formulario.reset();
}

// Mostrar mensaje de error
function mostrarError(error) {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    // Insertamos en contenido
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    // Eliminar la alerta desp de 3 segundos
    setTimeout(() => {
        mensajeError.remove();
    }, 3000);
}

// Muestra un listado de los tweets
function crearHTML() {

    limpiarHTML()

    if ( tweets.length > 0 ) {
        tweets.forEach( tweet => {
            // Agrega botón de eliminar
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.innerText = 'X';

            // Añadir la función de eliminar
            btnEliminar.onclick = () => {
                borrarTweet(tweet.id);
            }

            // Crea el HTML
            const li = document.createElement('li');

            // añadimos texto
            li.innerText = tweet.tweet;

            // Asignar botón
            li.appendChild(btnEliminar);

            // insertarlo en HTML
            listaTweets.appendChild(li);
        } );
    }
    sincronizarStorage();
}

// Agrega los tweets actuales a localStorage
function sincronizarStorage() {
    localStorage.setItem('tweets', JSON.stringify(tweets))
}

// Eliminar tweet
function borrarTweet(id) {
    tweets = tweets.filter( tweet => tweet.id !== id);
    crearHTML();
}

// Limpiar HTML
function limpiarHTML() {
    while(listaTweets.firstChild) {
        listaTweets.removeChild(listaTweets.firstChild)
    }
}
