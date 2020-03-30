console.log("Dios esta en todo");

var userLog = {} ;


function googleSignin() {
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth()

    .signInWithPopup(provider).then(function (result) {
      var token = result.credential.accessToken;
      var user = result.user;

      console.log(token)
      console.log(user)
      userLog= user;
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

var txtNombre = document.getElementById("nombre");
var txtMensaje = document.getElementById("mensaje");
var btnEnviar = document.getElementById('btnEnviar');
var chatUl = document.getElementById('chatUl');


btnEnviar.addEventListener("click", function () {
  // var nombre = txtNombre.value;
  var mensaje = txtMensaje.value
  firebase.database().ref('chat').push({
    name: userLog.displayName,
    message: mensaje
  });

});

$(window).on("load", function () {
  firebase.database().ref('chat')
    .on('value', function (snapshot) {
      var html = "";
      console.log(snapshot.val());
      snapshot.forEach(e => {
        // console.log(e.value);

        var elem = e.val();
        var nombre = elem.name;
        console.log(elem);

        var mensaje = elem.message;
        html += "<li><b>" + nombre + ":</b>" + mensaje + "</li>"
      });
      chatUl.innerHTML = html;
      
    });

    firebase.auth().onAuthStateChanged(function (user) {
      
        userLog = user;
        
      })
        

})

console.log(userLog);

/* 
$(window).addEventListener("change", function () {
  
}

)
 */

/* firebase.auth().onAuthStateChanged(function (user) {
	if(user) {
    console.log("estoy logueado")
    console.log(user.displayName);
  } */