// Variables
const formulario = document.getElementById("formulario");
const listaTweets = document.getElementById("lista-tweets");

let tweets = [];

//Event listeners
(function iniciarApp() {
  formulario.addEventListener("submit", addTweet);

  document.addEventListener("DOMContentLoaded", () => {
    tweets = JSON.parse(localStorage.getItem("tweets")) || [];
    agregarTweets();
  });
})();

// Funciones
function addTweet(e) {
  e.preventDefault();

  const tweet = document.querySelector("textarea").value.trim();

  /* validacion..  */
  if (tweet === "") {
    mostrarError("No puedes enviar un tweet vacío.");
    return; // Evita que se ejecute mas lineas de codigo
  }
  const tweetObj = {
    id: Date.now(),
    tweet,
  };
  // añadir al arreglo de tweets
  tweets = [...tweets, tweetObj];

  agregarTweets();

  // reiniciar el formulario
  formulario.reset();
}

// mostrar mensaje de error
const mostrarError = (mensaje) => {
  let div = document.createElement("div");
  div.textContent = mensaje;
  div.className = "error";
  // Insertarlo en el contenido
  const contenido = document.getElementById("contenido");
  contenido.appendChild(div);

  // Elimina la alerta luego, de 3 segundoss
  setTimeout(() => {
    div.remove();
  }, 2000);
};

const agregarTweets = () => {
  cleanHTML(); //Limpiar html

  if (tweets.length > 0) {
    tweets.forEach(({ tweet, id }) => {
      /* agregar btn eliminar tweet*/
      let btnEliminar = document.createElement("a");
      btnEliminar.className = "borrar-tweet";
      btnEliminar.textContent = "X";
      btnEliminar.onclick = () => {
        eliminarTweet(id);
      };

      let li = document.createElement("li");

      li.textContent = tweet;

      li.appendChild(btnEliminar);
      listaTweets.appendChild(li);
    });
  }

  sincronizarStorage();
};

const cleanHTML = () => {
  while (listaTweets.firstChild) {
    listaTweets.removeChild(listaTweets.firstChild);
  }
};

const sincronizarStorage = () => {
  localStorage.setItem("tweets", JSON.stringify(tweets));
};

const eliminarTweet = (id) => {
  tweets = tweets.filter((tweet) => tweet.id !== id);
  agregarTweets();
};
