import BASE_URL from "../endpoint"
const EXPRESS_URL = ".netlify/functions/api"

const REGISTER_URL = `${BASE_URL}/${EXPRESS_URL}/register`

export const getCreateOptions = async (requestData) => {
  const data = { data: { ...requestData } }
  try {
    const response = await fetch(REGISTER_URL, {
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
    alert(`catch in getCreateOptions: ${e.message}`)
  }
}
