import publicKeyCredentialToJSON from "../utils/publicKeyCredentialToJSON"

const createBioKey = async (publicKey) => {
  if (!window.PublicKeyCredential) {
    alert("window.PublicKeyCredential is disabled")
    console.log("window.PublicKeyCredential is disabled")
    return
  }
  const result = await navigator.credentials
    .create({ publicKey })
    .then((output) => {
      return publicKeyCredentialToJSON(output)
    })
    .catch((error) => {
      alert(`Catch an error in navigator.credentials create: ${error.message}`)
      console.log(error.message)
    })
  return result
}

export default createBioKey
