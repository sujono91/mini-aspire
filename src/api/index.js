const BASE_URL = 'https://json-server-heroku-grishgtiik.now.sh';

export function login(data) {
  return fetch(`${BASE_URL}/users`)
    .then(response => response.json())
    .then(users => {
      console.log(data);
      return users.find(
        user =>
          user.username === data.username && user.password === data.password
      );
    });
}

export function getAuth() {
  const user = JSON.parse(localStorage.getItem('user'));

  return fetch(`${BASE_URL}/users/${user ? user.id : undefined}`);
}

export function fetchLoans() {
  const user = JSON.parse(localStorage.getItem('user'));

  return fetch(`${BASE_URL}/loans?userId=${user.id}`);
}

export function addLoan(data) {
  return fetch(`${BASE_URL}/loans`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(data)
  });
}
