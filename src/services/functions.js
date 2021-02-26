
const API_URL = 'http://localhost:5000'

export async function postSignup (firstName, lastName, username, password) {
  return await fetch(`${API_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ firstName, lastName, username, password })

  }).then((res) => res.status)
}

export async function getUser (username, password) {
  return await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })

  }).then((res) => (res))
}
