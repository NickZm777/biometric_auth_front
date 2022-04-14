import BASE_URL from "../endpoint"
const EXPRESS_URL = ".netlify/functions/api"

const BIOCREATE_URL = `${BASE_URL}/${EXPRESS_URL}/biocreate`

const saveCreatedCreds = async (requestData) => {
  const data = { data: { ...requestData } }
  try {
    const response = await fetch(BIOCREATE_URL, {
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
    alert(e.message)
  }
}

export default saveCreatedCreds
