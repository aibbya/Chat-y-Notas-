var firebaseConfig = {
  apiKey: "AIzaSyBfvV20K1vlElSTjI0i8e6wc5tgiXYHtMk",
  authDomain: "revistacienciashoy.firebaseapp.com",
  databaseURL: "https://revistacienciashoy.firebaseio.com",
  projectId: "revistacienciashoy",
  storageBucket: "revistacienciashoy.appspot.com",
  messagingSenderId: "69878471982",
  appId: "1:69878471982:web:3393e4864b1c65eea7aebf"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var txtNombre = document.getElementById("nombre");
var txtMensaje = document.getElementById("mensaje");
var btnEnviar = document.getElementById('btnEnviar');
var chatUl = document.getElementById('chatUl');
var mensajeAlUserLog = document.getElementById("logueado");
var mensajeAlUserNOlog = document.getElementById("sinLoguear");



var name, email, photoUrl, uid, emailVerified;
$(function () {
  var user = firebase.auth().currentUser;
  if (user != null) {
    name = user.displayName;
    email = user.email;
    photoUrl = user.photoURL;
    emailVerified = user.emailVerified;
    uid = user.uid; // The user's ID, unique to the Firebase project. Do NOT use
    // this value to authenticate with your backend server, if
    // you have one. Use User.getToken() instead.
    console.log(name);
    document.getElementById("sectionMensajes").style.display = "block";

    document.getElementById("entra").style.display = "none"
    mensajeAlUserLog.innerHTML = "Hola  " + name + "  decinos";

  } else if (user == null) {
    console.log("no hay nadie logueado");

  };

  var db = firebase.database().ref('chat')
  db.orderByKey().limitToLast(10).on('value', function (snapshot) {
      var html = "";
      console.log(snapshot.val());
      snapshot.forEach(e => {
        var elem = e.val();
        var nombre = elem.name;
        var mensaje = elem.message;

        html += "<li><strong>" + nombre + " : </strong></b>" + mensaje + "</li>"
        chatUl.innerHTML = html;
      })
    }, function (errorObject) {
      console.log("Fallo en lectura de datos: " + errorObject.code);
    }

  );

}) /*cierre de funcion document.ready*/

btnEnviar.addEventListener("click", function () {
  console.log("boton de enviar cliqueado");
  var user = firebase.auth().currentUser;
  var name, email, photoUrl, uid, emailVerified;

  if (user != null) {
    name = user.displayName;
    email = user.email;
    photoUrl = user.photoURL;
    emailVerified = user.emailVerified;
    uid = user.uid; // The user's ID, unique to the Firebase project. Do NOT use
    // this value to authenticate with your backend server, if
    // you have one. Use User.getToken() instead.
    console.log(name);
    var mensaje = txtMensaje.value
    firebase.database().ref('chat').push({
      name: name,
      message: mensaje
    })
  } else if (user == null) {
    console.log("Por favor loguate para enviar mensajes");
    alert("Por favor loguate para enviar mensajes")
  };
});

function googleSignin() {
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth()

    .signInWithPopup(provider).then(function (result) {
      var token = result.credential.accessToken;
      var user = result.user;

      console.log(token)
      console.log(user)
      console.log(user.displayName + "esta logueado");
      document.getElementById("sectionMensajes").style.display = "block";
      document.getElementById("entra").style.display = "none";
      document.getElementById("logueado").style.display = "block";
      document.getElementById("sinLoguear").style.display = "none";
      document.getElementById("logueado").innerHTML = "Hola  " + user.displayName + "  decinos";


    }).catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;

      console.log(error.code)
      console.log(error.message)
      alert(error.message)
    });
}


function googleSignout() {
  firebase.auth().signOut()

    .then(function () {
      console.log('Signout Succesfull');
      document.getElementById("sectionMensajes").style.display = "none"
      document.getElementById("entra").style.display = "block"

    }, function (error) {
      console.log('Signout Failed')
    });
}