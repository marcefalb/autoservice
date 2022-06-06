const params = new URLSearchParams(window.location.search);
const id = params.get('id');

const input = document.querySelector('.edit__textfields input');
const newImg = document.querySelector('.edit__img-upload');
const img = document.querySelector('.edit__img-container img');

const setCategoryData = category => {
  const nameInput = document.querySelector('.edit__textfields input');
  const img = document.querySelector('.edit__img-container img');
  const title = document.querySelector('.admin__title');

  nameInput.value = category.name;
  img.src = `./assets/images/services/${category.img}`;
  title.innerText = 'Редактирование';
}

if (id) {
  fetch(`../../php/api/Show/ShowCategory.php?id=${params.get('id')}`)
    .then((res) => res.json())
    .then((res) => {
      setCategoryData(res.category);
    });
}

const setBtnAddListener = () => {
  const btnAdd = document.querySelector('.button-save');
  btnAdd.addEventListener('click', () => {

    if (!id) {
      fetch('../../php/api/Store/StoreCategory.php', {
        method: 'POST',
        body: JSON.stringify({
          category: {
            name: input.value,
            image: newImg.value.split(/(\\|\/)/g).pop() || '',
          }
        })
      })
    }
  })
}
setBtnAddListener();

const setBtnUploadListener = () => {
  const btnUploadImg = document.querySelector('.edit__img-upload');

  btnUploadImg.addEventListener('change', (event) => {
    img.src = `./assets/images/services/${event.target.value.split(/(\\|\/)/g).pop()}`;
  })
}
setBtnUploadListener();