function checkEnter(e) {
  if (e.keyCode === 13) {
    auth();
  }
}

// Auth function runs every time the login button is clicked. Confirms the email and password match with the credentials in the local storage.
function auth() {
  // Retrieve email and password from the input fields
  let email = document.getElementById('email').value;
  let password = document.getElementById('password').value;

  // Retrieve the stored user based on email from local storage
  let storedUser = JSON.parse(localStorage.getItem('user_' + email));

  // Check if the stored user exists and if the entered credentials match
  if (
    storedUser &&
    email === storedUser.email &&
    password === storedUser.password
  ) {
    // Redirect to the ticket.html page upon successful login
    window.location.assign('ticket.html');
    alert('Logged In Successfully');
  } else {
    alert('Invalid Credentials. Please Try Again.');
  }
}

function checkEnterRegister(e) {
  if (e.keyCode === 13) {
    register();
  }
}
/*
  This register function gets all of the values in the form and tests them to see if the credentials are valid before
  storing them into the local storage to be used for login.
*/
function register() {
  let isValidated = false;
  let registerEmail = document.getElementById('newEmail').value;
  let registerPassword = document.getElementById('newPassword').value;

  // Create a new user object with entered email and password
  let newUser = {
    email: registerEmail,
    password: registerPassword,
  };

  isValidated = emailValidation();
  // Validation process. Goes through local storage making sure it passes as an account as well as looks for a match.
  for (i = 0; i < localStorage.length; i++) {
    let storedKey = localStorage.key(i);
    let storedUser = JSON.parse(localStorage.getItem(storedKey));

    if (isValidated === false) {
      alert('Email address is invalid.');
      return;
    } else if (registerEmail === storedUser.email) {
      alert(
        'This email address already has an account. Please sign in with your credentials.'
      );
      return;
    } else if (registerPassword.length < 8) {
      alert('Please enter a new password that has 8 or more characters.');
      return;
    }
  }
  // Use a unique key for each user based on their email and store the new user in local storage.
  let userKey = 'user_' + registerEmail;
  localStorage.setItem(userKey, JSON.stringify(newUser));

  alert(
    'Your account was successfully created! You may now log in with your new credentials.'
  );

  // Clear and close the form after successful entry.
  document.getElementById('modal-form').reset();
  $('#registerModal').modal('hide');
}

/*
    This emailValidation function gets the value of the address that is being typed in and displays to the user within the span tag.
    It will return true or false based on if the email address follows the regular expression or not.
*/
function emailValidation() {
  let modalForm = document.getElementById('modal-form');
  let modalEmail = document.getElementById('newEmail').value;
  let text = document.getElementById('text');
  let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

  // Check if the entered email matches the specified pattern
  if (modalEmail.match(pattern)) {
    modalForm.classList.add('valid');
    modalForm.classList.remove('invalid');
    text.innerHTML = 'Your email address is valid.';
    text.style.color = 'darkgreen';
    isValidated = true;
    return isValidated;
  } else {
    modalForm.classList.remove('valid');
    modalForm.classList.add('invalid');
    text.innerHTML = 'Invalid email address.';
    text.style.color = 'red';
    isValidated = false;
    return isValidated;
  }
}
