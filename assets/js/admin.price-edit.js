const params = new URLSearchParams(window.location.search);
const id = params.get('id');

const [nameInput, priceInput] = document.querySelectorAll('.edit__textfields input');
const [saveBtn, deleteBtn] = document.querySelectorAll('.edit__btns button');
const categoriesSelect = document.querySelector('.edit__textfields select')
const backLink = document.querySelector('.link');

const selectHtml = (category, id) => `
  <option value='${category.id}' ${id === category.id ? 'selected' : ''}>${category.name}</option>
`

const setServiceData = service => {
  const title = document.querySelector('.admin__title');

  setSelectValues(service.category_id);
  nameInput.value = service.name;
  priceInput.value = service.price;
  title.innerText = 'Редактирование';
  backLink.href = `./admin.price.html?id=${service.category_id}`
}

const setSelectValues = (id) => {
  fetch('../../php/api/Index/IndexCategories.php')
    .then(res => res.json())
    .then(res => {
      res.categories.forEach(category => {
        categoriesSelect.innerHTML += selectHtml(category, id);
      })
    })
}

const setSaveBtnListener = actionType => {
  saveBtn.addEventListener('click', () => {
    const path = actionType === 'edit'
      ? `../../php/api/Update/UpdateService.php`
      : `../../php/api/Store/StoreService.php`
    const method = actionType === 'edit' ? 'UPDATE' : 'POST'

    fetch(path, {
      method,
      body: JSON.stringify({
        id,
        name: nameInput.value,
        price: priceInput.value,
        category_id: categoriesSelect.value
      }),
    })
  })
}

const setDeleteBtnListener = () => {
  deleteBtn.addEventListener('click', () => {
    fetch(`../../php/api/Delete/DeleteService.php`, {
      method: 'DELETE',
      body: JSON.stringify({
        id,
      }),
    })
  })
}

if (id) {
  fetch(`../../php/api/Show/ShowService.php?id=${id}`)
    .then((res) => res.json())
    .then((res) => {
      setServiceData(res.service);
      setSaveBtnListener('edit');
      setDeleteBtnListener();
    });
  }
  else {
    setSelectValues(params.get('category_id'));
    backLink.href = `./admin.price.html?id=${params.get('category_id')}`
    setSaveBtnListener('add');
    deleteBtn.remove();
}