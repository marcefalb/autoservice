const params = new URLSearchParams(window.location.search);
const id = params.get('id');

const [nameInput, positionInput, rankInput] = document.querySelectorAll('.edit__textfields input');
const [saveBtn, deleteBtn] = document.querySelectorAll('.edit__btns button');

const setEmployerData = employer => {
  const title = document.querySelector('.admin__title');

  nameInput.value = employer.name;
  positionInput.value = employer.position;
  rankInput.value = employer.rank;
  title.innerText = 'Редактирование';
}

const setSaveBtnListener = actionType => {
  saveBtn.addEventListener('click', () => {
    let validation = true;
    
    [nameInput, positionInput, rankInput].forEach(input => {
      if (!input.value) {
        const activeClass = 'input_unvalid';
        input.classList.add(activeClass);
        validation = false;
  
        input.addEventListener('change', () => input.classList.remove(activeClass));
      }
    });
  
    if (validation) {
      const path = actionType === 'edit'
        ? `../../php/api/Update/UpdateEmployer.php`
        : `../../php/api/Store/StoreEmployer.php`
      const method = actionType === 'edit' ? 'UPDATE' : 'POST'

      fetch(path, {
        method,
        body: JSON.stringify({
          id,
          name: nameInput.value,
          position: positionInput.value,
          rank: rankInput.value
        }),
      })
        .then(() => {
          window.location.href = `/admin.employee.html`;
        })
    }
  })
}

const setDeleteBtnListener = () => {
  deleteBtn.addEventListener('click', () => {
    fetch(`../../php/api/Delete/DeleteEmployer.php`, {
      method: 'DELETE',
      body: JSON.stringify({
        id,
      }),
    })
      .then(() => {
        window.location.href = `/admin.employee.html`;
      })
  })
}

if (id) {
  fetch(`../../php/api/Show/ShowEmployer.php?id=${id}`)
    .then((res) => res.json())
    .then((res) => {
      setEmployerData(res.employer);
      setSaveBtnListener('edit');
      setDeleteBtnListener();
    });
  }
  else {
    setSaveBtnListener('add');
    deleteBtn.remove();
}