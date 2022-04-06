export const BASE_URL = "https://glowing-kringle-b3a3c5.netlify.app"
// const BASE_URL = "http://localhost:9000"
const EXPRESS_URL = ".netlify/functions/api"

const checkUser_URL = `${BASE_URL}/${EXPRESS_URL}/check`
const addUser_URL = `${BASE_URL}/${EXPRESS_URL}/create`
const BIO_URL = `${BASE_URL}/${EXPRESS_URL}/save`

export const checkCreds = async (requestData) => {
  const data = { data: { ...requestData } }
  try {
    const response = await fetch(checkUser_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
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
      credentials: "include",
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
      credentials: "include",
    })
    const res = await response.json()
    return res
  } catch (e) {
    console.error(e)
  }
}
