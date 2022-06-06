const params = new URLSearchParams(window.location.search);

const serviceItem = service => `
  <li class='admin__item'>
    <div class='admin__item_left'>
      <span class='admin__item-muted'>от ${service.price} Р</span>
      <div class='admin__item-info'>
        <p>${service.name}</p>
      </div>
    </div>
    <div class='admin__item_right'>
      <a class='button button_active admin-button' href='./admin.price-edit.html?id=${service.id}'>
        <img src="./assets/icons/admin/ic_edit.svg" />
      </a>
    </div>
  </li>
`;

const setTitle = title => {
  const titleNode = document.querySelector('.admin__title');

  titleNode.innerText = title;
}

fetch(`../../php/api/Index/IndexServices.php?service=${params.get('id')}`)
  .then((res) => res.json())
  .then((res) => {
    const servicesList = document.querySelector('.admin__list');
    const { category, services } = res;

    setTitle(category.name);

    services.forEach(service => {
      servicesList.innerHTML += serviceItem(service);
    })
  });