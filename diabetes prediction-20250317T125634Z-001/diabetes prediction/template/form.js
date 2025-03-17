// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDXNCw2_0zl-VGW1QYMMuLVOYIYeSBF7M0",
  authDomain: "diabetesdetection-cb1d7.firebaseapp.com",
  projectId: "diabetesdetection-cb1d7",
  storageBucket: "diabetesdetection-cb1d7.appspot.com",
  messagingSenderId: "573585480036",
  appId: "1:573585480036:web:6221b63374b9e8f3138271"
};
// Initialize Firebase

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();


function signUp() {

  var email = document.getElementById("email").value;
  var password = document.getElementById("pass").value;

  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in 
      var user = userCredential.user;
      // ...
      window.alert("Signed Up Successfully");
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      // ..
      window.alert(errorMessage);
    });

}

function signIn() {
  const auth = firebase.auth();
  var email = document.getElementById("emailsignin").value;
  var password = document.getElementById("passsignin").value;


  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      // ...
      window.location.replace("index1.html");
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;

      window.alert(errorMessage);
    });
}


firebase.auth().onAuthStateChanged((user) => {
  var uid = null;
  if (user) {
    // User is signed in, see docs for a list of available properties
    //   https://firebase.google.com/docs/reference/js/firebase.User
    uid = user.uid;
    // ...
  } else {
    // User is signed out
    // ...
    uid = null;
    //  window.location.replace('index1.html');
  }
});

function signOut() {
  // [START auth_sign_out]
  firebase.auth().signOut().then(() => {
    // Sign-out successful.
    // window.location.replace('index1.html');
  }).catch((error) => {
    // An error happened.
  });
  // [END auth_sign_out]
};
