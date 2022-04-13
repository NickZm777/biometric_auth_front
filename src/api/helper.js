import BASE_URL from "./endpoint"
const EXPRESS_URL = ".netlify/functions/api"

const checkUser_URL = `${BASE_URL}/${EXPRESS_URL}/check`
const addUser_URL = `${BASE_URL}/${EXPRESS_URL}/create`
const BIO_URL = `${BASE_URL}/${EXPRESS_URL}/save`
const INIT_URL = `${BASE_URL}/${EXPRESS_URL}/init`
const BUFFER_URL = `${BASE_URL}/${EXPRESS_URL}/savebuffer`

export const checkCreds = async (requestData) => {
  const data = { data: { ...requestData } }
  try {
    const response = await fetch(checkUser_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      // credentials: "include",
    })
    const res = await response.json()
    return res
  } catch (e) {
    console.error(e)
  }
}

export const addUser = async (requestData) => {
  const data = { data: { ...requestData } }
  try {
    const response = await fetch(addUser_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      // credentials: "include",
    })
    const res = await response.json()
    return res
  } catch (e) {
    console.error(e)
  }
}

export const saveKey = async (requestData) => {
  const data = requestData
  try {
    const response = await fetch(BIO_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      // credentials: "include",
    })
    const res = await response.json()
    return res
  } catch (e) {
    console.error(e)
  }
}

export const getInitChallenge = async (requestData) => {
  const data = requestData
  try {
    const response = await fetch(INIT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      // credentials: "include",
    })
    const res = await response.json()
    return res
  } catch (e) {
    console.error(e)
  }
}

export const saveBuffer = async (requestData) => {
  const data = requestData
  try {
    const response = await fetch(BUFFER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      // credentials: "include",
    })
    const res = await response.json()
    return res
  } catch (e) {
    console.error(e)
  }
}
