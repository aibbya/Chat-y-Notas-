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
  
  
  $("#header").show();
  $("#secFormulario").show();
  $("#chat").hide();
$("detallesPerfil").hide();


  $(function () {
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




  }else if (user == null) {
      console.log("no hay nadie logueado");
  };
 
      firebase.database().ref('chat').on('value', function (snapshot) {
      var html = "";
      console.log(snapshot.val());
      snapshot.forEach(e => {
        // console.log(e.value);

        var elem = e.val();
        var nombre = elem.name;

 
        // console.log(elem);

        var mensaje = elem.message;
        html += "<li><b>" + nombre + ":</b>" + mensaje + "</li>"
      chatUl.innerHTML = html;})
    }, function (errorObject) {
        console.log("Fallo en lectura de datos: " + errorObject.code);
    }
            
    );

    
  
  

console.log("termino el ready");

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
    message: mensaje})
}else if (user == null) {
    console.log("Por favor loguate para enviar mensajes");
    alert("Por favor loguate para enviar mensajes")
};
    

});


function  googleSignin() {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth()
  
      .signInWithPopup(provider).then(function (result) {
        var token = result.credential.accessToken;
        var user = result.user;
  
        console.log(token)
        console.log(user)
        console.log(user.displayName + "esta logueado")
        console.log(user.email)
        console.log(user.photoURL)

        alert("Bienvenido " + user.displayName)


	//********* Perfil 
  document.getElementById("nombrePerfil").innerHTML = user.displayName;
  $('#fotoPerfil').append("<img src='" + user.photoURL + "'/>");
  $("#chat").show();
  $("detallesPerfil").show();


        
  
      }).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
  
        console.log(error.code)
        console.log(error.message)
      });

   
  }
  

  
  function googleSignout() {
    firebase.auth().signOut()
  
      .then(function () {
        console.log('Signout Succesfull')
      }, function (error) {
        console.log('Signout Failed')
      });
  }
  