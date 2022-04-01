const BASE_URL = "https://glowing-kringle-b3a3c5.netlify.app"
const EXPRESS_URL = ".netlify/functions/api"

const checkURL = `${BASE_URL}/${EXPRESS_URL}/check`

export const checkCreds = async (requestData) => {
  const data = { data: { ...requestData } }
  try {
    const response = await fetch(checkURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    const res = await response.json()
    return res
  } catch (e) {
    console.error(e)
  }
}
