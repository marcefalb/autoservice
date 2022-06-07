const ordersListNode = document.querySelector('.admin__list');

const orderHtml = (order, formattedDate, categoriesListHtml) => `
  <li class='admin__item admin__order'>
    <div class='admin__order-item'>
      <div class='admin__item_left'>
        <span class='admin__item-muted'>${formattedDate}</span>
        <div class='admin__item-info'>
          <p>${order.name}</p>
          <p>${order.phone}</p>
          <p>${order.email}</p>
        </div>
      </div>
      <div class='admin__item_right'>
        <button class='button button_active admin-button' data-order-id="${order.id}">
          <img src="./assets/icons/admin/ic_trash.svg" />
        </button>
      </div>
    </div>
    <ul class='order__list'>
      ${categoriesListHtml}

      <li class='order__price-item order__sum'>
        <p class='order__price-title'>Итого</p>
        <div class='order__price-line'></div>
        <span class='order__price-value'>${order.sum} ₽</span>
      </li>
    </ul>
  </li>
`;
const categoryItemHtml = (category, servicesListHtml) => `
  <li class='order__item'>
    <span class='order__item-title'>${category.name}</span>
    <ul class='order__price-list'>
      ${servicesListHtml}
    </ul>
  </li>
`;
const serviceItemHtml = service => `
  <li class='order__price-item'>
    <p class='order__price-title'>${service.name}</p>
    <div class='order__price-line'></div>
    <span class='order__price-value'>${service.price} ₽</span>
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

    category.services.forEach(service => {
      servicesHtml += serviceItemHtml(service);
    })
    categoriesHtml += categoryItemHtml(category, servicesHtml);
  });

  return categoriesHtml;
}

const setOrdersListHtml = orders => {
  let ordersHtml = ``;

  orders.forEach(order => {
    const categoriesHtml = setCategoriesListHtml(order.categories);
    const date = new Date(order.date);
    const formattedDate = date.toLocaleString('ru-RU', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    });

    ordersHtml += orderHtml(order, formattedDate, categoriesHtml);
  })

  return ordersHtml;
}

const deleteOrder = async id => {
  fetch('../../php/api/Delete/DeleteOrder.php', {
    method: 'DELETE',
    body: JSON.stringify({
      id
    }),
  })
}

const setToTrashListener = () => {
  const deleteBtnsNodes = document.querySelectorAll('.admin-button');

  deleteBtnsNodes.forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-order-id');
      const parentItemNode = btn.closest('.admin__order');

      deleteOrder(id);
      parentItemNode.remove();
    })
  })
}

fetch(`../../php/api/Index/IndexOrders.php`)
  .then((res) => res.json())
  .then((res) => {
    if (res.orders !== undefined) {
      ordersListNode.innerHTML = setOrdersListHtml(res.orders);
      setToTrashListener();
    }
  });