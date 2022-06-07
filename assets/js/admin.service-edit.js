const params = new URLSearchParams(window.location.search);
const id = params.get('id');

const btnUploadImg = document.querySelector('.edit__img-upload');
const nameInput = document.querySelector('.edit__textfields input');
const descTextarea = document.querySelector('.edit__textfields textarea');
const newImg = document.querySelector('.edit__img-upload');
const img = document.querySelector('.edit__img-container img');
const [saveBtn, deleteBtn] = document.querySelectorAll('.edit__btns button');

const setCategoryData = category => {
  const title = document.querySelector('.admin__title');

  nameInput.value = category.name;
  descTextarea.value = category.description;
  img.src = `./assets/images/services/${category.img}`;
  title.innerText = 'Редактирование';
}

const setSaveBtnListener = actionType => {
  saveBtn.addEventListener('click', () => {
    let validation = true;
    
    [nameInput, descTextarea].forEach(input => {
      if (!input.value) {
        const activeClass = 'input_unvalid';
        input.classList.add(activeClass);
        validation = false;
  
        input.addEventListener('change', () => input.classList.remove(activeClass));
      }
    });
    if (!btnUploadImg.files[0]) {
      document.querySelector('.edit__img-edit .link').style.color = 'red';
      validation = false;
    }
    else {
      document.querySelector('.edit__img-edit .link').style.color = 'var(--blue)';
    }
  
    if (validation) {
      const path = actionType === 'edit'
        ? `../../php/api/Update/UpdateCategory.php`
        : `../../php/api/Store/StoreCategory.php`

      const formData = new FormData();
      formData.append('image', btnUploadImg.files[0]);
      formData.append('id', id);
      formData.append('name', nameInput.value);
      formData.append('description', descTextarea.value);

      fetch(path, {
        method: 'POST',
        body: formData,
      })
        .then(() => {
          window.location.pathname = '/admin.services.html'
        })
    }
  })
}

const setDeleteBtnListener = () => {
  deleteBtn.addEventListener('click', () => {
    fetch(`../../php/api/Delete/DeleteCategory.php`, {
      method: 'DELETE',
      body: JSON.stringify({
        id,
      }),
    })
      .then(() => {
        window.location.pathname = '/admin.services.html'
      })
  })
}

const setBtnUploadListener = () => {
  btnUploadImg.addEventListener('change', () => {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      img.src = reader.result;
    })

    reader.readAsDataURL(btnUploadImg.files[0]);
  })
}
setBtnUploadListener();

if (id) {
  fetch(`../../php/api/Show/ShowCategory.php?id=${id}`)
    .then((res) => res.json())
    .then((res) => {
      setCategoryData(res.category);
      setSaveBtnListener('edit');
      setDeleteBtnListener();
    });
  }
  else {
    setSaveBtnListener('add');
    deleteBtn.remove();
}