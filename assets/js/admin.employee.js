const employeeList = document.querySelector('.admin__list');

const employerHTML = employer => `
  <li class='admin__item'>
    <div class='admin__item_left'>
      <span class='admin__item-muted'>${employer.position}, ${employer.rank}</span>
      <div class='admin__item-info'>
        <p>${employer.name}</p>
      </div>
    </div>
    <div class='admin__item_right'>
      <a class='button button_active admin-button' href='./admin.employer-edit.html?id=${employer.id}'>
        <img src="./assets/icons/admin/ic_edit.svg" />
      </a>
    </div>
  </li>
`;

fetch('../../php/api/Index/IndexEmployee.php')
  .then((res) => res.json())
  .then((res) => {
    res.employee?.forEach(employer => {
      employeeList.innerHTML += employerHTML(employer);
    })
  })