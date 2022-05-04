import publicKeyCredentialToJSON from "./publicKeyCredentialToJSON"

const callBrowserApiCreate = async (publicKey) => {
  const result = await navigator.credentials
    .create({ publicKey })
    .then((output) => {
      navigator.credentials.preventSilentAccess()
      return publicKeyCredentialToJSON(output)
    })
    .catch((error) => {
      alert(`Catch an error in navigator.credentials create: ${error.message}`)
      console.log(error.message)
    })
  return result
}

export default callBrowserApiCreate
