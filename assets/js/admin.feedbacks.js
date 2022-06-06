const feedbacksList = document.querySelector('.admin__list');

const feedbackHtml = (feedback, formattedDate) => `
  <li class='admin__item'>
    <div class='admin__item_left'>
      <span class='admin__item-muted'>${formattedDate}</span>
      <div class='admin__item-info'>
        <p>${feedback.name}</p>
        <p>${feedback.phone}</p>
      </div>
    </div>
    <div class='admin__item_right'>
      <button class='button button_active admin-button' data-feedback-id=${feedback.id}>
        <img src="./assets/icons/admin/ic_trash.svg" />
      </button>
    </div>
  </li>
`;

const deleteFeedback = async id => {
  fetch('../../php/api/Delete/DeleteFeedback.php', {
    method: 'DELETE',
    body: JSON.stringify({
      id
    }),
  })
}

const setBtnDeleteListeners = () => {
  const deleteBtnsNodes = document.querySelectorAll('.admin-button');

  deleteBtnsNodes.forEach(btn => {
    btn.addEventListener('click', () => {
      deleteFeedback(btn.getAttribute('data-feedback-id'));
      btn.closest('.admin__item').remove();
    })
  })
}

fetch('../../php/api/Index/IndexFeedbacks.php')
  .then((res) => res.json())
  .then((res) => {
    res.feedbacks.forEach((feedback) => {
      const date = new Date(feedback.date);
      const formattedDate = date.toLocaleString('ru-RU', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
      });
      feedbacksList.innerHTML += feedbackHtml(feedback, formattedDate);
    });

    setBtnDeleteListeners();
  });
