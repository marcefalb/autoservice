const params = new URLSearchParams(window.location.search);

const title = document.querySelector('.price__title');
const description = document.querySelector('.price__description');
const servicesList = document.querySelector('.price__list');

const serviceItem = (service) => `
  <li class='price__item'>
    <div class='price__item_left'>
      <p class='price__item-title'>${service.name}</p>
    </div>
    <div class='price__item_right'>
      <span class='price__item-cost'>От ${service.price} р.</span>
      <button class='button price__item-cart' data-service-id='${service.id}' data-service-price='${service.price}'>
        <img src="./assets/icons/list/ic_cart.svg" />
      </button>
    </div>
  </li>
`

const localStorageSum = parseInt(localStorage.getItem('sum')) || 0;
const localStorageCount = parseInt(localStorage.getItem('count')) || 0;

const updateLocalStorage = (id, sum) => {
  let hasId = false;
  let servicesIds = JSON.parse(localStorage.getItem('services')) || [];
  let storageSum = parseInt(localStorage.getItem('sum')) || 0;
  let storageCount = parseInt(localStorage.getItem('count')) || 0;
  
  servicesIds.forEach(serviceId => {
    if (serviceId === id) {
      hasId = true;
      return;
    }
  })
  
  if (hasId) {
    storageSum -= sum;
    storageCount -= 1;
    servicesIds = servicesIds.filter(serviceId => serviceId !== id);
  }
  else {
    storageSum += sum;
    storageCount += 1;
    servicesIds.push(id);
  }
  
  localStorage.setItem('sum', storageSum);
  localStorage.setItem('count', storageCount);
  localStorage.setItem('services', JSON.stringify(servicesIds));
  updateCart(storageCount, storageSum);
}

const setToCartListener = () => {
const toCartBtns = document.querySelectorAll('.price__item-cart');

toCartBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    updateLocalStorage(btn.getAttribute('data-service-id'), parseInt(btn.getAttribute('data-service-price')));
  })
})
}

const updateCart = (count, sum) => {
  const countHtml = document.querySelector('.cart__count');
  const sumHtml = document.querySelector('.cart__sum');

  countHtml.innerText = count;
  sumHtml.innerText = sum;
}
updateCart(localStorageCount, localStorageSum)

const setServicesItems = async (services) => {
  await services.forEach(service => servicesList.innerHTML += serviceItem(service));
}

fetch(`../../php/api/Index/IndexServices.php?service=${params.get('service')}`)
  .then((res) => res.json())
  .then((res) => {
    const {category, services} = res;

    title.innerHTML = category.name;
    description.innerHTML = category.description;

    setServicesItems(services);

    setToCartListener();
  })