const refs = {
  formEl: document.querySelector('.search-form'),
  inputEl: document.querySelector('#input'),
  btnEl: document.querySelector('.found'),
  resultEl: document.querySelector('.result'),
  loadEl: document.querySelector('.load-more'),
};
refs.formEl.addEventListener('submit', onSubmit);
refs.loadEl.addEventListener('click', onLoad);
let userNumber;
let inputVal;
function onSubmit(evt) {
  evt.preventDefault();
  userNumber = 1;
  inputVal = refs.inputEl.value;
  console.log(inputVal);
  fetch(
    `https://api.github.com/search/users?q=${inputVal}&client_id=7dce395bd90b2a6e4b06&client_secret=8b76d9b8b9370cbdb15ff7e579f2eb4e36c3743a&page=${userNumber}&per_page=10`
  )
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(data => {
      if (data.items.length > 0) {
        userItems(data.items);
        userNumber++;
      } else {
        alert('Пользователь не найден!');
      }
      console.log(data.items);
    })
    .catch(err => console.log(err));
  refs.resultEl.innerHTML = '';
}
function onLoad(evt) {
  evt.preventDefault();

  fetch(
    `https://api.github.com/search/users?q=${inputVal}&client_id=7dce395bd90b2a6e4b06&client_secret=8b76d9b8b9370cbdb15ff7e579f2eb4e36c3743a&page=${userNumber}&per_page=10`
  )
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      // console.log(response);
      return response.json();
    })
    .then(data => {
      if (data.items.length > 0) {
        userItems(data.items);
        userNumber += 1;
      } else {
        alert('Пользователь не найден!');
      }
      // console.log(data.items);
    })
    .catch(err => console.log(err));
}
function userItems(arr) {
  const markup = arr
    .map(
      ({ login, avatar_url, html_url }) => `<div class="card">
  <a href="${html_url}"><img src="${avatar_url}" alt="${login}" width=300></a>
<div class="info"><h2>${login}</h2></div>
  </div>`
    )
    .join('');
  refs.resultEl.insertAdjacentHTML('beforeend', markup);
  //   return markup;
}
