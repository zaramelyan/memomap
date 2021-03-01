
const API_URL = 'http://localhost:5000'

export async function postSignup ({ firstName, lastName, username, password }) {
  return await fetch(`${API_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ firstName, lastName, username, password })

  }).then((res) => res.status)
}

export async function postEntry ({ userId, location, lng, lat, selectedDate, entry, entryName }) {
  return await fetch(`${API_URL}/map`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ userId, location, lng, lat, selectedDate, entry, entryName })

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

export async function getEntries (userId) {
  return await fetch(`${API_URL}/entries`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ userId })

  }).then((res) => (res))
}
