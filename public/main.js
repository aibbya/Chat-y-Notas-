console.log("Dios esta en todo");


/* // Acceder a servicio bbdd
const data = firebase.database();
// Obtener una referencia a la raíz de la base de datos
let refToData = data.ref()
// Obtener una console.log de todos los datos 
dataRef.once('value', snapshot => {
  console.log(snapshot.val());
});

let data = {
  "Moscow": {
    country: "Russia"
  },
  "Berlin": {
    name: "Germany"
  }
}
// Referenciamos al nodo principal
let dataRef = database.ref('cities');
// Pusheamos los datos al nodo
let dataPush = dataRef.push(data);
// Visualizamos los datos al nodo
dataRef.once('value', snapshot => {
  console.log(snapshot.val());
}); */

/* btnAcceder[i].addEventListener("click", function () {
  //Aquí la función que se ejecutará cuando se dispare el evento
  alert("conectando");
  var provider = new firebase.auth.GoogleAuthProvider();;
  firebase.auth()
    .signInWithPopup(provider)
    .then(function (result) {

      // The signed-in user info.
      var user = result.user;

      console.log(user);
      console.log(user.displayName);
      console.log(user.email);
      console.log(user.photoURL);

      $(".botonEntrar").hide();
      $("#sign-out-button").show();
      $("#btnMiCuenta").show();

      alert("Bienvenido " + user.displayName)

      //********* Perfil 
      document.getElementById("nombrePerfil").innerHTML = user.displayName;
      document.getElementById("emailPerfil").innerHTML = user.email;
      $('#fotoPerfil').append("<img src='" + user.photoURL + "'/>");


    });
});
 */
var txtNombre = document.getElementById("nombre");
var txtMensaje = document.getElementById("mensaje");
var btnEnviar = document.getElementById('btnEnviar');
var chatUl = document.getElementById('chatUl');


btnEnviar.addEventListener("click", function(){
  var nombre = txtNombre.value;
    var mensaje = txtMensaje.value;
  var html = "<li><b>" + nombre + ":</b>" + mensaje + "</li>"
  chatUl.innerHTML += html;

  firebase.database().ref('chat').push({
    name: nombre,
    message: mensaje
  });
  firebase.database().ref('chat')
  .on('value', function (snapshot){
    console.log(snapshot.ref);
    
    var html ="";
  snapshot.forEach(e => {
    var elem = e.val;
    var nombre = elem.name;
    var mensaje = elem.message;
    html += "<li><b>" + nombre + ":</b>" + mensaje + "</li>"
  });
    chatUl.innerHTML = html;
  })
});

firebase.database().ref('chat')
.on('value', function (snapshot){
  var html ="";
snapshot.forEach(e => {
  var elem = e.val;
  var nombre = elem.name;
  var mensaje = elem.message;
  html += "<li><b>" + nombre + ":</b>" + mensaje + "</li>"
});
  chatUl.innerHTML = html;
})