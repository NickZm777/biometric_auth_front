import BASE_URL from "../endpoint"
const EXPRESS_URL = ".netlify/functions/api"

const BIOCREATE_URL = `${BASE_URL}/${EXPRESS_URL}/biocreate`

const saveCreatedCreds = async (requestData) => {
  try {
    const response = await fetch(BIOCREATE_URL, {
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
    alert(`error in saveCreatedCreds: ${e.message}`)
  }
}

export default saveCreatedCreds
