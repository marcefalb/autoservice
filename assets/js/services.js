const params = new URLSearchParams(window.location.search)

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

const localStorageSum = localStorage.getItem('sum') || 0;
const localStorageCount = localStorage.getItem('count') || 0;


const setToCartListener = () => {
  const toCartBtns = document.querySelectorAll('.price__item-cart');

  toCartBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      let sum = parseInt(localStorage.getItem('sum')) || 0;
      sum += parseInt(btn.getAttribute('data-service-price'));
      localStorage.setItem('sum', sum);

      let count = parseInt(localStorage.getItem('count')) || 0;
      count += 1;
      localStorage.setItem('count', count);

      updateCart(count,sum);
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

const setServiceItem = async (services) => {
  await services.forEach(service => servicesList.innerHTML += serviceItem(service));
}

fetch(`../../php/api/Index/IndexServices.php?service=${params.get('service')}`)
  .then((res) => res.json())
  .then((res) => {
    const {category, services} = res;

    title.innerHTML = category.name;
    description.innerHTML = category.description;

    setServiceItem(services);

    setToCartListener();
  })