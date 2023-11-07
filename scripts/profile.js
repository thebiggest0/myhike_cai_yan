var currentUser;               //points to the document of the user who is logged in
// global variable as current user which point to document of user who is signed in 
function populateUserInfo() {           
    firebase.auth().onAuthStateChanged(user => {        //this function from firebase lets us know which user is signed in
        // Check if user is signed in:
        if (user) {

            //go to the correct user document by referencing to the user uid
            currentUser = db.collection("users").doc(user.uid)          //user.uid is the unique id of the user
            //get the document for current user.
            currentUser.get()
                .then(userDoc => {      // naming is not set in stone, can choose what you want can be user_doc or whatever
                    //get the data fields of the user
                    var userName = userDoc.data().name;         // .data() is a function that gets the data from the document
                    var userSchool = userDoc.data().school;       // just change this to be same as the name of the field in the document
                    var userCity = userDoc.data().city;

                    //if the data fields are not empty, then write them in to the form.
                    if (userName != null) {
                        document.getElementById("nameInput").value = userName;      // info comes from the html file id
                    }
                    if (userSchool != null) {
                        document.getElementById("schoolInput").value = userSchool;
                    }
                    if (userCity != null) {
                        document.getElementById("cityInput").value = userCity;
                    }
                })
        } else {
            // No user is not signed in. can add action to redirect or whatever
            console.log("No user is signed in");
        }
    });
}

//call the function to run it 
populateUserInfo();

function editUserInfo() {
    console.log('inside function')
    document.getElementById('personalInfoFields').disabled= false;    // upon clicking on it it is enabled
}


function saveUserInfo() {
    console.log('inside function2')
    // get entered user info
    userName = document.getElementById("nameInput").value;
    // do this 2 more times
    userSchool = document.getElementById("schoolInput").value;
    userCity = document.getElementById("cityInput").value;

    // console.log(userName, userSchool, userCity);

    // update the user document in firestore
    currentUser.update({
        // updating values in firestore, have to use same keys as in the firestore
        // when use update always use , not ;
        name: userName,
        school: userSchool,
        // because no city as key, BUT update function will create the key if it doesn't exist
        city: userCity,
    })
    document.getElementById('personalInfoFields').disabled = true;
}