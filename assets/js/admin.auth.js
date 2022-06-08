let isAuth = false;

const redirect = () => window.location.replace('/authorization.html');

const clearCookie = () => {
  document.cookie = `token=`;
}

const setLogoutListener = () => {
  const logoutBtn = document.querySelector('.sidebar__nav-list').lastElementChild.children[0];

  logoutBtn.addEventListener('click', () => {
    fetch('../../php/api/Auth/Logout.php')
    .then(() => {
      clearCookie();
      redirect(); 
    })
  })
}

fetch('../../php/api/Auth/CheckAuth.php')
  .then(res => res.json())
  .then(res => {
    if (!res.auth) redirect();
    else isAuth = true;
  })

window.addEventListener('load', () => setLogoutListener());