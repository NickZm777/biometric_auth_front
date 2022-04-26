import BASE_URL from "../endpoint"
const EXPRESS_URL = ".netlify/functions/api"

const REGISTER_URL = `${BASE_URL}/${EXPRESS_URL}/getverify`

export const getVerificationOptions = async (userNameforVerify) => {
  const data = { userName: userNameforVerify }
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
    alert(`error in getVerificationOptions: ${e.message}`)
  }
}
