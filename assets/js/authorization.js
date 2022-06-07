const inputs = document.querySelectorAll('.authorization__textfields input');
const authBtn = document.querySelector('.authorization__login');
const authValidation = document.querySelector('.auth-validation');

authBtn.addEventListener('click', () => {
  const activeClass = 'input_unvalid';
  let validation = true;
  
  inputs.forEach(input => {
    if (!input.value) {
      input.classList.add(activeClass);
      validation = false;

      input.addEventListener('change', () => input.classList.remove(activeClass));
    }
  });
  if (validation) {
    const [login, password] = inputs;

    fetch('../../php/api/Auth/Login.php', {
      method: 'POST',
      body: JSON.stringify({
        login: login.value,
        password: password.value,
      }),
    })
      .then(res => res.json())
      .then(res => {
        if (res.auth) {
          document.cookie = `token=${res.token}`;
          window.location.pathname = '/admin.feedbacks.html';
        }
        else {
          authValidation.classList.add('auth-validation_active');
        }
      })
  }
})