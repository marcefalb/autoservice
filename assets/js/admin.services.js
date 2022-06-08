const categoriesList = document.querySelector('.admin__list');

const categoryHTML = category => `
  <li class='admin__item'>
    <a class='admin__item_left admin__item-link' href='./admin.price.html?id=${category.id}'>
      <span class='admin__item-muted'>Ответственный сотрудник: ${category.employerName}, количество услуг: ${category.services_count}</span>
      <div class='admin__item-info'>
        <p>${category.name}</p>
      </div>
    </a>
    <div class='admin__item_right'>
      <a class='button button_active admin-button' href='./admin.service-edit.html?id=${category.id}'>
        <img src="./assets/icons/admin/ic_edit.svg" />
      </a>
    </div>
  </li>
`;

fetch('../../php/api/Index/IndexCategories.php')
  .then((res) => res.json())
  .then((res) => {
    res.categories.forEach(category => {
      categoriesList.innerHTML += categoryHTML(category);
    })
  })