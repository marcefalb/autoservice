var orderPhoneMask = IMask(
  document.getElementById('order-phone'), {
    mask: '+{7} (000) 000-00-00'
  });

var orderEmailMask = IMask(
  document.getElementById('order-email'), {
    mask: 'left@middle.right',
    blocks: {
      'left': {
        mask: /[a-z0-9_\.-]+/
      },
      'middle': {
        mask: /[a-z0-9-]+/,
      },
      'right': {
        mask: /[a-z]{2,4}/,
      },
    }
  });

const categoriesListNode = document.querySelector('.cart__category-list');
const localStorageSum = parseInt(localStorage.getItem('sum')) || 0;

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
      <span class='cart__item-cost'>от ${service.price} ₽</span>
      <button class='button button_active cart__item-cart' data-service-price='${service.price}' data-service-id=${service.id}>
        <img src="./assets/icons/list/ic_cart-active.svg" />
      </button>
    </div>
  </li>
`;

const toggleCartBtn = btn => {
  const activeClass = 'button_active';
  if (btn.classList.contains(activeClass)) {
    btn.classList.remove(activeClass);
    btn.children[0].src = './assets/icons/list/ic_cart.svg';
  }
  else {
    btn.classList.add(activeClass);
    btn.children[0].src = './assets/icons/list/ic_cart-active.svg';
  }
}

const updateOrderData = sum => {
  const sumHtml = document.querySelector('.order_right');
  sumHtml.innerText = sum + ' ₽';
};
updateOrderData(localStorageSum)

const updateLocalStorage = (id, sum) => {
  let hasId = false;
  let servicesIds = JSON.parse(localStorage.getItem('services')) || [];
  let storageSum = parseInt(localStorage.getItem('sum')) || 0;
  let storageCount = parseInt(localStorage.getItem('count')) || 0;

  servicesIds.forEach((serviceId) => {
    if (parseInt(serviceId) === id) {
      hasId = true;
      return;
    }
  });

  if (hasId) {
    storageSum -= sum;
    storageCount -= 1;
    servicesIds = servicesIds.filter((serviceId) => parseInt(serviceId) !== id);
  } else {
    storageSum += sum;
    storageCount += 1;
    servicesIds.push(id);
  }

  localStorage.setItem('sum', storageSum);
  localStorage.setItem('count', storageCount);
  localStorage.setItem('services', JSON.stringify(servicesIds));
  updateOrderData(storageSum);
};

const setToCartListener = () => {
  const toCartBtns = document.querySelectorAll('.cart__item-cart');
  let servicesIds = JSON.parse(localStorage.getItem('services')) || [];

  toCartBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      updateLocalStorage(
        parseInt(btn.getAttribute('data-service-id')),
        parseInt(btn.getAttribute('data-service-price'))
        );
      toggleCartBtn(btn)
    });

    servicesIds.forEach(id => {
      if (id === btn.getAttribute('data-service-id')) toggleCartBtn(btn);
    })
  });
};

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
    services: localStorage.getItem('services') || [],
  }),
})
  .then((res) => res.json())
  .then((res) => {
    if (res.categories === undefined) {
      categoriesListNode.innerHTML = `<li class='cart__plug'>Корзина пуста. Пополните ее необходимыми для вас услугами!</li>`;
    }
    else {
      categoriesListNode.innerHTML = setCategoriesListHtml(res.categories);
      setToCartListener();
    }
  });

  
const orderBtnNode = document.querySelector('.order__button');
const orderFormSendedHtml = employeeHtml => `
  <section class='ordered'>
    <img src="./assets/icons/form/ic_ordered.svg" class='ordered__icon' />
    <span class='ordered__title'>Спасибо за заказ</span>
    <p class='ordered__employee-title'>Вам необходимо обратиться к следующим<br/>специалистам для получения обслуживания:</p>
    <ul class='ordered__employee-list'>${employeeHtml}</ul>
    <a href="./services.html" class='link ordered__link'>Вернуться к услугам</a>
  </section>
`;

const getEmployeeHtml = (employee) => {
  let employeeHtml = '';

  employee.forEach(employer => {
    employeeHtml += `<li class='ordered__employee-item'>${employer.name}, ${employer.position}</li>`
  })

  return employeeHtml;
}

orderBtnNode.addEventListener('click', (e) => {
  e.preventDefault();
  const inputs = document.querySelectorAll('.order__textfields input');
  const services = localStorage.getItem('services');
  const activeClass = 'input_unvalid';
  let validation = true;
  
  inputs.forEach(input => {
    if (!input.value) {
      input.classList.add(activeClass);
      validation = false;

      input.addEventListener('change', () => input.classList.remove(activeClass));
    }
  });
  if (services === null || services.length === 0) validation = false;

  if (validation) {
    const [name, phone, email] = inputs;
    const parentContainer = document.querySelector('main');

    fetch('/php/api/Store/StoreOrder.php', {
      method: 'POST',
      body: JSON.stringify({
        name: name.value,
        phone: phone.value,
        email: email.value,
        services,
      })
    })
      .then(res => res.json())
      .then(res => {
        const employeeHtml = getEmployeeHtml(res.employee)
        parentContainer.innerHTML = orderFormSendedHtml(employeeHtml);
      })

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })

    inputs.forEach(input => input.value = '');
    localStorage.clear();
  }
})