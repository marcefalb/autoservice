const categoriesListNode = document.querySelector('.cart__category-list');
const categoryItemHtml = (category, servicesListHtml) => `
<li class='cart__category-item'>
  <span class='cart__category-title'>${category.name}</span>
  <ul class='cart__service-list'>
    ${servicesListHtml}
  </ul>
</li>
`;
const serviceItemHtml = service => `
  <li class='cart__service-item'>
    <div class='cart__item_left'>
      <p class='cart__item-title'>${service.name}</p>
    </div>
    <div class='cart__item_right'>
      <span class='cart__item-cost'>от ${service.price} руб.</span>
      <button class='button button_active cart__item-cart' data-service-price='${service.price}' data-service-id=${service.id}>
        <img src="./assets/icons/list/ic_cart-active.svg" />
      </button>
    </div>
  </li>
`;

const setServicesListHtml = services => {
  let servicesHtml = ``;

  services.forEach(service => {
    servicesHtml += serviceItemHtml(service);
  });

  return servicesHtml;
};

const setCategoriesListHtml = categories => {
  let categoriesHtml = ``;

  categories.forEach(category => {
    let servicesHtml = ``;

    category.category.services.forEach(service => {
      servicesHtml += serviceItemHtml(service);
    })
    categoriesHtml += categoryItemHtml(category.category, servicesHtml);
  });

  return categoriesHtml;
}

fetch(`../../php/api/Index/IndexCart.php`,{
  method: 'POST',
  body: JSON.stringify({
    services: localStorage.getItem('services'),
  }),
})
  .then((res) => res.json())
  .then((res) => {
    categoriesListNode.innerHTML = setCategoriesListHtml(res.categories);
  });