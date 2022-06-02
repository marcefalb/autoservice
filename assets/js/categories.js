const categoriesList = document.querySelector('.services__list');

const localStorageSum = parseInt(localStorage.getItem('sum')) || 0;
const localStorageCount = parseInt(localStorage.getItem('count')) || 0;

const updateCart = (count, sum) => {
  const countHtml = document.querySelector('.cart__count');
  const sumHtml = document.querySelector('.cart__sum');

  countHtml.innerText = count;
  sumHtml.innerText = sum + ' ₽';
};
updateCart(localStorageCount, localStorageSum);


const categoryHTML = (category) => `
  <li class='services__item'>
    <div class='services__item_top'>
      <img src="./assets/images/services/${category.img}" >
    </div>
    <div class='services__item_bottom'>
      <span class='services__item-title'>${category.name}</span>
      <a href="./price.html?service=${category.id}" class='link services__item-link'>Перейти</a>
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