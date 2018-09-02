const getAllBtn = document.querySelector('.getAllBtn');

let inputId = document.querySelector('.inputId');
const getByIdBtn = document.querySelector('.getByIdBtn');

let inputGetByName = document.querySelector('.getByName');
let inputGetByAge = document.querySelector('.getByAge');
const addBtn = document.querySelector('.addBtn');

const delBtn = document.querySelector('.delBtn');
const updateBtn = document.querySelector('.updateBtn');

const result = document.querySelector('.result'); //table for results

const usersDB = 'https://test-users-api.herokuapp.com/users/'; //JSON DB

getAllBtn.addEventListener('click', getAllUsers);
getByIdBtn.addEventListener('click', getUserById);
addBtn.addEventListener('click', addUser);
delBtn.addEventListener('click', removeUser);
updateBtn.addEventListener('click', updateUser);

// - функция getAllUsers() - должна вернуть текущий список всех пользователей в БД.
function getAllUsers() {
  fetch(usersDB)
    .then(response => {
      if (response.ok) return response.json();
      throw new Error(`ERROR: ${data.errors}. STATUS: ${data.status}`);
    })
    .then(data => {
      result.innerHTML = null;
      let users = '';
      data.data.forEach(user => {
        const results = `
        <tr>
          <td>${user.id}</td>
          <td>${user.name}</td>
          <td>${user.age}</td>
        </tr>`;
        users += results;
      });
      result.innerHTML = users;
    })
    .catch(err => console.error(err));
}

//- функция getUserById(id) - должна вернуть пользователя с переданным id.
function getUserById() {
  fetch(`${usersDB}${inputId.value}`)
    .then(response => {
      if (response.ok) return response.json();

      throw new Error(`ERROR: ${ data.errors }. STATUS: ${ data.status }`);
    })
    .then(data => {
      result.innerHTML = null;
      // console.log(data);
      const user = data.data;
      const userId = inputId.value;
      const results = `
        <tr>
          <td>${userId}</td>
          <td>${user.name}</td>
          <td>${user.age}</td>
        </tr>`;
      result.innerHTML = results;
      inputId.value = '';
    })
    .catch(err => console.error(err));
}

//- функция addUser(name, age) - должна записывать в БД юзера с полями name и age.
function addUser() {
  fetch(usersDB, {
      method: 'POST',
      body: JSON.stringify({
        name: `${inputGetByName.value}`,
        age: `${inputGetByAge.value}`,
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then(response => response.json())
    .then(data => {
      if (data.errors.length === 0) return data;
      throw new Error(`ERROR: ${data.errors}. STATUS: ${data.status}`);
    })
    .then(data => {
      result.innerHTML = null;
      const user = data.data;
      const results = `
        <tr>
          <td>${user._id}</td>
          <td>${user.name}</td>
          <td>${user.age}</td>
        </tr>`;
      result.innerHTML = results;
      inputGetByName.value = '';
      inputGetByAge.value = '';
    })
    .catch(err => console.error(err));
}

//- функция removeUser(id) - должна удалять из БД юзера по указанному id.
function removeUser() {
  fetch(`${usersDB}${inputId.value }`, {
      method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => {
      if (data.errors.length === 0) return data;
      throw new Error(`ERROR: ${data.errors}. STATUS: ${data.status}`);
    })
    .then(data => {
      result.innerHTML = null;
      const user = data.data;
      const results = `
        <tr>
          <td>${user.id}</td>
          <td>${user.name}</td>
          <td>${user.age}</td>
        </tr>`;
      result.innerHTML = results;
      inputId.value = '';
    })
    .catch(err => alert('Insert correct Id'));

}

//- функция updateUser(id, user) - должна обновлять данные пользователя по id. 
function updateUser() {
  fetch(`${usersDB}${inputId.value}`, {
      method: 'PUT',
      body: JSON.stringify({
        name: `${inputGetByName.value}`,
        age: `${inputGetByAge.value}`,
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then(response => response.json())
    .then(data => {
      if (data.errors.length === 0) return data;
      throw new Error(`ERROR: ${data.errors}. STATUS: ${data.status}`);
    })
    .then(data => {
      result.innerHTML = null;
      const user = data.data;
      const results = `
        <tr>
          <td>${user.id}</td>
          <td>${user.name}</td>
          <td>${user.age}</td>
        </tr>`;
      result.innerHTML = results;
      inputId.value = '';
      inputGetByName.value = '';
      inputGetByAge.value = '';
    })
    .catch(err => console.error(err));
}