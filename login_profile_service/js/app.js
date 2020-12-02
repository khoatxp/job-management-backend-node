//I have taken help from the followimng websites 
//https://medium.com/@bariskarapinar/firebase-authentication-web-app-javascript-3165ebc92b68
//https://www.youtube.com/watch?v=V6DB6M3Nf58&ab_channel=YogeshSharma
//https://www.w3schools.com/howto/howto_css_login_form.asp

//Global vars
var passFormat = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}/;
var emailFormat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
var nameFormat = /^([A-Za-z.\s_-])/;    


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
    if(document.getElementById("pass").value.match(passFormat)){
        document.getElementById("passErr").style.display = "none";
    }else{
        document.getElementById("passErr").style.display = "block";
    }    
}


//Sign Up page
function signUp(){
    var fname = document.getElementById("fname").value;
    var lname = document.getElementById("lname").value;
    var email = document.getElementById("email").value;
    var pass = document.getElementById("pass").value;
    var fnameFormat = nameFormat;

    if(fname.match(fnameFormat) == null){
        return validateFname();
    }else if(lname === ""){
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
                userFb: "https://www.facebook.com/",
                userTw: "https://www.twitter.com/",
                userGp: "https://www.linkedin.com/",
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
                title: errorCode,
                text: errorMessage,
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


//When we Log In 
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
            document.getElementById("profileLastName").innerHTML = dataSnapShot.val().userSurname;
            document.getElementById("userPfFb").setAttribute('href', dataSnapShot.val().userFb);
            document.getElementById("userPfTw").setAttribute('href', dataSnapShot.val().userTw);
            document.getElementById("userPfGp").setAttribute('href', dataSnapShot.val().userGp);
            document.getElementById("userPfBio").innerHTML = dataSnapShot.val().userBio;
    })
    } else {
    //   No user is signed in.
    }
});


// show edit profile
function showEditProfileForm(){
    document.getElementById("profileSection").style.display = "none";
    document.getElementById("editProfileForm").style.display = "block";
    document.getElementById("fname").value = document.getElementById("profileFname").innerHTML; 
    document.getElementById("lname").value = document.getElementById("profileLastName").innerHTML; 
    document.getElementById("fbLink").value = document.getElementById("userPfFb").getAttribute("href"); 
    document.getElementById("twitterLink").value = document.getElementById("userPfTw").getAttribute("href"); 
    document.getElementById("LdLink").value = document.getElementById("userPfGp").getAttribute("href"); 
    document.getElementById("bio").value = document.getElementById("userPfBio").innerHTML;
}


// hide edit profile
function hideEditProfileForm(){
    document.getElementById("profileSection").style.display = "block";
    document.getElementById("editProfileForm").style.display = "none";
}



//Edit profile Info
function saveProfile(){
    let fname = document.getElementById("fname").value 
    let lname = document.getElementById("lname").value 
    var fnameFormat = nameFormat;

    var checkUserFullNameValid = fname.match(fnameFormat);
    if(checkUserFullNameValid == null){
        return validateFname();
    }else if(lname === ""){
        return validateLname();
    }else{
        let user = firebase.auth().currentUser;
        let uid;
        if(user != null){
            uid = user.uid;
        }
        var firebaseRef = firebase.database().ref();

        var profileInfo = {
            userFullName: fname,
            userSurname: lname,
            userFb: document.getElementById("fbLink").value,
            userTw: document.getElementById("twitterLink").value ,
            userGp: document.getElementById("LdLink").value ,
            userBio: document.getElementById("bio").value,
        }
        firebaseRef.child(uid).set(profileInfo);
        swal({
            type: 'successfull',
            title: 'Update successfull',
            text: 'Profile updated.', 
        }).then((value) => {
            setTimeout(function(){
                document.getElementById("profileSection").style.display = "block";
                document.getElementById("editProfileForm").style.display = "none";
            }, 1000)
        });
    }
        
}


//Log Out
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