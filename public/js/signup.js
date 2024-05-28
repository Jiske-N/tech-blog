const handleSignupForm = async (submission) => {
  submission.preventDefault();

  console.log('signupjs', submission);
  //   collect new user data
  const name = document.querySelector('#name').value.trim();
  const email = document.querySelector('#email').value.trim();
  const password = document.querySelector('#password').value.trim();

  if (name && email && password) {
    console.log(name, email, password);
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      console.log('signupjs', response);
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  }
};

// document
//   .querySelector('#signup-form')
//   .addEventListener(
//     'submit',
//     console.log('signup submitted'),
//     handleSignupForm
//   );

document
  .querySelector('#signup-form')
  .addEventListener('submit', handleSignupForm);