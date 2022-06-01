// Кнопка "Заказать звонок" в хедере

const callBtn = document.querySelector('.header__call');

callBtn.addEventListener('click', () => {
  const feedbackForm = document.querySelector('#feedback');
  feedbackForm.scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  })
})

// Кнопка "Отправить" в футере

const sendFeedbackBtn = document.querySelector('.footer__form-btn');
const feedbackFormSendedHTML = `
  <div class='footer__form_sended>
    <span>Спасибо</span>
    <p>Наши специалисты свяжутся с вами в скором времени!</p>
  </div>
`;

sendFeedbackBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const inputs = document.querySelectorAll('.footer__form-textfields input');
  const activeClass = 'input_unvalid';
  let validation = true;
  
  inputs.forEach(input => {
    if (!input.value) {
      input.classList.add(activeClass);
      validation = false;

      input.addEventListener('change', () => input.classList.remove(activeClass));
    }
  });

  if (validation) {
    
    const [feedbackName, feedbackPhone] = inputs;
    const parentContainer = document.querySelector('.footer__form');

    fetch('/php/api/Store/StoreFeedback.php', {
      method: 'POST',
      body: JSON.stringify({
        name: feedbackName.value,
        phone: feedbackPhone.value,
      })
    })
    
    parentContainer.innerHTML = feedbackFormSendedHTML;
  }
})