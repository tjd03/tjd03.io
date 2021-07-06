//Seeing whether the user is logged in or not

auth.onAuthStateChanged(user => {

  //console.log(user);

  if (user) {

    window.loginEmail = user.email;
    window.loginEmailCompleted = user.email + '-completed';

    console.log(window.loginEmail);
    console.log(window.loginEmailCompleted);

    console.log(user);
    console.log(user.email);

    setupInterface(user);
    showList();

  } else {

    console.log('User logged out');

    setupInterface();

  }

});

//Log into the search

const loginPeople = document.querySelector('#loginForm');

loginPeople.addEventListener('submit', (e) => {

  e.preventDefault();

  const email = document.getElementById('email').value;

  const password = document.getElementById('password').value;

  //const email = loginForm['email'].value;

  //const password = loginForm['password'].value;

  console.log(email);
  console.log(password);

  auth.signInWithEmailAndPassword(email, password).then(cred => {

    //console.log(cred.user);

    if (email == '1623@brewery.com') {

      //window.location.href = "http://www.google.com";

    //window.location.reload(true);

  }



  });

});

const logoutPeople = document.querySelector('#logoutButton');

logoutPeople.addEventListener('click', (e) => {

  e.preventDefault();

  auth.signOut().then(() => {

    //console.log('User is logged out');

    window.location.reload(true);

  });

});

const loggedOutThings = document.querySelectorAll('.logged-out');

const loggedInThings = document.querySelectorAll('.logged-in');

const loggedInDetails = document.querySelector('.loginDetails');

const setupInterface = (user) => {

  if (user) {

    if (user.email == '1623@brewery.com') {

    const html2 = `

    <p class = "right-align margin-right-2">Wecome, 1623 Brewing Company</p>

    `

    loggedInDetails.innerHTML = html2;

  } else if (user.email == 'freys@brewery.com') {

    const html3 = `

    <p class = "right-align margin-right-2">Wecome, Frey's Brewing Company</p> 

    `

    loggedInDetails.innerHTML = html3;

  }

    loggedInThings.forEach(things => things.style.display = 'block');
    loggedOutThings.forEach(things => things.style.display = 'none');

  } else {

    loggedInDetails.innerHTML = '';

    loggedInThings.forEach(things => things.style.display = 'none');
    loggedOutThings.forEach(things => things.style.display = 'block');

  }

}
