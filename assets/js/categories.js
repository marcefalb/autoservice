const categoriesList = document.querySelector('.services__list');
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