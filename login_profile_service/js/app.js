//I have taken help from the followimng websites 
//https://medium.com/@bariskarapinar/firebase-authentication-web-app-javascript-3165ebc92b68
//https://www.youtube.com/watch?v=V6DB6M3Nf58&ab_channel=YogeshSharma
//https://www.w3schools.com/howto/howto_css_login_form.asp

//Global vars
var passFormat = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}/;
var emailFormat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


// validate Sign In Email 
function validateSignInEmail(){
    if(document.getElementById("signInEmail").value.match(emailFormat)){
        document.getElementById("signInEmailErr").style.display = "none";
    }else{
        document.getElementById("signInEmailErr").style.display = "block";
    }
}
// validate Sign In Password 
function validateSignInPass(){
    if(document.getElementById("signInpass").value.match(passFormat)){
        document.getElementById("signInpassErr").style.display = "none";
    }else{
        document.getElementById("signInpassErr").style.display = "block";
    }    
}

// validate First Name
function validateFname(){
    if(document.getElementById("fname").value === ""){
        document.getElementById("fnameErr").style.display = "block";
    }else{
        document.getElementById("fnameErr").style.display = "none";
    }
}
// validate last name
function validateLname(){
    if(document.getElementById("lname").value === ""){
        document.getElementById("lnameErr").style.display = "block";
    }else{
        document.getElementById("lnameErr").style.display = "none";
    }
}
// validate email
function validateEmail(){
    if(document.getElementById("email").value.match(emailFormat)){
        document.getElementById("emailErr").style.display = "none";
    }else{
        document.getElementById("emailErr").style.display = "block";
    }
}
// validate pass
function validatePass(){     
    if(document.getElementById("pass").value.match(passFormate)){
        document.getElementById("passErr").style.display = "none";
    }else{
        document.getElementById("passErr").style.display = "block";
    }    
}


function signUp(){
    var fname = document.getElementById("fname").value;
    var lanme = document.getElementById("lname").value;
    var email = document.getElementById("email").value;
    var pass = document.getElementById("pass").value;
    var fnameFormat = /^([A-Za-z.\s_-])/;    

    if(fname.match(fnameFormat) == null){
        return validateFname();
    }else if(lanme === ""){
        return validateLname();
    }else if(email.match(emailFormat) == null){
        return validateEmail();
    }else if(pass.match(passFormat) == null){
        return validatePass();
    }else{
        firebase.auth().createUserWithEmailAndPassword(email, pass).then((success) => {
            var user = firebase.auth().currentUser;
            var uid;
            if (user != null) {
                uid = user.uid;
            }
            var firebaseRef = firebase.database().ref();
            var userData = {
                userFullName: fname,
                userSurname: lname,
                userEmail: email,
                userPassword: pass,
                userFb: "Facebok  Link",
                userTw: "Twitter Link/",
                userGp: "Google Link",
                userBio: "User biography",
            }
            firebaseRef.child(uid).set(userData);
            swal('Your Account Created','Your account was created successfully, you can log in now.',
            ).then((value) => {
                setTimeout(function(){
                    window.location.replace("../index.html");
                }, 1000)
            });
        }).catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            swal({
                type: 'error',
                title: 'Error',
                text: "Error",
            })
        });
    }
}

// sign In
function signIn(){
    var signInEmail = document.getElementById("signInEmail").value;
    var userSIPassword = document.getElementById("signInpass").value;
    var signInEmailFormat = emailFormat;
    var signInpassFormate = passFormat;      

    if(signInEmail.match(signInEmailFormat) == null){
        return validateSignInEmail();
    }else if(userSIPassword.match(signInpassFormate) == null){
        return validateSignInPass();
    }else{
        firebase.auth().signInWithEmailAndPassword(signInEmail, userSIPassword).then((success) => {
            window.location.replace("./pages/profile.html");
        }).catch((error) => {
            var errorMessage = error.message;
            swal({
                type: 'error',
                title: 'Error',
                text: errorMessage,
            })
        });
    }
}

firebase.auth().onAuthStateChanged((user)=>{
    if (user) {
        let user = firebase.auth().currentUser;
        let uid
        if(user != null){
            uid = user.uid;
        }
        let firebaseRefKey = firebase.database().ref().child(uid);
        firebaseRefKey.on('value', (dataSnapShot)=>{
            document.getElementById("profileFname").innerHTML = dataSnapShot.val().userFullName;
            document.getElementById("profileLastName").innerHTML = dataSnapShot.val().userSurname
        })
    } else {
    //   No user is signed in.
    }
});
// show edit profile
function showEditProfileForm(){
    document.getElementById("profileSection").style.display = "none"
    document.getElementById("editProfileForm").style.display = "block"
}
// hide edit profile
function hideEditProfileForm(){
    document.getElementById("profileSection").style.display = "block";
    document.getElementById("editProfileForm").style.display = "none";
}
function saveProfile(){
    //TODO
}

function signOut(){
    firebase.auth().signOut().then(function() {
        swal({
            type: 'successfull',
            title: 'Signed Out', 
        }).then((value) => {
            setTimeout(function(){
                window.location.replace("../index.html");
            }, 1000)
        });
    }).catch(function(error) {
        let errorMessage = error.message;
        swal({
            type: 'error',
            title: 'Error',
            text: errorMessage,
        })
    });
}