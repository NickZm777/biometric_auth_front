const checkURL = "http://localhost:5000/check"

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
