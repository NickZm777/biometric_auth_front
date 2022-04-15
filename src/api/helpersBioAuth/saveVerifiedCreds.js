import BASE_URL from "../endpoint"
const EXPRESS_URL = ".netlify/functions/api"

const BIOVERIFY_URL = `${BASE_URL}/${EXPRESS_URL}/verify`

const saveVerifiedCreds = async (requestData) => {
  // const data = {  ...requestData  }
  try {
    const response = await fetch(BIOVERIFY_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
      // credentials: "include",
    })

    return await response.json()
  } catch (e) {
    console.error(e)
    alert(`catch in saveVerifiedCreds: ${e.message}`)
  }
}

export default saveVerifiedCreds
